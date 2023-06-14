const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");

const config = require("../config/config");

const randomstring = require("randomstring");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

//for sending email
const sendVerifyMail = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });
    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "Email Verifikasi",
      html:
        "<p>Halo " +
        name +
        '.</p> <p>Selamat menggunakan aplikasi Habib Al-Quran.</p> <p>Silahkan klik disini untuk <a href="https://habibulquran.et.r.appspot.com/verify?id=' +
        user_id +
        '"> Verifikasi </a> Email Anda.</p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email telah terkirim:- ", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

//for reset password sending email
const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });
    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "Reset Password",
      html:
        "<p>Halo " +
        name +
        ', Silahkan klik disini untuk <a href="https://habibulquran.et.r.appspot.com/forget-password?token=' +
        token +
        '"> mengatur ulang </a> password anda.</p>',
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email telah terkirim:- ", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    res.status(200).render('registration');
  } catch (error) {
    res.status(400).json({ error: true, message: "Gagal loading" });
  }
};

//google cloud
const storage = new Storage({
  projectId: "habibulquran",
  keyFilename: "credentials.json",
});

const bucketName = "login-picture";

const registerUser = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const {
      name,
      email,
      jenisKelamin,
      birthdateDay,
      birthdateMonth,
      birthdateYear,
    } = req.body;
    const spassword = await securePassword(req.body.password);

    // Read the file from the temporary location
    const fileBuffer = fs.readFileSync(path);

    // Upload the file to Google Cloud Storage
    const bucket = storage.bucket(bucketName);
    const fileUpload = bucket.file(originalname);
    const writeStream = fileUpload.createWriteStream();

    try{
    writeStream.on("error", (err) => {
      console.error("Gagal mengupload file:", err);
      return res.status(400).json({ error: true, message: "Gagal mengupload file" });
    });
    } catch(error) {
      res.status(400).json({ error: true, message: error.message });
    }

    writeStream.on("finish", async () => {
      // Delete the temporary file from the server
      fs.unlinkSync(path);

      const storageUrl = fileUpload.publicUrl();
      // birthdate
      const birthdate = new Date(
        birthdateYear,
        birthdateMonth - 1,
        birthdateDay
      );

      try{
        if (!["Laki-laki", "Perempuan"].includes(jenisKelamin)) {
        return res.status(400).json({ error: true, message: "Invalid gender" });
        }
      } catch(error) {
        return res.status(400).json({ error: true, message: error.message });
      }  
      

      // Leap Validation
      const isLeapYear =
        (birthdateYear % 4 === 0 && birthdateYear % 100 !== 0) ||
        birthdateYear % 400 === 0;
      const maxDaysInFebruary = isLeapYear ? 29 : 28;

      // Birthdate Validation
      const maxDaysInMonth = [
        31,
        maxDaysInFebruary,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];
      
      try{
        if (
          birthdateDay < 1 ||
          birthdateDay > maxDaysInMonth[birthdateMonth - 1]
        ) {
          return res.status(400).json({ error: true, message: "Invalid birthdate" });
        }
      } catch(error) {
        return res.status(400).json({ error: true, message: error.message });
      }
      
      // Save data to database
      const user = new User({
        name: name,
        email: email,
        password: spassword,
        image: storageUrl,
        jenisKelamin: jenisKelamin,
        birthdate: birthdate,
      });

      const userData = await user.save();
      try { 
      if (userData) {
        sendVerifyMail(req.body.name, req.body.email, userData._id)
      } else {
        return res.status(400).json({ error: true, message: "Pendaftaran Anda telah gagal" });
      }
    } catch(error) {
      return res.status(400).json({ error: true, message: error.message })
    }

      res.status(201).json({
        error: false,
        message: "Pendaftaran Anda telah berhasil, Silahkan verifikasi email anda.",
        users: userData,
      });
    });

    writeStream.end(fileBuffer);
  } catch (err) {
    console.error("Error saat memproses upload file:", err);
    res.status(500).json({ error: true, message: "Gagal memproses upload file" });
  }
};

