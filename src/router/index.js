import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Nadya Najelina — Product Manager & UI/UX Designer' }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: 'Selected Case Studies — Nadya Portfolio' }
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    meta: { title: 'Case Study Details — Nadya Portfolio' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About Nadya — PM & UI/UX Designer' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Get in Touch — Nadya Portfolio' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { 
      title: 'Admin Portal Login — Nadya Portfolio',
      guestOnly: true 
    }
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/AdminDashboardView.vue'),
    meta: { 
      title: 'Admin CMS Dashboard — Nadya Portfolio',
      requiresAuth: true 
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404 Not Found — Nadya Portfolio' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Route Protection Navigation Guards
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()

  // Protect Admin Dashboard: If not authenticated, redirect to landing page (or /login)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      // Redirect to landing page as requested by user
      next({ name: 'home' })
      return
    }
  }

  // Prevent logged in users from seeing login page again
  if (to.matched.some(record => record.meta.guestOnly)) {
    if (isAuthenticated.value) {
      next({ name: 'admin-dashboard' })
      return
    }
  }

  next()
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
