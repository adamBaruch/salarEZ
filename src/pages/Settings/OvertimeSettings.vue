<template>
  <q-page class="constrain2">
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
      </tr>
      </thead>

      <tbody>
      <tr v-for="n in 4" :key="n">
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
      class="q-ma-xs"
      title="הגדרת שעות"
      v-if="data.length!==0"
      :data="data"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:top-row="props">
        <q-td key="type">
          {{ translate(baseRate.type) }}
        </q-td>
        <q-td key="hoursSum" class="centered">
          {{ baseRate.hoursSum }}
          <q-popup-edit v-model="baseRate.hoursSum" buttons>
            <q-input type="number" v-model="baseRate.hoursSum" dense autofocus counter/>
          </q-popup-edit>
        </q-td>
        <q-td key="percentage" class="centered">
          {{ baseRate.percentage }}
          <q-popup-edit v-model="baseRate.percentage" buttons>
            <q-input type="number" v-model="baseRate.percentage" dense autofocus counter/>
          </q-popup-edit>
        </q-td>
        <q-td class="centered">
          {{ userInfo.wage }}
        </q-td>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="type">
            {{ translate(props.row.type) }}
          </q-td>
          <q-td key="hoursSum" :props="props">
            {{ props.row.hoursSum }}
            <q-popup-edit v-model="props.row.hoursSum" buttons>
              <q-input type="number" v-model="props.row.hoursSum" dense autofocus counter/>
            </q-popup-edit>
          </q-td>
          <q-td key="percentage" :props="props">
            {{ props.row.percentage }}
            <q-popup-edit v-model="props.row.percentage" buttons>
              <q-input type="number" v-model="props.row.percentage" dense autofocus counter/>
            </q-popup-edit>
          </q-td>
          <q-td key="currWage" :props="props">
            {{ currRate(props.row.percentage) }}
          </q-td>
        </q-tr>
      </template>
      <template v-slot:bottom>
        <q-btn color="primary" label="הוסף שורה" @click="addRow"/>
        <q-space/>
        <q-btn color="secondary" label="מחק שורה אחרונה" @click="removeLastRow"/>
      </template>
    </q-table>
    <div class="row justify-around">
      <q-btn
        v-if="finishedLoading"
        class="q-ma-md "
        color="primary"
        @click="saveOvertimeSettings">
        שמור שינויים
      </q-btn>
      <q-btn
        v-if="finishedLoading"
        class="q-ma-md"
        text-color="primary"
        flat
        @click="resetSettings">
        בטל שינויים
      </q-btn>
    </div>
    <p class="row q-ml-sm text-body2" v-if="finishedLoading">
      *לחץ בתא לעריכה
    </p>
  </q-page>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "OvertimeSettings",
  data() {
    return {
      baseRate: {
        type: '',
        hoursSum: 0,
        percentage: 0
      },
      data: [],
      columns: [
        {
          name: 'type',
          required: true,
          label: 'סוג',
          align: 'center',
        },
        {name: 'hoursSum', required: true, label: 'סך שעות', align: 'center'},
        {name: 'percentage', align: 'center', label: 'אחוז (%)', format: (val) => val + '%'},
        {name: 'currWage', align: 'center', label: 'תעריף (\u20aa)', field: 'תעריף'},
      ],
      finishedLoading: false,
    }
  },
  created() {
    this.setTitle('הגדרות')
    setTimeout(() => {
      this.resetSettings();
      this.finishedLoading = true;
    }, 1200)
  },
  computed: {
    ...mapState('shifts', ['shifts', 'userInfo'])
  },
  methods: {
    translate(val) {
      switch (val) {
        case 'baseRate':
          return 'תעריף רגיל:';
        case 'overtime':
          return 'שעות נוספות:';
        default:
          return 'אין תרגום'
      }
    },
    currRate(percentage) {
      return this.userInfo.wage * percentage / 100
    },
    addRow() {
      const addRow = {
        type: 'overtime',
        hoursSum: 0,
        percentage: 0
      }
      this.data.push(addRow);
    },
    removeLastRow() {
      this.data.pop();
    },
    resetSettings() {
      this.baseRate = this.userInfo.overtimeSettings[0];
      this.data = [...this.userInfo.overtimeSettings.slice(1)];
    }, saveOvertimeSettings() {
      const overtime = [this.baseRate, ...this.data]
      this.setOvertime(overtime);
    },
    ...mapActions('shifts', ['setOvertime', 'setTitle'])
  }
}
</script>

<style scoped>

</style>
