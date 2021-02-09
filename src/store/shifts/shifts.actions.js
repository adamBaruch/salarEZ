import firebaseApi from '../../middleware/firebaseApi'

export default {

  getShifts: async ({commit}) => {
    const shifts = await firebaseApi.getUserData();
    let stateShifts = {}
    let income = 0;
    let time = 0;
    for (const year in shifts) {
      if (!stateShifts.hasOwnProperty(year)) stateShifts[year] = {}
      for (const month in shifts[year]) {
        if (!stateShifts[year].hasOwnProperty(month)) stateShifts[year][month] = [];
        for (const day in shifts[year][month]) {
          for (const key in shifts[year][month][day]) {
            let shift = shifts[year][month][day][key]; //new stuff 'let'
            shift.id = key;
            income += shift.payday;
            time += shift.duration/3600000;
            stateShifts[year][month].push(shift);
          }
        }
      }
    }
    commit('setIncome', income);
    commit('setTotalHours', time);
    commit('setShifts', stateShifts);
  },

  updateShift: ({commit, state},shift) => {
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
    //resets:
    commit('resetEditedShiftId');//maybe can be deleted
    commit('resetEditedShiftDate');//maybe can be deleted
    commit('resetEditedShift');
  },

  deleteShift: ({commit, state}, {id,date}) => {
    const dateArr = date.split('/')
    firebaseApi.deleteShift(id, dateArr);
    commit('deleteShift', {id, dateArr});
  },

  insertShift: async ({commit, state}, shift) => {
    shift.id = await firebaseApi.writeData(shift);
    commit('insertShift', shift);
  },

  resetShift: ({commit}) => {
    commit('resetEditedShift');
    commit('resetEditedShiftId');
  },

  setEditedShift: ({commit}, shift) => {
    commit('setEditedShift', shift);
  },

  setEditedShiftId({commit, state}, id) {
    commit('setEditedShiftId', id);
  },

  setEditedShiftDate({commit, state}, date) {
    commit('setEditedShiftDate', date);
  },
  //////////

  async saveStartTime({commit, state}, time) {
    await firebaseApi.setUserInfo('startTime', time);
    commit('setStartTime', time);
  },

  async getUserInfo({commit}) {
    const userInfo = await firebaseApi.getUserInfo();
    commit('setUserInfo', userInfo);
  },

  async setWage({commit}, wage) {
    await firebaseApi.setUserInfo('wage', wage);
    commit('setWage', wage);
  },
}
