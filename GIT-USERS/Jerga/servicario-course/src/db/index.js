import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase
  .initializeApp({
    apiKey: "AIzaSyCywhXBN24vpBvJLF9ELonOANiElpcyghM",
    authDomain: "servicario.firebaseapp.com",
    databaseURL: "https://servicario.firebaseio.com",
    projectId: "servicario",
    storageBucket: "servicario.appspot.com",
    messagingSenderId: "279450226918",
    appId: "1:279450226918:web:dc6d344dfe6703eb2b2b27",
    measurementId: "G-ES0BWGWWLM",
  })
  .firestore();

export default db;

const { Timestamp } = firebase.firestore;
export { Timestamp };
