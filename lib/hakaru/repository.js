/*!
 * Hakaru - repository
 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var MemoryStore = require('./store/memory');

/*!
 * Main export.
 */

module.exports = Repository;

/**
 * # Repository (constructor)
 *
 * Constructs a repository object using
 * the given storage or default of MemoryStore
 *
 * Primary function of `Repository` is to standardize
 * the requests to storage engines
 *
 * @param {Object} options
 */

function Repository (options) {
  options = options || {};
  this.store = options.store || new MemoryStore;
}

/**
 * # mark(event)
 *
 * Signal a mark for a given event.
 *
 * @param {String} event
 */

Repository.prototype.mark = function (ev) {
  var event = ev || 'mark';
  this.store.mark(event, { date: new Date });
};

/**
 * # start(event)
 *
 * Signal the start of given event.
 *
 * @param {String} name
 * @returns function to end the event
 */

Repository.prototype.start = function (ev) {
  var self = this
    , event = ev || 'diff'
    , obj = { start: new Date };

  return function () {
    obj.finish = new Date;
    self.store.diff(event, obj);
  }
};
