export default {
  tableFilter: (state) => {
    let table = [];
    if (!state.shifts[state.yearFilter])
      state.shifts[state.yearFilter] = {}
    if (!state.shifts[state.yearFilter][state.monthFilter])
      state.shifts[state.yearFilter][state.monthFilter] = []
    if (state.monthFilter !== 'הכל') {
      table = state.shifts[state.yearFilter][state.monthFilter]
    } else {
      for (const month in state.shifts[state.yearFilter]) {
        if (state.shifts[state.yearFilter].hasOwnProperty(month))
          table = table.concat(state.shifts[state.yearFilter][month])
      }
    }
    return table
  }
}
