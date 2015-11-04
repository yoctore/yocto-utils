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
 */
function ObjUtil (string) {
  /**
   * Default string instance
   */
  this.str = string;
  /**
   * Default camelize state
   */
  this.camelize     = true;
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
  // change state
  this.camelize     = true;
  this.underscorize = !this.camelize;
  // default statement
  return this.walk(obj);
};

/**
 * Undersore keys (full depth)
 *
 * @param {Object} obj default object to process
 * @return {Object} object camelized
 */
ObjUtil.prototype.underscoreKeys = function (obj) {
  // change state
  this.camelize     = false;
  this.underscorize = !this.camelize;
  // default statement
  return this.walk(obj);
};

/**
 * Default function to parse and object recursivly
 *
 * @param {Object} obj default object to process
 * @return {Object} default object processed
 */
ObjUtil.prototype.walk = function (obj) {
  // first test
  if (!obj || !_.isObject(obj)) {
    // default statement
    return obj;
  }

  // second test
  if (_.isDate(obj) || _.isRegExp(obj)) {
    return obj;
  }

  // third test
  if (_.isArray(obj)) {
    // map
    return _.map(obj, this.walk);
  }

  // is Joi object ?
  if (_.has(obj, 'isJoi')) {
    return obj;
  }

  // default statement
  return _.reduce(Object.keys(obj), function (acc, key) {
    // camelcase
    var state = (this.camelize ? this.str.camelCase(key) : this.str.underscore(key));
    // assign
    acc[state] = this.walk(obj[key]);

    // return item
    return acc;
  }.bind(this), {});
};

/**
 * Default export
 */
module.exports = function (string) {
  // default statement
  return new (ObjUtil)(string);
};
