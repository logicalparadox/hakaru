/*!
 * Hakaru - MemoryStore
 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies.
 */

var Store = require('../store')
  , calc = require('../calc')
  , util = require('util');

/*!
 * Main export/
 */

module.exports = MemoryStore;

/**
 * # MemoryStore (constructor)
 *
 * Used as default storage option. Currently, it
 * does not save individual events but attempts
 * to best aggregate each type.
 */

function MemoryStore () {
  Store.call(this);
  this.flush();
}

/*!
 * Inherits from Store (event emitter)
 */

util.inherits(MemoryStore, Store);

/**
 * #
 *
 * Prepares all storage objects onto prototype. Can
 * also be used to setup the initial stat.
 */

MemoryStore.prototype.flush = function () {
  this.startTime = new Date;
  this._store = {}
  this._template = {
      marks: {}
    , diffs: {}
  };
};

/**
 * # mark(event, object)
 *
 * Stores a mark for a given time signature. Currently,
 * Marks are aggregated by the number of seconds since
 * the MemoryStore was constructed.
 *
 * Object must have `data` property defined
 *
 * @param {String} event name
 * @param {Object} input object
 */

MemoryStore.prototype.mark = function (event, obj) {
  var store = this._store[event] || (this._store[event] = this._template)
    , el = Math.round((new Date - this.startTime) / 1000)
    , val = store.marks[el] || 0;
  store.marks[el] = val + 1;
};

/**
 * # diff(event, object)
 *
 * Stores a diff for a given set of time signatures. Currently,
 * diffs are calculated and stored based on the value.
 *
 * Object must have `start` and `finish` properties defined.
 *
 * @param {String} event name
 * @param {Object} input object
 */

MemoryStore.prototype.diff = function (event, obj) {
  var store = this._store[event] || (this._store[event] = this._template)
    , el = obj.finish - obj.start
    , val = store.diffs[el] || 0;
  store.diffs[el] = val + 1;
};

/**
 * # totalMarks(event)
 *
 * Returns the total number of marks for a given event.
 *
 */

MemoryStore.prototype.totalMarks = function (event) {
  var store = this._store[event]
    , nums = [];
  if (!store) return undefined;
  for (var t in store.marks) {
    nums.push(store.marks[t]);
  }
  return calc.sum(nums);
};

/**
 * # totalDiffs(event)
 *
 * Returns the toal number of diffs for a givent event
 *
 */

MemoryStore.prototype.totalDiffs = function (event) {
  var store = this._store[event]
    , nums = [];
  if (!store) return undefined;
  for (var t in store.diffs) {
    nums.push(store.diffs[t]);
  }
  return calc.sum(nums);
};

/**
 * # markAvg
 *
 * Returns the average number of marks per second
 *
 */

MemoryStore.prototype.markAvg = function (event) {
  var store = this._store[event]
    , times = []
    , nums = []
    , num;

  // no event - skip it!
  if (!store) return undefined;

  // get all times
  for (var t in store.marks)
    times.push(parseFloat(t));

  // sort to get min and max
  times.sort(function (a,b) { return a - b; });

  // insert number of time or aero
  for (var i = 0; i < times[times.length - 1]; i++) {
    num = times[i] || 0;
    nums.push(num);
  }

  // finally get the average
  return calc.mean(nums);
};

/**
 * # diffAvg
 *
 * Returns the average time difference for diffs in ms.
 *
 */

MemoryStore.prototype.diffAvg = function (event) {
  var store = this._store[event]
    , nums = [];
  if (!store) return undefined;
  for (var t in store.diffs) {
    nums.push(parseFloat(t));
  }
  return calc.mean(nums);
};
