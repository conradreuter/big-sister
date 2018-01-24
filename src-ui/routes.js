import About from './About.vue'
import Home from './Home.vue'

export default [
  {
    path: '/',
    component: Home,
    meta: {
      sidelink: true,
      title: 'Home',
    },
  },
  {
    path: '/about',
    component: About,
    meta: {
      sidelink: true,
      title: 'About',
    },
  },
]
