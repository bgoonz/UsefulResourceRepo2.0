const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");
const util = require("util");
const request = util.promisify(require("request"));

const env = require("./env");

const client = jwksClient({ jwksUri: env.AUTH0_JKWS_URI });

let signingKeyCache = {};
const getKeyCached = (header, callback) => {
  if (signingKeyCache[header]) {
    return callback(null, signingKeyCache[header]);
  }

  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    const signingKey = key.publicKey || key.rsaPublicKey;
    signingKeyCache[header] = signingKey;
    callback(null, signingKey);
  });
};

let userInfoCache = {};
const getUserInfoCached = async token => {
  if (userInfoCache[token]) return userInfoCache[token];
  await request({
    url: env.AUTH0_ISSUER + "userinfo",
    headers: { authorization: "Bearer " + token }
  }).then(resp => {
    userInfoCache[token] = resp.body;
  });

  return userInfoCache[token];
};

const verifyToken = token => {
  const options = {
    algorithms: ["RS256"],
    audience: env.AUTH0_AUDIENCE,
    issuer: env.AUTH0_ISSUER
  };

  return new Promise((resolve, reject) =>
    jwt.verify(token, getKeyCached, options, (err, decoded) =>
      err ? reject(err) : resolve(decoded)
    )
  );
};

module.exports = {
  getUserInfoCached,
  verifyToken
};
