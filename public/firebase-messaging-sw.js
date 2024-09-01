self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

self.firebase.initializeApp({
  apiKey: "AIzaSyAmNoUlwaw0tjl6foa9KBvFdy5gNuvIhlw",
  authDomain: "elmadrasah---ga4.firebaseapp.com",
  projectId: "elmadrasah---ga4",
  storageBucket: "elmadrasah---ga4.appspot.com",
  messagingSenderId: "381013725217",
  appId: "1:381013725217:web:9e8491a0484759a5169360",
  measurementId: "G-3M4SCCSVYL"
});

const messaging = self.firebase.messaging();
