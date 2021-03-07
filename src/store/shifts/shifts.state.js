export default {
  title: 'salarEZ',
  shifts: {},
  monthFilter: new Date().getMonth() + 1,
  yearFilter: new Date().getFullYear(),
  editedShift: {
    day: '',
    month: '',
    year: '',
    date: '',
    duration: '',
    start: '',
    end: '',
    payday: '',
    startTimeFormat: '',
    endTimeFormat: '',
    durationTimeFormat: '',
  },
  userInfo: {
    name: '',
    overtimeSettings: [],
    startTime: null,
    wage: '',
    profileImg: ''
  },
  buttonDisabled: false,
  income: 0,
  totalHours: 0,
  overtimeSettings: ''
}
