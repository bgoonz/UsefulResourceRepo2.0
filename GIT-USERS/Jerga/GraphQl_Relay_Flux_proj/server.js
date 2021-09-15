import express from "express";
import schema from "./data/schema";
import GraphQLHTTP from "express-graphql";
import { mongoVar } from "./variables";

var MongoClient = require("mongodb");

let app = express();

app.use(express.static("public"));

let db;

MongoClient.connect(mongoVar.uri, (err, database) => {
  if (err) throw err;

  db = database;

  app.use(
    "/graphql",
    GraphQLHTTP({
      schema: schema(db),
      graphiql: true,
    })
  );

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
});
//
// app.get('/data/links', (req,res) => {
//
//     db.collection("links").find({}).toArray((err, links) => {
//         if(err) throw err;
//
//         res.json(links);
//     });
// });
