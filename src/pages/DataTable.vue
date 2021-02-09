<template>
  <q-page>
    <q-btn dense
           flat
           class="q-pa-xs"
           color="secondary"
           icon="fas fa-arrow-right"
           @click="goBack"/>
    <DBTables/>
  </q-page>
</template>

<script>
import DBTables from "../components/DBTables";

export default {
  name: "my_shifts",
  components: {DBTables},
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
