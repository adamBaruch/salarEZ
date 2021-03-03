<template>
  <q-page class="constrain">
    <q-list class="q-mt-xs" style="font-size: 18px">
      <q-item
        class="text-grey-8"
      >
        <q-item-section avatar>
          <q-avatar size="70px" @click="changePic">
            <q-img :src="userInfo.profileImg"/>
          </q-avatar>
        </q-item-section>
        <q-separator vertical :inset="true"></q-separator>
        <q-item-section class="relative-position">
          <q-item-label class="q-ma-md">{{ userInfo.name }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator :inset="true"></q-separator>
      <q-item clickable @click="$router.push('wage_settings')">
        <q-item-section avatar>
          <q-icon name="fas fa-shekel-sign" color="primary"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            שכר שעתי
          </q-item-label>
          <q-item-label caption>
            עדכון השכר השעתי (החל מהמשמרת הנוכחית)
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="$router.push('overtime_settings')">
        <q-item-section avatar>
          <q-icon name="fas fa-calculator" color="primary"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>שעות נוספות</q-item-label>
          <q-item-label caption>עדכון חלוקת השעות לפי אחוזים</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-page-sticky position="bottom-right">
      <q-btn
        rounded
        class="q-ma-md q-pa-xs"
        color="primary"
        @click="signOut">
        התנתק
      </q-btn>
    </q-page-sticky>
    <q-file v-model="pic" ref="file" style="display: none" @input="savePic($event)"/>
  </q-page>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import {firebaseAuth} from "boot/firebase";

export default {
  name: "SettingsMain",
  data(){
    return{
      pic: null
    }
  },
  created() {
    this.setTitle('הגדרות')
  },
  computed:{
    ...mapState('shifts',['userInfo'])
  },
  methods: {
    signOut() {
      const self = this;
      firebaseAuth.signOut().then(() => {
        localStorage.removeItem('userId')
        this.resetState();
        self.$router.push('/b/login')
      })
    },
    changePic(){
      this.$refs.file.pickFiles()
    },
    ...mapActions('shifts', ['resetState','savePic']),
    ...mapMutations('shifts', ['setTitle'])
  }
}
</script>

<style scoped>

</style>
