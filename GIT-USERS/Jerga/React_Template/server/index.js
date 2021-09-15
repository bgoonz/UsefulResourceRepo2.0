const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const morgan = require("morgan");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");

//DB setup
mongoose.connect("mongodb://localhost:auth/auth");

const app = express();

//app setup
app.use(morgan("morgan")); //logger
app.use(cors());
app.use(bodyParser({ type: "*/*" }));
router(app);

//Server setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
