export default {

  setShifts: ((state, shifts) => {
    state.shifts = shifts;
  }),

  resetEditedShift: ((state) => {
    for (const key in state.editedShift) {
      state.editedShift[key] = ''
    }
  }),

  resetEditedShiftDate: ((state) => {
    state.editedShiftDate = ''
  }),

  resetEditedShiftId: (state => state.editedShiftId = ''),

  updateShift: ((state, editedShift) => {
    const index = state.shifts[editedShift.year][editedShift.month].findIndex(temp => temp.id === editedShift.id);
    state.shifts[editedShift.year][editedShift.month].splice(index, 1, editedShift);
  }),

  deleteShift: ((state, {id, dateArr}) => {
    const thisMonthArray = state.shifts[dateArr[2]][dateArr[1]];
    const index = thisMonthArray.findIndex(temp => temp.id === id);
    const deleted = thisMonthArray.splice(index, 1);
    state.totalHours -= deleted[0].duration;
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
    state.totalHours += shift.duration;
  }),

  setEditedShift: ((state, {shift, newShift}) => {
    for (const key in shift) {
      if (shift.hasOwnProperty(key))
        state.editedShift[key] = shift[key];
    }
    state.newShift = newShift;
  }),

  setEditedShiftId: ((state, id) => {
    state.editedShiftId = id;
  }),

  setEditedShiftDate: ((state, date) => {
    state.editedShiftDate = date;
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

  setWage: ((state, wage) => {
    state.userInfo.wage = wage;
  })
}
