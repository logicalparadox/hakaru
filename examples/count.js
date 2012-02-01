var hakaru = require('..')
  , stats = hakaru.count('requests');

var http = require('http');

function iterate () {
  http.get({ port: 4126 }, function (res) {
    res.on('end', function () {
      setTimeout(iterate, 50);
    });
  });
}

http.createServer(function(req, res) {
  stats.mark();
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.write('Hello Universe');
  res.end();
}).listen(4126, iterate);

setInterval(function () {
  console.log('Total: ', stats.total());
  console.log('Reqs/s: ', stats.fequency());
  console.log('Deviation: ', stats.deviation());
  console.log();
}, 1000);