const verifyMail = async (req, res) => {
  try {
    const updateInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { is_verified: 1 } }
    );

    console.log(updateInfo);
    res.status(200).json({ error: false, message: "email-verified",update: updateInfo });
    // res.render("email-verified");
  } catch (error) {
    console.log(error.message);
  }
};

// login user methods started
const loginLoad = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password
    const userData = await User.findOne({ email: email });
    try{
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        if (userData.is_verified === 0) {
          res.status(400).json({ error: true, message: "Silahkan verifikasi email anda." });
        } else {
          req.session.user_id = userData._id;
          req.session.save();
          const randomString = randomstring.generate();
            await User.updateOne(
            { email: email },
            { $set: { token: randomString } }
          );
          await User.findOne({ email: email });
          res.status(200).json({ error: false, message: "Login Berhasil", user: userData })
        }
      } else {
        res.status(400).json({ error: true, message: "Email dan kata sandi salah" });
      }
    } else {
    res.status(400).json({ error: true, message: "Email tidak terdaftar" });
    }}
    catch(error) {
      console.log(error.message);
    }

  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    const userData = await User.findById({ _id: req.session.user_id });
    res.status(200).json({  user: userData, error: false  });
  } catch (error) {
    console.log(error.message);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

// forget password code start
const forgetLoad = async (req, res) => {
  try {
    res.status(200).render("forget");
  } catch (error) {
    console.log(error.message);
  }
};

const forgetVerify = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    if (userData) {
      if (userData.is_verified === 0) {
        res.status(400).json({ error: true, message: "Silahkan verifikasi email Anda." });
      } else {
        // const randomString = randomstring.generate();
        // await User.updateOne(
        //   { email: email },
        //   { $set: { token: randomString } }
        // );
        sendResetPasswordMail(userData.name, userData.email, userData.token);
        res.status(200).json({
          error: false,
          message:
            `Silakan periksa email Anda untuk mengatur ulang kata sandi Anda.`,
        });
      }
    } else {
      res.status(400).json({ error: true, message: "Email pengguna salah." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const forgetPasswordLoad = async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await User.findOne({ token: token });
    if (tokenData) {
      res.status(200).render("forget-password", { error: false, user_id: tokenData._id });
    } else {
      res.status(400).render("400", { error: true, message: "Token is invalid." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const password = req.body.password;
    const user_id = req.body.user_id;
    
    const secure_password = await securePassword(password);

    await User.findByIdAndUpdate(
      { _id: user_id },
      { $set: { password: secure_password, token: "" } }
    );
    return res.status(200).json({ error: false, message: "Password telah diperbarui"})
  } catch (error) {
    console.log(error.message);
  }
};

//for verification send mail link
const verificationLoad = async (req, res) => {
  try {
    res.render("verification");
  } catch (error) {
    console.log(error.message);
  }
};

const sentVerificationLink = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await User.findOne({ email: email });
    if (userData) {
      sendVerifyMail(userData.name, userData.email, userData._id);

      res.status(200).json({
        error: false,
        message: "Setel ulang email verifikasi telah dikirim ke email Anda.",
      });
    } else {
      res.status(404).json({ error: true, message: "Email ini tidak terdaftar." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//user profile edit & update
const editLoad = async (req, res) => {
  try {
    const id = req.query.id;

    const userData = await User.findById({ _id: id });

    if (userData) {
      res.status(200).render("edit", {error: false, user: userData });
    } else {
      res.redirect("/home");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.body.user_id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          jenisKelamin: req.body.jenisKelamin,
          birthdateYear: req.body.birthdateYear,
          birthdateMonth: req.body.birthdateMonth,
          birthdateDay: req.body.birthdateDay,
        },
      }
    );
    res.status(200).json({ error: false, message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: "Terjadi kesalahan server" });
  }
};

module.exports = {
  loadRegister,
  registerUser,
  verifyMail,
  loginLoad,
  verifyLogin,
  loadHome,
  userLogout,
  forgetLoad,
  forgetVerify,
  forgetPasswordLoad,
  resetPassword,
  verificationLoad,
  sentVerificationLink,
  editLoad,
  updateProfile,
};
