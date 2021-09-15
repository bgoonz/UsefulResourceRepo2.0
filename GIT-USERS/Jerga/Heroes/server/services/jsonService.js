var fs = require("fs");
const path = require("path");
const jsonPath = path.join(__dirname, "../data", "cars.json");

var jsonOBJ;

exports.getCarsJson = function (fn) {
  var json;

  fs.readFile(jsonPath, "utf8", function (err, data) {
    if (err) throw err;
    json = JSON.parse(data);
    fn(json);
  });
};

exports.getParOfJson = function (json, pageNum) {
  var arr;
  arr = json.cars;
  jsonOBJ = arr.length;
  var subArray = arr.slice(pageNum * 10 - 10, 10 * pageNum);
  return JSON.stringify(subArray);
};

exports.getNumOfCars = function (json) {
  if (json) {
    return json.cars.length.toString();
  } else {
    throw new Error();
  }
};
