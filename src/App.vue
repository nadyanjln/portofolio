<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import AsciiCanvas from '@/components/effects/AsciiCanvas.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <div class="min-h-screen bg-[#FFF9F9] dark:bg-[#0B0C0E] text-[#1C1313] dark:text-[#F4F4F6] flex flex-col justify-between selection:bg-[#9E0402] selection:text-white relative overflow-x-hidden transition-colors duration-300">
    <!-- Interactive ASCII Matrix Canvas -->
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
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
