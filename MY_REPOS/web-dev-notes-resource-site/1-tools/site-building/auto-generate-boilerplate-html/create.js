let styles = [];
let scripts = [];
let metaTags = [];
let specifiedContents = [`<h1>this is an html document</h1>`, ""];

const fs = require("fs");

function tagify(arr) {
  let tagsArr = [];
  for (let i = 0; i < arr.length; i++) {
    let curPath = arr[i];
    let tag =
      '<div class="btn"><a class="btn" href="' +
      `${curPath}` +
      `"` +
      `>${curPath.slice(0, 1) + curPath.slice(6)}</a></div>`;
    console.log(tag);
    tagsArr.push(tag);
    tagsArr.push("\n");
    var tagStr = tagsArr.join("");
    console.log("tagStr: ", tagStr);
  }
  return tagStr;
}
let data = tagify(arr1);
fs.writeFile("output.txt", data, (err) => {
  // In case of a error throw err.
  if (err) throw err;
});
