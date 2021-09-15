import firebase from "firebase/app";
import db from "db";
import { createRef } from "./index";

export const createCollaboration = (collab) =>
  db
    .collection("collaborations")
    .add(collab)
    .then((docRef) => docRef.id);

export const sendMessage = (message) =>
  db
    .collection("profiles")
    .doc(message.toUser)
    .collection("messages")
    .add(message);

export const subscribeToMessages = (userId, callback) =>
  db
    .collection("profiles")
    .doc(userId)
    .collection("messages")
    .onSnapshot((snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    });

export const markMessageAsRead = (message) =>
  db
    .collection("profiles")
    .doc(message.toUser)
    .collection("messages")
    .doc(message.id)
    .update({ isRead: true });

export const fetchCollaborations = (userId) =>
  db
    .collection("collaborations")
    .where("allowedPeople", "array-contains", userId)
    .get()
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );

export const subToCollaboration = (collabId, done) =>
  db
    .collection("collaborations")
    .doc(collabId)
    .onSnapshot((snapshot) => {
      const collab = { id: snapshot.id, ...snapshot.data() };
      done(collab);
    });

export const joinCollaboration = (collabId, uid) => {
  const userRef = createRef("profiles", uid);

  return db
    .collection("collaborations")
    .doc(collabId)
    .update({
      joinedPeople: firebase.firestore.FieldValue.arrayUnion(userRef),
    });
};

export const leaveCollaboration = (collabId, uid) => {
  const userRef = createRef("profiles", uid);

  return db
    .collection("collaborations")
    .doc(collabId)
    .update({
      joinedPeople: firebase.firestore.FieldValue.arrayRemove(userRef),
    });
};

export const subToProfile = (uid, done) =>
  db
    .collection("profiles")
    .doc(uid)
    .onSnapshot((snapshot) => {
      const user = { id: snapshot.id, ...snapshot.data() };
      done(user);
    });

export const sendChatMessage = ({ message, collabId, timestamp }) =>
  db
    .collection("collaborations")
    .doc(collabId)
    .collection("messages")
    .doc(timestamp)
    .set(message);

export const subToMessages = (collabId, done) =>
  db
    .collection("collaborations")
    .doc(collabId)
    .collection("messages")
    .onSnapshot((snapshot) => done(snapshot.docChanges()));

export const startCollaboration = (collabId, expiresAt) =>
  db.collection("collaborations").doc(collabId).update({ expiresAt });
