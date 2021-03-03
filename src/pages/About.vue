<template>
  <q-page class="flex flex-center">
    <div>
      <p>אפליקציה זו משמשת שכירים לחישוב המשכורת החודשית</p>
    </div>
  </q-page>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  created() {
    this.setTitle('אודות')
  },
  methods:{
    ...mapMutations('shifts',['setTitle'])
  }
}
</script>
