<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import AsciiCanvas from '@/components/effects/AsciiCanvas.vue'
import CustomCursor from '@/components/effects/CustomCursor.vue'
import ScrollProgress from '@/components/effects/ScrollProgress.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="min-h-screen bg-[#FFF9F9] dark:bg-[#0B0C0E] text-[#1C1313] dark:text-[#F4F4F6] flex flex-col justify-between selection:bg-[#9E0402] selection:text-white relative overflow-x-hidden transition-colors duration-300">
    <!-- Top Reading Scroll Progress Bar -->
    <ScrollProgress />

    <!-- Interactive Magnetic Custom Cursor -->
    <CustomCursor />

    <!-- Interactive ASCII Matrix Canvas Background -->
    <AsciiCanvas />

    <!-- Studio Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1 relative z-10">
      <router-view v-slot="{ Component }">
        <transition 
          name="page-fade" 
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Studio Footer -->
    <Footer class="relative z-10" />
  </div>
</template>

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
