
# WebSockets Learning Objectives

WebSockets enable two-way communication between the user's browser (the client)
and a server. They can be used to enable dynamic, interactive web experiences.
After reading and practicing, you should be able to:

* Use the WebSockets API to create a new WebSocket connection to a server
* Create a WebSocket `onopen` event handler function to detect when the
  connection has been opened
* Create a WebSocket `onmessage` event handler function to detect and process
  messages sent by the server
* Create a WebSocket `onerror` event handler function to detect when an error
  has occurred
* Use the WebSocket `send()` method to send messages to the server
* Recall that WebSocket message data can be sent as JSON formatted string
* Recall that WebSocket messages usually have a "type" associated with them so
  the client can determine how to process them
* Use the WebSocket `close()` method to close the connection to the server
* Create a WebSocket `onclose` event handler function to detect when the
  connection to the server has been closed
* Use the `ws` package to create a standalone WebSocket server
* Use the `ws` package to create a WebSocket server that shares a Node.js `http`
  server with an Express application
* Create an `connection` event handler listener method to detect when a client
  has connected to the WebSocket server
* Create an `close` event handler listener method to detect when a client has
  closed the connection to the WebSocket server
* Use the WebSocket `send()` method to send a message to a client
