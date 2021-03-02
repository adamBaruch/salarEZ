
const defaultOvertimeSettings = [
  {
    type: 'baseRate',
    hoursSum: 8,
    percentage: 100
  },
  {
    type: 'overtime',
    hoursSum: 2,
    percentage: 125
  },
  {
    type: 'overtime',
    hoursSum: 2,
    percentage: 150
  }
]

function digitize(hours, minutes) {
  hours = Math.floor(hours);
  return (hours > 9 ? hours : '0' + Math.floor(hours)) + ':' + (minutes > 9 ? minutes : '0' + Math.floor(minutes));
}

function digitizeSingle(time) {
  return time > 9 ? time : '0' + time
}

// function toMinutes(hours) {
//   return Math.ceil(((hours < 1.0) ? hours : (hours % Math.floor(hours))) * 60);
// }

function paydayCalc(overtimeSettings, hours, wage) {
  let sum = 0;
  for (const wave of overtimeSettings) {
    if (hours > 0) {
      if (hours > wave.hoursSum) {
        sum += wave.hoursSum * wave.percentage/100 * wage;
        hours -= wave.hoursSum;
      } else {
        sum += hours * wave.percentage/100 * wage;
        break;
      }
    } else {
      break;
    }
  }
  return sum;
}

// function generatePayday(duration,wage){
//   return duration/3600000*wage;
// }

function makeShiftFromClock(data,wage,overtimeSettings) {
  const start = new Date(data.start);
  const end = new Date(data.end);
  const durationMinutes = ((data.duration/60000)%60).toFixed(0);
  const durationHours = (data.duration/3600000).toFixed(0);
  return {
    date: start.getFullYear() + '-' + digitizeSingle(start.getMonth()+1) + '-' +digitizeSingle(start.getDate()),
    dateFormat: start.getDate() + '/' + (start.getMonth()+1) + '/' + start.getFullYear(),
    day: start.getDate(),
    duration: data.duration,
    durationTimeFormat: digitize(durationHours, durationMinutes),
    end: data.end,
    endTimeFormat: digitize(end.getHours(), end.getMinutes()),
    month: start.getMonth() + 1,
    payday: paydayCalc(overtimeSettings, data.duration/3600000,wage),
    start: data.start,
    startTimeFormat: digitize(start.getHours(), start.getMinutes()),
    year: start.getFullYear()
  }
}

function timeFormatToObj(time){
  const timeArr = time.split(':');
  return {
    hour: Number.parseInt(timeArr[0]),
    minute:Number.parseInt(timeArr[1])
  }
}

function dateFormatToArr(date){
  const dateArr = date.split('-')
  return{
    day: Number.parseInt(dateArr[2]),
    month:Number.parseInt(dateArr[1]) - 1,
    year: Number.parseInt(dateArr[0]),
  }
}

function calcDuration(start,end){
  const hours = (end.hour - start.hour);
  const hoursInMillis = (hours < 0 ? 24 + hours : hours)*3600000;
  const  minutes = (end.minute - start.minute);
  const minutesInMillis = (minutes< 0 ? 60 + minutes : minutes)*60000
  return hoursInMillis + minutesInMillis;
}

function makeShiftFromForm(item,wage,overtimeSettings){
  //initialize data:
  const start = timeFormatToObj(item.startTimeFormat);
  const end = timeFormatToObj(item.endTimeFormat);
  const duration  = calcDuration(start,end);
  const date = dateFormatToArr(item.date);

  const startDate = new Date(date.year,date.month,date.day,start.hour,start.minute,0,0);
  //create shift:
  const data = {
    start: startDate.getTime(),
    end: startDate.getTime() + duration,
    duration: duration
  };
  return makeShiftFromClock(data,wage,overtimeSettings)
}

export default {
  digitize,
  digitizeSingle,
  makeShiftFromClock,
  makeShiftFromForm,
  paydayCalc,
  calcDuration,
  defaultOvertimeSettings
}
