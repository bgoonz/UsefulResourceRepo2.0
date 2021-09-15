# node-fetch

> A light-weight module that brings window.fetch to node.js

[![npm version](https://flat.badgen.net/npm/v/node-fetch)](https://www.npmjs.com/package/node-fetch) [![build status](https://flat.badgen.net/travis/bitinn/node-fetch)](https://travis-ci.org/bitinn/node-fetch) [![coverage status](https://flat.badgen.net/codecov/c/github/bitinn/node-fetch/master)](https://codecov.io/gh/bitinn/node-fetch) [![install size](https://flat.badgen.net/packagephobia/install/node-fetch)](https://packagephobia.now.sh/result?p=node-fetch) [![Discord](https://img.shields.io/discord/619915844268326952?color=%237289DA&label=Discord&style=flat-square)](https://discord.gg/Zxbndcm)

A light-weight module that brings `window.fetch` to Node.js

(We are looking for [v2 maintainers and collaborators](https://github.com/bitinn/node-fetch/issues/567))

[![Backers](https://opencollective.com/node-fetch/backers.svg)](https://opencollective.com/node-fetch)

*   [Motivation](#motivation)
*   [Features](#features)
*   [Difference from client-side fetch](#difference-from-client-side-fetch)
*   [Installation](#installation)
*   [Loading and configuring the module](#loading-and-configuring-the-module)
*   [Common Usage](#common-usage)
    *   [Plain text or HTML](#plain-text-or-html)
    *   [JSON](#json)
    *   [Simple Post](#simple-post)
    *   [Post with JSON](#post-with-json)
    *   [Post with form parameters](#post-with-form-parameters)
    *   [Handling exceptions](#handling-exceptions)
    *   [Handling client and server errors](#handling-client-and-server-errors)
*   [Advanced Usage](#advanced-usage)
    *   [Streams](#streams)
    *   [Buffer](#buffer)
    *   [Accessing Headers and other Meta data](#accessing-headers-and-other-meta-data)
    *   [Extract Set-Cookie Header](#extract-set-cookie-header)
    *   [Post data using a file stream](#post-data-using-a-file-stream)
    *   [Post with form-data (detect multipart)](#post-with-form-data-detect-multipart)
    *   [Request cancellation with AbortSignal](#request-cancellation-with-abortsignal)
*   [API](#api)
    *   [fetch(url\[, options\])](#fetchurl-options)
    *   [Options](#options)
    *   [Class: Request](#class-request)
    *   [Class: Response](#class-response)
    *   [Class: Headers](#class-headers)
    *   [Interface: Body](#interface-body)
    *   [Class: FetchError](#class-fetcherror)
*   [License](#license)
*   [Acknowledgement](#acknowledgement)

Motivation
----------

Instead of implementing `XMLHttpRequest` in Node.js to run browser-specific [Fetch polyfill](https://github.com/github/fetch), why not go from native `http` to `fetch` API directly? Hence, `node-fetch`, minimal code for a `window.fetch` compatible API on Node.js runtime.

See Matt Andrews' [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) or Leonardo Quixada's [cross-fetch](https://github.com/lquixada/cross-fetch) for isomorphic usage (exports `node-fetch` for server-side, `whatwg-fetch` for client-side).

Features
--------

*   Stay consistent with `window.fetch` API.
*   Make conscious trade-off when following [WHATWG fetch spec](https://fetch.spec.whatwg.org/) and [stream spec](https://streams.spec.whatwg.org/) implementation details, document known differences.
*   Use native promise but allow substituting it with \[insert your favorite promise library\].
*   Use native Node streams for body on both request and response.
*   Decode content encoding (gzip/deflate) properly and convert string output (such as `res.text()` and `res.json()`) to UTF-8 automatically.
*   Useful extensions such as timeout, redirect limit, response size limit, [explicit errors](https://github.com/bitinn/node-fetch/blob/HEAD/ERROR-HANDLING.md) for troubleshooting.

Difference from client-side fetch
---------------------------------

*   See [Known Differences](https://github.com/bitinn/node-fetch/blob/HEAD/LIMITS.md) for details.
*   If you happen to use a missing feature that `window.fetch` offers, feel free to open an issue.
*   Pull requests are welcomed too!

Installation
------------

Current stable release (`2.x`)

Loading and configuring the module
----------------------------------

We suggest you load the module via `require` until the stabilization of ES modules in node:

const fetch \= require('node-fetch');

If you are using a Promise library other than native, set it through `fetch.Promise`:

const Bluebird \= require('bluebird');

fetch.Promise \= Bluebird;

Common Usage
------------

NOTE: The documentation below is up-to-date with `2.x` releases; see the [`1.x` readme](https://github.com/bitinn/node-fetch/blob/1.x/README.md), [changelog](https://github.com/bitinn/node-fetch/blob/1.x/CHANGELOG.md) and [2.x upgrade guide](https://github.com/bitinn/node-fetch/blob/HEAD/UPGRADE-GUIDE.md) for the differences.

#### Plain text or HTML

fetch('https://github.com/')

 .then(res \=> res.text())

 .then(body \=> console.log(body));

#### JSON

fetch('https://api.github.com/users/github')

 .then(res \=> res.json())

 .then(json \=> console.log(json));

#### Simple Post

fetch('https://httpbin.org/post', { method: 'POST', body: 'a=1' })

 .then(res \=> res.json()) 

 .then(json \=> console.log(json));

#### Post with JSON

const body \= { a: 1 };

fetch('https://httpbin.org/post', {

 method: 'post',

 body: JSON.stringify(body),

 headers: { 'Content-Type': 'application/json' },

 })

 .then(res \=> res.json())

 .then(json \=> console.log(json));

#### Post with form parameters

`URLSearchParams` is available in Node.js as of v7.5.0. See [official documentation](https://nodejs.org/api/url.html#url_class_urlsearchparams) for more usage methods.

NOTE: The `Content-Type` header is only set automatically to `x-www-form-urlencoded` when an instance of `URLSearchParams` is given as such:

const { URLSearchParams } \= require('url');

const params \= new URLSearchParams();

params.append('a', 1);

fetch('https://httpbin.org/post', { method: 'POST', body: params })

 .then(res \=> res.json())

 .then(json \=> console.log(json));

#### Handling exceptions

NOTE: 3xx-5xx responses are _NOT_ exceptions and should be handled in `then()`; see the next section for more information.

Adding a catch to the fetch promise chain will catch _all_ exceptions, such as errors originating from node core libraries, network errors and operational errors, which are instances of FetchError. See the [error handling document](https://github.com/bitinn/node-fetch/blob/HEAD/ERROR-HANDLING.md) for more details.

fetch('https://domain.invalid/')

 .catch(err \=> console.error(err));

#### Handling client and server errors

It is common to create a helper function to check that the response contains no client (4xx) or server (5xx) error responses:

function checkStatus(res) {

 if (res.ok) { 

 return res;

 } else {

 throw MyCustomError(res.statusText);

 }

}

fetch('https://httpbin.org/status/400')

 .then(checkStatus)

 .then(res \=> console.log('will not get here...'))

Advanced Usage
--------------

#### Streams

The "Node.js way" is to use streams when possible:

fetch('https://assets-cdn.github.com/images/modules/logos\_page/Octocat.png')

 .then(res \=> {

 const dest \= fs.createWriteStream('./octocat.png');

 res.body.pipe(dest);

 });

#### Buffer

If you prefer to cache binary data in full, use buffer(). (NOTE: `buffer()` is a `node-fetch`\-only API)

const fileType \= require('file-type');

fetch('https://assets-cdn.github.com/images/modules/logos\_page/Octocat.png')

 .then(res \=> res.buffer())

 .then(buffer \=> fileType(buffer))

 .then(type \=> {  });

#### Accessing Headers and other Meta data

fetch('https://github.com/')

 .then(res \=> {

 console.log(res.ok);

 console.log(res.status);

 console.log(res.statusText);

 console.log(res.headers.raw());

 console.log(res.headers.get('content-type'));

 });

#### Extract Set-Cookie Header

Unlike browsers, you can access raw `Set-Cookie` headers manually using `Headers.raw()`. This is a `node-fetch` only API.

fetch(url).then(res \=> {

 console.log(res.headers.raw()\['set-cookie'\]);

});

#### Post data using a file stream

const { createReadStream } \= require('fs');

const stream \= createReadStream('input.txt');

fetch('https://httpbin.org/post', { method: 'POST', body: stream })

 .then(res \=> res.json())

 .then(json \=> console.log(json));

#### Post with form-data (detect multipart)

const FormData \= require('form-data');

const form \= new FormData();

form.append('a', 1);

fetch('https://httpbin.org/post', { method: 'POST', body: form })

 .then(res \=> res.json())

 .then(json \=> console.log(json));

const form \= new FormData();

form.append('a', 1);

const options \= {

 method: 'POST',

 body: form,

 headers: form.getHeaders()

}

fetch('https://httpbin.org/post', options)

 .then(res \=> res.json())

 .then(json \=> console.log(json));

#### Request cancellation with AbortSignal

> NOTE: You may cancel streamed requests only on Node >= v8.0.0

You may cancel requests with `AbortController`. A suggested implementation is [`abort-controller`](https://www.npmjs.com/package/abort-controller).

An example of timing out a request after 150ms could be achieved as the following:

import AbortController from 'abort-controller';

const controller \= new AbortController();

const timeout \= setTimeout(

 () \=> { controller.abort(); },

 150,

);

fetch(url, { signal: controller.signal })

 .then(res \=> res.json())

 .then(

 data \=> {

 useData(data)

 },

 err \=> {

 if (err.name \=== 'AbortError') {

 }

 },

 )

 .finally(() \=> {

 clearTimeout(timeout);

 });

See [test cases](https://github.com/bitinn/node-fetch/blob/master/test/test.js) for more examples.

API
---

### fetch(url\[, options\])

*   `url` A string representing the URL for fetching
*   `options` [Options](#fetch-options) for the HTTP(S) request
*   Returns: `Promise<[Response](#class-response)>`

Perform an HTTP(S) fetch.

`url` should be an absolute url, such as `https://example.com/`. A path-relative URL (`/file/under/root`) or protocol-relative URL (`//can-be-http-or-https.com/`) will result in a rejected `Promise`.

### Options

The default values are shown after each option key.

{

 method: 'GET',

 headers: {}, 

 body: null, 

 redirect: 'follow', 

 signal: null, 

 follow: 20, 

 timeout: 0, 

 compress: true, 

 size: 0, 

 agent: null 

}

##### Default Headers

If no values are set, the following request headers will be sent automatically:

| Header | Value |
| --- | --- |
| `Accept-Encoding` | `gzip,deflate` _(when `options.compress === true`)_ |
| `Accept` | `*/*` |
| `Connection` | `close` _(when no `options.agent` is present)_ |
| `Content-Length` | _(automatically calculated, if possible)_ |
| `Transfer-Encoding` | `chunked` _(when `req.body` is a stream)_ |
| `User-Agent` | `node-fetch/1.0 (+https://github.com/bitinn/node-fetch)` |

Note: when `body` is a `Stream`, `Content-Length` is not set automatically.

##### Custom Agent

The `agent` option allows you to specify networking related options which are out of the scope of Fetch, including and not limited to the following:

*   Support self-signed certificate
*   Use only IPv4 or IPv6
*   Custom DNS Lookup

See [`http.Agent`](https://nodejs.org/api/http.html#http_new_agent_options) for more information.

In addition, the `agent` option accepts a function that returns `http`(s)`.Agent` instance given current [URL](https://nodejs.org/api/url.html), this is useful during a redirection chain across HTTP and HTTPS protocol.

const httpAgent \= new http.Agent({

 keepAlive: true

});

const httpsAgent \= new https.Agent({

 keepAlive: true

});

const options \= {

 agent: function (\_parsedURL) {

 if (\_parsedURL.protocol \== 'http:') {

 return httpAgent;

 } else {

 return httpsAgent;

 }

 }

}

### Class: Request

An HTTP(S) request containing information about URL, method, headers, and the body. This class implements the [Body](#iface-body) interface.

Due to the nature of Node.js, the following properties are not implemented at this moment:

*   `type`
*   `destination`
*   `referrer`
*   `referrerPolicy`
*   `mode`
*   `credentials`
*   `cache`
*   `integrity`
*   `keepalive`

The following node-fetch extension properties are provided:

*   `follow`
*   `compress`
*   `counter`
*   `agent`

See [options](#fetch-options) for exact meaning of these extensions.

#### new Request(input\[, options\])

_(spec-compliant)_

*   `input` A string representing a URL, or another `Request` (which will be cloned)
*   `options` \[Options\]\[#fetch-options\] for the HTTP(S) request

Constructs a new `Request` object. The constructor is identical to that in the [browser](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request).

In most cases, directly `fetch(url, options)` is simpler than creating a `Request` object.

### Class: Response

An HTTP(S) response. This class implements the [Body](#iface-body) interface.

The following properties are not implemented in node-fetch at this moment:

*   `Response.error()`
*   `Response.redirect()`
*   `type`
*   `trailer`

#### new Response(\[body\[, options\]\])

_(spec-compliant)_

*   `body` A `String` or [`Readable` stream](https://nodejs.org/api/stream.html#stream_readable_streams)
*   `options` A [`ResponseInit`](https://fetch.spec.whatwg.org/#responseinit) options dictionary

Constructs a new `Response` object. The constructor is identical to that in the [browser](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response).

Because Node.js does not implement service workers (for which this class was designed), one rarely has to construct a `Response` directly.

#### response.ok

_(spec-compliant)_

Convenience property representing if the request ended normally. Will evaluate to true if the response status was greater than or equal to 200 but smaller than 300.

#### response.redirected

_(spec-compliant)_

Convenience property representing if the request has been redirected at least once. Will evaluate to true if the internal redirect counter is greater than 0.

### Class: Headers

This class allows manipulating and iterating over a set of HTTP headers. All methods specified in the [Fetch Standard](https://fetch.spec.whatwg.org/) are implemented.

#### new Headers(\[init\])

_(spec-compliant)_

*   `init` Optional argument to pre-fill the `Headers` object

Construct a new `Headers` object. `init` can be either `null`, a `Headers` object, an key-value map object or any iterable object.

const meta \= {

 'Content-Type': 'text/xml',

 'Breaking-Bad': '<3'

};

const headers \= new Headers(meta);

const meta \= \[

 \[ 'Content-Type', 'text/xml' \],

 \[ 'Breaking-Bad', '<3' \]

\];

const headers \= new Headers(meta);

const meta \= new Map();

meta.set('Content-Type', 'text/xml');

meta.set('Breaking-Bad', '<3');

const headers \= new Headers(meta);

const copyOfHeaders \= new Headers(headers);

### Interface: Body

`Body` is an abstract interface with methods that are applicable to both `Request` and `Response` classes.

The following methods are not yet implemented in node-fetch at this moment:

*   `formData()`

#### body.body

_(deviation from spec)_

*   Node.js [`Readable` stream](https://nodejs.org/api/stream.html#stream_readable_streams)

Data are encapsulated in the `Body` object. Note that while the [Fetch Standard](https://fetch.spec.whatwg.org/) requires the property to always be a WHATWG `ReadableStream`, in node-fetch it is a Node.js [`Readable` stream](https://nodejs.org/api/stream.html#stream_readable_streams).

#### body.bodyUsed

_(spec-compliant)_

*   `Boolean`

A boolean property for if this body has been consumed. Per the specs, a consumed body cannot be used again.

#### body.arrayBuffer()

#### body.blob()

#### body.json()

#### body.text()

_(spec-compliant)_

*   Returns: `Promise`

Consume the body and return a promise that will resolve to one of these formats.

#### body.buffer()

_(node-fetch extension)_

*   Returns: `Promise<Buffer>`

Consume the body and return a promise that will resolve to a Buffer.

#### body.textConverted()

_(node-fetch extension)_

*   Returns: `Promise<String>`

Identical to `body.text()`, except instead of always converting to UTF-8, encoding sniffing will be performed and text converted to UTF-8 if possible.

(This API requires an optional dependency of the npm package [encoding](https://www.npmjs.com/package/encoding), which you need to install manually. `webpack` users may see [a warning message](https://github.com/bitinn/node-fetch/issues/412#issuecomment-379007792) due to this optional dependency.)

### Class: FetchError

_(node-fetch extension)_

An operational error in the fetching process. See [ERROR-HANDLING.md](https://github.com/bitinn/node-fetch/blob/master/ERROR-HANDLING.md) for more info.

### Class: AbortError

_(node-fetch extension)_

An Error thrown when the request is aborted in response to an `AbortSignal`'s `abort` event. It has a `name` property of `AbortError`. See [ERROR-HANDLING.MD](https://github.com/bitinn/node-fetch/blob/master/ERROR-HANDLING.md) for more info.

Acknowledgement
---------------

Thanks to [github/fetch](https://github.com/github/fetch) for providing a solid implementation reference.

`node-fetch` v1 was maintained by [@bitinn](https://github.com/bitinn); v2 was maintained by [@TimothyGu](https://github.com/timothygu), [@bitinn](https://github.com/bitinn) and [@jimmywarting](https://github.com/jimmywarting); v2 readme is written by [@jkantr](https://github.com/jkantr).

License
-------

MIT


[Source](https://www.npmjs.com/package/node-fetch)