/*!
 * parser-cache <https://github.com/jonschlinkert/parser-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var should = require('should');
var parser = require('..');

describe('parsers', function() {

  describe('.parseSync()', function() {
    it('should parse a string.', function() {
      var o = parser.parseSync('abc');
      o.should.have.property('data');
      o.should.have.property('content');
      o.content.should.equal('abc');
    });

    it('should parse the content property on an object.', function() {
      var o = parser.parseSync({content: 'abc'});
      o.should.have.property('data');
      o.should.have.property('content');
      o.content.should.equal('abc');
    });
  });

  describe('.parse()', function() {
    it('should parse a string.', function(done) {
      parser.parse('abc', function (err, file) {
        if (err) {
          done(err);
        }

        file.should.have.property('data');
        file.should.have.property('content');
        file.content.should.equal('abc');
        done();
      });
    });

    it('should parse the content property on an object.', function(done) {
      parser.parse({content: 'abc'}, function (err, file) {
        if (err) {
          done(err);
        }

        file.should.have.property('data');
        file.should.have.property('content');
        file.content.should.equal('abc');
        done();
      });
    });
  });

  describe('.parseFilesSync()', function() {
    it('should parse a glob of files synchronously.', function() {
      var files = parser.parseFilesSync('test/fixtures/*.md');

      files.length.should.equal(3);
      files[0].should.be.an.object;
      files[0].should.have.property('data');
      files[0].should.have.property('content');

      files[0].data.title.should.equal('Alpha');
      files[1].data.title.should.equal('Beta');
      files[2].data.title.should.equal('Gamma');
    });
  });

  describe('.parseFile()', function() {
    it('should parse a file.', function(done) {
      parser.parseFile('test/fixtures/a.md', function (err, file) {
        if (err) {
          done(err);
        }

        file.should.have.property('data');
        file.should.have.property('content');
        file.content.should.equal('\nThis is markdown file `a.md`.');
        file.data.should.eql({title: 'Alpha'});
        done();
      });
    });
  });

  describe('.parseFiles()', function() {
    it('should parse a glob of files.', function(done) {
      parser.parseFiles('test/fixtures/*.md', function (err, files) {
        if (err) {
          done(err);
        }
        files.length.should.equal(3);
        files[0].should.be.an.object;
        files[0].should.have.property('data');
        files[0].should.have.property('content');

        files[0].data.title.should.equal('Alpha');
        files[1].data.title.should.equal('Beta');
        files[2].data.title.should.equal('Gamma');
        done();
      });
    });
  });
});
