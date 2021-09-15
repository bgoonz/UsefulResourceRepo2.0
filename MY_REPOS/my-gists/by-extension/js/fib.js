var http = require('http')
var fork = require('child_process').fork;

function fib(n) {
  if (n < 2) {
    return 1;
  } else {
    return fib(n - 2) + fib(n - 1);
  }
}

if (process.argv[2] == 'fib') {
  var r = fib(40);
  process.send({ result: r });
  process.exit(0);
} else {
  var server = http.createServer(function(req, res) {
    var child = fork(__filename, [ 'fib' ]);
    child.on('message', function(m) {
      res.writeHead(200);
      res.end(m.result + "\n");
    });
  });
  server.listen(8000);
  console.log("server online at http://localhost:8000/")
}
