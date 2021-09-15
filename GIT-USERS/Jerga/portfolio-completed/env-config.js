const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.BASE_URL": prod
    ? "http://localhost:3000"
    : "http://localhost:3000",
  "process.env.NAMESPACE": "http://localhost:3000",
  "process.env.CLIENT_ID": "gd7EQfW84Qq4RiE9ul9uhxkPY81Zo3sC",
};
