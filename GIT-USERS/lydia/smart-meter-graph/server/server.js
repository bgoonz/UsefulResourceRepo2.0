const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const data = require('./key');

MongoClient.connect(data.MONGO_URI, (err, db) => {
  const dbo = db.db("arduino-graph");
  dbo.collection("current-usage").find({}).toArray((err, res) => {
    app.get('/api/data', (req, res) => {
      res.send(result)
    })
  });
});

app.listen(5000);