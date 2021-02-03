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
                 @input="$v.tempUser.email.$touch"
                 lazy-rules
                 :rules="[ val => !!val || 'כתובת אימייל',
                        () => $v.tempUser.email.email || 'אימייל לא חוקי']">
          <template v-slot:append>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-input outlined
                 v-model="tempUser.password"
                 standout="text-grey-5"
                 label="הכנס סיסמא"
                 :type="isPwd ? 'password' : 'text'"
                 @input="$v.tempUser.password.$touch"
                 lazy-rules
                 :rules="[ val => !!val || 'אנא הכנס סיסמא',
                        () => $v.tempUser.password.alphaNum || 'ניתן להשתמש רק באותיות ומספרים',
                        () => $v.tempUser.password.minLength || 'הסיסמא קצרה מידי',]">

          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
          </template>
        </q-input>
        <q-btn no-caps rounded color="blue" icon-right="login" label="התחבר" @onclick="passwordLogin"
               class="q-mb-sm q-py-xs"/>
        <q-separator size="1px" color="dark" inset="true" class="q-my-sm"/>
        <q-btn rounded
               no-caps
               color="blue"
               icon-right="fab fa-google"
               label="google"
               class="q-mt-sm q-py-xs"
               @click="googleRegister"/>
        <div class="flex flex-center q-ma-lg">
          <q-btn flat dense @click="goToSignUp">הרשמה</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import {firebaseAuth } from 'boot/firebase';
import firebase from "boot/firebase";
import {email, alphaNum, minLength} from 'vuelidate/lib/validators'

const provider = new firebase.firebase.auth.GoogleAuthProvider();

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
    googleRegister() {
      firebaseAuth.signInWithPopup(provider).then((res) => {
        if (res.additionalUserInfo.isNewUser)
          this.$router.push('/b/settings_init').catch(() => {})
        else
          this.$router.push('/').catch(() => {})
      }).catch(function (error) {

      });
    },
    passwordLogin() {
      firebaseAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.push('/').catch(() => {})
        })
    },
    goToSignUp() {
      this.$router.push('/b/signup').catch(() => {});
    }
  },
  validations: {
    tempUser: {
      email: {
        email
      },
      password: {
        alphaNum,
        minLength: minLength(6)
      },
    }
  }
}
</script>

<style scoped>
.form {
  direction: rtl;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
