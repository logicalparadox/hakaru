var should = require('chai').should();

var calc = require('../lib/hakaru/calc');

describe('calculations utility', function () {
  var nums = [ 1, 3, 5, 7, 9, ];

  it('should be able to sum', function () {
    var sum = calc.sum(nums);
    sum.should.equal(25);
  });

  it('should be able to get the mean of a set of numbers', function () {
    var mean = calc.mean(nums);
    mean.should.equal(5);
  });

  it('should be able to get the standard deviation', function () {
    var stdev = calc.sdeviation(nums);
    stdev.should.equal(3.1622776601683795);
  });
});
