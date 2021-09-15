var five = require('johnny-five');
var express = require('express');
var http = require('http');
var Primus = require('primus');

// Create application.
var app = express();

// Create server using application.
var server = http.createServer(app);

// Create a primus instance binded on HTTP server.
var primus = new Primus(server);

// Expose static stuff.
app.use(express.static('.'));

// Listen.
server.listen(process.env.PORT || 3000);

// Log when server is started.
server.on('listening', function () {
  console.log('Listening on port %d.', server.address().port);
  console.log('http://localhost:%d/', server.address().port);
});

// Create board.
var board = new five.Board();

// Wait for board to be ready.
board.on('ready', function() {
  // Create photoresistor.
  var photoresistor = new five.Sensor({
    pin: 'A0',
    freq: 50,
    range: [80, 900]
  });

  // Scale photoresistor on 0-100 and transmit data over primus.
  photoresistor.scale([0, 100]).on('data', function() {
    primus.write({value: this.value});
  });
});
