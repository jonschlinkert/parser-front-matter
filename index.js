'use strict';

var utils = require('./utils');

/**
 * Front matter parser
 */

var parser = module.exports;

/**
 * Parse front matter from the given string or the `contents` in the
 * given `file` and callback `next(err, file)`.
 *
 * If an object is passed, either `file.contents` or `file.content`
 * may be used (for gulp and assemble compatibility).
 *
 * ```js
 * // pass a string
 * parser.parse('---\ntitle: foo\n---\nbar', function (err, file) {
 *   //=> {content: 'bar', data: {title: 'foo'}}
 * });
 *
 * // or an object
 * var file = {contents: new Buffer('---\ntitle: foo\nbar')};
 * parser.parse(file, function(err, res) {
 *   //=> {content: 'bar', data: {title: 'foo'}}
 * });
 * ```
 * @param {String|Object} `file` The object or string to parse.
 * @param {Object|Function} `options` or `next` callback function. Options are passed to [gray-matter][].
 * @param {Function} `next` callback function.
 * @api public
 */

parser.parse = function matterParse(file, options, next) {
  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  if (typeof next !== 'function') {
    throw new TypeError('expected a callback function');
  }

  try {
    next(null, parser.parseSync(file, options));
  } catch (err) {
    next(err);
  }
};

/**
 * Parse front matter from the given string or the `contents` in the
 * given `file`. If an object is passed, either `file.contents` or
 * `file.content` may be used (for gulp and assemble compatibility).
 *
 * ```js
 * // pass a string
 * var res = parser.parseSync('---\ntitle: foo\n---\nbar');
 *
 * // or an object
 * var file = {contents: new Buffer('---\ntitle: foo\nbar')};
 * var res = parser.parseSync(file);
 * //=> {content: 'bar', data: {title: 'foo'}}
 * ```
 * @param {String|Object} `file` The object or string to parse.
 * @param {Object} `options` passed to [gray-matter][].
 * @api public
 */

parser.parseSync = function matterParseSync(file, options) {
  options = options || {};
  var str = '';

  if (typeof file === 'string') {
    str = file;
    file = { content: str };

  } else if (utils.isObject(file)) {
    str = file.content || (file.contents ? file.contents.toString() : '');

  } else {
    throw new TypeError('expected file to be a string or object');
  }

  file.options = file.options || {};
  var opts = utils.extend({}, options, file.options);

  try {
    var parsed = utils.matter(str, opts);
    file.orig = parsed.orig;
    file.data = utils.extend({}, file.data, parsed.data);
    file.content = utils.trim(parsed.content);
    return file;
  } catch (err) {
    throw err;
  }
};

parser.stringify = function stringify(file, options, next) {
  if (typeof options === 'function') {
    next = options;
    options = {};
  }

  if (typeof next !== 'function') {
    throw new TypeError('expected a callback function');
  }

  if (!file.data.hasOwnProperty('yfm')) {
    next(null, file);
    return;
  }

  try {
    next(null, parser.stringifySync(file, options));
  } catch (err) {
    next(err);
  }
};

parser.stringifySync = function stringifySync(file, options) {
  if (!file.data.hasOwnProperty('yfm')) {
    return file;
  }

  try {
    file.content = utils.matter.stringify(file.content, file.data.yfm);
    delete file.data.yfm;
    return file;
  } catch (err) {
    throw err;
  }
};
