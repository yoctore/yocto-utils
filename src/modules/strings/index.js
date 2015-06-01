'use strict';

var logger  = require('yocto-logger');
var _       = require('lodash');
var util    = require('util');

/**
 * Yocto utilities functions : Module String<br/>
 * Contains utility function to manipulate strings 
 *
 * For more details on these dependencies read links below :
 *
 * @date : 15/05/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 * @class Strings
 * @module Utils
 * @submodule Strings 
 */
function Strings() {
  /**
   * Default logger
   *
   * @property logger
   * @type object
   */
  this.logger = logger;
}

/**
 * Default inspect function, to wrap node util
 * 
 * @param {Mixed} value mixed value to process
 * @param {Boolean} colorize true if we need color false otherwise
 * @return {String} data to a string reprsentation
 */
Strings.prototype.inspect = function(value, colorize) {
 
  // default colorize value
  colorize = !_.isUndefined(colorize) && _.isBoolean(colorize) ? colorize : true;

  // return value from inpect utilities
  return util.inspect(value, false, null, colorize);
};

/**
 * Export Strings
 */
module.exports = new (Strings)();