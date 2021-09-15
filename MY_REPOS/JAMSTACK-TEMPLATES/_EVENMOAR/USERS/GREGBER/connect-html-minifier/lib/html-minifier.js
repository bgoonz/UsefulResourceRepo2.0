var minify = require('html-minifier').minify;

module.exports = function (options) {

  return function (req, res, next) {
    var context = {
      write: res.write,
      end: res.end
    },
    body = '',
    restore = function () {
      res.write = context.write;
      res.end = context.end;
    };

    // override res.write method
    res.write = function (chunk) {
      body += chunk;
    };

    // override res.end method
    res.end = function (chunk, encoding) {
      if (chunk) {
        res.write(chunk);
      }

      body = minify(body, options);

      restore();

      var len;
      if (Buffer.isBuffer(body)) {
        len = body.length;
      } else if (typeof body === 'string') {
        len = Buffer.byteLength(body, 'utf8');
      }
      if (len) {
        res.setHeader('Content-Length', len);
      }

      res.end(body, encoding);
    };

    next();
  };
};
