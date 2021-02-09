<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md constrain column">
    <span>התחלת משמרת</span>
    <div class="row q-gutter-sm">
      <q-input
        filled
        :readonly="hasId"
        type="date"
        v-model="item.startDate"
        label="תאריך *"
        stack-label
      />
      <q-input filled type="time" v-model="item.startTimeFormat"
               label="שעה*"
               stack-label/>
    </div>
    <span>סיום משמרת</span>
    <div class="row q-gutter-sm">
      <q-input
        filled
        :readonly="hasId"
        type="date"
        v-model="item.endDate"
        label="תאריך *"
        stack-label
      />
      <q-input filled type="time" v-model="item.endTimeFormat" label="שעה*"
               stack-label/>
    </div>
    <div class="row flex-center">
      <q-btn :label="item.id ? 'עדכן' : 'הוסף'"
             :disable="!filled"
             type="submit"
             color="primary"/>
      <q-btn label="נקה" type="reset" color="primary" flat class="q-ml-sm"/>
    </div>
  </q-form>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import utills from "../middleware/utill";

export default {
  name: "Form",
  data() {
    return {
      item: {
        endDate: '',
        startDate: '',
        date: '',
        day: '',
        month: '',
        year: '',
        duration: '',
        start: '',
        end: '',
        payday: '',
        startTimeFormat: '',
        endTimeFormat: '',
        durationTimeFormat: '',
      },
      hasId: false
    }
  },
  created() {
    this.getUserInfo();
    if (this.editedShiftId !== '') {
      this.hasId = true
      for (const key in this.editedShift) {
        this.item[key] = this.editedShift[key];
      }
      this.setEditedShiftDate({
        year: this.item.year,
        month: this.item.month,
        day: this.item.day
      })
    }
  },
  computed: {
    endDateInit() {
      return this.item.startDate;
    },
    filled: {
      get() {
        return this.item.startDate && this.item.endDate
          && this.item.startTimeFormat && this.item.endTimeFormat
      },
      set(){}
    },
    ...mapState('shifts', ['shifts', 'editedShift', 'editedShiftId', 'userInfo'])
  },
  methods: {
    onSubmit() {
      if (this.userInfo && this.userInfo.wage) {
        try{
          const shift = this.calculateShift();
          this.setEditedShift(shift);
          if (this.$route.params.id) {
            shift.id = this.$route.params.id
            this.updateShift(shift);
            this.$router.push('/').catch(() => {
            });
          } else {
            this.insertShift(shift);
            this.onReset();
          }
        }catch (err){
          this.$q.dialog({
            title: 'שגיאה',
            message: err
          }).onOk(() => {
          })
        }
      } else {
        //dialog to be opened
        this.onReset();
      }
    },
    calculateShift() {
        return utills.makeShiftFromForm(this.item, this.userInfo.wage)
    },
    onReset() {
      for (const key in this.item) {
        this.item[key] = '';
      }
    },
    filled() {
      return this.item.date && this.item.startTimeFormat && this.item.endTimeFormat
    },
    ...mapActions('shifts', ['insertShift', 'updateShift', 'resetShift', 'setEditedShift', 'getUserInfo', 'setEditedShiftDate'])
  },
  watch: {
    endDateInit: function (newVal1) {
      this.item.endDate = newVal1
    }
  },
}
</script>

<style scoped>
</style>
