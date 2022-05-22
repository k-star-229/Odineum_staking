import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDDr1gHYhMKooBlVOHUMSXZvS-UXiZW52s",
  authDomain: "odineum-1501e.firebaseapp.com",
  projectId: "odineum-1501e",
  storageBucket: "odineum-1501e.appspot.com",
  messagingSenderId: "900307091340",
  appId: "1:900307091340:web:e54495d06714f1d4bba0a9",
  measurementId: "G-PN4Q9YPY4J"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
