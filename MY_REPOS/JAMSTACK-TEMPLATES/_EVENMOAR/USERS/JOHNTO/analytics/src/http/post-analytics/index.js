const data = require('@begin/data')

exports.handler = async function http(req) {
  const { domain, path } = req.body
  const timeNow = (new Date()).getTime()
  
  await data.set({
    table: 'pageViews',
    domain,
    path,
    viewedAt: timeNow
  })

  return { status: 204 }
}
