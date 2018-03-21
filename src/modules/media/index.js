'use strict';

var _      = require('lodash');

/**
 * Yocto utility functions : Module Media
 * Contains utility function for media tools
 *
 * @date 15/05/2015
 * @author Mathieu ROBERT <mathieu@yocto.re>
 * @copyright Yocto SAS, All right reserved
 *
 * @class Media
 * @module Utils
 */
function Media () {
  // Nothing to do here
}

/**
 * Check if is an allowed media type
 *
 * @param {String} type to check
 * @return {Boolean} true if is correct false otherwise
 */
Media.prototype.isValidImageFormat = function (type) {
  // Is valid type format ?
  if (!_.isUndefined(type) && !_.isNull(type) && _.isString(type)) {
    // Process correct type
    type = _([ '', type.toLowerCase(), '' ]).join('|');

    // Return statement
    return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
  }

  // Returning false if type is an invalid type
  return false;
};

/**
 * Export Strings
 */
module.exports = new Media();

