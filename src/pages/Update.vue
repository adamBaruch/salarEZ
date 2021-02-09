<template>
  <div>
    <Form/>
  </div>
</template>

<script>
import Form from "../components/Form";

export default {
  name: "Update",
  components: {
    Form
  },
  methods:{
    gotoHome (){
      this.$router.push('/').catch(() => {});
    }
  }
}
</script>

<style scoped>
</style>
