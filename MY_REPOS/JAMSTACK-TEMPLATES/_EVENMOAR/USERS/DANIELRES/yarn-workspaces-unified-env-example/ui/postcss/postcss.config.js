const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.jsx", "./src/**/*.tsx", "./src/**/*.js", "./**/*.html"],
  css: ["./src/**/*.css"],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

const plugins = [
  require("tailwindcss")("postcss/tailwind.config.js"),
  ...(process.env.NODE_ENV === "development" ? [] : [purgecss]),
  require("autoprefixer")
];

module.exports = {
  plugins
};
