<script setup>
import { ref, onMounted } from 'vue'
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-vue-next'
import { workflows } from '@/data/portfolioData'
import { useScrollReveal } from '@/composables/useAnimations'

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <section ref="sectionRef" class="py-12 sm:py-18 relative" id="process">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
      
      <!-- Section Header -->
      <div data-reveal="fade-up" class="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-3xl">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase text-[#9E0402] dark:text-[#ff4d4d] shadow-xs">
            <Sparkles class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
            <span>Product Framework /2026/</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            Bagaimana Saya <span class="text-[#9E0402] dark:text-[#ff3b38]">Bekerja</span>
          </h2>
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed">
            Metodologi end-to-end terstruktur yang menghubungkan riset pengguna, strategi bisnis, dan eksekusi desain berkualitas tinggi.
          </p>
        </div>
      </div>

      <!-- 4 Stages Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        <div
          v-for="(stage, idx) in workflows"
          :key="stage.step"
          data-reveal="fade-up"
          :data-reveal-delay="idx + 1"
          class="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 hover:border-[#9E0402]/50 dark:hover:border-[#ff4d4d]/50 transition-all duration-300 space-y-4 flex flex-col justify-between group shadow-xs hover:-translate-y-1.5 hover:shadow-md"
        >
          <!-- Top Step Index -->
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono-tag font-extrabold px-3 py-1 rounded-full bg-[#9E0402] text-white shadow-xs">
                STAGE {{ stage.step }}
              </span>
              <span class="text-2xl sm:text-3xl font-black font-mono-tag text-[#EEDCDC] dark:text-white/10 group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d] transition-colors">
                /{{ stage.step }}/
              </span>
            </div>

            <!-- Title & Tagline -->
            <div class="space-y-1 pt-1">
              <h3 class="text-lg sm:text-xl font-bold text-[#1C1313] dark:text-white group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d] transition-colors leading-snug">
                {{ stage.phase }}
              </h3>
              <p class="text-xs font-mono-tag text-[#9E0402] dark:text-[#ff4d4d] font-bold">
                {{ stage.tagline }}
              </p>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed">
              {{ stage.description }}
            </p>
          </div>

          <!-- Deliverables List -->
          <div class="pt-3 border-t border-[#EEDCDC] dark:border-white/10 space-y-2">
            <span class="text-[11px] font-mono-tag uppercase tracking-wider text-[#5C4848] dark:text-zinc-400 font-bold block">
              Key Deliverables:
            </span>
            <div class="space-y-1.5">
              <div
                v-for="(del, dIdx) in stage.deliverables"
                :key="dIdx"
                class="flex items-start gap-2 text-xs text-[#1C1313] dark:text-zinc-200"
              >
                <CheckCircle2 class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d] shrink-0 mt-0.5" />
                <span class="leading-tight">{{ del }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
