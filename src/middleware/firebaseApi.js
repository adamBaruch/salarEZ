import {firebaseDb, firebaseStorage} from 'boot/firebase';
import fireRefs from "src/middleware/fireRefs";

async function getShiftsByMonth(year,month) {
  let userId = localStorage.getItem('userId');
  if (userId) {
    const ref = fireRefs.shiftsRef(userId,year,month)
     const shifts = await firebaseDb.ref(ref).once('value')
    return shifts.val();
  }
}

async function getShiftByYear(year){
  const ref = fireRefs.yearRef(window.userId,year)
  const shifts = await firebaseDb.ref(ref).once('value');
  return shifts.val();
}

function insertShift(shift) {
  const ref = fireRefs.singleShiftRef(window.userId,shift)
  return  firebaseDb.ref(ref).push(shift).key;
}

function deleteShift(id, date) {
  const ref = fireRefs.shiftByDateRef(window.userId,date)
  firebaseDb.ref(ref + id).remove();
}

function updateData(newData) {
  const ref = fireRefs.singleShiftRef(window,newData)
  firebaseDb.ref(ref + newData.id).set(newData);
}

function uploadPhoto(photo, callback) {
  const ref = fireRefs.photoRef(window.userId,photo[0].name)
  firebaseStorage.ref(ref).put(photo[0])
    .on('value', snapshot => {
      callback(snapshot.bytesTransferred * 100 / snapshot.totalBytes)
    })
}

function getUserInfo() {
  const ref = fireRefs.userInfoRef(window.userId)
  return firebaseDb.ref(ref).once('value')
    .then(res => {
      return res.val();
    })
}

function setUserInfo(userInfo){
  const ref = fireRefs.userInfoRef(window.userId);
  firebaseDb.ref(ref).update(userInfo)
}

function changeProfilePic(img) {
  const ref = fireRefs.profilePicRef(window.userId);
  return firebaseStorage.ref(ref).put(img)
}

export default {
  getShiftsByMonth,
  insertShift,
  deleteShift,
  updateData,
  uploadPhoto,
  getUserInfo,
  getShiftByYear,
  changeProfilePic,
  setUserInfo
}
