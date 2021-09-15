(function () {
  var startTime = +new Date();

  var FileSystem = require("fs");
  var Path = require("path");
  var _ = require("underscore");
  var UglifyJS = require("uglify-js");
  var UglifyCSS = require("uglifycss");
  var Less = require("less");
  var Set = require("./Set");

  var debug = false;
  var bundleFile = "./bundle.json";

  process.argv.slice(2).forEach(function (arg) {
    switch (arg) {
      case "-d":
      case "--debug":
        debug = true;
        break;
      default:
        console.warn("ignoring unrecognized argument '" + arg + "'");
        break;
    }
  });

  function comparePaths(a, b) {
    if (a === b) return 0;
    if (!isLocalPath(a) || !isLocalPath(b)) return 0;
    var p1 = a.split(/[\/\\]+/);
    var p2 = b.split(/[\/\\]+/);
    if (p1.length !== p2.length) {
      return p1.length > p2.length ? -1 : 1;
    }
    var main = /(^|[/\\])(main|index)\.\w+$/;
    if (main.test(a)) {
      if (!main.test(b)) {
        return 1;
      }
    } else if (main.test(b)) {
      return -1;
    }
    return a < b ? -1 : 1;
  }

  function readdirRecursiveSync(baseDir) {
    var results = [];
    var list = FileSystem.readdirSync(baseDir);
    list.forEach(function (filename) {
      var file = Path.join(baseDir, filename);
      var stat = FileSystem.statSync(file);
      if (stat && stat.isDirectory())
        results = results.concat(readdirRecursiveSync(file));
      else results.push(file);
    });
    return results;
  }

  function isLocalPath(path) {
    return !/^(\w+:)?\/\//.test(path);
  }

  Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
  };

  var staticDir = "./static";
  var staticFiles = new Set(readdirRecursiveSync(staticDir));
  var bundle;

  if (FileSystem.existsSync(bundleFile)) {
    bundle = require(bundleFile);
  } else {
    bundle = {
      scripts: [],
      stylesheets: [],
      ignore: [],
    };
  }

  // remove files that have been deleted/renamed
  ["stylesheets", "scripts"].forEach(function (i) {
    bundle[i] = bundle[i].filter(function (f) {
      return !isLocalPath(f) || FileSystem.existsSync(f);
    });
  });

  // remove 'min' files if uncompressed version exists
  staticFiles.each(function (f) {
    var m = /^(.*)\.min(\.\w+)$/.exec(f);
    if (m !== null && staticFiles.contains(m[1] + m[2])) {
      staticFiles.remove(f);
    }
  });

  // skip files that have already been added
  ["stylesheets", "scripts"].forEach(function (i) {
    bundle[i].forEach(function (f, j) {
      if (isLocalPath(f)) {
        staticFiles.remove(Path.relative(__dirname, f));
      }
    });
  });

  // skip any files that are to be ignored
  bundle.ignore.forEach(function (patt) {
    var re = new RegExp(patt);
    staticFiles.each(function (f) {
      if (re.test(f)) {
        staticFiles.remove(f);
      }
    });
  });

  var sortedFiles = staticFiles.toArray().sort(comparePaths);

  sortedFiles.forEach(function (f) {
    var i = 0;
    if (/\.(js|ts|coffee)$/.test(f)) {
      while (
        i < bundle.scripts.length &&
        comparePaths(f, bundle.scripts[i]) > 0
      )
        ++i;
      bundle.scripts.insert(i, f);
    } else if (/\.(css|less|sass|scss)$/.test(f)) {
      while (
        i < bundle.stylesheets.length &&
        comparePaths(f, bundle.stylesheets[i]) > 0
      )
        ++i;
      bundle.stylesheets.insert(i, f);
    }
  });

  FileSystem.writeFileSync(bundleFile, JSON.stringify(bundle, null, 4));

  var bundleJsFile = Path.join("public", "bundle.js");

  var scriptBundle = UglifyJS.minify(bundle.scripts.filter(isLocalPath), {
    fromString: false,
    mangle: !debug,
    outSourceMap: bundleJsFile,
    output: {
      beautify: debug,
    },
  });

  FileSystem.writeFile(bundleJsFile, scriptBundle.code);
  FileSystem.writeFile(bundleJsFile + ".map", scriptBundle.map);

  var cssSources = [];

  bundle.stylesheets.forEach(function (filename) {
    if (isLocalPath(filename)) {
      var fileContents = FileSystem.readFileSync(filename, {
        encoding: "utf8",
      });
      if (/\.css$/.test(filename)) {
        cssSources.push(fileContents);
      } else if (/\.less$/.test(filename)) {
        var parser = new Less.Parser({
          paths: [staticDir],
          filename: filename,
        });
        parser.parse(fileContents, function (e, tree) {
          cssSources.push(tree.toCSS());
        });
      }
    }
  });

  var bundleCssFile = Path.join("public", "bundle.css");
  var cssCode = UglifyCSS.processString(cssSources.join(""));

  FileSystem.writeFile(bundleCssFile, cssCode);

  var elapsed = +new Date() - startTime;
  console.info("done (" + elapsed + " ms)");
})();
