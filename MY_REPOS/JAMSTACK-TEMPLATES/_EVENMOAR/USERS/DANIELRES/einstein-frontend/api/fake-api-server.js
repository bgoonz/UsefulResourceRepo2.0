"use strict";

var jsonServer = require("json-server");
var server = require("express")();
var bodyParser = require("body-parser");

var faker = require("./faker.js");
var demoUser = require("./demo_user");

server.use(bodyParser.json());

server.post("/login", function (req, res) {
  if (req.body.username || req.headers.authorization) {
    res
      .header("Access-Control-Allow-Origin", "*")
      .header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
      .header("Access-Control-Allow-Headers", "Content-Type")
      .status(200)
      .json(demoUser);
  }
});

server.post("/discussion_entries", function (req, res, next) {
  req.body.author = demoUser;
  next();
});

server.use(jsonServer.defaults);
server.use(jsonServer.router(faker));

module.exports = server;

if (require.main === module) {
  server.listen(3001, function () {
    console.log("serving fake api on port 3001");
  });
}
