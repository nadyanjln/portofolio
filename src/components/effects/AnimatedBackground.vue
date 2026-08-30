<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)
const isVisible = ref(false)

const handleMouseMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  if (!isVisible.value) isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <!-- Interactive Mouse Spotlight Follower (Subtle luminous aura) -->
    <div
      class="hidden lg:block absolute w-[550px] h-[550px] rounded-full transition-opacity duration-500 ease-out"
      :style="{
        transform: `translate3d(${mouseX - 275}px, ${mouseY - 275}px, 0)`,
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.09) 0%, rgba(168, 85, 247, 0.05) 40%, rgba(0, 0, 0, 0) 70%)',
        opacity: isVisible ? 1 : 0
      }"
    ></div>

    <!-- Floating Ambient Gradient Mesh Orbs (Left Top Orb) -->
    <div
      class="absolute -top-32 -left-32 w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl animate-float opacity-70 dark:opacity-50"
    ></div>

    <!-- Floating Ambient Gradient Mesh Orbs (Right Top Orb) -->
    <div
      class="absolute top-1/4 -right-40 w-[450px] h-[450px] sm:w-[550px] sm:h-[550px] rounded-full bg-gradient-to-bl from-pink-500/12 via-indigo-500/10 to-transparent blur-3xl animate-float-reverse opacity-70 dark:opacity-40"
    ></div>

    <!-- Floating Ambient Gradient Mesh Orbs (Center Bottom Orb) -->
    <div
      class="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-transparent blur-3xl animate-pulse-glow opacity-60 dark:opacity-30"
    ></div>

    <!-- Subtle Dot Grid Matrix Texture (Creative aesthetic) -->
    <div 
      class="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] [background-image:radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]"
    ></div>
  </div>
</template>
