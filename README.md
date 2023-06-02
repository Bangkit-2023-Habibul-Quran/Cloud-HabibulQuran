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
    {"error":false,"message":"Setel ulang email verifikasi telah dikirim ke email Anda."}
  - 400
    {"error":true,"message":"Email ini tidak terdaftar."}
```

## Edit profile
- URL 
  - /edit
```
https://loginregister-dot-habibulquran.et.r.appspot.com/edit?id=64788c6a48951a16c25927d8 
```
- Method
  - POST

## Huruf
### List Huruf
- URL
  - /huruf
- Response
  ```
  {
    "code":200,
    "status":"OK.",
    "error":false,
    "message":"Sukses mengambil semua huruf.",
    "data"
  } 
  ```
### Spesifik Huruf
- URL
  - /huruf/{huruf}
- Response
  ```
  {
    "code":200,
    "status":"OK.",
    "error":false,
    "message":"Sukses mengambil huruf.",
    "data": {
      "arabic":"ث",
      "audio":"https://storage.googleapis.com/surat-ayat/DatasetHijaiyah/03_Tsa.wav","pronounciation":"tsa"
    }
  }
  ```
### List Surat
- URL
  - /surat
- Response
```
  {
    "code":200,
    "status":"OK.",
    "error":false,
    "message":"Sukses mengambil semua surat.",
    "data"
  }
```

### Spesifik Surat
- URL
  - /surat/{surat}
- Response
  ```
  {
    "code":200,
    "status":"OK",
    "error":false,
    "message":"Sukses mengambil surat",
    "data": {
      "number":1,
      "numberOfVerses":7,
      "name":{
        "short":"الفاتحة",
        "transliteration":{"id":"Al-Fatihah"}
      },
      "preBismillah":null,
      "verses"
    }
  ```
  
  ### Spesifik Ayat
- URL
  - /surat/{surat}/{ayat}
- Response
  ```
  {
    "code":200,
    "status":"Success",
    "message":"Success",
    "data": {
      "number": {
        "inSurah":1
      },
      "text": {
        "arab":"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
      },
      "translation": {
      "id":"Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."},
      "audio": {
        "primary":"https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/1",
        "secondary": [
          "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
          "https://cdn.islamic.network/quran/audio/64/ar.alafasy/1.mp3"
        ]
      },
      "surat": {
        "number":1,
        "numberOfVerses":7,
        "name": {
          "short":"الفاتحة",
          "transliteration":{
            "id":"Al-Fatihah"
          }
        },
        "preBismillah":null
      }
    }
  }
  ```
