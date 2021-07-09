"use strict";

const admin = require("firebase-admin");
const cookieParser = require("cookie-parser")();
const functions = require("firebase-functions");

// Express middleware that checks if a Firebase ID Tokens is passed in the `Authorization` HTTP
// header or the `__session` cookie and decodes it.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// When decoded successfully, the ID Token content will be added as `req.user`.
async function validateFirebaseIdToken(req, res, next) {
  functions.logger.log("Check if request is authorized with Firebase ID token");

  const idToken = await getIdTokenFromRequest(req, res);
  if (idToken) {
    await addDecodedIdTokenToRequest(idToken, req);
  }
  next();
}

/**
 * Returns a Promise with the Firebase ID Token if found in the Authorization or the __session cookie.
 */
function getIdTokenFromRequest(req, res) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    functions.logger.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    return Promise.resolve(req.headers.authorization.split("Bearer ")[1]);
  }
  return new Promise((resolve, reject) => {
    cookieParser(req, res, () => {
      if (req.cookies && req.cookies.__session) {
        functions.logger.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        resolve(req.cookies.__session);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Returns a Promise with the Decoded ID Token and adds it to req.user.
 */
async function addDecodedIdTokenToRequest(idToken, req) {
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    functions.logger.log("ID Token correctly decoded", decodedIdToken);
  } catch (error) {
    functions.logger.error("Error while verifying Firebase ID token:", error);
  }
}

exports.validateFirebaseIdToken = validateFirebaseIdToken;
