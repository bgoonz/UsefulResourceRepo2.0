module.exports = {
  extends: ["prettier", "prettier/react"],
  plugins: ["class-property", "prettier"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
      modules: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "es5",
        semi: true,
        printWidth: 70,
      },
    ],
  },
};
