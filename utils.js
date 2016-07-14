'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('extend-shallow', 'extend');
require('gray-matter', 'matter');
require('isobject', 'isObject');
require('trim-leading-lines', 'trim');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
