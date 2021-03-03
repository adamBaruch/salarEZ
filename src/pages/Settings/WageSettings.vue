<template>
  <q-page class="q-ma-md">
    <div class="row">
      <q-input
        filled
        v-model="wage"
      >
        <template v-slot:before>
          <div style="font-size: 18px; color: black" >
          שכר שעתי:
          </div>
        </template>
      </q-input>
    </div>
    <div class="q-ma-md">
      <q-btn label="שמור" @click="onSubmit" color="primary"/>
      <q-btn label="בטל" @click="onReset" color="primary" flat class="q-ml-sm"/>
    </div>
  </q-page>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "WageSettings",
  data() {
    return {
      wage: null,
    }
  },
  computed: {...mapState('shifts', ['userInfo'])},
  created() {
    setTimeout(() => {
      this.wage = this.userInfo.wage
    }, 1200)
  },
  methods: {
    onSubmit() {
      this.setWage(this.wage);
    },
    onReset() {
      this.wage = this.userInfo.wage
    },
    ...mapActions('shifts', ['setWage'])
  }
}
</script>

<style scoped>

</style>
