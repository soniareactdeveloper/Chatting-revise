// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Hg2XoMFvIr6MuYrUwedSru7YjG7CYFg",
  authDomain: "again-7d6ff.firebaseapp.com",
  projectId: "again-7d6ff",
  storageBucket: "again-7d6ff.appspot.com",
  messagingSenderId: "745755683962",
  appId: "1:745755683962:web:62460e3245c4c795111fc3",
  measurementId: "G-LEQLQ3FJTC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
