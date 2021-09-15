const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./src/**/*.jsx", "./src/**/*.js", "./public/index.html"],
  css: ["./src/tailwind.css"],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelistPatterns: [/.*autosuggest.*/]
});

const cssnano = require("cssnano")({ preset: "default" });

module.exports = {
  plugins: [
    require("tailwindcss")("./src/tailwind.config.es5.js"),
    require("postcss-nesting"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : [])
  ]
};
