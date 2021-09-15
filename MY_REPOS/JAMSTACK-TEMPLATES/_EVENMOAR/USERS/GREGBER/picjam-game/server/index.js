var httpServer = require('./http-server');
var io = require('./io');

// Enable io.
io.attach(httpServer);

// Listen.
httpServer.listen(process.env.PORT || 8080);
