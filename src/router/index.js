import TestOnly from '@/views/TestOnly.vue'
import LoginPage from '@/views/LoginPage.vue'
import MainPage from '@/views/MainPage.vue'
import MapPage from '@/views/MapPage.vue'
import MemberPage from '@/views/MemberPage.vue'
import PostPage from '@/views/PostPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import TestPage from '@/views/TestPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'test',
      component: TestPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    },
    {
      path: '/map',
      name: 'map',
      component: MapPage
    },
    {
      path: '/member',
      name: 'member',
      component: MemberPage
    },
    {
      path: '/test',
      name: 'test',
      component: TestOnly
    },  
    {
      path: '/post/:postSeq',
      name: 'PostPage',
      component: PostPage,
      props: true
    }

  ]
})

export default router
