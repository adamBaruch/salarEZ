import {firebaseDb, firebaseStorage} from 'boot/firebase';

async function getShiftsByMonth(year,month) {
  let userId = localStorage.getItem('userId');
  if (userId) {
     const shifts = await firebaseDb.ref('users/' + userId  + '/shifts/' + year + '/' + month).once('value')
    return shifts.val();
  }
}

async function getShiftByYear(year){
  const shifts = await firebaseDb.ref('users/' + userId  + '/shifts/' + year).once('value');
  return shifts.val();
}

function insertShift(shift) {
  return  firebaseDb.ref('users/' + window.userId + '/shifts/' +
    shift.year + '/' + shift.month + '/' + shift.day).push(shift).key;
}

function deleteShift(id, date) {
  firebaseDb.ref('users/' + window.userId + '/shifts/' +
    date[2] + '/' + date[1] + '/' + date[0] + '/' + id).remove();
}

function updateData(newData) {
  firebaseDb.ref('users/' + window.userId + '/shifts/' +
    newData.year + '/' + newData.month + '/' + newData.day + '/' + newData.id).set(newData);
}

function uploadPhoto(photo, callback) {
  firebaseStorage.ref('users/' + window.userId + '/photos/' + photo[0].name).put(photo[0])
    .on('value', snapshot => {
      callback(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
    })
}

function getUserInfo() {
  return firebaseDb.ref('users/' + window.userId + '/userInfo').once('value')
    .then(res => {
      return res.val();
    })
}


function setUserInfo(prop, value) {
  firebaseDb.ref('users/' + window.userId + '/userInfo/' + prop).set(value);
}

export default {
  getShiftsByMonth,
  insertShift,
  deleteShift,
  updateData,
  uploadPhoto,
  getUserInfo,
  setUserInfo,
  getShiftByYear
}








