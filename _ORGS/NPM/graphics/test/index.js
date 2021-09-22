var assert = require("assert")
var cheerio = require("cheerio")
var graphics = require("..")

describe("graphics", function() {

  it("is a key-value object", function() {
    assert(graphics)
    assert(typeof graphics, "object")
    assert(!Array.isArray(graphics))
  })

  it("uses filenames as keys", function() {
    assert(graphics.n_cube)
    assert(graphics.npm_loves_you)
  })

  it("has stringified SVGs as values", function(done) {
    var keys = Object.keys(graphics)
    keys.forEach(function(key){
      var $ = cheerio.load(graphics[key])
      assert($("svg").length, "no `svg` tag found in " + key)
      if (key == keys[keys.length-1]) done()
    })
  })

})
