'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var File = require('vinyl');
var assert = require('assert');
var parser = require('./');

describe('parsers', function() {
  describe('.parseSync()', function() {
    it('should support passing a string', function() {
      var file = parser.parseSync('abc');
      assert(file.data);
      assert.equal(file.content, 'abc');
    });

    it('should parse front matter from a string', function() {
      var file = parser.parseSync('---\ntitle: foo\n---\nbar');
      assert(file.data);
      assert(file.data.title);
      assert.equal(file.data.title, 'foo');
      assert.equal(file.content, 'bar');
    });

    it('should support parsing the content property on an object.', function() {
      var file = parser.parseSync({
        content: 'abc'
      });
      assert(file.data);
      assert.equal(file.content, 'abc');
    });

    it('should support the contents property on an object', function() {
      var file = parser.parseSync({
        contents: 'abc'
      });
      assert(file.data);
      assert.equal(file.content, 'abc');
    });

    it('should not choke on empty strings', function() {
      var file = parser.parseSync({
        contents: ''
      });
      assert(file.data);
      assert.equal(file.content, '');
    });

    it('should support contents as a buffer', function() {
      var file = parser.parseSync({
        contents: new Buffer('abc')
      });
      assert(file.data);
      assert(file.content);
      assert.equal(file.content, 'abc');
    });

    it('should add front matter data to a "data" object.', function() {
      var file = parser.parseSync({
        content: '---\ntitle: abc\n---\nfoo'
      });
      assert(file.data);
      assert(file.data.title);
      assert.equal(file.data.title, 'abc');
      assert.equal(file.content, 'foo');
    });

    it('should not choke on front-matter only', function() {
      var file = parser.parseSync({
        content: '---\ntitle: abc\n---'
      });
      assert(file.data);
      assert(file.data.title);
      assert.equal(file.data.title, 'abc');
      assert.equal(file.content, '');
    });

    it('should strip newlines after front matter before content', function() {
      var file = parser.parseSync({
        content: '---\ntitle: abc\n---\n\n\n\n\nfoo'
      });
      assert(file.data);
      assert(file.data.title);
      assert.equal(file.data.title, 'abc');
      assert.equal(file.content, 'foo');
    });

    it('should strip whitespace lines after front matter before content', function() {
      var file = parser.parseSync({
        content: '---\ntitle: abc\n---\n     \n\n   \n  \nfoo'
      });
      assert(file.data);
      assert(file.data.title);
      assert.equal(file.data.title, 'abc');
      assert.equal(file.content, 'foo');
    });
  });

  describe('.stringify()', function() {
    it('should throw when a callback is not passed', function(cb) {
      try {
        parser.stringify({});
        cb(new Error('expected an error'));
      } catch(err) {
        assert(err);
        assert(err.message);
        assert.equal(err.message, 'expected a callback function');
        cb();
      }
    });

    it('should stringify the yfm object', function() {
      var file = parser.parseSync({content: '---\nyfm:\n  title: abc\n---\nfoo'});
      assert.equal(file.content, 'foo');
      assert.deepEqual(file.data, {yfm: { title: 'abc' }});

      var file = parser.stringifySync(file);
      assert.equal(file.content, '---\ntitle: abc\n---\nfoo\n');
      assert.deepEqual(file.data, {});
    });
  });

  describe('.parse()', function() {
    it('should throw when a callback is not passed', function(cb) {
      try {
        parser.parse({});
        cb(new Error('expected an error'));
      } catch(err) {
        assert(err);
        assert(err.message);
        assert.equal(err.message, 'expected a callback function');
        cb();
      }
    });

    it('should support passing a string', function(cb) {
      parser.parse('---\ntitle: foo\n---\nbar', function(err, file) {
        if (err) return cb(err);

        assert(file.data);
        assert(file.data.title);
        assert.equal(file.data.title, 'foo');
        assert.equal(file.content, 'bar');
        cb();
      });
    });

    it('should use the content property on the given file', function(cb) {
      parser.parse({content: 'abc'}, function(err, file) {
        if (err) return cb(err);

        assert(file.data);

        assert.equal(file.content, 'abc');
        cb();
      });
    });

    it('should support the contents property', function(cb) {
      parser.parse({contents: new Buffer('abc')}, function(err, file) {
        if (err) return cb(err);

        assert(file.data);
        assert.equal(typeof file.content, 'string');
        assert.equal(file.content, 'abc');
        assert.equal(file.contents.toString(), 'abc');
        assert(Buffer.isBuffer(file.contents));;
        cb();
      });
    });
  });

  describe('.file', function() {
    it('should decorate a `.parse` function onto the file object', function() {
      var file = new File({path: 'abc', contents: new Buffer('foo')});
      parser.file(file);
      assert.equal(typeof file.parseMatter, 'function');
    });

    it('should parse front matter when `file.parse()` is called', function() {
      var file = new File({
        path: 'abc',
        contents: new Buffer('---\ntitle: foo\n---\nbar')
      });

      parser.file(file);
      assert(!file.data);

      file.parseMatter();
      assert.equal(file.data.title, 'foo');
      assert.equal(file.content, 'bar');
    });
  });
});
