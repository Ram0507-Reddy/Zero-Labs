import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9SbZkSC83foss-Q5kVom-KwhH0xeWKDY",
  authDomain: "zero-labs-536a1.firebaseapp.com",
  projectId: "zero-labs-536a1",
  storageBucket: "zero-labs-536a1.firebasestorage.app",
  messagingSenderId: "168254621931",
  appId: "1:168254621931:web:455a65027545dd1b18d6ae",
  measurementId: "G-67616H4KKV"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
