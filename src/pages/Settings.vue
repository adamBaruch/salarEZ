<template>
  <div class="q-pa-md" style="max-width: 400px">
    <WageSettings/>
    <OvertimeSettings/>
    <q-page-sticky position="bottom-right">
      <q-btn
        rounded
        class="q-ma-md"
        color="secondary"
        @click="signOut">
        התנתק
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import {firebaseAuth} from "boot/firebase";
import OvertimeSettings from "components/Settings/OvertimeSettings";
import WageSettings from "components/Settings/WageSettings";

export default {
  components: {
    OvertimeSettings,
    WageSettings
  },
  methods: {
    signOut() {
      const self = this;
      firebaseAuth.signOut().then(() => {
        localStorage.removeItem('userId')
        this.resetState();
        self.$router.push('/b/login').catch(() => {
        });
      })
    },
    ...mapActions('shifts', ['resetState'])
  }
}
</script>

<style scoped>
</style>
