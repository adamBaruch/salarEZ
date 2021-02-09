
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

// function paydayCalc(overSettings, hours, wage) {
//   let sum = 0;
//   for (const wave of overSettings) {
//     if (hours > 0) {
//       if (hours > wave.numOfHours) {
//         sum += wave.numOfHours * wave.percentage * wage;
//         hours -= wave.numOfHours;
//       } else {
//         sum += hours * wave.percentage * wage;
//         break;
//       }
//     } else {
//       break;
//     }
//   }
//   return sum;
// }

function generatePayday(duration,wage){
  return duration/3600000*wage;
}

function makeShiftFromClock(data,wage) {
  const start = new Date(data.start);
  const end = new Date(data.end);
  const durationMinutes = ((data.duration/60000)%60).toFixed(0);
  const durationHours = (data.duration/3600000).toFixed(0);
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

function makeShiftFromForm(item,wage){
  //initialize data:
  const startTimeArr = item.startTimeFormat.split(":");
  const startHour = Number.parseInt(startTimeArr[0]);
  const startMinute = Number.parseInt(startTimeArr[1]);
  const endTimeArr = item.endTimeFormat.split(":");
  const endHour = Number.parseInt(endTimeArr[0]);
  const endMinute = Number.parseInt(endTimeArr[1]);
  const startDateArr = item.startDate.split("-")
  const startYear = Number.parseInt(startDateArr[0]);
  const startMonth = Number.parseInt(startDateArr[1]);
  const startDay = Number.parseInt(startDateArr[2]);
  const endDateArr = item.startDate.split("-");
  const endYear = Number.parseInt(endDateArr[0]);
  const endMonth = Number.parseInt(endDateArr[1]);
  const endDay = Number.parseInt(endDateArr[2]);

  const startDate = new Date(startYear,startMonth,startDay,startHour,startMinute,0,0);
  const endDate =new Date(endYear,endMonth,endDay,endHour,endMinute,0,0);
  //create shift:
  const data = {
    start: startDate.getTime(),
    end: endDate.getTime(),
    duration: endDate.getTime() - startDate.getTime()
  };
  return makeShiftFromClock(data,wage)
}

export default {
  digitize,
  digitizeSingle,
  makeShiftFromClock,
  makeShiftFromForm
}
