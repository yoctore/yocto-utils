'use strict';

var _ = require('lodash');

/**
 * Yocto utility functions : Module Request
 * Contains utility function for request manipulation
 *
 * @date 15/05/2015
 * @author Mathieu ROBERT <mathieu@yocto.re>
 * @copyright Yocto SAS, All right reserved
 *
 * @class Crypto
 * @module Utils
 */
function Request () {}

/**
 * Return the correct host from a request header. Implement x-forwarded rules
 *
 * @method getHost
 * @param {Object} request HTTP request object
 * @return {String|Boolean} Return the correct host from request ,object false is undefined
 */
Request.prototype.getHost = function (request) {
  // default headers
  var headers = _.has(request, 'headers') && _.isObject(request.headers) ? request.headers : false;
  // default host
  var host      = 'localhost';

  if (headers) {
    // default statement
    headers = (headers['x-forwarded-host'] || headers['x-forwarded-server']
                                           || headers.host || host);
  }
  // default statement
  return headers;
};

/**
 * Export YDate
 */
module.exports = new (Request)();
