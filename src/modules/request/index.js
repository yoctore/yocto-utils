'use strict';

var _       = require('lodash');
var logger  = require('yocto-logger');

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
 * @module Utils
 * @submodule Request 
 */
function Request() {
  /**
   * Default logger
   *
   * @property logger
   * @type object
   */
  this.logger = logger;
}

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

    // default host
    var host      = 'localhost';

    // default protocol
    var protocol  = 'http';

    // has get function ?
    if (_.has(request, 'get') && _.isFunction(request.get)) {
      // build protocol
      protocol  = [ request.get('protocol') || protocol, '' ].join('://');
      host      = (request.get('x-forwarded-host') || request.get('x-forwarded-server') || request.get('host') || host);     
    } else {
      // has no get function ?? try to access data from property name
      protocol  = [ request.protocol || protocol, '' ].join('://');
      host      = (request['x-forwarded-host'] || request['x-forwarded-server'] || request.host || host);           
    }

    // return correct builded host
    return _( [ protocol, host ] ).join('');
  }
  
  // return false if no data was founded
  return false;
};

/**
 * Export YDate
 */
module.exports = new (Request)();