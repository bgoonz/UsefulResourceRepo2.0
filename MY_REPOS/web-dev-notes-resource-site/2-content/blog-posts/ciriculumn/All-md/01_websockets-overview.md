# WebSockets Overview
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

Up until now, you've seen communication between the Web browser and your backend
server occur in the _request/response cycle_ of HTTP 1.1.

![HTTP Exchange][1]

The _Client_ makes an HTTP request, like **GET /home HTTP/1.1**. The _Server_
receives that request, translates it, and returns an HTTP response, like
**HTTP/1.1 200 OK**. One request, one response. That is great for getting data
and asking the server to create new resources, but it does not support the
demands of Web applications that need "real-time communication" or to receive
messages from the server _without_ an HTTP request. The [WebSockets][2] standard
fills that hole. (That's a link to the RFC. It's ... dense.)

Check out this [link to caniuse.com][3] that tracks the support of WebSockets
(and a whole bunch of other things) in browsers for the desktop and mobile. You
can see that _everything_ supports WebSockets (except Opera Mini which fails to
support pretty much anything, stupid Opera Mini).

Since the technology is now well-supported, it makes sense to learn it so that
you can do _amazing_ things in your Web application.

In this article, you will learn about how WebSockets work from the perspectives
of the communication between the client and the server.

**Just one thing**: there are _lots_ of libraries out there for you to use that
make this WebSocket thing "easy". In the same way that this curriculum
challenges you to use `fetch` rather than some other AJAX library like `axios`,
learning WebSockets teaches you about the _technology_ and how it works. Once
you know that, then you can use _any_ library (like socket.io) to ease your
development. But, giving you the deeper knowledge is what this is providing for
you.

## Key points about Web sockets

### Persistent Connections

In the traditional model of request/response, the client makes a connection to
the server, makes the request, the server responds on the same connection, then
the connection can be closed. The next time your browser wants to make a request
to the Web server, it may need to establish that connection, again.

WebSockets create a _persistent connection_, one that doesn't close unless it
doesn't get used. This means that the TCP/IP handshake that needs to occur
between the browser and server does not need to happen with every single
request. This has two benefits:

1. Your front-end application does not need to establish that connection _every
   single time_. This makes the application feel snappier.
2. The connection is _two-way_! While it's open, the server can send messages to
   the client _whenever it wants to_! That is mind-blowing because HTTP 1.1
   cannot support that without jumping through crazy hoops that can cause your
   server to crash.

The way it happens is an extra HTTP header in the HTTP request. Here's an
example.

```
GET ws://WebSocket.example.com/ HTTP/1.1
Origin: http://example.com
Connection: Upgrade
Host: WebSocket.example.com
Upgrade: WebSocket
```

So, checkout two things about this:

