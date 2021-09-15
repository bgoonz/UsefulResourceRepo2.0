# portfolio-jerga-api

Api Server - Udemy course material

### 1. Run `npm install` to install all of the dependencies

### 2. in `config` folder create `dev.js` file so you have `config/dev.js` and specify following:

```javascript
module.exports = {
  DB_URI: "YOU_MONGO_ATLAS_DB_URI", // Get from https://www.mongodb.com/cloud/atlas
  AUTH0_NAMESPACE: "YOUR_AUTH0_NAMESPACE", // Get from https://auth0.com/
  AUTH0_TOKEN_URL: "YOUR_AUTH0_TOKEN_URL",
  AUTH0_CLIENT_ID: "YOUR_AUTH0_CLIENT_ID",
  AUTH0_CLIENT_SECRET: "YOUR_AUTH0_CLIENT_SECRET",
  AUTH0_AUDIENCE: "YOUR_AUTH0_AUDIENCE",
  AUTH0_DOMAIN: "YOUR_AUTH0_DOMAIN",
};
```

### 3. run `npm run dev`
