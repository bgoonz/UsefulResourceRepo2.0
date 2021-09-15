const getClasses = require('get-classes-from-html')
const colorable = require('colorable')
const cssstats = require('cssstats')

const postcss = require('postcss')
const customMedia = require('postcss-custom-media')
const mqPacker = require('css-mqpacker')
const perfectionist = require('perfectionist')
const select = require('postcss-select')

module.exports = (name, { html = '', css = '', description = '' }) => {
  const cx = getClasses(html).map(c => `.${c}`)

  return processCss(css, cx)
    .then(colorify)
    .then(res => Object.assign({}, { html }, res))
}

const processCss = (css, cx) => {
  const plugins = [
    select(cx), customMedia(), mqPacker(), perfectionist()
  ]

  return postcss(plugins)
    .process(css)
    .then(({ css }) => ({
      css,
      stats: cssstats(css)
    }))
}

const colorify = ({ css, stats }) => {
  const colors = stats.declarations.properties.color || []
  const bgColors = stats.declarations.properties.backgroundColor || []
  const colorCombos = colorable(colors.concat(bgColors), { uniq: true })

  return {
    css,
    stats,
    colorCombos
  }
}
