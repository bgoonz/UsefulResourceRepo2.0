# lylog

Syslog proxy that receives syslogs from Fastly, and sends them to
Loggly.

## USAGE

```javascript
var lylog = require('lylog')
var proxy = lylog({
  token: 'loggly user token here',
  // optional options described below
})

proxy.listen(10514)

// now go tell fastly to send syslogs to logs.mysite.com:10514,
// and they'll be proxied to loggly
```

Or in bash:

```bash
# same as the above JavaScript
lylog \
  --token 'loggly user token here' \
  --listen 10514
```

## CLI

```
$ lylog -h
lylog [options]
Options:
    -l PORT, --listen=PORT     Port that lylog listens on. Required.
    -t TOKEN, --token=TOKEN    Loggly customer token. Required.
    -p PORT, --port=PORT       Port to send Loggly messages to (default=514)
    -H HOST, --host=HOST       Hostname to send Loggly messages to
                               (default=logs-01.loggly.com)
    -e, --echo                 Print logs to stdout as well as sending them to
                               loggly
    -w LIST, --whitelist=LIST  Whitespace-separated list of IPv4 blocks to
                               accept. Defaults to the known list of Fastly IPv4
                               address blocks as of lylog publish date (see
                               "fastly-ips.txt" in lylog root). Set to "ALLOW"
                               to allow connections from any client (not
                               recommended!)
    -h, --help                 Display this help
```

## CONFIG OPTIONS

* `token` String, Required.  Your loggly customer token.
* `host` String, Default=`'logs-01.loggly.com'`.  The hostname on
  loggly where logs are sent.
* `port` Number, Default=`514`.  Port on loggly to send logs.
* `whitelist` Array(String) or `false`.  Array of Fastly IPv4 blocks
  to accept connections from.  (Note: without this, your server is an
  open proxy that will spam your loggly account!)
* `echo` Boolean, default=`false`.  Print logs to stdout as well as
  sending to loggly.  Useful if you want to maintain a local copy as
  well.
* `onerror` Function, Optional.  Call this function when
  upstream connections to loggly experience an error writing.
* `minFree` Number, Optional, Default=`16`.  Minimum number of free
  connections to loggly before reaping will occur.
* `freeReapRatio` Number, Optional, Default=`0.5`.  Minimum ratio of
  free loggly connections to total connections before reaping will
  occur.  Set to `1` to *never* reap connections (not recommended!)

## Connection Pool

Outbound connections to loggly are created as needed, and then kept
alive for future use.  If the `free` list of connections is greater
than 16 (`minFree` config), and more than 50% of the total pool of
connections (`freeReapRatio` config), then the bottom 50% of the free pool
will be reaped.  This prevents spikes from causing an abnormal number
of connections to be open indefinitely.
