// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZv4hurLpCfF_TuLtk4mHLQoETj_wn80c",
  authDomain: "dinosaurgame-9d39e.firebaseapp.com",
  projectId: "dinosaurgame-9d39e",
  storageBucket: "dinosaurgame-9d39e.firebasestorage.app",
  messagingSenderId: "90938939544",
  appId: "1:90938939544:web:87525277af30e6b4a718ed",
  measurementId: "G-SKLLTNYXMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);