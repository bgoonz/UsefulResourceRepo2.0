const cheerio = require('cheerio')

module.exports = html => {
  const $ = cheerio.load(html)

  $('*[class]').each((_i, el) => {
    el = $(el)
    el.attr('className', el.attr('class'))
    el.removeAttr('class')
  })

  return $.html()
    .replace('<html><head></head><body>', '')
    .replace('</body></html>', '')
}
