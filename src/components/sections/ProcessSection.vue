<script setup>
import { ref, onMounted } from 'vue'
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useScrollReveal } from '@/composables/useAnimations'

const { workflows, currentProfile } = usePortfolioStore()

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
          <div 
            class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border text-xs font-mono-tag font-bold uppercase shadow-xs"
            :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400 border-emerald-300 dark:border-[#047857]/40 bg-emerald-50 dark:bg-[#047857]/10' : 'text-[#9E0402] dark:text-[#ff4d4d] border-[#EEDCDC] dark:border-white/10'"
          >
            <Sparkles class="w-3.5 h-3.5" />
            <span>{{ currentProfile === 'raqwan' ? 'AI & ML Engineering Lifecycle /2026/' : 'Product Framework /2026/' }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            Bagaimana Saya <span :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#9E0402] dark:text-[#ff3b38]'">Bekerja</span>
          </h2>
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed" v-if="currentProfile === 'raqwan'">
            Siklus pengembangan AI end-to-end terstruktur — dari perumusan matematis & kurasi dataset hingga arsitektur neural networks, optimasi inference, dan MLOps deployment.
          </p>
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed" v-else>
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
          class="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#14161D] border transition-all duration-300 space-y-4 flex flex-col justify-between group shadow-xs hover:-translate-y-1.5 hover:shadow-md cursor-default"
          :class="currentProfile === 'raqwan' 
            ? 'border-slate-200 dark:border-white/10 hover:border-[#047857] dark:hover:border-emerald-500 hover:shadow-emerald-500/10' 
            : 'border-[#EEDCDC] dark:border-white/10 hover:border-[#9E0402] dark:hover:border-[#ff4d4d] hover:shadow-[#9E0402]/10'"
        >
          <!-- Top Step Index -->
          <div class="space-y-3">
            <!-- Stage Accent Bar -->
            <div 
              class="h-1 w-12 rounded-full transition-all duration-300 group-hover:w-full"
              :class="currentProfile === 'raqwan' ? 'bg-[#047857] dark:bg-emerald-400' : 'bg-[#9E0402] dark:bg-[#ff4d4d]'"
            ></div>

            <div class="flex items-center justify-between pt-1">
              <span 
                class="text-xs font-mono-tag font-extrabold px-3 py-1 rounded-full text-white shadow-xs"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#9E0402]'"
              >
                STAGE {{ stage.step }}
              </span>
              <span 
                class="text-2xl sm:text-3xl font-black font-mono-tag text-[#EEDCDC] dark:text-white/10 transition-colors"
                :class="currentProfile === 'raqwan' ? 'group-hover:text-[#047857] dark:group-hover:text-emerald-400' : 'group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'"
              >
                /{{ stage.step }}/
              </span>
            </div>

            <!-- Title & Tagline -->
            <div class="space-y-1 pt-1">
              <h3 
                class="text-lg sm:text-xl font-bold text-[#1C1313] dark:text-white transition-colors leading-snug"
                :class="currentProfile === 'raqwan' ? 'group-hover:text-[#047857] dark:group-hover:text-emerald-300' : 'group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'"
              >
                {{ stage.phase }}
              </h3>
              <p 
                class="text-xs font-mono-tag font-bold"
                :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'"
              >
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
                <CheckCircle2 
                  class="w-3.5 h-3.5 shrink-0 mt-0.5" 
                  :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'"
                />
                <span class="leading-tight">{{ del }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
