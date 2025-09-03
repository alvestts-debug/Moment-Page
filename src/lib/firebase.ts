import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "momento-noroeste",
  appId: "1:571106287682:web:6947cdc30ea42549828ddb",
  storageBucket: "momento-noroeste.firebasestorage.app",
  apiKey: "AIzaSyDk9c4uF1TxxSnS2J0-CDAlanjKBG7TuyI",
  authDomain: "momento-noroeste.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "571106287682",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
