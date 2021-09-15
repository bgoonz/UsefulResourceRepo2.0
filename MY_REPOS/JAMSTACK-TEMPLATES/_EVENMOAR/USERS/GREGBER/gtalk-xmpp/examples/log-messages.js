var xmpp = require('node-xmpp');
var config = require('../config.json');

var client = new xmpp.Client(config);

client.on('online', function () {
  console.log('online');
  var stanza = new xmpp.Element('presence', { })
    .c('show').t('chat').up()
    .c('status').t('Happily echoing your <message/> stanzas');
  client.send(stanza);
});

client.on('stanza', function (stanza) {
  if (stanza.name === 'message') console.log(stanza.children);
});

client.on('error', function (err) {
  console.error(err);
});