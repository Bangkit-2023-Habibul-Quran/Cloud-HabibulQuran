const express = require("express");
const user_route = express();
const session = require("express-session");
const config = require("./config/config");

user_route.use(session({ secret: config.sessionSecret, saveUninitialized: true, resave: true }));

const auth = require("./middleware/auth");

user_route.set("view engine", "ejs");
user_route.set("views", "./views/users");

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");

user_route.use(express.static("public"));

const upload = multer({
  dest: "/tmp/", // Destination folder for temporarily storing uploaded files
  limits: {
    fileSize: 2 * 1024 * 1024, // Batasan ukuran file (2 MB)
  },
});

const userController = require("./controllers/user");

user_route.get("/register", auth.isLogout, userController.loadRegister);

user_route.post(
  "/register",
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ error: true, message: "Ukuran file terlalu besar. Maksimal 2 MB" });
        }
      }
      next();
    });
  },
  userController.registerUser
)

user_route.get("/verify", userController.verifyMail);

user_route.get("/", auth.isLogout, userController.loginLoad);

user_route.get("/login", auth.isLogout, userController.loginLoad);

user_route.post("/login", userController.verifyLogin);

user_route.get("/home", auth.isLogin, userController.loadHome);

user_route.get("/logout", auth.isLogin, userController.userLogout);

user_route.get("/forget", auth.isLogout, userController.forgetLoad);

user_route.post("/forget", userController.forgetVerify);

user_route.get(
  "/forget-password",
  auth.isLogout,
  userController.forgetPasswordLoad
);

user_route.post("/forget-password", userController.resetPassword);

user_route.get("/verification", userController.verificationLoad);

user_route.post("/verification", userController.sentVerificationLink);

user_route.get("/edit", auth.isLogin, userController.editLoad);

user_route.post("/edit", userController.updateProfile);

user_route.post("/data", userController.dataLoad);

module.exports = user_route;
