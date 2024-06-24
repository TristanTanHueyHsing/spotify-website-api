// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAXgHcGC_KJ7meZiADf-o9CBfqRO4p18-Q",
    authDomain: "spotify-api-web.firebaseapp.com",
    projectId: "spotify-api-web",
    storageBucket: "spotify-api-web.appspot.com",
    messagingSenderId: "570049954210",
    appId: "1:570049954210:web:eb538322b08f94b04c32fb",
    measurementId: "G-0KLX75XYRV"
  };
  

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = app.firestore();

export { db };
