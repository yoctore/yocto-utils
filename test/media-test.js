/**
 * Unit tests
 */
var utils  = require('../dist/index.js');
var unit   = utils.get('unit');
var media   = utils.get('media');
var chai   = require('chai').assert;
var expect = require('chai').expect;
var util   = require('util');
var _      = require('lodash');

media.logger.enableConsole(false);

describe('Media()', function() {
  
  describe('isValidImageFormat() must return false with this data  ', function() {
    var types = unit.generateTypeForUnitTests(undefined, 1);
    
    // adding specific type
    types.push(['x-photoshop']);
    types.push(['tiff']);    
    types.push(['vnd.microsoft.icon']);   
    
    types.forEach(function(t) {
      it('Using type : ' + util.inspect(t, { depth : null }), function() { 
        var p = media.isValidImageFormat.apply(media, t);
                
        chai.typeOf(p, 'boolean');
        chai.equal(p, false);    
      });
    });
  });
  
  describe('isValidImageFormat() must return true with this data  ', function() {
    var types = [ 'jpg', 'png', 'jpeg', 'gif' ];
    
    types.forEach(function(t) {
      it('Using type : ' + util.inspect(t, { depth : null }), function() { 
        var p = media.isValidImageFormat(t);
                
        chai.typeOf(p, 'boolean');
        chai.equal(p, true);    
      });
    });
  });  
});