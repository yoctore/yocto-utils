'use strict';

var logger  = require('yocto-logger');
var strings = require('./modules/strings');
var crypto  = require('./modules/crypto')(logger, strings);
var date    = require('./modules/date')(logger);
var media   = require('./modules/media');
var request = require('./modules/request');
var unit    = require('./modules/unit-tests');
var obj     = require('./modules/obj')(strings);

/**
 * Yocto utils manager. This tool manage utility function for these list of modules :
 *
 * - Crypto : utility module for crypt usage
 * - Date : utility module for date usage
 * - Media : utility module for media usage
 * - Request : utility module for request usage
 * - Str : utility module for string usage
 * - Unit : utility module for unit data usage
 * - Object : utility module for object data usage
 *
 * @date : 27/04/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 *
 * @class Utils
 * @module Utils
 */
function Utils () {
  /**
   * Default instance for crypto usage
   *
   * @property crypto
   * @type {Object}
   */
  this.crypto   = crypto;

  /**
   * Default instance for date usage
   *
   * @property date
   * @type {Object}
   */
  this.date     = date;

  /**
   * Default instance for date usage
   *
   * @property media
   * @type {Object}
   */
  this.media    = media;

  /**
   * Default instance for request usage
   *
   * @property request
   * @type {Object}
   */
  this.request  = request;

  /**
   * Default instance for strings usage
   *
   * @property strings
   * @type Strings
   */
  this.str      = strings;

  /**
   * Default instance for unit usage
   *
   * @property unit
   * @type {Object}
   */
  this.unit     = unit;

  /**
   * Default instance for object  usage
   *
   * @property unit
   * @type {Object}
   */
  this.obj      = obj;
}

/**
 * Default get function
 *
 * @param {String} name the property name we want
 * @return {Object} wanted property
 */
Utils.prototype.get = function (name) {
  return this[name];
};

/**
 * Export Utils
 */
module.exports = new (Utils)();
