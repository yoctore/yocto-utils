'use strict';

var moment = require('moment');
var _      = require('lodash');

/**
 * Manage process to get elapsedTime from a given date
 */
function ElapsedTime () {}

/**
 * Get correct elaptimeTime from current moment
 *
 * @param {Object} config configration needed to process the main process (no working day, etc)
 * @param {Object} t current date to use for the main process
 * @return {String} formatted date to string format
 */
ElapsedTime.prototype.get = function (config, t) {

  // check if config a on a valid format
  if (_.isUndefined(config) || !_.isObject(config)) {
    throw 'Invalid config given. Config must be an object';
  }

  // Set & Save config
  this.config = config;

  // check first is a valid date
  if (!moment(Date.parse(t)).isValid()) {
    // throw exception on error
    throw 'Invalid date given. Cannot continue';
  }

  // set current date with given date
  this.current = moment(Date.parse(t));
  // Get the limitDate
  var getLimitDate = this.getLimitDate(this.current);
  // process difference
  var difference = getLimitDate.diff(moment());

  // Check if time is expired time
  if (difference < 0) {
    // default statement on expired
    return 'expired';
  }

  // default statement, get the correct time
  return this.calculDifference(moment(), getLimitDate, 0, true);
};

/**
 * Check if current date is a bank holiday
 *
 * @param {Object} value current date value to check
 * @return {Boolean} true if is a bank holiday false otherwise
 */
ElapsedTime.prototype.isBankHoliday = function (value) {

  // is a valid moment date ?
  if (!moment.isMoment(value)) {
    throw 'Given value is not a valid moment date in isBankHoliday';
  }

  // get formatted date
  var formatted = this.current.format('DD/MM');
  // given date ?
  if (!_.isUndefined(value)) {
    formatted = value.format('DD/MM');
  }

  // default statement
  return _.includes(this.config.closed.date, formatted);
};

/**
 * Check if current date is a no working day
 *
 * @param {Object} value current date value to check
 * @return {Boolean} true if is a no working day false otherwise
 */
ElapsedTime.prototype.isNoWorkingDay = function (value) {

  // is a valid moment date ?
  if (!moment.isMoment(value)) {
    throw 'Given value is not a valid moment date in isNotWorkingDay';
  }

  // get formatted date
  var formatted = this.current.format('E');
  // given date ?
  if (!_.isUndefined(value)) {
    formatted = value.format('E');
  }
  // default statement
  return _.includes(this.config.closed.day, formatted);
};

/**
 * Check if the end of current week
 *
 * @param {Object} value current date value to check
 * @param {Boolean} isEnd true if is end of week false otherwise
 * @return {Boolean} true if is given day is the end of the week
 */
ElapsedTime.prototype.isEndOrBeginOfWeek = function (value, isEnd) {

  // is a valid moment date ?
  if (!moment.isMoment(value)) {
    throw 'Given value is not a valid moment date in isEndOrBeginOfWeek';
  }

  // normalize isend valud
  isEnd = _.isBoolean(isEnd) ? isEnd : false;

  // get formatted date
  var formatted = this.current.format('E');
  // given date ?
  if (!_.isUndefined(value)) {
    formatted = value.format('E');
  }

  // default statement
  return _.includes(isEnd ? this.config.endDayOfWeek :
                    this.config.beginDayOfWeek, formatted);
};

/**
 * Found next valid date for processing
 *
 * @param {Object} value a valid date object build with moment
 * @return {Object} founded date
 */
ElapsedTime.prototype.findNextValidDay = function (value) {

  // is a valid moment date ?
  if (!moment.isMoment(value)) {
    throw 'Given value is not a valid moment date in findNextValidDay';
  }

  // check and find
  if (this.isBankHoliday(value) || this.isNoWorkingDay(value)) {
    // find & add one day to given date for checking
    return this.findNextValidDay(value
      .add(1, 'd')
      .hours(this.config.scheduleOpen.hours)
      .minutes(this.config.scheduleOpen.minutes)
      .seconds(this.config.scheduleOpen.seconds)
    );
  } else {
    // return founded date
    return value;
  }
};

/**
 * Get default limit date from defined rules
 *
 * @param {Object} newDate of the newDate for recursive
 * @return {Object} default moment object
 */
ElapsedTime.prototype.getLimitDate = function (newDate) {
  // Init b var
  var b = '';
  // Check if newDate param exist
  if (newDate) {
    // Search next valid day
    b = this.findNextValidDay(newDate);
  } else {
    // Search next valid day
    b = this.findNextValidDay(moment(this.current));
  }
  // is between define schedule time ?
  if (this.isBetweenOpenPlanning(b)) {
    // has enough time ?
    return this.hasEnoughTime(b);
  } else {
    // get the limit
    return this.getLimitDate(this.processCorrectTime(b));
  }

  // default statement
  return this.current;
};

/**
 * Check if current is in define schedule time
 *
 * @param {Object} b the date to test
 * @return {Boolean} true if current time is defined schedule time
 */
