import {firebaseDb, firebaseStorage} from 'boot/firebase';

// const arr = [];
// for (const key in res.val()) {
//     const shift = res.val()[key];
//     shift.id = key;
//     arr.push(shift);
// }
// return arr;
async function getUserData() {
  let userId = await localStorage.getItem('userId');
  if (userId) {
    const res = await firebaseDb.ref(`users/${userId}/shifts`).once('value')
    return res.val();
  }
}

function writeData(shift) {
  return firebaseDb.ref('users/' + window.userId + '/shifts/' +
    shift.year + '/' + shift.month + '/' + shift.day).push(shift).key;
}

function removeData(id, date) {
  firebaseDb.ref('users/' + window.userId + '/shifts/' +
    date.year + '/' + date.month + '/' + date.day + '/' + id).remove();
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
  removeData,
  updateData,
  uploadPhoto,
  getUserInfo,
  setUserInfo
}








