import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Firebase configuration - Sugan Shop
const firebaseConfig = {
  apiKey: "AIzaSyDDXUFUcOAY3VVzFfyyFJeZ31MxCZ15AfU",
  authDomain: "sugan-shop.firebaseapp.com",
  projectId: "sugan-shop",
  storageBucket: "sugan-shop.firebasestorage.app",
  messagingSenderId: "773838161891",
  appId: "1:773838161891:web:afbc04d334c6de398702d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;
