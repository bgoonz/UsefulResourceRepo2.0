var glob = require("glob")
var path = require("path")
var read = require("fs").readFileSync
var write = require("fs").writeFileSync
var cleanSketch = require("clean-sketch")
var outputFile = path.resolve(__dirname + "/../index.json")
var graphics = {}

glob("svg/*.svg", {cwd: path.join(__dirname, "../")}, function(er, files) {

  files.forEach(function(file) {
    var key = path.basename(file)
      .toLowerCase()
      .replace(/\.svg$/i, "") // remove svg extension
      .replace(/[-\s]+/g, "_") // replace spaces and hyphens with underscores
    graphics[key] = cleanSketch(read(__dirname + "/../" + file, "utf-8"))
  })

  write(outputFile, JSON.stringify(graphics, null, 2))
  console.log("Injected all SVG files into %s", outputFile)
})
