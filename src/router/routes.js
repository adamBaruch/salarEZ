const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: '',
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
      },
      {
        path: 'update/:id',
        name: 'update',
        component: () => import('pages/UpdateShift.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/Settings/SettingsMain.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'wage_settings',
        name: 'wage_settings',
        component: () => import('pages/Settings/WageSettings.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'overtime_settings',
        name: 'overtime_settings',
        component: () => import('pages/Settings/OvertimeSettings.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'my_shifts',
        name: 'my_shifts',
        component: () => import('pages/ShiftsPage.vue'),
        meta: {authNotRequired: false},
      },
      {
        path: 'add_shift',
        name: 'add_shift',
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
        name: 'settings_init',
        component: () => import('pages/Settings/InitSettings'),
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
