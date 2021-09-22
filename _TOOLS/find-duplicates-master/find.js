const crypto = require('crypto')
const Path = require('path')
const { promisify } = require('util')
const globby = require('globby')
const fs = require('fs')
const getPkgDir = require('pkg-dir')
const readFile = promisify(fs.readFile.bind(fs))
const readJSON = (path) => readFile(path).then((content) => JSON.parse(content))
const pMap = require('p-map')

const alwaysTrue = () => true

const alphabetical = (a, b) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

const getPkg = async (filePath) => {
  let dir = await getPkgDir(filePath)
  dir = Path.relative(process.cwd(), dir)

  const path = Path.join(dir, 'package.json')
  return {
    path,
    dir,
    content: await readJSON(path),
  }
}

const getFileInfo = async ({ path, algorithm }) => {
  const [content, pkg] = await Promise.all([readFile(path, 'utf8'), getPkg(path)])

  const hash = crypto
    .createHash(algorithm)
    .update(content)
    .digest('hex')

  return {
    path,
    pkg,
    hash,
    size: content.length,
    content,
    id: `${pkg.content.version}:${hash}`,
  }
}

const find = async ({ globs, concurrency = Infinity, algorithm = 'sha1', filter = alwaysTrue }) => {
  const paths = await globby(globs, {
    cwd: process.cwd(),
    onlyFiles: true,
    followSymbolicLinks: false,
  })

  const byHash = new Map()
  await pMap(
    paths,
    async (path) => {
      const info = await getFileInfo({ path, algorithm })
      if (!filter(info)) return

      const soFar = byHash.get(info.id) || { size: info.size, copies: [] }
      soFar.copies.push(info)
      byHash.set(info.id, soFar)
    },
    {
      concurrency,
    }
  )

  // remove files with no duplicates
  const haveDuplicates = [...byHash].filter(
    // eslint-disable-next-line no-unused-vars
    ([hash, { copies }]) => copies.length > 1
  )
  return new Map(haveDuplicates)
}

const chooseOriginal = (copies) => {
  const [original, ...duplicates] = copies.slice().sort((a, b) => alphabetical(a.path, b.path))
  return {
    original,
    duplicates,
  }
}

const remap = ({ copies }) => {
  const { original, duplicates } = chooseOriginal(copies)

  // output:
  //   {
  //     "original": "node_modules/a/node_modules/lodash",
  //     "version": "4.16.6",
  //     "file": "lodash.js",
  //     "size": 12345,
  //     "duplicates": [
  //       "node_modules/b/node_modules/lodash",
  //       "node_modules/c/node_modules/lodash"
  //     ]
  //   }

  const { pkg, size, path } = original
  return {
    original: pkg.dir,
    version: pkg.content.version,
    // based on cwd
    file: Path.relative(pkg.dir, path),
    size,
    duplicates: duplicates.map((duplicate) => duplicate.pkg.dir),
  }
}

// find first, then remap, so that we can choose an "original" for each set of duplicates deterministically
const findAndRemap = async (opts) => {
  const byHash = await find(opts)

  let mapping = []

  // sort for determinstic output
  Array.from(byHash.keys())
    .sort(alphabetical)
    .forEach((hash) => {
      const { copies } = byHash.get(hash)
      mapping = mapping.concat(remap({ copies }))
    })

  return mapping
}

module.exports = {
  find,
  remap,
  findAndRemap,
}
