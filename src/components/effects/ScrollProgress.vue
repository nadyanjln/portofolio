<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

const updateProgress = () => {
  const scrollPx = document.documentElement.scrollTop
  const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (winHeightPx > 0) {
    scrollProgress.value = (scrollPx / winHeightPx) * 100
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-transparent">
    <div
      class="h-full bg-gradient-to-r from-[#9E0402] via-[#FF5C33] to-[#9FC2EA] transition-all duration-75 ease-out shadow-sm"
      :style="{ width: `${scrollProgress}%` }"
    ></div>
  </div>
</template>
