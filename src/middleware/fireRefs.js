export default {
  shiftsRef,
  yearRef,
  singleShiftRef,
  shiftByDateRef,
  photoRef,
  userInfoRef,
  profilePicRef
}

function shiftsRef(userId,year,month){
  return 'users/' + userId  + '/shifts/' + year + '/' + month
}

function yearRef(userId,year){
  return 'users/' + userId  + '/shifts/' + year
}

function singleShiftRef(userId,shift){
  return 'users/' + userId + '/shifts/' +
    shift.year + '/' + shift.month + '/' + shift.day + '/'
}

function shiftByDateRef(userId,date){
  return 'users/' + userId + '/shifts/' +
    date[2] + '/' + date[1] + '/' + date[0] + '/'
}

function photoRef(userId, photoName){
  return 'users/' + userId + '/photos/' + photoName
}

function userInfoRef(userId){
  return 'users/' + userId + '/userInfo/'
}

function profilePicRef(userId){
  return 'users/' + userId + '/profilePic'
}
