
# Yocto Utils

 Yocto utilities functions.
 Utils contains all utilities functions for yocto core stack

 For more details on these dependencies read links below :
    - yocto-logger : http://lab.yocto.digital:8888/yocto-node-modules/yocto-logger
    - LodAsh : https://lodash.com/
    - crypto : https://nodejs.org/api/crypto.html
    - path : https://nodejs.org/api/path.html


### Examples :


##### For Encrypt data

```javascript
var utils           = require("../src/index.js");
var encryptedData   = utils.encrypt( 'Yocto', 'dataToEncrypt');
```


##### For decrrypt data

```javascript
var utils       = require("../src/index.js");
var decryptedData = utils.decrypt( 'Yocto', 'dataToDecrypt');
```
