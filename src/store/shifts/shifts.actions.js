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
                        const shift = shifts[year][month][day][key];
                        shift.id = key;
                        income += shift.payday;
                        time += shift.duration;
                        stateShifts[year][month].push(shift);
                    }
                }
            }
        }
        commit('setIncome', income);
        commit('setTotalHours', time);
        commit('setShifts', stateShifts);
    },

    updateShift: ({commit, state}) => {
        //duplicate data from state
        const shift = JSON.parse(JSON.stringify(state.editedShift));
        const totalHours = JSON.parse(JSON.stringify(state.totalHours));
        const income = JSON.parse(JSON.stringify(state.income));
        const date = JSON.parse(JSON.stringify(state.editedShiftDate));
        //update
        const index = state.shifts[date.year][date.month].findIndex(temp => temp.id === shift.id);
        const oldShift = state.shifts[date.year][date.month][index];
        firebaseApi.updateData(shift);
        commit("setTotalHours", totalHours - oldShift.duration + shift.duration);
        commit("setIncome", income - oldShift.payday + shift.payday);
        commit('updateShift', shift);
        //resets:
        commit('resetEditedShiftId');
        commit('resetEditedShiftDate');
        commit('resetEditedShift');
    },

    deleteShift: ({commit, state}) => {
        const id = JSON.parse(JSON.stringify(state.editedShiftId));
        const date = JSON.parse(JSON.stringify(state.editedShiftDate));
        firebaseApi.removeData(id, date);
        commit('deleteShift', {id, date});
        commit('resetEditedShiftId');
        commit('resetEditedShiftDate')
    },

    insertShift: async ({commit, state}) => {
        const shift = {};
        Object.assign(shift, state.editedShift);
        shift.id = await firebaseApi.writeData(shift);
        commit('insertShift', shift);
        commit('resetEditedShift');
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

    async saveStartTimeToDb({commit, state}, time) {
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
