<template>
  <div>
    <q-btn label="הוספת משמרת" @click="goToForm"/>
    <q-btn icon="keyboard_backspace"  @click="goBack">חזור</q-btn>
    <DBTables/>
  </div>
</template>

<script>
import DBTables from "../components/DBTables";

export default {
  name: "DataTable",
  components: {DBTables},
  methods: {
    goToForm() {
      this.$router.push('/addShift').catch(() => {})
    },
    goBack() {
      this.$router.push('/Home').catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
