import { createRouter, createWebHistory } from 'vue-router'
import GatewayPortalView from '@/views/GatewayPortalView.vue'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const routes = [
  // 1. Creative Duo Space Screen
  {
    path: '/',
    name: 'duo-space',
    component: GatewayPortalView,
    meta: { title: 'Nadya & Raqwan — Creative Space' }
  },

  // 2. Scoped Routes for Profiles (nadya | raqwan)
  {
    path: '/:profile(nadya|raqwan)',
    name: 'profile-home',
    component: HomeView,
    meta: { title: 'Portfolio Home' }
  },
  {
    path: '/:profile(nadya|raqwan)/projects',
    name: 'profile-projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: 'Case Studies & Projects' }
  },
  {
    path: '/:profile(nadya|raqwan)/projects/:id',
    name: 'profile-project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    meta: { title: 'Project Details' }
  },
  {
    path: '/:profile(nadya|raqwan)/about',
    name: 'profile-about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About' }
  },
  {
    path: '/:profile(nadya|raqwan)/contact',
    name: 'profile-contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Get in Touch' }
  },

  // 3. Fallback redirects for legacy paths -> /nadya/...
  {
    path: '/projects',
    redirect: '/nadya/projects'
  },
  {
    path: '/projects/:id',
    redirect: to => `/nadya/projects/${to.params.id}`
  },
  {
    path: '/about',
    redirect: '/nadya/about'
  },
  {
    path: '/contact',
    redirect: '/nadya/contact'
  },

  // 4. Admin & Auth Routes
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { 
      title: 'Admin Portal Login',
      guestOnly: true 
    }
  },
  {
    path: '/admin',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/AdminDashboardView.vue'),
    meta: { 
      title: 'Admin CMS Dashboard',
      requiresAuth: true 
    }
  },

  // 5. 404 Catch-All
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404 Not Found' }
  }
]

// Disable browser auto-scroll restoration on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, left: 0, behavior: 'instant' }
  }
})

// Route Guards & Dynamic Profile Activation
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  const { setActiveProfile } = usePortfolioStore()

  // Auto-activate profile if route has :profile param
  if (to.params.profile) {
    setActiveProfile(to.params.profile)
  }

  // 1. Guard for Protected Admin Route
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ path: '/' })
  }

  // 2. Guard for Guest Only Route (e.g. Login)
  if (to.meta.guestOnly && isAuthenticated.value) {
    return next({ path: '/admin' })
  }

  // 3. Dynamic Page Title
  if (to.params.profile) {
    const profileName = to.params.profile === 'raqwan' 
      ? 'Muhammad Raqwan — Head of Artificial Intelligence' 
      : 'Nadya Najelina — Product Manager & Designer'
    document.title = `${to.meta.title || 'Portfolio'} | ${profileName}`
  } else if (to.meta.title) {
    document.title = to.meta.title
  }

  // 4. Dynamic SVG Favicon
  try {
    const faviconLink = document.getElementById('app-favicon') || document.querySelector("link[rel*='icon']")
    if (faviconLink) {
      if (to.params.profile === 'raqwan') {
        faviconLink.href = '/favicon-raqwan.svg'
      } else if (to.params.profile === 'nadya') {
        faviconLink.href = '/favicon-nadya.svg'
      } else {
        faviconLink.href = '/favicon.svg'
      }
    }
  } catch (e) {
    // Ignore in SSR/test environments
  }

  next()
})

export default router
