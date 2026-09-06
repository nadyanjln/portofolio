<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight, ArrowRight, CheckCircle2, Cpu, Eye, Sparkles, Layers, ShieldCheck, Activity, Terminal } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const { currentProfile } = usePortfolioStore()

// 4 Executive Client Service Offerings (WHAT I DO / SERVICES FOR HIRE)
const nadyaCards = computed(() => [
  {
    code: '01',
    domain: 'Web Design & Kinetic Experience',
    title: 'Flagship Web Design & Interactive Systems',
    summary: 'Perancangan website brand & landing page premium berkonversi tinggi dengan tipografi modern, layout bento asimetris, dan mikro-interaksi 60fps berstandar Awwwards.',
    metrics: [
      { label: 'Avg Conversion', val: '+140%' },
      { label: 'Render Frame', val: '60 FPS' },
      { label: 'Display Spec', val: 'Adaptive 4K' }
    ],
    techStack: ['Interactive Web', 'Aesthetic Direction', 'Figma', 'Bento Architecture'],
    ctaText: 'Konsultasikan Desain',
    link: `/${currentProfile.value}/contact`
  },
  {
    code: '02',
    domain: 'Product UX & System Architecture',
    title: 'Enterprise SaaS & Digital Product UX',
    summary: 'Arsitektur antarmuka dan alur pengguna untuk platform multi-tenant, dashboard analitik, dan FinTech dengan navigasi tanpa friksi serta benchmark kegunaan mendalam.',
    metrics: [
      { label: 'Maze SUS Score', val: '94 / 100' },
      { label: 'Task Completion', val: '98.5%' },
      { label: 'Usability Depth', val: '40+ Sesi' }
    ],
    techStack: ['UX Architecture', 'User Journey', 'Maze Testing', 'Interactive Prototype'],
    ctaText: 'Diskusi Kebutuhan UX',
    link: `/${currentProfile.value}/contact`
  },
  {
    code: '03',
    domain: 'Design Systems & Token Architecture',
    title: 'Scalable Design Systems & Token Governance',
    summary: 'Pembangunan fondasi token variabel multi-tema (dark/light) yang tersinkronisasi langsung dengan repository engineer untuk mencegah UI drift dan menjamin aksesibilitas WCAG.',
    metrics: [
      { label: 'Token Variables', val: '450+ Tokens' },
      { label: 'Accessibility', val: 'WCAG AAA' },
      { label: 'Dev Sync Rate', val: 'Zero-Drift' }
    ],
    techStack: ['Design Tokens', 'Figma Variables', 'Atomic UI', 'Design Ops'],
    ctaText: 'Bangun Design System',
    link: `/${currentProfile.value}/contact`
  },
  {
    code: '04',
    domain: 'Product Management & Strategy',
    title: 'Product Discovery & Agile PRD Formulations',
    summary: 'Formulasi dokumen kebutuhan produk (PRD) yang tajam, riset peluang pasar, prioritization matrix (RICE/MoSCoW), dan penyelarasan sprint engineering 2-mingguan.',
    metrics: [
      { label: 'PRD Clarity', val: '100% Align' },
      { label: 'Sprint Cadence', val: '2-Week Cycle' },
      { label: 'Experimentation', val: 'Rapid A/B' }
    ],
    techStack: ['PRD Formulations', 'RICE Matrix', 'Agile Roadmapping', 'User Interview'],
    ctaText: 'Jadwalkan Konsultasi PRD',
    link: `/${currentProfile.value}/contact`
  }
])

