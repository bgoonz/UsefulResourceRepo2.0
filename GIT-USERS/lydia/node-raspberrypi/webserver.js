const fs = require('fs');
const Gpio = require('onoff').Gpio;
const http = require('http').createServer(handler);
const io = require('socket.io')(http);
const LED = new Gpio(4, 'out');
const endBlink = require('./blink.js')

http.listen(8080); //listen to port 8080

function handler(req, res) {
  fs.readFile(__dirname + '/public/index.html', (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'})
      return res.end("404 Not Found")
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(data)
    return res.end()
  })
}


io.sockets.on('connection', socket => {
  let lightValue = 0;
  socket.on('light', data => {
    lightValue = data;
    if (lightValue) {
      setTimeout(() => endBlink(), 5000)
    }
  })
})