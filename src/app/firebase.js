// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvTqubI19Dxi6D8hk3O8STUsttKRH9eOM",
  authDomain: "devlogs-86a3e.firebaseapp.com",
  projectId: "devlogs-86a3e",
  storageBucket: "devlogs-86a3e.firebasestorage.app",
  messagingSenderId: "877480137671",
  appId: "1:877480137671:web:8fde45fc41d8146c62ffe2",
  measurementId: "G-Z0P5V52M26",
};

// Initialize Firebase

let analytics;
/** @type {import('firebase/firestore').Firestore} */
let db;
/** @type {import('firebase/auth').Auth} */
let auth;
let app;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, analytics, db, auth };
