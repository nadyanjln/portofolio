<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import InfiniteMarquee from '@/components/effects/InfiniteMarquee.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const { portfolioInfo, currentProfile } = usePortfolioStore()

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()

onMounted(() => {
  observeAll(sectionRef.value)
})

watch(currentProfile, () => {
  nextTick(() => {
    observeAll(sectionRef.value)
  })
})
</script>

<template>
  <section ref="sectionRef" class="relative min-h-[90vh] flex flex-col justify-between pt-24 sm:pt-28 pb-6 overflow-hidden">
    
    <!-- Ambient Glows -->
    <div 
      class="top-10 left-1/4 opacity-40 absolute w-96 h-96 rounded-full blur-[120px] pointer-events-none"
      :class="currentProfile === 'raqwan' ? 'bg-[#047857]/25' : 'bg-[#9E0402]/20'"
    ></div>
    <div 
      class="top-24 right-1/4 opacity-40 absolute w-96 h-96 rounded-full blur-[120px] pointer-events-none"
      :class="currentProfile === 'raqwan' ? 'bg-cyan-600/15' : 'bg-[#9FC2EA]/20'"
    ></div>

    <!-- Hero Main Typography Area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center items-center text-center relative z-10 py-6 sm:py-10">
      
      <!-- Top Tag Pill -->
      <div 
        class="hero-animate-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#15161B] border shadow-xs mb-6 sm:mb-8 transition-colors"
        :class="currentProfile === 'raqwan' ? 'border-[#047857]/40' : 'border-[#EEDCDC] dark:border-white/10'"
      >
        <span 
          class="w-2 h-2 rounded-full animate-ping"
          :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#9E0402]'"
        ></span>
        <span 
          class="font-mono-tag text-xs font-bold tracking-wider uppercase"
          :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'"
        >
          {{ portfolioInfo.title }} /2026/
        </span>
      </div>

      <!-- Giant Editorial Statement -->
      <div class="space-y-1 sm:space-y-2 select-none overflow-visible max-w-full" v-if="currentProfile === 'raqwan'">
        <h1 class="hero-animate-2 text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[#1C1313] dark:text-[#F4F4F6] whitespace-nowrap">
          Train Vision <span class="text-[#047857] dark:text-emerald-400 font-mono-tag text-2xl sm:text-5xl md:text-7xl font-normal">*</span>
        </h1>
        <h1 class="hero-animate-3 text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[#047857] dark:text-emerald-400 whitespace-nowrap">
          Scale Agents <span class="text-[#1C1313] dark:text-[#F4F4F6] font-mono-tag text-2xl sm:text-5xl md:text-7xl font-normal">#</span>
        </h1>
        <h1 
          class="hero-animate-4 hero-third-phrase text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter leading-[0.95] text-[#1C1313]/65 dark:text-zinc-400 transition-all duration-500 cursor-pointer inline-flex items-baseline justify-center whitespace-nowrap group py-1"
        >
          <span class="inline-block transition-all duration-500 ease-out whitespace-nowrap group-hover:scale-[1.03] group-hover:tracking-wider group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#047857] group-hover:via-emerald-500 group-hover:to-teal-400 group-hover:drop-shadow-[0_0_35px_rgba(4,120,87,0.45)]">
            Deploy Intelligence
          </span>
          <span class="text-[#047857] dark:text-emerald-400 font-mono-tag text-lg sm:text-3xl md:text-5xl font-normal align-top inline-block transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 ml-1">™</span>
        </h1>
      </div>

      <div class="space-y-1 sm:space-y-2 select-none overflow-visible max-w-full" v-else>
        <h1 class="hero-animate-2 text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[#1C1313] dark:text-[#F4F4F6] whitespace-nowrap">
          Be Strategic <span class="text-[#9E0402] dark:text-[#ff4d4d] font-mono-tag text-2xl sm:text-5xl md:text-7xl font-normal">*</span>
        </h1>
        <h1 class="hero-animate-3 text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[#9E0402] dark:text-[#ff3b38] whitespace-nowrap">
          Be Creative <span class="text-[#1C1313] dark:text-[#F4F4F6] font-mono-tag text-2xl sm:text-5xl md:text-7xl font-normal">#</span>
        </h1>
        <h1 
          class="hero-animate-4 hero-third-phrase text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[#1C1313]/65 dark:text-zinc-400 transition-all duration-500 cursor-pointer inline-flex items-baseline justify-center whitespace-nowrap group py-1"
        >
          <span class="inline-block transition-all duration-500 ease-out whitespace-nowrap group-hover:scale-[1.03] group-hover:tracking-wider group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#9E0402] group-hover:via-[#ff3b38] group-hover:to-[#9FC2EA] group-hover:drop-shadow-[0_0_35px_rgba(158,4,2,0.4)]">
            Be Bold
          </span>
          <span class="text-[#9E0402] dark:text-[#ff4d4d] font-mono-tag text-lg sm:text-3xl md:text-5xl font-normal align-top inline-block transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 ml-1">™</span>
        </h1>
      </div>

      <!-- Intro Subtitle -->
      <p class="hero-animate-5 mt-7 text-sm sm:text-base md:text-lg text-[#5C4848] dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
        Halo! Saya <span class="font-bold" :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">{{ portfolioInfo.name }}</span> — {{ portfolioInfo.tagline }}
      </p>

      <!-- Action Buttons -->
      <div class="hero-animate-5 mt-8 flex flex-col sm:flex-row items-center gap-4">
        <!-- Primary Button -->
        <RouterLink
          :to="'/' + currentProfile + '/projects'"
          class="px-8 py-3.5 rounded-full text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          :class="currentProfile === 'raqwan' ? 'bg-[#047857] hover:bg-[#065F46] shadow-[#047857]/30' : 'bg-[#9E0402] hover:bg-[#B80604] shadow-[#9E0402]/25'"
        >
          <span>Explore Works</span>
          <ArrowUpRight class="w-4 h-4" />
        </RouterLink>

        <!-- Secondary Button -->
        <RouterLink
          :to="'/' + currentProfile + '/about'"
          class="px-8 py-3.5 rounded-full bg-white dark:bg-[#15161B] text-[#1C1313] dark:text-white font-bold text-xs sm:text-sm tracking-wide uppercase border border-[#EEDCDC] dark:border-white/10 shadow-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/50' : 'hover:border-[#9E0402]/40 dark:hover:border-white/30'"
        >
          <span>About Me</span>
        </RouterLink>
      </div>

    </div>

    <!-- Bottom Moving Skill Ribbon -->
    <div class="relative z-10 w-full mt-4">
      <InfiniteMarquee />
    </div>

  </section>
</template>

<style scoped>
@keyframes heroEntrance {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-animate-1 {
  animation: heroEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
}
.hero-animate-2 {
  animation: heroEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
}
.hero-animate-3 {
  animation: heroEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.20s both;
}
.hero-animate-4 {
  animation: heroEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
}
.hero-animate-5 {
  animation: heroEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.36s both;
}
</style>
