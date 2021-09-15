const Db = require("./Db");
const { join } = require("path");

// Database file
const dbFile = join("dbs.json");

// LowDB
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync(dbFile)
// const dbs = low(adapter)

// LokiJS
const loki = require("lokijs");
const LokiAdapter = require("./LokiAdapter");
const ldb = new loki(dbFile);
const LokiAdap = new LokiAdapter(ldb);

// DB module instance
const db = new Db(LokiAdap);

db.init("users");
db.add({
  collection: "users",
  data: {
    name: "Ansu",
    age: 23,
  },
});

console.log(db.get("users"));
