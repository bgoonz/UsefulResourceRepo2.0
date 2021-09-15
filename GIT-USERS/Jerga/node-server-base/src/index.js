import "babel-polyfill";

import express from "express";
import mongoose from "mongoose";
import keys from "../config/keys";
import bodyParser from "body-parser";

require("./models/User");

const app = express();
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI);

require("./routes/authRoutes.js")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("connected to", PORT);
});
