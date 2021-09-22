module.exports = {
  extends: "airbnb-base",

  rules: {
    "comma-dangle": ["error", "never"],
    "guard-for-in": 0,
    indent: ["error", 2],
    "max-len": ["error", 120],
    "no-mixed-operators": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-restricted-syntax": 0,
    "no-use-before-define": ["error", { functions: false, classes: true }],
  },
};
