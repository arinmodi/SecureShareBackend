const { initializeApp } = require("firebase/app");
const { getStorage, uploadBytes } = require("firebase/storage")
const admin = require("firebase-admin")

// replace with your firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDPPq0FoMmf-YyxHFJKUU7kqs-c1uTHn1Y",
    authDomain: "file-transfer-18e8e.firebaseapp.com",
    projectId: "file-transfer-18e8e",
    storageBucket: "file-transfer-18e8e.appspot.com",
    messagingSenderId: "103008805790",
    appId: "1:103008805790:web:ab46239af480510957ac8f",
    measurementId: "G-CZL0PQ4PNV"
};

admin.initializeApp({
  credential : admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // replace `\` and `n` character pairs w/ single `\n` character
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  })
})

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { storage, uploadBytes }