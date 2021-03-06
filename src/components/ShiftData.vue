<template>

  <q-form @submit="onSubmit" @reset="resetForm" class="q-gutter-md q-pr-md constrain2 column">
    <div class="row">
      <div class="col-2 row items-center" style="font-size: 18px">
        תאריך:
      </div>
      <div class="col">
    <q-input
      filled
      :readonly="$route.params.id !== undefined"
      type="date"
      v-model="item.date"
      label="תאריך "
      stack-label
    />
      </div>
    </div>
    <div  class="row">
      <div class="col-2 row items-center">
        <div style="font-size: 18px;">
          התחלה:
        </div>
      </div>
      <div class="col">
      <q-input filled type="time" v-model="item.startTimeFormat"
               label="שעה"
               stack-label>
      </q-input>
      </div>
    </div>
    <div class="row">
      <div class=" col-2 row items-center">
        <div style="font-size: 18px;">
        סיום:
        </div>
      </div>
      <div class="col">
    <q-input filled type="time" v-model="item.endTimeFormat" label="שעה"
             stack-label>
    </q-input>
      </div>
    </div>
    <span class="text-body1"><b>*תעריף:</b> {{ userInfo.wage }}  ש"ח לשעה</span>
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
import DBTables from "components/ShiftsTable";

export default {
  name: "ShiftData",
  components: {DBTables},
  data() {
    return {
      item: {
        date: '',
        startTimeFormat: '',
        endTimeFormat: '',
      },
    }
  },
  created() {
    if (this.$route.params.id)
      for (const key in this.editedShift)
        this.item[key] = this.editedShift[key];
  },
  computed: {
    filled: {
      get() {
        return this.item.date && this.item.startTimeFormat && this.item.endTimeFormat
      },
      set() {
      }
    },
    ...mapState('shifts', ['editedShift', 'userInfo'])
  },
  methods: {
    onSubmit() {
      if (this.userInfo && this.userInfo.wage) {
        const shift = this.calculateShift();
        if (this.$route.params.id) {
          shift.id = this.$route.params.id
          this.updateShift(shift);
          this.$router.push('/').catch(() => {
          });
        } else {
          this.insertShift(shift);
          this.resetForm();
        }
      } else {
        this.resetForm();
      }
    },
    calculateShift() {
      return utills.makeShiftFromForm(this.item, this.userInfo.wage, this.userInfo.overtimeSettings)
    },
    resetForm() {
      for (const key in this.item) {
        this.item[key] = '';
      }
    },
    ...mapActions('shifts', ['insertShift', 'updateShift', 'setEditedShift'])
  },
}
</script>

<style scoped>
</style>
