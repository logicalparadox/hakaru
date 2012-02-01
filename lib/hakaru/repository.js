/*!
 * Hakaru - repository
 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var debug = require('debug')('hakaru:repo')
  , MemoryStore = require('./store/memory');

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
  debug('mark event', ev);
  var event = ev || 'mark';
  this.store.mark(event, { date: new Date });
};

/**
 * # deferMark
 *
 * Returns a function that will call `mark`
 *
 * ee.on('myevent', repo.deferMark('myevent'));
 *
 * @param {String} event name
 */

Repository.prototype.deferMark = function (ev) {
  var self = this;
  return function () {
    self.mark(ev);
  };
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
  debug('start event', ev);
  var self = this
    , event = ev || 'diff'
    , obj = { start: new Date };

  return function () {
    debug('end event', ev);
    obj.finish = new Date;
    self.store.diff(event, obj);
  }
};
