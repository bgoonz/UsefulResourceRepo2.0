/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://github.com/firebase/superstatic/blob/master/LICENSE
 */

const _ = require("lodash");

[
  "protect",
  "redirects",
  "headers",
  "env",
  "files",
  "rewrites",
  "missing",
].forEach((name) => {
  exports[name] = function (spec, config) {
    const mware = require("./" + _.kebabCase(name))(spec, config);
    mware._name = name;
    return mware;
  };
});
