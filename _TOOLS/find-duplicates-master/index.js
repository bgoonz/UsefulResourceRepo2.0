const { find, remap, findAndRemap } = require('./find')
const { getReplacement, replace, flattenEntry, flattenEntries } = require('./replace')

const { version } = require('./package')

module.exports = {
  // find
  find,
  remap,
  findAndRemap,
  // replace
  getReplacement,
  replace,
  flattenEntry,
  flattenEntries,
  // version
  version,
}
