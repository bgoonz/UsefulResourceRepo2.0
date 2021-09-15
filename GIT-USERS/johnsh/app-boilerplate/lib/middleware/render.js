'use strict';

var extend = require('extend-shallow');

/**
 * Render templates
 */

module.exports = function(app) {
  return function (file, next) {
    var template = app.getFile(file);
    template.content = file.contents.toString();

    var ctx = extend({}, template.data, template.locals);
    template.render(ctx, function (err, content) {
      if (err) return next(err);

      file.content = content;
      file.contents = new Buffer(file.content);
      next();
    });
  };
};
