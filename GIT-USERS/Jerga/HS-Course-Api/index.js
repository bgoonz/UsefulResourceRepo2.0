const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const cardRoutes = require("./routes/cards");

const cardDecks = require("./card-decks.json");

const app = express();

const API_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.API_KEY
    : require("./keys")["API_KEY"];

// const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4200', 'http://localhost:8080']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS, Allowed domains: http://localhost:3000', 'http://localhost:3001', 'http://localhost:4200', 'http://localhost:8080'))
//     }
//   }
// }

app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
  const reqApiKey = req.get("X-Ionic-Course-Key");

  if (reqApiKey === API_KEY) {
    next();
  } else {
    return res.status(422).send({ errors: { message: "Wrong Api Key!" } });
  }
});

app.get("/info", function (req, res) {
  return res.json(cardDecks);
});

app.use("/cards", cardRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("App is running on port: " + PORT);
});
