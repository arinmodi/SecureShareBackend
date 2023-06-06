const { initializeApp } = require("firebase/app");
const { getStorage, uploadBytes } = require("firebase/storage")
const admin = require("firebase-admin");

// path to your service account key file
const serviceAccount = require("../private/keyInfo.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firebaseConfig = {
  // your firebase configurations
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = admin.firestore();

module.exports = { storage, uploadBytes, db }