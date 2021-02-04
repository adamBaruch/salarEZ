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

    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab
        icon="add"
        direction="up"
        padding="7px"
        color="secondary"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action round
                      v-for="btn in fabs"
                      :key="btn.icon"
                      :color="btn.color"
                      :icon="btn.icon"
                      @click="goTo(btn.link)"/>

      </q-fab>
    </q-page-sticky>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {firebaseAuth} from "boot/firebase";

const fabs = [
  {
    color: 'primary',
    icon: 'event_note',
    link: '/my_shifts'
  },
  {
    color: 'primary',
    icon: 'fas fa-stopwatch',
    link: '/'
  },
  {
    color: 'primary',
    icon: 'settings',
    link: '/settings'
  }
]
//todo: check about the little scroll that i cant get rid of
const linksData = [
  {
    title: 'אודות',
    caption: '',
    icon: 'info',
    link: 'about'
  },
  {
    title: 'תלוש',
    caption: '',
    icon: 'fas fa-image',
    link: 'upload'
  },
  {
    title: 'משמרות',
    caption: '',
    icon: 'event_note',
    link: 'my_shifts'
  },
  {
    title: 'התנתקות',
    caption: '',
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
      fabs: fabs,
      essentialLinks: linksData,
      fabPos: [18, 18],
      draggingFab: false
    }
  },
  methods: {
    signOut() {
      const self = this;
      firebaseAuth.signOut().then(() => {
        localStorage.removeItem('userId')
        self.$router.push('/b/login').catch(() => {
        });
      })
    },
    goTo(route) {
      this.$router.push(route).catch(() => {
      });
    },
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] + ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    }
  }
}
</script>

<style scoped>


</style>
