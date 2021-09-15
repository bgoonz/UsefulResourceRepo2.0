module.exports = require('./node_modules/socket.io/lib');

var express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('./')(server),
    port    = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening, Port: %d', port);
});

app.use(express.static(__dirname + '/public'));

var users = {};
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('add user', function (username) {
    socket.username = username;
    users[username] = username;
    ++numUsers;

    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  socket.on('disconnect', function () {
    if (addedUser) {
      delete users[socket.username];
      --numUsers;

      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
