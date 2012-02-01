/*!
 * Hakaru - store
 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies.
 */

var EventEmitter = require('events').EventEmitter
  , util = require('util');

/*!
 * Main export.
 */

module.exports = Store;

/**
 * Store (constructor)
 *
 * Currently just a placeholder to turn
 * into an event emitter.
 */

function Store () {

}

/**
 * Inherits from EventEmitter
 */

util.inherits(Store, EventEmitter);
