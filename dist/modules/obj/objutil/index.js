"use strict";var _=require("lodash");function ObjUtil(e){this.str=e,this.camelize=!0,this.underscorize=!0}ObjUtil.prototype.camelizeKeys=function(e){return this.camelize=!0,this.underscorize=!this.camelize,this.walk(e)},ObjUtil.prototype.underscoreKeys=function(e){return this.camelize=!1,this.underscorize=!this.camelize,this.walk(e)},ObjUtil.prototype.walk=function(t){return t&&_.isObject(t)?_.isDate(t)||_.isRegExp(t)?t:_.isArray(t)?_.map(t,this.walk.bind(this)):_.has(t,"isJoi")?t:_.reduce(Object.keys(t),function(e,i){return e[this.camelize?this.str.camelCase(i):this.str.underscore(i)]=this.walk(t[i]),e}.bind(this),{}):t},module.exports=function(e){return new ObjUtil(e)};