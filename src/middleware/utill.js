import {matUmbrella} from "@quasar/extras/material-icons";

function digitize(hours, minutes) {
  hours = Math.floor(hours);
  return (hours > 9 ? hours : '0' + Math.floor(hours)) + ':' + (minutes > 9 ? minutes : '0' + Math.floor(minutes));
}

function digitizeSingle(time) {
  return time > 9 ? time : '0' + time
}

function toMinutes(hours) {
  return Math.ceil(((hours < 1.0) ? hours : (hours % Math.floor(hours))) * 60);
}

function calcDuration(s, e) {
  const startHour= Number.parseInt(s[0]);
  const startMinute= Number.parseInt(s[1]);
  const endHour= Number.parseInt(e[0]);
  const endMinute= Number.parseInt(e[1]);
  const minutes = (endMinute - startMinute ? endMinute -startMinute : 60 -endMinute +startMinute)*60;
  const subHours = minutes < 0 ? 1 : 0;
  const hours = (endHour - startHour ? endHour -startHour : 24 -endHour +startHour)*3600;
  return (hours + minutes -subHours)*1000
}

function paydayCalc(overSettings, hours, wage) {
  let sum = 0;
  for (const wave of overSettings) {
    if (hours > 0) {
      if (hours > wave.numOfHours) {
        sum += wave.numOfHours * wave.percentage * wage;
        hours -= wave.numOfHours;
      } else {
        sum += hours * wave.percentage * wage;
        break;
      }
    } else {
      break;
    }
  }
  return sum;
}

function generatePayday(duration,wage){
  return duration/3600000*wage;
}

function makeShiftFromClock(data,wage) {
  const start = new Date(data.start);
  const end = new Date(data.end);
  const durationMinutes = ((data.duration/60000)%60).toFixed(0);
  const durationHours = (data.duration - durationMinutes)/3600000
  return {
    date: start.getDate() + '/' + (start.getMonth()+1) + '/' + start.getFullYear(),
    day: start.getDate(),
    duration: data.duration,
    durationTimeFormat: digitize(durationHours, durationMinutes),
    end: data.end,
    endTimeFormat: digitize(end.getHours(), end.getMinutes()),
    month: start.getMonth() + 1,
    payday: generatePayday(data.duration,wage),
    start: data.start,
    startTimeFormat: digitize(start.getHours(), start.getMinutes()),
    year: start.getFullYear()
  }
}

function makeShiftFromForm(data,wage){
  const startTimeArr = data.startTimeFormat.split(":");
  const endTimeArr = data.endTimeFormat.split(":");
  const dateArr = data.date.split("-")
  const overSettings = [
    {numOfHours: 8, percentage: 1},
    {numOfHours: 2, percentage: 1.25},
    {numOfHours: 8, percentage: 1.5}
  ]
  data.year = Number.parseInt(dateArr[0]);
  data.month = Number.parseInt(dateArr[1]);
  data.day = Number.parseInt(dateArr[2]);
  data.date = data.day +'/' + data.month + '/' + data.year
  //this.item.start = Number.parseFloat(startTimeArr[0]) + Number.parseFloat(startTimeArr[1]) / 60;
  //this.item.end = Number.parseFloat(endTimeArr[0]) + Number.parseFloat(endTimeArr[1]) / 60;
  data.duration = calcDuration(startTimeArr, endTimeArr);
  data.payday = paydayCalc(overSettings, data.duration, wage);
  data.durationTimeFormat = digitize(data.duration, toMinutes(data.duration));

  return data;
}

export default {
  digitize,
  toMinutes,
  calcDuration,
  paydayCalc,
  digitizeSingle,
  makeShiftFromClock,
  makeShiftFromForm
}
