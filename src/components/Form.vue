<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md constrain">
    <q-input
      filled
      :readonly="hasId"
      type="date"
      v-model="item.date"
      label="תאריך *"
      stack-label
      style="width: 350px"
    />
    <q-input filled type="time" v-model="item.startTimeFormat"
             label="התחלת משמרת *"
             stack-label/>
    <q-input filled type="time" v-model="item.endTimeFormat" label="סיום משמרת *"
             stack-label/>
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
    filled: {
      get() {
        return this.item.date && this.item.startTimeFormat && this.item.endTimeFormat
      },
      set() {
      }
    },
    ...mapState('shifts', ['shifts', 'editedShift', 'editedShiftId', 'userInfo'])
  },
  methods: {
    onSubmit() {
      if (this.userInfo && this.userInfo.wage) {
        this.calculateShift();
        this.setEditedShift(this.item);
        if (this.item.id) {
          this.updateShift();
          this.$router.push('/home').catch(() => {});
        } else {
          this.insertShift(this.item);
          this.onReset();
        }
      } else {
        //dialog to be opened
        this.onReset();
      }
    },
    calculateShift() {
      utills.makeShiftFromForm(this.item,this.userInfo.wage)
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
  }
}
</script>

<style scoped>
.form {

}
</style>
