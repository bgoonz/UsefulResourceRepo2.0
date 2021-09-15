import firebase from "firebase/app";
import "firebase/firestore";

const db = !firebase.apps.length
  ? firebase
      .initializeApp({
        // ...your config
      })
      .firestore()
  : firebase.app().firestore;

export default db;

const { Timestamp } = firebase.firestore;
export { Timestamp };
