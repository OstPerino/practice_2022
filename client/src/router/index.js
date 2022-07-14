/* eslint-disable */

import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrationComponent from '@/components/views/RegistrationComponent'
import AuthorizationComponent from '@/components/views/AuthorizationComponent'
import MainComponent from '@/components/views/MainComponent'
import AnalyticsComponent from '@/components/views/AnalyticsComponent'

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
    // TODO: вынести
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
      path: '/analytics',
      name: 'Analytics',
      component: AnalyticsComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
