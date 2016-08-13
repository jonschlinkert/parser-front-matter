'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('extend-shallow', 'extend');
require('file-is-binary', 'isBinary');
require('gray-matter', 'matter');
require('mixin-deep', 'merge');
require('isobject', 'isObject');
require('trim-leading-lines', 'trim');
require = fn;

utils.isValidFile = function(file) {
  return file && !utils.isNull(file) && !utils.isBinary(file);
};

utils.hasYFM = function(file) {
  return file.data && file.data.hasOwnProperty('yfm');
};

utils.isNull = function isNull(file) {
  if (file && typeof file.isNull !== 'function') {
    file.isNull = function() {
      return file.contents === null;
    };
  }
  return file.isNull();
}

function isDirectory(file) {
  if (typeof file.stat === 'undefined') {
    stat.statSync(file);
  }
  file.isDirectory = function() {
    return file.stat && file.stat.isDirectory();
  }
  return file.isDirectory();
}

/**
 * Expose `utils` modules
 */

module.exports = utils;
