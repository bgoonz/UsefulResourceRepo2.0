"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const firebaseUser = require("./firebaseUser");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(firebaseUser.validateFirebaseIdToken);

app.get("/", (req, res) => {
  // @ts-ignore
  const user = req.user;

  functions.logger.log("Signed-in user:", user);
  return res.render("user", {
    user: user,
  });
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);
