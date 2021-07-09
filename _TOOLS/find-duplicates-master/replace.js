const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const _write = promisify(fs.writeFile.bind(fs))
const write = (path, contents) => _write(path, contents, 'utf8')
const _read = promisify(fs.readFile.bind(fs))
const read = (path) => _read(path, 'utf8')

const flattenEntry = (entry) =>
  entry.duplicates.map((duplicate) => ({
    ...entry,
    duplicate,
  }))

const flattenEntries = (entries) =>
  entries.reduce((flat, entry) => flat.concat(flattenEntry(entry)), [])

const getReplacement = async ({ header = '', version, original, duplicate, file }) => {
  const originalPkg = require(path.resolve(process.cwd(), original, 'package.json'))
  if (originalPkg.version !== version) {
    throw new Error(
      `version mismatch! duplicates.json is outdated. Expected ${original} to be version ${version}`
    )
  }

  const duplicatePkg = require(path.resolve(process.cwd(), duplicate, 'package.json'))
  if (duplicatePkg.version !== version) {
    throw new Error(
      `version mismatch! duplicates.json is outdated. Expected ${duplicate} to be version ${version}`
    )
  }

  const origFilePath = path.join(original, file)
  const dupFilePath = path.join(duplicate, file)
  let [originalContents, duplicateContents] = await Promise.all([
    read(origFilePath),
    read(dupFilePath),
  ])

  // in case someone opens a file, saves it, and thee editor auto-appends a line break
  originalContents = originalContents.trim()
  duplicateContents = duplicateContents.trim()

  if (originalContents.startsWith(header)) {
    throw new Error(`original is already a deduplicated file: ${origFilePath}`)
  }

  const pathFromDuplicateToOriginal = path.relative(path.dirname(dupFilePath), origFilePath)
  const replacement = `${header}\nmodule.exports = require(${JSON.stringify(
    pathFromDuplicateToOriginal
  )})`

  const absPath = path.resolve(process.cwd(), dupFilePath)
  const ret = {
    path: absPath,
    content: replacement,
  }

  // we might have replaced it already
  if (duplicateContents === replacement) {
    return { ...ret, alreadyReplaced: true }
  }

  // allow overwriting previous deduplication
  if (duplicateContents !== originalContents && !duplicateContents.startsWith(header)) {
    throw new Error(
      `original and duplicate contents don't match:

original: ${origFilePath}
duplicate: ${dupFilePath}`
    )
  }

  return ret
}

const replace = ({ path, content }) => write(path, content)

module.exports = {
  getReplacement,
  replace,
  flattenEntry,
  flattenEntries,
}
