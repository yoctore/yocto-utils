'use strict';

var _         = require('lodash');
var crypto    = require('crypto');

/**
 * Yocto utility functions : Module Crypto
 * Contains utility function for hash action
 *
 * @date 15/05/2015
 * @author Mathieu ROBERT <mathieu@yocto.re>
 * @copyright Yocto SAS, All right reserved
 *
 * @class Crypto
 * @module Utils
 */
function Crypto (logger, str) {
  /**
   * Default logger
   *
   * @property logger
   * @type object
   */
  this.logger = logger;

  /**
   * Default string module instance
   *
   * @property str
   * @type object
   */
  this.str = str;
}

/**
 * Return a randomized password
 *
 * @param {Integer} n password length
 * @param {Integer} level needed level for password complexity
 * @return {String} randomized password
 */
Crypto.prototype.randomizedPassword = function (n, level) {
  // choose complexity level of password
  // 1 : easy - 2 middle - 3 huge
  level = (!_.isUndefined(level) && _.isNumber(level) && (level >= 1 && level <= 3)) ? level : 3;

  // process n to a correct length value 8 chars is minest possible value
  n             = _.isNumber(n) && !_.isNaN(n) && n >= 8 ? n : 8;

  // define nb special chars to be 1/3 of chars length
  var nbSpecial = (level === 3) ? Math.round(n / 4) : 0;
  var nbNum     = (level >= 2) ? Math.round(n / 4) : 0;
  var nbAscii   = n - nbSpecial - nbNum;

  // ascii chars list without special chars
  var ascii   = this.str.generateAsciiCharsList(true, false , false, true);
  // get only special chars
  var special = this.str.generateAsciiCharsList(false, false , true, false);
  // get only num chars
  var num     = this.str.generateAsciiCharsList(false, true , false, false);

  // build full ascii value to use
  var password = {
    ascii   : [],
    special : [],
    num     : []
  };

  // build password
  for (var i = 0; i < n; i++) {
    // manage ascii char
    if (nbAscii > 0 && password.ascii.length < nbAscii) {
      var aindex = (Math.random() * (ascii.length - 1)).toFixed(0);
      password.ascii.push(ascii[aindex]);
    }
    // manage number char
    if (nbNum > 0 && password.num.length < nbNum) {
      var nindex = (Math.random() * (num.length - 1)).toFixed(0);
      password.num.push(num[nindex]);
    }
    // manage special char
    if (nbSpecial > 0 && password.special.length < nbSpecial) {
      var sindex = (Math.random() * (special.length - 1)).toFixed(0);
      password.special.push(special[sindex]);
    }
  }

  // compact data and shuffle data
  password = _.shuffle(_.union(password.ascii, password.special, password.num));

  // default statement
  return password.join('');
};

/**
 * Utility function to encrypt data with a given key
 *
 * @method encrypt
 * @param {String} key key to use for encryption
 * @param {Mixed} data data to encrypt
 * @return {String|Boolean} crypted data
 */
Crypto.prototype.encrypt = function (key, data) {

  // default value
  var crypted = false;

  try {

    // checking key value
    if (_.isEmpty(key) || key.length < 32) {
      throw 'Key cannot be empty and must be 32 chars length min';
    }

    // default buffer
    var buffer = new Buffer(key, 'hex').toString();

    // stringify data
    data = JSON.stringify(data);

    // manage cypher
    var cipher  = crypto.createCipher('aes256', buffer);
    crypted     = cipher.update(data, 'utf-8', 'hex');
    crypted     += cipher.final('hex');

  } catch (e) {
    // error too bad so log it
    this.logger.warning([ '[ Utils.Crypto.encrypt ] -', e ].join(' '));
  }

  // return false if errors occured
  return crypted;
};

/**
 * Utility function to decrypt data by a given key
 *
 * @method decrypt
 * @param {String} key key to use for encryption
 * @param {Mixed} data data to encrypt
 * @return {String|Boolean} decrypted data
 */
Crypto.prototype.decrypt = function (key, data) {

  // default value
  var decrypted = false;

  try {

    // test empty key
    if (_.isEmpty(key)) {
      throw 'Key cannot be empty and must be a cypher key';
    }

    // default buffer
    var buffer = new Buffer(key, 'hex').toString();

    // manage crypher
    var decipher  = crypto.createDecipher('aes256', buffer);
    decrypted     = decipher.update(data, 'hex', 'utf-8');
    decrypted     += decipher.final('utf-8');

    // return decrypted data
    decrypted = JSON.parse(decrypted);
  } catch (e) {
    // error too bad so log it
    this.logger.warning([ '[ Utils.Crypto.decrypt ] -', e ].join(' '));
  }

  // return false if errors occured
  return decrypted;
};

/**
 * Export Crypto
 */
module.exports = function (logger, strings) {
  return new (Crypto)(logger, strings);
};
