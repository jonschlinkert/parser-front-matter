# parser-front-matter [![NPM version](https://badge.fury.io/js/parser-front-matter.svg)](http://badge.fury.io/js/parser-front-matter)


> Front matter parser that uses gray-matter and bits of real panther, so you know it's good. Kind of like consolidate.js engine, accept it's not an engine, it's a parser. Works with Assemble, express.js, parser-cache, or any application with similar conventions.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i parser-front-matter --save-dev
```

## Usage

```js
var parser = require('parser-front-matter');
```

## API
### [.parseSync](index.js#L35)

* `str` **{String}**: The string to parse.    
* `options` **{Object}**: to pass to [gray-matter].    

Parse the given `str` and return a `file` object.

### [.parse](index.js#L58)

* `str` **{String}**: The string to parse.    
* `options` **{Object|Function}**: or `next` callback function.    
* `next` **{Function}**: callback function.    

Parse the given `str` callback `next(err, file)`.

### [.parseFileSync](index.js#L88)

* `filepath` **{String}**    
* `options` **{Object}**: to pass to [gray-matter]    
* `returns` **{Object}**: Parsed `file` object.  

Read a file at the given `filepath`, passing the resulting
string and `options` to the `.parse()` method.

### [.parseFile](index.js#L104)

* `path` **{String}**    
* `options` **{Object|Function}**: or next function.    
* `next` **{Function}**    

Asynchronously read a file at the given `filepath` and
callback `next(err, str)`.

### [.parseFilesSync](index.js#L132)

* `filepath` **{String}**    
* `options` **{Object}**: to pass to [gray-matter]    
* `returns` **{Object}**: Parsed `file` object.  

Synchronously read and parse a glob of files from the given `patterns`,
passing any options to [globby] and `.parseSync()`.

### [.parseFiles](index.js#L149)

* `path` **{String}**    
* `options` **{Object|Function}**: or next function.    
* `next` **{Function}**    

Synchronously read and parse a glob of files from the given `patterns`
and callback `next(err, str)`. Options are passed to [globby] and `.parseSync()`.

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 25, 2014._


[gray-matter]: https://github.com/jonschlinkert/gray-matter "front matter parser"
[globby]: https://github.com/sindresorhus/globby
