<script setup>
import { ref } from 'vue'
import { Sparkles, Plus, Minus, HelpCircle } from 'lucide-vue-next'
import { faqs } from '@/data/portfolioData'

const activeIndex = ref(0)

const toggleFaq = (idx) => {
  activeIndex.value = activeIndex.value === idx ? null : idx
}
</script>

<template>
  <section class="py-12 sm:py-18 relative" id="faq">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
      
      <!-- Section Header -->
      <div class="space-y-3 text-center max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase text-[#9E0402] dark:text-[#ff4d4d] shadow-xs">
          <HelpCircle class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
          Pertanyaan yang Sering <span class="text-[#9E0402] dark:text-[#ff3b38]">Diajukan</span>
        </h2>
        <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed">
          Informasi seputar ketersediaan kerja, gaya kolaborasi, dan pendekatan eksekusi produk.
        </p>
      </div>

      <!-- FAQ Accordion List -->
      <div class="space-y-3.5">
        <div
          v-for="(faq, idx) in faqs"
          :key="idx"
          class="rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs"
          :class="[
            activeIndex === idx
              ? 'bg-white dark:bg-[#14161D] border-[#9E0402]/50 dark:border-[#ff4d4d]/50'
              : 'bg-white dark:bg-[#14161D] border-[#EEDCDC] dark:border-white/10 hover:border-[#9E0402]/30 dark:hover:border-white/20'
          ]"
        >
          <!-- Accordion Trigger Button -->
          <button
            @click="toggleFaq(idx)"
            class="w-full px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
          >
            <span class="text-sm sm:text-base font-bold text-[#1C1313] dark:text-white" :class="activeIndex === idx ? 'text-[#9E0402] dark:text-[#ff4d4d]' : ''">
              {{ faq.question }}
            </span>
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
              :class="[
                activeIndex === idx
                  ? 'bg-[#9E0402] text-white rotate-180'
                  : 'bg-[#FFF9F9] dark:bg-[#1A1C24] text-[#1C1313] dark:text-zinc-300 border border-[#EEDCDC] dark:border-white/10'
              ]"
            >
              <Minus v-if="activeIndex === idx" class="w-4 h-4" />
              <Plus v-else class="w-4 h-4" />
            </div>
          </button>

          <!-- Accordion Expandable Content -->
          <transition
            enter-active-class="transition duration-250 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0 max-h-0"
            enter-to-class="transform translate-y-0 opacity-100 max-h-96"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform translate-y-0 opacity-100 max-h-96"
            leave-to-class="transform -translate-y-2 opacity-0 max-h-0"
          >
            <div v-if="activeIndex === idx" class="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed border-t border-[#EEDCDC]/60 dark:border-white/5">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>

    </div>
  </section>
</template>
