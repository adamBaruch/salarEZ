<template>
  <div>
    <Form/>
  </div>
</template>

<script>
import Form from "../components/Form";
//import dataFunc from "../middleware/dataFunc";

export default {
  name: "Update",
  components: {
    Form
  },
  methods:{
    gotoHome (){
      this.$router.push('/home');
    }
  }
}
</script>

<style scoped>
</style>
