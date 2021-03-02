<template>
  <q-page class="flex flex-center column">
    <div class="flex flex-center q-ma-sm">
      <img src="../assets/salarEZ_logo.png" class="q-ma-md" alt="logo">
    </div>
    <div class="flex flex-center column">
      <q-form @submit="createUser" class="column">
        <q-input
          outlined
          standout="text-grey-5"
          v-model="user.name"
          label="הכנס שם"
          style="width: 350px"
          v-model.trim="user.name"
          :lazy-rules="true"
          :rules="[ val => !!val || 'אנא בחר שם',
                        () => $v.user.name.minLength || 'השם קצר מידי']"
        />
        <q-input
          outlined
          standout="text-grey-5"
          v-model="user.email"
          label="הכנס אימייל"
          type="email"
          @input="$v.user.email.$touch"
          :lazy-rules="true"
          :rules="[ val => !!val || 'אנא הכנס אימייל',
                        () => $v.user.email.email || 'אימייל לא תקין']">

          <template v-slot:append>
            <q-icon name="mail"/>
          </template>
        </q-input>
        <q-input
          outlined
          standout="text-grey-5"
          v-model="user.password"
          label="הכנס סיסמא"
          :type="isPwd ? 'password' : 'text'"
          @input="$v.user.password.$touch"
          :lazy-rules="true"
          :rules="[ val => !!val || 'אנא הכנס סיסמא',
                        () => $v.user.password.alphaNum || 'ניתן להשתמש רק באותיות באנגלית או במספרים',
                        () => $v.user.password.minLength || 'סיסמא קצרה מידי']">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn
          rounded
          class="q-mb-sm q-py-xs"
          color="blue"
          icon-right="login"
          @click="createUser()"
          label="הרשמה"/>
      </q-form>
    </div>
    <div>
      <q-btn label="משתמש קיים" flat @click="gotoLogin"></q-btn>
    </div>
  </q-page>
</template>

<script>
import {email, minLength, alphaNum} from 'vuelidate/lib/validators'
import {mapActions,mapMutations} from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
      },
      isPwd: true,
    }
  },
  methods: {
    async createUser() {
      try {
        await this.passwordLogin(this.user)
        this.setUserInfo({name: this.user.name})
        this.$router.push('/b/settings_init').catch(() => {})
      } catch (error) {
        console.log('error: ' + error)
      }
    },
    gotoLogin(){
      this.$router.push('/b/login').catch(() => {})
    },
    ...mapActions('shifts',['passwordLogin']),
    ...mapMutations('shifts',['setUserInfo'])
  },
  validations: {
    user: {
      email: {
        email
      },
      name: {
        minLength: minLength(2)
      },
      password: {
        alphaNum,
        minLength: minLength(6)
      },
    }
  }
}
</script>
