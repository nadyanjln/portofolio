<script setup>
import { ref, onMounted } from 'vue'
import { Sparkles, Plus, Minus, HelpCircle } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useScrollReveal } from '@/composables/useAnimations'

const { currentProfile, faqs } = usePortfolioStore()
const activeIndex = ref(0)

const toggleFaq = (idx) => {
  activeIndex.value = activeIndex.value === idx ? null : idx
}

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <section ref="sectionRef" class="py-12 sm:py-18 relative" id="faq">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
      
      <!-- Section Header -->
      <div data-reveal="fade-up" class="space-y-3 text-center max-w-2xl mx-auto">
        <div 
          class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase shadow-xs"
          :class="currentProfile === 'raqwan' ? 'text-emerald-400 border-emerald-500/30' : 'text-[#FB4617] dark:text-[#FB4617]'"
        >
          <HelpCircle class="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
          Pertanyaan yang Sering <span :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#FB4617] dark:text-[#FB4617]'">Diajukan</span>
        </h2>
        <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed" v-if="currentProfile === 'raqwan'">
          Informasi seputar ketersediaan kerja, riset model Machine Learning, dan kolaborasi AI engineering.
        </p>
        <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed" v-else>
          Informasi seputar ketersediaan kerja, gaya kolaborasi, dan pendekatan eksekusi produk.
        </p>
      </div>

      <!-- FAQ Accordion List -->
      <div class="space-y-3.5">
        <div
          v-for="(faq, idx) in faqs"
          :key="idx"
          data-reveal="fade-up"
          :data-reveal-delay="idx + 1"
          class="rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs"
          :class="[
            activeIndex === idx
              ? (currentProfile === 'raqwan' ? 'bg-white dark:bg-[#14161D] border-emerald-500/60' : 'bg-white dark:bg-[#14161D] border-[#FB4617]/50 dark:border-[#FB4617]/50')
              : 'bg-white dark:bg-[#14161D] border-[#EEDCDC] dark:border-white/10 hover:border-white/20'
          ]"
        >
          <!-- Accordion Trigger Button -->
          <button
            @click="toggleFaq(idx)"
            class="w-full px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
          >
            <span 
              class="text-sm sm:text-base font-bold text-[#1C1313] dark:text-white" 
              :class="activeIndex === idx ? (currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#FB4617] dark:text-[#FB4617]') : ''"
            >
              {{ faq.question }}
            </span>
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
              :class="[
                activeIndex === idx
                  ? (currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-[#047857] dark:text-emerald-400 rotate-180' : 'bg-[#FB4617]/10 text-[#FB4617] dark:text-[#FB4617] rotate-180')
                  : 'bg-[#FFF9F9] dark:bg-white/5 text-[#5C4848] dark:text-zinc-400'
              ]"
            >
              <Minus v-if="activeIndex === idx" class="w-4 h-4" />
              <Plus v-else class="w-4 h-4" />
            </div>
          </button>

          <!-- Accordion Content Body -->
          <div
            v-show="activeIndex === idx"
            class="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed border-t border-[#EEDCDC] dark:border-white/5 bg-[#FFF9F9]/50 dark:bg-[#0B0C0E]/50"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
