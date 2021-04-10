import firebaseApi from '../../middleware/firebaseApi'
import firebase, {firebaseAuth} from "boot/firebase";

const provider = new firebase.firebase.auth.GoogleAuthProvider();

export default {

  passwordRegister: async ({commit}, data) => {
    return firebaseAuth.createUserWithEmailAndPassword(data.email, data.password);
  },

  passwordLogin: async ({}, {email, password}) => {
    const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
    return result.additionalUserInfo.isNewUser
  },

  googleLogin: async ({}, router) => {
    firebaseAuth.signInWithRedirect(provider).then(() => {
      return firebaseAuth.getRedirectResult()
    }).then(res => {
      if (res.user) {
        if (res.additionalUserInfo.isNewUser)
          router.push('/b/settings_init')
        else
          router.push('/')
      }
    })
  },

  signOut: async ({dispatch, commit},router) => {
    await firebaseAuth.signOut()
    localStorage.removeItem('userId')
    dispatch('resetState');
    router.push('/b/login')
  },

  getShifts: async ({commit}, {year, month}) => {
    let shifts = {};
    if (month === 'הכל') {
      const months = await firebaseApi.getShiftByYear(year)
      for (const monthData in months)
        if (months.hasOwnProperty(monthData))
          shifts[monthData] = months[monthData]
    } else {
      const monthData = await firebaseApi.getShiftsByMonth(year, month)
      shifts[monthData.key] = monthData.val();
    }
    let stateShifts = {}
    let income = 0;
    let time = 0;
    for (const monthObj in shifts) {
      if (shifts.hasOwnProperty(monthObj)) {
        for (const day in shifts[monthObj]) {
          if (shifts[monthObj].hasOwnProperty(day)) {
            for (const key in shifts[monthObj][day]) {
              if (shifts[monthObj][day].hasOwnProperty(key)) {
                let shift = shifts[monthObj][day][key];
                shift.id = key;
                income += shift.payday;
                time += shift.duration / 3600000;
                if (!stateShifts[year])
                  stateShifts[year] = {}
                if (!stateShifts[year][monthObj])
                  stateShifts[year][monthObj] = []
                stateShifts[year][monthObj].push(shift);
              }
            }
          }
        }
      }
    }
    commit('setFilters', {year, month})
    commit('setIncome', income);
    commit('setTotalHours', time);
    commit('setShifts', stateShifts);
  },

  updateShift: ({commit, state}, shift) => {
    //duplicate data from state
    const totalHours = {...state.totalHours};
    const income = {...state.income};
    //update
    const index = state.shifts[shift.year][shift.month].findIndex(temp => temp.id === shift.id);
    const oldShift = state.shifts[shift.year][shift.month][index];
    firebaseApi.updateData(shift);
    commit("setTotalHours", totalHours - oldShift.duration + shift.duration);
    commit("setIncome", income - oldShift.payday + shift.payday);
    commit('updateShift', {shift, index});
    commit('resetEditedShift');
  },

  deleteShift: ({commit, state}, shift) => {
    const dateArr = shift.dateFormat.split('/')
    firebaseApi.deleteShift(shift.id, dateArr);
    commit('deleteShift', {id: shift.id, dateArr});
  },

  insertShift: async ({commit, state}, shift) => {
    shift.id = await firebaseApi.insertShift(shift);
    commit('insertShift', shift);
  },

  setEditedShift: ({commit}, shift) => {
    commit('setEditedShift', shift);
  },

  async saveStartTime({commit, state}, time) {
    await firebaseApi.setUserInfo({startTime: time});
    commit('setStartTime', time);
  },

  getUserInfo: async ({commit}) => {
    const userInfo = await firebaseApi.getUserInfo();
    commit('setUserInfo', userInfo);
  },

  setUserInfo: ({commit}, userInfo) => {
    firebaseApi.setUserInfo(userInfo);
    commit('setUserInfo', userInfo)
  },

  setWage: async ({commit}, wage) => {
    await firebaseApi.setUserInfo({wage: wage});
    commit('setUserInfo', {wage: wage});
  },

  handleButtonClick: ({state, commit}, func) => {
    if (state.buttonDisabled) return;
    func();
    commit('isDisabled', true);
    setTimeout(() => {
      commit('isDisabled', false);
    }, 500);
  },

  async filterShifts({commit}, {year, month}) {
    await firebaseApi.getShifts(year, month);
  },

  setOvertime: ({commit}, overtimeSettings) => {
    commit('setOvertime', overtimeSettings);
    firebaseApi.setUserInfo({overtimeSettings: overtimeSettings});
  },

  resetState: ({commit}) => {
    commit('resetEditedShift');
    commit('resetShifts');
    commit('resetUserInfo');
    commit('resetOthers');
  },

  savePic: async ({dispatch}, img) => {
    const storageUrl = await firebaseApi.changeProfilePic(img);
    const result = await storageUrl.ref.getDownloadURL()
    dispatch('setUserInfo', {profileImg: result})
  },

  setTitle: ({commit}, title) => {
    commit('setTitle', title)
  }
}

