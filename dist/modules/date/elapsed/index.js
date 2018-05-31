"use strict";var moment=require("moment"),_=require("lodash");function ElapsedTime(){return this}ElapsedTime.prototype.get=function(e,i){if(_.isUndefined(e)||!_.isObject(e))throw"Invalid config given. Config must be an object";if(this.config=e,!moment(Date.parse(i)).isValid())throw"Invalid date given. Cannot continue";this.current=moment(Date.parse(i));var n=this.getLimitDate(this.current);return n.diff(moment())<0?"expired":this.calculDifference(moment(),n,0,!0)},ElapsedTime.prototype.isBankHoliday=function(e){if(!moment.isMoment(e))throw"Given value is not a valid moment date in isBankHoliday";var i=this.current.format("DD/MM");return _.isUndefined(e)||(i=e.format("DD/MM")),_.includes(this.config.closed.date,i)},ElapsedTime.prototype.isNoWorkingDay=function(e){if(!moment.isMoment(e))throw"Given value is not a valid moment date in isNotWorkingDay";var i=this.current.format("E");return _.isUndefined(e)||(i=e.format("E")),_.includes(this.config.closed.day,i)},ElapsedTime.prototype.isEndOrBeginOfWeek=function(e,i){if(!moment.isMoment(e))throw"Given value is not a valid moment date in isEndOrBeginOfWeek";i=!!_.isBoolean(i)&&i;var n=this.current.format("E");return _.isUndefined(e)||(n=e.format("E")),_.includes(i?this.config.endDayOfWeek:this.config.beginDayOfWeek,n)},ElapsedTime.prototype.findNextValidDay=function(e){if(!moment.isMoment(e))throw"Given value is not a valid moment date in findNextValidDay";return this.isBankHoliday(e)||this.isNoWorkingDay(e)?this.findNextValidDay(e.add(1,"d").hours(this.config.scheduleOpen.hours).minutes(this.config.scheduleOpen.minutes).seconds(this.config.scheduleOpen.seconds)):e},ElapsedTime.prototype.getLimitDate=function(e){var i="";return i=e?this.findNextValidDay(e):this.findNextValidDay(moment(this.current)),this.isBetweenOpenPlanning(i)?this.hasEnoughTime(i):this.getLimitDate(this.processCorrectTime(i))},ElapsedTime.prototype.isBetweenOpenPlanning=function(e){var i=moment(e).hours(this.config.scheduleOpen.hours).minutes(this.config.scheduleOpen.minutes).seconds(this.config.scheduleOpen.seconds),n=moment(e).hours(this.config.scheduleClose.hours).minutes(this.config.scheduleClose.minutes).seconds(this.config.scheduleClose.seconds);return e.isSameOrAfter(i)&&e.isSameOrBefore(n)},ElapsedTime.prototype.hasEnoughTime=function(e,i){var n=e,s="";s=e&&i?moment(n).add(i):moment(n).add(this.config.maxResponseDelay.value,this.config.maxResponseDelay.unit);var t=moment(n).hours(this.config.scheduleClose.hours).minutes(this.config.scheduleClose.minutes).seconds(this.config.scheduleClose.seconds),o=s.diff(t);if(o>0){var d=moment(n).add(1,"d").hours(this.config.scheduleOpen.hours).minutes(this.config.scheduleOpen.minutes).seconds(this.config.scheduleOpen.seconds);return this.hasEnoughTime(this.findNextValidDay(d),o)}return s},ElapsedTime.prototype.processCorrectTime=function(e){var i=moment(e).hours(this.config.scheduleOpen.hours).minutes(this.config.scheduleOpen.minutes).seconds(this.config.scheduleOpen.seconds),n=moment(e).hours(this.config.scheduleClose.hours).minutes(this.config.scheduleClose.minutes).seconds(this.config.scheduleClose.seconds);return e.isBefore(i)?moment(e).hours(this.config.scheduleOpen.hours).minutes(this.config.scheduleOpen.minutes).seconds(this.config.scheduleOpen.seconds):e.isAfter(n)?moment(e).add(1,"d").hours(this.config.scheduleOpen.hours).minutes(this.config.scheduleOpen.minutes).seconds(this.config.scheduleOpen.seconds):void 0},ElapsedTime.prototype.calculDifference=function(e,i,n,s){var t,o=this.findNextValidDay(e);return!this.isBetweenOpenPlanning(o)&&o.isBefore(i)?(s&&0===n?(s=!1,t=o.add(1,"h").minutes(0).seconds(0)):t=o.add(1,"h"),this.calculDifference(t,i,n,s)):o.isBefore(i)?(n++,this.calculDifference(o.add(1,"h"),i,n,s)):moment().hour(n).minutes(0).second(0).subtract(o.diff(i)).format("HH:mm:ss")},module.exports=new ElapsedTime;