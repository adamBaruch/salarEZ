const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Home.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('pages/Upload.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('pages/About.vue'),
        meta: {authNotRequired: false},
      }, {
        path: 'update/:id',
        name: 'Update',
        component: () => import('pages/Update.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/Settings.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'my_shifts',
        name: 'my_shifts',
        component: () => import('pages/DataTable.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'add_shift',
        name: 'AddShift',
        component: () => import('pages/AddShift.vue'),
        meta: {authNotRequired: false},
      },
    ]
  },
  {
    path: '/b',
    name: 'blankLayout',
    component: () => import('layouts/BlankLayout'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Login.vue'),
        meta: {authNotRequired: true},
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('pages/SignUp.vue'),
        meta: {authNotRequired: true},
      },
      {
        path: 'settings_init',
        name: 'SettingsInit',
        component: () => import('pages/SettingsInit'),
        meta: {authNotRequired: false},
      }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
