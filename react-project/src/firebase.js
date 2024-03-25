// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeqrgNBZpKMFrmtaISULdSdwsN5NjlHhs",
  authDomain: "taskmanagement-46dfd.firebaseapp.com",
  projectId: "taskmanagement-46dfd",
  storageBucket: "taskmanagement-46dfd.appspot.com",
  messagingSenderId: "1001920196507",
  appId: "1:1001920196507:web:2a67dfc720de0a2746bb3e",
  measurementId: "G-GNM7S5KJ57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };