/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://github.com/firebase/superstatic/blob/master/LICENSE
 */

const fs = require("fs");

const DEFAULT_ERROR_PAGE = __dirname + "/../../templates/not_found.html";

module.exports = function (spec) {
  const content = fs.readFileSync(spec.errorPage || DEFAULT_ERROR_PAGE);

  return function (req, res) {
    // NOTE: provider isn't used to serve the pages
    // because this middleware should only serve local
    // static pages around the same directory as the
    // superstatic middleware

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.end(content);
  };
};
