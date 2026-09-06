<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { currentProfile } = usePortfolioStore()
const { isDark } = useTheme()

// Detect gateway portal space
const isGateway = computed(() => {
  return route.path === '/' || route.name === 'duo-space' || route.name === 'gateway-portal'
})

// Lightweight Mouse Spotlight (Hardware Accelerated via direct DOM transform, 0% Vue reactivity overhead)
const spotlightOuterRef = ref(null)
const spotlightInnerRef = ref(null)
let rafId = null

const handleMouseMove = (e) => {
  const x = e.clientX
  const y = e.clientY

  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      const transformStr = `translate3d(${x}px, ${y}px, 0)`
      if (spotlightOuterRef.value) {
        spotlightOuterRef.value.style.transform = transformStr
        spotlightOuterRef.value.style.opacity = '1'
      }
      if (spotlightInnerRef.value) {
        spotlightInnerRef.value.style.transform = transformStr
        spotlightInnerRef.value.style.opacity = '0.75'
      }
      rafId = null
    })
  }
}

const handleMouseLeave = () => {
  if (spotlightOuterRef.value) spotlightOuterRef.value.style.opacity = '0'
  if (spotlightInnerRef.value) spotlightInnerRef.value.style.opacity = '0'
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  document.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseleave', handleMouseLeave)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-700">
    <!-- ══════════════════════════════════════════════════════════
         1. PROFESSIONAL STUDIO FRAME & RECRUITER METADATA
         ══════════════════════════════════════════════════════════ -->
    <div class="absolute inset-x-6 sm:inset-x-12 inset-y-6 sm:inset-y-8 border border-black/[0.04] dark:border-white/[0.04] pointer-events-none hidden md:block">
      <!-- Top Left: Location & Timezone -->
      <div class="absolute -top-2.5 -left-2.5 flex items-center gap-1.5 font-mono-tag text-[10px] text-zinc-400 dark:text-zinc-500">
        <span class="text-[#FB4617] dark:text-[#FB4617]" v-if="currentProfile === 'nadya' && !isGateway">+</span>
        <span class="text-emerald-500 dark:text-emerald-400" v-else>+</span>
        <span class="tracking-widest font-semibold uppercase">JAKARTA, ID • UTC+7</span>
      </div>

      <!-- Top Right: HR / Recruiter Availability Status -->
      <div class="absolute -top-2.5 -right-2.5 flex items-center gap-2 font-mono-tag text-[10px] text-zinc-400 dark:text-zinc-500">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="currentProfile === 'nadya' && !isGateway ? 'bg-[#FB4617]' : 'bg-emerald-400'"></span>
          <span class="relative inline-flex rounded-full h-2 w-2" :class="currentProfile === 'nadya' && !isGateway ? 'bg-[#FB4617]' : 'bg-emerald-500'"></span>
        </span>
        <span class="tracking-widest font-semibold uppercase text-zinc-700 dark:text-zinc-300">STATUS: OPEN TO WORK</span>
        <span class="text-[#FB4617] dark:text-[#FB4617]" v-if="currentProfile === 'nadya' && !isGateway">+</span>
        <span class="text-emerald-500 dark:text-emerald-400" v-else>+</span>
      </div>

      <!-- Bottom Left: Discipline Focus -->
      <div class="absolute -bottom-2.5 -left-2.5 flex items-center gap-2 font-mono-tag text-[10px] text-zinc-400 dark:text-zinc-500">
        <span class="text-[#FB4617] dark:text-[#FB4617]" v-if="currentProfile === 'nadya' && !isGateway">+</span>
        <span class="text-emerald-500 dark:text-emerald-400" v-else>+</span>
        <span class="tracking-widest font-semibold uppercase">
          {{ isGateway ? 'PRODUCT DESIGN × AI ENGINEERING' : (currentProfile === 'raqwan' ? 'AI & MACHINE LEARNING' : 'PRODUCT & UI/UX DESIGN') }}
        </span>
      </div>

      <!-- Bottom Right: Identity & Edition -->
      <div class="absolute -bottom-2.5 -right-2.5 flex items-center gap-2 font-mono-tag text-[10px] text-zinc-400 dark:text-zinc-500">
        <span class="tracking-widest font-semibold uppercase">
          {{ isGateway ? 'PORTFOLIO // 2026' : (currentProfile === 'raqwan' ? 'M. RAQWAN KAUTHAR // 2026' : 'NADYA NAJELINA // 2026') }}
        </span>
        <span class="text-[#FB4617] dark:text-[#FB4617]" v-if="currentProfile === 'nadya' && !isGateway">+</span>
        <span class="text-emerald-500 dark:text-emerald-400" v-else>+</span>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════
         2. RETINA MICRO-DOT MATRIX (Precision Masked)
         ══════════════════════════════════════════════════════════ -->
    <div 
      class="absolute inset-0 transition-opacity duration-700"
      :class="[
        currentProfile === 'raqwan' && !isGateway
          ? 'bg-dots-raqwan' 
          : isGateway 
            ? 'bg-dots-gateway' 
            : 'bg-dots-nadya',
        isDark ? 'opacity-50' : 'opacity-70'
      ]"
      style="mask-image: radial-gradient(ellipse 80% 65% at 50% 35%, black 35%, transparent 90%); -webkit-mask-image: radial-gradient(ellipse 80% 65% at 50% 35%, black 35%, transparent 90%);"
    ></div>

    <!-- ══════════════════════════════════════════════════════════
         3. DUAL-RING INTERACTIVE CURSOR SPOTLIGHT (translate3d)
         ══════════════════════════════════════════════════════════ -->
    <!-- Outer Ambient Glow -->
    <div
      ref="spotlightOuterRef"
      class="hidden md:block absolute w-[700px] h-[700px] -top-[350px] -left-[350px] rounded-full pointer-events-none will-change-transform opacity-0 transition-opacity duration-300"
      :style="{
        background: isGateway
          ? 'radial-gradient(circle, rgba(251, 70, 23, 0.08) 0%, rgba(0, 245, 155, 0.05) 45%, transparent 70%)'
          : currentProfile === 'raqwan'
            ? 'radial-gradient(circle, rgba(0, 245, 155, 0.12) 0%, rgba(6, 182, 212, 0.07) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 70, 23, 0.13) 0%, rgba(255, 107, 74, 0.07) 45%, transparent 70%)'
      }"
    ></div>

    <!-- Inner Crisp Focus Core -->
    <div
      ref="spotlightInnerRef"
      class="hidden md:block absolute w-[240px] h-[240px] -top-[120px] -left-[120px] rounded-full pointer-events-none will-change-transform opacity-0 transition-opacity duration-200"
      :style="{
        background: isGateway
          ? 'radial-gradient(circle, rgba(251, 70, 23, 0.15) 0%, transparent 60%)'
          : currentProfile === 'raqwan'
            ? 'radial-gradient(circle, rgba(0, 245, 155, 0.20) 0%, transparent 65%)'
            : 'radial-gradient(circle, rgba(251, 70, 23, 0.22) 0%, transparent 65%)'
      }"
    ></div>

    <!-- ══════════════════════════════════════════════════════════
         4. FLUID MULTI-STOP AURORA ATMOSPHERE (Optimized GPU Blur)
         ══════════════════════════════════════════════════════════ -->
    
    <!-- A. GATEWAY PORTAL DUAL AURA -->
    <template v-if="isGateway">
      <div class="absolute -top-32 left-1/12 w-[550px] h-[550px] rounded-full bg-[#FB4617]/24 blur-[80px] animate-aurora-drift"></div>
      <div class="absolute top-1/3 left-1/6 w-[440px] h-[440px] rounded-full bg-[#9FC2EA]/20 blur-[75px] animate-aurora-pulse"></div>
      <div class="absolute -top-32 right-1/12 w-[550px] h-[550px] rounded-full bg-[#00F59B]/22 blur-[80px] animate-aurora-drift-reverse"></div>
      <div class="absolute top-1/3 right-1/6 w-[440px] h-[440px] rounded-full bg-[#06B6D4]/18 blur-[75px] animate-aurora-pulse"></div>
    </template>

    <!-- B. RAQWAN PROFILE: HIGH-VOLTAGE CYBER MINT & NEURAL VOID -->
    <template v-else-if="currentProfile === 'raqwan'">
      <!-- Primary Mint Aurora (Top Center / Left) -->
      <div class="absolute -top-44 left-1/4 w-[850px] h-[600px] rounded-full bg-gradient-to-b from-[#00F59B]/18 via-[#047857]/14 to-transparent blur-[85px] animate-aurora-drift"></div>

      <!-- Secondary Electric Cyan (Top Right Accent) -->
      <div class="absolute top-20 right-[-100px] w-[650px] h-[650px] rounded-full bg-[#00E5FF]/12 blur-[90px] animate-aurora-pulse"></div>

      <!-- Deep Emerald Foundation (Mid Left) -->
      <div class="absolute top-[42vh] left-[-180px] w-[600px] h-[600px] rounded-full bg-[#047857]/16 blur-[85px] animate-aurora-drift-reverse"></div>

      <!-- Bottom Atmospheric Cyan Bed -->
      <div class="absolute -bottom-40 right-1/5 w-[700px] h-[550px] rounded-full bg-[#00F59B]/10 blur-[90px]"></div>
    </template>

    <!-- C. NADYA PROFILE: BENJAMIN RADIANT ORANGE & SOFT SKY -->
    <template v-else>
      <!-- Primary Radiant Vermillion Arc (Top Left / Center) -->
      <div class="absolute -top-44 left-[-100px] w-[850px] h-[650px] rounded-full bg-gradient-to-br from-[#FB4617]/20 via-[#FF6B4A]/14 to-transparent blur-[85px] animate-aurora-drift"></div>

      <!-- Secondary Soft Sky Blue (Top Right Counterpoint) -->
      <div class="absolute top-20 right-[-120px] w-[650px] h-[650px] rounded-full bg-[#9FC2EA]/20 dark:bg-[#9FC2EA]/14 blur-[90px] animate-aurora-pulse"></div>

      <!-- Warm Sunset Coral Depth (Mid Screen) -->
      <div class="absolute top-[48vh] right-1/6 w-[600px] h-[600px] rounded-full bg-[#FB4617]/12 blur-[90px] animate-aurora-drift-reverse"></div>

      <!-- Bottom Atmospheric Bed -->
      <div class="absolute -bottom-40 left-1/4 w-[750px] h-[550px] rounded-full bg-[#FF6B4A]/10 blur-[90px]"></div>
    </template>

  </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   RETINA MICRO-DOT GRIDS (Crisp 1px Dots Spaced at 36px)
   ═══════════════════════════════════════════════════════════ */

