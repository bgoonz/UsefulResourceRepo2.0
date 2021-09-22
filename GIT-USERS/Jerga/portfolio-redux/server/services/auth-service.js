const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const namespace = "https://portfel.com/";

exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://eincode.eu.auth0.com/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.
  audience: "N1hKhhP0PacJO4EjIWURIcnzBt88P3Q1",
  issuer: `https://eincode.eu.auth0.com/`,
  algorithms: ["RS256"],
});

// exports.checkJwt;

exports.checkSuperAdmin = (req, res, next) => {
  const user = req.user;

  if (user && user[namespace + "role"] === "admin") {
    next();
  } else {
    return res
      .status(401)
      .send([{ title: "Not Authirized", detail: "Not Sufictient Rights" }]);
  }
};

// getToken: function fromHeaderOrQuerystring (req) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//         return req.headers.authorization.split(' ')[1];
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   }
