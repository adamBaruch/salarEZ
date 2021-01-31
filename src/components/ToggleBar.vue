<template>
  <q-btn-toggle
      v-model="toggle"
      spread
      class="my-custom-toggle"
      rounded
      unelevated
      toggle-color="primary"
      color="white"
      text-color="primary"
      :options="[
          {label: 'התחלת משמרת',clock:true},
          {label: 'הוספת משמרת', clock:false}
        ]"
  />
</template>

<script>
export default {
name: "toggleBar",
  data () {
    return {
      toggle: 'one'
    }
  }
}
</script>

<style lang="sass" scoped>

.my-custom-toggle
  margin: 10px
  direction: ltr
  border: 1px solid #027be3
</style>