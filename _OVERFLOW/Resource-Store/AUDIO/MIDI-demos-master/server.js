require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const htmling = require('htmling');
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: process.env.PUSHID,
  key: process.env.PUSHKEY,
  secret: process.env.PUSHSEC
});
pusher.port = 443;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', htmling.express(__dirname + '/views/', {watch:true}));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index');
});
// play midi
app.get('/piano', (req, res) => {
  res.render('piano');
});
app.get('/data', (req, res) => {
  res.render('data');
});
app.get('/emoji', (req, res) => {
  res.render('emoji');
});
// phone view seq
app.get('/minim', (req, res) => {
  var thisUrl = req.protocol + '://' + req.get('host');
  req.THIS_URL = thisUrl;
  req.PUSHKEY = process.env.PUSHKEY;
  res.render('minim', req);
});
// big screen seq
app.get('/stepseq', (req, res) => {
  // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var thisUrl = req.protocol + '://' + req.get('host');
  req.THIS_URL = thisUrl;
  req.JOIN_URL = thisUrl+'/minim';
  req.PUSHKEY = process.env.PUSHKEY;
  res.render('stepseq', req);
});
// phone view vis
app.get('/vis', (req, res) => {
  var thisUrl = req.protocol + '://' + req.get('host');
  req.THIS_URL = thisUrl;
  req.PUSHKEY = process.env.PUSHKEY;
  res.render('visControl', req);
});
// big screen vis
app.get('/visual', (req, res) => {
  // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var thisUrl = req.protocol + '://' + req.get('host');
  req.THIS_URL = thisUrl;
  req.JOIN_URL = thisUrl+'/minim';
  req.PUSHKEY = process.env.PUSHKEY;
  res.render('visual', req);
});

var clientIndex = 0
app.post('/pusher/auth', function(req, res) {
  const socket_id = req.body.socket_id;
  const channel_name = req.body.channel_name;
  if(socket_id && channel_name) {
    const userID = socket_id.replace(/\./g, "")+Date.now();
    res.send(pusher.authenticate(
      socket_id,
      channel_name,
      {user_id: userID, user_info: { clientIndex: clientIndex++ }}
    ))
  } else {
    res.sendStatus(401)
  }
});

app.listen(process.env.PORT || 3001);


