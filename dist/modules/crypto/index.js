"use strict";function Crypto(a,b){this.logger=a,this.str=b}var _=require("lodash"),crypto=require("crypto");Crypto.prototype.randomizedPassword=function(a,b){b=!_.isUndefined(b)&&_.isNumber(b)&&b>=1&&3>=b?b:3,a=_.isNumber(a)&&!_.isNaN(a)&&a>=8?a:8;for(var c=3===b?Math.round(a/4):0,d=b>=2?Math.round(a/4):0,e=a-c-d,f=this.str.generateAsciiCharsList(!0,!1,!1,!0),g=this.str.generateAsciiCharsList(!1,!1,!0,!1),h=this.str.generateAsciiCharsList(!1,!0,!1,!1),i={ascii:[],special:[],num:[]},j=0;a>j;j++){if(e>0&&i.ascii.length<e){var k=(Math.random()*(f.length-1)).toFixed(0);i.ascii.push(f[k])}if(d>0&&i.num.length<d){var l=(Math.random()*(h.length-1)).toFixed(0);i.num.push(h[l])}if(c>0&&i.special.length<c){var m=(Math.random()*(g.length-1)).toFixed(0);i.special.push(g[m])}}return i=_.shuffle(_.union(i.ascii,i.special,i.num)),i.join("")},Crypto.prototype.encrypt=function(a,b){var c=!1;try{if(_.isEmpty(a)||a.length<32)throw"Key cannot be empty and must be 32 chars length min";var d=new Buffer(a,"hex").toString();b=JSON.stringify(b);var e=crypto.createCipher("aes256",d);c=e.update(b,"utf-8","hex"),c+=e["final"]("hex")}catch(f){this.logger.warning(["[ Utils.Crypto.encrypt ] -",f].join(" ")),c=!1}return c},Crypto.prototype.decrypt=function(a,b){var c=!1;try{if(_.isEmpty(a))throw"Key cannot be empty and must be a cypher key";var d=new Buffer(a,"hex").toString(),e=crypto.createDecipher("aes256",d);c=e.update(b,"hex","utf-8"),c+=e["final"]("utf-8"),c=JSON.parse(c)}catch(f){this.logger.warning(["[ Utils.Crypto.decrypt ] -",f].join(" ")),c=!1}return c},module.exports=function(a,b){return new Crypto(a,b)};