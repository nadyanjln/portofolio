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

const { projects, currentProfile } = usePortfolioStore()
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
const tocSections = computed(() => {
  if (currentProfile.value === 'raqwan') {
    return [
      { id: 'overview', label: '01. Overview' },
      { id: 'problem', label: '02. Challenge' },
      { id: 'process', label: '03. Architecture & Solution' },
      { id: 'impact', label: '04. Impact & Results' },
      { id: 'gallery', label: '05. Artifacts' },
      { id: 'learnings', label: '06. Takeaways' }
    ]
  }
  return [
    { id: 'overview', label: '01. Overview' },
    { id: 'problem', label: '02. Challenge' },
    { id: 'process', label: '03. Process' },
    { id: 'system', label: '04. Design System' },
    { id: 'impact', label: '05. Impact' },
    { id: 'gallery', label: '06. Gallery' },
    { id: 'learnings', label: '07. Takeaways' }
  ]
})

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

const handleScrollSpy = () => {
  const scrollPos = window.scrollY + 200
  for (const s of tocSections.value) {
    const el = document.getElementById(s.id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        activeSection.value = s.id
        break
      }
    }
  }
}

onMounted(() => {
  observeAll(sectionRef.value)
  window.addEventListener('scroll', handleScrollSpy, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollSpy)
})
</script>

