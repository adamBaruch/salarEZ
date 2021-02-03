<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          salarEZ
        </q-toolbar-title>

          <i
            class="fas fa-sign-out-alt fa-2x"
            @click="signOut">
            <q-tooltip
              transition-show="scale"
              transition-hide="scale"
            >
              התנתק
            </q-tooltip>
          </i>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item
          header
          class="text-grey-8"
        >
          <q-avatar
            :img="require('src/assets/salarEZ_logo.png')"
          />
          username something else
        </q-item>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer class="footer transparent border">
      <q-btn round
             color="primary"
             class="q-ma-sm buttonIcon"
             icon="event_note"
             @click="goToDataTable"
      >
        <template v-slot:append>
          <q-icon class="event_note"></q-icon>
        </template>
      </q-btn>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {firebaseAuth} from "boot/firebase";

const linksData = [
  {
    title: 'אודות',
    caption: '',
    icon: 'info',
    link: 'about'
  },
  {
    title: 'תלוש',
    caption:'',
    icon: 'fas fa-image',
    link: 'picture'
  },
  {
    title: 'משמרות',
    caption:'',
    icon: 'event_note',
    link: 'shifts'
  },
  {
    title: 'התנתקות',
    caption:'',
    icon: 'fas fa-sign-out-alt',
    link: 'logout'
  },

];

export default {
  name: 'MainLayout',
  components: {EssentialLink},
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  methods:{
    signOut() {
      const self = this;
      firebaseAuth.signOut().then(() => {
        localStorage.removeItem('userId')
        self.$router.push('/b/login').catch(() => {});
      })
    },
    goToDataTable() {
      this.$router.push('/dataTable').catch(() => {});
    }
  }
}
</script>

<style scoped>
.footer{
  color: #203674;
  font-size: 20px;
}
.buttonIcon{
  font-size: 15px;
}

</style>
