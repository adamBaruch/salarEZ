function digitize(hours, minutes) {
    hours = Math.floor(hours);
    return (hours > 9 ? hours : '0' + Math.floor(hours)) + ':' + (minutes > 9 ? minutes : '0' + Math.floor(minutes));
}
function digitizeSingle(time){
    return time > 9 ? time : '0' + time
}

// function itemToHnM(time) {
//     //think i dont needs this
//     return time.hours + time.minutes / 60 + time.seconds / 3600;
// }

function toMinutes(hours) {
    return Math.ceil(((hours < 1.0) ? hours : (hours % Math.floor(hours))) * 60);
}

function calcDuration(start, end){
    return (end - start) > 0 ? end - start : 24 + end - start;
}

function paydayCalc(overSettings, hours,wage){
    let sum = 0;
    for (const wave of overSettings){
        if(hours>0){
            if(hours>wave.numOfHours){
            sum += wave.numOfHours*wave.percentage*wage;
            hours -= wave.numOfHours;
            } else{
                sum += hours*wave.percentage*wage;
                break;
            }
        } else {
            break;
        }
    }
    return sum;
}

export default {
    digitize,
    toMinutes,
    calcDuration,
    paydayCalc,
    digitizeSingle
}