<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight, ArrowDown, Sparkles, Eye, Layers } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import InfiniteMarquee from '@/components/effects/InfiniteMarquee.vue'

const { portfolioInfo, projects, currentProfile } = usePortfolioStore()

// Featured project for the right showcase drawer
const featuredProject = computed(() => {
  if (!projects.value || !projects.value.length) {
    return {
      id: 'featured',
      title: currentProfile.value === 'raqwan' ? 'APEX Real-Time Vision Engine' : 'Lumina Design System & SaaS',
      category: currentProfile.value === 'raqwan' ? 'Computer Vision / Edge AI' : 'Website & App Design',
      summary: currentProfile.value === 'raqwan' 
        ? 'Real-time YOLOv8 object detection with sub-15ms TensorRT quantization.'
        : 'Enterprise UI/UX architecture crafted for frictionless conversion and scale.'
    }
  }
  return projects.value[0]
})

const scrollToWorks = () => {
  const el = document.getElementById('works')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-4 overflow-hidden select-none">
    
    <!-- ══════════════════════════════════════════════════════════
         MAIN HERO CANVAS (Benjamin Creative Asymmetric Composition)
         ══════════════════════════════════════════════════════════ -->
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
      
      <!-- ──────────────────────────────────────────────────────────
           LEFT / CENTER REGION: MANIFESTO + 3D ROSETTE + BLEED LOGO
           ────────────────────────────────────────────────────────── -->
      <div class="lg:col-span-8 flex flex-col justify-between py-2 sm:py-6 relative min-h-[480px] lg:min-h-[580px]">
        
        <!-- TOP: PHILOSOPHICAL MANIFESTO QUOTE (Benjamin Style) -->
        <div class="max-w-2xl space-y-3">
          <div class="inline-flex items-center gap-2">
            <span 
              class="w-2 h-2 rounded-full animate-ping"
              :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#FB4617]'"
            ></span>
            <span class="font-mono-tag text-xs tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
              {{ currentProfile === 'raqwan' ? '// AI ENGINEERING MANIFESTO' : '// CREATIVE DIRECTION MANIFESTO' }}
            </span>
          </div>

          <h2 
            v-if="currentProfile === 'raqwan'"
            class="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1C1313] dark:text-[#F4F4F6] leading-snug"
          >
            Engineers train models to predict. I architect <span class="text-emerald-600 dark:text-[#00F59B]">vision intelligence</span> that feels inevitable — where every weight, tensor, and pipeline has a mathematical reason.
          </h2>

          <h2 
            v-else
            class="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1C1313] dark:text-[#F4F4F6] leading-snug"
          >
            Designers make things look good. I make things feel <span class="text-[#FB4617] dark:text-[#FB4617]">inevitable</span> — where every interaction, transition, and component has a reason.
          </h2>
        </div>

        <!-- CENTER: 3D KINETIC FACETED ROSETTE SCULPTURE + SCROLL PILL -->
        <div class="my-auto py-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-8 relative">
          
          <!-- 3D Perspective Stage -->
          <div class="rosette-stage w-36 h-36 sm:w-44 sm:h-44 relative flex items-center justify-center shrink-0 cursor-pointer group" @click="scrollToWorks">
            
            <!-- Ambient Glow behind Rosette -->
            <div 
              class="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-75 transition-opacity pointer-events-none"
              :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]/30' : 'bg-[#FB4617]/35'"
            ></div>

            <!-- Rotating Rosette Ring -->
            <div class="rosette-ring w-28 h-28 sm:w-32 sm:h-32 relative">
              <!-- 10 Faceted Prisms (3D Petals) -->
              <div 
                v-for="i in 10" 
                :key="i"
                class="absolute inset-0 flex items-center justify-center pointer-events-none"
                :style="{ transform: `rotate(${(i - 1) * 36}deg)` }"
              >
                <div 
                  class="w-5 sm:w-6 h-12 sm:h-14 rounded-sm border transition-all duration-300 shadow-md relative overflow-hidden"
                  :class="currentProfile === 'raqwan' 
                    ? 'bg-gradient-to-t from-[#047857] via-[#059669] to-[#00F59B] border-emerald-400/40 shadow-emerald-500/20' 
                    : 'bg-gradient-to-t from-[#B82B00] via-[#E0370E] to-[#FB4617] border-orange-300/50 shadow-[#FB4617]/25'"
                  :style="{ transform: 'translateY(-28px)' }"
                >
                  <!-- Facet Micro Texture / Dot Grid (Screenshot 2 Aesthetic) -->
                  <div class="absolute inset-0 opacity-40 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:3px_3px]"></div>
                </div>
              </div>

              <!-- Center Core Hub -->
              <div 
                class="absolute inset-0 m-auto w-8 h-8 rounded-full border shadow-inner flex items-center justify-center"
                :class="currentProfile === 'raqwan' 
                  ? 'bg-emerald-950 border-[#00F59B] text-[#00F59B]' 
                  : 'bg-[#400E00] border-[#FB4617] text-[#FB4617]'"
              >
                <div 
                  class="w-2.5 h-2.5 rounded-full animate-ping"
                  :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]' : 'bg-[#FB4617]'"
                ></div>
              </div>
            </div>

          </div>

          <!-- Controls & Metadata Next to 3D Rosette -->
          <div class="flex items-center gap-4">
            <!-- Benjamin Signature "Scroll" Pill Button -->
            <button
              @click="scrollToWorks"
              class="px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              :class="currentProfile === 'raqwan' 
                ? 'bg-[#047857] hover:bg-[#059669] shadow-emerald-500/20' 
                : 'bg-[#FB4617] hover:bg-[#E0370E] shadow-[#FB4617]/30'"
            >
              <span>Scroll</span>
              <ArrowDown class="w-3.5 h-3.5 animate-bounce" />
            </button>

            <!-- Monospace Year Tag -->
            <span class="font-mono-tag text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
              /2026/
            </span>
          </div>

        </div>

        <!-- BOTTOM-LEFT: GIANT BLEED TYPOGRAPHY (Responsive on All Devices) -->
        <div class="overflow-hidden select-none pt-4 pb-2 w-full">
          <h1 
            class="text-3xl sm:text-5xl md:text-6xl lg:text-[3.4rem] xl:text-[4.4rem] 2xl:text-[5.2rem] font-black tracking-tighter leading-[0.98] transition-colors break-words sm:whitespace-nowrap"
            :class="currentProfile === 'raqwan' 
              ? 'text-[#047857] dark:text-[#00F59B]' 
              : 'text-[#FB4617] dark:text-[#FB4617]'"
          >
            {{ currentProfile === 'raqwan' ? 'Muhammad Raqwan .K' : 'Nadya Najelina .S' }}
          </h1>
        </div>

      </div>

      <!-- ──────────────────────────────────────────────────────────
           RIGHT REGION: GIANT VIBRANT SHOWCASE DRAWER / SLAB
           ────────────────────────────────────────────────────────── -->
      <div class="lg:col-span-4 flex flex-col justify-end relative">
        
        <!-- Vibrant Colored Showcase Drawer (Screenshot 2 Right Card) -->
        <div 
          class="w-full rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-500 group border min-h-[380px] sm:min-h-[440px] lg:min-h-[500px]"
          :class="currentProfile === 'raqwan'
            ? 'bg-gradient-to-b from-[#00F59B] via-[#059669] to-[#047857] text-white border-emerald-300/30'
            : 'bg-gradient-to-b from-[#FA6846] via-[#FB4617] to-[#DE3408] text-white border-orange-300/40'"
        >
          <!-- Refined Executive Typography Watermark Across Top -->
          <div class="absolute top-3 sm:top-2 left-4 sm:left-6 select-none pointer-events-none overflow-hidden w-full pr-8">
            <span 
              class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none block uppercase bg-gradient-to-b from-white/35 via-white/20 to-white/5 bg-clip-text text-transparent select-none"
            >
              {{ currentProfile === 'raqwan' ? 'Deep' : 'Design' }}
            </span>
          </div>

          <!-- Top Category Header -->
          <div class="relative z-10 pt-14 sm:pt-20 pb-4">
            <span class="font-mono-tag text-xs font-bold uppercase tracking-widest text-white/80 block mb-1">
              Featured Direction /26
            </span>
            <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight">
              {{ currentProfile === 'raqwan' ? 'Deep Vision & Edge AI' : 'Website & Product Design' }}
            </h3>
          </div>

          <!-- Embedded Showcase Project Tile (Screenshot 2 Aesthetic) -->
          <div 
            class="relative z-10 p-5 rounded-2xl bg-[#E8EAE3]/95 dark:bg-[#151720]/95 text-[#1C1313] dark:text-white backdrop-blur-md shadow-xl space-y-4 border border-black/5 dark:border-white/10 transition-all duration-300 group-hover:translate-y-[-4px]"
          >
            <!-- Badge & Category -->
            <div class="flex items-center justify-between">
              <span 
                class="px-2.5 py-1 rounded-md text-[10px] font-mono-tag font-bold uppercase tracking-wider text-white"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
              >
                HIGHLIGHT
              </span>
              <span class="font-mono-tag text-[11px] text-zinc-500 dark:text-zinc-400 font-bold">
                {{ currentProfile === 'raqwan' ? '/ YOLOv8 FP16' : '/ FLY Pocket 3' }}
              </span>
            </div>

            <!-- Project Headline -->
            <div>
              <h4 class="text-lg font-extrabold tracking-tight line-clamp-1 group-hover:text-[#FB4617] dark:group-hover:text-[#00F59B] transition-colors">
                {{ featuredProject.title }}
              </h4>
              <p class="text-xs text-[#5C4848] dark:text-zinc-300 line-clamp-2 mt-1 leading-relaxed">
                {{ featuredProject.summary }}
              </p>
            </div>

            <!-- Specs & Inspect Link -->
            <div class="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <span class="font-mono-tag text-[10px] text-zinc-500 dark:text-zinc-400 truncate max-w-[160px]">
                {{ currentProfile === 'raqwan' ? 'Ray & TensorRT runtime' : 'Adaptive 4K OLED Design' }}
              </span>

              <RouterLink
                :to="'/' + currentProfile + '/projects'"
                class="inline-flex items-center gap-1 text-xs font-bold transition-all"
                :class="currentProfile === 'raqwan' 
                  ? 'text-[#047857] dark:text-emerald-400 hover:text-emerald-300' 
                  : 'text-[#FB4617] hover:text-[#DE3408] dark:text-orange-400'"
              >
                <span>Inspect</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </RouterLink>
            </div>
          </div>

          <!-- Bottom Drawer Action Footer -->
          <div class="relative z-10 pt-4 flex items-center justify-between text-xs font-mono-tag text-white/90">
            <RouterLink 
              :to="'/' + currentProfile + '/projects'"
              class="flex items-center gap-1.5 font-bold hover:underline tracking-wider uppercase"
            >
              <span>Explore All Works</span>
              <ArrowUpRight class="w-4 h-4" />
            </RouterLink>

            <span class="text-white/60 font-mono-tag">01 / {{ String(projects?.length || (currentProfile === 'raqwan' ? 8 : 5)).padStart(2, '0') }}</span>
          </div>

        </div>

      </div>

    </div>

    <!-- BOTTOM: INFINITE SKILL MARQUEE -->
    <div class="relative z-10 w-full mt-6">
      <InfiniteMarquee />
    </div>

  </section>
</template>
