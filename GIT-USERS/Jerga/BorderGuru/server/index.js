const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

var assetPath = path.join(__dirname, "..", "client/public");

const url = process.env.MONGO_URL;

mongoose.connect(url);

const app = express();

//app setup
app.use(cors());
app.use(bodyParser({ type: "*/*" }));
router(app);

//Server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);

console.log("Server listening on: ", port);

app.use(express.static(assetPath));
