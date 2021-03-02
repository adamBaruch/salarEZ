const merge = require('lodash/merge');

export default {

  setShifts: ((state, shifts) => {
    state.shifts = merge(shifts, state.shifts);
  }),

  resetEditedShift: ((state) => {
    for (const key in state.editedShift) {
      state.editedShift[key] = ''
    }
  }),

  updateShift: ((state, {shift, index}) => {
    state.shifts[shift.year][shift.month].splice(index, 1, shift);
  }),

  deleteShift: ((state, {id, dateArr}) => {
    const thisMonthArray = state.shifts[dateArr[2]][dateArr[1]];
    const index = thisMonthArray.findIndex(temp => temp.id === id);
    const deleted = thisMonthArray.splice(index, 1);
    state.totalHours -= deleted[0].duration / 3600000;
    state.income -= deleted[0].payday;
  }),

  insertShift: ((state, shift) => {
    const year = shift.year;
    const month = shift.month;
    if (!state.shifts.hasOwnProperty(year))
      state.shifts[year] = {}
    if (!state.shifts[year].hasOwnProperty(month))
      state.shifts[year][month] = []
    state.shifts[year][month].push(shift);
    state.income += shift.payday;
    state.totalHours += shift.duration / 3600000;
  }),

  setEditedShift: ((state, shift) => {
    for (const key in shift) {
      if (shift.hasOwnProperty(key))
        state.editedShift[key] = shift[key];
    }
  }),

  setStartTime: ((state, date) => {
    state.userInfo.startTime = date;
  }),

  setUserInfo: ((state, userInfo) => {
    for (const info in userInfo)
      if (userInfo.hasOwnProperty(info))
        state.userInfo[info] = userInfo[info];
  }),

  setIncome: ((state, income) => {
    state.income = income;
  }),

  setTotalHours: ((state, totalHours) => {
    state.totalHours = totalHours;
  }),

  isDisabled: ((state, bool) => {
    state.buttonDisabled = bool;
  }),

  setOvertime: ((state, overtime) => {
    state.userInfo.overtimeSettings = overtime;
  }),
  resetShifts: ((state) => {
    state.shifts = [];
  }),
  resetUserInfo: ((state) => {
    state.userInfo = {
      overtimeSettings: [],
      startTime: null,
      wage: ''
    }
  }),
  resetOthers: ((state) => {
    state.buttonDisabled = false;
    state.income = 0;
    state.totalHours = 0;
    state.overtimeSettings = '';
  })
}
