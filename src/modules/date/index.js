'use strict';

var _       = require('lodash');
var joi     = require('joi');
var logger  = require('yocto-logger');
var util    = require('util');

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
function YDate() {
  /**
   * Default logger
   *
   * @property logger
   * @type object
   */
  this.logger = logger;
}

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
  // default list
  var list = [];
  
  try {
    // default date
    var date        = new Date();

    // validation schema
    var minSchema   = joi.number().required().min(1970);
    var maxSchema   = joi.number().required().min(1970).max(date.getFullYear());
    
    // validate
    var minValidation = joi.validate(min, minSchema);
    var maxValidation = joi.validate(max, maxSchema);

    // has errors throw it !!!
    if (!_.isNull(minValidation.error)) {
      throw util.inspect(minValidation.error.details, { depth : null } );
    }

    if (!_.isNull(maxValidation.error)) {
      throw util.inspect(maxValidation.error.details, { depth : null } );
    }
     
    // process correcty reverse and prefixs
    reverse   = !_.isNull(reverse) && _.isBoolean(reverse) ? reverse : false;
    prefixMin = !_.isUndefined(prefixMin) && !_.isNull(prefixMin) && _.isString(prefixMin) && !_.isEmpty(prefixMin) ? prefixMin : '';
    prefixMax = !_.isUndefined(prefixMax) && !_.isNull(prefixMax) && _.isString(prefixMax) && !_.isEmpty(prefixMax) ? prefixMax : '';
    
    // init with default value to prevent infinite loop
    max = max || date.getFullYear();
    min = min || date.getFullYear();
  
    // process number
    for(var i = min; i <= max; i++) {
      var mI = i;

      // if we had prefix we must transform date to a correction string value
      if (!_.isEmpty(prefixMin) || !_.isEmpty(prefixMax)) {
        mI = mI.toString();
      }
      
      // push it
      list.push(mI);
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
  } catch (e) {
      this.logger.warning([ '[ YDate.generateList ] - An occured, and error is :', e ].join(' '));
  }

  // return default array
  return list;
};

/**
 * Export YDate
 */
module.exports = new (YDate)();