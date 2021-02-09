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
    <q-btn
      class="q-ma-lg"
      color="primary"
      @click="signOut">
      התנתק
    </q-btn>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import {firebaseAuth} from "boot/firebase";

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
    signOut() {
      const self = this;
      firebaseAuth.signOut().then(() => {
        localStorage.removeItem('userId')
        self.$router.push('/b/login').catch(() => {
        });
      })
    },
    onSubmit() {
      this.setWage(this.wage);
      this.$router.push('/').catch(() => {
      });
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
