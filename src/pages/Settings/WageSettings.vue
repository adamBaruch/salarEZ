<template>
  <q-page class="">
    <q-btn dense
           flat
           class="q-pa-xs"
           color="secondary"
           icon="fas fa-arrow-right"
           @click="goBack"
    />
    <div class="row" style="width: 150px">
      <q-skeleton class="q-ml-sm" :type="'QInput'" style="width: 150px" v-if="!finishedLoading"/>
      <q-input
        type="number"
        v-model="wage"
        v-if="finishedLoading"
        class="q-ml-sm"
      >
        <template v-slot:before>
          <div style="font-size: 18px; color: black">
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
      finishedLoading: false
    }
  },
  computed: {...mapState('shifts', ['userInfo'])},
  async created() {
    if (this.userInfo.wage === '')
      await this.getUserInfo()
    this.wage = this.userInfo.wage
    this.finishedLoading = true
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onSubmit() {
      this.setWage(this.wage);
    },
    onReset() {
      this.wage = this.userInfo.wage
    },
    ...mapActions('shifts', ['setWage','getUserInfo'])
  }
}
</script>

<style scoped>

</style>
