var calc = require('./hakaru/calc');
var hakaru = module.exports = {};

hakaru.version = '0.0.2';

hakaru.count = function (name) {
  var self = this;
  this.store = {};
  this.diffs = {};
  this.start = new Date();
  return {
      mark: function () {
      var elapsed = Math.round((new Date() - self.start) / 1000)
        , value = self.store[elapsed] || 0
      self.store[elapsed] = value + 1;
    }
    , total: function () {
      var arr =[];
      for (var t in self.store) {
        arr.push(self.store[t]);
      }
      return calc.sum(arr)
    }
    , fequency: function () {
      var arr = []
      for (var t in self.store) {
        arr.push(self.store[t]);
      }
      return calc.mean(arr);
    }
    , deviation: function () {
      var arr = [];
      for (var t in self.store) {
        arr.push(self.store[t]);
      }
      return calc.sdeviation(arr);
    }
    , start: function () {
      var s = new Date();
      return function () {
        var e = new Date() - s
          , value = self.diffs[e] || 0;
        self.diffs[e] = value + 1;
      }
    }
    , avgdiff: function () {
      var arr = [];
      for (var t in self.diffs) {
        arr.push(parseFloat(t));
      }
      return calc.mean(arr);
    }
    , diffdeviation: function () {
      var arr = [];
      for (var t in self.diffs) {
        arr.push(parseFloat(t));
      }
      return calc.sdeviation(arr);
    }
  }
}

