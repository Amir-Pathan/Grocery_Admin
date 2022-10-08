// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

import { getStorage } from "firebase/storage";
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo_n1ogyh6ybzwQA3nPLDkLl-tGECZJsw",
  authDomain: "project-f9f4f.firebaseapp.com",
  projectId: "project-f9f4f",
  storageBucket: "project-f9f4f.appspot.com",
  messagingSenderId: "551092319977",
  appId: "1:551092319977:web:f4c9e41fc64f34bc50e278",
  measurementId: "G-CH0RP2LX5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app)

export {db,storage}