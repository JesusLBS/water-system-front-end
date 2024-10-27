import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_APP_FIREBASE_API_KEY}`,
    authDomain: `${import.meta.env.VITE_APP_FIREBASE_AUTHDOMAIN}`,
    projectId: `${import.meta.env.VITE_APP_FIREBASE_PROJECTID}`,
    storageBucket: `${import.meta.env.VITE_APP_FIREBASE_STORAGEBUCKET}`,
    messagingSenderId: `${import.meta.env.VITE_APP_FIREBASE_MESSAGINGSENDERID}`,
    appId: `${import.meta.env.VITE_APP_FIREBASE_APPID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
