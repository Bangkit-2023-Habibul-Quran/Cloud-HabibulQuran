# Cloud-HabibulQuran

# API LIST
## REGISTER
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
  - birthdate (Date) required
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
      "data": {
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
