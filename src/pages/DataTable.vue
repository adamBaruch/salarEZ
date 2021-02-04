<template>
  <q-page>
    <q-btn dense
           flat
           class="q-pa-xs"
           icon="fas fa-arrow-right"
           @click="goBack"/>
    <q-btn  rounded
            label="הוספת משמרת"
            class="fixed-top-right"
            icon-right="fas fa-stopwatch"
            color="primary"
            style="margin-top: 55px"
            @click="goTo('/')"/>
    <DBTables/>
  </q-page>
</template>

<script>
import DBTables from "../components/DBTables";

export default {
  name: "my_shifts",
  components: {DBTables},
  methods: {
    goTo(route) {
      this.$router.push(route).catch(() => {})
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
