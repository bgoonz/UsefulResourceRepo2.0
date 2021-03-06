"use strict";

var http = require('follow-redirects').http,
    https = require('follow-redirects').https,
    ul = require("ul"),
    url = require("url"),
    queryString = require("querystring"),
    events = require("events"),
    EventEmitter = events.EventEmitter,
    assured = require("assured"),
    noop = require("noop6"),
    zlib = require("zlib");

/**
 * tinyreq
 * Creates http(s) requests.
 *
 * @name tinyreq
 * @function
 * @param {String|Object} options A string being the request url or an object containing the following fields:
 *
 *  - `url` (String): The request url.
 *  - `method` (String): The request method.
 *  - `data` (Object): The request POST data.
 *  - `encoding` (String): The response encoding type.
 *  - `data_encoding` (String): The request encoding type.
 *
 * @param {Function} callback The callback function called (with `error` and `data` parameters).
 * @return {EventEmitter} An event emitter you can use for listening for the `data`, `error` and `end` events.
 */
module.exports = function tinyreq(options, callback) {

    // Handle options as string
    if (typeof options === "string") {
        options = {
            url: options
        };
    }

    // Merge options
    options = ul.deepMerge(options, ul.clone(url.parse(options.url)), {
        method: options.method ? options.method : options.data ? "POST" : "GET",
        headers: {},
        encoding: "utf8"
    });

    var _done = false;

    // Unique callback
    var opt_callback = assured(function (err, data, res) {
        if (_done) {
            return;
        }
        _done = true;
        if (typeof callback !== "function") {
            return;
        }
        callback(err, data, res);
    });

    // Handle post data
    if (options.data && options.data.constructor === Object) {
        options.data = queryString.stringify(options.data);
    }

    if (typeof options.data === "string") {
        options.headers["Content-Length"] = Buffer.byteLength(options.data);
    }

    var str = new EventEmitter();

    // Create the request
    var request = (options.protocol === "http:" ? http : https).request(options, function (res) {
        var body = [],
            bodyLength = 0;

        var isGzipped = res.headers["content-encoding"] === "gzip";

        var resStream = res;
        if (isGzipped) {
            resStream = res.pipe(zlib.createGunzip());
        } else {
            options.encoding && res.setEncoding(options.encoding);
        }

        if (typeof callback === "function") {
            resStream.on("data", function (data) {
                body.push(data);
                bodyLength += data.length;
            });
        }

        resStream.on("data", function (data) {
            str.emit("data", data);
        }).on("error", function (e) {
            str.emit("error", e);
            opt_callback(e, null, res);
        }).on("end", function () {
            str.emit("end");
            body = options.encoding === null || options.encoding === "buffer" ? Buffer.concat(body, bodyLength) : body.join("");
            opt_callback(null, body, res);
        });
    }).on("error", function (e) {
        opt_callback(e, null, null);
    });

    // Handle post data
    if (options.data) {
        request.write(options.data, options.data_encoding);
    }

    request.end();
    str.then = function (fn) {
        callback = callback || noop;
        return opt_callback._.then(fn);
    };
    str.catch = opt_callback._.catch.bind(opt_callback._);
    return str;
};