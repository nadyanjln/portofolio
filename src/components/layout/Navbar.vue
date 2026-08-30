<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Sun, 
  Moon, 
  Compass, 
  ArrowLeftRight 
} from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const { isDark, toggleTheme } = useTheme()
const { portfolioInfo, currentProfile } = usePortfolioStore()

// Dynamic navigation links based on active profile
const navLinks = computed(() => {
  const p = currentProfile.value || 'nadya'
  return [
    { name: 'Home', path: `/${p}`, symbol: '' },
    { name: 'About', path: `/${p}/about`, symbol: '*' },
    { name: 'Works', path: `/${p}/projects`, symbol: '↗' },
    { name: 'Contact', path: `/${p}/contact`, symbol: '' },
  ]
})

// Alternative profile for quick switch
const otherProfile = computed(() => {
  return currentProfile.value === 'nadya'
    ? { key: 'raqwan', name: 'Raqwan', role: 'AI Engineer' }
    : { key: 'nadya', name: 'Nadya', role: 'Product Manager' }
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-300">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      
      <!-- Left Logo Badge & Profile Name -->
      <RouterLink 
        :to="'/' + currentProfile" 
        @click="closeMobileMenu"
        class="flex items-center gap-2.5 group cursor-pointer"
      >
        <div 
          class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-md transition-all duration-300 transform -rotate-2 group-hover:rotate-0"
          :class="[
            currentProfile === 'nadya'
              ? 'bg-[#9E0402] hover:bg-[#B80604] shadow-[#9E0402]/25'
              : 'bg-[#047857] hover:bg-[#065F46] shadow-[#047857]/30'
          ]"
        >
          {{ currentProfile === 'nadya' ? 'N*' : 'R*' }}
        </div>
        <div class="hidden sm:flex flex-col">
          <span class="font-bold text-sm tracking-tight text-[#1C1313] dark:text-[#F4F4F6] transition-colors" :class="[currentProfile === 'nadya' ? 'group-hover:text-[#9E0402]' : 'group-hover:text-emerald-400']">
            {{ portfolioInfo.name }}
          </span>
          <span class="font-mono-tag text-[9px] text-[#5C4848] dark:text-zinc-400 tracking-wider uppercase">
            {{ portfolioInfo.title }}
          </span>
        </div>
      </RouterLink>

      <!-- Center Navigation Links in Clean Glass Pill -->
      <nav class="hidden md:flex items-center gap-6 lg:gap-8 px-6 py-2 rounded-full bg-white/95 dark:bg-[#15161B]/90 backdrop-blur-xl border border-[#EEDCDC] dark:border-white/10 shadow-xs">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1 group py-1"
          :class="[
            route.path === link.path 
              ? (currentProfile === 'nadya' ? 'text-[#9E0402] font-bold' : 'text-emerald-400 font-bold')
              : (currentProfile === 'nadya' ? 'text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402] dark:hover:text-white' : 'text-[#5C4848] dark:text-zinc-400 hover:text-emerald-400 dark:hover:text-white')
          ]"
        >
          <span>{{ link.name }}</span>
          <span v-if="link.symbol" class="text-[11px] font-mono-tag group-hover:translate-x-0.5 transition-transform" :class="currentProfile === 'nadya' ? 'text-[#9E0402]' : 'text-emerald-400'">
            {{ link.symbol }}
          </span>
        </RouterLink>
      </nav>

      <!-- Right: Theme Switcher, Quick Profile Switch & Primary CTA -->
      <div class="flex items-center gap-2 sm:gap-2.5">
        
        <!-- Duo Space / Profile Switcher -->
        <RouterLink
          to="/"
          class="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-[#15161B] text-[#5C4848] dark:text-zinc-300 border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag transition-all shadow-xs"
          :class="currentProfile === 'nadya' ? 'hover:border-[#9E0402]/40' : 'hover:border-[#047857]/50'"
          title="Kembali ke Ruang Nadya & Raqwan"
        >
          <Compass class="w-3.5 h-3.5 text-zinc-400" />
          <span>Duo Space</span>
        </RouterLink>

        <RouterLink
          :to="'/' + otherProfile.key"
          class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-[#15161B] text-[#5C4848] dark:text-zinc-300 border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag transition-all shadow-xs"
          :class="currentProfile === 'nadya' ? 'hover:border-[#9E0402]/40' : 'hover:border-[#047857]/50'"
          :title="'Beralih ke Portofolio ' + otherProfile.name"
        >
          <ArrowLeftRight class="w-3.5 h-3.5 text-zinc-400" />
          <span>{{ otherProfile.name }} ↗</span>
        </RouterLink>

        <!-- Dark / Light Mode Toggle Switch -->
        <button
          @click="toggleTheme"
          class="p-2 sm:p-2.5 rounded-xl bg-white dark:bg-[#15161B] text-[#5C4848] dark:text-zinc-300 border border-[#EEDCDC] dark:border-white/10 dark:hover:border-white/20 transition-all cursor-pointer shadow-xs"
          :class="currentProfile === 'nadya' ? 'hover:text-[#9E0402] hover:border-[#9E0402]/30' : 'hover:text-emerald-400 hover:border-[#047857]/50'"
          :title="isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'"
          aria-label="Toggle Dark/Light Mode"
        >
          <Sun v-if="isDark" class="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
          <Moon v-else class="w-4 h-4 transition-transform duration-300 hover:-rotate-12" :class="currentProfile === 'nadya' ? 'text-[#9E0402]' : 'text-emerald-500'" />
        </button>

        <!-- Let's Talk Primary CTA Pill -->
        <RouterLink
          :to="'/' + currentProfile + '/contact'"
          class="px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-full text-white shadow-md transition-all duration-300 flex items-center gap-1.5 transform hover:-translate-y-0.5 active:translate-y-0"
          :class="[
            currentProfile === 'nadya'
              ? 'bg-[#9E0402] hover:bg-[#B80604] shadow-[#9E0402]/20'
              : 'bg-[#047857] hover:bg-[#065F46] shadow-[#047857]/25'
          ]"
        >
          <span>Let's talk</span>
          <ArrowUpRight class="w-3.5 h-3.5" />
        </RouterLink>

        <!-- Mobile Menu Toggle Button -->
        <button
          @click="toggleMobileMenu"
          aria-label="Toggle navigation menu"
          class="md:hidden p-2 rounded-xl text-[#1C1313] dark:text-white bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 focus:outline-none"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </button>
      </div>

    </div>

    <!-- Mobile Dropdown Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden mt-3 p-4 rounded-2xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 shadow-xl flex flex-col gap-2"
      >
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="closeMobileMenu"
          class="flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-xl transition-all"
          :class="[
            route.path === link.path 
              ? (currentProfile === 'nadya' ? 'bg-[#9E0402] text-white' : 'bg-[#047857] text-white')
              : 'text-[#1C1313] dark:text-zinc-200 hover:bg-[#FDF6F6] dark:hover:bg-white/5'
          ]"
        >
          <span>{{ link.name }}</span>
          <span v-if="link.symbol" class="font-mono-tag text-xs">{{ link.symbol }}</span>
        </RouterLink>

        <!-- Switch Profile in Mobile Menu -->
        <div class="pt-3 mt-1 border-t border-[#EEDCDC] dark:border-white/10 flex items-center justify-between gap-2">
          <RouterLink
            :to="'/' + otherProfile.key"
            @click="closeMobileMenu"
            class="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tag text-zinc-300 flex items-center gap-1.5"
          >
            <ArrowLeftRight class="w-3.5 h-3.5" />
            <span>Lihat {{ otherProfile.name }}</span>
          </RouterLink>

          <RouterLink
            to="/"
            @click="closeMobileMenu"
            class="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono-tag text-zinc-400"
          >
            Portal Hub ↗
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>
