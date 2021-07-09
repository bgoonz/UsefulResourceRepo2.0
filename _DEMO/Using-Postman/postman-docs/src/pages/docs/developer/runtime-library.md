---
title: "Postman Runtime library"
order: 149
page_id: "runtime_library"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Continuous Integration"
    url: "/docs/running-collections/using-newman-cli/continuous-integration/"

warning: false

---

The Postman Runtime library supports request sending and [collection running](/docs/running-collections/intro-to-collection-runs/) in the Postman app as well as other interfaces including Newman CLI.

The library is an [open source node.js project](https://github.com/postmanlabs/postman-runtime/) you can utilize for low-level configuration over request sending in your API development and testing projects.

You can install the library from [NPM](https://www.npmjs.com/package/postman-runtime). The following example code shows a simplified outline of using the Runtime library in conjunction with the [Collection SDK](/docs/developer/collection-sdk/):

```js
runtime = require('postman-runtime');
var runner = new runtime.Runner();

//Collection object constructed via Collection SDK
var collection = new sdk.Collection();

runner.run(collection, {
  data: [],
  timeout: {
    request: 30000,
    script: 5000
  },
  iterationCount: 1,

  //other options...

},
function (err, run) {
  //Callbacks to execute as the collection runs
  run.start(callbacks);
});
```

You can use the Runtime library if you need a detailed configuration of your request runs, for example as part of an automation workflow to integrate Postman Collection runs into your development pipeline.

> Note that if you only need to run collections, you can use [Newman CLI](/docs/running-collections/using-newman-cli/command-line-integration-with-newman/).

## Next steps

To get started with the Runtime library, check out the repo [README](https://github.com/postmanlabs/postman-runtime). You can incorporate Postman into your workflow with [CI using Postman API](/docs/running-collections/using-newman-cli/continuous-integration/).
