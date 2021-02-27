import firebaseApi from '../../middleware/firebaseApi'

export default {

  getShifts: async ({commit}, {year, month}) => {
    const shifts = await firebaseApi.getShiftsByMonth(year, month);
    let stateShifts = {[year]: {[month]:[]}}
    let income = 0;
    let time = 0;
    for (const day in shifts) {
      if (shifts.hasOwnProperty(day))
        for (const key in shifts[day]) {
          if (shifts[day].hasOwnProperty(key)){
            let shift = shifts[day][key];
            shift.id = key;
            income += shift.payday;
            time += shift.duration / 3600000;
            stateShifts[year][month].push(shift);
          }
        }
    }
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

  saveStartTime: async ({commit, state}, time)=> {
    await firebaseApi.setUserInfo('startTime', time);
    commit('setStartTime', time);
  },

  getUserInfo: async ({commit}) =>{
    const userInfo = await firebaseApi.getUserInfo();
    commit('setUserInfo', userInfo);
  },

  setWage: async ({commit}, wage) => {
    await firebaseApi.setUserInfo('wage', wage);
    commit('setWage', wage);
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

  setOvertime: ({commit},overtimeSettings) =>{
    commit('setOvertime',overtimeSettings);
    firebaseApi.setUserInfo('overtimeSettings', overtimeSettings);
  },

  resetState: ({commit}) =>{
    commit('resetEditedShift');
    commit('resetShifts');
    commit('resetUserInfo');
    commit('resetOthers');
  }
}
