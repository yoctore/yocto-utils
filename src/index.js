'use strict';

var _             = require('lodash');
var path          = require('path');
var crypto        = require('crypto');

/**
 * Yocto utilities functions.<br/>
 * Utils contains all utilities functions for yocto core stack
 *
 * For more details on these dependencies read links below :
 * - yocto-logger : git+ssh://lab.yocto.digital:yocto-node-modules/yocto-utils.git
 * - LodAsh : https://lodash.com/
 * - crypto : https://nodejs.org/api/crypto.html
 * - path : https://nodejs.org/api/path.html
 *
 *
 * @date : 27/04/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @author : Cédric BALARD <cedric@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 * @class Utils
 */
function Utils() {}

/**
 * Rename key utility function. Parse an object from key and rename this key
 * 
 * @method renameKey
 * @param {Object} object reference to use
 * @param {String} reference key to use on object
 * @param {String} new key to use on current object
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Utils.prototype.renameKey = function(o, key, newKey) {

  // nested check
  if (!_.isUndefined(o) && !_.isNull(o) && _.isObject(o) &&
    !_.isUndefined(key) && !_.isNull(key) && _.isString(key) &&
    !_.isUndefined(newKey) && !_.isNull(newKey) && _.isString(newKey)) {

    // clone object
    var c     = _.clone(o);
    var value = c[key];
  
    // remove non needed key
    delete c[key];    
  
    // set new key
    _.set(c, newKey, value);
  
    // return object 
    return c;        
  }

  // return default object
  return {};  
};

/**
 * Force a require file to be reload from root path of the app
 * @method forceReloadRequire
 * @param {String} path the current path to use
 * @return {String} path
 */
Utils.prototype.forceRelodRequire = function(path) {
  delete(require.cache[path]);
  //return require(_.join('/', '../..', path, true));
  return _(['../..', path, true]).join('/');
};

/**
 * Return true if has no difference between source and compare list
 * @method allItemIsInList
 * @param {Array|Object} source list of item
 * @param {Array|Object} compare list of item
 * @return {Boolean} true is no difference, false otherwise
 */
Utils.prototype.allItemIsInList = function(source, compare) {
  if (!_.isUndefined(source) && !_.isUndefined(compare)) {

    // Check type of source
    if (!_.isArray(source) && _.isObject(source)) {
      source = Object.keys(source);
    }

    // Check type of compare
    if (!_.isArray(compare) && _.isObject(compare)) {
      compare = Object.keys(compare);
    }

    //check is source and compare are Array
    if (_.isArray(source) && _.isArray(compare)) {
      return _.isEmpty(_.difference(source, compare));
    }
  }

  return false;
};

/**
 * Return a password from two rules
 * @method randomizedPassword
 * @param {Integer} n password length
 * @param {String} a chars to use
 * @return {String} a randomized password
 */
Utils.prototype.randomizedPassword = function(n, a) {

  if (_.isUndefined(a) || _.isEmpty(a) || _.isNull(a)) {
    a = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890&(!-_%<>';
  }

  var index = (Math.random() * (a.length - 1)).toFixed(0);
  return n > 0 ? a[index] + this.randomizedPassword(n - 1, a) : '';
};

/**
 * Utility function to encrypt data
 *
 * @method encrypt
 * @param {String} key key to use for encryption
 * @param {Mixed} data data to encrypt
 * @return {String} crypted data
 */
Utils.prototype.encrypt = function(key, data) {
  data = JSON.stringify(data);

  var cipher  = crypto.createCipher('aes256', key);
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted     += cipher.final('hex');

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
Utils.prototype.decrypt = function(key, data) {
  var decipher  = crypto.createDecipher('aes256', key);
  var decrypted = decipher.update(data, 'hex', 'utf-8');
  decrypted     += decipher.final('utf-8');

  return JSON.parse(decrypted);
};

/**
 * Utility function to build date list for search view
 *
 * @method generateDateList
 * @param {Integer} min start value
 * @param {Integer} max end value
 * @param {String} prefixMin prefix to use on min value
 * @param {String} prefixMax prefix to use on max value
 * @param {Boolean} reverse true if we need to reverse array
 * @return {Array} list of date
 */
Utils.prototype.generateDateList = function(min, max, prefixMin, prefixMax, reverse) {
  var list  = [];
  var date  = new Date();

  // init with default value to prevent infinite loop
  max       = max || date.getFullYear();
  min       = min || 0;

  // process number
  for(var i = min; i <= max; i++) {
    list.push(i.toString());
  }

  // check is prefix is needed on list
  if (!_.isNull(prefixMin) && !_.isEmpty(prefixMin)) {
    list[0] = _([ prefixMin, list[0]]).join(' ');
  }

  // check is prefix is needed on list
  if (!_.isNull(prefixMax) && !_.isEmpty(prefixMax)) {
    list[list.length - 1] = _([ prefixMax, list[list.length - 1]] ).join(' ');
  }

  // reverse if needed
  if (!_.isNull(reverse) && reverse) {
    list = list.reverse();
  }

  return list;
};

/**
 * Return the correct host from a request header. Implement x-forwarded data
 * 
 * @method getCorrectHost
 * @param {Object} HTTP request object
 * @return {String} Return the correct host from a request header, null if request is undefined
 */
Utils.prototype.getCorrectHost = function(request) {
  if (!_.isUndefined(request)) {
    return _( [request.protocol,  request.get('x-forwarded-host') || request.get('x-forwarded-server') || request.get('host') || 'localhost' ] ).join('://' );
  }
  return null;
};

/**
 * Check if is an allowed image type format
 *
 * @method isValidImageFormat
 * @param {String} type to check
 * @return {Boolean} true if is correct false otherwise
 */
Utils.prototype.isValidImageFormat = function(type) {
  type = _(['', type.toLowerCase(), '']).join('|');
  return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
};


/**
* Export Utils
*/
module.exports = new (Utils)();
