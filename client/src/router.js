import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing.vue'
import Stores from './views/Stores.vue'
import Checkout from './views/Checkout.vue'
import Admin from './views/Admin'
import AddForm from './views/AddForm'
import Edit from './views/Edit'
import Login from './views/Login'
import Register from './views/Register'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/signin/local',
      name: 'login',
      component : Login
    },
    {
      path: '/users',
      name: 'register',
      component : Register

    },
    {
      path: '/products',
      name: 'products',
      component : Stores
    },
    {
      path: '/checkout',
      name: 'checkout',
      component : Checkout
    },
    {
      path : '/secret',
      name : 'secret',
      component : Admin,
      children : [
        {
          path : 'add',
          name : 'add',
          component : AddForm
        },
        {
          path : 'edit',
          name : 'edit',
          component : Edit,
          children : [
            {
              path : ':id',
              name : 'editById',
              component : EditForm,
            }
          ]
        }
      ]
    }
  ]
})

