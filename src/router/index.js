import TestOnly from '@/views/TestOnly.vue'
import LoginPage from '@/views/LoginPage.vue'
import MainPage from '@/views/MainPage.vue'
import MapPage from '@/views/MapPage.vue'
import MypagePage from '@/views/MypagePage.vue'
import PostPage from '@/views/PostPage.vue'
import SignupPage from '@/views/SignupPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MemberPage from '@/views/MemberPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'main',
      component: MainPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage
    },
    {
      path: '/map',
      name: 'map',
      component: MapPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MypagePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/member/:memberSeq',
      name: 'member',
      props: true,
      component: MemberPage,
      meta: {
        requiresAuth: true
      }
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
      props: true,
      meta: {
        requiresAuth: true
      }
    }

  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 인증이 필요한 경로인지 확인
  const isAuthRequired = to.matched.some(route => route.meta.requiresAuth)

  // 인증이 필요한 경로이고, memberSeq가 없으면 /login으로 리디렉션
  if (isAuthRequired && !authStore.memberSeq) {
    next('/login')
  } else {
    next()
  }
})


export default router
