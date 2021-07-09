var express = require('express');
var app = express();
var http = require('http').Server(app);
var Pusher = require('pusher');
var bodyParser = require('body-parser');
var HTMLing = require('htmling');


app.use("/public", express.static(__dirname + '/public'));
app.use("/reveal", express.static(__dirname + '/node_modules/reveal.js'));
app.use(bodyParser.urlencoded());

app.engine('html', HTMLing.express(__dirname + '/views/'));
app.set('view engine', 'html');

app.get('/', function(req, res){
//  res.sendFile(__dirname + '/public/talk.html');
    req.PUSH_KEY = process.env.PUSH_KEY;
    res.render('index', req);
});

app.get('/audience', function(req, res){
//  res.sendFile(__dirname + '/public/miniMidi.html');
    req.PUSH_KEY = process.env.PUSH_KEY;
    res.render('audience', req);
});

// Pusher ~~~~~~~~~~~~~~~~~~~~~~~~~~~
var pusher = new Pusher({
  appId: process.env.PUSH_APPID,
  key: process.env.PUSH_KEY,
  secret: process.env.PUSH_SECRET
});
pusher.port = 443;


app.post('/pusher/auth', function(req, res) {
  console.log('auth called', req.body);
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});


// listen on port 3000
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});