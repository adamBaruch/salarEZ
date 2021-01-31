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
          <q-input type="number" hint="שכר שעתי" v-model="wage"></q-input>
          <q-btn flat outline :disable="wage===''" @click="forward"> שמור </q-btn>
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
import {mapActions} from "vuex";

export default {
  name: "SettingsCarousel",
  data() {
    return {
      slide: 'style',
      wage: ''
    }
  },
  methods: {
    forward() {
      this.setWage(this.wage)
      this.$router.push('/')
    },
    ...mapActions('shifts', ['setWage'])
  }
}
</script>
