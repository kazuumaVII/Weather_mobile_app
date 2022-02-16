# Weather_mobile_app

<div align="center">
<img align="center" src='https://user-images.githubusercontent.com/43440614/153228047-3d5a20de-cd2a-48bb-bd9b-4b2b0e3e2f13.gif' /> 
</div>


## Introduction 🤔
This is my first project in react native. The goal was to create a weather application that looks like Apple's in addition to adding a cursor that will take into account the time of day to display weather information like on google.
I realized it in parallel with my final project of my school on my free time


<div align="center">
  <img  src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /> 
  <img  src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase=white" />
  <img src="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white" />
  <img  src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=white" /> 
</div>


## Installation & Usage ❕

1. Download and install Expo : https://reactnative.dev/docs/environment-setup


1. Download/Clone this repo

        git clone https://github.com/kazuumaVII/Weather_mobile_app.git
2. `cd` into the root directory and run `yarn start`

        cd Weather_mobile_app
        yarn start


## Mandatory  🌐
I also had to use [redux toolkit](https://redux-toolkit.js.org/) for the first time to manage my component states as well as [Firebase](https://firebase.google.com/) to be able to store and sync my data


## Builtins implemented  🔨

1. Install FireBase : https://firebase.google.com/ 

2. `cd config`  and  edit file `fireBase.js`
 
        const firebaseConfig = {
        apiKey: "API KEY",
        authDomain: "AUTH DOMAIN",
        projectId: "PROJECT ID",
        storageBucket: "STORAGE BUCKET",
        messagingSenderId: "MESSAGIN SENDER ID",
        appId: "APP ID",
        measurementId: "MEASUREMENT ID",
        };

3. Generate api keys in the file `other/KeyApi.jsx`

          // https://www.weatherapi.com/
          export const KEY_WEATHER_CITY = "YOUR API KEY";

          //  https://openweathermap.org/api/one-call-api
          export const KEY_WEATHER_ONE_CALL = "YOUR API KEY";

          // https://console.developers.google.com/apis/library?project=studied-acumen-339517
          // Maps API Key autocomplete
          export const KEY_FIND_CITY = "YOUR API KEY";


