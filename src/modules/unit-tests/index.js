'use strict';

var _ = require('lodash');

/**
 * Yocto utilities functions : Module UnitTests<br/>
 * Contains utility function to use during unit testing 
 *
 * For more details on these dependencies read links below :
 * - LodAsh : https://lodash.com/
 *
 * @date : 15/05/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 * @class UnitTests
 * @module Utils
 * @submodule UnitTests 
 */
function UnitTests() {}

/**
 * Generate type for unit tests 
 *
 * @method generateTypeForUnitTests
 * @param {Array} types array of types to check and use
 * @param {Integer} needed length of args for generation
 * @return {Array} array of type to use on calling function
 */
UnitTests.prototype.generateTypeForUnitTests = function(types, argsLength) {
  types       = _.isArray(types) && !_.isEmpty(types) ? types : [ null, undefined, 1, true, false, NaN, 'a', '', {}, [] ];
  argsLength  = _.isNumber(argsLength) && argsLength > 0 ? argsLength : 0;
  
  // define args
  var args  = [];

  // parse types
  _.each(types, function(t) {
    var fo = [];
    
    // parse args
    for(var i = 0; i < argsLength; i++) {
      fo[i] = t;
    }
    
    // adding args
    args.push(fo);
  });
  
  // return args
  return args;
};

/**
 * Export UnitTests
 */
module.exports = new (UnitTests)();