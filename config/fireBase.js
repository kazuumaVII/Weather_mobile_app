import { initializeApp } from "firebase/app";
import "firebase/database";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "API KEY",
  authDomain: "AUTH DOMAIN",
  projectId: "PROJECT ID",
  storageBucket: "STORAGE BUCKET",
  messagingSenderId: "MESSAGIN SENDER ID",
  appId: "APP ID",
  measurementId: "MEASUREMENT ID",
};

initializeApp(firebaseConfig);

const dataFireBase = getFirestore();

export default dataFireBase;
