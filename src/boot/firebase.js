import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBRGHJX_syanhpTEbQlX0CdG4aMS_ABtJQ",
  authDomain: "salar-ez.firebaseapp.com",
  databaseURL: "https://salar-ez-default-rtdb.firebaseio.com",
  projectId: "salar-ez",
  storageBucket: "salar-ez.appspot.com",
  messagingSenderId: "30143461469",
  appId: "1:30143461469:web:312b4f9a3a1180007775b4"
};
/** Convenience method to initialize firebase app
 *
 * @param  {Object} config
 * @return {Object} App
 */

const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.database();
const firebaseStorage = firebaseApp.storage();

firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    window.userId = user.uid;
    localStorage.setItem("userId",user.uid);
  }
});
export {
  firebaseAuth,
  firebaseDb,
  firebaseStorage,
};
export default {
  firebase,
}
