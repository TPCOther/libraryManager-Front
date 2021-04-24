import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: '/my',
      name: 'My',
      component: () => import('../views/My.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('../views/Search.vue')
    },
    {
      path: '/borrow',
      name: 'Borrow',
      component: () => import('../views/Borrow.vue')
    },
    {
      path: '/manage',
      name: 'Manage',
      component: () => import('../views/Manage.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const { uid } = localStorage
  const { name } = to
  if (uid && name === 'Login') {
    next(from)
  }
  if (!uid && name !== 'Login') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
