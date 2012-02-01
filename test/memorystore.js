var should = require('chai').should()
  , hakaru = require('..');

describe('MemoryStore', function () {
  var stats = hakaru({
    store: new hakaru.MemoryStore()
  });

  beforeEach(function () {
    stats.store.flush();
  });

  it('should allow for marks in a collection', function () {
    stats.mark('hello universe');
    stats.store._store['hello universe'].should.be.ok;
  });

  it('should allow for diffs', function () {
    var end = stats.start('hello universe');
    end();
    stats.store._store['hello universe'].should.be.ok;
  });

  it('should provide the total number of marks', function () {
    stats.mark('hello world');
    stats.mark('hello universe');
    stats.store.markTotal('hello world').should.equal(1);
    stats.store.markTotal('hello universe').should.equal(1);
  });

  it('should provide the total number of diffs', function () {
    stats.start('hello world')();
    stats.start('hello universe')(); //end it
    stats.store.diffTotal('hello world').should.equal(1);
    stats.store.diffTotal('hello universe').should.equal(1);
  });

  it('should provide the average marks per second', function () {
    stats.mark('hello universe');
    stats.store.markAvg('hello universe').should.equal(1);
  });

  it('should provide the average diffs', function (done) {
    var end = stats.start('hello universe');
    setTimeout(function () {
      end();
      stats.store.diffAvg('hello universe').should.be.above(9);
      done();
    }, 10);
  });
});
