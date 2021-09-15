var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mandrill = require('mandrill-api');
var availabilities = require('./availabilities');

var stores = {
  R477: 'Aix-en-Provence',
  R470: 'Atlantis',
  R395: 'CAP 3000',
  R276: 'Carrousel du Louvre',
  R438: 'Carré Sénart',
  R469: 'Confluence',
  R522: 'La Toison d’Or',
  R178: 'Les Quatre Temps',
  R367: 'Odysseum',
  R277: 'Opéra',
  R374: 'Parly 2',
  R373: 'Part-Dieu',
  R536: 'Rosny 2',
  R424: 'Sainte-Catherine',
  R394: 'Strasbourg',
  R425: 'Val d’Europe',
  R315: 'Vélizy 2'
};

var mandrillClient = new mandrill.Mandrill(
  process.env.MANDRILL_APIKEY || 'NlqhxmUVpHFJcBZWAd9SuA'
);

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/test');

var User = mongoose.model('User', {
  email: String,
  model: String,
  store: String,
  available: Boolean
});

app.post('/api/register', function (req, res, next) {
  console.log(req.body);
  var user = new User(req.body);
  user.save(function (err) {
    if (err) return next(err);
    sendMessage({
      to: user.email,
      subject: 'Notification enregistrée',
      text: 'Vous serez notifié dès que l\'iPhone sera disponible dans le store ' + stores[user.store]
    });
    res.send({error: false});
  });
});


function checkAvailabilities() {
  availabilities.get(function (err, aval) {
    if (err) return console.error(err);
    User.find(function (err, users) {
      if (err) return console.error(err);
      users.forEach(function (user) {
        var available = !!(aval.body[user.store] && aval.body[user.store][user.model]);
        if (user.available === available) return ;

        if (available) {
          sendMessage({
            text: 'iPhone disponible dans le store ' + stores[user.store],
            subject: 'iPhone disponible (' + stores[user.store] + ')',
            to: user.email
          });
        } else {
          console.log('NO DISPO');
        }

        user.available = available;
        user.save();
      });
    });
  });
}

function sendMessage(options) {
  var message = {
    text: options.text,
    subject: options.subject,
    from_email: 'noreply@iphone-notifier.herokuapp.com',
    to: [
      {
        email: options.to
      }
    ]
  };

  mandrillClient.messages.send({
    message: message,
    async: true
  }, function () {
    console.log('Email sent');
  }, function (error) {
    console.error('Error mail', error);
  });
}

setInterval(checkAvailabilities, 60000);

app.listen(process.env.PORT || 8080);