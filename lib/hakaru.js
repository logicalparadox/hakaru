/*!
 * Hakaru
 * Copyright (c) 2012 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Main exports
 */

exports = module.exports = createRepository;

/*!
 * Exposing constructors
 */

exports.Repository = require('./hakaru/repository');
exports.MemoryStore = require('./hakaru/store/memory');

// for developers :)
exports.Store = require('./hakaru/store');

/*!
 * # createRepository
 *
 * simple hook to creating repository
 *
 * Options:
 *
 * * `store`: a constructored storage
 *
 * @param {Object} options
 * @returns new Repostitory
 */

function createRepository (options) {
  return new exports.Repository(options);
}
