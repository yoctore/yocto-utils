"use strict";function Request(){}var _=require("lodash");Request.prototype.getHost=function(e){var r=!(!_.has(e,"headers")||!_.isObject(e.headers))&&e.headers;return r&&(r=r["x-forwarded-host"]||r["x-forwarded-server"]||r.host||"localhost"),r},module.exports=new Request;