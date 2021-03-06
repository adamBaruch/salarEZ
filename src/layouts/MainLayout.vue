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
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item
          class="text-grey-8"
        >
          <q-item-section>
            <q-avatar size="70px">
              <q-img :src="userInfo.profileImg"/>
            </q-avatar>
          </q-item-section>
          <q-item-section class="relative-position">
            <q-item-label class="absolute-bottom">{{ userInfo.name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator :inset="true" class="q-my-sm"/>
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
    <q-page-sticky :offset="fabPos">
      <q-fab
        icon="add"
        label-class="bg-grey-3 text-purple"
        direction="up"
        label="פעולות"
        padding="10px"
        external-label
        color="secondary"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      >
        <q-fab-action round
                      label-class="bg-grey-3 text-grey-8"
                      external-label
                      color="primary"
                      :label="btn.name"
                      v-for="btn in fabs"
                      :key="btn.icon"
                      :color="btn.color"
                      :icon="btn.icon"
                      @click="goTo(btn.link)"
        />
      </q-fab>

    </q-page-sticky>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import {mapState} from "vuex";

const fabs = [
  {
    name: 'משמרות',
    color: 'primary',
    icon: 'event_note',
    link: 'my_shifts',
  },
  {
    name: 'התחלת משמרת',
    color: 'primary',
    icon: 'fas fa-stopwatch',
    link: ''
  },
  {
    name: 'הגדרות',
    color: 'primary',
    icon: 'settings',
    link: 'settings'
  }
]
const linksData = [
  // {
  //   title: 'אודות',
  //   caption: '',
  //   icon: 'info',
  //   link: '/about'
  // },
  // {
  //   title: 'תלוש',
  //   caption: '',
  //   icon: 'fas fa-image',
  //   link: '/upload'
  // },
  {
    title: 'משמרות',
    caption: '',
    icon: 'event_note',
    link: '/my_shifts'
  },
  {
    title: 'הגדרות',
    caption: '',
    icon: 'settings',
    link: '/settings'
  }
];

export default {
  name: 'MainLayout',
  components: {EssentialLink},
  data() {
    return {
      leftDrawerOpen: false,
      fabs: fabs,
      essentialLinks: linksData,
      fabPos: [window.innerWidth - 60, 18],
      draggingFab: false,
    }
  },
  computed: {
    ...mapState('shifts', ['userInfo', 'title'])
  },
  methods: {
    goTo(route) {
      if (this.$route.name !== route)
        this.$router.push('/' + route)
    },
    moveFab(ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true
      this.fabPos = [
        this.fabPos[0] + ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
  }
}
</script>

<style scoped>
</style>
