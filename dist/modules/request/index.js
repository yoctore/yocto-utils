"use strict";function Request(){}var _=require("lodash");Request.prototype.getHost=function(a){return!_.isUndefined(a)&&_.has(a,"protocol")&&_.has(a,"host")?_([a.protocol,a.get("x-forwarded-host")||a.get("x-forwarded-server")||a.get("host")||"localhost"]).join("://"):null},module.exports=new Request;