var utils   = require("../src/index.js");
var crypto  = utils.crypto;
var date    = utils.date;
var request = utils.request;
var media   = utils.media;

console.log( "randomizedPassword : ", crypto.randomizedPassword(10, 1)  );
console.log( "randomizedPassword : ", crypto.randomizedPassword(10, 1)  );
console.log( "randomizedPassword: ", crypto.randomizedPassword(10, 2)  );
console.log( "randomizedPassword: ", crypto.randomizedPassword(10, 3)  );
console.log( "randomizedPassword: ", crypto.randomizedPassword(15, 3)  );  


return false;
var encryptedData = crypto.encrypt( 'Yocto', 'dataToEncrypt');
console.log( "encryptedData = encrypt( 'totoYocto', 'mdpDeTest') : ", encryptedData  );

console.log ( "decrypt('Yocto', encryptedData ) = " , crypto.decrypt('Yocto', encryptedData ));

console.log ( " utils.geberateSearchDateList(0, 5, 'min', 'max', false) :" , date.generateList(0, 5, 'min', 'max', false) );

console.log( 'getCorrectHost : ', request.getHost());

console.log( 'isValidImageFormat(\'jpeg\'): ' +  media.isValidImageFormat('jpeg'));


var rename = { a : 1 };

var r = utils.obj.renameKey(rename, 'a', 'a.b.c');

console.log(rename, r);

var ma = { fromName: 'EXPE NAME',
  fromEmail: 'mathieu@yocto.re',
  to: 
   [ { email: 'contact@yocto.re',
       name: 'Mathieu ROBERT',
       type: 'bcc' } ],
  subject: 'MY-TEST2',
  html: '<b>MY-MESSAGE2</b>',
  text: 'MY-MESSAGE2' };
  
var r = utils.obj.renameKey(ma, 'fromName', 'from_name');
var r = utils.obj.renameKey(r, 'fromEmail', 'from_email');
var r = utils.obj.renameKey(r, 'to', 'b.d.e');

console.log(ma);
console.log(utils.obj.inspect(r));