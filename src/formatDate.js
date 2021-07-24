import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js';

export function getFormattedTime (date) {
  return moment(date).utcOffset(date).format('HH:mm');
}

export function getFormattedDate (date) {
  return moment(date).utcOffset(date).format('DD.MM.YY');
}

export function getTodayDate () {
  return moment().format('DD.MM.YY');
}

export function getYesterdayDate () {
  return moment().add(-1, 'days').format('DD.MM.YY');
}