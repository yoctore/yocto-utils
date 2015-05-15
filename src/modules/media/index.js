'use strict';

var _ = require('lodash');

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
function Media() {}

/**
 * Check if is an allowed image type format<br/>
 * This Function only check file extention it's not checking file format metadata
 *
 * @method isValidImageFormat
 * @param {String} type to check
 * @return {Boolean} true if is correct false otherwise
 */
Media.prototype.isValidImageFormat = function(type) {
  // process correct type
  type = _(['', type.toLowerCase(), '']).join('|');

  // return statement
  return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
};

/**
 * Export Strings
 */
module.exports = new (Media)();