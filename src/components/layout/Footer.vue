<script setup>
import { RouterLink } from 'vue-router'
import { Github, Linkedin, Mail, Heart } from 'lucide-vue-next'
import { portfolioInfo } from '@/data/portfolioData'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-14 sm:mt-20 border-t border-[#EEDCDC] dark:border-white/10 bg-white dark:bg-[#0E0F12] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10">
        
        <!-- Brand / About col -->
        <div class="md:col-span-6 lg:col-span-5 space-y-3.5">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-[#9E0402] flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-[#9E0402]/25 transform -rotate-2">
              N*
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
              :href="portfolioInfo.socials.linkedin" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 flex items-center justify-center text-[#5C4848] dark:text-zinc-300 hover:text-[#9E0402] dark:hover:text-[#9FC2EA] hover:border-[#9E0402]/40 transition-all shadow-xs"
              aria-label="LinkedIn"
            >
              <Linkedin class="w-4 h-4" />
            </a>
            <a 
              :href="portfolioInfo.socials.github" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 flex items-center justify-center text-[#5C4848] dark:text-zinc-300 hover:text-[#9E0402] dark:hover:text-[#9FC2EA] hover:border-[#9E0402]/40 transition-all shadow-xs"
              aria-label="GitHub"
            >
              <Github class="w-4 h-4" />
            </a>
            <a 
              :href="'mailto:' + portfolioInfo.email" 
              class="w-9 h-9 rounded-xl bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 flex items-center justify-center text-[#5C4848] dark:text-zinc-300 hover:text-[#9E0402] dark:hover:text-[#9FC2EA] hover:border-[#9E0402]/40 transition-all shadow-xs"
              aria-label="Email"
            >
              <Mail class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-3 lg:col-span-3 space-y-2.5">
          <h4 class="text-xs font-bold uppercase font-mono-tag tracking-wider text-[#9E0402] dark:text-[#ff4d4d]">Navigasi</h4>
          <ul class="space-y-2 text-xs sm:text-sm font-semibold text-[#5C4848] dark:text-zinc-400">
            <li><RouterLink to="/" class="hover:text-[#9E0402] dark:hover:text-white transition-colors">Beranda</RouterLink></li>
            <li><RouterLink to="/projects" class="hover:text-[#9E0402] dark:hover:text-white transition-colors">Case Studies ↗</RouterLink></li>
            <li><RouterLink to="/about" class="hover:text-[#9E0402] dark:hover:text-white transition-colors">Tentang Saya *</RouterLink></li>
            <li><RouterLink to="/contact" class="hover:text-[#9E0402] dark:hover:text-white transition-colors">Hubungi Saya #</RouterLink></li>
          </ul>
        </div>

        <!-- Tools & Methods in #FFF9F9 and #9FC2EA -->
        <div class="md:col-span-3 lg:col-span-4 space-y-2.5">
          <h4 class="text-xs font-bold uppercase font-mono-tag tracking-wider text-[#9E0402] dark:text-[#ff4d4d]">Tools & Metode</h4>
          <div class="flex flex-wrap gap-1.5 text-xs text-[#1C1313] dark:text-zinc-300">
            <span class="px-2.5 py-1 rounded-lg bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 font-mono-tag text-[11px] font-bold">Figma</span>
            <span class="px-2.5 py-1 rounded-lg bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 font-mono-tag text-[11px] font-bold">User Research</span>
            <span class="px-2.5 py-1 rounded-lg bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 font-mono-tag text-[11px] font-bold">PRD & User Stories</span>
            <span class="px-2.5 py-1 rounded-lg bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 font-mono-tag text-[11px] font-bold">Design System</span>
            <span class="px-2.5 py-1 rounded-lg bg-[#FFF9F9] dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 font-mono-tag text-[11px] font-bold">Agile / Scrum</span>
            <span class="px-2.5 py-1 rounded-lg bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] border border-[#9FC2EA]/60 dark:border-[#9FC2EA]/30 font-mono-tag text-[11px] font-bold">Usability Testing</span>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-6 border-t border-[#EEDCDC] dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">
        <p>© {{ currentYear }} {{ portfolioInfo.name }}. All rights reserved.</p>
        <p class="flex items-center gap-1.5">
          Built with <Heart class="w-3.5 h-3.5 text-[#9E0402] fill-[#9E0402]" /> using Vue 3, Tailwind & Supabase
        </p>
      </div>
    </div>
  </footer>
</template>
