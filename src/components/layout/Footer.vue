<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import FooterMatrixBanner from '@/components/effects/FooterMatrixBanner.vue'

const { portfolioInfo, currentProfile, skills } = usePortfolioStore()
const currentYear = new Date().getFullYear()

const topSkills = computed(() => {
  return (skills.value || []).slice(0, 6)
})
</script>

<template>
  <footer class="mt-14 sm:mt-20 border-t border-[#EEDCDC] dark:border-white/10 bg-white dark:bg-[#0A0B0E] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10 sm:space-y-12">
      
      <!-- Top Links & Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        
        <!-- Brand / About col -->
        <div class="md:col-span-6 lg:col-span-5 space-y-3.5">
          <div class="flex items-center gap-2.5">
            <div 
              class="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-md transform -rotate-2"
              :class="currentProfile === 'raqwan' ? 'bg-[#047857] shadow-[#047857]/30' : 'bg-[#9E0402] shadow-[#9E0402]/25'"
            >
              {{ currentProfile === 'raqwan' ? 'R*' : 'N*' }}
            </div>
            <div>
              <span class="font-bold text-base sm:text-lg text-[#1C1313] dark:text-[#F4F4F6] block leading-tight">{{ portfolioInfo.name }}</span>
              <span class="text-xs text-[#5C4848] dark:text-zinc-400 font-mono-tag">{{ portfolioInfo.title }}</span>
            </div>
          </div>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400 max-w-md leading-relaxed">
            {{ portfolioInfo.tagline }}
          </p>
          <div class="flex items-center gap-2.5 pt-1">
            <a 
              v-if="portfolioInfo.socials?.linkedin"
              :href="portfolioInfo.socials.linkedin" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 flex items-center justify-center text-[#5C4848] dark:text-zinc-300 hover:border-[#047857]/50 hover:text-emerald-400 transition-all shadow-xs"
              aria-label="LinkedIn"
            >
              <Linkedin class="w-4 h-4" />
            </a>
            <a 
              v-if="portfolioInfo.socials?.github"
              :href="portfolioInfo.socials.github" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 flex items-center justify-center text-[#5C4848] dark:text-zinc-300 hover:border-[#047857]/50 hover:text-emerald-400 transition-all shadow-xs"
              aria-label="GitHub"
            >
              <Github class="w-4 h-4" />
            </a>
            <a 
              :href="'mailto:' + portfolioInfo.email" 
              class="w-9 h-9 rounded-xl bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 flex items-center justify-center text-[#5C4848] dark:text-zinc-300 hover:border-[#047857]/50 hover:text-emerald-400 transition-all shadow-xs"
              aria-label="Email"
            >
              <Mail class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-3 lg:col-span-3 space-y-3">
          <h4 
            class="text-xs font-bold uppercase font-mono-tag tracking-wider flex items-center gap-1.5"
            :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
            Navigasi
          </h4>
          <ul class="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <li>
              <RouterLink 
                :to="'/' + currentProfile" 
                class="inline-flex items-center gap-1.5 transition-colors group"
                :class="currentProfile === 'raqwan' ? 'hover:text-emerald-400' : 'hover:text-[#9E0402] dark:hover:text-[#ff4d4d]'"
              >
                <span class="text-zinc-400 dark:text-zinc-600 group-hover:text-current transition-colors">/</span>
                <span>Beranda</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                :to="'/' + currentProfile + '/projects'" 
                class="inline-flex items-center gap-1.5 transition-colors group"
                :class="currentProfile === 'raqwan' ? 'hover:text-emerald-400' : 'hover:text-[#9E0402] dark:hover:text-[#ff4d4d]'"
              >
                <span class="text-zinc-400 dark:text-zinc-600 group-hover:text-current transition-colors">/</span>
                <span>Case Studies</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                :to="'/' + currentProfile + '/about'" 
                class="inline-flex items-center gap-1.5 transition-colors group"
                :class="currentProfile === 'raqwan' ? 'hover:text-emerald-400' : 'hover:text-[#9E0402] dark:hover:text-[#ff4d4d]'"
              >
                <span class="text-zinc-400 dark:text-zinc-600 group-hover:text-current transition-colors">/</span>
                <span>Tentang Saya</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink 
                :to="'/' + currentProfile + '/contact'" 
                class="inline-flex items-center gap-1.5 transition-colors group"
                :class="currentProfile === 'raqwan' ? 'hover:text-emerald-400' : 'hover:text-[#9E0402] dark:hover:text-[#ff4d4d]'"
              >
                <span class="text-zinc-400 dark:text-zinc-600 group-hover:text-current transition-colors">/</span>
                <span>Hubungi Saya</span>
              </RouterLink>
            </li>
            <li class="col-span-2 sm:col-span-1 pt-1 border-t border-zinc-200/50 dark:border-white/5">
              <RouterLink 
                to="/" 
                class="inline-flex items-center gap-1.5 text-xs font-mono-tag text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Sparkles class="w-3 h-3" />
                <span>Duo Space (Nadya & Raqwan)</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Tools & Methods -->
        <div class="md:col-span-3 lg:col-span-4 space-y-2.5">
          <h4 
            class="text-xs font-bold uppercase font-mono-tag tracking-wider"
            :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'"
          >
            Core Competencies
          </h4>
          <div class="flex flex-wrap gap-1.5 text-xs text-[#1C1313] dark:text-zinc-300">
            <span 
              v-for="s in topSkills" 
              :key="s.name"
              class="px-2.5 py-1 rounded-lg bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 font-mono-tag text-[11px] font-bold"
            >
              {{ s.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- CINEMATIC INTERACTIVE MATRIX FOOTER BANNER  -->
      <!-- ═══════════════════════════════════════════ -->
      <FooterMatrixBanner />

      <!-- Minimalist Bottom Copyright Row -->
      <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">
        <p>© {{ currentYear }} {{ portfolioInfo.name }}. All rights reserved.</p>
        <p class="flex items-center gap-1.5">
          Built with <Heart class="w-3.5 h-3.5" :class="currentProfile === 'raqwan' ? 'text-emerald-500 fill-emerald-500' : 'text-[#9E0402] fill-[#9E0402]'" /> using Vue 3, Tailwind & Supabase
        </p>
      </div>

    </div>
  </footer>
</template>
