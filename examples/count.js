var hakaru = require('..')
  , stats = hakaru();

var http = require('http');

function iterate () {
  http.get({ port: 4126 }, function (res) {
    res.on('end', function () {
      setTimeout(iterate, 50);
    });
  });
}

http.createServer(function(req, res) {
  stats.mark('request');
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.write('Hello Universe');
  res.end();
}).listen(4126, iterate);

setInterval(function () {
  console.log('Total: ', stats.store.markTotal('request'));
  console.log('Reqs/s: ', stats.store.markAvg('request'));
  console.log();
}, 1000);
