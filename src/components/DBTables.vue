<template>
  <div class="q-pa-md" style="max-width: 800px">
    <q-table
        title="טבלה"
        :data="data"
        :columns="columns"
        row-key="id"
        binary-state-sort
        bottom-row="no-data"
    >
      <!--        :visible-columns="visibleColumns"-->
      <template v-slot:bottom-row>
        <q-tr align="center">
          <q-td>-</q-td>
          <q-td>-</q-td>
          <q-td>-</q-td>
          <q-td>{{ totalHours.toFixed(2) }}</q-td>
          <q-td>{{ income.toFixed(2) }}</q-td>
          <q-td>-</q-td>
        </q-tr>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-italic text-purple"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td key="start" :props="props">
            {{ props.row.startTimeFormat }}
          </q-td>
          <q-td key="end" :props="props">
            {{ props.row.endTimeFormat }}
          </q-td>
          <q-td key="duration" :props="props">
            {{ props.row.durationTimeFormat }}
          </q-td>
          <q-td key="payday" :props="props">
            {{ props.row.payday.toFixed(2) }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn class="mdi-delete" round color="deep-orange" icon="delete" @click="deleteRow(props.row.id, props.row.date)"/>
            <q-btn round color="grey" icon="edit" @click="updateRow(props.row)" class="q-ma-xs"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<style>
</style>

<script>
//import dataFunc from "../middleware/dataFunc";
//import serverApi from "../middleware/serverApi";
//import firebaseApi from "../middleware/firebaseApi";
import {mapState, mapActions} from 'vuex'
import utills from "../middleware/utill";

export default {
  name: 'DBTables',
  data() {
    return {
      columns: [
        //v-if="$q.screen.gt.xs" this from html here
        {
          name: 'date',
          required: true,
          label: 'תאריך',
          align: 'right',
          //field: row => row.name,
          // format: val => `${val}`,
          sortable: true
        },
        {name: 'start', align: 'center', label: 'התחלה', field: 'start', sortable: true},
        {name: 'end', align: 'center', label: 'סיום', field: 'end', sortable: true},
        {name: 'duration', align: 'center', label: 'זמן משמרת', field: 'duration', sortable: true},
        {name: 'payday', align: 'center', label: 'שכר יומי', field: 'payday', headerClasses: 'mobile-hide'},
        {name: 'actions', align: 'center', label: 'פעולות'}
        //still can't hide header with screen.gt.xs
      ],
      data: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()
      //totalHoursFormat: ''
    }
  },
  computed: mapState('shifts', [
    'shifts',
    'editedShift',
    'editedShiftId',
    'income',
    'totalHours'
  ]),
  created() {
    this.getShifts().then(() => {
      this.data = this.shifts[this.year][this.month];
      // this.totalHoursFormat  = this.formatTotalHours()
    })
  },
  methods: {
    // formatTotalHours(){
    //   return utills.digitize(Math.floor(this.totalHours),utills.toMinutes(this.totalHours));
    // },
    deleteRow(id,date) {
      // this.formatTotalHours();
      const dateArr = date.split("-");
      const dateObj = {year: dateArr[0], month: dateArr[1], day: dateArr[2]}
      this.setEditedShiftDate(dateObj);
      this.setEditedShiftId(id);
      this.deleteShift();
    },
    updateRow(row) {
      const dateArr = row.date.split("-");
      const dateObj = {year: dateArr[0], month: dateArr[1], day: dateArr[2]}
      this.setEditedShiftDate(dateObj);
      this.setEditedShiftId(row.id);
      this.setEditedShift(row);
      this.$router.push('/update/' + row.id);
    },
    ...mapActions('shifts', ['getShifts', 'deleteShift', 'updateShift', 'setEditedShiftId', 'setEditedShift','setEditedShiftDate'])
  },
}
</script>

<style scoped>

</style>
