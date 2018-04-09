import Vue from 'vue'
import Router from 'vue-router'
const Home = (resolve) => {
  import('@/components/Home/Home').then((module) => {
    resolve(module)
  })
}
const Register = (resolve) => {
  import('@/components/register/register').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('@/components/Login/Login').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
