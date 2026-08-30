<script setup>
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import AsciiCanvas from '@/components/effects/AsciiCanvas.vue'
import CustomCursor from '@/components/effects/CustomCursor.vue'
import ScrollProgress from '@/components/effects/ScrollProgress.vue'
import { useTheme } from '@/composables/useTheme'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const route = useRoute()
const { initTheme } = useTheme()
const { currentProfile } = usePortfolioStore()

// Hide public Navbar, Footer, and ScrollProgress on Admin, Login, and Gateway routes
const isPublicRoute = computed(() => {
  return (
    route.name !== 'admin-dashboard' && 
    route.name !== 'login' && 
    route.name !== 'gateway-portal' &&
    route.path !== '/' &&
    !route.path.startsWith('/admin')
  )
})

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div 
    class="min-h-screen flex flex-col justify-between relative overflow-x-hidden transition-colors duration-300"
    :class="currentProfile === 'raqwan' 
      ? 'bg-[#F8FAFC] dark:bg-[#0B0C0E] text-[#0F172A] dark:text-[#F4F4F6] selection:bg-[#047857] selection:text-white' 
      : 'bg-[#FFF9F9] dark:bg-[#0B0C0E] text-[#1C1313] dark:text-[#F4F4F6] selection:bg-[#9E0402] selection:text-white'"
  >
    <!-- Top Reading Scroll Progress Bar (Public only) -->
    <ScrollProgress v-if="isPublicRoute" />

    <!-- Interactive Magnetic Custom Cursor -->
    <CustomCursor />

    <!-- Interactive ASCII Matrix Canvas Background (Public only) -->
    <AsciiCanvas v-if="isPublicRoute" />

    <!-- Studio Public Navbar -->
    <Navbar v-if="isPublicRoute" />

    <!-- Main Content -->
    <main class="flex-1 relative z-10" :class="{ 'bg-[#07080A]': !isPublicRoute }">
      <router-view v-slot="{ Component }">
        <transition 
          name="page-fade" 
          mode="out-in"
        >
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>

    <!-- Studio Public Footer -->
    <Footer v-if="isPublicRoute" class="relative z-10" />
  </div>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
