import {firebaseDb, firebaseStorage} from 'boot/firebase';

async function getUserData() {
  let userId = await localStorage.getItem('userId');
  if (userId) {
    const res = await firebaseDb.ref(`users/${userId}/shifts`).once('value')
    return res.val();
  }
}

function writeData(shift) {
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
  firebaseStorage.ref('users/' + window.userId + '/photos/' + photo[0].name).put(photo[0]) //.snapshot.
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
  return firebaseDb.ref('users/' + window.userId + '/userInfo/' + prop).set(value);
}

export default {
  getUserData,
  writeData,
  deleteShift,
  updateData,
  uploadPhoto,
  getUserInfo,
  setUserInfo
}








