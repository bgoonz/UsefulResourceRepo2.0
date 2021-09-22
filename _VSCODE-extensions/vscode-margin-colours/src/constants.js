// eslint-disable-next-line max-len
const colourRegex =
  /(#(?:[0-9a-fA-F]{2}){2,4}\b|#[0-9a-fA-F]{3}\b|(?:rgba?|hsla?)\(\s*(?:\d+%?(?:,|\s)+){2,3}[\s/]*[\d.]+%?\s*\))/;
const supportedFileTypes = [
  "js",
  "jsx",
  "ts",
  "tsx",
  "json",
  "coffee",
  "html",
  "jade",
  "php",
  "less",
  "sass",
  "scss",
];

module.exports = {
  colourRegex,
  supportedFileTypes,
};
