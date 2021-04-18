import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "modi-properties.firebaseapp.com",
  projectId: "modi-properties",
  storageBucket: "modi-properties.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: "G-TTGY0HDNV0",
};
let firebaseApp, db, auth, storage;

if(!firebase.apps.length){
 firebaseApp = firebase.initializeApp(config);
 db = firebaseApp.firestore()
 auth = firebaseApp.auth();
 storage = firebaseApp.storage();
}

 

export { db, auth, storage, firebase };