var utils   = require("../src/index.js");
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
        fooBar : 'foo',
        foo_bar5 : {
          $push : 'a'
        }
      }
    }
  }
};

var ma3 = {
  foo_bar : {
    foo_bar2 : {
      foo_bar3 : {
        foo_bar : 'foo',
        foo_bar4 : {
          $pull : 'a'
        }
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




var toto = {
  phone : [
    {
      prefix  : '+262',
      number  : '692123456',
      type    : 'gsm'
    },
    {
      prefix  : '+262',
      number  : '262123456',
      type    : 'fixe'
    }
  ],
  nickname    : 'Dark',
  birth_date  : 685569600000,
  mail        : 'test@y8.re'
};

console.log('== OBJECT : CAMELIZE NEW TEST KEYS ==');
console.log(utils.obj.inspect(toto));
console.log('============= CONVERTED ===========');
console.log(utils.obj.inspect(utils.obj.camelizeKeys(toto)));

var d = { childrens: [],
  commercial_optin: 
   [ { _id: '5637510d30017af260dd0903',
       store_choices: [],
       email: true,
       sms: true,
       call: true } ],
  emails: 
   [ { _id: '5637510d30017af260dd0900',
       deleted_date: null,
       token_lost: null,
       validated_date: null,
       token: '8>W$D^,pdN+C5Y6Qwc;#7aJ?ms4hE)Hu/[.Zg',
       primary: true,
       address: 'lonny@yocto.re' } ],
  phones: 
   [ { codes: [],
       _id: '5637510d30017af260dd0901',
       sub_type: null,
       validated_date: null,
       deleted_date: 'Tue Nov 03 2015 17:29:18 GMT+0400 (RET)',
       phone_type: 'gsm',
       primary: true,
       validation_type: 'novalidate',
       number: '0692695682',
       prefix: '+262' },
     { codes: [Object],
       _id: '5638b6ae98add44485b742c6',
       deleted_date: null,
       phone_type: 'fixe',
       primary: false,
       validation_type: 'novalidate',
       number: '0262568565',
       prefix: '+262' },
     { codes: [],
       _id: '5638b6ae98add44485b742c8',
       deleted_date: null,
       phone_type: 'gsm',
       primary: true,
       validation_type: 'novalidate',
       number: '0692695682',
       prefix: '+262' } ],
  auths: 
   [ '5637510d30017af260dd08fd',
     '563767aff8dbbe5266fbe5a2',
     '56376a8c8f77fc1367306a64',
     '56376b048f77fc1367306a65',
     '5638aa8b66d0078382733aba',
     '5638ab4966d0078382733abb',
     '5638ab5266d0078382733abc',
     '5638afad5b7dd2b582a5039a',
     '5639aa8563bf0c3794ed550d',
     '563c482fcb4193e8081436d7',
     '563c4a7a248de5770952af88',
     '563cb24c519e926f1157af47' ],
  notification_preferences: [ 'sms', 'notification', 'phone', 'email' ],
  profiles: [ '5637510d30017af260dd08fe' ],
  __v: 0,
  firstname: 'Mathieu',
  lastname: 'Robert',
  iso_code: 'RE',
  birth_date: 'Wed Feb 04 1903 04:00:00 GMT+0400 (RET)',
  birth_place: null,
  family_status: null,
  civility: 'male',
  job_category: null,
  dependent_person: '0',
  home_id: '5638ae385b7dd2b582a50399',
  sync: { toVindemia: false, fromVindemia: true },
  created_date: 'Mon Nov 02 2015 16:03:25 GMT+0400 (RET)',
  updated_date: 'Mon Nov 09 2015 09:54:23 GMT+0400 (RET)',
  _id: '5637510d30017af260dd08ff'
};

console.log('== OBJECT : CAMELIZE NEW TEST 2 KEYS ==');
console.log(utils.obj.inspect(d));
console.log('============= CONVERTED ===========');
console.log(utils.obj.inspect(utils.obj.camelizeKeys(d)));
