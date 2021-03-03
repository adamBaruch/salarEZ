<template>
  <q-page>
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      arrows
      fullscreen
      class="bg-primary text-white shadow-1"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="settings"/>
        <div class="q-mt-md text-center">
          <h3>הגדרות חשובות</h3>
          <q-input type="number" hint="שכר שעתי" v-model="newUserInfo.wage"></q-input>
          <q-btn flat outline :disable="newUserInfo.wage===''" @click="forward"> שמור </q-btn>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="דגכ" class="column no-wrap flex-center">
        <q-icon name="style 3x"/>
        <div class="q-mt-md text-center">
          ננה בננה
        </div>
      </q-carousel-slide>
    </q-carousel>
  </q-page>
</template>

<script>
import {mapActions, mapState} from "vuex";
import utils from "../../middleware/utill"
export default {
  name: "InitSettings",
  data() {
    return {
      newUserInfo:{
        name: '',
        wage: '',
        profileImg:'https://cdn3.iconfinder.com/data/icons/mixed-communication-and-ui-pack-1/48/general_pack_NEW_glyph_profile-512.png',
        overtimeSettings: utils.defaultOvertimeSettings
      },
      slide: 'style',
    }
  },
  created() {
    this.newUserInfo.name = this.userInfo.name
  },
  computed: {
    ...mapState('shifts', ['userInfo'])
  },
  methods: {
    forward() {
      this.setUserInfo(this.newUserInfo)
      this.$router.push('/').catch(() => {})
    },
    ...mapActions('shifts', ['setUserInfo'])
  }
}
</script>
