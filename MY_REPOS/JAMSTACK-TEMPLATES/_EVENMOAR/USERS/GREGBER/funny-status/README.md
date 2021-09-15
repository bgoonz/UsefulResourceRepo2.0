# ♫ funny-status [![Build Status](https://travis-ci.org/neoziro/funny-status.png?branch=master)](https://travis-ci.org/neoziro/funny-status)

Check NPM and GitHub status with sound. ♪♬♩♫ ⚑

## Install

```sh
npm install -g funny-status
```

## Usage

### CLI

```
  Usage: funny-status [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -t, --time [n]              Ping wait time
    -T, --timeout [n]           Services timeout
    -x, --threshold [n]         Number of consecutive success / failure required to play sound
    -s, --service [list]        Custom services (ex: "github,npm")
    -S, --success-sound [file]  Sound played when service up
    -F, --failure-sound [file]  Sound played when service down

```

### Node

```js
var FunnyStatus = require('funny-status').Daemon;
var status = new FunnyStatus();
status.start();
```

## Daemon

The options accepted are :

- `time`
    - Time between each ping.
- `threshold`
    - Number of consecutive success / failure required to play sound.
- `service`
    - Services to ping.
- `successSound`
    - Success sound played when a service wake up.
- `failureSound`
    - Failure sound played when a service break.
- `success`
    - Custom callback to handle success.
- `failure`
    - Custom callback to handle failure.

## Custom services

It's possible to use custom services. A service take a node style callback. If an error is returned, the service in considered down.

```js
var FunnyStatus = require('funny-status').Daemon;
var request = require('supertest');

function myWebsite(cb) {
  request('http://mywebsite.com')
    .get('/')
    .expect(200, cb)
}

var status = new FunnyStatus({
  service: myWebsite
});
status.start();
```

## Debug mode

```sh
DEBUG=true funny-status
```

## License

MIT
