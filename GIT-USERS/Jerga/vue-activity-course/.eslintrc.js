module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/singleline-html-element-content-newline": 0,
    "vue/max-attributes-per-line": 0,
    "vue/html-closing-bracket-newline": 0,
    "vue/multiline-html-element-content-newline": 0,
  },
};
