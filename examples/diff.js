var hakaru = require('..')
  , stats = hakaru();

var http = require('http');

function iterate() {
  var end = stats.start('response');
  http.get({ port: 4126 }, function (res) {
    res.on('end', function () {
      end();
      setTimeout(iterate, 25);
    });
  });
}

http.createServer(function(req, res) {
  var wait = Math.floor(Math.random() * 200);
  setTimeout(function () {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('Hello Universe');
    res.end();
  }, wait);
}).listen(4126, iterate);

setInterval(function () {
  console.log('Total: ', stats.store.totalDiffs('response'));
  console.log('Avg Resp:  ', stats.store.diffAvg('response'));
  console.log();
}, 1000);
