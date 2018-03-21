'use strict';

var _       = require('lodash');
var joi     = require('joi');
var util    = require('util');

/**
 * Yocto utility functions : Module YDate
 * Contains utility function for date tools
 *
 * @date 15/05/2015
 * @author Mathieu ROBERT <mathieu@yocto.re>
 * @copyright Yocto SAS, All right reserved
 *
 * @class Crypto
 * @module Utils
 * @param {Object} logger current logger instance
 */
function YDate (logger) {
  /**
   * Default logger
   *
   * @property logger
   * @type object
   */
  this.logger = logger;

  /**
   * Default elapsed time sub module
   */
  this.elapsed = require('./elapsed');
}

/**
 * Utility function to build date list
 *
 * @param {Integer} min start value
 * @param {Integer} max end value
 * @param {String} prefixMin prefix to use on min value
 * @param {String} prefixMax prefix to use on max value
 * @param {Boolean} reverse true if we need to reverse array
 * @return {Array} list of date
 */
YDate.prototype.generateList = function (min, max, prefixMin, prefixMax, reverse) {
  // Default list
  var list = [];

  try {
    // Default date
    var date        = new Date();

    // Validation schema
    var minSchema   = joi.number().required().min(1970);
    var maxSchema   = joi.number().required().min(min + 1).max(date.getFullYear());

    // Validate
    var minValidation = joi.validate(min, minSchema);
    var maxValidation = joi.validate(max, maxSchema);

    // Has errors throw it !!!
    if (!_.isNull(minValidation.error)) {
      throw util.inspect(minValidation.error.details, {
        depth : null
      });
    }

    if (!_.isNull(maxValidation.error)) {
      throw util.inspect(maxValidation.error.details, {
        depth : null
      });
    }

    // Process correcty reverse and prefixs
    reverse = !_.isNull(reverse) && _.isBoolean(reverse) ? reverse : false;
    prefixMin = !_.isUndefined(prefixMin) && !_.isNull(prefixMin) &&
                _.isString(prefixMin) && !_.isEmpty(prefixMin) ? prefixMin : '';
    prefixMax = !_.isUndefined(prefixMax) && !_.isNull(prefixMax) &&
                _.isString(prefixMax) && !_.isEmpty(prefixMax) ? prefixMax : '';

    // Init with default value to prevent infinite loop
    max = max || date.getFullYear();
    min = min || date.getFullYear();

    // Process number
    for (var i = min; i <= max; i++) {
      var mI = i;

      // If we had prefix we must transform date to a correction string value
      if (!_.isEmpty(prefixMin) || !_.isEmpty(prefixMax)) {
        mI = mI.toString();
      }

      // Push it
      list.push(mI);
    }

    // Check is prefix is needed on list
    if (!_.isEmpty(prefixMin)) {
      list[0] = _([ prefixMin, list[0] ]).join(' ');
    }

    // Check is prefix is needed on list
    if (!_.isEmpty(prefixMax)) {
      list[list.length - 1] = _([ prefixMax, list[list.length - 1] ]).join(' ');
    }

    // Return statement
    return reverse ? list.reverse() : list;
  } catch (e) {
    this.logger.warning([ '[ YDate.generateList ] - An occured, and error is :', e ].join(' '));
  }

  // Return default array
  return list;
};

/**
 * Get elpased time from a given time and a schedule rules
 *
 * @param {Object} config configration needed to process the main process (no working day, etc)
 * @param {Object} time current date to use for the main process
 * @return {String} formatted date to string format
 */
YDate.prototype.getElapsedTime = function (config, time) {
  // Default statement
  return this.elapsed.get(config, time);
};

/**
 * Export YDate
 *
 * @param {Object} logger current logger instance
 * @return {Object} current instance of YDate
 */
module.exports = function (logger) {
  return new YDate(logger);
};
