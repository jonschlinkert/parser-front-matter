'use strict';

/**
 * Module dependencies.
 */

var fs = require('fs');
var _ = require('lodash');
var glob = require('globby');
var matter = require('gray-matter');
var utils = require('parser-utils');
var async = require('async');


function arrayify(val) {
  return Array.isArray(val) ? val : [val];
}


/**
 * Front matter parser
 */

var parser = module.exports;


/**
 * Parse the given `str` and return a `file` object.
 *
 * @param {String} `str` The string to parse.
 * @param {Object} `options` to pass to [gray-matter].
 * @api public
 */

parser.parseSync = function parseSync(str, options) {
  var opts = _.extend({}, options);

  try {
    var file = utils.extendFile(str, options);
    _.merge(file, matter(file.content, opts));

    return file;
  } catch (err) {
    return err;
  }
};


/**
 * Parse the given `str` callback `next(err, file)`.
 *
 * @param {String} `str` The string to parse.
 * @param {Object|Function} `options` or `next` callback function.
 * @param {Function} `next` callback function.
 * @api public
 */

parser.parse = function parse(str, options, next) {
  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  var opts = _.extend({}, options);

  try {
    var file = utils.extendFile(str, options);
    _.merge(file, matter(file.content, opts));

    next(null, file);
  } catch (err) {
    next(err);
    return;
  }
};


/**
 * Read a file at the given `filepath`, passing the resulting
 * string and `options` to the `.parse()` method.
 *
 * @param {String} `filepath`
 * @param {Object} `options` to pass to [gray-matter]
 * @return {Object} Parsed `file` object.
 * @api public
 */

parser.parseFileSync = function parseFileSync(filepath, options) {
  var str = fs.readFileSync(filepath, 'utf8');
  return parser.parseSync(str, options);
};


/**
 * Asynchronously read a file at the given `filepath` and
 * callback `next(err, str)`.
 *
 * @param {String} `path`
 * @param {Object|Function} `options` or next function.
 * @param {Function} `next`
 * @api public
 */

parser.parseFile = function parseFile(filepath, options, next) {
  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  var opts = _.extend({}, options);

  try {
    var str = fs.readFileSync(filepath, 'utf8');
    parser.parse(str, opts, next);
  } catch (err) {
    next(err);
    return;
  }
};


/**
 * Synchronously read and parse a glob of files from the given `patterns`,
 * passing any options to [globby] and `.parseSync()`.
 *
 * @param {String} `filepath`
 * @param {Object} `options` to pass to [gray-matter]
 * @return {Object} Parsed `file` object.
 * @api public
 */

parser.parseFilesSync = function parseFilesSync(patterns, options) {
  return glob.sync(patterns, options).map(function (filepath) {
    return parser.parseFileSync(filepath, options);
  });
};


/**
 * Synchronously read and parse a glob of files from the given `patterns`
 * and callback `next(err, str)`. Options are passed to [globby] and `.parseSync()`.
 *
 * @param {String} `path`
 * @param {Object|Function} `options` or next function.
 * @param {Function} `next`
 * @api public
 */

parser.parseFiles = function parseFiles(patterns, options, next) {
  if (!patterns.length) {
    next(null, []);
    return;
  }

  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  glob(arrayify(patterns), options, function (err, files) {
    if (err) {
      next(err);
      return;
    }

    async.parallel(files.map(function (file) {
      return function (cb) {
        parser.parseFile(file, cb);
      };
    }), next);
  });
};
