// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3_L5IIALB6qGY1FffwgAUS71hA7eJkCw",
  authDomain: "sparta-react-basic-d1d45.firebaseapp.com",
  projectId: "sparta-react-basic-d1d45",
  storageBucket: "sparta-react-basic-d1d45.appspot.com",
  messagingSenderId: "165598169817",
  appId: "1:165598169817:web:2eb18b2fdaff6d218a8cc8",
  measurementId: "G-3233H8DNGM"
};


initializeApp(firebaseConfig)
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();