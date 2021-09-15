import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export const fb = firebase.initializeApp({
  apiKey: "AIzaSyCFV8WzwbtDmAlNWk4mo7wPmMsCIGZqdps",
  authDomain: "exchangerio.firebaseapp.com",
  databaseURL: "https://exchangerio.firebaseio.com",
  projectId: "exchangerio",
  storageBucket: "exchangerio.appspot.com",
  messagingSenderId: "723455795482",
  appId: "1:723455795482:web:1081598cef8044f51e8ca3",
});

// Get a Firestore instance
export const db = fb.firestore();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
