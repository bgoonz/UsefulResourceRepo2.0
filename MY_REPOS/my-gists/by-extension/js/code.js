var args = require('minimist')(process.argv.slice(2))
var parse = require('mynosql-query')
var pull = require('pull-stream')
var level = require('level')
var sublevel = require('level-sublevel')
var _db = sublevel(level('./data', {encoding: 'json'}))
var db = require('mynosql')(_db)

db.createIndex([['first']], function(){})

if(args.p){
  var data = {}
  data.first = args.f
  data.last = args.l
  data.phone = args.n
  data.email = args.e
  data.id = 'abc' + Date.now()

// the top level is now called "data"
//  data = {"data":data}
//  

  db.put(data.id, JSON.stringify(data), function(err){
    if(err) console.log(err)
  })
}
if(args.q){
  pull(
    db.query(parse(args.q)),
    pull.collect(console.log)
  )
}
if(args.u){}
if(args.d){}


