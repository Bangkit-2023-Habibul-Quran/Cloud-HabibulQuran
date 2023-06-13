# Cloud-HabibulQuran

# Deployment
* **Google Cloud Platform (GCP)**
  * **Prerequisites** 
    <br>
    Here are several points to consider before proceeding:
    * Install or update to the latest version of the **Google Cloud CLI**
    * Set a default region and zone `asia-southeast2-a`
    * Enable **Compute Engine** and **App Engine** APIs 
      <br><br>
  * **Google Compute Engine (GCE)** 
      <br>
      * **Create Virtual Machine (VM)**
          <br>
          Before deploying the application to cloud, we have to make sure that we have the database ready—where in this case we are using MongoDB. To achieve this, we are using GCE to initiate a Virtual Machine (VM) that will run on cloud. 
          <br><br>
          To initiate a VM,
           * On GCP console, go to **Navigation Menu -> Compute Engine -> VM instances**
           * Click on **Create Instance**
           * Specify a VM name `mongodb-login`
           * Use the previously set region and zone `asia-southeast2-a`
           * Select Machine Configuration using series `E2` and machine type `e2-medium` 
             <br>
             > Since need it for general purposes only, E2 machines offers a good balance of price and performance, and are suitable for a wide variety of common workloads including databases.
           * In the **Boot disk** section, click **Change**, and then do the following:
             * On the Public images tab, choose the following:
                * Operating System `Ubuntu`
                * OS version `18.04`
                * Boot disk type `Balanced persistent disk`
                * Boot disk size `10GB`
           * Allow both `HTTP Traffic` and `HTTPS Traffic` Firewalls
           * Click on the **Management, security, disks, sole tenancy** section, go to the **Networking** tab and do the following:
             1. Add a new network tag `mongodb`
             2. On **Network Interfaces**, edit the `default` and make sure its external IP address is **Ephemeral** 
           * Leave everything else as default
           * Click **Create** instance
           * Connect to Created VM via SSH
           * Install MongoDB according this official guide
             ```
             https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
             ```
           * after MongoDB succesfully installed, change the configuration in `/etc/mongod.conf` especially about bind IP and security configuration for allowing access from internet
         <br><br>
     * **Create Firewall**
         <br>
         After Creating the VM, we have to make another Firewall is response to the `mongo` network tag to enable a default port number for MongoDB instances.
         <br><br>
         To create a new Firewall,
          * On GCP console, go to **Navigation Menu -> VPC Networks -> Firewall**
          * Click on **Create Firewall**
          * Specify a Firewall name `allow-mongodb`
          * Set target tags `mongodb`
          * Set source IP ranges `0.0.0.0/0`
          * In the **Protocols and ports** section, Click on **Specified protocols and ports** and do the following:
            - Check `tcp`
            - Set the port number to be `27017`
               > Port 27017 is the default port number for mongod and mongos instances
          <br>
  * **Google App Engine (GAE)**
    <br>
    The Google App Engine (GAE) is a Platform-as-a-Service (PaaS) is a GCP service used to deploy the REST API that has been previously configured using the ExpressJs and many other dependencies. Unlike GCE or Kubernetes Engines, GAE offers the flexibility to focus on other concurrent web applications and processes without the need to configure the architecture of the instance. Using the previously created and deployed virtual machine `mongodb-login`, we will use the **External IP Address** for GAE to access the MongoDB.
    <br><br>
    To deploy an application through GAE,
    * On GCP console, go to **Navigation Menu -> App Engine**
    * Click **Create Application**
    * Activate **Cloud Shell**
    * Clone Cloud-HabibulQuran git repository
      ````
      git clone -b habib-login-register https://github.com/Bangkit-2023-Habibul-Quran/Cloud-HabibulQuran.git"
      ````
    * Go to the  folder
      ````
      cd habibulLogin
      ````
    * Make sure that you have a `app.yaml` file using the `ls` command on **Cloud Shell**
    * Example app.yaml file
      ````
      runtime: nodejs16
      service: loginregister
      ````
     * Deploy app to App Engine
       ```
       gcloud app deploy
       ```
     * If any prompt shown press `Y` and click enter
     * View Deployed App after successfully deployed
       ```
       gcloud app browse
       ```

# Library
Libraries used for developing Habibul Quran :
* ExpressJs
* Express-session
* Mongoose
* mongodb
* bcrypt
* Embedded JavaScript (EJS)
* @google-cloud/storage
* Nodemailer
* Nodemon
* path
* multer
* randomstring
* cors
* fs

# API Endpoint
* App Engine Backend:
  * 

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
  - image (max size 2mb), valid image file, required
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
