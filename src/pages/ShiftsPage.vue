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
    <q-page-sticky position="bottom-right">
      <q-btn rounded
             fixed-center
             label="הוספת משמרת"
             class="sticky-btn"
             icon-right="fas fa-stopwatch"
             text-color="primary"
             @click="goTo('/')"
      />
    </q-page-sticky>
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
    goTo(route) {
      this.$router.push(route)
    },
    ...mapActions('shifts',['setTitle'])
  }
}
</script>

<style scoped>
.sticky-btn{
  padding: 4px 0;
  margin: 18px 12px;
}
</style>
