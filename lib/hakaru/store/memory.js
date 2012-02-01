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
  this.start = new Date;
  this.store = {
      marks: {}
    , diffs: {}
  };
}

/*!
 * Inherits from Store (event emitter)
 */

util.inherits(MemoryStore, Store);

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
  if (obj.date) {
    var el = Math.round((new Date - this.start) / 1000)
      , val = this.store.marks[el] || 0;
    this.store.marks[el] = val + 1;
  }
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
  if (obj.start && obj.finish) {
    var el = obj.finish - obj.start
      , val = this.store.diffs[el] || 0;
    this.store.diffs[el] = val + 1;
  }
};

/**
 * # totalMarks(event)
 *
 * Returns the total number of marks for a given event.
 *
 */

MemoryStore.prototype.totalMarks = function (event) {
  var nums = [];
  for (var t in this.store.marks) {
    nums.push(this.store.marks[t]);
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
  var nums = [];
  for (var t in this.store.diffs) {
    nums.push(this.store.diffs[t]);
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
  var nums = [];
  for (var t in this.store.marks) {
    nums.push(this.store.marks[t]);
  }
  return calc.mean(nums);
};

/**
 * # diffAvg
 *
 * Returns the average time difference for diffs in ms.
 *
 */

MemoryStore.prototype.diffAvg = function (event) {
  var nums = [];
  for (var t in this.store.diffs) {
    nums.push(parseFloat(t));
  }
  return calc.mean(nums);
};
