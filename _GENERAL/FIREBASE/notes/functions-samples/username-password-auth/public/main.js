"use strict";

/**
 * Returns the ID of the Firebase project.
 */
function getFirebaseProjectId() {
  return firebase.app().options.authDomain.split(".")[0];
}

// Initializes the Demo.
function Demo() {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      // Shortcuts to DOM Elements.
      this.signInUsername = document.getElementById("demo-sign-in-username");
      this.signInPassword = document.getElementById("demo-sign-in-password");
      this.signInButton = document.getElementById("demo-sign-in-button");
      this.signInError = document.getElementById("demo-sign-in-error");
      this.signOutButton = document.getElementById("demo-sign-out-button");
      this.nameContainer = document.getElementById("demo-name-container");
      this.uidContainer = document.getElementById("demo-uid-container");
      this.deleteButton = document.getElementById("demo-delete-button");
      this.signedOutCard = document.getElementById("demo-signed-out-card");
      this.signedInCard = document.getElementById("demo-signed-in-card");

      // Bind events.
      this.signInButton.addEventListener("click", this.signIn.bind(this));
      this.signOutButton.addEventListener("click", this.signOut.bind(this));
      this.deleteButton.addEventListener(
        "click",
        this.deleteAccount.bind(this)
      );
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }.bind(this)
  );
}

// Triggered on Firebase auth state change.
Demo.prototype.onAuthStateChanged = function (user) {
  if (user) {
    this.nameContainer.innerText = user.displayName;
    this.uidContainer.innerText = user.uid;
    this.signedOutCard.style.display = "none";
    this.signedInCard.style.display = "block";
  } else {
    this.signedOutCard.style.display = "block";
    this.signedInCard.style.display = "none";
  }
};

// Initiates the sign-in flow.
Demo.prototype.signIn = function () {
  var err = this.signInError;
  err.innerText = "";
  var req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status === 400 || req.status === 401) {
      err.innerText = "Invalid username or password";
      return;
    }
    if (req.status !== 200) {
      err.innerText =
        "Invalid response from Firebase Cloud Function " + req.status;
      return;
    }
    var data = JSON.parse(req.responseText);
    if (data.token) {
      firebase.auth().signInWithCustomToken(data.token);
    } else {
      console.log("ERROR RESPONSE: " + req.responseText);
      err.innerText =
        "Invalid response from Firebase Cloud Function see developer console for details";
    }
  };
  req.onerror = function () {
    err.innerText =
      "Network error in Firebase Cloud Function call see developer console for details";
  };
  var url =
    "https://us-central1-" +
    getFirebaseProjectId() +
    ".cloudfunctions.net/auth";
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(
    JSON.stringify({
      username: this.signInUsername.value,
      password: this.signInPassword.value,
    })
  );
};

// Signs-out of Firebase.
Demo.prototype.signOut = function () {
  firebase.auth().signOut();
};

// Deletes the user's account.
Demo.prototype.deleteAccount = function () {
  firebase
    .auth()
    .currentUser.delete()
    .then(function () {
      window.alert("Account deleted");
    })
    .catch(function (error) {
      if (error.code === "auth/requires-recent-login") {
        window.alert(
          "You need to have recently signed-in to delete your account. Please sign-in and try again."
        );
        firebase.auth().signOut();
      }
    });
};

// Load the demo.
new Demo();
