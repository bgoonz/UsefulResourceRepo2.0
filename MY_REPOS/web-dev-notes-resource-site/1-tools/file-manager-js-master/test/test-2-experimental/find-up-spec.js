const findUp = require("find-up");
findUp("index.js").then((filepath) => {
  console.log(filepath);
});
