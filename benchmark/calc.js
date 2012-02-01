var calc = require('../lib/hakaru/calc.js');


suite('calculatons', function () {
  var nums = [1, 3, 5, 7, 9]
    , res;

  bench('sum', function () {
    res = calc.sum(nums);
  });

  bench('mean', function () {
    res = calc.mean(nums);
  });

  bench('standard deviation', function () {
    res = calc.sdeviation(nums);
  });

});
