import Vue from 'vue'
import Router from 'vue-router'
import Landing from './views/Landing.vue'
import Stores from './views/Stores.vue'
import Checkout from './views/Checkout.vue'
import Admin from './views/Admin'
import AddForm from './views/AddForm'
import EditForm from './views/EditForm'
import Edit from './views/Edit'
import Login from './views/Login'
import Register from './views/Register'
import Transactions from './components/Transactions'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/signin/local',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'register',
      component: Register

    },
    {
      path: '/products',
      name: 'products',
      component: Stores
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/secret',
      name: 'secret',
      component: Admin, Transactions,
      meta: {
        requiresAuth: true,
        is_admin: true
      },
      children: [{
          path: 'add',
          name: 'add',
          component: AddForm
        },
        {
          path: 'edit',
          name: 'edit',
          component: Edit,
        },
        {
          path: 'edit/:id',
          name: 'editById',
          component: EditForm,
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(to, '=====to=======from', from);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('masuk if atass');
    if (!localStorage.getItem('token')) {
      next({
        path: '/',
        params: {
          name : "login"
        }
      })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        if (localStorage.getItem('role') == 'admin') {
          next()
        } else {
          next({path: '/'})
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
