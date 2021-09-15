# WebSocket Client Applications
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

WebSockets enable two-way communication between the user's browser (the client)
and a server. Normally, the server only responds to client requests. When using
WebSockets, once the client has opened a connection with the server, the server
can send messages to the client.

A good place to start learning about Websockets on the Web is with the
[Writing WebSocket client applications][mdn ws client apps] article on MDN web
docs.

After reading this article, you should be able to:

* Use the WebSockets API to create a new WebSocket connection to a server;
* Create a WebSocket `onopen` event handler function to detect when the
  connection has been opened;
* Create a WebSocket `onmessage` event handler function to detect and process
  messages sent by the server;
* Create a WebSocket `onerror` event handler function to detect when an error
  has occurred;
* Use the WebSocket `send()` method to send messages to the server;
* Recall that WebSocket message data can be sent as JSON formatted string;
* Recall that WebSocket messages usually have a "type" associated with them so
  the client can determine how to process them;
* Use the WebSocket `close()` method to close the connection to the server; and
* Create a WebSocket `onclose` event handler function to detect when the
  connection to the server has been closed.

[mdn ws client apps]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
