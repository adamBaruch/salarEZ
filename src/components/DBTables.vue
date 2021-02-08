<template>
  <div class="q-pa-sm flex flex-center" style="max-width: 800px" >
    <q-markup-table v-if="!finishedLoading">
      <thead>
      <tr>
        <th class="text-left" style="width: 150px">
          <q-skeleton animation="blink" type="text"/>
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text"/>
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text"/>
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text"/>
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text"/>
        </th>
        <th class="text-right">
          <q-skeleton animation="blink" type="text"/>
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="n in 5" :key="n">
        <td class="text-left">
          <q-skeleton animation="blink" type="text" width="85px"/>
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="50px"/>
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="35px"/>
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="65px"/>
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="25px"/>
        </td>
        <td class="text-right">
          <q-skeleton animation="blink" type="text" width="85px"/>
        </td>
      </tr>
      </tbody>
    </q-markup-table>
    <q-table
      v-if="data.length!==0"
      title="משמרות"
      :data="data"
      dense
      :columns="columns"
      row-key="id"
      class="my-sticky-virtscroll-table"
      :pagination="{rowsPerPage: 0}"
      virtual-scroll
      :virtual-scroll-item-size="30"
      binary-state-sort
      bottom-row="no-data"
    >
      <template v-slot:bottom-row>
        <q-tr align="center">
          <q-td><span></span></q-td>
          <q-td><span></span></q-td>
          <q-td><span></span></q-td>
          <q-td><span></span></q-td>
          <q-td><b>{{ totalHours.toFixed(2) }}</b></q-td>
          <q-td><b>{{ income.toFixed(2) }}</b></q-td>
        </q-tr>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <b>{{ col.label }}</b>
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width v-show="$q.screen.lt.sm">
            <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand"
                   :icon="props.expand ? 'remove' : 'add'"/>
          </q-td>
          <q-td v-show="$q.screen.gt.xs" key="actions" :props="props">
            <q-btn round size="xs" color="deep-orange" icon="delete" @click="deleteRow(props.row)"/>
            <q-btn round size="xs" color="grey" icon="edit" @click="updateRow(props.row)" class="q-ma-xs"/>
          </q-td>
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
        </q-tr>
        <q-tr v-show="props.expand" :props="props.row">
          <q-td key="actions" :props="props">
            <q-btn round size="xs" color="deep-orange" icon="delete" @click="deleteRow(props.row)"/>
          </q-td>
          <q-td>
            <q-btn round size="xs" color="grey" icon="edit" @click="updateRow(props.row)"/>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <h5 v-if="finishedLoading && data.length===0" >
      אין משמרות להצגה
    </h5>
  </div>
</template>

<style>
</style>

<script>
export default {
  name: 'DBTables',
  data() {
    return {
      columns: [
        {name: 'actions', align: 'center', sortable: true},
        {name: 'date', align: 'center', label: 'תאריך', required: true, sortable: true},
        {name: 'start', align: 'center', label: 'התחלה', field: 'start', sortable: true},
        {name: 'end', align: 'center', label: 'סיום', field: 'end', sortable: true},
        {name: 'duration', align: 'center', label: 'זמן משמרת', field: 'duration', sortable: true},
        {name: 'payday', align: 'center', label: 'שכר יומי', field: 'payday'},
      ],
      data: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      finishedLoading: false,
    }
  },
  computed: mapState('shifts', [
    'shifts',
    'editedShift',
    'editedShiftId',
    'income',
    'totalHours'
  ]),
  async created() {
    await this.getShifts()
    if (this.shifts.hasOwnProperty(this.year)) {
      if (this.shifts[this.year].hasOwnProperty(this.month)) {
        this.data = this.shifts[this.year][this.month]
      }
    }
    this.finishedLoading = true
  },
  methods: {
    deleteRow(row) {
      this.deleteShift({id:row.id,date:row.date});
    },
    updateRow(row) {
      const dateObj = {year: row.year, month: row.month, day: row.day}
      this.setEditedShiftDate(dateObj);
      this.setEditedShiftId(row.id);
      this.setEditedShift(row);
      this.$router.push('/update/' + row.id).catch(() => {
      });
    },
    ...mapActions('shifts', ['getShifts', 'deleteShift', 'updateShift', 'setEditedShiftId', 'setEditedShift', 'setEditedShiftDate'])
  },
}

import {mapState, mapActions} from 'vuex'
</script>

<style scoped>
.q-table th {
  padding: 0 0;
  margin: 0 0;
}

.q-table body tr {
  padding: 20px 20px;
}
</style>
<style lang="sass">

.my-sticky-virtscroll-table
  /* height or max-height is important */
  max-height: 600px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */


  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  thead tr:first-child th
    top: 0
</style>
