/**
 * Unit tests
 */
var utils  = require('../dist/index.js');
var unit   = utils.get('unit');
var crypto = utils.get('crypto');
var chai   = require('chai').assert;
var expect = require('chai').expect;
var util   = require('util');
var _      = require('lodash');

crypto.logger.enableConsole(false);

describe('Crypto()', function() {
  describe('randomizedPassword() must return a string and must be a empty value with these params :  ', function() {
    var types = unit.generateTypeForUnitTests(null, 2);

    types.forEach(function(t) {
      it('Using type : ' + util.inspect(t, { depth : null }), function() {
        var p = crypto.randomizedPassword(t);

        chai.typeOf(p, 'string');
        expect(p).to.be.not.empty;
      });
    });
  });

  describe('randomizedPassword() must return a string and must not be a empty value with these params :  ', function() {
    var types = unit.generateTypeForUnitTests(null, 2);

    types.forEach(function(t) {
      it('Using type : ' + util.inspect(t, { depth : null }), function() {
        var p = crypto.randomizedPassword(10, t);

        chai.typeOf(p, 'string');
        expect(p).to.be.not.not.empty;
      });
    });
  });

  describe('encrypt() must be a boolean and return false with these params :  ', function() {
    var types = unit.generateTypeForUnitTests(undefined, 2);

    types.forEach(function(t) {
      it('Using type : ' + util.inspect(t, { depth : null }), function() {
        var p = crypto.encrypt.apply(crypto, t);

        chai.typeOf(p, 'boolean');
        chai.equal(p, false);
      });
    });
  });

  var d = [
    { keys : [ 'azertyazertyazertyazertyazertyazerty', 'machaine' ] },
    { keys : [ 'd41d8cd98f00b204e9800998ecf8427e', 'AAAAAAAAA' ] },
    { keys : [ '74be16979710d4c4e7c6647856088456', { a : 2 , b : 3 } ] },
    { keys : [ 'acf7ef943fdeb3cbfed8dd0d8f584731', [ { a : 2 } ] ] },
    { keys : [ '5a8dccb220de5c6775c873ead6ff2e43', 1 ] },
    { keys : [ 'azertyazertyazertyazertyazertyazerty', 'machaine', 'aes256' ] },
    { keys : [ 'd41d8cd98f00b204e9800998ecf8427e', 'AAAAAAAAA',  'aes256'  ] },
    { keys : [ '74be16979710d4c4e7c6647856088456', { a : 2 , b : 3 },  'aes256' ] },
    { keys : [ 'acf7ef943fdeb3cbfed8dd0d8f584731', [ { a : 2 } ],  'aes256' ] },
    { keys : [ '5a8dccb220de5c6775c873ead6ff2e43', 1,  'aes256' ] },
    { keys : [ 'azertyazertyazertyazertyazertyazerty', 'machaine', 'aes128' ] },
    { keys : [ 'd41d8cd98f00b204e9800998ecf8427e', 'AAAAAAAAA',  'aes128'  ] },
    { keys : [ '74be16979710d4c4e7c6647856088456', { a : 2 , b : 3 },  'aes128' ] },
    { keys : [ 'acf7ef943fdeb3cbfed8dd0d8f584731', [ { a : 2 } ],  'aes128' ] },
    { keys : [ '5a8dccb220de5c6775c873ead6ff2e43', 1,  'aes128' ] },
    { keys : [ 'azertyazertyazertyazertyazertyazerty', 'machaine', 'aes192' ] },
    { keys : [ 'd41d8cd98f00b204e9800998ecf8427e', 'AAAAAAAAA',  'aes192'  ] },
    { keys : [ '74be16979710d4c4e7c6647856088456', { a : 2 , b : 3 },  'aes192' ] },
    { keys : [ 'acf7ef943fdeb3cbfed8dd0d8f584731', [ { a : 2 } ],  'aes192' ] },
    { keys : [ '5a8dccb220de5c6775c873ead6ff2e43', 1,  'aes192' ] }
  ];

  d.forEach(function(data) {
    _.extend(data, { value : crypto.encrypt.apply(crypto, data.keys) } );
  });

  d.forEach(function(data) {
    describe([ 'encrypt() must be a string and not empty and value must equals to', data.value, 'with these params :' ].join(' '), function() {
      it('Using type : ' + util.inspect(data.keys, { depth : null }), function() {
        var p = crypto.encrypt.apply(crypto, data.keys);

        chai.typeOf(p, 'string');
        expect(p).to.be.not.empty;
        chai.equal(p, data.value);
      });
    });
  });

  describe('decrypt() must be a boolean and return false with these params :  ', function() {
    var types = unit.generateTypeForUnitTests(undefined, 2);

    types.forEach(function(t) {
      it('Using type : ' + util.inspect(t, { depth : null }), function() {
        var p = crypto.decrypt.apply(crypto, t);

        chai.typeOf(p, 'boolean');
        chai.equal(p, false);
      });
    });
  });

  d.forEach(function(data) {
    describe([ 'decrypt() must be equals', util.inspect(data.keys[1], { depth : null }), ', not empty / not false with these params :' ].join(' '), function() {

      var d = [ data.keys[0], data.value, data.keys[2] ];
      it('Using type : ' + util.inspect(d, { depth : null }), function() {
        var p = crypto.decrypt.apply(crypto, d);

        expect(p).to.eql(data.keys[1]);
      });
    });
  });
});
