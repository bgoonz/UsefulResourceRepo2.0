# WebSocket Server Applications
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Now that you know how to use WebSockets on the client, it's time to learn how to
use WebSockets on the server. To enable support for WebSockets on the server,
you'll use the [`ws` npm package][npm ws], a WebSocket server implementation for
use with Node.js applications.

The `ws` package provides both a _server_ and a _client_ implementation. The
client implementation is only intended for use on Node.js, to enable _server_ to
_server_ WebSocket connections. When reading [the documentation for the `ws`
package][npm ws], focus on the following _server_ examples:

* [Simple Server][ws simple server]
* [Server Broadcast][ws server broadcast]
* [Example Application: Server Stats][ws examples server stats]
* [Example Application: Express Session Parse][ws examples express session
  parse]

After reading [the documentation for the `ws` package][npm ws], you should be
able to:

* Use the `ws` package to create a standalone WebSocket server;
* Use the `ws` package to create a WebSocket server that shares a Node.js `http`
  server with an Express application;
* Create an `connection` event handler listener method to detect when a client
  has connected to the WebSocket server;
* Create an `close` event handler listener method to detect when a client has
  closed the connection to the WebSocket server; and
* Use the WebSocket `send()` method to send a message to a client.

[npm ws]: https://www.npmjs.com/package/ws
[ws simple server]: https://www.npmjs.com/package/ws#simple-server
[ws server broadcast]: https://www.npmjs.com/package/ws#server-broadcast
[ws examples server stats]: https://github.com/websockets/ws/tree/master/examples/server-stats
[ws examples express session parse]: https://github.com/websockets/ws/tree/master/examples/express-session-parse
