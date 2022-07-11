import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrationComponent from '@/components/views/RegistrationComponent'
import AuthorizationComponent from '@/components/views/AuthorizationComponent'
import MainComponent from '@/components/views/MainComponent'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: AuthorizationComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   const { requiresAuth } = to.meta
//
// })

export default router
