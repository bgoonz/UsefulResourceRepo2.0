const data = require('@begin/data')

exports.handler = async function http() {
  const body = await data.get({ table: 'pageViews' })

  return {
    type: 'application/json',
    body
  }
}
