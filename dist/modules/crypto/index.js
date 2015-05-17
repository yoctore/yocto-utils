"use strict";function Crypto(){this.logger=logger}var _=require("lodash"),crypto=require("crypto"),logger=require("yocto-logger");Crypto.prototype.randomizedPassword=function(a,b){b=_.isUndefined(b)||_.isNull(b)||!_.isString(b)||_.isEmpty(b)?"qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890&(!-_%<>":b,a=!_.isUndefined(b)&&!_.isNull(b)&&_.isNumber(a)&&!_.isNaN(a)&&a>=0?a:0;var c=(Math.random()*(b.length-1)).toFixed(0);return a>0?b[c]+this.randomizedPassword(a-1,b):""},Crypto.prototype.encrypt=function(a,b){var c=!1;try{if(_.isEmpty(a)||a.length<32)throw"Key cannot be empty and must be 32 chars length min";b=JSON.stringify(b);var d=crypto.createCipher("aes256",a);c=d.update(b,"utf-8","hex"),c+=d["final"]("hex")}catch(e){this.logger.warning(["[ Utils.Crypto.encrypt ] -",e].join(" "))}return c},Crypto.prototype.decrypt=function(a,b){var c=!1;try{if(_.isEmpty(a))throw"Key cannot be empty and must be a cypher key";var d=crypto.createDecipher("aes256",a);c=d.update(b,"hex","utf-8"),c+=d["final"]("utf-8"),c=JSON.parse(c)}catch(e){this.logger.warning(["[ Utils.Crypto.decrypt ] -",e].join(" "))}return c},module.exports=new Crypto;