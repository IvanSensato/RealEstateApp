// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKrj3rAeLN5u28lQxm8j60M6d-P3U9sGM",
  authDomain: "sensato-real-estate.firebaseapp.com",
  projectId: "sensato-real-estate",
  storageBucket: "sensato-real-estate.appspot.com",
  messagingSenderId: "879714226456",
  appId: "1:879714226456:web:511867db166b9a4f1f0e6d",
  measurementId: "G-JDQJ2ZW14E"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//getAnalytics(app);
export const db = getFirestore()