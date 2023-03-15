

import Home from './components/Home.vue'
import Fav from  './components/Fav.vue'
import User from './components/User.vue'
import Err from './components/Err.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Home
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Fav
  },
  {
    path: '/user/:login',
    name: 'User',
    component: User,
  },
  {
    path: '/err',
    name: 'err',
    component: Err
  },
]

export default routes