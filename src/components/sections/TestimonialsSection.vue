<script setup>
import { ref, onMounted } from 'vue'
import { Sparkles, Quote, CheckCircle } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useScrollReveal } from '@/composables/useAnimations'

const { testimonials, currentProfile } = usePortfolioStore()
const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <section ref="sectionRef" class="py-12 sm:py-18 relative" id="testimonials">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
      
      <!-- Section Header -->
      <div data-reveal="fade-up" class="space-y-3 max-w-3xl">
        <div 
          class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border text-xs font-mono-tag font-bold uppercase shadow-xs"
          :class="currentProfile === 'raqwan' ? 'text-emerald-400 border-[#047857]/40 bg-[#047857]/10' : 'text-[#9E0402] dark:text-[#ff4d4d] border-[#EEDCDC] dark:border-white/10'"
        >
          <Sparkles class="w-3.5 h-3.5" />
          <span>Social Proof & Endorsements</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
          Apa Kata Rekan & <span :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff3b38]'">Stakeholder</span>
        </h2>
        <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed" v-if="currentProfile === 'raqwan'">
          Testimoni langsung dari AI Research Lead, Principal ML Engineer, dan Tech Lead yang pernah berkolaborasi bersama dalam deployment sistem AI.
        </p>
        <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed" v-else>
          Testimoni langsung dari VP of Product, Engineering Lead, dan Startup Founder yang pernah berkolaborasi bersama.
        </p>
      </div>

      <!-- Testimonials Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(item, idx) in testimonials"
          :key="item.id || idx"
          data-reveal="fade-up"
          :data-reveal-delay="idx + 1"
          class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-5 flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1 group"
          :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40 dark:hover:border-[#ff4d4d]/40'"
        >
          <!-- Top Quote Icon & Badge -->
          <div class="flex items-center justify-between">
            <div 
              class="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-300"
              :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-300 group-hover:bg-[#047857] group-hover:text-white' : 'bg-[#9FC2EA]/20 dark:bg-[#9FC2EA]/10 text-[#1E3A60] dark:text-[#9FC2EA] group-hover:bg-[#9E0402] group-hover:text-white'"
            >
              <Quote class="w-5 h-5" />
            </div>
            <span 
              class="inline-flex items-center gap-1 text-[11px] font-mono-tag font-bold px-2.5 py-1 rounded-full border"
              :class="currentProfile === 'raqwan' ? 'bg-emerald-50 dark:bg-[#047857]/15 border-emerald-200 dark:border-[#047857]/40 text-[#047857] dark:text-emerald-300' : 'bg-[#FDF6F6] dark:bg-[#1A1C24] border-[#EEDCDC] dark:border-white/10 text-[#9E0402] dark:text-[#ff4d4d]'"
            >
              <CheckCircle class="w-3 h-3" />
              <span>{{ item.badge || 'Verified Colleague' }}</span>
            </span>
          </div>

          <!-- Quote Body -->
          <p class="text-xs sm:text-sm text-[#1C1313] dark:text-zinc-200 leading-relaxed italic">
            "{{ item.content }}"
          </p>

          <!-- Author Info -->
          <div class="flex items-center gap-3.5 pt-4 border-t border-[#EEDCDC] dark:border-white/10">
            <img
              :src="item.avatar"
              :alt="item.name"
              class="w-11 h-11 rounded-full object-cover border border-[#EEDCDC] dark:border-white/10 bg-zinc-800 shrink-0"
              loading="lazy"
            />
            <div>
              <h4 class="font-bold text-xs sm:text-sm text-[#1C1313] dark:text-white leading-tight">
                {{ item.name }}
              </h4>
              <p class="text-[11px] font-mono-tag text-[#5C4848] dark:text-zinc-400 pt-0.5">
                {{ item.role }} • {{ item.company }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
