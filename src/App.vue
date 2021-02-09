<template>
  <div id="q-app">
    <q-layout>
      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  name: 'App',
  methods:{
    ...mapActions('shifts',['getUserInfo'])
  },
  created(){
    this.getUserInfo();
  }
}
</script>
