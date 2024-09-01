// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, Messaging } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmNoUlwaw0tjl6foa9KBvFdy5gNuvIhlw",
  authDomain: "elmadrasah---ga4.firebaseapp.com",
  projectId: "elmadrasah---ga4",
  storageBucket: "elmadrasah---ga4.appspot.com",
  messagingSenderId: "381013725217",
  appId: "1:381013725217:web:9e8491a0484759a5169360",
  measurementId: "G-3M4SCCSVYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging: Messaging = getMessaging(app);

export { messaging };

