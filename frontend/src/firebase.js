import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d50f6.firebaseapp.com",
  projectId: "mern-estate-d50f6",
  storageBucket: "mern-estate-d50f6.appspot.com",
  messagingSenderId: "564973071806",
  appId: "1:564973071806:web:57b27972498758cb875def",
  measurementId: "G-QWV09QX7S6",
};

export const app = initializeApp(firebaseConfig);
