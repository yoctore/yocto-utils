'use strict';

var _      = require('lodash');
var logger = require('yocto-logger'); 

/**
 * Yocto utilities functions : Module Multimedia<br/>
 * Contains utility function to manage multimedia process 
 *
 * For more details on these dependencies read links below :
 *
 * @date : 15/05/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 * @class Media
 * @module Utils
 * @submodule Media 
 */
function Media() {
  /**
   * Default logger
   *
   * @property logger
   * @type object
   */
  this.logger = logger;
}

/**
 * Check if is an allowed image type format<br/>
 * This Function only check file extention it's not checking file format metadata
 *
 * @method isValidImageFormat
 * @param {String} type to check
 * @return {Boolean} true if is correct false otherwise
 */
Media.prototype.isValidImageFormat = function(type) {

  // is valid type format ?
  if (!_.isUndefined(type) && !_.isNull(type) && _.isString(type)) {
    // process correct type
    type = _(['', type.toLowerCase(), '']).join('|');
  
    // return statement
    return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
  }

  // returning false if type is an invalid type 
  return false;
};

/**
 * Export Strings
 */
module.exports = new (Media)();