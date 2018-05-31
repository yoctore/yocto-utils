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
 * @param {Object} logger current logger instance
 * @param {Object} str strings module instance
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
  // Choose complexity level of password
  // 1 : easy - 2 middle - 3 huge
  level = !_.isUndefined(level) && _.isNumber(level) && (level >= 1 && level <= 3) ? level : 3;

  // Process n to a correct length value 8 chars is minest possible value
  n = _.isNumber(n) && !_.isNaN(n) && n >= 8 ? n : 8;

  // Define nb special chars to be 1/3 of chars length
  var nbSpecial = level === 3 ? Math.round(n / 4) : 0;
  var nbNum     = level >= 2 ? Math.round(n / 4) : 0;
  var nbAscii   = n - nbSpecial - nbNum;

  // Ascii chars list without special chars
  var ascii   = this.str.generateAsciiCharsList(true, false , false, true);

  // Get only special chars
  var special = this.str.generateAsciiCharsList(false, false , true, false);

  // Get only num chars
  var num     = this.str.generateAsciiCharsList(false, true , false, false);

  // Build full ascii value to use
  var password = {
    ascii   : [],
    special : [],
    num     : []
  };

  // Build password
  for (var i = 0; i < n; i++) {
    // Manage ascii char
    if (nbAscii > 0 && password.ascii.length < nbAscii) {
      var aindex = (Math.random() * (ascii.length - 1)).toFixed(0);

      password.ascii.push(ascii[aindex]);
    }

    // Manage number char
    if (nbNum > 0 && password.num.length < nbNum) {
      var nindex = (Math.random() * (num.length - 1)).toFixed(0);

      password.num.push(num[nindex]);
    }

    // Manage special char
    if (nbSpecial > 0 && password.special.length < nbSpecial) {
      var sindex = (Math.random() * (special.length - 1)).toFixed(0);

      password.special.push(special[sindex]);
    }
  }

  // Compact data and shuffle data
  password = _.shuffle(_.union(password.ascii, password.special, password.num));

  // Default statement
  return password.join('');
};

/**
 * Utility function to encrypt data with a given key
 *
 * @method encrypt
 * @param {String} key key to use for encryption
 * @param {Mixed} data data to encrypt
 * @param {String} algorithm type of algorithm to use on process
 * @return {String|Boolean} crypted data
 */
Crypto.prototype.encrypt = function (key, data, algorithm) {
  // Default value
  var crypted = false;

  try {
    // Checking key value
    if (_.isEmpty(key) || key.length < 32) {
      throw 'Key cannot be empty and must be 32 chars length min';
    }

    // Default buffer
    var buffer = new Buffer(key, 'hex').toString();

    // Stringify data
    data = JSON.stringify(data);

    // Manage cypher
    var cipher  = crypto.createCipher(algorithm || 'aes256', buffer);

    crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
  } catch (e) {
    // Error too bad so log it
    this.logger.verbose([ '[ Utils.Crypto.encrypt ] -', e ].join(' '));

    // Set to false when error
    crypted = false;
  }

  // Return false if errors occured
  return crypted;
};

/**
 * Utility function to encrypt/data in an array with a given key
 *
 * @method cryptDecryptInsideArray
 * @param {String} key key to use for encryption
 * @param {Mixed} data data to encrypt
 * @param {String} algorithm type of algorithm to use on process
 * @param {String} isEncrypt true for an encrypt process false otherwise
 * @return {Array|Boolean} crypted data
 */
Crypto.prototype.cryptDecryptInsideArray = function (key, data, algorithm, isEncrypt) {
  // Only if is an Array
  if (_.isArray(data)) {
    // Default process
    return _.map(data, function (d) {
      // Default statement
      return isEncrypt ? this.encrypt(key, d, algorithm) || d : this.decrypt(key, d, algorithm) || d
    }.bind(this));
  }

  // A warning message in case not an array used in process
  this.logger.warning([ '[ Utils.Crypto.cryptDecryptInsideArray ] -',
    'cryptDecryptInsideArray must be used with an Array. A', typeof data, 'was given.'
  ].join(' '));

  // In other case we do classic process
  return isEncrypt ? this.encrypt(key, data, algorithm) : this.decrypt(key, data, algorithm);
};

/**
 * Utility function to decrypt data by a given key
 *
 * @method decrypt
 * @param {String} key key to use for encryption
 * @param {Mixed} data data to encrypt
  * @param {String} algorithm type of algorithm to use on process
 * @return {String|Boolean} decrypted data
 */
Crypto.prototype.decrypt = function (key, data, algorithm) {
  // Default value
  var decrypted = false;

  try {
    // Test empty key
    if (_.isEmpty(key)) {
      throw 'Key cannot be empty and must be a cypher key';
    }

    // Default buffer
    var buffer = new Buffer(key, 'hex').toString();

    // Manage crypher
    var decipher  = crypto.createDecipher(algorithm || 'aes256', buffer);

    decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    // Return decrypted data
    decrypted = JSON.parse(decrypted);
  } catch (e) {
    // Error too bad so log it
    this.logger.verbose([ '[ Utils.Crypto.decrypt ] -', e ].join(' '));

    // Set to false when error
    decrypted = false;
  }

  // Return false if errors occured
  return decrypted;
};

/**
 * Export Crypto
 *
 * @param {Object} logger default logger instance to use
 * @param {Object} strings default string module instance to use
 * @return {Function} new instance of crypto
 */
module.exports = function (logger, strings) {
  return new Crypto(logger, strings);
};
