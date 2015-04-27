/**
 * Class that just test utils function
 *
 * add test for :
 * -forceRelodRequire
 * -getCorrectHost
 *
 */

var utils       = require("../src/index.js");
var logger      = require('yocto-logger');


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

logger.info( "allItemIsInList( objA, objB) : ", utils.allItemIsInList( objA, objB) );
logger.info( "allItemIsInList( objA, objC) : ", utils.allItemIsInList( objA, objC) );


logger.info( "randomizedPassword( 10, 'totoMdp') : ", utils.randomizedPassword( 10, 'totoMdp')  );
logger.info( "randomizedPassword( 10, '') : ", utils.randomizedPassword( 10, '')  );

var encryptedData = utils.encrypt( 'Yocto', 'dataToEncrypt');
logger.info( "encryptedData = encrypt( 'totoYocto', 'mdpDeTest') : ", encryptedData  );

logger.info ( "decrypt('Yocto', encryptedData ) = " , utils.decrypt('Yocto', encryptedData ));


logger.info ( " utils.geberateSearchDateList(0, 5, 'min', 'max', false) :" , utils.generateSearchDateList(0, 5, 'min', 'max', false) );


logger.info( 'getCorrectHost : ', utils.getCorrectHost());

logger.info( 'isValidImageFormat(\'jpeg\'): ' +  utils.isValidImageFormat('jpeg'));
