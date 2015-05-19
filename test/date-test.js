/**
 * Unit tests
 */
var utils  = require('../dist/index.js');
var unit   = utils.get('unit');
var date   = utils.get('date');
var chai   = require('chai').assert;
var expect = require('chai').expect;
var util   = require('util');
var _      = require('lodash');

date.logger.enableConsole(false);

describe('Date()', function() {
  
  describe('generateList() must be an empty array with these params :  ', function() {
    var types = unit.generateTypeForUnitTests(undefined, 5);
    
    types.forEach(function(t) {
      it('Using type : ' + util.inspect(t, { depth : null }), function() { 
        var p = date.generateList.apply(date, t);
                
        chai.typeOf(p, 'array');
        expect(p).to.be.empty;    
      });
    });
  });

  var d = [
    { keys : [ 1970, 1975  ], value : [ 1970, 1971, 1972, 1973, 1974, 1975 ] },
    { keys : [ 1970, 1980  ], value : [ 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980 ] },
    { keys : [ 1970, 1975, 'A' ], value : [ 'A 1970', '1971', '1972', '1973', '1974', '1975' ] },
    { keys : [ 1970, 1975, 'A', 'B' ], value : [ 'A 1970', '1971', '1972', '1973', '1974', 'B 1975' ] },
    { keys : [ 1970, 1975, 'A', 'B', false ], value : [ 'A 1970', '1971', '1972', '1973', '1974', 'B 1975' ] },    
    { keys : [ 1970, 1975, 'A', 'B', true ], value : [ 'B 1975', '1974', '1973', '1972', '1971', 'A 1970' ] }    
  ];
  
  d.forEach(function(data) {
    describe([ 'generateList() must be an array equals to', util.inspect(data.value, { depth : null }), 'with these params :' ].join(' '), function() {
      it('Using type : ' + util.inspect(data.keys, { depth : null }), function() { 
        var p = date.generateList.apply(date, data.keys);
        
        chai.typeOf(p, 'array');
        expect(p).to.be.not.empty;
        expect(p).to.eql(data.value);
      });   
    }); 
  });
});