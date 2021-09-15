# sphero [![Build Status](https://travis-ci.org/neoziro/node-sphero.png?branch=master)](https://travis-ci.org/neoziro/node-sphero)

# This plugin is no longer actively maintained, you can still use it but issues will not be resolved.

Control Sphero robotic ball from node.js.

## How to use

```javascript
var sphero = require('sphero');

var client = sphero.createClient();
client.connect(function () {
  client.color('red');
});
```

## License

MIT
