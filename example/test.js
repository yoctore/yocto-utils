/**
 * Class that just test utils function
 *
 * add test for :
 * -forceRelodRequire
 * -getCorrectHost
 *
 */

var utils       = require("../src/index.js");

var objA = {
    "A" : "aaa",
    "B" : "bbb"
};

var objB = {
    "A" : "ccc",
    "B" : "ddd"
};

var objC = {
    "A" : "eee",
    "C" : "fff"
};

console.log( "allItemIsInList( objA, objB) : ", utils.allItemIsInList( objA, objB) );
console.log( "allItemIsInList( objA, objC) : ", utils.allItemIsInList( objA, objC) );


console.log( "randomizedPassword( 10, 'totoMdp') : ", utils.randomizedPassword( 10, 'totoMdp')  );
console.log( "randomizedPassword( 10, '') : ", utils.randomizedPassword( 10, '')  );

var encryptedData = utils.encrypt( 'Yocto', 'dataToEncrypt');
console.log( "encryptedData = encrypt( 'totoYocto', 'mdpDeTest') : ", encryptedData  );

console.log ( "decrypt('Yocto', encryptedData ) = " , utils.decrypt('Yocto', encryptedData ));


console.log ( " utils.geberateSearchDateList(0, 5, 'min', 'max', false) :" , utils.generateDateList(0, 5, 'min', 'max', false) );


console.log( 'getCorrectHost : ', utils.getCorrectHost());

console.log( 'isValidImageFormat(\'jpeg\'): ' +  utils.isValidImageFormat('jpeg'));


var rename = { a : 1 };

var r = utils.renameKey(rename, 'a', 'a.b.c');

console.log(rename, r);