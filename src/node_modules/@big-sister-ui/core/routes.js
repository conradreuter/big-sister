import Exports from './Exports.vue'
import Home from './Home.vue'

export default [
  {
    path: '/',
    component: Home,
    meta: {
      sidelink: 'Home',
    },
  },
  {
    path: '/exports',
    component: Exports,
    meta: {
      sidelink: 'Exports',
    },
  },
]
