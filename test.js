/*!
 * parser-cache <https://github.com/jonschlinkert/parser-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var parser = require('./');

describe('parsers', function() {

  describe('.parseSync()', function() {
    it('should parse the content property on an object.', function() {
      var o = parser.parseSync({content: 'abc'});
      var keys = Object.keys(o);
      assert.equal(keys.indexOf('data') !== -1, true)
      assert.equal(keys.indexOf('content') !== -1, true)
      assert.equal(o.content, 'abc');
    });
  });

  describe('.parse()', function() {
    it('should parse the content property on an object.', function(done) {
      parser.parse({content: 'abc'}, function (err, file) {
        if (err) {
          done(err);
          return;
        }

        var keys = Object.keys(file);
        assert.equal(keys.indexOf('data') !== -1, true)
        assert.equal(keys.indexOf('content') !== -1, true)
        assert.equal(file.content, 'abc');
        done();
      });
    });
  });
});
