<template>
  <div class="q-pa-md" style="max-width: 400px">

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
          filled
          v-model="wage"
          label="שכר שעתי חדש  *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="שמור" type="submit" color="primary"/>
        <q-btn label="בטל" type="reset" color="primary" flat class="q-ml-sm"/>
      </div>
    </q-form>
    <div style="display: inline">
      <q-select rounded standout="bg-blue text-white" v-model="model" :options="options" label="Rounded standout"/>
      <q-select rounded standout="bg-blue text-white" v-model="model" :options="options" label="Rounded standout"/>
    </div>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  data() {
    return {
      wage: null,
      model: null,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  computed: mapState('shifts', [
    'shifts',
    'userInfo'
  ]),

  methods: {
    onSubmit() {
      this.setWage(this.wage);
      this.$router.push('/');
    },

    onReset() {
      this.name = null
    },
    ...mapActions('shifts', ['setWage'])
  }
}
</script>

<style scoped>

</style>
