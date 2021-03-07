<template>
<div class="row justify-center q-pa-lg">
  <q-form
    @submit="onSubmit"
    @reset="resetForm"
    class="column form">
    <div class="row pad">
      <div class="col-4 row items-center" style="font-size: 18px">
        תאריך:
      </div>
      <div class="col">
        <q-input
          :readonly="$route.params.id !== undefined"
          type="date"
          v-model="item.date"
          label="תאריך"
          stack-label
        />
      </div>
    </div>
    <div class="row pad">
      <div class="col-4 row items-center">
        <div style="font-size: 18px;">
          התחלה:
        </div>
      </div>
      <div class="col">
        <q-input type="time" v-model="item.startTimeFormat"
                 label="שעה"
                 stack-label>
        </q-input>
      </div>
    </div>
    <div class="row pad">
      <div class=" col-4 row items-center">
        <div style="font-size: 18px;">
          סיום:
        </div>
      </div>
      <div class="col">
        <q-input type="time" v-model="item.endTimeFormat" label="שעה"
                 stack-label>
        </q-input>
      </div>
    </div>
    <div class="row flex-center pad">
      <q-btn :label="item.id ? 'עדכן' : 'הוסף'"
             :disable="this.$v.$invalid"
             type="submit"
             color="primary"/>
      <q-btn label="נקה" type="reset" color="primary" flat class="q-ml-sm"/>
    </div>
  </q-form>
  <span class="text-body2 absolute-bottom-right q-pa-sm"><b>*תעריף:</b> {{ userInfo.wage }}  ש"ח לשעה</span>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import utills from "../middleware/utill";
import DBTables from "components/ShiftsTable";
import {required} from "vuelidate/lib/validators";

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
    if (this.$route.params.id) {
      const today = new Date();
      if (!this.shifts.hasOwnProperty(today.getFullYear()))
        this.$router.push('/')
      else
        for (const key in this.editedShift)
          this.item[key] = this.editedShift[key];
    }
  },
  computed: {
    ...mapState('shifts', ['shifts', 'editedShift', 'userInfo'])
  },
  methods: {
    onSubmit() {
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
      this.$q.dialog({
        title: 'משמרת נוספה בהצלחה'
      })
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
  validations: {
    item: {
      date: {
        required
      },
      startTimeFormat: {
        required
      },
      endTimeFormat: {
        required
      },
    }
  }
}
</script>

<style scoped>
.pad{
  padding: 12px;
}
</style>
