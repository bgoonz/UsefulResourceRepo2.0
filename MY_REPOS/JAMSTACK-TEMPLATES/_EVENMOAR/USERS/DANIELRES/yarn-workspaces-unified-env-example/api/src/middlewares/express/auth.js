const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");
const util = require("util");
const request = util.promisify(require("request"));

const config = {
  audience: process.env.AUTH0_AUDIENCE,
  domain: process.env.AUTH0_DOMAIN,
  issuer: process.env.AUTH0_ISSUER
};

const client = jwksClient({
  jwksUri: `https://${config.domain}/.well-known/jwks.json`
});

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
    url: config.issuer + "userinfo",
    headers: { authorization: "Bearer " + token }
  }).then(resp => {
    userInfoCache[token] = resp.body;
  });

  return userInfoCache[token];
};

const verifyToken = token => {
  const options = {
    algorithms: ["RS256"],
    audience: config.audience,
    issuer: config.issuer
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