const raqwanCards = computed(() => [
  {
    code: '01',
    domain: 'Computer Vision & Edge Intelligence',
    title: 'Real-Time Vision & Edge Detection Systems',
    summary: 'Pembangunan sistem deteksi objek dan tracking multi-kamera real-time dengan akselerasi CUDA, TensorRT FP16/INT8, serta inferensi efisien pada hardware edge & cloud.',
    metrics: [
      { label: 'Inference Speed', val: '< 14.2ms' },
      { label: 'Throughput', val: '60 FPS FP16' },
      { label: 'Detection mAP', val: '99.2%' }
    ],
    techStack: ['YOLOv8', 'TensorRT', 'PyTorch CUDA', 'Spatial Tracking'],
    ctaText: 'Konsultasikan Vision AI',
    link: `/${currentProfile.value}/contact`
  },
  {
    code: '02',
    domain: 'Agentic AI & Knowledge Engineering',
    title: 'Autonomous Multi-Agent DAG & GraphRAG',
    summary: 'Orkestrasi multi-agent otonom berbasis LangGraph yang terintegrasi ke enterprise knowledge graph (FalkorDB) dengan loop validasi self-reflective untuk menekan halusinasi hingga nol.',
    metrics: [
      { label: 'Knowledge Graph', val: 'FalkorDB RAG' },
      { label: 'Tool Reliability', val: '100% Verified' },
      { label: 'Hallucination', val: '< 0.1%' }
    ],
    techStack: ['LangGraph DAG', 'GraphRAG', 'Vector Search', 'Tool Execution'],
    ctaText: 'Eksplor Solusi Agentic',
    link: `/${currentProfile.value}/contact`
  },
  {
    code: '03',
    domain: 'MLOps & Distributed Infrastructure',
    title: 'Distributed MLOps & Real-Time Streaming',
    summary: 'Infrastruktur serving model terdistribusi multi-GPU menggunakan Ray Cluster & Triton Server, didukung streaming WebSocket latensi rendah dan auto-retraining pipeline saat data drift.',
    metrics: [
      { label: 'Cluster Engine', val: 'Ray Distributed' },
      { label: 'WebSocket Stream', val: '< 2ms Ping' },
      { label: 'Data Drift Ops', val: 'Auto-Retrain' }
    ],
    techStack: ['Ray Cluster', 'Triton Server', 'Docker GPU', 'FastAPI Async'],
    ctaText: 'Optimasi Cluster GPU',
    link: `/${currentProfile.value}/contact`
  },
  {
    code: '04',
    domain: 'Algorithm Scoping & Mathematical Review',
    title: 'Deep Learning Architecture & SLA Audit',
    summary: 'Audit teknis kelayakan AI, formulasi loss function kustom, pemodelan matriks latensi hardware, dan jaminan SLA performa sebelum masuk ke fase implementasi penuh.',
    metrics: [
      { label: 'Loss Dynamics', val: 'Custom Math' },
      { label: 'Hardware Scoping', val: 'INT8 Profiling' },
      { label: 'Uptime SLA', val: '99.9% Reliable' }
    ],
    techStack: ['Mathematical Model', 'Loss Engineering', 'Hardware Profiling', 'SLA Matrix'],
    ctaText: 'Jadwalkan Audit Teknis',
    link: `/${currentProfile.value}/contact`
  }
])

const activeCards = computed(() => {
  return currentProfile.value === 'raqwan' ? raqwanCards.value : nadyaCards.value
})

// Desktop Pin-and-Scroll Engine
const containerRef = ref(null)
const trackRef = ref(null)
const scrollProgress = ref(0)
const currentTranslateX = ref(0)
let rafId = null

const handleScroll = () => {
  if (!containerRef.value || !trackRef.value) return
  
  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      // Only execute pin-and-scroll calculation on desktop (>= 1024px)
      if (window.innerWidth >= 1024) {
        const rect = containerRef.value.getBoundingClientRect()
        const containerHeight = containerRef.value.offsetHeight
        const viewportHeight = window.innerHeight
        const totalScrollable = containerHeight - viewportHeight

        if (totalScrollable > 0) {
          const scrolled = -rect.top
          const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1)
          scrollProgress.value = progress

          const trackWidth = trackRef.value.scrollWidth
          const viewportWidth = window.innerWidth
          const maxTranslate = Math.max(trackWidth - viewportWidth + 80, 0)
          currentTranslateX.value = -(progress * maxTranslate)
        }
      }
      rafId = null
    })
  }
}

