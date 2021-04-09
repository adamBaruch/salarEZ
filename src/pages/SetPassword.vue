<template>
<q-page class="flex flex-center column">
  <q-input outlined
           standout="text-grey-5"
           v-model="pass1"
           label="סיסמא חדשה"
           type="password"
           style="width: 90vw;max-width: 400px"
           @input="$v.pass1.$touch"
           :lazy-rules="true"
           :rules="[ val => !!val || 'אנא הכנס סיסמא',
                        () => $v.pass1.alphaNum || 'ניתן להשתמש רק באותיות באנגלית או במספרים',
                        () => $v.pass1.minLength || 'סיסמא קצרה מידי']"
  >
    <q-icon
      :name="isPwd ? 'visibility_off' : 'visibility'"
      class="cursor-pointer"
      @click="isPwd = !isPwd"
    />
  </q-input>
  <q-input outlined
           standout="text-grey-5"
           v-model="pass2"
           label="סיסמא חדשה"
           type="password"
           style="width: 90vw;max-width: 400px"
           @input="$v.pass2.$touch"
           :lazy-rules="true"
           :rules="[ val => !!val || 'אנא הכנס סיסמא',
                        () => $v.pass2.alphaNum || 'ניתן להשתמש רק באותיות באנגלית או במספרים',
                        () => $v.pass2.minLength || 'סיסמא קצרה מידי']"
  >
    <q-icon
      :name="isPwd ? 'visibility_off' : 'visibility'"
      class="cursor-pointer"
      @click="isPwd = !isPwd"
    />
  </q-input>
  <q-btn
    rounded
    class="q-mb-sm q-py-xs"
    color="blue"
    icon-right="אישור"
    :disable="$v.$invalid && !passMatch"
    @click="createUser()"
    label="הרשמה"/>
</q-page>
</template>

<script>
import {alphaNum, minLength, required} from 'vuelidate/lib/validators';

import {mapActions, mapMutations} from "vuex";
// window.localStorage.removeItem('emailForSignIn');
export default {
  name: "SetPassword",
  data(){
    return {
      pass1: '',
      pass2: '',
      isPwd: true,
      tempUser:{
        name: '',
        email: null,
        password: null
      }
    }
  },
  created(){
    this.tempUser = JSON.parse(window.localStorage.getItem('emailForSignIn'));
  },
  computed:{
    passMatch: function (){
      return this.pass1 === this.pass2
    }
  },
  methods:{
    async createUser() {
      try {
        this.tempUser.password = this.pass1;
        await this.passwordRegister(this.tempUser)
        this.setUserInfo({name: this.tempUser.name})
        this.$router.push('/b/settings_init').catch(() => {
        })
      } catch (error) {
        this.$q.dialog({
          title: 'שגיאה',
          message: error.message.includes('already') ? 'האימייל כבר רשום במערכת' : 'האימייל אינו תקין'
        })
        console.log('error: ' + error)
      }
    },
    ...mapActions('shifts', ['passwordRegister']),
    ...mapMutations('shifts', ['setUserInfo'])
  },
  validation:{
    pass1:{
      password: {
        required,
        alphaNum,
        minLength: minLength(6)
      },
    },
    pass2:{
      password: {
        required,
        alphaNum,
        minLength: minLength(6)
      },
    }
  }
}
</script>

