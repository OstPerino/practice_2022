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
      component: MainComponent
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: AuthorizationComponent
    },
    {
      path: '/registration',
      name: 'Registration',
      component: RegistrationComponent
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
//
// router.beforeEach(async (to, from, next) => {
//   const response = await fetch('http://localhost:4000/isAuth',
//     {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include',
//       method: 'get'
//     })
//
//   console.log(response)
//   next()
// })

export default router
