var express = require('express'),
app = express(),
cons = require("consolidate"),
router = require("./server/router");

var APP_PORT = 3001;

app.configure(function() {
  app.engine("html", cons.hogan);
  app.set("view engine", "html");
  app.set("views", __dirname + "/templates");
  app.use(express.static(__dirname));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

router(app);
app.listen(APP_PORT);