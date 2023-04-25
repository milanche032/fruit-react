import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZTAjWKuYw4UZBM6P9BWzKsFy4837Cv_I",
  authDomain: "fruits-35fe1.firebaseapp.com",
  databaseURL: "https://fruits-35fe1-default-rtdb.europe-west1.firebasedatabase.app" ,
  projectId: "fruits-35fe1",
  storageBucket: "fruits-35fe1.appspot.com",
  messagingSenderId: "916950754744",
  appId: "1:916950754744:web:ae982a7a36292ab1045b4d",
  measurementId: "G-03PP3XHHSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// Initialize Firebase authentication
export const auth = getAuth(app);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);