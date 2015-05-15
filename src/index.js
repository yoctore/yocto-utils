'use strict';

var _       = require('lodash');
var crypto  = require('./modules/crypto');
var date    = require('./modules/date');
var media   = require('./modules/media');
var request = require('./modules/request');
var strings = require('./modules/strings');
var unit    = require('./modules/unit-tests');

/**
 * Yocto utilities functions
 *
 * For more details on these dependencies read links below :
 * - LodAsh : https://lodash.com/
 *
 * @date : 27/04/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @author : Cédric BALARD <cedric@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 * @class Utils
 * @module Utils
 */
function Utils() {
  /**
   * Default unit instance for crypto usage
   *
   * @property crypto
   * @type Crypto
   */
  this.crypto   = crypto;

  /**
   * Default unit instance for date usage
   *
   * @property date
   * @type YDate
   */
  this.date     = date;

  /**
   * Default unit instance for date usage
   *
   * @property media
   * @type Media
   */
  this.media     = media;

  /**
   * Default unit instance for request usage
   *
   * @property request
   * @type Request
   */
  this.request  = request;

  /**
   * Default unit instance for strings usage
   *
   * @property strings
   * @type Strings
   */
  this.strings  = strings;

  /**
   * Default unit instance for unit testing usage
   *
   * @property unit
   * @type Unit
   */
  this.unit     = unit;
}

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

  // return a default object
  return {};  
};

/**
 * Default get function
 *
 * @method get
 * @return {Mixed} wanted property
 */
Utils.prototype.get = function(name) {
  return this[name];
};

/**
* Export Utils
*/
module.exports = new (Utils)();
