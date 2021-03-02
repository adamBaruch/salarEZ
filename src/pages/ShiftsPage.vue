<template>
  <q-page>
    <q-btn dense
           flat
           class="q-pa-xs"
           color="secondary"
           icon="fas fa-arrow-right"
           @click="goBack"/>
    <ShiftsTable/>
  </q-page>
</template>

<script>
import ShiftsTable from "components/ShiftsTable";

export default {
  name: "my_shifts",
  components: {ShiftsTable},
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
