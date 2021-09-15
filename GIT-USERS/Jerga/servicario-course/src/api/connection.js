import firebase from "firebase/app";
import "firebase/database";

export const createFirebaseRef = (collection, id) =>
  firebase.database().ref(`/${collection}/${id}`);

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const isOnlineForFirestore = {
  state: "online",
  last_changed: firebase.firestore.FieldValue.serverTimestamp(),
};

export const onConnectionChanged = (callback) =>
  firebase
    .database()
    .ref(".info/connected")
    .on("value", (snapshot) => {
      callback(snapshot.val());
    });
