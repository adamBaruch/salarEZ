<template>
  <q-page class="flex flex-center column">
    <div class="flex flex-center q-ma-lg ">
      <img src="../assets/salarEZ_logo.png"
           alt="logo"
           style="max-height: 30vh"
      >
    </div>
    <div class="flex flex-center column">
      <q-form @submit="sendEmail" class="column">
        <q-input
          outlined
          standout="text-grey-5"
          v-model="user.name"
          label="הכנס שם"
          style="width: 90vw;max-width: 400px"
          v-model.trim="user.name"
          :lazy-rules="true"
          :rules="[ val => !!val || 'אנא בחר שם',
                        () => this.$v.user.name.minLength || 'השם קצר מידי']"
        />
        <q-input
          outlined
          standout="text-grey-5"
          v-model="user.email"
          label="הכנס אימייל"
          type="email"
          @input="this.$v.user.email.$touch"
          :lazy-rules="true"
          :rules="[ val => !!val || 'אנא הכנס אימייל',
                        () => this.$v.user.email.email || 'אימייל לא תקין']">

          <template v-slot:append>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-btn
          rounded
          class="q-mb-sm q-py-xs"
          color="blue"
          icon-right="login"
          :disable="this.$v.$invalid"
          @click="sendEmail()"
          label="הרשמה"/>
      </q-form>
    </div>
    <div>
      <q-btn label="משתמש קיים" flat @click="gotoLogin"></q-btn>
    </div>
  </q-page>
</template>

<script>
import {email, minLength, required} from 'vuelidate/lib/validators'
import {firebaseAuth} from "boot/firebase";

const actionCodeSettings = {
  url: 'https://salar-ez.web.app',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.shembeku.salarEZ',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'salarez.page.link'
};

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
      },
    }
  },
  methods: {
    async sendEmail(){
      await firebaseAuth.sendSignInLinkToEmail(this.user.email, actionCodeSettings)
      const newUserInfo = JSON.stringify({email: this.user.email,name: this.user.name})
      window.localStorage.setItem('emailForSignIn', newUserInfo);
      this.$q.dialog({
        title: 'אימייל לוידוא נשלח',
        message: 'יש לאשר את המייל באמצעות לחיצה על הקישור'
      })
    },
    gotoLogin() {
      this.$router.push('/b/login').catch(() => {
      })
    },
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      name: {
        required,
        minLength: minLength(2)
      }
    }
  }
}
</script>
