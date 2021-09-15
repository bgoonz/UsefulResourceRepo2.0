const path = require("path");
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

exports.formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);
