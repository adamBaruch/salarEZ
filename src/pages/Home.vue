<template>
  <q-page>
    <div class="constrain">
      <q-btn-toggle
        v-model="secondModel"
        spread
        class="my-custom-toggle q-ma-sm"
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="this.options"
      />
    </div>

      <clock v-if="secondModel" id="clock"/>
      <Form v-else/>
  </q-page>
</template>

<script>
import Form from "../components/Form";
import DBTables from "../components/DBTables";
import clock from "../components/Clock";
import ToggleBar from "../components/ToggleBar";
import {mapActions, mapState} from "vuex";


export default {
  name: 'Home',
  components: {
    ToggleBar, DBTables, Form, clock
  },
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
  computed: mapState('shifts', [
    'shifts'
  ]),
  methods: {
    ...mapActions('shifts', ['getShifts'])
  }
}
</script>

<style scoped>
.my-custom-toggle {
  border: 2px solid #3396f3;
}

#clock {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
