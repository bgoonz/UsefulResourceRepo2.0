/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 more precisely, `react-scripts start`) to load
  middlewares and APIs defined in ../server.js into the Webpack Dev Server, so
  that those things work as expected during development.

  Note that setupProxy is probably the wrong name for this file -- it never
  proxies anything. Instead, it just enhances the dev express app itself.
  It's only named setupProxy.js so that react-scripts can pick it up. See also:
  https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
*/

const registerApis = require('../server').registerApis;
module.exports = registerApis;
