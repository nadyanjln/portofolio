<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { 
  ArrowLeft, 
  ArrowRight,
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  UserCircle, 
  Wrench,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  ArrowUpRight,
  X,
  Maximize2,
  Copy,
  Check,
  Share2,
  Terminal,
  Cpu,
  Zap,
  BarChart3,
  ShieldCheck,
  Eye,
  Activity,
  Server,
  ChevronRight,
  ChevronLeft,
  Quote,
  Flame,
  CheckCheck
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

// Lightbox Modal State & Multi-Image Gallery Navigator
const lightboxImage = ref(null)
const lightboxCaption = ref('')
const lightboxIndex = ref(0)

const allGalleryImages = computed(() => {
  const items = []
  if (project.value?.image) {
    items.push({
      url: project.value.image,
      caption: `${project.value.title} — Primary Architecture Overview`
    })
  }
  if (detail.value?.gallery && Array.isArray(detail.value.gallery)) {
    detail.value.gallery.forEach(g => {
      if (typeof g === 'string') {
        items.push({ url: g, caption: 'System Documentation Showcase' })
      } else if (g && g.url) {
        items.push({ url: g.url, caption: g.caption || 'High-Resolution Architecture Artifact' })
      }
    })
  }
  return items
})

const openLightbox = (imgUrl, caption = '', index = 0) => {
  lightboxImage.value = imgUrl
  lightboxCaption.value = caption
  lightboxIndex.value = index
}

const closeLightbox = () => {
  lightboxImage.value = null
  lightboxCaption.value = ''
}

const prevLightboxImage = () => {
  const list = allGalleryImages.value
  if (!list.length) return
  lightboxIndex.value = (lightboxIndex.value - 1 + list.length) % list.length
  lightboxImage.value = list[lightboxIndex.value].url
  lightboxCaption.value = list[lightboxIndex.value].caption
}

const nextLightboxImage = () => {
  const list = allGalleryImages.value
  if (!list.length) return
  lightboxIndex.value = (lightboxIndex.value + 1) % list.length
  lightboxImage.value = list[lightboxIndex.value].url
  lightboxCaption.value = list[lightboxIndex.value].caption
}

const handleKeydown = (e) => {
  if (!lightboxImage.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevLightboxImage()
  if (e.key === 'ArrowRight') nextLightboxImage()
}

// Design System Token Copy State
const copiedToken = ref('')
const copyToken = (text) => {
  navigator.clipboard?.writeText(text)
  copiedToken.value = text
  setTimeout(() => {
    copiedToken.value = ''
  }, 1800)
}

// Share / Copy Link Toast State
const copiedLink = ref(false)
const copyShareLink = () => {
  if (typeof window !== 'undefined') {
    navigator.clipboard?.writeText(window.location.href)
    copiedLink.value = true
    setTimeout(() => {
      copiedLink.value = false
    }, 2000)
  }
}

// Adaptive Typography Sizing for Metrics
const getMetricClass = (val) => {
  const str = String(val || '').trim()
  if (str.length > 14) return 'text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight break-words'
  if (str.length > 7) return 'text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight break-words'
  return 'text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight'
}

// Section Scroll Reveal
const sectionRef = ref(null)
const { observeAll } = useScrollReveal()

onMounted(() => {
  observeAll(sectionRef.value)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="sectionRef" class="pt-24 pb-28 sm:pt-28 sm:pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
    
    <div v-if="project" class="space-y-16 sm:space-y-24">
      
      <!-- ═══════════════════════════════════════════ -->
      <!-- TOP MINIMAL COMMAND BAR                     -->
      <!-- ═══════════════════════════════════════════ -->
      <div class="flex items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
        <!-- Back Navigation -->
        <RouterLink 
          :to="'/' + currentProfile + '/projects'"
          class="inline-flex items-center gap-2 text-xs font-bold font-mono-tag uppercase tracking-wider transition-colors group"
          :class="currentProfile === 'raqwan' ? 'text-zinc-500 hover:text-[#047857] dark:hover:text-emerald-400' : 'text-zinc-500 hover:text-[#FB4617] dark:hover:text-white'"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>Semua Case Studies</span>
        </RouterLink>

        <!-- Right Minimal Actions -->
        <div class="flex items-center gap-3">
          <div class="inline-flex items-center gap-1.5 text-[11px] font-mono-tag text-zinc-400 font-medium">
            <Clock class="w-3.5 h-3.5" />
            <span>5 min read</span>
          </div>

          <span class="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>

          <!-- Share Button -->
          <button 
            @click="copyShareLink"
            class="inline-flex items-center gap-1.5 text-[11px] font-mono-tag font-bold uppercase transition-colors cursor-pointer"
            :class="copiedLink ? 'text-emerald-500' : 'text-zinc-500 hover:text-black dark:hover:text-white'"
          >
            <Check v-if="copiedLink" class="w-3.5 h-3.5 text-emerald-500" />
            <Share2 v-else class="w-3.5 h-3.5" />
            <span>{{ copiedLink ? 'Disalin' : 'Bagikan' }}</span>
          </button>

          <!-- Live Prototype Link -->
          <a
            v-if="project.liveUrl || project.live_url"
            :href="project.liveUrl || project.live_url"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-white text-[11px] font-mono-tag font-bold uppercase shadow-sm transition-all hover:scale-105"
            :class="currentProfile === 'raqwan' ? 'bg-[#047857] hover:bg-[#059669]' : 'bg-[#FB4617] hover:bg-[#E03A0F]'"
          >
            <span>Live Prototype</span>
            <ArrowUpRight class="w-3 h-3" />
          </a>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- GRAND CINEMATIC HERO HEADER                 -->
      <!-- ═══════════════════════════════════════════ -->
      <div data-reveal="fade-up" class="space-y-8 relative">
        
        <!-- Subtle Ambient Backlight Glow -->
        <div 
          class="absolute -top-16 -left-12 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-15 pointer-events-none"
          :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]' : 'bg-[#FB4617]'"
        ></div>

        <!-- Meta Subhead -->
        <div class="flex flex-wrap items-center gap-3 font-mono-tag text-xs uppercase font-bold tracking-widest relative z-10" :class="currentProfile === 'raqwan' ? 'text-emerald-500 dark:text-emerald-400' : 'text-[#FB4617]'">
          <span>CASE STUDY</span>
          <span class="text-zinc-300 dark:text-zinc-700">•</span>
          <span>{{ project.category }}</span>
          <span class="text-zinc-300 dark:text-zinc-700">•</span>
          <span class="text-zinc-400">/{{ project.detail?.duration || '2026' }}/</span>
        </div>

        <!-- Display Title (Clean & Proportional) -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1C1313] dark:text-white tracking-tight leading-[1.1] max-w-5xl relative z-10">
          {{ project.title }}
        </h1>

        <!-- Editorial Lead Paragraph -->
        <p class="text-base sm:text-xl text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl font-normal relative z-10">
          {{ project.description }}
        </p>

        <!-- ─────────────────────────────────────────── -->
        <!-- METADATA HORIZON (CLEAN MINIMALIST STRIP)   -->
        <!-- ─────────────────────────────────────────── -->
        <div v-if="detail" class="pt-6 pb-6 border-y border-black/10 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          <!-- Role -->
          <div class="space-y-1">
            <span class="text-[10px] font-mono-tag uppercase tracking-widest text-zinc-400 block font-bold">
              Peran Utama
            </span>
            <p class="text-sm sm:text-base font-bold text-[#1C1313] dark:text-white leading-snug">
              {{ detail.role }}
            </p>
          </div>

          <!-- Timeline -->
          <div class="space-y-1">
            <span class="text-[10px] font-mono-tag uppercase tracking-widest text-zinc-400 block font-bold">
              Periode
            </span>
            <p class="text-sm sm:text-base font-bold text-[#1C1313] dark:text-white leading-snug">
              {{ detail.duration }}
            </p>
          </div>

          <!-- Core Domain -->
          <div class="space-y-1">
            <span class="text-[10px] font-mono-tag uppercase tracking-widest text-zinc-400 block font-bold">
              Core Discipline
            </span>
            <p class="text-sm sm:text-base font-bold text-[#1C1313] dark:text-white leading-snug">
              {{ detail.technology || project.category }}
            </p>
          </div>

          <!-- Tech Stack -->
          <div class="space-y-1">
            <span class="text-[10px] font-mono-tag uppercase tracking-widest text-zinc-400 block font-bold">
              Deliverables & Tools
            </span>
            <p class="text-sm sm:text-base font-bold text-[#1C1313] dark:text-white leading-snug truncate">
              {{ Array.isArray(detail.tools) ? detail.tools.slice(0, 3).join(', ') : (detail.tools || 'Production Architecture') }}
            </p>
          </div>
        </div>

        <!-- ─────────────────────────────────────────── -->
        <!-- FULL-BLEED HERO VISUAL (NO FAKE WINDOWS!)   -->
        <!-- ─────────────────────────────────────────── -->
        <div 
          class="rounded-3xl sm:rounded-[44px] overflow-hidden shadow-2xl relative group cursor-pointer aspect-video lg:aspect-21/9 bg-[#0B0C0E] border border-black/5 dark:border-white/10 select-none"
          @click="openLightbox(project.image, `${project.title} — Primary Architecture Overview`, 0)"
        >
          <img 
            :src="project.image" 
            :alt="project.title" 
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>

          <!-- Subtle Bottom Right Glass Pill for Enlarge -->
          <div class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-none">
            <div 
              class="pointer-events-auto px-4 py-2 rounded-full bg-black/75 text-white backdrop-blur-md text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all border border-white/15"
              :class="currentProfile === 'raqwan' ? 'group-hover:border-[#00F59B]/50' : 'group-hover:border-[#FB4617]/50'"
            >
              <Maximize2 class="w-3.5 h-3.5" />
              <span>Perbesar Visual</span>
            </div>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- EDITORIAL PULL-QUOTE                        -->
      <!-- ═══════════════════════════════════════════ -->
      <div data-reveal="fade-up" class="py-8 sm:py-12 border-b border-black/10 dark:border-white/10 relative">
        <div class="max-w-4xl space-y-3 sm:space-y-4">
          <Quote class="w-8 h-8 opacity-30" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#FB4617]'" />
          <blockquote class="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1313] dark:text-white leading-[1.3] tracking-tight">
            {{ currentProfile === 'raqwan' 
              ? '“Transforming raw market volatility into actionable sub-12ms intelligence, processing 900+ tickers with zero hallucination.”' 
              : '“Bridging complex cold-chain IoT telemetry and user empathy to eliminate spoilage across inter-island food distribution.”' }}
          </blockquote>
          <p class="text-xs font-mono-tag font-bold uppercase tracking-widest text-zinc-400 pt-1">
            — Core Thesis & Value Proposition / {{ project.title }}
          </p>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- PROLOGUE / BACKGROUND & PROJECT CONTEXT     -->
      <!-- ═══════════════════════════════════════════ -->
      <section data-reveal="fade-up" class="space-y-8">
        <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <span class="text-xs font-mono-tag font-extrabold uppercase tracking-widest" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">
            PROLOG — LATAR BELAKANG & VISI UTAMA
          </span>
          <span class="text-xs font-mono-tag text-zinc-400 uppercase">Project Genesis & Narrative</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div class="lg:col-span-8 space-y-5">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1313] dark:text-white tracking-tight leading-snug">
              Latar Belakang & Konteks Inisiasi Proyek
            </h2>
            <p class="text-base sm:text-lg text-[#5C4848] dark:text-zinc-300 leading-relaxed">
              {{ typeof detail.overview === 'string' ? detail.overview : (detail.overview?.description || detail.overview?.summary || '') }}
            </p>
            <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-400 leading-relaxed">
              {{ currentProfile === 'raqwan'
                ? 'Dalam ekosistem komputasi kecerdasan buatan enterprise modern, kesenjangan antara model riset teoritis dan sistem produksi berlatensi rendah sering kali menjadi hambatan utama. Proyek ini diinisiasi untuk menjembatani jurang tersebut—memadukan formulasi matematis ketat dengan rekayasa infrastruktur terdistribusi agar performa tetap optimal di bawah beban transaksi pasar modal yang fluktuatif.'
                : 'Di era transformasi digital yang serba cepat, keberhasilan produk teknologi tidak hanya dinilai dari kecanggihan fitur, melainkan sejauh mana antarmuka mampu menuntun pengguna menyelesaikan tujuannya tanpa friksi. Proyek ini lahir dari riset mendalam terhadap perilaku pengguna dan kebutuhan bisnis, menghasilkan solusi berbasis desain sistem yang terukur dan skalabel.' }}
            </p>
          </div>

          <div class="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-black/5 dark:bg-white/5 space-y-5 border border-black/5 dark:border-white/10">
            <span class="text-xs font-mono-tag font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
              Pilar Inisiatif Proyek
            </span>
            <div class="space-y-4 text-xs font-mono-tag">
              <div class="space-y-1">
                <span class="text-zinc-400 block font-semibold uppercase text-[10px]">Tujuan Inti (Core Purpose)</span>
                <p class="text-xs font-bold text-[#1C1313] dark:text-white">
                  {{ currentProfile === 'raqwan' ? 'High-throughput, Zero-hallucination Engine' : 'Intuitive User Journey & Frictionless System' }}
                </p>
              </div>
              <div class="space-y-1">
                <span class="text-zinc-400 block font-semibold uppercase text-[10px]">Pendekatan Rekayasa</span>
                <p class="text-xs font-bold text-[#1C1313] dark:text-white">
                  {{ currentProfile === 'raqwan' ? 'Distributed Ray Cluster & Sub-12ms Memory Cache' : 'Design Tokens Governance & User-Centered Research' }}
                </p>
              </div>
              <div class="space-y-1">
                <span class="text-zinc-400 block font-semibold uppercase text-[10px]">Standar Kualitas</span>
                <p class="text-xs font-bold text-emerald-500 dark:text-emerald-400">
                  {{ currentProfile === 'raqwan' ? 'Production SLA 99.9% Verified' : 'WCAG AAA & Maze Usability Verified' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- 01. THE CORE CHALLENGES                     -->
      <!-- ═══════════════════════════════════════════ -->
      <section data-reveal="fade-up" class="space-y-8">
        <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <span class="text-xs font-mono-tag font-extrabold uppercase tracking-widest" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">
            01 — THE CORE CHALLENGES
          </span>
          <span class="text-xs font-mono-tag text-zinc-400 uppercase">Problem Diagnostics</span>
        </div>

        <div class="space-y-3">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            {{ (typeof detail.problem === 'object' && detail.problem?.title) ? detail.problem.title : 'The Core Challenge' }}
          </h2>
          <p v-if="detail.problem && detail.problem.description" class="text-base sm:text-lg text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            {{ detail.problem.description }}
          </p>
        </div>

        <!-- 3-Column Editorial Problem Breakdown (No Boxy Dashboard Cards!) -->
        <div v-if="detail.problem && detail.problem.points && detail.problem.points.length" class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div 
            v-for="(point, idx) in detail.problem.points" 
            :key="idx"
            class="space-y-3 pt-4 border-t border-black/10 dark:border-white/10"
          >
            <div class="text-3xl sm:text-4xl font-black font-mono-tag text-zinc-300 dark:text-zinc-700">
              0{{ idx + 1 }}
            </div>
            <h4 class="text-lg font-bold text-[#1C1313] dark:text-white">
              Tantangan Kritis 0{{ idx + 1 }}
            </h4>
            <p class="text-sm text-[#5C4848] dark:text-zinc-400 leading-relaxed">
              {{ point }}
            </p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- 02. ARCHITECTURAL BLUEPRINT & SOLUTION      -->
      <!-- ═══════════════════════════════════════════ -->
      <section data-reveal="fade-up" class="space-y-10">
        <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <span class="text-xs font-mono-tag font-extrabold uppercase tracking-widest" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">
            02 — ARCHITECTURAL BLUEPRINT & SOLUTION
          </span>
          <span class="text-xs font-mono-tag text-zinc-400 uppercase">{{ currentProfile === 'raqwan' ? 'Distributed Systems' : 'Design & Product Strategy' }}</span>
        </div>

        <div class="space-y-3">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            {{ currentProfile === 'raqwan' ? 'Distributed AI Pipeline & Sub-Millisecond Architecture' : 'Product Strategy, UX Tokens & Interaction Architecture' }}
          </h2>
          <p class="text-base sm:text-lg text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            {{ currentProfile === 'raqwan'
              ? 'Arsitektur sistem dibangun di atas fondasi komputasi terdistribusi dengan pemisahan concern yang ketat antara screening engine real-time, orkestrasi agent reasoning, dan streaming telemetry ke client.'
              : 'Strategi perancangan berbasis data yang mengintegrasikan product discovery, sintesis arsitektur informasi, visual design tokens yang konsisten, dan validasi usability testing untuk meminimalkan friksi pengguna.' }}
          </p>
        </div>

        <!-- 4-Stage Architectural Flow (Editorial Clean Lines) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-3xl bg-black/5 dark:bg-white/5 space-y-3">
            <span class="text-xs font-mono-tag font-extrabold" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">FASE 01</span>
            <h4 class="text-base font-bold text-[#1C1313] dark:text-white">
              {{ currentProfile === 'raqwan' ? 'Mathematical Modeling' : 'Discovery & Research' }}
            </h4>
            <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">
              {{ currentProfile === 'raqwan' ? 'Formulasi matematis loss function, benchmark latensi I/O, dan skema indexing data kuantitatif.' : 'Riset pengguna, empathy mapping, persona development, dan perumusan PRD komprehensif.' }}
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-black/5 dark:bg-white/5 space-y-3">
            <span class="text-xs font-mono-tag font-extrabold" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">FASE 02</span>
            <h4 class="text-base font-bold text-[#1C1313] dark:text-white">
              {{ currentProfile === 'raqwan' ? 'Model Training & Ray' : 'UX Architecture & Flows' }}
            </h4>
            <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">
              {{ currentProfile === 'raqwan' ? 'Orkestrasi klaster Ray terdistribusi, kuantisasi FP16/INT8 TensorRT, dan verifikasi zero-hallucination.' : 'Perancangan wireframe low-fidelity, alur navigasi bebas hambatan, dan hierarki informasi.' }}
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-black/5 dark:bg-white/5 space-y-3">
            <span class="text-xs font-mono-tag font-extrabold" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">FASE 03</span>
            <h4 class="text-base font-bold text-[#1C1313] dark:text-white">
              {{ currentProfile === 'raqwan' ? 'Low-Latency Engine' : 'Design Tokens & UI System' }}
            </h4>
            <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">
              {{ currentProfile === 'raqwan' ? 'Microservice FastAPI, streaming WebSocket sub-milidetik, dan caching layer in-memory.' : 'Penyusunan token warna, tipografi, komponen interaktif, dan standar aksesibilitas WCAG AAA.' }}
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-black/5 dark:bg-white/5 space-y-3">
            <span class="text-xs font-mono-tag font-extrabold" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">FASE 04</span>
            <h4 class="text-base font-bold text-[#1C1313] dark:text-white">
              {{ currentProfile === 'raqwan' ? 'Telemetry & SLA Audit' : 'Testing & Handoff' }}
            </h4>
            <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">
              {{ currentProfile === 'raqwan' ? 'Stress-testing beban konkurensi tinggi, auto-drift retraining, dan SLA 99.9% uptime.' : 'Pengujian kegunaan Maze SUS skor tinggi, dokumentasi spek teknis, dan developer handoff.' }}
            </p>
          </div>
        </div>

        <!-- Raqwan Telemetry Console -->
        <div v-if="currentProfile === 'raqwan'" class="p-6 sm:p-8 rounded-3xl bg-[#0C0E14] text-white border border-white/10 shadow-2xl space-y-6">
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <div class="flex items-center gap-2 text-xs font-mono-tag">
              <Terminal class="w-4 h-4 text-emerald-400" />
              <span class="font-bold uppercase tracking-wider text-zinc-300">Live Production Telemetry & System SLA</span>
            </div>
            <span class="text-[10px] font-mono-tag uppercase text-emerald-400 font-bold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online • Cluster Active</span>
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono-tag">
            <div class="space-y-1">
              <span class="text-[10px] text-zinc-500 uppercase block font-bold">Latency</span>
              <p class="text-2xl sm:text-3xl font-black text-emerald-400">12 ms</p>
              <span class="text-[10px] text-zinc-400">Sub-millisecond peak</span>
            </div>
            <div class="space-y-1">
              <span class="text-[10px] text-zinc-500 uppercase block font-bold">Concurrency</span>
              <p class="text-2xl sm:text-3xl font-black text-cyan-400">5,000+</p>
              <span class="text-[10px] text-zinc-400">Live WebSockets</span>
            </div>
            <div class="space-y-1">
              <span class="text-[10px] text-zinc-500 uppercase block font-bold">Accuracy</span>
              <p class="text-2xl sm:text-3xl font-black text-emerald-400">95.8%</p>
              <span class="text-[10px] text-zinc-400">Zero-hallucination</span>
            </div>
            <div class="space-y-1">
              <span class="text-[10px] text-zinc-500 uppercase block font-bold">Uptime SLA</span>
              <p class="text-2xl sm:text-3xl font-black text-white">99.9%</p>
              <span class="text-[10px] text-zinc-400">High availability</span>
            </div>
          </div>
        </div>

        <!-- Nadya Design Tokens Studio -->
        <div v-if="currentProfile !== 'raqwan'" class="p-6 sm:p-8 rounded-3xl bg-black/5 dark:bg-white/5 space-y-6">
          <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <span class="text-xs font-mono-tag font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Core Design Tokens Palette
            </span>
            <span v-if="copiedToken" class="text-xs font-mono-tag text-emerald-500 font-bold flex items-center gap-1">
              <Check class="w-3.5 h-3.5" />
              <span>{{ copiedToken }} disalin!</span>
            </span>
            <span v-else class="text-[11px] font-mono-tag text-zinc-400">Klik warna untuk menyalin HEX</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div 
              @click="copyToken('#FB4617')"
              class="p-3 rounded-2xl bg-white dark:bg-[#14161D] space-y-2 cursor-pointer hover:scale-102 transition-transform shadow-xs"
            >
              <div class="w-full h-14 rounded-xl bg-[#FB4617]"></div>
              <span class="text-[11px] font-mono-tag font-bold text-[#FB4617] block">#FB4617</span>
            </div>

            <div 
              @click="copyToken('#FF6B4A')"
              class="p-3 rounded-2xl bg-white dark:bg-[#14161D] space-y-2 cursor-pointer hover:scale-102 transition-transform shadow-xs"
            >
              <div class="w-full h-14 rounded-xl bg-[#FF6B4A]"></div>
              <span class="text-[11px] font-mono-tag font-bold text-[#FF6B4A] block">#FF6B4A</span>
            </div>

            <div 
              @click="copyToken('#9FC2EA')"
              class="p-3 rounded-2xl bg-white dark:bg-[#14161D] space-y-2 cursor-pointer hover:scale-102 transition-transform shadow-xs"
            >
              <div class="w-full h-14 rounded-xl bg-[#9FC2EA]"></div>
              <span class="text-[11px] font-mono-tag font-bold text-sky-500 block">#9FC2EA</span>
            </div>

            <div 
              @click="copyToken('#0B0C0E')"
              class="p-3 rounded-2xl bg-white dark:bg-[#14161D] space-y-2 cursor-pointer hover:scale-102 transition-transform shadow-xs"
            >
              <div class="w-full h-14 rounded-xl bg-[#0B0C0E]"></div>
              <span class="text-[11px] font-mono-tag font-bold text-zinc-400 block">#0B0C0E</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- 03. VISUAL ARTIFACTS & FULL-BLEED GALLERY   -->
      <!-- ═══════════════════════════════════════════ -->
      <section data-reveal="fade-up" class="space-y-10">
        <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <span class="text-xs font-mono-tag font-extrabold uppercase tracking-widest" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">
            03 — VISUAL ARTIFACTS & BLUEPRINT GALLERY
          </span>
          <span class="text-xs font-mono-tag text-zinc-400 uppercase">{{ allGalleryImages.length }} Visual Assets</span>
        </div>

        <div class="space-y-3">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            {{ currentProfile === 'raqwan' ? 'System Architecture & Interface Blueprint Gallery' : 'High-Fidelity Interface & Artifacts Gallery' }}
          </h2>
          <p class="text-base sm:text-lg text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            Tangkapan visual resolusi tinggi dari skema arsitektur dan antarmuka operasional. Klik gambar manapun untuk melihat ukuran penuh.
          </p>
        </div>

        <!-- Expansive Gallery Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(item, gIdx) in allGalleryImages" 
            :key="gIdx"
            @click="openLightbox(item.url, item.caption, gIdx)"
            class="space-y-3 cursor-pointer group select-none"
          >
            <div class="aspect-video w-full rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#0B0C0E] shadow-xl relative border border-black/5 dark:border-white/10">
              <img 
                :src="item.url" 
                :alt="item.caption" 
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                <span class="px-3 py-1.5 rounded-full bg-black/80 text-white backdrop-blur-md text-[11px] font-mono-tag flex items-center gap-1.5 shadow-lg border border-white/10">
                  <Maximize2 class="w-3 h-3" />
                  <span>Zoom</span>
                </span>
              </div>
            </div>
            <p class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-white leading-snug px-1">
              {{ item.caption }}
            </p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- 04. MEASURED PRODUCTION IMPACT              -->
      <!-- ═══════════════════════════════════════════ -->
      <section data-reveal="fade-up" class="space-y-10">
        <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <span class="text-xs font-mono-tag font-extrabold uppercase tracking-widest" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">
            04 — MEASURED PRODUCTION IMPACT
          </span>
          <span class="text-xs font-mono-tag text-zinc-400 uppercase">Verified Telemetry</span>
        </div>

        <div class="space-y-3">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            Key Results & Production Benchmarks
          </h2>
          <p class="text-base sm:text-lg text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            Hasil kuantitatif nyata yang diverifikasi langsung pada lingkungan produksi tanpa spekulasi.
          </p>
        </div>

        <!-- Proportional Adaptive Typography Numbers -->
        <div v-if="detail.results && detail.results.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-2">
          <div 
            v-for="(res, idx) in detail.results" 
            :key="idx"
            class="space-y-2 pt-4 border-t border-black/10 dark:border-white/10"
          >
            <span class="text-xs font-mono-tag font-bold uppercase tracking-wider text-zinc-400 block truncate">
              {{ res.metric || res.label }}
            </span>
            <p :class="[getMetricClass(res.after || res.value), currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#FB4617]']">
              {{ res.after || res.value }}
            </p>
            <div v-if="res.change" class="text-xs font-mono-tag font-bold text-emerald-500 pt-1">
              ↑ {{ res.change }}
            </div>
            <div v-if="res.before" class="text-xs font-mono-tag text-zinc-400">
              Baseline: {{ res.before }}
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- 05. KEY LEARNINGS & RETROSPECTIVE           -->
      <!-- ═══════════════════════════════════════════ -->
      <section data-reveal="fade-up" class="space-y-8">
        <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <span class="text-xs font-mono-tag font-extrabold uppercase tracking-widest" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'">
            05 — KEY LEARNINGS & RETROSPECTIVE
          </span>
          <span class="text-xs font-mono-tag text-zinc-400 uppercase">Post-Delivery Insights</span>
        </div>

        <div class="space-y-3">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            Retrospective Insights & Key Takeaways
          </h2>
          <p class="text-base sm:text-lg text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-4xl">
            Refleksi strategis dan pembelajaran mendalam pasca-implementasi sistem pada skala produksi.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div 
            v-for="(learning, idx) in (detail.learnings || [
              currentProfile === 'raqwan' 
                ? 'Kombinasi profiling latensi hardware dan validasi self-reflective reasoning menghindarkan arsitektur dari bottleneck tak terduga saat volume transaksi melonjak.' 
                : 'Iterasi feedback lintas fungsi secara teratur antara engineering dan stakeholder menjamin bahwa solusi UX tidak hanya estetis namun juga feasible secara teknis.',
              currentProfile === 'raqwan'
                ? 'Implementasi automated drift detection dan distributed pipeline orchestration (Ray) memastikan stabilitas SLA tanpa downtime regresi.'
                : 'Desain sistem berbasis token modular memangkas siklus delivery sprint hingga 40% dan mengeliminasi inkonsistensi antarmuka.'
            ])"
            :key="idx"
            class="space-y-2 pt-4 border-t border-black/10 dark:border-white/10"
          >
            <span class="text-xs font-mono-tag font-bold text-zinc-400 uppercase block">Insight 0{{ idx + 1 }}</span>
            <p class="text-sm sm:text-base text-[#1C1313] dark:text-zinc-200 leading-relaxed font-medium">
              {{ learning }}
            </p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════ -->
      <!-- FULL-BLEED NEXT PROJECT NAVIGATOR           -->
      <!-- ═══════════════════════════════════════════ -->
      <div data-reveal="fade-up" class="pt-12 border-t border-black/10 dark:border-white/10">
        <RouterLink
          v-if="nextProject"
          :to="'/' + currentProfile + '/projects/' + nextProject.id"
          class="block p-8 sm:p-14 rounded-3xl sm:rounded-[44px] bg-[#0C0E14] text-white relative overflow-hidden group shadow-2xl transition-all duration-500 select-none border border-white/10"
        >
          <!-- Background Ambient Glow & Project Thumbnail with Blur -->
          <div class="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
            <img 
              :src="nextProject.image" 
              :alt="nextProject.title"
              class="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000 blur-sm"
            />
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#0C0E14] via-[#0C0E14]/80 to-transparent"></div>

          <div class="relative z-10 space-y-3 max-w-3xl">
            <div class="flex items-center gap-2 text-xs font-mono-tag font-bold uppercase tracking-widest" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#FB4617]'">
              <span>Studi Kasus Berikutnya</span>
              <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform" />
            </div>

            <h3 class="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight group-hover:underline">
              {{ nextProject.title }}
            </h3>

            <p class="text-xs sm:text-sm text-zinc-400 line-clamp-2 max-w-2xl">
              {{ nextProject.description }}
            </p>
          </div>
        </RouterLink>
      </div>

    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- FULLSCREEN LIGHTBOX MODAL                   -->
    <!-- ═══════════════════════════════════════════ -->
    <div 
      v-if="lightboxImage" 
      class="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 select-none"
      @click="closeLightbox"
    >
      <!-- Top Action Bar -->
      <div class="w-full max-w-6xl flex items-center justify-between gap-4 text-white z-10" @click.stop>
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 rounded-full bg-white/10 text-xs font-mono-tag font-bold">
            {{ lightboxIndex + 1 }} / {{ allGalleryImages.length }}
          </span>
          <p class="text-xs sm:text-sm font-medium text-zinc-300 truncate max-w-lg hidden sm:block">
            {{ lightboxCaption }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button 
            @click="prevLightboxImage"
            class="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            title="Foto Sebelumnya (Arrow Left)"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button 
            @click="nextLightboxImage"
            class="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
            title="Foto Selanjutnya (Arrow Right)"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
          <button 
            @click="closeLightbox" 
            class="p-2.5 rounded-full bg-white/15 hover:bg-red-500/80 transition-colors text-white ml-2 cursor-pointer"
            title="Tutup (Esc)"
          >
            <X class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Center Image Preview -->
      <div class="flex-1 flex items-center justify-center p-2 sm:p-4 w-full max-w-6xl relative" @click.stop>
        <img 
          :src="lightboxImage" 
          :alt="lightboxCaption" 
          class="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl transition-all duration-300" 
        />
      </div>

      <!-- Bottom Caption Bar on Mobile -->
      <div class="w-full max-w-4xl text-center py-2 text-xs font-mono-tag text-zinc-400 block sm:hidden" @click.stop>
        {{ lightboxCaption }}
      </div>
    </div>

  </div>
</template>