<template>
  <div ref="sectionRef" class="pt-24 pb-16 sm:pt-28 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
    
    <div v-if="project" class="space-y-12 sm:space-y-16">
      
      <!-- ═══════════════════════════════════════════ -->
      <!-- TOP NAVIGATION BREADCRUMB & BACK BUTTON     -->
      <!-- ═══════════════════════════════════════════ -->
      <div class="flex items-center justify-between gap-4 border-b border-[#EEDCDC] dark:border-white/10 pb-4">
        <RouterLink 
          :to="'/' + currentProfile + '/projects'"
          class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono-tag transition-colors group uppercase tracking-wider"
          :class="currentProfile === 'raqwan' ? 'text-zinc-400 hover:text-emerald-400' : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402] dark:hover:text-[#ff4d4d]'"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Semua Case Studies</span>
        </RouterLink>

        <!-- Live Prototype Link if available -->
        <a 
          v-if="project.liveUrl" 
          :href="project.liveUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono-tag font-bold uppercase transition-all shadow-xs"
          :class="currentProfile === 'raqwan' ? 'bg-[#047857] hover:bg-[#065F46] text-white shadow-[#047857]/30' : 'bg-[#9E0402] hover:bg-[#B80604] text-white shadow-[#9E0402]/20'"
        >
          <span>Live Prototype ↗</span>
          <ExternalLink class="w-3.5 h-3.5" />
        </a>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- HERO HEADER                                 -->
      <!-- ═══════════════════════════════════════════ -->
      <div data-reveal="fade-up" class="space-y-6">
        <div class="flex flex-wrap items-center gap-2.5">
          <span 
            class="px-3.5 py-1 text-xs font-extrabold font-mono-tag uppercase rounded-full text-white shadow-xs"
            :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#9E0402]'"
          >
            {{ project.category }}
          </span>
          <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">
            Case Study • /2026/
          </span>
        </div>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C1313] dark:text-white tracking-tight leading-tight max-w-4xl">
          {{ project.title }}
        </h1>

        <p class="text-base sm:text-xl text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
          {{ project.description }}
        </p>

        <!-- Project Meta Strip Bento -->
        <div v-if="detail" class="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-4">
          <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1">
            <span class="text-[10px] font-bold font-mono-tag uppercase tracking-wider block" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">Role</span>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white">{{ detail.role }}</p>
          </div>
          <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1">
            <span class="text-[10px] font-bold font-mono-tag uppercase tracking-wider block" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">Timeline</span>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white">{{ detail.duration }}</p>
          </div>
          <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1">
            <span class="text-[10px] font-bold font-mono-tag uppercase tracking-wider block" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">Team</span>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white">
              {{ Array.isArray(detail.team) ? detail.team.join(', ') : detail.team }}
            </p>
          </div>
          <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1">
            <span class="text-[10px] font-bold font-mono-tag uppercase tracking-wider block" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">Deliverables / Tech</span>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white truncate">
              {{ Array.isArray(detail.tools) ? detail.tools.join(', ') : (Array.isArray(detail.deliverables) ? detail.deliverables.join(', ') : (detail.tools || detail.deliverables || 'Production Architecture')) }}
            </p>
          </div>
        </div>

        <!-- Featured Banner Hero Image -->
        <div class="rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#EEDCDC] dark:border-white/10 shadow-2xl relative group cursor-pointer aspect-video sm:aspect-21/9 bg-[#14161D]">
          <img 
            :src="project.image" 
            :alt="project.title" 
            class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            @click="openLightbox(project.image)"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          
          <button 
            @click="openLightbox(project.image)"
            class="absolute bottom-4 right-4 p-3 rounded-2xl bg-black/70 text-white backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2 text-xs font-mono-tag font-bold uppercase shadow-lg"
            :class="currentProfile === 'raqwan' ? 'hover:bg-[#047857]' : 'hover:bg-[#9E0402]'"
          >
            <Maximize2 class="w-4 h-4" />
            <span>Lihat Ukuran Penuh</span>
          </button>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- STICKY TABLE OF CONTENTS SUB-NAV            -->
      <!-- ═══════════════════════════════════════════ -->
      <div class="sticky top-20 z-40 py-2 bg-[#FFF9F9]/90 dark:bg-[#0B0C0E]/90 backdrop-blur-md border-y border-[#EEDCDC] dark:border-white/10 overflow-x-auto custom-scroll flex items-center gap-2">
        <button
          v-for="sec in tocSections"
          :key="sec.id"
          @click="scrollTo(sec.id)"
          class="px-4 py-1.5 rounded-full text-xs font-mono-tag font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer"
          :class="[
            activeSection === sec.id
              ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white shadow-xs' : 'bg-[#9E0402] text-white shadow-xs')
              : 'bg-white dark:bg-[#15161B] text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white border border-[#EEDCDC] dark:border-white/10'
          ]"
        >
          {{ sec.label }}
        </button>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- MAIN CASE STUDY SECTIONS                    -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail" class="space-y-16 sm:space-y-20">
        
        <!-- 01. OVERVIEW & BACKGROUND -->
        <section id="overview" data-reveal="fade-up" class="space-y-5 scroll-mt-28">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl flex items-center justify-center font-mono-tag font-bold text-xs" :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-400' : 'bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d]'">01</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">Project Overview & Background</h2>
          </div>
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            {{ typeof detail.overview === 'string' ? detail.overview : (detail.overview?.description || detail.overview?.summary || '') }}
          </p>

          <div 
            class="p-5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border-l-4 space-y-1.5"
            :class="currentProfile === 'raqwan' ? 'border-[#047857]' : 'border-[#9E0402]'"
          >
            <span class="text-xs font-extrabold font-mono-tag uppercase tracking-wider flex items-center gap-1.5" :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">
              <Sparkles class="w-3.5 h-3.5" />
              <span>Core Strategic Objective:</span>
            </span>
            <p class="text-xs sm:text-sm text-[#1C1313] dark:text-white font-medium">
              Transforming complex technical parameters into scalable, high-throughput architectures without compromising precision and real-time reliability.
            </p>
          </div>
        </section>

        <!-- 02. THE CHALLENGE & PROBLEM STATEMENT -->
        <section id="problem" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl flex items-center justify-center font-mono-tag font-bold text-xs" :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-400' : 'bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d]'">02</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">
              {{ (typeof detail.problem === 'object' && detail.problem?.title) ? detail.problem.title : 'The Core Challenge' }}
            </h2>
          </div>

          <!-- Problem description if string -->
          <p v-if="typeof detail.problem === 'string'" class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            {{ detail.problem }}
          </p>

          <!-- Problem description if object with description field -->
          <p v-else-if="detail.problem && detail.problem.description" class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            {{ detail.problem.description }}
          </p>

          <!-- Problem points grid if object with points array -->
          <div v-if="detail.problem && detail.problem.points && detail.problem.points.length" class="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div 
              v-for="(point, idx) in detail.problem.points" 
              :key="idx"
              class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-start gap-4 shadow-xs transition-all duration-300 hover:-translate-y-0.5"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
            >
              <div class="w-9 h-9 rounded-2xl flex items-center justify-center font-mono-tag font-bold text-sm shrink-0 border" :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/15 text-[#047857] dark:text-emerald-400 border-emerald-200 dark:border-[#047857]/30' : 'bg-[#9E0402]/10 text-[#9E0402] dark:text-[#ff4d4d] border-[#9E0402]/20'">
                0{{ idx + 1 }}
              </div>
              <div class="space-y-1">
                <h4 class="font-bold text-sm text-[#1C1313] dark:text-white">Tantangan 0{{ idx + 1 }}</h4>
                <p class="text-xs text-[#5C4848] dark:text-zinc-300 leading-relaxed">{{ point }}</p>
              </div>
            </div>
          </div>

          <!-- Friction Points Grid (if separate challenges array) -->
          <div v-if="detail.challenges && detail.challenges.length" class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div 
              v-for="(item, idx) in detail.challenges" 
              :key="idx"
              class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-start gap-4 shadow-xs transition-colors"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
            >
              <div class="w-9 h-9 rounded-2xl flex items-center justify-center font-mono-tag font-bold text-sm shrink-0 border" :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/15 text-[#047857] dark:text-emerald-400 border-emerald-200 dark:border-[#047857]/30' : 'bg-[#9E0402]/10 text-[#9E0402] dark:text-[#ff4d4d] border-[#9E0402]/20'">
                !
              </div>
              <div class="space-y-1">
                <h4 class="font-bold text-sm text-[#1C1313] dark:text-white">{{ item.title || `Friction Point 0${idx + 1}` }}</h4>
                <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">{{ item.description || item }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 03. SOLUTION & WORKFLOW PROCESS -->
        <section id="process" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl flex items-center justify-center font-mono-tag font-bold text-xs" :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-400' : 'bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d]'">03</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">Process & Engineering Solution</h2>
          </div>
          <p v-if="typeof detail.solution === 'string'" class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            {{ detail.solution }}
          </p>
          <p v-else-if="detail.solution && detail.solution.description" class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            {{ detail.solution.description }}
          </p>
          <p v-else class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            Penerapan arsitektur komputasi terdistribusi, optimasi query berlatensi rendah, serta integrasi multi-agent reasoning untuk memecahkan hambatan performa sistem secara menyeluruh.
          </p>

          <!-- Phases Grid -->
          <div v-if="detail.process && detail.process.length" class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div
              v-for="(phase, idx) in detail.process"
              :key="idx"
              class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-4 shadow-xs transition-all duration-300"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
            >
              <div class="flex items-center gap-3">
                <div 
                  class="w-10 h-10 rounded-2xl text-white flex items-center justify-center font-mono-tag font-extrabold text-sm shrink-0 shadow-md"
                  :class="currentProfile === 'raqwan' ? 'bg-[#047857] shadow-[#047857]/30' : 'bg-[#9E0402] shadow-[#9E0402]/25'"
                >
                  0{{ idx + 1 }}
                </div>
                <div>
                  <span class="text-[10px] font-mono-tag font-bold uppercase tracking-wider block" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">Phase /0{{ idx + 1 }}/</span>
                  <h4 class="text-base font-bold text-[#1C1313] dark:text-white">{{ phase.phase || phase.title }}</h4>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed">
                {{ phase.description }}
              </p>

              <div v-if="phase.deliverables" class="pt-3 border-t border-[#EEDCDC] dark:border-white/10 space-y-1.5">
                <span class="text-[10px] font-mono-tag uppercase text-[#5C4848] dark:text-zinc-400 font-bold block">Key Outputs:</span>
                <div class="space-y-1">
                  <div 
                    v-for="(d, dIdx) in phase.deliverables" 
                    :key="dIdx"
                    class="flex items-center gap-2 text-xs text-[#1C1313] dark:text-zinc-200"
                  >
                    <CheckCircle2 class="w-4 h-4 shrink-0" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'" />
                    <span>{{ d }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 04. DESIGN SYSTEM & TOKENS (Only for UI/UX & Product Profiles) -->
        <section v-if="currentProfile !== 'raqwan'" id="system" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl flex items-center justify-center font-mono-tag font-bold text-xs bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d]">04</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">Design Tokens & Component Architecture</h2>
            </div>

            <!-- Tab selector -->
            <div class="p-1 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-center gap-1 text-xs font-mono-tag font-bold uppercase">
              <button 
                @click="activeDesignTab = 'colors'" 
                class="px-3.5 py-1.5 rounded-xl cursor-pointer transition-all"
                :class="activeDesignTab === 'colors' ? 'bg-[#9E0402] text-white shadow-xs' : 'text-[#5C4848] dark:text-zinc-400 hover:text-white'"
              >
                Colors
              </button>
              <button 
                @click="activeDesignTab = 'typography'" 
                class="px-3.5 py-1.5 rounded-xl cursor-pointer transition-all"
                :class="activeDesignTab === 'typography' ? 'bg-[#9E0402] text-white shadow-xs' : 'text-[#5C4848] dark:text-zinc-400 hover:text-white'"
              >
                Typography
              </button>
              <button 
                @click="activeDesignTab = 'components'" 
                class="px-3.5 py-1.5 rounded-xl cursor-pointer transition-all"
                :class="activeDesignTab === 'components' ? 'bg-[#9E0402] text-white shadow-xs' : 'text-[#5C4848] dark:text-zinc-400 hover:text-white'"
              >
                Components
              </button>
            </div>
          </div>

          <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 shadow-sm space-y-6">
            <!-- Colors Tab -->
            <div v-if="activeDesignTab === 'colors'" class="space-y-4">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div 
                  @click="copyToken('#9E0402')"
                  class="p-3.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 space-y-2 cursor-pointer hover:scale-102 transition-transform group"
                >
                  <div class="w-full h-14 rounded-xl shadow-sm flex items-end justify-end p-2 bg-[#9E0402]">
                    <Copy class="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <span class="text-[10px] font-mono-tag text-zinc-400 uppercase block">Primary Core</span>
                    <span class="text-[11px] font-mono-tag font-bold text-[#9E0402] dark:text-[#ff4d4d]">#9E0402</span>
                  </div>
                </div>

                <div 
                  @click="copyToken('#9FC2EA')"
                  class="p-3.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 space-y-2 cursor-pointer hover:scale-102 transition-transform group"
                >
                  <div class="w-full h-14 rounded-xl shadow-sm flex items-end justify-end p-2 bg-[#9FC2EA]">
                    <Copy class="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <span class="text-[10px] font-mono-tag text-zinc-400 uppercase block">Secondary Tint</span>
                    <span class="text-[11px] font-mono-tag font-bold text-cyan-400">#9FC2EA</span>
                  </div>
                </div>

                <div 
                  @click="copyToken('#0B0C0E')"
                  class="p-3.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 space-y-2 cursor-pointer hover:scale-102 transition-transform group"
                >
                  <div class="w-full h-14 rounded-xl bg-[#0B0C0E] shadow-sm flex items-end justify-end p-2 border border-white/10">
                    <Copy class="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <span class="text-[10px] font-mono-tag text-zinc-400 uppercase block">Dark Obsidian</span>
                    <span class="text-[11px] font-mono-tag text-zinc-400 font-bold">#0B0C0E</span>
                  </div>
                </div>

                <div 
                  @click="copyToken('#FFF9F9')"
                  class="p-3.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 space-y-2 cursor-pointer hover:scale-102 transition-transform group"
                >
                  <div class="w-full h-14 rounded-xl bg-[#FFF9F9] border border-[#EEDCDC] shadow-sm flex items-end justify-end p-2">
                    <Copy class="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <span class="text-[10px] font-mono-tag text-zinc-400 uppercase block">Light Alabaster</span>
                    <span class="text-[11px] font-mono-tag text-zinc-500 font-bold">#FFF9F9</span>
                  </div>
                </div>
              </div>
              <p v-if="copiedToken" class="text-xs font-mono-tag text-emerald-400 flex items-center gap-1.5">
                <Check class="w-3.5 h-3.5" />
                <span>Copied {{ copiedToken }} to clipboard!</span>
              </p>
            </div>

            <!-- Typography Tab -->
            <div v-if="activeDesignTab === 'typography'" class="space-y-4 font-mono-tag text-xs">
              <div class="p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 flex items-center justify-between">
                <div>
                  <span class="text-zinc-400 block text-[10px]">DISPLAY HERO</span>
                  <span class="text-lg sm:text-2xl font-black text-[#1C1313] dark:text-white font-sans">Syne / Plus Jakarta Sans</span>
                </div>
                <span class="text-xs font-bold text-[#9E0402] dark:text-[#ff4d4d]">72px / Bold</span>
              </div>
            </div>

            <!-- Components Tab -->
            <div v-if="activeDesignTab === 'components'" class="flex flex-wrap items-center gap-3">
              <button 
                class="px-6 py-3 rounded-full text-white font-bold text-xs font-mono-tag uppercase shadow-md hover:scale-105 transition-transform bg-[#9E0402] shadow-[#9E0402]/25"
              >
                Primary Button
              </button>
            </div>
          </div>
        </section>

        <!-- 05. RESULTS & QUANTITATIVE IMPACT -->
        <section id="impact" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl flex items-center justify-center font-mono-tag font-bold text-xs" :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-400' : 'bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d]'">
              {{ currentProfile === 'raqwan' ? '04' : '05' }}
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">Measured Impact & Key Results</h2>
          </div>

          <div v-if="detail.results && detail.results.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="(res, idx) in detail.results"
              :key="idx"
              class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-4 flex flex-col justify-between transition-all duration-300 shadow-xs hover:-translate-y-1"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
            >
              <div class="space-y-1">
                <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 uppercase font-bold">
                  {{ res.metric || res.label }}
                </span>
                <p class="text-3xl sm:text-4xl font-extrabold tracking-tight" :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">
                  {{ res.after || res.value }}
                </p>
              </div>

              <div v-if="res.before" class="pt-3 border-t border-[#EEDCDC] dark:border-white/10 flex items-center justify-between text-xs font-mono-tag">
                <span class="text-zinc-400">Baseline Before:</span>
                <span class="font-bold text-[#5C4848] dark:text-zinc-300">{{ res.before }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 06. GALLERY & SCREENSHOTS -->
        <section id="gallery" data-reveal="fade-up" class="space-y-6 scroll-mt-28" v-if="detail.gallery && detail.gallery.length">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl flex items-center justify-center font-mono-tag font-bold text-xs" :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-400' : 'bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d]'">
              {{ currentProfile === 'raqwan' ? '05' : '06' }}
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">Artifact Gallery & Architecture</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(img, idx) in detail.gallery"
              :key="idx"
              @click="openLightbox(img.url || img)"
              class="group p-3 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs cursor-pointer"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
            >
              <div class="relative overflow-hidden rounded-2xl aspect-video bg-[#0B0C0E]">
                <img 
                  :src="img.url || img" 
                  :alt="img.caption || 'Project visual'"
                  class="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="p-2.5 rounded-full bg-white shadow-lg" :class="currentProfile === 'raqwan' ? 'text-[#047857]' : 'text-[#9E0402]'">
                    <Maximize2 class="w-4 h-4" />
                  </span>
                </div>
              </div>
              <p v-if="img.caption" class="pt-3 px-1 text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">
                {{ img.caption }}
              </p>
            </div>
          </div>
        </section>

        <!-- 07. KEY LEARNINGS & RETROSPECTIVE -->
        <section id="learnings" data-reveal="fade-up" class="space-y-6 scroll-mt-28">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl flex items-center justify-center font-mono-tag font-bold text-xs" :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-400' : 'bg-[#9E0402]/15 text-[#9E0402] dark:text-[#ff4d4d]'">
              {{ currentProfile === 'raqwan' ? '06' : '07' }}
            </span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">Key Learnings & Takeaways</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div 
              v-for="(learning, idx) in (detail.learnings || ['Continuous iteration with cross-functional feedback is essential.', 'Rigorous benchmarking and telemetry prevent regression bugs in production.'])"
              :key="idx"
              class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-start gap-3.5 shadow-xs"
            >
              <div 
                class="w-8 h-8 rounded-2xl text-white flex items-center justify-center text-xs font-bold font-mono-tag shrink-0 shadow-xs"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#9E0402]'"
              >
                0{{ idx + 1 }}
              </div>
              <p class="text-xs sm:text-sm text-[#1C1313] dark:text-zinc-200 leading-relaxed font-medium">
                {{ learning }}
              </p>
            </div>
          </div>
        </section>

      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- BOTTOM PREV / NEXT PROJECT NAVIGATION       -->
      <!-- ═══════════════════════════════════════════ -->
      <div data-reveal="fade-up" class="pt-8 border-t border-[#EEDCDC] dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RouterLink
          v-if="prevProject"
          :to="'/' + currentProfile + '/projects/' + prevProject.id"
          class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 transition-all group flex items-center gap-4 shadow-xs"
          :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
        >
          <div 
            class="w-10 h-10 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] flex items-center justify-center text-[#1C1313] dark:text-white transition-colors shrink-0 shadow-xs"
            :class="currentProfile === 'raqwan' ? 'group-hover:bg-[#047857] group-hover:text-white' : 'group-hover:bg-[#9E0402] group-hover:text-white'"
          >
            <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <div class="space-y-0.5 min-w-0">
            <span class="text-[10px] font-mono-tag text-zinc-400 uppercase tracking-wider block">Previous Project</span>
            <span class="text-sm font-bold text-[#1C1313] dark:text-white transition-colors truncate block" :class="currentProfile === 'raqwan' ? 'group-hover:text-[#047857] dark:group-hover:text-emerald-400' : 'group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'">
              {{ prevProject.title }}
            </span>
          </div>
        </RouterLink>

        <RouterLink
          v-if="nextProject"
          :to="'/' + currentProfile + '/projects/' + nextProject.id"
          class="p-6 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 transition-all group flex items-center justify-between gap-4 text-right shadow-xs"
          :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
        >
          <div class="space-y-0.5 min-w-0 flex-1">
            <span class="text-[10px] font-mono-tag text-zinc-400 uppercase tracking-wider block">Next Project</span>
            <span class="text-sm font-bold text-[#1C1313] dark:text-white transition-colors truncate block" :class="currentProfile === 'raqwan' ? 'group-hover:text-[#047857] dark:group-hover:text-emerald-400' : 'group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'">
              {{ nextProject.title }}
            </span>
          </div>
          <div 
            class="w-10 h-10 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] flex items-center justify-center text-[#1C1313] dark:text-white transition-colors shrink-0 shadow-xs"
            :class="currentProfile === 'raqwan' ? 'group-hover:bg-[#047857] group-hover:text-white' : 'group-hover:bg-[#9E0402] group-hover:text-white'"
          >
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </RouterLink>
      </div>

    </div>

    <!-- Lightbox Modal -->
    <div 
      v-if="lightboxImage" 
      class="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none"
      @click="closeLightbox"
    >
      <button 
        @click="closeLightbox" 
        class="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X class="w-6 h-6" />
      </button>
      <img 
        :src="lightboxImage" 
        alt="Full screen preview" 
        class="max-w-full max-h-[88vh] rounded-2xl object-contain shadow-2xl" 
        @click.stop
      />
    </div>

  </div>
</template>
