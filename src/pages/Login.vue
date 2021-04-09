<template>
  <q-page class="flex flex-center column">
    <div class="flex flex-center q-ma-lg ">
      <img src="../assets/salarEZ_logo.png"
           alt="logo"
           style="max-height: 30vh"
      >
    </div>
    <div class="flex flex-center column">
      <q-form class="column">
        <q-input outlined
                 standout="text-grey-5"
                 v-model="tempUser.email"
                 label="אימייל"
                 type="email"
                 style="width: 90vw;max-width: 400px"
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
                 label="סיסמא"
                 :type="isPwd ? 'password' : 'text'"
                 @input="this.$v.tempUser.password.$touch"
                 :lazy-rules="true"
                 :rules="[ val => !!val || 'אנא הכנס סיסמא',
                        () => this.$v.tempUser.password.alphaNum || 'ניתן להשתמש רק באותיות באנגלית ומספרים',
                        () => this.$v.tempUser.password.minLength || 'הסיסמא קצרה מידי',]">

          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-btn no-caps rounded color="blue" :disable="this.$v.$invalid" icon-right="login" label="התחבר"
               @click="passwordSignIn"
               class="q-mb-sm q-py-xs"/>
        <q-separator size="1px" color="dark" inset="true" class="q-my-sm"/>
        <q-btn rounded
               no-caps
               color="blue"
               icon-right="fab fa-google"
               label="google"
               class="q-mt-sm q-py-xs"
               @click="googleLogin($router)"
        />
        <div class="flex flex-center q-ma-lg">
          <q-btn flat dense @click="goToSignUp">הרשמה</q-btn>
        </div>
      </q-form>

    </div>
  </q-page>
</template>

<script>
import {email, alphaNum, minLength, required} from 'vuelidate/lib/validators'
import {mapActions} from "vuex";
import {firebaseAuth} from "boot/firebase";

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
  async created() {
    const res = await firebaseAuth.getRedirectResult()
    if (res.user){
      console.log(res.user)
      if (res.additionalUserInfo.isNewUser)
        await this.$router.push('/b/settings_init')
      else
        await this.$router.push('/')
    }
    if (firebaseAuth.isSignInWithEmailLink(window.location.href)) {
      console.log('insignin')
      const newUserInfo = JSON.parse(window.localStorage.getItem('emailForSignIn'));
      if (newUserInfo && newUserInfo.email) {
        console.log(2)
        //todo: what this function do?
        console.log(window.location.href)
        // await firebaseAuth.signInWithEmailLink(newUserInfo.email, window.location.href)
        await this.$router.replace('/b/set_password')
        console.log('router activated')
      }
    }
  },
  methods: {
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
    ...mapActions('shifts', ['passwordLogin','googleLogin']),
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
