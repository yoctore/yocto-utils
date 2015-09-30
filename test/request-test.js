/**
 * Unit tests
 */
var utils   = require('../dist/index.js');
var unit    = utils.get('unit');
var request = utils.get('request');
var chai    = require('chai').assert;
var expect  = require('chai').expect;
var util    = require('util');
var _       = require('lodash');

describe('Request()', function() {
  
  describe('getHost() must return false with this data  ', function() {
    var types = unit.generateTypeForUnitTests(undefined, 1);
    
    types.forEach(function(t) {
      it('Using type : ' + util.inspect(t, { depth : null }), function() { 
        var p = request.getHost.apply(request, t);
                
        chai.typeOf(p, 'boolean');
        chai.equal(p, false);    
      });
    });
  });
  
  var datas = [
    { keys : [ { protocol : 'http', host : '', 'x-forwarded-host' : '', 'x-forwarded-server' : '' } ], value : 'http://localhost' },
    { keys : [ { protocol : 'https', host : '127.0.0.1', 'x-forwarded-host' : '', 'x-forwarded-server' : '' } ], value : 'https://127.0.0.1' },
    { keys : [ { protocol : 'https', host : '127.0.0.1', 'x-forwarded-host' : 'my-x-forwarded-host', 'x-forwarded-server' : '' } ], value : 'https://my-x-forwarded-host' },
    { keys : [ { protocol : 'http', host : '127.0.0.1', 'x-forwarded-host' : '', 'x-forwarded-server' : 'my-x-forwarded-server' } ], value : 'http://my-x-forwarded-server' },
    { keys : [ { protocol : 'http', host : '127.0.0.1', 'x-forwarded-host' : 'my-x-forwarded-host', 'x-forwarded-server' : 'my-x-forwarded-server' } ], value : 'http://my-x-forwarded-host' }         
  ];
  
  datas.forEach(function(data) {
    describe([ 'getHost() must return', data.value, 'with this data' ].join(' '), function() {
      it('Using type : ' + util.inspect(data.keys, { depth : null }), function() { 
        var p = request.getHost.apply(request, data.keys);
                  
        chai.typeOf(p, 'string');
        chai.equal(p, data.value);    
      });
    });
  });
  
  
   
});