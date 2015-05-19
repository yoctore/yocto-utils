var utils   = require("../dist/index.js");
var crypto  = utils.crypto;
var date    = utils.date;
var request = utils.request;
var media   = utils.media;

console.log( "randomizedPassword( 10, 'totoMdp') : ", crypto.randomizedPassword( 10, 'totoMdp')  );
console.log( "randomizedPassword( 10, '') : ", crypto.randomizedPassword( 10, '')  );

var encryptedData = crypto.encrypt( 'Yocto', 'dataToEncrypt');
console.log( "encryptedData = encrypt( 'totoYocto', 'mdpDeTest') : ", encryptedData  );

console.log ( "decrypt('Yocto', encryptedData ) = " , crypto.decrypt('Yocto', encryptedData ));

console.log ( " utils.geberateSearchDateList(0, 5, 'min', 'max', false) :" , date.generateList(0, 5, 'min', 'max', false) );

console.log( 'getCorrectHost : ', request.getHost());

console.log( 'isValidImageFormat(\'jpeg\'): ' +  media.isValidImageFormat('jpeg'));


var rename = { a : 1 };

var r = utils.renameKey(rename, 'a', 'a.b.c');

console.log(rename, r);