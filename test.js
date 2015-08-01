'use strict';

/* deps: mocha */
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

    it('should return a data object.', function() {
      var o = parser.parseSync({content: '---\ntitle: abc\n---\n\n\n\n\nfoo'});
      assert.deepEqual(o.data, {title: 'abc'});
    });

    it('should strip newlines following front matter, before content.', function() {
      var o = parser.parseSync({content: '---\ntitle: abc\n---\n\n\n\n\nfoo'});
      assert.equal(o.content, 'foo');
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
