// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5hMjXsaUP9xlfdOqpM7ZXDc76BHNu05I",
  authDomain: "myperpus-e30f3.firebaseapp.com",
  projectId: "myperpus-e30f3",
  storageBucket: "myperpus-e30f3.firebasestorage.app",
  messagingSenderId: "199289082459",
  appId: "1:199289082459:web:773a96d6a8ffce56cca57e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Auth dengan AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Inisialisasi Firestore dan Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
