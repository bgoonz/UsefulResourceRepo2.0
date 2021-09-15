const dotenv = require("dotenv");
const path = require("path");

const env = process.env.NODE_ENV;

// test (development overrides )
(() => {
  if (env !== "test") return;
  const file = ".env.test";
  console.log(`[env/init] Loading env vars from: "${file}"`);
  dotenv.load({ path: path.resolve(file) });
})();

// development secrets
(() => {
  const file = ".env.local";
  console.log(`[env/init] Loading env vars from: "${file}"`);
  dotenv.load({ path: path.resolve(file) });
})();

// development
if (env === "dev" || env === "development" || env === "test") {
  const file = ".env";
  console.log(`[env/init] Loading env vars from: "${file}"`);
  dotenv.load({ path: path.resolve(file) });
}
