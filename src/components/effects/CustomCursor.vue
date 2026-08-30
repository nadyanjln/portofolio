<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const { currentProfile } = usePortfolioStore()

const cursorX = ref(-100)
const cursorY = ref(-100)
const followerX = ref(-100)
const followerY = ref(-100)

const cursorType = ref('default') // 'default' | 'pointer' | 'text'
const isClicking = ref(false)
const isVisible = ref(false)
const isWindowActive = ref(true)

let animationFrameId = null

onMounted(() => {
  // Only enable on desktop/pointer devices
  if (!window.matchMedia('(pointer: fine)').matches) return

  isVisible.value = true

  const handleMouseMove = (e) => {
    cursorX.value = e.clientX
    cursorY.value = e.clientY
    isWindowActive.value = true

    const target = e.target
    if (!target) return

    // 1. Text Inputs & Form Fields (Restore native precision)
    const isInput = target.closest('input, textarea, select, [contenteditable="true"]')
    if (isInput) {
      cursorType.value = 'text'
      return
    }

    // 2. Interactive Buttons, Links, Clickables
    const isInteractive = target.closest('a, button, [role="button"], .cursor-pointer, input[type="button"], input[type="submit"]')
    if (isInteractive) {
      cursorType.value = 'pointer'
      return
    }

    // 3. Default state
    cursorType.value = 'default'
  }

  const handleMouseDown = () => {
    isClicking.value = true
  }

  const handleMouseUp = () => {
    isClicking.value = false
  }

  const handleMouseLeave = () => {
    isWindowActive.value = false
  }

  const handleMouseEnter = () => {
    isWindowActive.value = true
  }

  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('mousedown', handleMouseDown, { passive: true })
  window.addEventListener('mouseup', handleMouseUp, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave)
  document.addEventListener('mouseenter', handleMouseEnter)

  // High-performance smooth follower loop using Lerp
  const render = () => {
    const lerpFactor = 0.22
    followerX.value += (cursorX.value - followerX.value) * lerpFactor
    followerY.value += (cursorY.value - followerY.value) * lerpFactor

    animationFrameId = requestAnimationFrame(render)
  }
  render()

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mousedown', handleMouseDown)
    window.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('mouseleave', handleMouseLeave)
    document.removeEventListener('mouseenter', handleMouseEnter)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
})
</script>

<template>
  <div 
    v-if="isVisible" 
    class="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
    :class="{ 'opacity-0': !isWindowActive }"
    style="transition: opacity 0.2s ease;"
  >
    <!-- Center Precision Dot (Zero Latency - Instant Follow) -->
    <div
      class="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform"
      :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#9E0402] dark:bg-[#ff4d4d]'"
      :style="{
        transform: `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${
          cursorType === 'text' ? 0 : cursorType === 'pointer' ? 0.6 : isClicking ? 0.7 : 1
        })`,
        width: '6px',
        height: '6px',
        opacity: cursorType === 'text' ? 0 : 1,
        transition: 'transform 0.15s ease-out, opacity 0.15s ease'
      }"
    ></div>

    <!-- Outer Follower Hairline Ring -->
    <div
      class="fixed top-0 left-0 rounded-full pointer-events-none will-change-transform flex items-center justify-center"
      :class="[
        cursorType === 'text'
          ? 'opacity-0 scale-50'
          : cursorType === 'pointer'
            ? (currentProfile === 'raqwan' ? 'border-2 border-[#047857] bg-transparent opacity-90' : 'border-2 border-[#9E0402] dark:border-[#ff4d4d] bg-transparent opacity-90')
            : (currentProfile === 'raqwan' ? 'border border-[#047857]/60 bg-transparent opacity-60' : 'border border-[#9E0402]/50 dark:border-[#ff4d4d]/50 bg-transparent opacity-60')
      ]"
      :style="{
        transform: `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%) scale(${
          isClicking ? 0.85 : 1
        })`,
        width: cursorType === 'pointer' ? '40px' : '26px',
        height: cursorType === 'pointer' ? '40px' : '26px',
        transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, opacity 0.15s ease'
      }"
    ></div>
  </div>
</template>
