var blackPearl = require('..');
var client = blackPearl.createClient();

setInterval(function () {
  client.push('connectedUsers', { count: Math.round(Math.random() * 20) });
}, 3000);