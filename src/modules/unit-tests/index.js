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
function UnitTests () {}

/**
 * Generate type for unit tests
 *
 * @method generateTypeForUnitTests
 * @param {Array} types array of types to check and use
 * @param {Integer} nbArgs needed length of args for generation
 * @return {Array} array of type to use on calling function
 */
UnitTests.prototype.generateTypeForUnitTests = function (types, nbArgs) {
  // default type
  var dtypes  = [ null, undefined, 1, true, false, NaN, 'a', '', {}, [] ];

  types   = _.isArray(types) && !_.isEmpty(types) ? types : dtypes;
  nbArgs  = _.isNumber(nbArgs) && nbArgs > 0 ? nbArgs : 0;

  // define args
  var args  = [];

  // parse types
  _.each(types, function (t) {
    var fo = [];

    // parse args
    for (var i = 0; i < nbArgs; i++) {
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

