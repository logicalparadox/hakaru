var hakaru = require('..')
  , stats = hakaru({ store: new hakaru.MemoryStore });

suite('MemoryStore', function () {

  bench('mark', function () {
    stats.mark();
  });

  bench('diff', function () {
    end = stats.start();
    end();
  });

  bench('totalMarks', function () {
    total = stats.store.totalMarks();
  });

  bench('totalDiffs', function () {
    total = stats.store.totalDiffs();
  });

  bench('markAvg', function () {
    avg = stats.store.markAvg();
  });

  bench('diffAvg', function () {
    avg = stats.store.diffAvg();
  });

});
