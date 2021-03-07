<template>
  <q-page class="flex flex-center column bg-white">
    <div class="flex flex-center q-ma-lg ">
      <img src="../assets/salarEZ_logo.png" alt="logo">
    </div>
    <div class="flex flex-center column">
      <q-form class="column">
        <q-input outlined
                 standout="text-grey-5"
                 v-model="tempUser.email"
                 label="הכנס אימייל"
                 type="email"
                 style="width: 350px"
                 @input="this.$v.tempUser.email.$touch"
                 :lazy-rules="true"
                 :rules="[ val => !!val || 'כתובת אימייל',
                        () => this.$v.tempUser.email.email || 'אימייל לא חוקי']">
          <template v-slot:append>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-input outlined
                 v-model="tempUser.password"
                 standout="text-grey-5"
                 label="הכנס סיסמא"
                 :type="isPwd ? 'password' : 'text'"
                 @input="this.$v.tempUser.password.$touch"
                 :lazy-rules="true"
                 :rules="[ val => !!val || 'אנא הכנס סיסמא',
                        () => this.$v.tempUser.password.alphaNum || 'ניתן להשתמש רק באותיות ומספרים',
                        () => this.$v.tempUser.password.minLength || 'הסיסמא קצרה מידי',]">

          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-btn no-caps rounded color="blue" :disable="this.$v.$invalid" icon-right="login" label="התחבר" @click="passwordSignIn"
               class="q-mb-sm q-py-xs"/>
        <q-separator size="1px" color="dark" inset="true" class="q-my-sm"/>
        <q-btn rounded
               no-caps
               color="blue"
               icon-right="fab fa-google"
               label="google"
               class="q-mt-sm q-py-xs"
               @click="googleRegister"
        />
        <div class="flex flex-center q-ma-lg">
          <q-btn flat dense @click="goToSignUp">הרשמה</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import {email, alphaNum, minLength,required} from 'vuelidate/lib/validators'
import {mapActions} from "vuex";

export default {
  name: "login",
  data() {
    return {
      tempUser: {
        email: null,
        password: null
      },
      isPwd: true
    }
  },
  methods: {
    async googleRegister() {
      const res = await this.googleLogin()
      await this.$router.push(res)
    },
    async passwordSignIn() {
      try {
        await this.passwordLogin(this.tempUser);
        await this.$router.push('/')
      } catch (err) {
        this.$q.dialog({
          title: 'שגיאה',
          message: 'אימייל או סיסמא אינם נכונים'
        })
        console.log(err)
      }
    },
    goToSignUp() {
      this.$router.push('/b/signup')
    },
    ...mapActions('shifts', ['passwordLogin', 'googleLogin'])
  },
  validations: {
    tempUser: {
      email: {
        required,
        email
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(6)
      },
    }
  }
}
</script>

<style scoped>
</style>
