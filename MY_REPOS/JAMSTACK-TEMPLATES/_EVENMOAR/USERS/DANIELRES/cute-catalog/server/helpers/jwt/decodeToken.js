const jwt = require("jsonwebtoken");

const decodeToken = ({ token, secret = process.env.AUTH_SECRET }) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject({ error: "Unauthorized" });
      } else {
        resolve(decoded);
      }
    });
  });

module.exports = decodeToken;
