import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB_t8D_XE6j1jafZXKVR3dDM97A284QJrs",
    authDomain: "chatty--app.firebaseapp.com",
    projectId: "chatty--app",
    storageBucket: "chatty--app.appspot.com",
    messagingSenderId: "617837362774",
    appId: "1:617837362774:web:23fa55d65f5c52505345f7",
    measurementId: "G-96T16EQFWW"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth;
  export const db = firebase.database();