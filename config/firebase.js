const { initializeApp } = require("firebase/app");
const { getStorage, uploadBytes } = require("firebase/storage")
const admin = require("firebase-admin");

// path to your service account key file
const serviceAccount = require("../private/keyInfo.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// put your firebase configurations below
const firebaseConfig = {
  apiKey: "AIzaSyDPPq0FoMmf-YyxHFJKUU7kqs-c1uTHn1Y",
  authDomain: "file-transfer-18e8e.firebaseapp.com",
  projectId: "file-transfer-18e8e",
  storageBucket: "file-transfer-18e8e.appspot.com",
  messagingSenderId: "103008805790",
  appId: "1:103008805790:web:ab46239af480510957ac8f",
  measurementId: "G-CZL0PQ4PNV"};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = admin.firestore();

module.exports = { storage, uploadBytes, db }