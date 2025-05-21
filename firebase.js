// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANsoWxvbcFsK91KmchJkEqEQxzvz5Q44M",
  authDomain: "design-portfolio-65b42.firebaseapp.com",
  projectId: "design-portfolio-65b42",
  storageBucket: "design-portfolio-65b42.firebasestorage.app",
  messagingSenderId: "841492243491",
  appId: "1:841492243491:web:268d634ceaa34f9ba37d96",
  measurementId: "G-6FJ9PW7TN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);