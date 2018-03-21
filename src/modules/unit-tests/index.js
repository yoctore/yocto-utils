'use strict';

var _ = require('lodash');

/**
 * Yocto utility functions : Module Unit Tests
 * Contains utility function for unit tests tools
 *
 * @date 15/05/2015
 * @author Mathieu ROBERT <mathieu@yocto.re>
 * @copyright Yocto SAS, All right reserved
 *
 * @class Crypto
 * @module Utils
 */
function UnitTests () {
  // Nothing to do here
}

/**
 * Generate type for unit tests
 *
 * @method generateTypeForUnitTests
 * @param {Array} types array of types to check and use
 * @param {Integer} nbArgs needed length of args for generation
 * @return {Array} array of type to use on calling function
 */
UnitTests.prototype.generateTypeForUnitTests = function (types, nbArgs) {
  // Default type
  var dtypes  = [ null, anUndefinedVar, 1, true, false, NaN, 'a', '', {}, [] ];

  types = _.isArray(types) && !_.isEmpty(types) ? types : dtypes;
  nbArgs = _.isNumber(nbArgs) && nbArgs > 0 ? nbArgs : 0;

  // Define args
  var args  = [];

  // Parse types
  _.each(types, function (t) {
    var fo = [];

    // Parse args
    for (var i = 0; i < nbArgs; i++) {
      fo[i] = t;
    }

    // Adding args
    args.push(fo);
  });

  // Return args
  return args;
};

/**
 * Export UnitTests
 */
module.exports = new UnitTests();