/* 1. Nadya Radiant Orange Tinted Dots */
.bg-dots-nadya {
  background-size: 36px 36px;
  background-image: radial-gradient(rgba(251, 70, 23, 0.18) 1.2px, transparent 1.2px);
}
:root.dark .bg-dots-nadya {
  background-image: radial-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px);
}

/* 2. Raqwan Tech Neural Cyber Mint Dots */
.bg-dots-raqwan {
  background-size: 36px 36px;
  background-image: radial-gradient(rgba(4, 120, 87, 0.22) 1.2px, transparent 1.2px);
}
:root.dark .bg-dots-raqwan {
  background-image: radial-gradient(rgba(0, 245, 155, 0.16) 1px, transparent 1px);
}

/* 3. Gateway Portal Balanced Dots */
.bg-dots-gateway {
  background-size: 38px 38px;
  background-image: radial-gradient(rgba(255, 255, 255, 0.10) 1px, transparent 1px);
}

/* ═══════════════════════════════════════════════════════════
   GPU KEYFRAME DRIFT ANIMATIONS (0% Main Thread CPU)
   ═══════════════════════════════════════════════════════════ */
@keyframes auroraDrift {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(35px, -40px, 0) scale(1.08);
  }
}

@keyframes auroraDriftReverse {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(-40px, 35px, 0) scale(1.10);
  }
}

@keyframes auroraPulse {
  0%, 100% {
    opacity: 0.75;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.14);
  }
}

.animate-aurora-drift {
  animation: auroraDrift 16s ease-in-out infinite;
  will-change: transform;
}

.animate-aurora-drift-reverse {
  animation: auroraDriftReverse 20s ease-in-out infinite;
  will-change: transform;
}

.animate-aurora-pulse {
  animation: auroraPulse 12s ease-in-out infinite;
  will-change: transform, opacity;
}
</style>
