require("dotenv").config();
const prod = process.env.NODE_ENV === "production";

module.exports = {
  env: {
    BASE_URL: prod ? "https://jake-test.now.sh" : "http://localhost:3000",
  },
};
