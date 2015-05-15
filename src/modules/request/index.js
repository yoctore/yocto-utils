'use strict';

var _ = require('lodash');

/**
 * Yocto utilities functions : Module Request<br/>
 * Contains utility function for request/http manipulation  
 *
 * For more details on these dependencies read links below :
 * - LodAsh : https://lodash.com/
 *
 * @date : 15/05/2015
 * @author : Mathieu ROBERT <mathieu@yocto.re>
 * @copyright : Yocto SAS, All right reserved
 * @class Request
 */
function Request() {}

/**
 * Return the correct host from a request header. Implement x-forwarded rules
 * 
 * @method getHost
 * @param {Object} HTTP request object
 * @return {Mixed} Return the correct host from a request header, null if request is undefined
 */
Request.prototype.getHost = function(request) {
  // check request
  if (!_.isUndefined(request) && _.has(request, 'protocol') && _.has(request, 'host')) {
    return _( [request.protocol,  (request.get('x-forwarded-host') || request.get('x-forwarded-server') || request.get('host') || 'localhost') ] ).join('://');
  }
  
  // return null if no data was founded
  return null;
};

/**
 * Export YDate
 */
module.exports = new (Request)();