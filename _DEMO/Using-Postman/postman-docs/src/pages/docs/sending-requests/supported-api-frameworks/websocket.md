---
title: "Using WebSocket Requests"
order: 38
page_id: "websocket"
search_keyword: "WebSocket, websockets, WebSocket requests"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Installing and updating"
    url: "/docs/getting-started/installation-and-updates/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Grouping requests in collections"
    url: "/docs/sending-requests/intro-to-collections/"

warning: false

---

The WebSocket protocol provides a way to exchange data between a client and server over a persistent connection. The data can be passed in both directions with low latency and overhead, and without breaking the connection. WebSockets provide a bidirectional, full-duplex communications channel that operates over HTTP through a single TCP socket connection. This means the server can independently send data to the client without the client having to request it, and vice versa.

In Postman you can create a WebSocket request with a server, and use it to send and receive messages across the WebSocket connection.

## Creating WebSocket requests

You can create a WebSocket request from the left sidebar in Postman.

1. Click  __New__ &gt; __WebSocket Request__ to open a new tab. (You can also select ⌘+N or Ctrl+N.)
  [![New Screen](https://assets.postman.com/postman-docs/new-request-websocket.jpg)](https://assets.postman.com/postman-docs/new-request-websocket.jpg)
1. Enter the WebSocket server URL. A WebSocket URL begins with `ws://` or `wss://`.<br/>
[![WebSocket server URL](https://assets.postman.com/postman-docs/websocket-server-url.jpg)](https://assets.postman.com/postman-docs/websocket-server-url.jpg)
1. Click **Connect**.
1. To disconnect your WebSocket request's connection, click **Disconnect**.

## Sending messages

After making a WebSocket connection, you can use the editor pane to compose and send messages.

[![WebSocket message editor](https://assets.postman.com/postman-docs/websocket-message-editor.jpg)](https://assets.postman.com/postman-docs/websocket-message-editor.jpg)

In the bottom left corner of the editor, you can select the format of your message: **Text**, **JSON**, **XML**, **HTML**, or **Array Buffer**. The editor has syntax highlighting according to the selected format. You can also click **{}** to beautify the message.

When you have finished composing your message, click **Send**. The sent message will remain in the window, in case you want to change it and re-send.

## Viewing messages

The **Messages** pane displays a list of messages for the WebSocket connection, including incoming, outgoing, and network messages.

At the top of the message pane is a connection details badge. It shows if the connection is connecting, connected, disconnecting, or disconnected. Hover over the badge to show details on the connection. Click **^** next to the badge to hide messages. If the messages are hidden, click **v** to show them.

[![WebSocket messages](https://assets.postman.com/postman-docs/websocket-messages.jpg)](https://assets.postman.com/postman-docs/websocket-messages.jpg)

Above the message display are the following controls:

* Search control - Enter a search term to display only messages containing the term. Click **X** to end the search.
* Message type list - Select if you want to view all messages, or only incoming or outgoing messages.
* Trash - Click the trash can icon to clear all messages.

The following are displayed for each message:

* If you hover over a message, a check box is displayed. Select the check boxes for two messages, and the time difference between the messages will be displayed. Click **Deselect** to remove the time display.
  [![WebSocket time difference](https://assets.postman.com/postman-docs/websocket-time-difference.gif)](https://assets.postman.com/postman-docs/websocket-time-difference.gif)
* Click **>** to expand a message, or **v** to collapse it.
* The time is displayed, as your local time.
* If you hover over the time, an information icon is displayed. Hover over it to see the time, MIME type, and size of the message.
* If you hover over the time, a copy icon is also shown. Click this to copy the message to your clipboard.

In an expanded message:

* Select **Text**, **HTML**, **JSON**, or **XML** to change the formatting of the message.
* Click Wrap Line to add or remove line wraps.
* Click **Show Hexdump** or **Show Message** to toggle if the message is shown in hex or text.
* Use the search control to search the body of the message.
* When you hover over line numbers, caret controls (**v**) are displayed. Click them to expand or collapse blocks of the message.
[![WebSocket message body](https://assets.postman.com/postman-docs/websocket-message-body.jpg)](https://assets.postman.com/postman-docs/websocket-message-body.jpg)

## Using variables in requests and messages

You can use Postman variables in the URL of a WebSocket connection or the body of a message. For example, you could create a variable named `my_host`, set the value to `example.com` and then use a URL of `ws://{{my_host}}/api/example`. If you type `{{` in either the URL field or message editor, you can autocomplete your variables.

See [Using variables](/docs/sending-requests/variables/) for more information on how to use variables.

## Adding request details

You can add details to your request, for example to send additional parameters and headers. You can also configure the connection. Click the **Params**, **Headers**, or **Settings** tab above the editor pane to make changes.

> You can't change request details while you are connected. You must make any changes before you connect, or click **Disconnect** to stop the current connection.

### Sending parameters

On the **Params** tab, add any parameters you would like to append to the WebSocket URL. This works similarly to [sending parameters](/docs/sending-requests/requests/#sending-parameters) in a REST request.

## Configuring headers

On the **Headers** tab, enter any headers you would like to send with your message. This works similarly to [configuring request headers](/docs/sending-requests/requests/#configuring-request-headers) in a REST request.

### Configuring Request Settings

The following settings can be configured for your WebSocket request:

| Setting | Description |
|-----|-----|
| Handshake request timeout | How long the handshake request will wait before timing out, in milliseconds. This is reset after every redirection. |
| Reconnection attempts | The maximum number of reconnection attempts before disconnecting. |
| Reconnection intervals | The period in milliseconds between subsequent reconnection attempts. |
| Maximum message size | The maximum allowed message size, in megabytes. To receive messages of any size, set this to 0. |

## Troubleshooting WebSocket Requests

You can use the console to debug issues with a WebSocket connection. To open the console and view log messages, click **Console** in the status bar at the bottom left of Postman.

For more information on using the console, see [Troubleshooting requests](/docs/sending-requests/troubleshooting-api-requests/).
