const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");
const router = require("./router");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const database = "mongodb://Filip99:samsung2580@ds151917.mlab.com:51917/heroes";

mongoose.connect(database);

const assetPath = path.join(__dirname, "..", "client");
const app = express();

//app setup
app.use(cors());
app.use(bodyParser({ type: "*/*" }));
app.use(express.static(assetPath));

router(app);

app.get("*", function (req, res) {
  res.sendFile(path.resolve(assetPath, "index.html"));
});

//Server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);

console.log("Server listening on: ", port);
