'use strict';

var _         = require('lodash');
var util      = require('util');

/**
 * Yocto utilities functions : Module String<br/>
 * Contains utility function to manipulate object
 *
 * For more details on these dependencies read links below :
 *
 * @date : 15/05/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 *
 * @class Object
 * @module Utils
 */
function Obj (string) {
  /**
   * Default obj util
   */
  this.objUtil = require('./objutil')(string);
}

/**
 * Rename key utility function. Parse an object from key and rename this key
 *
 * @param {Object} o object reference to use
 * @param {String} key reference key to use on object
 * @param {String} newKey to use on current object
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Obj.prototype.renameKey = function (o, key, newKey) {
  // nested check
  if (_.isObject(o) && _.isString(key) && _.isString(newKey)) {
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
 * Change object key given to a key name underscored
 *
 * @param {Object} o object reference to use
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Obj.prototype.underscoreKeys = function (o) {
  // default statement
  return this.objUtil.underscoreKeys(o);
};

/**
 * Change object key given to a key name camelized
 *
 * @param {Object} o object reference to use
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Obj.prototype.camelizeKeys = function (o) {
  // default statement
  return this.objUtil.camelizeKeys(o);
};

/**
 * Camelize full level of an object from mongoose request
 *
 * @param  {Object} data  Object to camelized keys
 * @return {Object}       the object camelized
 */
Obj.prototype.camelizeKeysMongoose = function (data) {

  return this.objUtil.camelizeKeys(JSON.parse(JSON.stringify(data.toObject())));
};

/**
 * Underscorize full level of an object from mongoose request
 *
 * @param  {Object} data  Object to Underscorized keys
 * @return {Object}       the object Underscorized
 */
Obj.prototype.underscorizeKeysMongoose = function (data) {

  return this.objUtil.underscoreKeys(JSON.parse(JSON.stringify(data.toObject())));
};

/**
 * A wrapper function to use node util inspect function with infine depth
 *
 * @param {Object} value mixed value to process
 * @param {Boolean} colorize true if we need color false otherwise
 * @return {String} data to a string reprsentation
 */
Obj.prototype.inspect = function (value, colorize) {

  // default colorize value
  colorize = !_.isUndefined(colorize) && _.isBoolean(colorize) ? colorize : true;

  // return value from inpect utilities
  return util.inspect(value, false, null, colorize);
};

/**
 * Export Strings
 */
module.exports = function (string) {
  // default statement
  return new (Obj)(string);
};
