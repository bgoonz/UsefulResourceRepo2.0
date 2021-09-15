'use strict';

import fs from 'fs';
import union from 'union';
import ecstatic from 'ecstatic';
import auth from 'basic-auth';
import httpProxy from 'http-proxy';
import corser from 'corser';
import path from 'path';
import secureCompare from 'secure-compare';

// a hacky and direct workaround to fix https://github.com/http-party/http-server/issues/525
function getCaller() {
  try {
    const stack = new Error().stack;
    const stackLines = stack.split('\n');
    const callerStack = stackLines[3];
    return callerStack.match(/at (.+) \(/)[1];
  }
  catch (error) {
    return '';
  }
}

const _pathNormalize = path.normalize;
path.normalize = p => {
  const caller = getCaller();
  let result = _pathNormalize(p);
  // https://github.com/jfhbrook/node-ecstatic/blob/master/lib/ecstatic.js#L20
  if (caller === 'decodePathname') {
    result = result.replace(/\\/g, '/');
  }
  return result;
};

//
// Remark: backwards compatibility for previous
// case convention of HTTP
//
export var HttpServer = exports.HTTPServer = HttpServer;

/**
 * Returns a new instance of HttpServer with the
 * specified `options`.
 */
export function createServer(options) {
  return new HttpServer(options);
}

/**
 * Constructor function for the HttpServer object
 * which is responsible for serving static files along
 * with other HTTP-related features.
 */
class HttpServer {
  constructor(options) {
    options = options || {};

    if (options.root) {
      this.root = options.root;
    }
    else {
      try {
        fs.lstatSync('./public');
        this.root = './public';
      }
      catch (err) {
        this.root = './';
      }
    }

    this.headers = options.headers || {};

    this.cache = (
      options.cache === undefined ? 3600 :
      // -1 is a special case to turn off caching.
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#Preventing_caching
      options.cache === -1 ? 'no-cache, no-store, must-revalidate' :
      options.cache // in seconds.
    );
    this.showDir = options.showDir !== 'false';
    this.autoIndex = options.autoIndex !== 'false';
    this.showDotfiles = options.showDotfiles;
    this.gzip = options.gzip === true;
    this.brotli = options.brotli === true;
    if (options.ext) {
      this.ext = options.ext === true
        ? 'html'
        : options.ext;
    }
    this.contentType = options.contentType ||
      this.ext === 'html' ? 'text/html' : 'application/octet-stream';

    const before = options.before ? options.before.slice() : [];

    if (options.logFn) {
      before.push((req, res) => {
        options.logFn(req, res);
        res.emit('next');
      });
    }

    if (options.username || options.password) {
      before.push((req, res) => {
        const credentials = auth(req);

        // We perform these outside the if to avoid short-circuiting and giving
        // an attacker knowledge of whether the username is correct via a timing
        // attack.
        if (credentials) {
          // if credentials is defined, name and pass are guaranteed to be string
          // type
          const usernameEqual = secureCompare(options.username.toString(), credentials.name);
          const passwordEqual = secureCompare(options.password.toString(), credentials.pass);
          if (usernameEqual && passwordEqual) {
            return res.emit('next');
          }
        }

        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm=""');
        res.end('Access denied');
      });
    }

    if (options.cors) {
      this.headers['Access-Control-Allow-Origin'] = '*';
      this.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Range';
      if (options.corsHeaders) {
        options.corsHeaders.split(/\s*,\s*/)
            .forEach(function (h) { this.headers['Access-Control-Allow-Headers'] += ', ' + h; }, this);
      }
      before.push(corser.create(options.corsHeaders ? {
        requestHeaders: this.headers['Access-Control-Allow-Headers'].split(/\s*,\s*/)
      } : null));
    }

    if (options.robots) {
      before.push((req, res) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain');
          const robots = options.robots === true
            ? 'User-agent: *\nDisallow: /'
            : options.robots.replace(/\\n/, '\n');

          return res.end(robots);
        }

        res.emit('next');
      });
    }

    before.push(ecstatic({
      root: this.root,
      cache: this.cache,
      showDir: this.showDir,
      showDotfiles: this.showDotfiles,
      autoIndex: this.autoIndex,
      defaultExt: this.ext,
      gzip: this.gzip,
      brotli: this.brotli,
      contentType: this.contentType,
      handleError: typeof options.proxy !== 'string'
    }));

    if (typeof options.proxy === 'string') {
      const proxy = httpProxy.createProxyServer({});
      before.push((req, res) => {
        proxy.web(req, res, {
          target: options.proxy,
          changeOrigin: true
        }, (err, req, res, target) => {
          if (options.logFn) {
            options.logFn(req, res, {
              message: err.message,
              status: res.statusCode });
          }
          res.emit('next');
        });
      });
    }

    const serverOptions = {
      before,
      headers: this.headers,
      onError(err, req, res) {
        if (options.logFn) {
          options.logFn(req, res, err);
        }

        res.end();
      }
    };

    if (options.https) {
      serverOptions.https = options.https;
    }

    this.server = union.createServer(serverOptions);
    if (options.timeout !== undefined) {
      this.server.setTimeout(options.timeout);
    }
  }

  listen(...args) {
    this.server.listen(...args);
  }

  close() {
    return this.server.close();
  }
}
