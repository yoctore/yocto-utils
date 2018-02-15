'use strict';

var _         = require('lodash');

/**
 * Yocto utilities functions : Object util part<br/>
 * Contains utility function for main object module
 *
 * For more details on these dependencies read links below :
 *
 * @date : 03/11/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 *
 * @class ObjUtil
 * @module Utils
 *
 * @param {Object} string Default string instance
 */
function ObjUtil (string) {
  /**
   * Default string instance
   */
  this.str = string;

  /**
   * Default camelize state
   */
  this.camelize = true;

  /**
   * Default underscore state
   */
  this.underscorize = true;
}

/**
 * Camelize keys (full depth)
 *
 * @param {Object} obj default object to process
 * @return {Object} object camelized
 */
ObjUtil.prototype.camelizeKeys = function (obj) {
  // Change state
  this.camelize = true;
  this.underscorize = !this.camelize;

  // Default statement
  return this.walk(obj);
};

/**
 * Undersore keys (full depth)
 *
 * @param {Object} obj default object to process
 * @return {Object} object camelized
 */
ObjUtil.prototype.underscoreKeys = function (obj) {
  // Change state
  this.camelize = false;
  this.underscorize = !this.camelize;

  // Default statement
  return this.walk(obj);
};

/**
 * Default function to parse and object recursivly
 *
 * @param {Object} obj default object to process
 * @return {Object} default object processed
 */
ObjUtil.prototype.walk = function (obj) {
  // First test
  if (!obj || !_.isObject(obj)) {
    // Default statement
    return obj;
  }

  // Second test
  if (_.isDate(obj) || _.isRegExp(obj)) {
    return obj;
  }

  // Third test
  if (_.isArray(obj)) {
    // Map
    return _.map(obj, this.walk.bind(this));
  }

  // Is Joi object ?
  if (_.has(obj, 'isJoi')) {
    return obj;
  }

  // Default statement
  return _.reduce(Object.keys(obj), function (acc, key) {
    // Camelcase
    var state = this.camelize ? this.str.camelCase(key) : this.str.underscore(key);

    // Assign

    acc[state] = this.walk(obj[key]);

    // Return item
    return acc;
  }.bind(this), {});
};

/**
 * Default export
 *
 * @param {Object} string the default string instance
 * @return {Object} the instance of Obj utils
 */
module.exports = function (string) {
  // Default statement
  return new ObjUtil(string);
};
