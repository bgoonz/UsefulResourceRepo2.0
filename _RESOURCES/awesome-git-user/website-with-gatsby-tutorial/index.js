const fetch = require("node-fetch");
const fs = require("fs");

const url =
  "https://gist.githubusercontent.com/willjw3/e3d16cfa0b5794f06fd83fe6a237d1f7/raw/bae36d9ecb204463320bc8fa2fc8904cb30476ca/demotivation.json";

async function getData() {
  let response = await fetch(url);
  let data = await response.json();
  let quotes = await JSON.stringify(data);
  fs.writeFileSync("./data/demotivation.json", quotes);
}
getData();