// Interactive step jumper
const scrollToStep = (index) => {
  if (window.innerWidth >= 1024 && containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const containerTop = rect.top + scrollTop
    const containerHeight = containerRef.value.offsetHeight
    const viewportHeight = window.innerHeight
    const totalScrollable = containerHeight - viewportHeight

    const targetProgress = index / (activeCards.value.length - 1)
    const targetScroll = containerTop + (targetProgress * totalScrollable)

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  } else {
    // Mobile / Tablet: Smooth scroll to the specific card element
    const el = document.getElementById(`mobile-card-${index}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <!-- ════════════════════════════════════════════════════════════
       SERVICES & CORE CAPABILITIES STREAM (Benjamin Creative Style)
       - Desktop (>= 1024px): Pinned 280vh scroll -> translates horizontally
       - Mobile & Tablet (< 1024px): Fluid Horizontal Touch Carousel (No scroll trap)
       ════════════════════════════════════════════════════════════ -->
  <section 
    ref="containerRef" 
    class="relative lg:min-h-[280vh] scroll-mt-24 py-12 lg:py-0" 
    id="skills"
  >
    <!-- VIEWPORT CONTAINER: Pinned on Desktop, Natural on Mobile/Tablet -->
    <div class="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 select-none z-10">
      
      <!-- ──────────────────────────────────────────────────────────
           1. SECTION HEADER & NAVIGATION CONTROLS
           ────────────────────────────────────────────────────────── -->
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
        
        <!-- Left: Category Index & Domain Definition -->
        <div class="space-y-1">
          <div class="flex items-center gap-3">
            <span 
              class="px-3 py-1 rounded-full text-xs font-mono-tag font-bold tracking-wider uppercase border"
              :class="currentProfile === 'raqwan'
                ? 'bg-emerald-500/10 text-[#047857] dark:text-[#00F59B] border-emerald-500/25'
                : 'bg-[#FB4617]/10 text-[#FB4617] dark:text-[#FB4617] border-[#FB4617]/25'"
            >
              (02) / CLIENT SERVICES & SOLUTIONS
            </span>
            <span class="text-xs font-mono-tag text-zinc-500 dark:text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
              {{ currentProfile === 'raqwan' ? '• 4 Enterprise AI Solutions' : '• 4 Core Design Disciplines' }}
            </span>
          </div>
          <p class="text-xs text-[#5C4848] dark:text-zinc-400 hidden lg:block">
            {{ currentProfile === 'raqwan' 
              ? 'Layanan rekayasa AI spesialis: Computer Vision edge, Multi-Agent DAG, hingga infrastruktur cluster terdistribusi.' 
              : 'Layanan desain produk digital: Web brand flagship, arsitektur UX SaaS, hingga standarisasi design system.' }}
          </p>
        </div>

        <!-- Right: Progress Indicator & Direct Jump Controls -->
        <div class="flex items-center gap-3 self-end sm:self-auto">
          <!-- Desktop Scroll Hint -->
          <div class="hidden lg:flex items-center gap-2 font-mono-tag text-xs text-zinc-400 dark:text-zinc-500">
            <span>SCROLL DOWN TO SLIDE</span>
            <span 
              class="w-2 h-2 rounded-full animate-ping"
              :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]' : 'bg-[#FB4617]'"
            ></span>
          </div>

          <!-- Progress Bar Pill (Desktop) -->
          <div class="hidden lg:block w-28 h-2 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden relative">
            <div 
              class="h-full transition-all duration-150 rounded-full"
              :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]' : 'bg-[#FB4617]'"
              :style="{ width: `${Math.round(scrollProgress * 100)}%` }"
            ></div>
          </div>

          <!-- Direct Step Buttons (Active on Mobile, Tablet & Desktop) -->
          <div class="flex items-center gap-1.5">
            <button
              v-for="(c, idx) in activeCards"
              :key="idx"
              @click="scrollToStep(idx)"
              class="w-8 h-8 rounded-xl font-mono-tag text-xs font-bold flex items-center justify-center transition-all cursor-pointer border shadow-xs"
              :class="Math.round(scrollProgress * (activeCards.length - 1)) === idx
                ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white border-emerald-400' : 'bg-[#FB4617] text-white border-orange-400')
                : 'bg-white dark:bg-[#151720] text-zinc-600 dark:text-zinc-400 border-black/10 dark:border-white/10 hover:border-zinc-400'"
              :title="c.domain"
            >
              0{{ idx + 1 }}
            </button>
          </div>
        </div>

      </div>

      <!-- ──────────────────────────────────────────────────────────
           2. GIANT CROPPED BACKGROUND TYPOGRAPHY (Parallax Depth)
           ────────────────────────────────────────────────────────── -->
      <div 
        class="hidden lg:block absolute top-1/5 left-0 w-full select-none pointer-events-none opacity-5 dark:opacity-10 whitespace-nowrap overflow-hidden transition-transform duration-100 will-change-transform"
        :style="{ transform: `translate3d(${currentTranslateX * 0.3}px, 0, 0)` }"
      >
        <span 
          class="text-[14rem] sm:text-[18rem] md:text-[22rem] font-black tracking-tighter leading-none block uppercase"
          :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-[#00F59B]' : 'text-[#FB4617]'"
        >
          {{ currentProfile === 'raqwan' ? 'AI Solutions & Enterprise Services' : 'Design Services & Product Strategy' }}
        </span>
      </div>

      <!-- ──────────────────────────────────────────────────────────
           3A. DESKTOP PINNED HORIZONTAL TRACK (>= 1024px)
           ────────────────────────────────────────────────────────── -->
      <div class="hidden lg:block relative z-20 w-full my-auto overflow-visible py-4">
        <div 
          ref="trackRef"
          class="flex items-stretch gap-8 px-8 md:px-16 w-max transition-transform duration-75 ease-out will-change-transform"
          :style="{ transform: `translate3d(${currentTranslateX}px, 0, 0)` }"
        >
          <!-- Individual Service & Featured Work Card -->
          <div
            v-for="(card, idx) in activeCards"
            :key="idx"
            class="w-[460px] xl:w-[500px] shrink-0 rounded-3xl p-7 flex flex-col justify-between border shadow-xl relative overflow-hidden transition-all duration-300 group bg-white dark:bg-[#13151E]"
            :class="currentProfile === 'raqwan'
              ? 'border-emerald-500/30 hover:border-[#00F59B]'
              : 'border-[#FB4617]/30 hover:border-[#FB4617]'"
            style="min-height: 520px;"
          >
            <!-- Card Header: Service Index & Domain -->
            <div class="space-y-2 pb-4 border-b border-black/5 dark:border-white/10">
              <div class="flex items-center justify-between">
                <span 
                  class="px-3 py-1 rounded-md font-mono-tag font-bold text-xs uppercase text-white shadow-xs"
                  :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
                >
                  SERVICE // 0{{ card.code }}
                </span>
                <span class="font-mono-tag text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
                  SERVICE SPEC
                </span>
              </div>

              <div>
                <span 
                  class="text-xs font-mono-tag uppercase font-bold tracking-wider block pt-1"
                  :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-[#00F59B]' : 'text-[#FB4617]'"
                >
                  {{ card.domain }}
                </span>
                <h3 class="text-xl font-extrabold text-[#1C1313] dark:text-white tracking-tight pt-0.5">
                  {{ card.title }}
                </h3>
              </div>
            </div>

            <!-- Narrative Description -->
            <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed font-sans py-2">
              {{ card.summary }}
            </p>

            <!-- Key Metrics Telemetry Block (Benjamin Style) -->
            <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-2.5">
              <span class="font-mono-tag text-[10px] text-zinc-400 uppercase font-bold tracking-wider block">
                Capabilities & Deliverables SLA:
              </span>
              <div class="grid grid-cols-3 gap-2">
                <div 
                  v-for="(m, mIdx) in card.metrics" 
                  :key="mIdx"
                  class="p-2 rounded-xl bg-white dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/5 text-center"
                >
                  <div 
                    class="font-mono-tag text-xs sm:text-sm font-black"
                    :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-[#00F59B]' : 'text-[#FB4617]'"
                  >
                    {{ m.val }}
                  </div>
                  <div class="text-[9px] font-mono-tag text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {{ m.label }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Tech Stack Pill Chips -->
            <div class="flex flex-wrap gap-1.5 pt-2">
              <span 
                v-for="t in card.techStack" 
                :key="t"
                class="px-2.5 py-1 rounded-lg text-[10px] font-mono-tag font-semibold bg-zinc-100 dark:bg-white/5 text-[#1C1313] dark:text-zinc-300 border border-black/[0.04] dark:border-white/5"
              >
                {{ t }}
              </span>
            </div>

            <!-- Card Action Footer -->
            <div class="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
              <span class="font-mono-tag text-xs text-zinc-400">
                0{{ card.code }} / 04
              </span>

              <RouterLink
                :to="card.link"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold font-mono-tag uppercase tracking-wider transition-all duration-200 border"
                :class="currentProfile === 'raqwan'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-[#047857] dark:text-[#00F59B] hover:bg-emerald-500/20'
                  : 'border-[#FB4617]/30 bg-[#FB4617]/10 text-[#FB4617] hover:bg-[#FB4617]/20'"
              >
                <span>{{ card.ctaText }}</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- ──────────────────────────────────────────────────────────
           3B. MOBILE & TABLET FLUID HORIZONTAL CAROUSEL (< 1024px)
           ────────────────────────────────────────────────────────── -->
      <div class="block lg:hidden w-full my-4">
        <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-6 pt-2 custom-scroll scroll-smooth">
          <div
            v-for="(card, idx) in activeCards"
            :key="idx"
            :id="`mobile-card-${idx}`"
            class="snap-center w-[300px] sm:w-[380px] shrink-0 rounded-3xl p-6 flex flex-col justify-between border shadow-lg bg-white dark:bg-[#13151E]"
            :class="currentProfile === 'raqwan'
              ? 'border-emerald-500/30'
              : 'border-[#FB4617]/30'"
            style="min-height: 460px;"
          >
            <!-- Mobile Header -->
            <div class="space-y-1.5 pb-3 border-b border-black/5 dark:border-white/10">
              <div class="flex items-center justify-between">
                <span 
                  class="px-2.5 py-0.5 rounded-md font-mono-tag font-bold text-[11px] uppercase text-white"
                  :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
                >
                  0{{ card.code }}
                </span>
                <span class="font-mono-tag text-[10px] text-zinc-400 uppercase">
                  SERVICE SPEC
                </span>
              </div>
              <span 
                class="text-xs font-mono-tag uppercase font-bold"
                :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-[#00F59B]' : 'text-[#FB4617]'"
              >
                {{ card.domain }}
              </span>
              <h3 class="text-lg font-bold text-[#1C1313] dark:text-white leading-snug">
                {{ card.title }}
              </h3>
            </div>

            <!-- Mobile Summary -->
            <p class="text-xs text-[#5C4848] dark:text-zinc-300 leading-relaxed font-sans py-2">
              {{ card.summary }}
            </p>

            <!-- Mobile Metrics -->
            <div class="p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-1.5">
              <span class="font-mono-tag text-[9px] text-zinc-400 uppercase font-bold tracking-wider block">
                Capabilities & SLA:
              </span>
              <div class="grid grid-cols-3 gap-1.5 text-center">
                <div 
                  v-for="(m, mIdx) in card.metrics" 
                  :key="mIdx"
                  class="p-1.5 rounded-lg bg-white dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/5"
                >
                  <div 
                    class="font-mono-tag text-xs font-black"
                    :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-[#00F59B]' : 'text-[#FB4617]'"
                  >
                    {{ m.val }}
                  </div>
                  <div class="text-[8px] font-mono-tag text-zinc-500 dark:text-zinc-400 truncate">
                    {{ m.label }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Tech Chips -->
            <div class="flex flex-wrap gap-1 pt-1.5">
              <span 
                v-for="t in card.techStack" 
                :key="t"
                class="px-2 py-0.5 rounded-md text-[9px] font-mono-tag bg-zinc-100 dark:bg-white/5 text-[#1C1313] dark:text-zinc-300 border border-black/[0.04] dark:border-white/5"
              >
                {{ t }}
              </span>
            </div>

            <!-- Mobile Footer -->
            <div class="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
              <span class="font-mono-tag text-[11px] text-zinc-400">
                0{{ card.code }} / 04
              </span>
              <RouterLink
                :to="card.link"
                class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono-tag uppercase border"
                :class="currentProfile === 'raqwan'
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-[#047857] dark:text-[#00F59B]'
                  : 'border-[#FB4617]/30 bg-[#FB4617]/10 text-[#FB4617]'"
              >
                <span>{{ card.ctaText }}</span>
                <ArrowRight class="w-3 h-3" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <!-- ──────────────────────────────────────────────────────────
           4. BOTTOM TRACK STATUS FOOTER (Desktop)
           ────────────────────────────────────────────────────────── -->
      <div class="hidden lg:flex max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full items-center justify-between text-xs font-mono-tag text-zinc-400 z-20">
        <div class="flex items-center gap-2">
          <span 
            class="w-2 h-2 rounded-full"
            :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]' : 'bg-[#FB4617]'"
          ></span>
          <span>4 CORE PRODUCTION SERVICES STREAMING</span>
        </div>

        <span>
          {{ Math.round(scrollProgress * 100) }}% PINNED TRAJECTORY COMPLETED
        </span>

        <span>01 → 04 CAPABILITIES</span>
      </div>

    </div>
  </section>
</template>
