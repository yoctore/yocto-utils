"use strict";var _=require("lodash"),crypto=require("crypto");function Crypto(t,r){this.logger=t,this.str=r}Crypto.prototype.randomizedPassword=function(t,r){r=!_.isUndefined(r)&&_.isNumber(r)&&1<=r&&r<=3?r:3,t=_.isNumber(t)&&!_.isNaN(t)&&8<=t?t:8;for(var e=3===r?Math.round(t/4):0,i=2<=r?Math.round(t/4):0,n=t-e-i,s=this.str.generateAsciiCharsList(!0,!1,!1,!0),a=this.str.generateAsciiCharsList(!1,!1,!0,!1),o=this.str.generateAsciiCharsList(!1,!0,!1,!1),p={ascii:[],special:[],num:[]},c=0;c<t;c++){if(0<n&&p.ascii.length<n){var h=(Math.random()*(s.length-1)).toFixed(0);p.ascii.push(s[h])}if(0<i&&p.num.length<i){var y=(Math.random()*(o.length-1)).toFixed(0);p.num.push(o[y])}if(0<e&&p.special.length<e){var u=(Math.random()*(a.length-1)).toFixed(0);p.special.push(a[u])}}return(p=_.shuffle(_.union(p.ascii,p.special,p.num))).join("")},Crypto.prototype.encrypt=function(t,r,e){var i=!1;try{if(_.isEmpty(t)||t.length<32)throw"Key cannot be empty and must be 32 chars length min";var n=new Buffer(t,"utf-8").toString();r=JSON.stringify(r);var s=crypto.createCipher(e||"aes256",n);i=s.update(r,"utf-8","hex"),i+=s.final("hex")}catch(t){this.logger.verbose(["[ Utils.Crypto.encrypt ] -",t].join(" ")),i=!1}return i},Crypto.prototype.decrypt=function(r,e,i){var n=!1;try{if(_.isEmpty(r))throw"Key cannot be empty and must be a cypher key";var s=new Buffer(r,"utf-8").toString(),a=crypto.createDecipher(i||"aes256",s.toString());try{n=a.update(e,"hex","utf-8"),n+=a.final("utf-8")}catch(t){s=new Buffer(r,"hex").toString(),n=(a=crypto.createDecipher(i||"aes256",s.toString())).update(e,"hex","utf-8"),n+=a.final("utf-8")}n=JSON.parse(n)}catch(t){this.logger.verbose(["[ Utils.Crypto.decrypt ] -",t].join(" ")),n=!1}return n},Crypto.prototype.cryptDecryptInsideArray=function(r,t,e,i){return _.isArray(t)?_.map(t,function(t){return i?this.encrypt(r,t,e):this.decrypt(r,t,e)}.bind(this)):(this.logger.warning(["[ Utils.Crypto.cryptDecryptInsideArray ] -","cryptDecryptInsideArray must be used with an Array. A",typeof t,"was given."].join(" ")),i?this.encrypt(r,t,e):this.decrypt(r,t,e))},module.exports=function(t,r){return new Crypto(t,r)};