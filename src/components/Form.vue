<template>
  <q-form @submit="onSubmit" @reset="resetForm" class="q-gutter-md constrain column">
   <span>{{ item.id ? 'עריכה' : 'הוספה'}}</span>
    <q-input
      filled
      :readonly="$route.params.id !== undefined"
      type="date"
      v-model="item.date"
      label="תאריך *"
      stack-label
    />
    <div class="q-gutter-sm">
      <q-input filled type="time" v-model="item.startTimeFormat"
               label="שעה"
               stack-label>
        <template v-slot:prepend>
          התחלה
        </template>
      </q-input>
      <q-input filled type="time" v-model="item.endTimeFormat" label="שעה"
               stack-label>
        <template v-slot:prepend>
          סיום
        </template>
      </q-input>
    </div>
    <span class="text-body1"><b>*תעריף:</b> {{ userInfo.wage}}  ש"ח לשעה</span>
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
      set(){}
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
        return utills.makeShiftFromForm(this.item, this.userInfo.wage)
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
