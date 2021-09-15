const express = require("express");
const faker = require("faker");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/names", (req, res) => {
  const randomName = faker.name.findName();
  res.json({ name: randomName });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
