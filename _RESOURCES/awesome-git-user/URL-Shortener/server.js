"use strict";

require("dotenv").config();
var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bodyParser = require("body-parser");
var dns = require("dns");
var fs = require("fs");
var cors = require("cors");

var app = express();

var port = process.env.PORT || 3000;

var yuarel;

/** this project needs a db !! **/
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected, yo!");
  db.db.listCollections().toArray(function (err, names) {
    console.log(names);
    if (names.length === 0) {
      console.log("creating collection");
      var newTest = new Test({
        original_url: "www.google.com",
        short_url: 1,
      });
      newTest.save(function (err, newTest) {
        if (err) {
          return console.error(err);
        }
      });
      console.log(names[0].name);
    } else {
      console.log("Collection name: " + names[1].name);
    }
  });
});

app.use(cors());

var testSchema = new Schema({
  original_url: String,
  short_url: Number,
});

var Test = mongoose.model("Test", testSchema);

/** this project needs to parse POST bodies **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/tester/new", function (req, res) {
  yuarel = req.body.url;
  var regex = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i;
  var yuarel1 = yuarel.match(regex)[1];
  var w3 = dns.lookup(yuarel1, function (err, address, family) {
    if (address != undefined) {
      Test.findOne()
        .sort("-short_url") // give me the max
        .exec(function (err, member) {
          if (err) {
            return;
          }
          var qt = member.short_url;
          console.log(qt);
          var newTest = new Test({
            original_url: yuarel1,
            short_url: qt + 1,
          });
          newTest.save(function (err, newTest) {
            if (err) {
              return console.error(err);
            }
          });
          res.json({ original_url: yuarel1, short_url: qt + 1 });
        });
    } else {
      res.json({ error: "invalid URL" });
    }
  });
  return;
});

app.get("/api/tester/:new", function (req, res) {
  var news = req.params.new;
  Test.findOne({ short_url: news }, function (err, docs) {
    var last = docs.original_url;
    res.status(301).redirect("http://" + last);
  });
});

app.listen(port, function () {
  console.log("Node.js listening on port " + port);
});
