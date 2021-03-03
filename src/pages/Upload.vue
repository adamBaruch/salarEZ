<template>
<div class="q-pa-xl" style="max-width: 400px">
  <q-circular-progress
      v-model="progress"
      show-value
      font-size="12px"
      size="100px"
      :thickness="0.30"
      color="teal"
      track-color="grey-3"
      class="q-ma-md"
  />
  <br/>
  <div class="q-gutter-md row items-start">
    <q-file
        v-model="photo"
        label="Pick files"
        filled
        counter
        max-files="3"
        multiple
        style="max-width: 300px"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
  </div>
  <q-btn label="העלאה" @click="upload"/>
</div>

</template>

<script>
import firebaseApi from "../middleware/firebaseApi";

export default {
  name: "Upload",

  data(){
    return {
      photo: null,
      progress: 0
    }
  },

  methods: {
    upload(){
      firebaseApi.uploadPhoto(this.photo,(prog)=>{
        this.progress=Math.round(prog);
      })
          // .then(
          // (prog)=>{
          //   this.progress = (prog.snapshot.bytesTransferred/prog.snapshot.totalBytes)*100
          // })


      // let prog = firebaseApi.uploadPhoto(this.photo, this.progress);
      // this.progress = Number(prog);
    }
  },
  watch:{
   // progress(){
   //   console.log(this.progress)
   // }
    // percentage = (snap.bytesTransferred/snap.totalBytes)*100;

  }
}
</script>

<style scoped>
</style>
