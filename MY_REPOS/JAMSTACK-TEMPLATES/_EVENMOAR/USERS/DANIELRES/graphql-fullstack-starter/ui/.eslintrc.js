module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
    "import/extensions": 0,
    "react/prop-types": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "prettier/prettier": "error",
    "react/jsx-props-no-spreading": 0,
  },
  ignorePatterns: ["/generated"],
};
