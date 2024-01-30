import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SnakeView from '../views/SnakeView.vue'
import BreakoutView from '../views/BreakoutView.vue'
import TicTacToeView from '../views/TicTacToeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/snake',
    name: 'Snake',
    component: SnakeView
  },
  {
    path: '/breakout',
    name: 'Breakout',
    component: BreakoutView
  },
  {
    path: '/tictactoe',
    name: 'TicTacToe',
    component: TicTacToeView
  },

  // {
  //   path: '/about',
  //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
