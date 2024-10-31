import React from 'react';

import './App.css';
//import Scss
import "./assets/scss/themes.scss";
import fakeBackend from './helpers/AuthType/fakeBackend';

// routes
import Route from './Routes/Index';



// Import Firebase Configuration file
 import { initFirebaseBackend } from "./helpers/firebase_helper";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC-hDD-NrNONncGZ4cde1sHFEo7aSkD_k",
  authDomain: "pulse-provider-app.firebaseapp.com",
  projectId: "pulse-provider-app",
  storageBucket: "pulse-provider-app.appspot.com",
  messagingSenderId: "257250602951",
  appId: "1:257250602951:web:b7fa6e6c33531118c0b3e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

// // init firebase backend
// initFirebaseBackend(firebaseConfig);



function App() {
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
