const fs = require("fs");

const [TARGET_FILE, OLD_STR, NEW_STR] = process.argv.slice(2);

fs.readFile(TARGET_FILE, "utf8", (err, data) => {
  if (err) {
    console.log("error reading the file");
    console.log(err);
  }
  const newData = replace(data, OLD_STR, NEW_STR);
  fs.writeFile(TARGET_FILE, newData, "utf8", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("write successful");
    }
  });
});

function replace(string, str1, str2) {
  return string.split(str1).join(str2);
}
