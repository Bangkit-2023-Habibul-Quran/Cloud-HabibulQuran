# HabibulQuran-Cloud Computing
Bangkit 2023 Product-based Capstone Project 
* **HabibulQuran : Al-Quran Learning Application** 

# Introduction
This API data source comes from [quran-api](https://api.quran.gading.dev) by saving the data into a JSON file with a new structure for better usage and performance. 

This API is created using the [Express Web Application Framework](https://expressjs.com/) and several additional libraries that you can see in the `package.json` file.

**File Structure :**

```
habibFitur
├── data/
│	├── alquran.json
│	└── hijaiyah.json
│	└── tes.json
├── handlers/
|	├── huruf.js
|	├── surat.js
|	├── tes.js
├── middlewares.js
├── routes.js
├── server.js
├── package.json
└── package-lock.json

```

# Features
- [x] Text surahs and verses in arabic
- [x] Translation surahs and verses (for now, only Bahasa Indonesia)
- [x] Audio (***Syekh. Mishary Rashid Al-Afasy*** murrotal edition)
- [x] Hijaiyah letters 
- [x] The correct pronounciation of hijaiyah letters

# Deployment with Google App Engine
* **Google Cloud Platform (GCP)**
  * **Prerequisites** 
    <br>
    Here are several points to consider before proceeding:
    * Install or update to the latest version of the **Google Cloud CLI**
    * Set a default region and zone `asia-southeast2-a`
    * Enable **Compute Engine** and **App Engine** APIs 
      <br><br>
  * **Google App Engine (GAE)**
    <br>
    The Google App Engine (GAE) is a Platform-as-a-Service (PaaS) is a GCP service used to deploy the REST API that has been previously configured using the ExpressJs and many other dependencies. Unlike GCE or Kubernetes Engines, GAE offers the flexibility to focus on other concurrent web applications and processes without the need to configure the architecture of the instance.
    <br><br>
    To deploy an application through GAE
    * On GCP console, go to **Navigation Menu -> App Engine**
    * Click **Create Application**
    <br>
  * **Cloud Shell**
    <br>
    * Activate **Cloud Shell**
    * Clone Cloud-HabibulQuran git repository
      ````
      git clone -b habib-quran-fitur https://github.com/Bangkit-2023-Habibul-Quran/Cloud-HabibulQuran.git habibFitur
      ````
    * Go to the  folder
      ````
      cd habibFitur
      ````
    * Make sure that you have a `app.yaml` file using the `ls` command on **Cloud Shell**
    * Example app.yaml file
      ````
      runtime: nodejs16
      service: fitur
      ````
     * Deploy app to App Engine
       ```
       gcloud app deploy
       ```
     * If any prompt shown press `Y` and click enter
     * View Deployed App after successfully deployed
       ```
       gcloud app browse -s fitur
       ```
# API Endpoint
### Endpoint Al-Quran
- [x] `/huruf` = Return list of hijaiyah letters.
- [x] `/huruf/{huruf}` = Return specific hijaiyah letters. *example: [/huruf/1](https://fitur-dot-habibulquran.et.r.appspot.com/huruf/1)*
- [x] `/listsurat` = Return list of surahs of the Al-Quran.
- [x] `/surat/{surat}` = Return specific surahs of the Al-Quran.. *example: [/surat/1](https://fitur-dot-habibulquran.et.r.appspot.com/surat/1)*
- [x] `/surat/{surat}/{ayat}` = Return specific Al-Quran verses. *example: [/surat/1/1](https://fitur-dot-habibulquran.et.r.appspot.com/surat/1/1)*
- [x] `/tes` = Return the list of surahs tested.

# Library
Libraries used for developing Habib Quran Fitur :
* ExpressJs
* cors
* dotEnv

# Available Commands
 * Install All library packages
      ````
     npm i
      ````
 * run the server
      ````
      npm run start
      ````
