'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var parser = require('./');

describe('parsers', function () {
  describe('.parseSync()', function () {
    it('should support passing a string', function () {
      var file = parser.parseSync('abc');
      assert(file.data);
      assert(file.content);
      assert.equal(file.content, 'abc');
    });

    it('should parse front matter from a string', function () {
      var file = parser.parseSync('---\ntitle: foo\n---\nbar');
      assert(file.data);
      assert(file.data.title);
      assert.equal(file.data.title, 'foo');
      assert.equal(file.content, 'bar');
    });

    it('should support parsing the content property on an object.', function () {
      var file = parser.parseSync({
        content: 'abc'
      });
      assert(file.data);
      assert(file.content);
      assert.equal(file.content, 'abc');
    });

    it('should support the contents property on an object', function () {
      var file = parser.parseSync({
        contents: 'abc'
      });
      assert(file.data);
      assert(file.content);
      assert.equal(file.content, 'abc');
    });

    it('should support contents as a buffer', function () {
      var file = parser.parseSync({
        contents: new Buffer('abc')
      });
      assert(file.data);
      assert(file.content);
      assert.equal(file.content, 'abc');
    });

    it('should add front matter data to a "data" object.', function () {
      var file = parser.parseSync({
        content: '---\ntitle: abc\n---\nfoo'
      });
      assert(file.data);
      assert(file.data.title);
      assert.equal(file.data.title, 'abc');
      assert(file.content);
      assert.equal(file.content, 'foo');
    });

    it('should strip newlines after front matter before content', function () {
      var file = parser.parseSync({
        content: '---\ntitle: abc\n---\n\n\n\n\nfoo'
      });
      assert(file.data);
      assert(file.data.title);
      assert.equal(file.data.title, 'abc');
      assert(file.content);
      assert.equal(file.content, 'foo');
    });
  });

  describe('.parse()', function () {
    it('should throw when a callback is not passed', function (done) {
      try {
        parser.parse({});
        done(new Error('expected an error'));
      } catch(err) {
        assert(err);
        assert(err.message);
        assert.equal(err.message, 'expected a callback function');
        done();
      }
    });

    it('should support passing a string', function (done) {
      parser.parse('---\ntitle: foo\n---\nbar', function (err, file) {
        if (err) return done(err);

        assert(file.data);
        assert(file.data.title);
        assert.equal(file.data.title, 'foo');
        assert.equal(file.content, 'bar');
        done();
      });
    });

    it('should use the content property on the given file', function (done) {
      parser.parse({content: 'abc'}, function (err, file) {
        if (err) return done(err);

        assert(file.data);
        assert(file.content);
        assert.equal(file.content, 'abc');
        done();
      });
    });

    it('should support the contents property', function (done) {
      parser.parse({contents: new Buffer('abc')}, function (err, file) {
        if (err) return done(err);

        assert(file.data);
        assert.equal(typeof file.content, 'string');
        assert.equal(file.content, 'abc');
        assert.equal(file.contents.toString(), 'abc');
        assert(Buffer.isBuffer(file.contents));;
        done();
      });
    });
  });
});
