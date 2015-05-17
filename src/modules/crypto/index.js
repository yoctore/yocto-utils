'use strict';

var _         = require('lodash');
var crypto    = require('crypto');
var logger    = require('yocto-logger');

/**
 * Yocto utilities functions : Module Crypto<br/>
 * Contains utility function for cryptography action 
 *
 * For more details on these dependencies read links below :
 * - LodAsh : https://lodash.com/
 * - Crypto : https://nodejs.org/api/crypto.html
 *
 * @date : 15/05/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 * @class Crypto
 * @module Utils
 * @submodule Crypto 
 */
function Crypto() {
  /**
   * Default logger
   *
   * @property logger
   * @type object
   */
  this.logger = logger;
}

/**
 * Return a password from two rules
 *
 * @method randomizedPassword
 * @param {Integer} n password length
 * @param {String} a chars to use
 * @return {String} a randomized password
 */
Crypto.prototype.randomizedPassword = function(n, a) {
  
  // process a to a correct value
  a = (!_.isUndefined(a) && !_.isNull(a) && _.isString(a) && !_.isEmpty(a)) ? a : 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890&(!-_%<>';

  // process n to a correct value
  n = (!_.isUndefined(a) && !_.isNull(a) && _.isNumber(n) && !_.isNaN(n) && n >= 0) ? n : 0;

  // get correct index
  var index = (Math.random() * (a.length - 1)).toFixed(0);

  // return key
  return n > 0 ? (a[index] + this.randomizedPassword(n - 1, a)) : '';
};

/**
 * Utility function to encrypt data
 *
 * @method encrypt
 * @param {String} key key to use for encryption
 * @param {Mixed} data data to encrypt
 * @return {String} crypted data
 */
Crypto.prototype.encrypt = function(key, data) {
  
  // default value
  var crypted = false;
  
  try {
    
    // checking key value
    if (_.isEmpty(key) || key.length < 32) {
      throw 'Key cannot be empty and must be 32 chars length min';  
    }
    
    // stringify data
    data = JSON.stringify(data);
  
    // manage cypher
    var cipher  = crypto.createCipher('aes256', key);
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
 * Utility function to decrypt data
 *
 * @method decrypt
 * @param {String} key key to use for encryption
 * @param {Mixed} data data to encrypt
 * @return {String} decrypted data
 */
Crypto.prototype.decrypt = function(key, data) {

  // default value
  var decrypted = false;

  try {
    
    // test empty key
    if (_.isEmpty(key)) {
      throw 'Key cannot be empty and must be a cypher key';
    }
    
    // manage crypher
    var decipher  = crypto.createDecipher('aes256', key);
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
module.exports = new (Crypto)();