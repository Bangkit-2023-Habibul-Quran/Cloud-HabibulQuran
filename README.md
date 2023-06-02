# Cloud-HabibulQuran

# API LIST
## Register
- URL
  - /register 
- Method 
  - POST 
- Request body parameter
  - name (string), required
  - email (string), required 
  - password (string), required
  - file (max size 2mb), valid image file, required
  - jenisKelamin (enum: [ Laki-laki, Perempuan ]), required
  - birthdateYear (Date) required
  - birthdateMonth (Date) required
  - birthdateDay (Date) required
- Response
```
  - 201
    { 
      "error": false,
      "message": "Pendaftaran Anda telah berhasil, Silahkan verifikasi email anda."  
    }
  - 400
    {
      "error": true,
      "message": "Pendaftaran Anda telah gagal"
    }
```

## Login
- URL
  - /login
- Method
  - POST
- Request body parameter
  - email (string) required
  - password (string) required
- Response
```  
  - 200 
    { 
      "error": false,
      "message": "Login Berhasil",
      "user": {
          "_id": "6478d42c1c597d68741481a6",
          "name": "username",
          "email": "habibul2023@gmail.com",
          "password": "$2b$10$eItWHFT/o3ath2HjTZns9ew52JbxJ9qGWpDrjexxhD4C2lf5GvTla",
          "jenisKelamin": "Perempuan",
          "birthdate": "2012-12-31T00:00:00.000Z",
          "image": "https://storage.googleapis.com/login-picture/Arrow.png",
          "is_verified": 1,
          "token": "xDEKlbAaVR1hG2aMAbXjB1iknKTbQt7x",
          "score": [],
          "__v": 0
    }
  - 400
    { 
      "error": true,
      example:
        "message": "Email dan kata sandi salah"
        "message": "Email tidak terdaftar"
        "message": "Silahkan verifikasi email anda."
    }
```

## Request forget password
- URL 
  - /forget
- Method
  - POST
-  Request body parameter
  - email (string) 
- Response 
```
  - 200
    {
      "error": false,
      "message": "Silakan periksa email Anda untuk mengatur ulang kata sandi Anda."
    }
  - 400
    {
      "error": true,
      "message": "Email pengguna salah."
    }
```

## Forget Password
- URL 
  - /forget-password
```
https://link/forget-password?token=SnHLbF0wx5xFsxznVcZJcOFtOyBPz9mi
```
- Method
  - POST
- Request body parameter
  - password (string)
  - user_id (string) hidden
- Response
```
  - 200
    {
      "error":false,
      "message":"Password telah diperbarui"
    }
```

## Verification
- URL
  - /verification
- Method
  - POST
- Request body parameter
  - email (string)
- Response
```
  - 200
    {
      "error":false,
      "message":"Setel ulang email verifikasi telah dikirim ke email Anda."
    }
  - 400
    {
      "error":true,
      "message":"Email ini tidak terdaftar."
    }
```

## Edit profile
- URL 
  - /edit
```
https://loginregister-dot-habibulquran.et.r.appspot.com/edit?id=64788c6a48951a16c25927d8 
```
- Method
  - POST
- Request body parameter
  - user_id (string) hidden
  - name (string) required
  - email (string) required
  - jenisKelamin (enum: [ Laki-laki, Perempuan ]), required
  - birthdateYear (Date) required
  - birthdateMonth (Date) required
  - birthdateDay (Date) required
