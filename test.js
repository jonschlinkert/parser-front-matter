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
var parser = require('./');

describe('parsers', function() {

  describe('.parseSync()', function() {
    it('should parse the content property on an object.', function() {
      var o = parser.parseSync({content: 'abc'});
      o.should.have.property('data');
      o.should.have.property('content');
      o.content.should.equal('abc');
    });
  });

  describe('.parse()', function() {
    it('should parse the content property on an object.', function(done) {
      parser.parse({content: 'abc'}, function (err, file) {
        if (err) {
          done(err);
          return;
        }

        file.should.have.property('data');
        file.should.have.property('content');
        file.content.should.equal('abc');
        done();
      });
    });
  });
});
