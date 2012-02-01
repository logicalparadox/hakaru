var should = require('chai').should();

var hakaru = require('..');

describe('Hakaru', function () {

  it('should have a valid version', function () {
    hakaru.version.should.match(/^\d+\.\d+\.\d+$/);
  });

});
