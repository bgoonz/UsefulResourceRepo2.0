const babelOptions = {
  presets: [`babel-preset-gatsby`, `@babel/typescript`],
  plugins: [
    `emotion`,
    `@babel/plugin-proposal-optional-chaining`,
    `@babel/plugin-proposal-class-properties`,
    `require-context-hook`,
  ],
}

module.exports = require(`babel-jest`).createTransformer(babelOptions)
