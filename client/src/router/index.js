import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrationComponent from '@/components/registration/RegistrationComponent'
import AuthorizationComponent from '@/components/authorization/AuthorizationComponent'
import MainComponent from '@/components/views/MainComponent'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/authorization',
      redirect: '/'
    },
    {
      path: '/main',
      name: 'Main',
      component: MainComponent
    },
    {
      path: '/',
      name: 'Authorization',
      component: AuthorizationComponent
    },
    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationComponent
    }
  ]
})

export default router
