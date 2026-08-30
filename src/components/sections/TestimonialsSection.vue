<script setup>
import { Sparkles, Quote, CheckCircle } from 'lucide-vue-next'
import { testimonials } from '@/data/portfolioData'
</script>

<template>
  <section class="py-12 sm:py-18 relative" id="testimonials">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
      
      <!-- Section Header -->
      <div class="space-y-3 max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase text-[#9E0402] dark:text-[#ff4d4d] shadow-xs">
          <Sparkles class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
          <span>Social Proof & Endorsements</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
          Apa Kata Rekan & <span class="text-[#9E0402] dark:text-[#ff3b38]">Stakeholder</span>
        </h2>
        <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed">
          Testimoni langsung dari VP of Product, Engineering Lead, dan Startup Founder yang pernah berkolaborasi bersama.
        </p>
      </div>

      <!-- Testimonials Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-5 flex flex-col justify-between shadow-xs hover:border-[#9E0402]/40 dark:hover:border-[#ff4d4d]/40 transition-all duration-300 hover:-translate-y-1 group"
        >
          <!-- Top Quote Icon & Badge -->
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-2xl bg-[#9FC2EA]/20 dark:bg-[#9FC2EA]/10 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center group-hover:bg-[#9E0402] group-hover:text-white transition-colors duration-300">
              <Quote class="w-5 h-5" />
            </div>
            <span class="inline-flex items-center gap-1 text-[11px] font-mono-tag font-bold px-2.5 py-1 rounded-full bg-[#FDF6F6] dark:bg-[#1A1C24] text-[#9E0402] dark:text-[#ff4d4d] border border-[#EEDCDC] dark:border-white/10">
              <CheckCircle class="w-3 h-3" />
              <span>{{ item.badge }}</span>
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
              class="w-11 h-11 rounded-full object-cover border-2 border-[#9E0402]/20"
              loading="lazy"
            />
            <div class="min-w-0">
              <h4 class="text-sm font-bold text-[#1C1313] dark:text-white truncate">
                {{ item.name }}
              </h4>
              <p class="text-xs text-[#9E0402] dark:text-[#ff4d4d] font-mono-tag font-bold truncate">
                {{ item.role }}
              </p>
              <p class="text-[11px] text-[#5C4848] dark:text-zinc-400 font-mono-tag truncate">
                {{ item.company }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
