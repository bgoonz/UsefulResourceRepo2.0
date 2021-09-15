module.exports = {
  "extends": [
    "prettier",
    "prettier/react",
    "react-app"
  ],
  "plugins": [
    "class-property",
    "prettier",
    "react",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true,
      "modules": true,
    }
  },
  "env": {
    "es6": true,
    "node": true,
  },
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "es5",
        "semi": false,
        "printWidth": 80,
      },
    ],
    "no-unused-vars": ["error", { "args": "after-used" }],
    "react/jsx-uses-vars": [2],
    "react/jsx-uses-react": [2],
    "react/react-in-jsx-scope": [2],
  },
  "overrides": [
    {
      "files": ["*.test.js"],
       "rules": {
          "no-unused-expressions": "off"
      }
    }
]
}