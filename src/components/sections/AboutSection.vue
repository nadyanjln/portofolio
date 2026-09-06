<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  Sparkles, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Cpu, 
  Brain, 
  Network, 
  ArrowRight,
  Award,
  CheckCircle2,
  MapPin,
  Clock,
  MessageCircle
} from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useScrollReveal } from '@/composables/useAnimations'

const { portfolioInfo, currentProfile, projects } = usePortfolioStore()

const directPhone = computed(() => {
  if (currentProfile.value === 'raqwan') return '+62 812-9828-7897'
  return '+62 821-1146-4583'
})

const whatsappUrl = computed(() => {
  const num = currentProfile.value === 'raqwan' ? '6281298287897' : '6282111464583'
  const isNadya = currentProfile.value === 'nadya'
  const text = isNadya
    ? 'Halo Nadya, saya tertarik untuk mendiskusikan peluang kolaborasi atau lowongan kerja terkait Product Management & UI/UX.'
    : 'Halo Raqwan, saya ingin berdiskusi mengenai proyek machine learning atau peluang implementasi AI.'
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`
})

const highlights = computed(() => {
  if (currentProfile.value === 'raqwan') {
    return [
      {
        icon: Brain,
        title: 'MarketForge & Agentic AI',
        description: 'Mengarsiteksi MarketForge Agentic AI dan financial screening engine sub-millisecond untuk intelijen pasar modal sekuritas.'
      },
      {
        icon: Network,
        title: 'GraphRAG & Knowledge Graphs',
        description: 'Mengembangkan Knowledge Graph enterprise dengan FalkorDB & Cognee untuk mitigasi halusinasi LLM dan semantic search.'
      },
      {
        icon: Cpu,
        title: 'Distributed AI & Real-Time Telemetry',
        description: 'Merancang arsitektur distributed inference dengan Ray, WebSocket streaming real-time, dan telemetri 32 metrik operasional.'
      }
    ]
  }

  return [
    {
      icon: Lightbulb,
      title: 'Product Thinking',
      description: 'Mengidentifikasi kebutuhan pengguna dan peluang bisnis untuk merancang solusi produk yang tepat sasaran.'
    },
    {
      icon: Users,
      title: 'User-Centered Design',
      description: 'Mendasarkan setiap keputusan desain pada riset pengguna, usability testing, dan data kualitatif.'
    },
    {
      icon: TrendingUp,
      title: 'Data-Driven Impact',
      description: 'Mengukur keberhasilan produk melalui metrik yang jelas dan melakukan iterasi berdasarkan data nyata.'
    }
  ]
})

// Track Record Metrics to replace duplicate skills (Synchronized dynamically with Projects count & Experience Years)
const trackRecordMetrics = computed(() => {
  if (currentProfile.value === 'raqwan') {
    const projectCount = projects.value?.length || 8
    const expYears = portfolioInfo.value?.experienceYears || '2+ Tahun'
    return [
      { value: expYears, label: 'Deep Learning & Vision AI', desc: 'Pengalaman rekayasa model AI edge' },
      { value: `${projectCount} Proyek`, label: 'Production Deployments', desc: 'Model terkuantisasi TensorRT & CUDA' },
      { value: '98.4%', label: 'Benchmark Accuracy', desc: 'Precision recall pada dataset KITTI & MOT' },
      { value: '<4 ms', label: 'Edge Inference Latency', desc: 'Sub-millisecond real-time streaming' }
    ]
  }

  const projectCount = projects.value?.length || 5
  const expYears = portfolioInfo.value?.experienceYears || '1+ Tahun'
  return [
    { value: expYears, label: 'Product, UX & Tech Writing', desc: 'Pengalaman di produk digital & dokumentasi teknis' },
    { value: `${projectCount} Produk`, label: 'Aplikasi Web & Mobile', desc: 'Solusi end-to-end teruji dan terkirim' },
    { value: '+28%', label: 'Avg Funnel Conversion Lift', desc: 'Optimasi terukur dari perbaikan UX' },
    { value: '40+ Sesi', label: 'Usability & User Research', desc: 'Wawancara kualitatif & Maze testing' }
  ]
})

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))

watch(currentProfile, () => {
  nextTick(() => {
    observeAll(sectionRef.value)
  })
})
</script>

<template>
  <section ref="sectionRef" class="py-14 sm:py-20 relative" id="about">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        <!-- Left: Bio & Highlights -->
        <div data-reveal="fade-right" class="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <div class="space-y-2.5">
              <div 
                class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#15161B] border text-xs font-mono-tag font-bold uppercase"
                :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400 border-emerald-300 dark:border-[#047857]/40 bg-emerald-50 dark:bg-[#047857]/10' : 'text-[#FB4617] dark:text-[#FB4617] border-[#EEDCDC] dark:border-white/10'"
              >
                <Sparkles class="w-3.5 h-3.5" />
                <span>About Me</span>
              </div>
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1313] dark:text-[#F4F4F6] leading-tight" v-if="currentProfile === 'raqwan'">
                Dari Fondasi Matematika Hingga Sistem AI yang <span :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#FB4617] dark:text-[#FB4617]'">Scalable</span>
              </h2>
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1313] dark:text-[#F4F4F6] leading-tight" v-else>
                Dari Riset Pengguna Hingga Produk yang <span class="text-[#FB4617] dark:text-[#FB4617]">Berdampak</span>
              </h2>
            </div>

            <p class="text-[#5C4848] dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              {{ portfolioInfo.bio }}
            </p>

            <!-- Direct WhatsApp Contact -->
            <div class="pt-1">
              <a 
                :href="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-mono-tag font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857] hover:bg-[#065F46] shadow-[#047857]/20' : 'bg-[#FB4617] hover:bg-[#E0370E] shadow-[#FB4617]/20'"
              >
                <MessageCircle class="w-3.5 h-3.5" />
                <span>Chat WhatsApp: {{ directPhone }} ↗</span>
              </a>
            </div>
          </div>

          <!-- Core Values Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div 
              v-for="item in highlights" 
              :key="item.title"
              class="p-5 rounded-2xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 space-y-2.5 hover:-translate-y-1.5 transition-all duration-300 group shadow-xs flex flex-col justify-between"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60 hover:bg-emerald-50/50 dark:hover:bg-[#0e1a16]' : 'hover:border-[#FB4617]/40 hover:bg-[#FDF6F6] dark:hover:bg-[#1C1E24]'"
            >
              <div class="space-y-2.5">
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-300 group-hover:bg-[#047857] group-hover:text-white' : 'bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] group-hover:bg-[#FB4617] group-hover:text-white'"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                </div>
                <h3 
                  class="font-bold text-sm text-[#1C1313] dark:text-[#F4F4F6] transition-colors"
                  :class="currentProfile === 'raqwan' ? 'group-hover:text-[#047857] dark:group-hover:text-emerald-300' : 'group-hover:text-[#FB4617] dark:group-hover:text-[#FB4617]'"
                >
                  {{ item.title }}
                </h3>
              </div>
              <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Track Record & Credentials Card (Replaces duplicate skills) -->
        <div data-reveal="fade-left" class="lg:col-span-5 flex flex-col h-full">
          <div class="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#15161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between shadow-sm space-y-6">
            
            <!-- Card Header -->
            <div class="space-y-2 pb-4 border-b border-[#EEDCDC] dark:border-white/10">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Award class="w-4 h-4" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617] dark:text-[#FB4617]'" />
                  <h3 class="font-bold text-base sm:text-lg text-[#1C1313] dark:text-white">
                    {{ currentProfile === 'raqwan' ? 'AI Engineering Track Record' : 'Product & UX Track Record' }}
                  </h3>
                </div>
                <span 
                  class="text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded-md uppercase"
                  :class="currentProfile === 'raqwan' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-[#FB4617]/10 text-[#FB4617] dark:text-[#FB4617]'"
                >
                  (VERIFIED)
                </span>
              </div>
              <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">
                {{ currentProfile === 'raqwan' 
                  ? 'Portofolio rekayasa mendalam dengan fokus pada kecepatan inferensi, reliabilitas edge, dan akurasi model.' 
                  : 'Rekam jejak kepemimpinan produk dengan penekanan pada dampak bisnis dan kepuasan pengguna nyata.' }}
              </p>
            </div>

            <!-- 2x2 Impact Stats Grid -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4">
              <div 
                v-for="(stat, sIdx) in trackRecordMetrics"
                :key="sIdx"
                class="p-4 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/5 space-y-1 group hover:border-zinc-300 dark:hover:border-white/15 transition-all"
              >
                <div 
                  class="text-xl sm:text-2xl font-black font-mono-tag tracking-tight"
                  :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#FB4617] dark:text-[#FB4617]'"
                >
                  {{ stat.value }}
                </div>
                <div class="text-xs font-bold text-[#1C1313] dark:text-zinc-200 leading-snug">
                  {{ stat.label }}
                </div>
                <div class="text-[10px] text-[#5C4848] dark:text-zinc-400 leading-tight">
                  {{ stat.desc }}
                </div>
              </div>
            </div>

            <!-- Availability & Location Status Pill -->
            <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/5 space-y-2 text-xs font-mono-tag">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span class="font-bold">Status: Open for Strategic Roles</span>
                </div>
                <span class="text-[10px] text-zinc-400">2026/Q3</span>
              </div>
              <div class="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                <MapPin class="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                <span>Indonesia • Remote Worldwide / Hybrid</span>
              </div>
            </div>

            <!-- Bottom CTA Link -->
            <div class="pt-4 border-t border-[#EEDCDC] dark:border-white/10 flex items-center justify-between">
              <RouterLink 
                :to="'/' + currentProfile + '/about'"
                class="text-xs font-bold font-mono-tag transition-colors hover:underline flex items-center gap-1"
                :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#FB4617] dark:text-[#FB4617]'"
              >
                <span>Full Story & Career Journey</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </RouterLink>

              <RouterLink 
                :to="'/' + currentProfile + '/contact'"
                class="px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono-tag uppercase tracking-wider text-white shadow-xs transition-transform hover:scale-103 cursor-pointer"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857] hover:bg-[#065F46]' : 'bg-[#FB4617] hover:bg-[#E0370E]'"
              >
                <span>Hire Me</span>
              </RouterLink>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>
