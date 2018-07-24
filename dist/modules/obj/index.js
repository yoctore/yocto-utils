"use strict";var _=require("lodash"),util=require("util");function Obj(e){this.objUtil=require("./objutil")(e)}Obj.prototype.renameKey=function(e,t,o){if(_.isObject(e)&&_.isString(t)&&_.isString(o)){var i=_.clone(e),r=i[t];return delete i[t],_.set(i,o,r),i}return{}},Obj.prototype.underscoreKeys=function(e){return this.objUtil.underscoreKeys(e)},Obj.prototype.camelizeKeys=function(e){return this.objUtil.camelizeKeys(e)},Obj.prototype.camelizeKeysMongoose=function(e){return this.objUtil.camelizeKeys(JSON.parse(JSON.stringify(e.toObject())))},Obj.prototype.camelizeKeysMongooseCrypt=function(e){return this.objUtil.camelizeKeys(e.toObject())},Obj.prototype.underscorizeKeysMongoose=function(e){return this.objUtil.underscoreKeys(JSON.parse(JSON.stringify(e.toObject())))},Obj.prototype.inspect=function(e,t){return t=!(!_.isUndefined(t)&&_.isBoolean(t))||t,util.inspect(e,!1,null,t)},module.exports=function(e){return new Obj(e)};