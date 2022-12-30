// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "blog-c9d7c.firebaseapp.com",
  projectId: "blog-c9d7c",
  storageBucket: "blog-c9d7c.appspot.com",
  messagingSenderId: "176532261519",
  appId: "1:176532261519:web:bd8fa840cd30343c453efa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;