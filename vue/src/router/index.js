import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Shops from '@/views/Shops.vue'
import Items from '@/views/Items.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Item from '@/views/Item.vue'
import Shop from '@/views/Shop.vue'
import CartView from '@/views/CartView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/shops',
    name: 'shops',
    component:Shops
  },
  {
    path:'/items',
    name: 'items',
    component:Items
  },
  {
    path:'/register',
    name: 'register',
    component:Register
  },
  {
    path:'/login',
    name: 'login',
    component:Login
  },
  {
    path:'/items/:id',
    name:'item',
    component:Item
  },
  {
    path:'/shops/:id',
    name:'shop',
    component:Shop
  },
  {
    path:'/cart',
    name:'cartview',
    component:CartView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
