# Yocto Utils

This modules manage utilities functions.

This main module has 6 submodules. Those modules are : 

- Crypto : Manage All crypt function
- Media : Manage all media utilities function (valid extension, images, etc ...)
- Request : Manage all utilities for request usage (http info - host - x-forwarded, etc ...)
- Strings : Manage all utilities for string usage
- UnitTests : Manage all utilities for unit testing usage
- YDate : Manage all utilities for date

## Usage

```javascript
// Require can be set like this
var utils   = require("yocto-utils");
var crypto  = require("yocto-utils").crypto;
var date    = require("yocto-utils").date;
var request = require("yocto-utils").request;
var media   = require("yocto-utils").media;

// OR get accessor is available
var utils   = require("yocto-utils");
var crypto  =  utils.get('crypto');

// Calling 
// normal calling
var rename = { a : 1 };
utils.renameKey(rename, 'a', 'a.b.c');

// Accessor calling
utils.get('crypto').randomizedPassword( 10, 'totoMdp');
```

For more example see class documentation or example directory.