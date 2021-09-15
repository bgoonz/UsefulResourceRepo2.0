var http = require('http'),
  app = require('./app');

http.createServer(app).listen(process.env.PORT || 80);