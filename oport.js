var http = require('http');

http.createServer(function (req, res) {
  res.write("http port");
  res.end();
}).listen(8080);
