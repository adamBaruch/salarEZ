<template>
  <div class="q-pa-sm constrain" style="max-width: 800px">
    <div
      class="row q-mb-md q-px-sm q-gutter-md"
    >
      <div class="col-2 row items-center">
        <div style="font-size: 18px;">
          מיון:
        </div>
      </div>
      <q-select
        dense
        options-dense
        v-model="yearFilter"
        label="שנה"
        :options="yearOptions"
        style="width: 80px"
        behavior="menu"
      />
      <q-select
        dense
        options-dense
        v-model="monthFilter"
        label="חודש"
        :options="monthOptions"
        style="width: 80px"
        behavior="menu"
      />
      <q-btn
        text-color="primary"
        flat
        @click="filter()"
      >
        מיין
      </q-btn>
    </div>
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
      :hide-pagination="true"
      virtual-scroll
      :virtual-scroll-item-size="30"
      binary-state-sort
      bottom-row="no-data"
    >
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
            <q-btn size="sm"
                   color="primary"
                   round dense
                   @click="props.expand = !props.expand"
                   :icon="props.expand ? 'remove' : 'add'"/>
          </q-td>
          <q-td v-show="$q.screen.gt.xs" key="actions" :props="props">
            <q-btn round
                   size="xs"
                   color="deep-orange"
                   icon="delete"
                   @click="deleteRow(props.row)"/>
            <q-btn round
                   size="xs"
                   color="grey"
                   icon="edit"
                   class="q-ma-xs"
                   @click="updateRow(props.row)"/>
          </q-td>
          <q-td key="date" :props="props">
            {{ props.row.dateFormat }}
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
            <q-btn
              round
              size="xs"
              color="deep-orange"
              icon="delete"
              @click="deleteRow(props.row)"/>
          </q-td>
          <q-td>
            <q-btn
              round
              size="xs"
              color="grey"
              icon="edit"
              @click="updateRow(props.row)"/>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom-row >
        <q-tr class="centered">
          <q-td><span></span></q-td>
          <q-td><span></span></q-td>
          <q-td><span></span></q-td>
          <q-td><span></span></q-td>
          <q-td><b>{{ totalHours.toFixed(2) }}</b></q-td>
          <q-td><b>{{ income.toFixed(2) }}</b></q-td>
        </q-tr>
      </template>
    </q-table>
    <h5 v-if="finishedLoading && data.length === 0">
      אין משמרות להצגה
    </h5>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'

const years = [];
const months = [];
for (let i = 0; i <= 15; i++) {
  years.push(i + 2010);
  if (i < 13)
    if (i === 0)
      months.push('הכל')
    else
      months.push(i);

}
export default {
  name: 'DBTables',
  data() {
    return {
      columns: [
        {name: 'actions', align: 'center', sortable: true},
        {name: 'date', align: 'center', label: 'תאריך', required: true, sortable: true},
        {name: 'start', align: 'center', label: 'התחלה', field: 'start', sortable: true},
        {name: 'end', align: 'center', label: 'סיום', field: 'end', sortable: true},
        {name: 'duration', align: 'center', label: 'זמן', field: 'duration', sortable: true},
        {name: 'payday', align: 'center', label: 'שכר' +' \u20aa' , field: 'payday'},
      ],
      data: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      finishedLoading: false,
      yearFilter: '2021',
      monthFilter: new Date().getMonth() + 1,
      yearOptions: years,
      monthOptions: months,
      btnPos: [18, 18]
    }
  },
  computed: {
    ...mapState('shifts', ['shifts', 'editedShift', 'income', 'totalHours']),
    ...mapGetters('shifts', ['tableFilter']),
  },
  async created() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    await this.getShifts({year, month})
    this.data = this.tableFilter
    this.finishedLoading = true;
  },
  methods: {
    deleteRow(row) {
      this.deleteShift(row);
    },
    updateRow(row) {
      this.setEditedShift(row);
      this.$router.push('/update/' + row.id).catch(() => {
      });
    },
    async filter() {
      const filter = {
        year: this.yearFilter,
        month: this.monthFilter
      }
      await this.getShifts(filter);
      this.data = this.tableFilter
    },
    ...mapActions('shifts', ['getShifts', 'deleteShift', 'setEditedShift', 'filterShifts'])
  },
}
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
  max-height: 500px

  .q-table__top, .q-table__bottom, thead tr:first-child th
    /* bg color is important for th; just specify one */
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
