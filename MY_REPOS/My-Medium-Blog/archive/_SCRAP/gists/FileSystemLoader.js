var nunjucks = require("nunjucks");
var gaze = require("gaze");
var lib = require("nunjucks/src/lib");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");

// Node <0.7.1 compatibility
var existsSync = fs.existsSync || path.existsSync;

module.exports = nunjucks.Loader.extend({
  init: function (searchPaths, options) {
    this.options = _.extend(
      {
        fileExtension: "njs",
        noWatch: false,
      },
      options
    );

    this.pathsToNames = {};

    if (searchPaths) {
      searchPaths = lib.isArray(searchPaths) ? searchPaths : [searchPaths];
      // For windows, convert to forward slashes
      this.searchPaths = searchPaths.map(path.normalize);
    } else {
      this.searchPaths = ["."];
    }

    if (!this.options.noWatch) {
      var patterns = _.map(
        this.searchPaths,
        function (p) {
          return p + "**/*." + this.options.fileExtension;
        }.bind(this)
      );
      gaze(
        patterns,
        function (err, watcher) {
          watcher.on(
            "changed",
            function (filepath) {
              if (this.pathsToNames.hasOwnProperty(filepath)) {
                this.emit("update", this.pathsToNames[filepath]);
              }
            }.bind(this)
          );
        }.bind(this)
      );
    }
  },

  getSource: function (name) {
    var nameWithExtension = name;
    if (this.options.fileExtension && !/\.[^\/\\]+$/.test(nameWithExtension)) {
      nameWithExtension += "." + this.options.fileExtension;
    }
    var fullpath = null;
    var paths = this.searchPaths;

    for (var i = 0; i < paths.length; i++) {
      var p = path.resolve(paths[i], nameWithExtension);

      if (existsSync(p)) {
        fullpath = p;
        break;
      }
    }

    if (!fullpath) {
      return null;
    }

    this.pathsToNames[fullpath] = name;

    return {
      src: fs.readFileSync(fullpath, "utf-8"),
      path: fullpath,
    };
  },
});
