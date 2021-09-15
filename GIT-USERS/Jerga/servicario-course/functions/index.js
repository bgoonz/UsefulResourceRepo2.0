const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();

exports.onUserStatusChanged = functions.database
  .ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();

    const userFirestoreRef = firestore.doc(`/profiles/${context.params.uid}`);

    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();

    if (status.last_changed > eventStatus.last_changed) {
      return null;
    }

    eventStatus.last_changed = new Date(eventStatus.last_changed);
    return userFirestoreRef.update(eventStatus);
  });
