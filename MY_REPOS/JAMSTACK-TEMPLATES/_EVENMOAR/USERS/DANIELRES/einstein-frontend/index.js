var express = require("express");
var app = express();

var fakeApi = require("./api/fake-api-server.js");

app.use("/", express.static("build"));
app.use("/api/fake", fakeApi);

app.listen(5000, function () {
  console.log("listening on port 5000");
});
