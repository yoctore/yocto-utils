var utils   = require("../dist/index.js");
var crypto  = utils.crypto;
var date    = utils.date;
var request = utils.request;
var media   = utils.media;

console.log('============ RANDOMIZED PASSWORD =========');
console.log("SIMPLE PASSWORD (10 CHARS LENGTH) :", crypto.randomizedPassword(10, 1));
console.log("MEDIUM PASSWORD (10 CHARS LENGTH) :", crypto.randomizedPassword(10, 2));
console.log("COMPLEX PASSWORD (10 CHARS LENGTH) :", crypto.randomizedPassword(10, 3));
console.log("COMPLEX PASSWORD (15 CHARS LENGTH) :", crypto.randomizedPassword(15, 3));

console.log('============ ENCRYPT =========');
var key = '6e67ae372ad6d85cfad1abc366823e28';

var dToEncrypt = { a : 1, b : 'dataToEncrypt' };
var encryptedData = crypto.encrypt(key, dToEncrypt);
console.log("Encrypt [ " + dToEncrypt + "] =>", encryptedData);

console.log("Decrypt =>" , crypto.decrypt(key, encryptedData));

console.log('========= DATE ===========');
console.log("Date list from 1970 to 1990 with no prefix and suffix and no reversed" , date.generateList(1970, 1990));
console.log("Date list from 1970 to 1990 with prefix and suffix and reversed" , date.generateList(1970, 1990, 'prefix', 'suffix', true));

console.log('========= REQUEST ===========');
console.log( 'getCorrectHost : ', request.getHost());

console.log('========= MULTIMEDIA ===========');
console.log( 'isValidImageFormat(\'jpeg\'): ' +  media.isValidImageFormat('jpeg'));

console.log('========= OBJECT ===========');
var rename = { a : 1 };

console.log('== OBJECT : SIMPLE RENAME ==');
var r = utils.obj.renameKey(rename, 'a', 'a.b.c');
console.log(rename, r);

console.log('== OBJECT : MORE COMPLEX RENAME ==');
var ma = { fromName: 'EXPE NAME',
  fromEmail: 'from@email.com',
  to: 
   [ { emailTAAA: 'to@email.com',
       name: 'MY NAME',
       type: 'bcc' } ],
  subject: 'MY-TEST2',
  html: '<b>MY-MESSAGE2</b>',
  text: 'MY-MESSAGE2' }

var ma2 = {
  fooBar : {
    fooBar2 : {
      fooBar3 : {
        fooBar : 'foo'
      }
    }
  }
};

var ma3 = {
  foo_bar : {
    foo_bar2 : {
      foo_bar3 : {
        foo_bar : 'foo'
      }
    }
  }
};

var r = utils.obj.renameKey(ma, 'fromName', 'from_name');
r = utils.obj.renameKey(r, 'fromEmail', 'from_email');
r = utils.obj.renameKey(r, 'to', 'b.d.e');

console.log(ma);
console.log(utils.obj.inspect(r));
console.log('== OBJECT : UNDERSCORE KEYS ==');
console.log(utils.obj.inspect(utils.obj.underscoreKeys(ma2)));
console.log('== OBJECT : CAMELIZE KEYS ==');
console.log(utils.obj.inspect(utils.obj.camelizeKeys(ma3)));
