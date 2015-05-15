'use strict';

var _ = require('lodash');

/**
 * Yocto utilities functions : Module YDate<br/>
 * Contains utility function for date manipulation  
 *
 * For more details on these dependencies read links below :
 * - LodAsh : https://lodash.com/
 *
 * @date : 15/05/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 * @class YDate
 * @module Utils
 * @submodule YDate 
 */
function YDate() {}

/**
 * Utility function to build date list
 *
 * @method generateList
 * @param {Integer} min start value
 * @param {Integer} max end value
 * @param {String} prefixMin prefix to use on min value
 * @param {String} prefixMax prefix to use on max value
 * @param {Boolean} reverse true if we need to reverse array
 * @return {Array} list of date
 */
YDate.prototype.generateList = function(min, max, prefixMin, prefixMax, reverse) {
  var list  = [];
  var date  = new Date();

  // process correcty reverse and prefixs
  reverse   = !_.isNull(reverse) && _.isBoolean(reverse) ? reverse : false;
  prefixMin = !_.isUndefined(prefixMin) && !_.isNull(prefixMin) && _.isString(prefixMin) && !_.isEmpty(prefixMin) ? prefixMin : '';
  prefixMax = !_.isUndefined(prefixMax) && !_.isNull(prefixMax) && _.isString(prefixMax) && !_.isEmpty(prefixMax) ? prefixMax : '';
  
  // init with default value to prevent infinite loop
  max = max || date.getFullYear();
  min = min || 0;

  // process number
  for(var i = min; i <= max; i++) {
    list.push(i.toString());
  }

  // check is prefix is needed on list
  if (!_.isEmpty(prefixMin)) {
    list[0] = _([ prefixMin, list[0] ]).join(' ');
  }

  // check is prefix is needed on list
  if (!_.isEmpty(prefixMax)) {
    list[list.length - 1] = _([ prefixMax, list[list.length - 1] ] ).join(' ');
  }

  // return statement
  return reverse ? list.reverse() : list;
};

/**
 * Export YDate
 */
module.exports = new (YDate)();