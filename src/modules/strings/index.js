'use strict';

var _ = require('lodash');

/**
 * Yocto utility functions : Module Str
 * Contains utility function for string tools
 *
 * @date 15/05/2015
 * @author Mathieu ROBERT <mathieu@yocto.re>
 * @copyright Yocto SAS, All right reserved
 *
 * @class Str
 * @module Utils
 */
function Str () {}

/**
 * Generate printable ascii chars list (without space)
 *
 * @param {Boolean} alpha true if we need alpha chars false otherwise
 * @param {Boolean} num true if we need number chars false otherwise
 * @param {Boolean} special true if we need special chars data false otherwise
 * @param {Boolean} toLower true if we need lower case in alpha chars false otherwise
 * @return {String} current ascii chars wanted
 */
Str.prototype.generateAsciiCharsList = function (alpha, num, special, toLower) {
  // default chars for appending
  var s = '';

  // generate list
  for (var i = 33; i < 127; i++) {
    // need alpha ?
    if (!_.isUndefined(alpha) && _.isBoolean(alpha) && alpha) {
      // generate human char code by default
      if (i >= 65 && i <= 90) {
        // add uppercase code
        s += String.fromCharCode(i);
        // need lower char item ?
        if (!_.isUndefined(toLower) && _.isBoolean(toLower) && toLower) {
          // add lower case code
          s += String.fromCharCode(i + 32);
        }
      }
    }

    // need number value ?
    if (!_.isUndefined(num) && _.isBoolean(num) && num) {
      // generate human number
      if (i >= 48 && i <= 57) {
        s += String.fromCharCode(i);
      }
    }

    // need special chars value
    if (!_.isUndefined(special) && _.isBoolean(special) && special) {
      // generate special chars
      if (i >= 33 && i <= 47 || i >= 58 && i <= 64 || i >= 91 && i <= 96 || i >= 123 && i <= 126) {
        s += String.fromCharCode(i);
      }
    }
  }

  // default statement
  return s;
};

/**
 * Check is given char is uppercase or not
 *
 * @param {String} value char to test
 * @return {Boolean} true if is uppercase char false otherwise
 */
Str.prototype.isUppercase = function (value) {
  // default statement
  return !_.isUndefined(value) && _.isString(value) &&
          value.length === 1 && value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90;
};

/**
 * Check if given char is lowercase or not
 *
 * @param {String} value char to test
 * @return {Boolean} true if is lowercase char false otherwise
 */
Str.prototype.isLowercase = function (value) {
  // default statement
  return !_.isUndefined(value) && _.isString(value) &&
          value.length === 1 && value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122;
};

/**
 * Check if given char is a special chars
 *
 * @param {String} value char to test
 * @return {Boolean} true if is special char false otherwise
 */
Str.prototype.isSpecialChar = function (value) {
  // char At zero
  var zero = value.charCodeAt(0);

  // default statement
  return !_.isUndefined(value) && _.isString(value) &&
         value.length === 1 && (zero >= 33 && zero <= 47 || zero >= 58 && zero <= 64 ||
                                zero >= 91 && zero <= 96 || zero >= 123 && zero <= 126);
};

/*
 * Camelize a string
 *
 * @param {String} value string to camelize
 * @return {String} string to camelized
 */
Str.prototype.camelCase = function (value) {
  // save camelize
  var camelize = _.camelCase(value);
  var zero     = _.first(value);

  // keep safe first chars
  if (this.isSpecialChar(zero)) {
    camelize = [ zero, camelize ].join('');
  }

  // default statement
  return camelize;
};

/*
 * Underscore a string
 *
 * @param {String} value string to underscore
 * @return {String} string to underscored
 */
Str.prototype.underscore = function (value) {
  // save camelize
  var snake   = _.snakeCase(value);
  var zero    = _.first(value);

  // keep safe first chars
  if (this.isSpecialChar(zero)) {
    snake = [ zero, snake ].join('');
  }

  // default statement
  return snake;
};

/**
 * Export Strings
 */
module.exports = new (Str)();

