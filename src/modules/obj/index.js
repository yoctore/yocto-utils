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
 * @param {Object} string strings module instance
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
  // Nested check
  if (_.isObject(o) && _.isString(key) && _.isString(newKey)) {
    // Clone object
    var c     = _.clone(o);

    var value = c[key];

    // Remove non needed key
    delete c[key];

    // Set new key
    _.set(c, newKey, value);

    // Return object
    return c;
  }

  // Return a default object
  return {};
};

/**
 * Change object key given to a key name underscored
 *
 * @param {Object} o object reference to use
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Obj.prototype.underscoreKeys = function (o) {
  // Default statement
  return this.objUtil.underscoreKeys(o);
};

/**
 * Change object key given to a key name camelized
 *
 * @param {Object} o object reference to use
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Obj.prototype.camelizeKeys = function (o) {
  // Default statement
  return this.objUtil.camelizeKeys(o);
};

/**
 * Change object key given to a key name underscored for an Mongoose object
 *
 * @param  {Object} o object reference to use
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Obj.prototype.camelizeKeysMongoose = function (o) {
  // Default statement
  return this.objUtil.camelizeKeys(JSON.parse(JSON.stringify(o.toObject())));
};

/**
 * Change object key given to a key name underscored for an Mongoose object that are use
 * Yocto-mongoose crypt
 *
 * @param  {Object} o object reference to use
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Obj.prototype.camelizeKeysMongooseCrypt = function (o) {
  // Default statement
  return this.objUtil.camelizeKeys(o.toObject());
};

/**
 * Change object key given to a key name camelized for an Mongoose object
 *
 * @param  {Object} o object reference to use
 * @return {Object} object to use. empty object if required checking format is invalid
 */
Obj.prototype.underscorizeKeysMongoose = function (o) {
  // Default statement
  return this.objUtil.underscoreKeys(JSON.parse(JSON.stringify(o.toObject())));
};

/**
 * A wrapper function to use node util inspect function with infine depth
 *
 * @param {Object} value mixed value to process
 * @param {Boolean} colorize true if we need color false otherwise
 * @return {String} data to a string reprsentation
 */
Obj.prototype.inspect = function (value, colorize) {
  // Default colorize value
  colorize = !_.isUndefined(colorize) && _.isBoolean(colorize) ? colorize : true;

  // Return value from inpect utilities
  return util.inspect(value, false, null, colorize);
};

/**
 * Export Strings
 *
 * @param {Object} string strings module instance
 * @return {Object} instance of Obj class
 */
module.exports = function (string) {
  // Default statement
  return new Obj(string);
};
