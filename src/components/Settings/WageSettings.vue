<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      dense
      :disable="disableWageEdit"
      v-model="wage"
      label="שכר שעתי*"
      :lazy-rules="true"
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    >
      <template v-slot:after>
        <q-btn v-show="disableWageEdit"
               label="עריכה"
               flat
               @click="disableWageEdit=false"
        />
      </template>
    </q-input>
    <div v-show="!disableWageEdit" class="q-ma-none q-mx-md">
      <q-btn label="שמור" type="submit" color="primary"/>
      <q-btn label="בטל" type="reset" color="primary" flat class="q-ml-sm"/>
    </div>
  </q-form>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
name: "WageSettings",
  data(){
  return{
    disableWageEdit: true,
    wage: null,
  }
  },
  computed:{...mapState('shifts',['userInfo'])},
  created(){
    setTimeout(() => {
      this.wage = this.userInfo.wage
    }, 1200)
  },
  methods:{
    onSubmit() {
      this.disableWageEdit = true
      this.setWage(this.wage);
    },
    onReset() {
      this.disableWageEdit = true
    },
    ...mapActions('shifts', ['setWage'])

  }
}
</script>

<style scoped>

</style>
