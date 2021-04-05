<template>
  <q-page class="">
    <div class="constrain q-pa-sm">
      <q-btn-toggle
        v-model="secondModel"
        spread
        class="my-custom-toggle"
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="this.options"
      />
    </div>
      <q-page-container >
        <Clock v-if="secondModel" id="clock"/>
        <ShiftData v-else/>
      </q-page-container>
  </q-page>
</template>

<script>
import ShiftData from "components/ShiftData";
import Clock from "../components/Clock";
import {mapActions, mapMutations, mapState} from "vuex";


export default {
  name: 'Home',
  components: {ShiftData, Clock},
  data() {
    return {
      reload: false,
      secondModel: true,
      options: [
        {label: 'התחלת משמרת', value: true},
        {label: 'הוספת משמרת', value: false}
      ]
    }
  },
  created() {
    this.setTitle('salarEZ')
  },
  computed: mapState('shifts', ['shifts']),
  methods: {
    ...mapActions('shifts', ['getShifts']),
    ...mapMutations('shifts', ['setTitle'])
  }
}
</script>

<style scoped>
.my-custom-toggle {
  border: 2px solid #a8b7c1;
}

#clock {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
