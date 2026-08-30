import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home — Nadya Portfolio' }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: 'Projects — Nadya Portfolio' }
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    meta: { title: 'Project Details — Nadya Portfolio' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About — Nadya Portfolio' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Contact — Nadya Portfolio' }
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

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
