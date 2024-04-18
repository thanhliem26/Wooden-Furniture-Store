// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY_FIREBASE,
  authDomain: process.env.VITE_AUTH_DOMAIN_FIREBASE,
  projectId: process.env.VITE_PROJECT_ID_FIREBASE,
  storageBucket: process.env.VITE_STORAGE_BUCKET_FIREBASE,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID_FIREBASE,
  appId: process.env.VITE_APP_ID_FIREBASE,
  measurementId: process.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authentication = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

const providerFacebook = new FacebookAuthProvider();

export {authentication, providerGoogle, providerFacebook}