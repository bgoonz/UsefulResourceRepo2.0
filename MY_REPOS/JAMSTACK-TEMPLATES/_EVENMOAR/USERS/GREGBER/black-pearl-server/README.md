# black-pearl [![Build Status](https://travis-ci.org/neoziro/black-pearl-server.png?branch=master)](https://travis-ci.org/neoziro/black-pearl-server)

Metrics collector that push metrics to Elastic Search + Kibana.

## Getting started

#### Install and run server :

```
npm install -g black-pearl
black-pearl
```

#### Push metric from client :

```javascript
var client = require('black-pearl-client').createClient();
client.push('connectedUsers', { count: 5 });
```

#### View metrics in Kibana :

<img src="https://f.cloud.github.com/assets/266302/1803923/a9ffa908-6c30-11e3-8309-97b8f7f5e6d1.png" alt="Kibana" width="500">

## Install

```
npm install -g black-pearl
```

## Usage

### CLI

```
Usage: black-pearl [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -p, --port [port]    Http port.
    -e, --eshost [host]  Elastic search host, default 9400.
```

### Node

```javascript
var Server = require('black-pearl').Server;

var server = new Server({ es: { host: 'elasticsearch1' } });
server.listen(9400);
```

## Push metrics

To push metrics, you must use the [black-pearl-client](https://github.com/neoziro/black-pearl-client) module, it's very easy.

```javascript
var blackPearl = require('black-pearl-client');
var client = blackPearl.createClient('http://localhost:9400');

client.push('connectedUsers', { count: 5 });
```

## Debug mode

To enter in debug mode and view some logs, you have to set the DEBUG env variable.

```sh
DEBUG=true black-pearl
```

## License

MIT
