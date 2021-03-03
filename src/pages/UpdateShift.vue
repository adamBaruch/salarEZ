<template>
  <div>
    <ShiftData/>
  </div>
</template>

<script>
import ShiftData from "components/ShiftData";
import {mapMutations} from "vuex";

export default {
  name: "Update",
  components: {
    ShiftData
  },
  created() {
    this.setTitle('עריכת משמרת')
  },
  methods:{
    ...mapMutations('shifts',['setTitle'])
  }
}
</script>

<style scoped>
</style>
