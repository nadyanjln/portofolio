<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import { portfolioInfo } from '@/data/portfolioData'
import InfiniteMarquee from '@/components/effects/InfiniteMarquee.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()

onMounted(() => {
  observeAll(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" class="relative min-h-[90vh] flex flex-col justify-between pt-24 sm:pt-28 pb-6 overflow-hidden">
    
    <!-- Ambient Glows -->
    <div class="glow-primary top-10 left-1/4 opacity-40"></div>
    <div class="glow-secondary top-24 right-1/4 opacity-40"></div>

    <!-- Hero Main Typography Area -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center items-center text-center relative z-10 py-6 sm:py-10">
      
      <!-- Top Tag Pill -->
      <div data-reveal="blur-in" data-reveal-delay="1" class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 shadow-xs mb-6 sm:mb-8 hover:border-[#9E0402]/40 transition-colors">
        <span class="w-2 h-2 rounded-full bg-[#9E0402] animate-ping"></span>
        <span class="font-mono-tag text-xs font-bold tracking-wider uppercase text-[#9E0402] dark:text-[#ff4d4d]">
          Product Manager & UI/UX Designer /2026/
        </span>
      </div>

      <!-- Giant Editorial Statement (with staggered reveals) -->
      <div class="space-y-1 sm:space-y-2 select-none overflow-hidden">
        <h1 data-reveal="fade-up" data-reveal-delay="2" class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[#1C1313] dark:text-[#F4F4F6]">
          Be Strategic <span class="text-[#9E0402] dark:text-[#ff4d4d] font-mono-tag text-4xl sm:text-6xl md:text-7xl font-normal">*</span>
        </h1>
        <h1 data-reveal="fade-up" data-reveal-delay="3" class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[#9E0402] dark:text-[#ff3b38]">
          Be Creative <span class="text-[#1C1313] dark:text-[#F4F4F6] font-mono-tag text-4xl sm:text-6xl md:text-7xl font-normal">#</span>
        </h1>
        <h1 data-reveal="fade-up" data-reveal-delay="4" class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.95] text-[#5C4848] dark:text-zinc-500 hover:text-[#1C1313] dark:hover:text-white transition-colors duration-300">
          Be Bold <span class="text-[#9E0402] dark:text-[#ff4d4d] font-mono-tag text-2xl sm:text-4xl md:text-5xl font-normal align-top">™</span>
        </h1>
      </div>

      <!-- Intro Subtitle -->
      <p data-reveal="blur-in" data-reveal-delay="5" class="mt-7 text-sm sm:text-base md:text-lg text-[#5C4848] dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
        Halo! Saya <span class="text-[#9E0402] dark:text-[#ff4d4d] font-bold">{{ portfolioInfo.name }}</span> — Memadukan strategi produk end-to-end dengan riset pengguna dan desain UI/UX kelas dunia.
      </p>

      <!-- Action Buttons -->
      <div data-reveal="fade-up" data-reveal-delay="6" class="mt-8 flex flex-col sm:flex-row items-center gap-4">
        <!-- Primary Button (#9E0402) -->
        <RouterLink
          to="/projects"
          class="px-8 py-3.5 rounded-full bg-[#9E0402] hover:bg-[#B80604] text-white font-bold text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-[#9E0402]/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <span>Explore Works</span>
          <ArrowUpRight class="w-4 h-4" />
        </RouterLink>

        <!-- Secondary Button (#9FC2EA) -->
        <RouterLink
          to="/contact"
          class="px-8 py-3.5 rounded-full bg-[#9FC2EA] hover:bg-[#8AB6E5] text-[#1E3A60] dark:text-[#0c1c30] font-bold text-xs sm:text-sm font-mono-tag tracking-wider uppercase border border-[#9FC2EA] shadow-xs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <span>Start a Project</span>
          <span class="text-[#9E0402]">#</span>
        </RouterLink>
      </div>

      <!-- Key Quick Proof Metrics Strip -->
      <div data-reveal="fade-up" data-reveal-delay="7" class="grid grid-cols-3 gap-3 sm:gap-5 pt-8 w-full max-w-xl">
        <div class="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 text-center space-y-0.5 shadow-xs hover:scale-103 transition-transform">
          <span class="text-xl sm:text-2xl font-extrabold text-[#9E0402] dark:text-[#ff4d4d] block leading-tight">4+</span>
          <span class="text-[10px] sm:text-xs text-[#5C4848] dark:text-zinc-400 font-semibold font-mono-tag">Case Studies</span>
        </div>
        <div class="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 text-center space-y-0.5 shadow-xs hover:scale-103 transition-transform">
          <span class="text-xl sm:text-2xl font-extrabold text-[#1E3A60] dark:text-[#9FC2EA] block leading-tight">40%+</span>
          <span class="text-[10px] sm:text-xs text-[#5C4848] dark:text-zinc-400 font-semibold font-mono-tag">Avg. Impact</span>
        </div>
        <div class="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 text-center space-y-0.5 shadow-xs hover:scale-103 transition-transform">
          <span class="text-xl sm:text-2xl font-extrabold text-[#9E0402] dark:text-[#ff4d4d] block leading-tight">100%</span>
          <span class="text-[10px] sm:text-xs text-[#5C4848] dark:text-zinc-400 font-semibold font-mono-tag">Satisfaction</span>
        </div>
      </div>

    </div>

    <!-- Bottom Moving Marquee Ribbon -->
    <div data-reveal="fade-up" data-reveal-delay="8" class="relative z-10 w-full pt-2">
      <InfiniteMarquee speed="normal" />
    </div>

  </section>
</template>
