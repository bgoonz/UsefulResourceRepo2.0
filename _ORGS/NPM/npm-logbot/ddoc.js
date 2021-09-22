var ddoc = exports
ddoc.language = 'javascript'
ddoc._id = '_design/app'

ddoc.views = {}

ddoc.views.pkg = { map: function (doc) {
  emit([doc.pkg, doc.day], doc.count)
}, reduce: "_sum" }

ddoc.views.day = { map: function (doc) {
  emit([doc.day, doc.pkg], doc.count)
}, reduce: "_sum" }

ddoc.views.count = { map: function (doc) {
  emit([doc.count, doc.pkg, doc.day], doc.count)
}, reduce: "_sum" }

console.log(JSON.stringify(ddoc, function (k, v) {
  if (typeof v === 'function') return v.toString()
  return v
}))