ElapsedTime.prototype.isBetweenOpenPlanning = function (b) {
  // build begin time
  var begin = moment(b).hours(this.config.scheduleOpen.hours)
    .minutes(this.config.scheduleOpen.minutes)
    .seconds(this.config.scheduleOpen.seconds);

  // build end time
  var end = moment(b).hours(this.config.scheduleClose.hours)
    .minutes(this.config.scheduleClose.minutes)
    .seconds(this.config.scheduleClose.seconds);

  // default statement
  return b.isSameOrAfter(begin) && b.isSameOrBefore(end);
};

/**
 * Check if has enough time to respond
 *
 * @param {Object} initDate initial date use for recursive
 * @param {Object} diff the diff between the limitDate and the end of the day Date
 * @return {Boolean} true if has enough time false otherwise
 */
ElapsedTime.prototype.hasEnoughTime = function (initDate, diff) {
  // Assign the newDate to the date var
  var date = initDate;
  // Init the end var
  var end = '';
  // if the params newDate & diff exist
  if (initDate && diff) {
    // Add the diff to the date & assign to the end var
    end = moment(date)
      .add(diff);
  } else {
    // Add the maxResponseDelay to the date & assign to the end var
    end = moment(date)
      .add(this.config.maxResponseDelay.value, this.config.maxResponseDelay.unit);
  }

  // end of the day
  var endDay = moment(date).hours(this.config.scheduleClose.hours)
    .minutes(this.config.scheduleClose.minutes)
    .seconds(this.config.scheduleClose.seconds);

  // process difference
  var difference = end.diff(endDay);

  // If the difference is positive
  if (difference > 0) {
    // add one day because the time exceed the scheduleClose
    var newDate = moment(date)
      .add(1, 'd')
      .hours(this.config.scheduleOpen.hours)
      .minutes(this.config.scheduleOpen.minutes)
      .seconds(this.config.scheduleOpen.seconds);
    // Retrieve a new validDay and reload hasEnoughTime function
    return this.hasEnoughTime(this.findNextValidDay(newDate), difference);
  // Else return the value
  } else {
    // Return the good value
    return end;
  }
};

/**
 * Build correct litmit time from given rules
 *
 * @param {Object} b the date to test
 */
ElapsedTime.prototype.processCorrectTime = function (b) {
  // build begin time
  var begin = moment(b).hours(this.config.scheduleOpen.hours)
    .minutes(this.config.scheduleOpen.minutes)
    .seconds(this.config.scheduleOpen.seconds);

  // build end time
  var end = moment(b).hours(this.config.scheduleClose.hours)
    .minutes(this.config.scheduleClose.minutes)
    .seconds(this.config.scheduleClose.seconds);
  // Check if the time is before the the begin
  if (b.isBefore(begin)) {
    return moment(b).hours(this.config.scheduleOpen.hours)
      .minutes(this.config.scheduleOpen.minutes)
      .seconds(this.config.scheduleOpen.seconds);
  }
  // Check if the time is after the the end
  if (b.isAfter(end)) {
    return moment(b)
      .add(1, 'd')
      .hours(this.config.scheduleOpen.hours)
      .minutes(this.config.scheduleOpen.minutes)
      .seconds(this.config.scheduleOpen.seconds);
  }
};

/**
 * Calcul the real difference between LimitDate and actual date
 *
 * @param {Object} actualDate the actualDate
 * @param {Object} limitDate the limitDate to respond the demand
 * @param {Object} difference the hourDifference between the actualDate and the limitDate
 * @param {Boolean} firstPassage of the validDate
 * @return {String} formatted string
 */
ElapsedTime.prototype.calculDifference =
  function (actualDate, limitDate, difference, firstPassage) {
  // Find a valid day from the actualDate
  var validDate = this.findNextValidDay(actualDate);

  // Check if the validDate is not BetweenOpenPlanning & if isBefore the limitDate
  if (!this.isBetweenOpenPlanning(validDate) && validDate.isBefore(limitDate)) {
    // Init the newValiDate var
    var newValiDate;
    // Check if the firstPassage is true and if the difference is equal to 0
    if (firstPassage && difference === 0) {
      // Set false the firstPassage
      firstPassage = false;
      // Add 1h at newValidate and reset the minutes and seconds
      newValiDate = validDate.add(1,'h').minutes(0).seconds(0);
    } else {
      // Add 1h at newValidate
      newValiDate = validDate.add(1,'h');
    }
    // Reload the function and add 1 hours to the date
    return this.calculDifference(newValiDate, limitDate, difference, firstPassage);
  // Check if the Date isBefore the limitDate
  } else if (validDate.isBefore(limitDate)) {
    // add + 1 to the difference var
    difference++;
    // Reload the function and add 1 hours to the date
    return this.calculDifference(validDate.add(1,'h'), limitDate, difference, firstPassage);
  } else {
    // Subtract the diff of validDate and the limitDate to the difference
    return moment().hour(difference).minutes(0).second(0)
           .subtract(validDate.diff(limitDate)).format('HH:mm:ss');
  }
};

/**
 * Export ElapsedTime
 */
module.exports = new (ElapsedTime)();
