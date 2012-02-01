var hakaru = require('..')
  , stats = hakaru.count('response');

var http = require('http');

function iterate() {
  var end = stats.start();
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
  console.log('Avg Resp:  ', stats.avgdiff());
  console.log('Deviation: ', stats.diffdeviation());
  console.log();
}, 1000);
