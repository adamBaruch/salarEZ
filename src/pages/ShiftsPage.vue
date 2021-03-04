<template>
  <q-page>
    <q-btn dense
           flat
           class="q-pa-xs"
           color="secondary"
           icon="fas fa-arrow-right"
           @click="goBack"
    />
    <ShiftsTable/>
  </q-page>
</template>

<script>
import ShiftsTable from "components/ShiftsTable";
import {mapActions} from "vuex";

export default {
  name: "my_shifts",
  components: {ShiftsTable},
  created() {
    this.setTitle('משמרות')
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    ...mapActions('shifts',['setTitle'])
  }
}
</script>

<style scoped>

</style>
