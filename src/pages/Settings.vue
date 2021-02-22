<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        dense
        v-model="wage"
        label="שכר שעתי חדש *"
        :lazy-rules="true"
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="שמור" type="submit" color="primary"/>
        <q-btn label="בטל" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
    <q-table
      title="overtime"
      :data="data"
      :columns="columns"
      row-key="id"
    >
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
      <template v-slot:top-row="props">
          <q-td key="type">
            {{ translate(baseRate.type) }}
          </q-td>
          <q-td key="hoursSum" align="center">
            {{ baseRate.hoursSum }}
            <q-popup-edit v-model="baseRate.hoursSum" buttons>
              <q-input type="number" v-model="baseRate.hoursSum" dense autofocus counter/>
            </q-popup-edit>
          </q-td >
          <q-td key="percentage" align="center">
            {{ baseRate.percentage }}
            <q-popup-edit v-model="baseRate.percentage" buttons>
              <q-input type="number" v-model="baseRate.percentage" dense autofocus counter/>
            </q-popup-edit>
          </q-td >
          <q-td align="center">
            {{ userInfo.wage }}
          </q-td>
      </template>
      <template v-slot:bottom>
        <q-space/>
        <q-btn color="primary" dense label="הוסף שורה" @click="addRow"/>
      </template>

    </q-table>
    <q-btn
      class="q-ma-lg"
      color="primary"
      @click="signOut">
      התנתק
    </q-btn>
    <p class="text-body1">*לחיצה בתא לעריכה</p>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import {firebaseAuth} from "boot/firebase";

export default {
  data() {
    return {
      wage: null,
      baseRate: {
        type: 'baseRate',
        hoursSum: 8,
        percentage: 100
      },
      data: [
        {
          type: 'overtime',
          hoursSum: 2,
          percentage: 125
        },
        {
          type: 'overtime',
          hoursSum: 2,
          percentage: 150
        }
      ],
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
    }
  },
  computed: mapState('shifts', ['shifts', 'userInfo']),

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
    currRate(percentage){
      return this.userInfo.wage*percentage/100
    },
    signOut() {
      //todo: reset state
      const self = this;
      firebaseAuth.signOut().then(() => {
        localStorage.removeItem('userId')
        self.$router.push('/b/login').catch(() => {
        });
      })
    },
    onSubmit() {
      this.setWage(this.wage);
      this.$router.push('/').catch(() => {
      });
    },
    onReset() {
      this.name = null
    },
    addRow() {
      const addRow = {
        type: 'overtime',
        hoursSum: 0,
        percentage: 0
      }
      this.data.push(addRow);
    },
    removeRow(index) {
      this.data.splice(index, 1);
    },
    ...mapActions('shifts', ['setWage'])
  }
}
</script>

<style scoped>
</style>
