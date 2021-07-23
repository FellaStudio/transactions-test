import moment from 'moment-timezone';

const zone = "Europe/London";

export function getFormattedTime (date) {
  return moment.tz(date, zone).format('HH:mm');
}

export function getFormattedDate (date) {
  return moment.tz(date, zone).format('DD.MM.YY');
}

export function getTodayDate () {
  return moment().tz(zone).format('DD.MM.YY');
}

export function getYesterdayDate () {
  return moment().add(-1, 'days').tz(zone).format('DD.MM.YY');
}