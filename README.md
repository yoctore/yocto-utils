## Overview

This module is a part of yocto node modules for NodeJS.

Please see [our NPM repository](https://www.npmjs.com/~yocto) for complete list of available tools (completed day after day).

This module provide utility function for various domains (encryption, media, string, date, object and more others)

## Motivation

After each development, conclusion is the same : we need to create an utility tools with all our utility method to be able to reuse them in other program. That's why we create this utility tools.

*Although this module was completed day after day.*

## Available modules

*See method list for each available method*

- Crypto : for utility functions related to encryption (random password, encrypt, decrypt, etc..)
- Media : for utility functions related to media
- Request : for utility functions related to request (get http info - host - x-forwarded, etc ...)
- Strings : for utility functions related to string
- YDate : for utility functions related to date
- Object : for utility functions related to object manipulation

## Method list

- Module Crypto :
  - randomizedPassword(length, complexity) : generate a random password with a specific complexity
  - encrypt(key, value) : encrypt given string to an AES-256 representation with given key
  - decrypt(key, value) : decrypt given AES-256 representation string value with given key
- Module Date : 
  - generateList(min, max, prefixMin, prefixMax, reverse) : Generate a list of date between two given index
- Module Media : 
  - isValidImageFormat(type) : Test is given image format is valid (only string extension for the moment)
- Module Object : 
  - renameKey(obj, key, newKey) : rename a given key for another given
  - underscoreKeys(o) : rewrite all base object key name to an underscore key name (FULL depth level)
  - inspect(value, colorize : get the current object to a string representation with a full depth
  - camelizeKeys(o) : rewrite all base object key name to an underscore key name (FULL depth level)
- Module Request : 
  - getHost(request) : Get current host name from express request object
- Module Strings : 
  - generateAsciiCharsList(alpha, num, special, toLower) : Generate an list of chars from ascii table
  - isUppercase(char) : test if a given char is to uppercase
  - isLowercase(char) : test if a given char is to lowercase
  - camelCase(string) : camelize a string
  - underscore(string) : underscore a string

## Logging in tool

By Default this module include [yocto-logger](https://www.npmjs.com/package/yocto-logger) for logging.

## How to use

> Each module is available like : utils.<MODULE_NAME>.<WANTED_METHOD_NAME>(PARAMS, ...)

```javascript
var utils = require('yocto-utils')();

// For Crypto module
utils.crypto.<METHOD_NAME>

// For Date module
utils.date.<METHOD_NAME>

// For Media module
utils.media.<METHOD_NAME>

// For Object module
utils.obj.<METHOD_NAME>

// For Request module
utils.request.<METHOD_NAME>

// For Strings module
utils.str.<METHOD_NAME>
```

> Or you can retreive module by getter method : utils.get('module_name')

```javascript

// For Crypto module
utils.get('crypto').<METHOD_NAME>

// For Date module
utils.get('date')<METHOD_NAME>

// For Media module
utils.get('media')<METHOD_NAME>

// For Object module
utils.get('obj')<METHOD_NAME>

// For Request module
utils.get('request')<METHOD_NAME>

// For Strings module
utils.get('str')<METHOD_NAME>
```

## Examples

Examples are available in example directory in git repository.

## Next step

- Other utilities function
- Add full depth process on camelizeKeys / underscoreKeys Function on object module.