1. The protocol is "ws" which, you can probably guess, means "WebSocket".
   (There's also a "wss" which is like "HTTPS" but for WebSockets Secure.)
2. The "Connection" header tells the server that the browser is requesting an
   upgrade for the normal HTTP 1.1 connection
3. The "Upgrade" header tells the server that the browser specifically wants
   a WebSocket

If the server supports WebSockets, it says "COOL!" and returns something like
the following headers in the response.

```
HTTP/1.1 101 WebSocket Protocol Handshake
Date: Thu, 7 May 2020 17:07:34 GMT
Connection: Upgrade
Upgrade: WebSocket
```

This confirms that the server is good with upgrading the connection. When both
the client and server agree, they just don't close the connection.

Boom! Persistent!

### Messages, not requests and responses

Once the connection exists between the browser and the server, either of the two
can send a _message_ over the connection. It's a _message_ with a sender and a
receiver. It is _not_ a request/response. There is no request. There is no
response. There are just two actors sending messages back and forth, like two
kids in school passing notes back and forth in class. The server doesn't have to
wait for a request to send a message. The client can sends a message _without_
the expectation of a response.

Just like in TCP/IP, when data gets chopped up into packets and datagrams,
messages over WebSockets get chopped up into _frames_. Each frame contains extra
information to help ensure the integrity of the message as it traverses between
sender and recipient. It's not super important to know what those parts are
because you're not writing code to implement the standard; instead, the browser
will do it for you automatically, just like using `fetch` means you don't have
to format the HTTP request.

## Client-side code

Just like the browser has the `fetch` method to easily make HTTP 1.1 requests,
it provides a `WebSocket` class for you to create objects that manage the
connection between the browser and the server. You just give the constructor the
WebSocket URL that you want your browser to connect to.

```js
// This is EXAMPLE CODE ONLY!
// There is no sockets.example.com!
const socket = new WebSocket('wss://sockets.example.com');
```

Now, with `fetch`, that _sends_ a request and, when a response comes back, the
`Promise` gets fulfilled and you do stuff with it. That's not how `WebSocket`
objects work. They _can't_ work that way.

Instead of a `Promise`, you add event listeners to the `WebSocket` object in the
same way that you add event listeners to `input` or `button` elements to capture
specific kinds of events. For the WebSocket, the events are

* **message** fired when a message fully arrived over the WebSocket from the
  server
* **close** fired when the WebSocket closes for some reason, the status code
  being in the "code" property of the event and the reason in the "reason"
  property of the event object
* **error** fired when the WebSocket can't even connect
* **open** fired when the WebSocket opens

Then, the `WebSocket` object has two methods for you to use, `send` to send a
message to the server, and `close` to close the connection. Here's what some
code could look like that uses that `socket` opened above.

```js
// This is EXAMPLE CODE ONLY!

// When the socket is open, send a message!
socket.addEventListener('open', () => socket.send('I am LEGENDARY!'));

// When you get a message, add it to your state store.
socket.addEventListener('message', event => {
  dispatch(gotMessage(event.data));
});

// Print out that something bad happened
socket.addEventListener('error', () => {
  console.error('Something bad happened... :-(');
});

// When the socket closes, update the state
// of the application!
socket.addEventListener('close', () => {
  dispatch(justDisconnected());
});
```

**Note**: just like with DOM elements where you could use `el.onclick = () =>
{...}` to add an event handler. You can do something like `socket.onmessage = ()
=> {...}`, too. But, that's just not nice because you can't add more than one
listener. So, if you see that in the documentation, somewhere, remember that you
can always use `addEventListener` rather than the `on«event»` properties.

All of that is just provided for you in the browser! There's a lot of code under
all of that to allow your JavaScript that easy-to-use API! Thanks, browser
makers!

You can give it a shot yourself. Create a new HTML 5 file with all of the normal
stuff and add this code in there.

In the body of the document, put this.

```html
<div>
  <button id="connect">Connect</button>
  <button id="send-message">Send</button>
  <button id="disconnect">Disconnect</button>
</div>
<div id="messages"></div>
```

Now, create a `script` element _after_ the content you just added (so you don't
have to wait for "DOMContentLoaded"). This is just regular-old DOM code with
the socket message stuff in there, too. Have a look and try it out! Change the
code so that you can see how changes affect it!

This code uses a _real_ WebSocket server, wss://echo.websocket.org!

```js
const connect = document.getElementById('connect');
const disconnect = document.getElementById('disconnect');
const sendMessage = document.getElementById('send-message');
const messages = document.getElementById('messages');

let socket = null;

connect.addEventListener('click', () => {
  messages.innerHTML += `<p>Opening WebSocket...</p>`;
  socket = new WebSocket("wss://echo.websocket.org/");

  socket.addEventListener('open', () => {
    messages.innerHTML += `<p>CONNECTED!</p>`;
  });

  socket.addEventListener('message', event => {
    messages.innerHTML += `<p>Received "${event.data}"</p>`;
  });

  socket.addEventListener('error', () => {
    messages.innerHTML += `<p>ERROR</p>`;
  });

  socket.addEventListener('close', () => {
    messages.innerHTML += `<p>Socket closed</p>`;
    socket = null;
  });
});

disconnect.addEventListener('click', () => {
  if (!socket) {
    messages.innerHTML += `<p>Socket not open.</p>`;
    return;
  }

  socket.close();
});

sendMessage.addEventListener('click', () => {
  if (!socket) {
    messages.innerHTML += `<p>Socket not open.</p>`;
    return;
  }
  messages.innerHTML += `<p>Sending "WebSockets are cool!"</p>`;
  socket.send('WebSockets are cool!');
});
```

Here's an interesting thing. After you play around with the code, refresh the
page and connect to the server. Then, just wait. Likely, eventually, the socket
will close due to disuse. Many libraries (like socket.io) keep the connection
"warm" by sending little _ping_ methods to the server to let the server know
that it really does want to keep that connection open. If it doesn't close, then
you have a _really_ good and stable Internet connection!

## Server-side code

If that's the client-side code above, the question that might be bothering you
is "How hard is the server-side code?" Well, luckily, it's just about the same
level of ease with the [ws][4] package for Node.js.

Because WebSockets are a browser-based technology, the implementations that you
will find on the server can vary widely. Luckily, the **ws** API is an
event-driven API, too. It provides these events for you to use to build a
WebSocket server using the `Server` object.

* The **connection** event occurs when the HTTP handshake completes but the
  connection has _not_ upgraded. It's callback receives a `WebSocket` that
  allows you to communicate with the client.
* The **headers** event which allows you to inspect and modify headers before
  they are sent back to the client.
* The **listening** event which fires when the underlying server is bound to
  a _network socket_, not a Web socket.

Then, the server has a `close` method which lets it shut down. It's got some
other methods, too, about handling upgrades and stuff, which are outside the
scope of this article. You are encouraged to go check out the API docs in a
later article.

Those last two are some pretty low-level events that you won't necessarily have
to pay attention to unless you're doing some _really_ advanced stuff. However,
you _will_ want to pay attention to the **connection** property because that
is how you know a client is connected. Then, when the connection gets upgraded,
the callback gets a `WebSocket` object so that your server can send messages to
the browser.

Here's the code to write an "echo" server like you just used in the client-side
stuff above. Put this in a file, install "ws" using `npm install ws`, and run it
with `node «filename»`. Then, change the URL in the HTML file that you created
from wss://echo.websocket.org/ to ws://localhost:8080. Everything still works!

```js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', webSocket => {
  console.log('client connecting...');

  let interval = null;
  setInterval(() => webSocket.send('Hello?'), 1000);

  webSocket.on('message', message => {
    console.log('received: %s', message);
    webSocket.send(message);
  });

  webSocket.on('close', () => {
    console.log('Connection closed.');
    clearInterval(interval)
  });
});
```

You can see that a server gets created using port 8080. That server then waits
for connections with `server.on('connection', ...)`. When the connection occurs,
the callback gets called and `webSocket` gets set to the actual `WebSocket`
instance that you can use to send (and receive) messages to (and from) the
client. Then, it creates an interval that sends a "Hello?" message to the client
every second or so.

You subscribe to messages using `webSocket.on('message', ...)`. When a message
arrives from the browser, the callback gets called with the content of the data
in the `message` variable. Normally, that'll be a JSON-formatted string that you
can use to do things with your code.

Finally, when the `WebSocket` object closes, it prints a message to the console
and clears that interval.

That's how nice **ws** makes it to write WebSocket-enabled. Thank you, **ws**!

A really cool thing about **ws** is that it can track clients for you when you
create the `Server` object by passing in the [`clientTracking` option][5] when
you construct it. Then, the `clients` property on the `Server` object will have
all of the clients on it so you can broadcast messages to _everyone_!

## What you've learned

1. WebSockets are a persistent connection between the browser and server
2. It's a two-way connection, messages can flow in both directions
3. The "Connection" header is used to request an upgrade. The "Upgrade" header
   specifically requests a WebSocket.
4. Client-side code is an event-driven model with **open**, **close**,
   **message**, and **error** events
5. Server-side code is an event-driven model that waits for **connection**
   events on a `Server` object which, then, provides a `WebSocket` object nearly
   identical to the `WebSocket` used on the client side.

[1]: images/image-http-exchange.svg
[2]: https://tools.ietf.org/html/rfc6455
[3]: https://caniuse.com/#search=WebSockets
[4]: https://github.com/websockets/ws
[5]: https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketserveroptions-callback
