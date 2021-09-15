# Net | Node.js v15.0.1 Documentation

> Source Code: lib/net.js

**Source Code:** [lib/net.js](https://github.com/nodejs/node/blob/v15.0.1/lib/net.js)

The `net` module provides an asynchronous network API for creating stream-based TCP or [IPC](#net_ipc_support) servers ([`net.createServer()`](#net_net_createserver_options_connectionlistener)) and clients ([`net.createConnection()`](#net_net_createconnection)).

It can be accessed using:

    const net = require('net');

IPC support[#](#net_ipc_support)
--------------------------------

The `net` module supports IPC with named pipes on Windows, and Unix domain sockets on other operating systems.

### Identifying paths for IPC connections[#](#net_identifying_paths_for_ipc_connections)

[`net.connect()`](#net_net_connect), [`net.createConnection()`](#net_net_createconnection), [`server.listen()`](#net_server_listen) and [`socket.connect()`](#net_socket_connect) take a `path` parameter to identify IPC endpoints.

On Unix, the local domain is also known as the Unix domain. The path is a filesystem pathname. It gets truncated to an OS-dependent length of `sizeof(sockaddr_un.sun_path) - 1`. Typical values are 107 bytes on Linux and 103 bytes on macOS. If a Node.js API abstraction creates the Unix domain socket, it will unlink the Unix domain socket as well. For example, [`net.createServer()`](#net_net_createserver_options_connectionlistener) may create a Unix domain socket and [`server.close()`](#net_server_close_callback) will unlink it. But if a user creates the Unix domain socket outside of these abstractions, the user will need to remove it. The same applies when a Node.js API creates a Unix domain socket but the program then crashes. In short, a Unix domain socket will be visible in the filesystem and will persist until unlinked.

On Windows, the local domain is implemented using a named pipe. The path _must_ refer to an entry in `\\?\pipe\` or `\\.\pipe\`. Any characters are permitted, but the latter may do some processing of pipe names, such as resolving `..` sequences. Despite how it might look, the pipe namespace is flat. Pipes will _not persist_. They are removed when the last reference to them is closed. Unlike Unix domain sockets, Windows will close and remove the pipe when the owning process exits.

JavaScript string escaping requires paths to be specified with extra backslash escaping such as:

    net.createServer().listen(
      path.join('\\\\?\\pipe', process.cwd(), 'myctl'));

Class: `net.BlockList`[#](#net_class_net_blocklist)
---------------------------------------------------

Added in: v15.0.0

The `BlockList` object can be used with some network APIs to specify rules for disabling inbound or outbound access to specific IP addresses, IP ranges, or IP subnets.

### `blockList.addAddress(address[, type])`[#](#net_blocklist_addaddress_address_type)

Added in: v15.0.0

*   `address` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) An IPv4 or IPv6 address.
*   `type` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Either `'ipv4'` or `'ipv6'`. **Default**: `'ipv4'`.

Adds a rule to block the given IP address.

### `blockList.addRange(start, end[, type])`[#](#net_blocklist_addrange_start_end_type)

Added in: v15.0.0

*   `start` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The starting IPv4 or IPv6 address in the range.
*   `end` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The ending IPv4 or IPv6 address in the range.
*   `type` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Either `'ipv4'` or `'ipv6'`. **Default**: `'ipv4'`.

Adds a rule to block a range of IP addresses from `start` (inclusive) to `end` (inclusive).

### `blockList.addSubnet(net, prefix[, type])`[#](#net_blocklist_addsubnet_net_prefix_type)

Added in: v15.0.0

*   `net` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The network IPv4 or IPv6 address.
*   `prefix` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of CIDR prefix bits. For IPv4, this must be a value between `0` and `32`. For IPv6, this must be between `0` and `128`.
*   `type` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Either `'ipv4'` or `'ipv6'`. **Default**: `'ipv4'`.

Adds a rule to block a range of IP addresses specified as a subnet mask.

### `blockList.check(address[, type])`[#](#net_blocklist_check_address_type)

Added in: v15.0.0

*   `address` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The IP address to check
*   `type` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Either `'ipv4'` or `'ipv6'`. **Default**: `'ipv4'`.
*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the given IP address matches any of the rules added to the `BlockList`.

    const blockList = new net.BlockList();
    blockList.addAddress('123.123.123.123');
    blockList.addRange('10.0.0.1', '10.0.0.10');
    blockList.addSubnet('8592:757c:efae:4e45::', 64, 'ipv6');
    
    console.log(blockList.check('123.123.123.123'));  
    console.log(blockList.check('10.0.0.3'));  
    console.log(blockList.check('222.111.111.222'));  
    
    
    console.log(blockList.check('::ffff:7b7b:7b7b', 'ipv6')); 
    console.log(blockList.check('::ffff:123.123.123.123', 'ipv6')); 

### `blockList.rules`[#](#net_blocklist_rules)

Added in: v15.0.0

*   Type: [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The list of rules added to the blocklist.

Class: `net.Server`[#](#net_class_net_server)
---------------------------------------------

Added in: v0.1.90

*   Extends: [<EventEmitter>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/events.html#events_class_eventemitter)

This class is used to create a TCP or [IPC](#net_ipc_support) server.

### `new net.Server([options][, connectionListener])`[#](#net_new_net_server_options_connectionlistener)

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) See [`net.createServer([options][, connectionListener])`](#net_net_createserver_options_connectionlistener).
*   `connectionListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Automatically set as a listener for the [`'connection'`](#net_event_connection) event.
*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

`net.Server` is an [`EventEmitter`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/events.html#events_class_eventemitter) with the following events:

### Event: `'close'`[#](#net_event_close)

Added in: v0.5.0

Emitted when the server closes. If connections exist, this event is not emitted until all connections are ended.

### Event: `'connection'`[#](#net_event_connection)

Added in: v0.1.90

*   [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The connection object

Emitted when a new connection is made. `socket` is an instance of `net.Socket`.

### Event: `'error'`[#](#net_event_error)

Added in: v0.1.90

*   [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Emitted when an error occurs. Unlike [`net.Socket`](#net_class_net_socket), the [`'close'`](#net_event_close) event will **not** be emitted directly following this event unless [`server.close()`](#net_server_close_callback) is manually called. See the example in discussion of [`server.listen()`](#net_server_listen).

### Event: `'listening'`[#](#net_event_listening)

Added in: v0.1.90

Emitted when the server has been bound after calling [`server.listen()`](#net_server_listen).

### `server.address()`[#](#net_server_address)

Added in: v0.1.90

*   Returns: [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type)

Returns the bound `address`, the address `family` name, and `port` of the server as reported by the operating system if listening on an IP socket (useful to find which port was assigned when getting an OS-assigned address): `{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`.

For a server listening on a pipe or Unix domain socket, the name is returned as a string.

    const server = net.createServer((socket) => {
      socket.end('goodbye\n');
    }).on('error', (err) => {
      
      throw err;
    });
    
    
    server.listen(() => {
      console.log('opened server on', server.address());
    });

`server.address()` returns `null` before the `'listening'` event has been emitted or after calling `server.close()`.

### `server.close([callback])`[#](#net_server_close_callback)

Added in: v0.1.90

*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Called when the server is closed.
*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

Stops the server from accepting new connections and keeps existing connections. This function is asynchronous, the server is finally closed when all connections are ended and the server emits a [`'close'`](#net_event_close) event. The optional `callback` will be called once the `'close'` event occurs. Unlike that event, it will be called with an `Error` as its only argument if the server was not open when it was closed.

### `server.getConnections(callback)`[#](#net_server_getconnections_callback)

Added in: v0.9.7

*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

Asynchronously get the number of concurrent connections on the server. Works when sockets were sent to forks.

Callback should take two arguments `err` and `count`.

### `server.listen()`[#](#net_server_listen)

Start a server listening for connections. A `net.Server` can be a TCP or an [IPC](#net_ipc_support) server depending on what it listens to.

Possible signatures:

*   [`server.listen(handle[, backlog][, callback])`](#net_server_listen_handle_backlog_callback)
*   [`server.listen(options[, callback])`](#net_server_listen_options_callback)
*   [`server.listen(path[, backlog][, callback])`](#net_server_listen_path_backlog_callback) for [IPC](#net_ipc_support) servers
*   [`server.listen([port[, host[, backlog]]][, callback])`](#net_server_listen_port_host_backlog_callback) for TCP servers

This function is asynchronous. When the server starts listening, the [`'listening'`](#net_event_listening) event will be emitted. The last parameter `callback` will be added as a listener for the [`'listening'`](#net_event_listening) event.

All `listen()` methods can take a `backlog` parameter to specify the maximum length of the queue of pending connections. The actual length will be determined by the OS through sysctl settings such as `tcp_max_syn_backlog` and `somaxconn` on Linux. The default value of this parameter is 511 (not 512).

All [`net.Socket`](#net_class_net_socket) are set to `SO_REUSEADDR` (see [`socket(7)`](https://man7.org/linux/man-pages/man7/socket.7.html) for details).

The `server.listen()` method can be called again if and only if there was an error during the first `server.listen()` call or `server.close()` has been called. Otherwise, an `ERR_SERVER_ALREADY_LISTEN` error will be thrown.

One of the most common errors raised when listening is `EADDRINUSE`. This happens when another server is already listening on the requested `port`/`path`/`handle`. One way to handle this would be to retry after a certain amount of time:

    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(() => {
          server.close();
          server.listen(PORT, HOST);
        }, 1000);
      }
    });

#### `server.listen(handle[, backlog][, callback])`[#](#net_server_listen_handle_backlog_callback)

Added in: v0.5.10

*   `handle` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `backlog` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Common parameter of [`server.listen()`](#net_server_listen) functions
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

Start a server listening for connections on a given `handle` that has already been bound to a port, a Unix domain socket, or a Windows named pipe.

The `handle` object can be either a server, a socket (anything with an underlying `_handle` member), or an object with an `fd` member that is a valid file descriptor.

Listening on a file descriptor is not supported on Windows.

#### `server.listen(options[, callback])`[#](#net_server_listen_options_callback)

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Required. Supports the following properties:
    *   `port` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `host` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Will be ignored if `port` is specified. See [Identifying paths for IPC connections](#net_identifying_paths_for_ipc_connections).
    *   `backlog` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Common parameter of [`server.listen()`](#net_server_listen) functions.
    *   `exclusive` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
    *   `readableAll` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) For IPC servers makes the pipe readable for all users. **Default:** `false`.
    *   `writableAll` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) For IPC servers makes the pipe writable for all users. **Default:** `false`.
    *   `ipv6Only` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) For TCP servers, setting `ipv6Only` to `true` will disable dual-stack support, i.e., binding to host `::` won't make `0.0.0.0` be bound. **Default:** `false`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) functions.
*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

If `port` is specified, it behaves the same as [`server.listen([port[, host[, backlog]]][, callback])`](#net_server_listen_port_host_backlog_callback). Otherwise, if `path` is specified, it behaves the same as [`server.listen(path[, backlog][, callback])`](#net_server_listen_path_backlog_callback). If none of them is specified, an error will be thrown.

If `exclusive` is `false` (default), then cluster workers will use the same underlying handle, allowing connection handling duties to be shared. When `exclusive` is `true`, the handle is not shared, and attempted port sharing results in an error. An example which listens on an exclusive port is shown below.

    server.listen({
      host: 'localhost',
      port: 80,
      exclusive: true
    });

Starting an IPC server as root may cause the server path to be inaccessible for unprivileged users. Using `readableAll` and `writableAll` will make the server accessible for all users.

#### `server.listen(path[, backlog][, callback])`[#](#net_server_listen_path_backlog_callback)

Added in: v0.1.90

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Path the server should listen to. See [Identifying paths for IPC connections](#net_identifying_paths_for_ipc_connections).
*   `backlog` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Common parameter of [`server.listen()`](#net_server_listen) functions.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).
*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

Start an [IPC](#net_ipc_support) server listening for connections on the given `path`.

#### `server.listen([port[, host[, backlog]]][, callback])`[#](#net_server_listen_port_host_backlog_callback)

Added in: v0.1.90

*   `port` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `host` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `backlog` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Common parameter of [`server.listen()`](#net_server_listen) functions.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).
*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

Start a TCP server listening for connections on the given `port` and `host`.

If `port` is omitted or is 0, the operating system will assign an arbitrary unused port, which can be retrieved by using `server.address().port` after the [`'listening'`](#net_event_listening) event has been emitted.

If `host` is omitted, the server will accept connections on the [unspecified IPv6 address](https://en.wikipedia.org/wiki/IPv6_address#Unspecified_address) (`::`) when IPv6 is available, or the [unspecified IPv4 address](https://en.wikipedia.org/wiki/0.0.0.0) (`0.0.0.0`) otherwise.

In most operating systems, listening to the [unspecified IPv6 address](https://en.wikipedia.org/wiki/IPv6_address#Unspecified_address) (`::`) may cause the `net.Server` to also listen on the [unspecified IPv4 address](https://en.wikipedia.org/wiki/0.0.0.0) (`0.0.0.0`).

### `server.listening`[#](#net_server_listening)

Added in: v5.7.0

*   [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether or not the server is listening for connections.

### `server.maxConnections`[#](#net_server_maxconnections)

Added in: v0.2.0

*   [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Set this property to reject connections when the server's connection count gets high.

It is not recommended to use this option once a socket has been sent to a child with [`child_process.fork()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/child_process.html#child_process_child_process_fork_modulepath_args_options).

### `server.ref()`[#](#net_server_ref)

Added in: v0.9.1

*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

Opposite of `unref()`, calling `ref()` on a previously `unref`ed server will _not_ let the program exit if it's the only server left (the default behavior). If the server is `ref`ed calling `ref()` again will have no effect.

### `server.unref()`[#](#net_server_unref)

Added in: v0.9.1

*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

Calling `unref()` on a server will allow the program to exit if this is the only active server in the event system. If the server is already `unref`ed calling `unref()` again will have no effect.

Class: `net.Socket`[#](#net_class_net_socket)
---------------------------------------------

Added in: v0.3.4

*   Extends: [<stream.Duplex>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_class_stream_duplex)

This class is an abstraction of a TCP socket or a streaming [IPC](#net_ipc_support) endpoint (uses named pipes on Windows, and Unix domain sockets otherwise). It is also an [`EventEmitter`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/events.html#events_class_eventemitter).

A `net.Socket` can be created by the user and used directly to interact with a server. For example, it is returned by [`net.createConnection()`](#net_net_createconnection), so the user can use it to talk to the server.

It can also be created by Node.js and passed to the user when a connection is received. For example, it is passed to the listeners of a [`'connection'`](#net_event_connection) event emitted on a [`net.Server`](#net_class_net_server), so the user can use it to interact with the client.

### `new net.Socket([options])`[#](#net_new_net_socket_options)

Added in: v0.3.4

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Available options are:
    *   `fd` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If specified, wrap around an existing socket with the given file descriptor, otherwise a new socket will be created.
    *   `allowHalfOpen` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether half-opened TCP connections are allowed. See [`net.createServer()`](#net_net_createserver_options_connectionlistener) and the [`'end'`](#net_event_end) event for details. **Default:** `false`.
    *   `readable` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Allow reads on the socket when an `fd` is passed, otherwise ignored. **Default:** `false`.
    *   `writable` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Allow writes on the socket when an `fd` is passed, otherwise ignored. **Default:** `false`.
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket)

Creates a new socket object.

The newly created socket can be either a TCP socket or a streaming [IPC](#net_ipc_support) endpoint, depending on what it [`connect()`](#net_socket_connect) to.

### Event: `'close'`[#](#net_event_close_1)

Added in: v0.1.90

*   `hadError` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) `true` if the socket had a transmission error.

Emitted once the socket is fully closed. The argument `hadError` is a boolean which says if the socket was closed due to a transmission error.

### Event: `'connect'`[#](#net_event_connect)

Added in: v0.1.90

Emitted when a socket connection is successfully established. See [`net.createConnection()`](#net_net_createconnection).

### Event: `'data'`[#](#net_event_data)

Added in: v0.1.90

*   [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Emitted when data is received. The argument `data` will be a `Buffer` or `String`. Encoding of data is set by [`socket.setEncoding()`](#net_socket_setencoding_encoding).

The data will be lost if there is no listener when a `Socket` emits a `'data'` event.

### Event: `'drain'`[#](#net_event_drain)

Added in: v0.1.90

Emitted when the write buffer becomes empty. Can be used to throttle uploads.

See also: the return values of `socket.write()`.

### Event: `'end'`[#](#net_event_end)

Added in: v0.1.90

Emitted when the other end of the socket sends a FIN packet, thus ending the readable side of the socket.

By default (`allowHalfOpen` is `false`) the socket will send a FIN packet back and destroy its file descriptor once it has written out its pending write queue. However, if `allowHalfOpen` is set to `true`, the socket will not automatically [`end()`](#net_socket_end_data_encoding_callback) its writable side, allowing the user to write arbitrary amounts of data. The user must call [`end()`](#net_socket_end_data_encoding_callback) explicitly to close the connection (i.e. sending a FIN packet back).

### Event: `'error'`[#](#net_event_error_1)

Added in: v0.1.90

*   [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Emitted when an error occurs. The `'close'` event will be called directly following this event.

### Event: `'lookup'`[#](#net_event_lookup)

Emitted after resolving the host name but before connecting. Not applicable to Unix sockets.

*   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The error object. See [`dns.lookup()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/dns.html#dns_dns_lookup_hostname_options_callback).
*   `address` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The IP address.
*   `family` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) The address type. See [`dns.lookup()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/dns.html#dns_dns_lookup_hostname_options_callback).
*   `host` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The host name.

### Event: `'ready'`[#](#net_event_ready)

Added in: v9.11.0

Emitted when a socket is ready to be used.

Triggered immediately after `'connect'`.

### Event: `'timeout'`[#](#net_event_timeout)

Added in: v0.1.90

Emitted if the socket times out from inactivity. This is only to notify that the socket has been idle. The user must manually close the connection.

See also: [`socket.setTimeout()`](#net_socket_settimeout_timeout_callback).

### `socket.address()`[#](#net_socket_address)

Added in: v0.1.90

*   Returns: [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns the bound `address`, the address `family` name and `port` of the socket as reported by the operating system: `{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`

### `socket.bufferSize`[#](#net_socket_buffersize)

Added in: v0.3.8Deprecated since: v14.6.0

*   [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

This property shows the number of characters buffered for writing. The buffer may contain strings whose length after encoding is not yet known. So this number is only an approximation of the number of bytes in the buffer.

`net.Socket` has the property that `socket.write()` always works. This is to help users get up and running quickly. The computer cannot always keep up with the amount of data that is written to a socket. The network connection simply might be too slow. Node.js will internally queue up the data written to a socket and send it out over the wire when it is possible.

The consequence of this internal buffering is that memory may grow. Users who experience large or growing `bufferSize` should attempt to "throttle" the data flows in their program with [`socket.pause()`](#net_socket_pause) and [`socket.resume()`](#net_socket_resume).

### `socket.bytesRead`[#](#net_socket_bytesread)

Added in: v0.5.3

*   [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The amount of received bytes.

### `socket.bytesWritten`[#](#net_socket_byteswritten)

Added in: v0.5.3

*   [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The amount of bytes sent.

### `socket.connect()`[#](#net_socket_connect)

Initiate a connection on a given socket.

Possible signatures:

*   [`socket.connect(options[, connectListener])`](#net_socket_connect_options_connectlistener)
*   [`socket.connect(path[, connectListener])`](#net_socket_connect_path_connectlistener) for [IPC](#net_ipc_support) connections.
*   [`socket.connect(port[, host][, connectListener])`](#net_socket_connect_port_host_connectlistener) for TCP connections.
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

This function is asynchronous. When the connection is established, the [`'connect'`](#net_event_connect) event will be emitted. If there is a problem connecting, instead of a [`'connect'`](#net_event_connect) event, an [`'error'`](#net_event_error_1) event will be emitted with the error passed to the [`'error'`](#net_event_error_1) listener. The last parameter `connectListener`, if supplied, will be added as a listener for the [`'connect'`](#net_event_connect) event **once**.

This function should only be used for reconnecting a socket after `'close'` has been emitted or otherwise it may lead to undefined behavior.

#### `socket.connect(options[, connectListener])`[#](#net_socket_connect_options_connectlistener)

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Common parameter of [`socket.connect()`](#net_socket_connect) methods. Will be added as a listener for the [`'connect'`](#net_event_connect) event once.
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Initiate a connection on a given socket. Normally this method is not needed, the socket should be created and opened with [`net.createConnection()`](#net_net_createconnection). Use this only when implementing a custom Socket.

For TCP connections, available `options` are:

*   `port` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Required. Port the socket should connect to.
*   `host` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host the socket should connect to. **Default:** `'localhost'`.
*   `localAddress` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Local address the socket should connect from.
*   `localPort` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Local port the socket should connect from.
*   `family` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type): Version of IP stack. Must be `4`, `6`, or `0`. The value `0` indicates that both IPv4 and IPv6 addresses are allowed. **Default:** `0`.
*   `hints` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Optional [`dns.lookup()` hints](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/dns.html#dns_supported_getaddrinfo_flags).
*   `lookup` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Custom lookup function. **Default:** [`dns.lookup()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/dns.html#dns_dns_lookup_hostname_options_callback).

For [IPC](#net_ipc_support) connections, available `options` are:

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Required. Path the client should connect to. See [Identifying paths for IPC connections](#net_identifying_paths_for_ipc_connections). If provided, the TCP-specific options above are ignored.

For both types, available `options` include:

*   `onread` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) If specified, incoming data is stored in a single `buffer` and passed to the supplied `callback` when data arrives on the socket. This will cause the streaming functionality to not provide any data. The socket will emit events like `'error'`, `'end'`, and `'close'` as usual. Methods like `pause()` and `resume()` will also behave as expected.
    *   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<Uint8Array>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Either a reusable chunk of memory to use for storing incoming data or a function that returns such.
    *   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) This function is called for every chunk of incoming data. Two arguments are passed to it: the number of bytes written to `buffer` and a reference to `buffer`. Return `false` from this function to implicitly `pause()` the socket. This function will be executed in the global context.

Following is an example of a client using the `onread` option:

    const net = require('net');
    net.connect({
      port: 80,
      onread: {
        
        buffer: Buffer.alloc(4 * 1024),
        callback: function(nread, buf) {
          
          console.log(buf.toString('utf8', 0, nread));
        }
      }
    });

#### `socket.connect(path[, connectListener])`[#](#net_socket_connect_path_connectlistener)

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Path the client should connect to. See [Identifying paths for IPC connections](#net_identifying_paths_for_ipc_connections).
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Common parameter of [`socket.connect()`](#net_socket_connect) methods. Will be added as a listener for the [`'connect'`](#net_event_connect) event once.
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Initiate an [IPC](#net_ipc_support) connection on the given socket.

Alias to [`socket.connect(options[, connectListener])`](#net_socket_connect_options_connectlistener) called with `{ path: path }` as `options`.

#### `socket.connect(port[, host][, connectListener])`[#](#net_socket_connect_port_host_connectlistener)

Added in: v0.1.90

*   `port` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Port the client should connect to.
*   `host` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host the client should connect to.
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Common parameter of [`socket.connect()`](#net_socket_connect) methods. Will be added as a listener for the [`'connect'`](#net_event_connect) event once.
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Initiate a TCP connection on the given socket.

Alias to [`socket.connect(options[, connectListener])`](#net_socket_connect_options_connectlistener) called with `{port: port, host: host}` as `options`.

### `socket.connecting`[#](#net_socket_connecting)

Added in: v6.1.0

*   [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

If `true`, [`socket.connect(options[, connectListener])`](#net_socket_connect_options_connectlistener) was called and has not yet finished. It will stay `true` until the socket becomes connected, then it is set to `false` and the `'connect'` event is emitted. Note that the [`socket.connect(options[, connectListener])`](#net_socket_connect_options_connectlistener) callback is a listener for the `'connect'` event.

### `socket.destroy([error])`[#](#net_socket_destroy_error)

Added in: v0.1.90

*   `error` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket)

Ensures that no more I/O activity happens on this socket. Destroys the stream and closes the connection.

See [`writable.destroy()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_writable_destroy_error) for further details.

### `socket.destroyed`[#](#net_socket_destroyed)

*   [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates if the connection is destroyed or not. Once a connection is destroyed no further data can be transferred using it.

See [`writable.destroyed`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_writable_destroyed) for further details.

### `socket.end([data[, encoding]][, callback])`[#](#net_socket_end_data_encoding_callback)

Added in: v0.1.90

*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<Uint8Array>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
*   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Only used when data is `string`. **Default:** `'utf8'`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Optional callback for when the socket is finished.
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Half-closes the socket. i.e., it sends a FIN packet. It is possible the server will still send some data.

See [`writable.end()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_writable_end_chunk_encoding_callback) for further details.

### `socket.localAddress`[#](#net_socket_localaddress)

Added in: v0.9.6

*   [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The string representation of the local IP address the remote client is connecting on. For example, in a server listening on `'0.0.0.0'`, if a client connects on `'192.168.1.1'`, the value of `socket.localAddress` would be `'192.168.1.1'`.

### `socket.localPort`[#](#net_socket_localport)

Added in: v0.9.6

*   [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The numeric representation of the local port. For example, `80` or `21`.

### `socket.pause()`[#](#net_socket_pause)

*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Pauses the reading of data. That is, [`'data'`](#net_event_data) events will not be emitted. Useful to throttle back an upload.

### `socket.pending`[#](#net_socket_pending)

Added in: v11.2.0, v10.16.0

*   [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

This is `true` if the socket is not connected yet, either because `.connect()` has not yet been called or because it is still in the process of connecting (see [`socket.connecting`](#net_socket_connecting)).

### `socket.ref()`[#](#net_socket_ref)

Added in: v0.9.1

*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Opposite of `unref()`, calling `ref()` on a previously `unref`ed socket will _not_ let the program exit if it's the only socket left (the default behavior). If the socket is `ref`ed calling `ref` again will have no effect.

### `socket.remoteAddress`[#](#net_socket_remoteaddress)

Added in: v0.5.10

*   [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The string representation of the remote IP address. For example, `'74.125.127.100'` or `'2001:4860:a005::68'`. Value may be `undefined` if the socket is destroyed (for example, if the client disconnected).

### `socket.remoteFamily`[#](#net_socket_remotefamily)

Added in: v0.11.14

*   [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The string representation of the remote IP family. `'IPv4'` or `'IPv6'`.

### `socket.remotePort`[#](#net_socket_remoteport)

Added in: v0.5.10

*   [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The numeric representation of the remote port. For example, `80` or `21`.

### `socket.resume()`[#](#net_socket_resume)

*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Resumes reading after a call to [`socket.pause()`](#net_socket_pause).

### `socket.setEncoding([encoding])`[#](#net_socket_setencoding_encoding)

Added in: v0.1.90

*   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Set the encoding for the socket as a [Readable Stream](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_class_stream_readable). See [`readable.setEncoding()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_readable_setencoding_encoding) for more information.

### `socket.setKeepAlive([enable][, initialDelay])`[#](#net_socket_setkeepalive_enable_initialdelay)

Added in: v0.1.92

*   `enable` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
*   `initialDelay` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Enable/disable keep-alive functionality, and optionally set the initial delay before the first keepalive probe is sent on an idle socket.

Set `initialDelay` (in milliseconds) to set the delay between the last data packet received and the first keepalive probe. Setting `0` for `initialDelay` will leave the value unchanged from the default (or previous) setting.

### `socket.setNoDelay([noDelay])`[#](#net_socket_setnodelay_nodelay)

Added in: v0.1.90

*   `noDelay` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Enable/disable the use of Nagle's algorithm.

When a TCP connection is created, it will have Nagle's algorithm enabled.

Nagle's algorithm delays data before it is sent via the network. It attempts to optimize throughput at the expense of latency.

Passing `true` for `noDelay` or not passing an argument will disable Nagle's algorithm for the socket. Passing `false` for `noDelay` will enable Nagle's algorithm.

### `socket.setTimeout(timeout[, callback])`[#](#net_socket_settimeout_timeout_callback)

Added in: v0.1.90

*   `timeout` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Sets the socket to timeout after `timeout` milliseconds of inactivity on the socket. By default `net.Socket` do not have a timeout.

When an idle timeout is triggered the socket will receive a [`'timeout'`](#net_event_timeout) event but the connection will not be severed. The user must manually call [`socket.end()`](#net_socket_end_data_encoding_callback) or [`socket.destroy()`](#net_socket_destroy_error) to end the connection.

    socket.setTimeout(3000);
    socket.on('timeout', () => {
      console.log('socket timeout');
      socket.end();
    });

If `timeout` is 0, then the existing idle timeout is disabled.

The optional `callback` parameter will be added as a one-time listener for the [`'timeout'`](#net_event_timeout) event.

### `socket.unref()`[#](#net_socket_unref)

Added in: v0.9.1

*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The socket itself.

Calling `unref()` on a socket will allow the program to exit if this is the only active socket in the event system. If the socket is already `unref`ed calling `unref()` again will have no effect.

### `socket.write(data[, encoding][, callback])`[#](#net_socket_write_data_encoding_callback)

Added in: v0.1.90

*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<Uint8Array>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
*   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Only used when data is `string`. **Default:** `utf8`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Sends data on the socket. The second parameter specifies the encoding in the case of a string. It defaults to UTF8 encoding.

Returns `true` if the entire data was flushed successfully to the kernel buffer. Returns `false` if all or part of the data was queued in user memory. [`'drain'`](#net_event_drain) will be emitted when the buffer is again free.

The optional `callback` parameter will be executed when the data is finally written out, which may not be immediately.

See `Writable` stream [`write()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_writable_write_chunk_encoding_callback) method for more information.

### `socket.readyState`[#](#net_socket_readystate)

Added in: v0.5.0

*   [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

This property represents the state of the connection as a string.

*   If the stream is connecting `socket.readyState` is `opening`.
*   If the stream is readable and writable, it is `open`.
*   If the stream is readable and not writable, it is `readOnly`.
*   If the stream is not readable and writable, it is `writeOnly`.

`net.connect()`[#](#net_net_connect)
------------------------------------

Aliases to [`net.createConnection()`](#net_net_createconnection).

Possible signatures:

*   [`net.connect(options[, connectListener])`](#net_net_connect_options_connectlistener)
*   [`net.connect(path[, connectListener])`](#net_net_connect_path_connectlistener) for [IPC](#net_ipc_support) connections.
*   [`net.connect(port[, host][, connectListener])`](#net_net_connect_port_host_connectlistener) for TCP connections.

### `net.connect(options[, connectListener])`[#](#net_net_connect_options_connectlistener)

Added in: v0.7.0

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket)

Alias to [`net.createConnection(options[, connectListener])`](#net_net_createconnection_options_connectlistener).

### `net.connect(path[, connectListener])`[#](#net_net_connect_path_connectlistener)

Added in: v0.1.90

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket)

Alias to [`net.createConnection(path[, connectListener])`](#net_net_createconnection_path_connectlistener).

### `net.connect(port[, host][, connectListener])`[#](#net_net_connect_port_host_connectlistener)

Added in: v0.1.90

*   `port` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `host` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket)

Alias to [`net.createConnection(port[, host][, connectListener])`](#net_net_createconnection_port_host_connectlistener).

`net.createConnection()`[#](#net_net_createconnection)
------------------------------------------------------

A factory function, which creates a new [`net.Socket`](#net_class_net_socket), immediately initiates connection with [`socket.connect()`](#net_socket_connect), then returns the `net.Socket` that starts the connection.

When the connection is established, a [`'connect'`](#net_event_connect) event will be emitted on the returned socket. The last parameter `connectListener`, if supplied, will be added as a listener for the [`'connect'`](#net_event_connect) event **once**.

Possible signatures:

*   [`net.createConnection(options[, connectListener])`](#net_net_createconnection_options_connectlistener)
*   [`net.createConnection(path[, connectListener])`](#net_net_createconnection_path_connectlistener) for [IPC](#net_ipc_support) connections.
*   [`net.createConnection(port[, host][, connectListener])`](#net_net_createconnection_port_host_connectlistener) for TCP connections.

The [`net.connect()`](#net_net_connect) function is an alias to this function.

### `net.createConnection(options[, connectListener])`[#](#net_net_createconnection_options_connectlistener)

Added in: v0.1.90

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) Required. Will be passed to both the [`new net.Socket([options])`](#net_new_net_socket_options) call and the [`socket.connect(options[, connectListener])`](#net_socket_connect_options_connectlistener) method.
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Common parameter of the [`net.createConnection()`](#net_net_createconnection) functions. If supplied, will be added as a listener for the [`'connect'`](#net_event_connect) event on the returned socket once.
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The newly created socket used to start the connection.

For available options, see [`new net.Socket([options])`](#net_new_net_socket_options) and [`socket.connect(options[, connectListener])`](#net_socket_connect_options_connectlistener).

Additional options:

*   `timeout` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If set, will be used to call [`socket.setTimeout(timeout)`](#net_socket_settimeout_timeout_callback) after the socket is created, but before it starts the connection.

Following is an example of a client of the echo server described in the [`net.createServer()`](#net_net_createserver_options_connectionlistener) section:

    const net = require('net');
    const client = net.createConnection({ port: 8124 }, () => {
      
      console.log('connected to server!');
      client.write('world!\r\n');
    });
    client.on('data', (data) => {
      console.log(data.toString());
      client.end();
    });
    client.on('end', () => {
      console.log('disconnected from server');
    });

To connect on the socket `/tmp/echo.sock`:

    const client = net.createConnection({ path: '/tmp/echo.sock' });

### `net.createConnection(path[, connectListener])`[#](#net_net_createconnection_path_connectlistener)

Added in: v0.1.90

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Path the socket should connect to. Will be passed to [`socket.connect(path[, connectListener])`](#net_socket_connect_path_connectlistener). See [Identifying paths for IPC connections](#net_identifying_paths_for_ipc_connections).
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Common parameter of the [`net.createConnection()`](#net_net_createconnection) functions, an "once" listener for the `'connect'` event on the initiating socket. Will be passed to [`socket.connect(path[, connectListener])`](#net_socket_connect_path_connectlistener).
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The newly created socket used to start the connection.

Initiates an [IPC](#net_ipc_support) connection.

This function creates a new [`net.Socket`](#net_class_net_socket) with all options set to default, immediately initiates connection with [`socket.connect(path[, connectListener])`](#net_socket_connect_path_connectlistener), then returns the `net.Socket` that starts the connection.

### `net.createConnection(port[, host][, connectListener])`[#](#net_net_createconnection_port_host_connectlistener)

Added in: v0.1.90

*   `port` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Port the socket should connect to. Will be passed to [`socket.connect(port[, host][, connectListener])`](#net_socket_connect_port_host_connectlistener).
*   `host` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Host the socket should connect to. Will be passed to [`socket.connect(port[, host][, connectListener])`](#net_socket_connect_port_host_connectlistener). **Default:** `'localhost'`.
*   `connectListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Common parameter of the [`net.createConnection()`](#net_net_createconnection) functions, an "once" listener for the `'connect'` event on the initiating socket. Will be passed to [`socket.connect(port[, host][, connectListener])`](#net_socket_connect_port_host_connectlistener).
*   Returns: [<net.Socket>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket) The newly created socket used to start the connection.

Initiates a TCP connection.

This function creates a new [`net.Socket`](#net_class_net_socket) with all options set to default, immediately initiates connection with [`socket.connect(port[, host][, connectListener])`](#net_socket_connect_port_host_connectlistener), then returns the `net.Socket` that starts the connection.

`net.createQuicSocket([options])`[#](#net_net_createquicsocket_options)
-----------------------------------------------------------------------

Added in: v15.0.0

Creates and returns a new `QuicSocket`. Please refer to the [QUIC documentation](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/quic.html) for details.

`net.createServer([options][, connectionListener])`[#](#net_net_createserver_options_connectionlistener)
--------------------------------------------------------------------------------------------------------

Added in: v0.5.0

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `allowHalfOpen` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether half-opened TCP connections are allowed. **Default:** `false`.
    *   `pauseOnConnect` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether the socket should be paused on incoming connections. **Default:** `false`.
*   `connectionListener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Automatically set as a listener for the [`'connection'`](#net_event_connection) event.
*   Returns: [<net.Server>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_server)

Creates a new TCP or [IPC](#net_ipc_support) server.

If `allowHalfOpen` is set to `true`, when the other end of the socket sends a FIN packet, the server will only send a FIN packet back when [`socket.end()`](#net_socket_end_data_encoding_callback) is explicitly called, until then the connection is half-closed (non-readable but still writable). See [`'end'`](#net_event_end) event and [RFC 1122](https://tools.ietf.org/html/rfc1122) (section 4.2.2.13) for more information.

If `pauseOnConnect` is set to `true`, then the socket associated with each incoming connection will be paused, and no data will be read from its handle. This allows connections to be passed between processes without any data being read by the original process. To begin reading data from a paused socket, call [`socket.resume()`](#net_socket_resume).

The server can be a TCP server or an [IPC](#net_ipc_support) server, depending on what it [`listen()`](#net_server_listen) to.

Here is an example of an TCP echo server which listens for connections on port 8124:

    const net = require('net');
    const server = net.createServer((c) => {
      
      console.log('client connected');
      c.on('end', () => {
        console.log('client disconnected');
      });
      c.write('hello\r\n');
      c.pipe(c);
    });
    server.on('error', (err) => {
      throw err;
    });
    server.listen(8124, () => {
      console.log('server bound');
    });

Test this by using `telnet`:

    $ telnet localhost 8124

To listen on the socket `/tmp/echo.sock`:

    server.listen('/tmp/echo.sock', () => {
      console.log('server bound');
    });

Use `nc` to connect to a Unix domain socket server:

    $ nc -U /tmp/echo.sock

`net.isIP(input)`[#](#net_net_isip_input)
-----------------------------------------

Added in: v0.3.0

*   `input` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   Returns: [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Tests if input is an IP address. Returns `0` for invalid strings, returns `4` for IP version 4 addresses, and returns `6` for IP version 6 addresses.

`net.isIPv4(input)`[#](#net_net_isipv4_input)
---------------------------------------------

Added in: v0.3.0

*   `input` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if input is a version 4 IP address, otherwise returns `false`.

`net.isIPv6(input)`[#](#net_net_isipv6_input)
---------------------------------------------

Added in: v0.3.0

*   `input` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if input is a version 6 IP address, otherwise returns `false`.


[Source](https://nodejs.org/api/net.html)