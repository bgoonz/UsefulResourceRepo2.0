const { readdir, readFile, writeFile } = require("fs");
const { join } = require("path");
const inbox = join(__dirname + "/..", "inbox");
const outbox = join(__dirname + "/..", "outbox");
const { promisify } = require("util");
const reverseText = (str) => str.split("").reverse().join("");

const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// Read and reverse content of the text files
const readReverseWrite = (file) =>
  readFileAsync(join(inbox, file), "utf8")
    .then(reverseText)
    .then((data) => writeFileAsync(join(outbox, file), data))
    .then(() => console.log(`${file} has been processed`));

readdirAsync(inbox)
  .then((files) => files.map((file) => readReverseWrite(file)))
  .then((promises) => Promise.all(promises))
  .then(() => console.log("*** All files processed ***"))
  .catch((error) => console.log(`Error: ${error}`));
