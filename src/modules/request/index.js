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
      host      = (request.get('x-forwarded-host') ||
                  request.get('x-forwarded-server') ||
                  request.get('host') || host);
    } else {
      // has no get function ?? try to access data from property name
      protocol  = [ request.protocol || protocol, '' ].join('://');
      host      = (request['x-forwarded-host'] ||
                  request['x-forwarded-server'] ||
                  request.host ||
                  host);
    }

    // return correct builded host
    return _([ protocol, host ]).join('');
  }

  // return false if no data was founded
  return false;
};

/**
 * Export YDate
 */
module.exports = new (Request)();
