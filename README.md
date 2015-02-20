# parser-front-matter [![NPM version](https://badge.fury.io/js/parser-front-matter.svg)](http://badge.fury.io/js/parser-front-matter)

> Front matter parser that uses gray-matter and bits of real panther, so you know it's good.

This is kind of like a consolidate.js engine, accept it's not an engine, it's a parser. Works with Assemble, verb, express.js, parser-cache, or any application with similar conventions.

## Install with [npm](npmjs.org)

```bash
npm i parser-front-matter --save
```

## Usage

```js
var parser = require('parser-front-matter');
```

## API
### [.parse](index.js#L34)

Parse the given `file` into a normalized `file` object and callback `next(err, file)`. Options are passed to [gray-matter], and if `options` has a `locals` property, it will be merged with the `data` property on the normalized `file` object.

* `file` **{String|Object}**: The object or string to parse.    
* `options` **{Object|Function}**: or `next` callback function.    
* `next` **{Function}**: callback function.    

Normalized `file` objects should have the following properties:

  - `path` The source file path, if provided
  - `data`: metadata, from yaml front matter and/or locals
  - `content`: the content of a file, excluding front-matter
  - `orig`: the original content of a file, including front-matter

### [.parseSync](index.js#L68)

* `file` **{String|Object}**: The object or string to parse.    
* `options` **{Object}**: to pass to [gray-matter].    

Parse the given `file` and return a normalized `file` object,
with `data`, `content`, `path` and `orig` properties.

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014-2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on February 19, 2015._


[gray-matter]: https://github.com/jonschlinkert/gray-matter "front matter parser"
[globby]: https://github.com/sindresorhus/globby