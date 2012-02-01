var hakaru = require('..')
  , stats = hakaru({ store: new hakaru.MemoryStore });

suite('MemoryStore', function () {

  bench('mark', function () {
    stats.mark('bench');
  });

  bench('diff', function () {
    end = stats.start('bench');
    end();
  });

  bench('totalMarks', function () {
    total = stats.store.markTotal('bench');
  });

  bench('totalDiffs', function () {
    total = stats.store.diffTotal('bench');
  });

  bench('markAvg', function () {
    avg = stats.store.markAvg('bench');
  });

  bench('diffAvg', function () {
    avg = stats.store.diffAvg('bench');
  });

});
