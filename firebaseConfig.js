// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLZC-Ct9gTZm4c38v_RsYPcW78P1NO2GQ",
  authDomain: "prefeitura-reclame.firebaseapp.com",
  projectId: "prefeitura-reclame",
  storageBucket: "prefeitura-reclame.appspot.com",
  messagingSenderId: "758688225151",
  appId: "1:758688225151:web:556f12c6efb241ea582c4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);