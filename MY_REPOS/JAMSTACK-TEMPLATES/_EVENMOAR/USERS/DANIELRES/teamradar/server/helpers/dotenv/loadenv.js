const dotenv = require('dotenv')
const path = require('path')

const env = process.env.NODE_ENV

if (env === 'dev' || env === 'development') {
  const file = '.env'
  console.log(`[loadenv] Loading environment "${env}" from: "${file}"`)
  dotenv.load({ path: path.resolve(file) })
}

if (env === 'test') {
  // With dotenv, overrides have to come firts in load order
  const file1 = '.env.test'
  const file2 = '.env'

  console.log(
    `[loadenv] Loading environment "${env}" from: "${file1}" + "${file2}"`
  )
  dotenv.load({ path: path.resolve(file1) })
  dotenv.load({ path: path.resolve(file2) })
}
