<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  UserCircle, 
  Users, 
  Wrench,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  ArrowUpRight,
  ImageIcon,
  ChevronRight,
  BookOpen,
  Layers,
  Palette,
  X,
  Maximize2,
  Copy,
  Check
} from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useScrollReveal } from '@/composables/useAnimations'

const { projects } = usePortfolioStore()
const route = useRoute()

const project = computed(() => {
  return (projects.value || []).find(p => p.id === route.params.id) || null
})

const detail = computed(() => project.value?.detail || null)

// Next/Prev Project Navigation helpers
const currentIndex = computed(() => (projects.value || []).findIndex(p => p.id === route.params.id))
const prevProject = computed(() => {
  const list = projects.value || []
  if (!list.length) return null
  if (currentIndex.value > 0) return list[currentIndex.value - 1]
  return list[list.length - 1]
})
const nextProject = computed(() => {
  const list = projects.value || []
  if (!list.length) return null
  if (currentIndex.value < list.length - 1) return list[currentIndex.value + 1]
  return list[0]
})

// Sticky Sub-navigation Table of Contents
const activeSection = ref('overview')
const tocSections = [
  { id: 'overview', label: '01. Overview' },
  { id: 'problem', label: '02. Challenge' },
  { id: 'process', label: '03. Process' },
  { id: 'system', label: '04. Design System' },
  { id: 'impact', label: '05. Impact' },
  { id: 'gallery', label: '06. Gallery' },
  { id: 'learnings', label: '07. Takeaways' }
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const yOffset = -100
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

// Lightbox Modal State
const lightboxImage = ref(null)
const openLightbox = (img) => {
  lightboxImage.value = img
}
const closeLightbox = () => {
  lightboxImage.value = null
}

// Design System Token Copy State
const copiedToken = ref('')
const copyToken = (text) => {
  navigator.clipboard?.writeText(text)
  copiedToken.value = text
  setTimeout(() => {
    copiedToken.value = ''
  }, 1500)
}

// Active Tab in Design Tokens & UI Sandbox
const activeDesignTab = ref('colors')

// Section Scroll Reveal
const sectionRef = ref(null)
const { observeAll } = useScrollReveal()

onMounted(() => {
  observeAll(sectionRef.value)

  // Scroll spy for TOC
  const handleScroll = () => {
    const scrollPos = window.scrollY + 140
    tocSections.forEach(section => {
      const el = document.getElementById(section.id)
      if (el) {
        const top = el.offsetTop
        const height = el.offsetHeight
        if (scrollPos >= top && scrollPos < top + height) {
          activeSection.value = section.id
        }
      }
    })
  }
  window.addEventListener('scroll', handleScroll, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <div ref="sectionRef" class="pt-24 pb-16 sm:pt-28 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    
    <!-- Top Return Bar -->
    <div class="flex items-center justify-between gap-4 mb-6">
      <RouterLink
        to="/projects"
        class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono-tag text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402] dark:hover:text-[#ff4d4d] transition-colors group uppercase tracking-wider"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to All Works</span>
      </RouterLink>

      <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 hidden sm:inline-block">
        Project /{{ project?.id || '01' }}/
      </span>
    </div>

    <div v-if="project" class="space-y-12 sm:space-y-16">

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 1: Editorial Hero Header            -->
      <!-- Inspired by Abhaysingh x Appsmith           -->
      <!-- ═══════════════════════════════════════════ -->
      <header data-reveal="fade-up" class="space-y-6">
        
        <!-- Category & Year Tags -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3.5 py-1 text-xs font-extrabold font-mono-tag uppercase rounded-full bg-[#9E0402] text-white shadow-xs">
            {{ project.category }}
          </span>
          <span v-if="detail" class="px-3.5 py-1 text-xs font-bold font-mono-tag rounded-full bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] border border-[#9FC2EA]/50 dark:border-[#9FC2EA]/30">
            {{ detail.duration }}
          </span>
          <span class="px-3.5 py-1 text-xs font-mono-tag rounded-full bg-white dark:bg-[#15161B] text-[#5C4848] dark:text-zinc-400 border border-[#EEDCDC] dark:border-white/10">
            Tech & Product Suite /2026/
          </span>
        </div>

        <!-- Big Editorial Headline -->
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#1C1313] dark:text-[#F4F4F6] tracking-tight leading-[1.05]">
          {{ project.title }}
        </h1>

        <!-- High-Impact Tagline / Executive Summary -->
        <p class="text-base sm:text-lg md:text-xl text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl font-medium">
          {{ project.description }}
        </p>

        <!-- Meta Specification Strip (Role, Timeline, Team, Platform) -->
        <div v-if="detail" class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
          <div class="p-4 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1 shadow-xs">
            <span class="text-[10px] font-bold font-mono-tag uppercase text-[#9E0402] dark:text-[#ff4d4d] tracking-wider block">Role</span>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white truncate">{{ detail.role }}</p>
          </div>
          <div class="p-4 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1 shadow-xs">
            <span class="text-[10px] font-bold font-mono-tag uppercase text-[#9E0402] dark:text-[#ff4d4d] tracking-wider block">Timeline</span>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white truncate">{{ detail.duration }}</p>
          </div>
          <div class="p-4 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1 shadow-xs">
            <span class="text-[10px] font-bold font-mono-tag uppercase text-[#9E0402] dark:text-[#ff4d4d] tracking-wider block">Team</span>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white truncate">{{ detail.team.length }} Cross-Functional</p>
          </div>
          <div class="p-4 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1 shadow-xs">
            <span class="text-[10px] font-bold font-mono-tag uppercase text-[#9E0402] dark:text-[#ff4d4d] tracking-wider block">Deliverables</span>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white truncate">PRD & High-Fi Figma</p>
          </div>
        </div>

        <!-- Main Banner Image with Interactive Zoom Preview -->
        <div class="relative group p-2.5 sm:p-3.5 rounded-[36px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 overflow-hidden shadow-sm">
          <div class="relative overflow-hidden rounded-[26px] aspect-video md:aspect-[21/9] bg-[#FDF6F6] dark:bg-[#1C1E24]">
            <img 
              :src="project.image" 
              :alt="project.title"
              class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
            <button
              @click="openLightbox({ image: project.image, caption: project.title })"
              class="absolute bottom-4 right-4 p-3 rounded-2xl bg-black/70 hover:bg-[#9E0402] text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2 text-xs font-mono-tag font-bold uppercase shadow-lg"
            >
              <Maximize2 class="w-4 h-4" />
              <span>Fullscreen Preview</span>
            </button>
          </div>
        </div>

      </header>

      <!-- ═══════════════════════════════════════════ -->
      <!-- STICKY TABLE OF CONTENTS SUB-NAV            -->
      <!-- Inspired by Abhaysingh section jumper       -->
      <!-- ═══════════════════════════════════════════ -->
      <div class="sticky top-20 z-40 py-2.5 bg-[#FFF9F9]/85 dark:bg-[#0B0C0E]/85 backdrop-blur-xl border-y border-[#EEDCDC] dark:border-white/10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto custom-scroll">
        <button
          v-for="item in tocSections"
          :key="item.id"
          @click="scrollTo(item.id)"
          class="px-3.5 py-1.5 rounded-full text-xs font-mono-tag font-bold uppercase whitespace-nowrap transition-all duration-200 cursor-pointer"
          :class="[
            activeSection === item.id 
              ? 'bg-[#9E0402] text-white shadow-xs' 
              : 'bg-white dark:bg-[#15161B] text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402] dark:hover:text-white border border-[#EEDCDC] dark:border-white/10'
          ]"
        >
          {{ item.label }}
        </button>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 2: Overview & Executive Context     -->
      <!-- ═══════════════════════════════════════════ -->
      <section id="overview" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center shrink-0">
            <BookOpen class="w-4 h-4" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">Executive Overview</h2>
        </div>

        <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-5 shadow-xs">
          <p class="text-sm sm:text-base md:text-lg text-[#5C4848] dark:text-zinc-300 leading-relaxed font-normal">
            {{ detail?.overview }}
          </p>

          <!-- Highlight Callout Box (Appsmith style) -->
          <div class="p-5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border-l-4 border-[#9E0402] space-y-1.5">
            <span class="text-xs font-extrabold font-mono-tag uppercase tracking-wider text-[#9E0402] dark:text-[#ff4d4d] flex items-center gap-1.5">
              <Sparkles class="w-3.5 h-3.5" />
              <span>Core Strategic Focus</span>
            </span>
            <p class="text-xs sm:text-sm text-[#1C1313] dark:text-zinc-200 font-semibold leading-relaxed">
              Membangun fondasi pengalaman pengguna terpadu dengan integrasi riset kuantitatif dan kualitatif, memastikan adopsi pengguna meningkat dan time-to-value berkurang secara signifikan.
            </p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 3: The Challenge & Problem Space   -->
      <!-- ═══════════════════════════════════════════ -->
      <section v-if="detail?.problem" id="problem" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d] flex items-center justify-center shrink-0">
            <AlertTriangle class="w-4 h-4" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            {{ detail.problem.title }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div 
            v-for="(point, idx) in detail.problem.points" 
            :key="idx"
            class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-start gap-4 shadow-xs hover:border-[#9E0402]/40 transition-colors"
          >
            <div class="w-9 h-9 rounded-2xl bg-[#9E0402]/10 text-[#9E0402] dark:text-[#ff4d4d] flex items-center justify-center font-mono-tag font-bold text-sm shrink-0 border border-[#9E0402]/20">
              {{ String(idx + 1).padStart(2, '0') }}
            </div>
            <div class="space-y-1">
              <span class="text-xs font-bold font-mono-tag uppercase text-[#5C4848] dark:text-zinc-400">Pain Point /0{{ idx + 1 }}/</span>
              <p class="text-xs sm:text-sm text-[#1C1313] dark:text-zinc-200 leading-relaxed font-medium">{{ point }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 4: Execution Process & Phases       -->
      <!-- ═══════════════════════════════════════════ -->
      <section v-if="detail?.process" id="process" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center shrink-0">
            <ChevronRight class="w-4 h-4" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            Proses & Tahapan Eksekusi
          </h2>
        </div>

        <div class="space-y-4">
          <div 
            v-for="(step, idx) in detail.process" 
            :key="idx"
            class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-4 shadow-xs hover:border-[#9E0402]/40 transition-all duration-300"
          >
            <!-- Phase Header -->
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-2xl bg-[#9E0402] text-white flex items-center justify-center font-mono-tag font-extrabold text-sm shrink-0 shadow-md shadow-[#9E0402]/25">
                {{ String(idx + 1).padStart(2, '0') }}
              </div>
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono-tag font-bold uppercase tracking-wider text-[#9E0402] dark:text-[#ff4d4d]">Phase /0{{ idx + 1 }}/</span>
                </div>
                <h3 class="text-lg sm:text-xl font-bold text-[#1C1313] dark:text-white">{{ step.phase }}</h3>
                <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed">{{ step.description }}</p>
              </div>
            </div>

            <!-- Deliverables Output Grid -->
            <div v-if="step.deliverables?.length" class="sm:ml-14 space-y-2 pt-2 border-t border-[#EEDCDC] dark:border-white/10">
              <span class="text-xs font-bold font-mono-tag uppercase tracking-wider text-[#1E3A60] dark:text-[#9FC2EA] block">
                Deliverables & Tangible Outputs:
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div 
                  v-for="(del, dIdx) in step.deliverables" 
                  :key="dIdx"
                  class="flex items-center gap-2.5 text-xs text-[#1C1313] dark:text-zinc-200 bg-[#FFF9F9] dark:bg-[#1A1C24] px-3.5 py-2.5 rounded-xl border border-[#EEDCDC] dark:border-white/10 font-semibold"
                >
                  <CheckCircle2 class="w-4 h-4 text-[#9E0402] dark:text-[#ff4d4d] shrink-0" />
                  <span>{{ del }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 5: Design System & Interactive Craft-->
      <!-- Inspired by Abhaysingh x Appsmith tokens     -->
      <!-- ═══════════════════════════════════════════ -->
      <section id="system" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center shrink-0">
              <Layers class="w-4 h-4" />
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
              Design System & Component Specs
            </h2>
          </div>

          <!-- Tab Switches -->
          <div class="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 shadow-xs">
            <button
              @click="activeDesignTab = 'colors'"
              class="px-3.5 py-1.5 rounded-xl text-xs font-mono-tag font-bold uppercase transition-all"
              :class="activeDesignTab === 'colors' ? 'bg-[#9E0402] text-white shadow-xs' : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402]'"
            >
              Color Tokens
            </button>
            <button
              @click="activeDesignTab = 'typography'"
              class="px-3.5 py-1.5 rounded-xl text-xs font-mono-tag font-bold uppercase transition-all"
              :class="activeDesignTab === 'typography' ? 'bg-[#9E0402] text-white shadow-xs' : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402]'"
            >
              Type Scale
            </button>
            <button
              @click="activeDesignTab = 'components'"
              class="px-3.5 py-1.5 rounded-xl text-xs font-mono-tag font-bold uppercase transition-all"
              :class="activeDesignTab === 'components' ? 'bg-[#9E0402] text-white shadow-xs' : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402]'"
            >
              UI States
            </button>
          </div>
        </div>

        <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 shadow-xs">
          
          <!-- Tab 1: Color Tokens -->
          <div v-if="activeDesignTab === 'colors'" class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 font-bold uppercase">Click to Copy Hex Token</span>
              <span v-if="copiedToken" class="text-xs font-mono-tag text-emerald-500 font-bold flex items-center gap-1">
                <Check class="w-3.5 h-3.5" />
                <span>Copied {{ copiedToken }}</span>
              </span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div 
                @click="copyToken('#9E0402')"
                class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 space-y-3 cursor-pointer hover:scale-103 transition-transform group"
              >
                <div class="w-full h-14 rounded-xl bg-[#9E0402] shadow-sm flex items-end justify-end p-2">
                  <Copy class="w-3.5 h-3.5 text-white/70 group-hover:text-white" />
                </div>
                <div class="space-y-0.5">
                  <span class="text-xs font-bold text-[#1C1313] dark:text-white block">Crimson Primary</span>
                  <span class="text-[11px] font-mono-tag text-[#9E0402] dark:text-[#ff4d4d] font-bold">#9E0402</span>
                </div>
              </div>

              <div 
                @click="copyToken('#9FC2EA')"
                class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 space-y-3 cursor-pointer hover:scale-103 transition-transform group"
              >
                <div class="w-full h-14 rounded-xl bg-[#9FC2EA] shadow-sm flex items-end justify-end p-2">
                  <Copy class="w-3.5 h-3.5 text-[#1E3A60]/70 group-hover:text-[#1E3A60]" />
                </div>
                <div class="space-y-0.5">
                  <span class="text-xs font-bold text-[#1C1313] dark:text-white block">Soft Sky Blue</span>
                  <span class="text-[11px] font-mono-tag text-[#1E3A60] dark:text-[#9FC2EA] font-bold">#9FC2EA</span>
                </div>
              </div>

              <div 
                @click="copyToken('#14161D')"
                class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 space-y-3 cursor-pointer hover:scale-103 transition-transform group"
              >
                <div class="w-full h-14 rounded-xl bg-[#14161D] border border-white/10 shadow-sm flex items-end justify-end p-2">
                  <Copy class="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                </div>
                <div class="space-y-0.5">
                  <span class="text-xs font-bold text-[#1C1313] dark:text-white block">Dark Surface Card</span>
                  <span class="text-[11px] font-mono-tag text-zinc-400 font-bold">#14161D</span>
                </div>
              </div>

              <div 
                @click="copyToken('#FFF9F9')"
                class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 space-y-3 cursor-pointer hover:scale-103 transition-transform group"
              >
                <div class="w-full h-14 rounded-xl bg-[#FFF9F9] border border-[#EEDCDC] shadow-sm flex items-end justify-end p-2">
                  <Copy class="w-3.5 h-3.5 text-[#5C4848]/70 group-hover:text-[#5C4848]" />
                </div>
                <div class="space-y-0.5">
                  <span class="text-xs font-bold text-[#1C1313] dark:text-white block">Light Canvas Soft</span>
                  <span class="text-[11px] font-mono-tag text-[#5C4848] font-bold">#FFF9F9</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 2: Typography Scale -->
          <div v-else-if="activeDesignTab === 'typography'" class="space-y-3">
            <div class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 flex items-baseline justify-between gap-4">
              <span class="text-3xl font-extrabold text-[#1C1313] dark:text-white">Display H1 (Plus Jakarta Sans)</span>
              <span class="text-xs font-mono-tag text-[#9E0402] dark:text-[#ff4d4d] font-bold">72px / Bold</span>
            </div>
            <div class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 flex items-baseline justify-between gap-4">
              <span class="text-xl font-bold text-[#1C1313] dark:text-white">Section Title H2</span>
              <span class="text-xs font-mono-tag text-[#9E0402] dark:text-[#ff4d4d] font-bold">36px / Extrabold</span>
            </div>
            <div class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 flex items-baseline justify-between gap-4">
              <span class="text-sm font-semibold text-[#5C4848] dark:text-zinc-300">Body Editorial Text</span>
              <span class="text-xs font-mono-tag text-[#9E0402] dark:text-[#ff4d4d] font-bold">16px / Regular</span>
            </div>
            <div class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 flex items-baseline justify-between gap-4">
              <span class="text-xs font-mono-tag font-bold text-[#9E0402] dark:text-[#ff4d4d]">TAGS & METRIC LABELS /2026/</span>
              <span class="text-xs font-mono-tag text-[#1E3A60] dark:text-[#9FC2EA] font-bold">Fragment Mono 12px</span>
            </div>
          </div>

          <!-- Tab 3: UI Component States -->
          <div v-else-if="activeDesignTab === 'components'" class="space-y-4">
            <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 font-bold uppercase">Interactive Button Matrix</span>
            <div class="flex flex-wrap gap-4 items-center">
              <button class="px-6 py-3 rounded-full bg-[#9E0402] text-white font-bold text-xs font-mono-tag uppercase shadow-md shadow-[#9E0402]/25 hover:scale-105 transition-transform">
                Primary Action ↗
              </button>
              <button class="px-6 py-3 rounded-full bg-[#9FC2EA] text-[#1E3A60] font-bold text-xs font-mono-tag uppercase border border-[#9FC2EA] hover:scale-105 transition-transform">
                Secondary Pill *
              </button>
              <button class="px-6 py-3 rounded-full bg-white dark:bg-[#1A1C24] text-[#1C1313] dark:text-white border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase hover:border-[#9E0402]/40 transition-colors">
                Outlined Ghost #
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 6: Results & Business Impact        -->
      <!-- Inspired by Abhaysingh metric cards         -->
      <!-- ═══════════════════════════════════════════ -->
      <section v-if="detail?.results" id="impact" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d] flex items-center justify-center shrink-0">
            <TrendingUp class="w-4 h-4" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            Hasil & Dampak Terukur
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            v-for="(res, idx) in detail.results" 
            :key="idx"
            class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-4 flex flex-col justify-between hover:border-[#9E0402]/40 transition-all duration-300 shadow-xs hover:-translate-y-1"
          >
            <span class="text-xs font-bold font-mono-tag text-[#5C4848] dark:text-zinc-400 uppercase tracking-wider block">
              {{ res.metric }}
            </span>

            <!-- Before → After Numbers -->
            <div class="space-y-1">
              <div v-if="res.before !== 'N/A' && res.before !== '0'" class="flex items-center gap-2 text-xs font-mono-tag text-[#5C4848] dark:text-zinc-500 line-through">
                <span>Before: {{ res.before }}</span>
              </div>
              <p class="text-3xl sm:text-4xl font-extrabold text-[#9E0402] dark:text-[#ff4d4d] tracking-tight">
                {{ res.after }}
              </p>
            </div>

            <!-- Change Delta Badge -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono-tag bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] border border-[#9FC2EA]/60 dark:border-[#9FC2EA]/30 w-fit">
              <TrendingUp class="w-3.5 h-3.5 text-[#1E3A60] dark:text-[#9FC2EA]" />
              <span>{{ res.change }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 7: Visual Gallery                   -->
      <!-- ═══════════════════════════════════════════ -->
      <section v-if="detail?.gallery?.length" id="gallery" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center shrink-0">
            <ImageIcon class="w-4 h-4" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            Galeri Proses & Desain
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div 
            v-for="(item, idx) in detail.gallery" 
            :key="idx"
            @click="openLightbox(item)"
            class="group p-3 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 overflow-hidden hover:border-[#9E0402]/40 transition-all duration-300 flex flex-col justify-between shadow-xs cursor-pointer"
          >
            <div class="overflow-hidden rounded-2xl aspect-[4/3] bg-[#FDF6F6] dark:bg-[#1C1E24] relative">
              <img 
                :src="item.image" 
                :alt="item.caption"
                class="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="p-2.5 rounded-full bg-white text-[#9E0402] shadow-lg">
                  <Maximize2 class="w-4 h-4" />
                </span>
              </div>
            </div>
            <p class="text-xs text-[#5C4848] dark:text-zinc-300 text-center mt-3 mb-1 px-2 font-semibold">{{ item.caption }}</p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 8: Key Learnings & Takeaways        -->
      <!-- ═══════════════════════════════════════════ -->
      <section v-if="detail?.learnings?.length" id="learnings" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d] flex items-center justify-center shrink-0">
            <Lightbulb class="w-4 h-4" />
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            Key Learnings & Takeaways
          </h2>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(learning, idx) in detail.learnings" 
            :key="idx"
            class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-start gap-4 shadow-xs"
          >
            <div class="w-8 h-8 rounded-2xl bg-[#9E0402] text-white flex items-center justify-center text-xs font-bold font-mono-tag shrink-0 shadow-xs">
              {{ String(idx + 1).padStart(2, '0') }}
            </div>
            <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed font-medium">{{ learning }}</p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 9: Next & Prev Project Teasers      -->
      <!-- ═══════════════════════════════════════════ -->
      <div data-reveal="fade-up" class="border-t border-[#EEDCDC] dark:border-white/10 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Prev Project -->
        <RouterLink
          v-if="prevProject"
          :to="'/projects/' + prevProject.id"
          class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 hover:border-[#9E0402]/40 transition-all group flex items-center gap-4 shadow-xs"
        >
          <div class="w-10 h-10 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] flex items-center justify-center text-[#1C1313] dark:text-white group-hover:text-white group-hover:bg-[#9E0402] transition-colors shrink-0 shadow-xs">
            <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <div class="min-w-0">
            <span class="text-[10px] font-mono-tag text-[#5C4848] dark:text-zinc-400 block uppercase font-bold tracking-wider">Previous Case Study</span>
            <span class="text-sm font-bold text-[#1C1313] dark:text-white group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d] transition-colors truncate block">
              {{ prevProject.title }}
            </span>
          </div>
        </RouterLink>

        <!-- Next Project -->
        <RouterLink
          v-if="nextProject"
          :to="'/projects/' + nextProject.id"
          class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 hover:border-[#9E0402]/40 transition-all group flex items-center justify-between gap-4 text-right shadow-xs"
        >
          <div class="min-w-0 flex-1">
            <span class="text-[10px] font-mono-tag text-[#5C4848] dark:text-zinc-400 block uppercase font-bold tracking-wider">Next Case Study</span>
            <span class="text-sm font-bold text-[#1C1313] dark:text-white group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d] transition-colors truncate block">
              {{ nextProject.title }}
            </span>
          </div>
          <div class="w-10 h-10 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] flex items-center justify-center text-[#1C1313] dark:text-white group-hover:text-white group-hover:bg-[#9E0402] transition-colors shrink-0 shadow-xs">
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </RouterLink>
      </div>

    </div>

    <!-- 404 Case Study Not Found -->
    <div v-else class="text-center py-20 space-y-4 p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10">
      <Sparkles class="w-10 h-10 text-[#9E0402] dark:text-[#ff4d4d] mx-auto" />
      <h2 class="text-2xl font-bold text-[#1C1313] dark:text-white">Case Study Tidak Ditemukan</h2>
      <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">Kasus dengan ID "{{ route.params.id }}" tidak tersedia di arsip.</p>
      <RouterLink 
        to="/projects"
        class="inline-block px-6 py-3 rounded-full bg-[#9E0402] text-white text-xs font-bold font-mono-tag uppercase hover:bg-[#B80604] transition-colors"
      >
        Kembali ke Semua Case Studies
      </RouterLink>
    </div>

    <!-- Lightbox Zoom Modal -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-if="lightboxImage" 
        @click="closeLightbox"
        class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-10 flex flex-col items-center justify-center"
      >
        <button 
          @click="closeLightbox"
          class="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X class="w-6 h-6" />
        </button>

        <div @click.stop class="max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl bg-black border border-white/20 shadow-2xl space-y-3 p-2">
          <img 
            :src="lightboxImage.image" 
            :alt="lightboxImage.caption" 
            class="max-h-[75vh] w-auto mx-auto object-contain rounded-2xl"
          />
          <p class="text-xs sm:text-sm text-center text-white/80 font-mono-tag font-semibold pb-2">
            {{ lightboxImage.caption }}
          </p>
        </div>
      </div>
    </transition>

  </div>
</template>
