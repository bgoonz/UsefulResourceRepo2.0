const glob = require(`tiny-glob`)
const fs = require(`fs-extra`)

async function getContent(filePath, encoding = 'utf-8') {
  if (!filePath) {
    throw new Error('filePath required or not found')
  }

  return fs.readFile(filePath, { encoding })
}

exports.onPostBuild = async (_, { doctype = `html` }) => {
  const files = await glob(`public/**/*.html`)

  for (const file of files) {
    const originalContent = await getContent(file)

    const stripped = originalContent.slice(15)
    const start = `<!DOCTYPE ${doctype}>`
    const modifiedContent = `${start}${stripped}`

    await fs.writeFile(file, modifiedContent)
  }
}
