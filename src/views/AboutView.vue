<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  Trophy, 
  Code2, 
  Brain, 
  Database, 
  Cpu, 
  Layers, 
  Compass, 
  BarChart3, 
  Building2, 
  FlaskConical,
  Filter,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  ArrowUpRight,
  ChevronRight
} from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import SkillBadge from '@/components/ui/SkillBadge.vue'
import InfiniteMarquee from '@/components/effects/InfiniteMarquee.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const { portfolioInfo, skills, educations, experiences, milestones, certifications, currentProfile } = usePortfolioStore()

const activeSkillFilter = ref('all')

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

// Group skills by category with distinct metadata
const skillCategories = computed(() => {
  if (currentProfile.value === 'raqwan') {
    return [
      {
        id: 'languages',
        name: 'Programming Languages',
        icon: Code2,
        desc: 'Bahasa pemrograman inti untuk rekayasa AI, backend performa tinggi, dan distributed data pipelines.',
        skills: skills.value.filter(s => s.category === 'Languages')
      },
      {
        id: 'aiml',
        name: 'AI, Deep Learning & Agentic Core',
        icon: Brain,
        desc: 'Arsitektur deep learning, autonomous multi-agent workflows (DAG), LLM reasoning, dan distributed ML.',
        skills: skills.value.filter(s => ['AI & ML', 'Agentic AI', 'Deep Learning', 'Distributed AI'].includes(s.category))
      },
      {
        id: 'datagraph',
        name: 'Data Engineering & Knowledge Graphs',
        icon: Database,
        desc: 'Knowledge Graph enterprise (FalkorDB + Cognee), GraphRAG, Vector DB, dan pipeline ETL berskala besar.',
        skills: skills.value.filter(s => ['Database', 'Knowledge Graph', 'Vector Search', 'Data Engineering'].includes(s.category))
      },
      {
        id: 'mlops',
        name: 'MLOps, Tooling & Telemetry',
        icon: Cpu,
        desc: 'Model serving (FastAPI), real-time Grafana telemetry, containerization Docker, dan LLMOps (LangSmith).',
        skills: skills.value.filter(s => ['MLOps', 'Monitoring', 'LLMOps', 'Graph Analysis', 'DevOps', 'Backend'].includes(s.category))
      }
    ]
  }

  return [
    {
      id: 'writing',
      name: 'Technical Writing & Documentation',
      icon: Code2,
      desc: 'Dokumentasi teknis arsitektur sistem, standarisasi API specs, PRD, release notes, dan user manuals.',
      skills: skills.value.filter(s => s.category === 'Documentation' || s.name.toLowerCase().includes('writing') || s.name.toLowerCase().includes('doc'))
    },
    {
      id: 'strategy',
      name: 'Product Strategy & Management',
      icon: Compass,
      desc: 'Product discovery, PRD & user stories, roadmap prioritization (RICE), dan agile sprint execution.',
      skills: skills.value.filter(s => s.category === 'Product')
    },
    {
      id: 'design',
      name: 'UI & Interaction Design',
      icon: Layers,
      desc: 'Design systems multi-brand, high-fidelity prototyping di Figma, auto layout, dan micro-interactions.',
      skills: skills.value.filter(s => ['UI/UX', 'Design Tool'].includes(s.category))
    },
    {
      id: 'research',
      name: 'UX Research & Optimization',
      icon: BarChart3,
      desc: 'Moderated user interviews, usability testing, A/B testing statistical validation, dan heuristic audit.',
      skills: skills.value.filter(s => ['UX Research'].includes(s.category))
    }
  ]
})

const filteredSkillCategories = computed(() => {
  if (activeSkillFilter.value === 'all') return skillCategories.value
  return skillCategories.value.filter(c => c.id === activeSkillFilter.value)
})

// Group experiences into categorized sections
const experienceSections = computed(() => {
  if (currentProfile.value === 'raqwan') {
    const list = experiences.value || []
    return [
      {
        title: 'Industry & Corporate Experience',
        icon: Building2,
        badge: 'Enterprise & Industry',
        desc: 'Peran engineering di korporat energi, AI consulting, dan production deep learning.',
        items: list.filter(e => ['Accenture', 'PT. Arna Teknologi Peduli', 'PT. Mitra Teknologi Gemilang'].includes(e.company) || e.company.includes('Mitra'))
      },
      {
        title: 'Research & Tech Leadership',
        icon: FlaskConical,
        badge: 'Research & Community',
        desc: 'Riset saintifik multimodal dan kepemimpinan operasional organisasi teknologi global.',
        items: list.filter(e => ['Gunadarma University', 'Google Developer Group on Campus'].includes(e.company))
      }
    ]
  }

  const list = experiences.value || []
  return [
    {
      title: 'Industry & Professional Experience',
      icon: Building2,
      badge: 'Product & Tech Writing',
      desc: 'Pengalaman profesional technical writing, spesifikasi teknis sistem, UX audit, dan perancangan produk digital.',
      items: list.filter(e => 
        e.role.toLowerCase().includes('technical') || 
        e.role.toLowerCase().includes('writer') || 
        e.company.includes('Mitreka') || 
        e.company.includes('Mitra') || 
        e.company.includes('PT.') || 
        e.role.toLowerCase().includes('designer') || 
        e.role.toLowerCase().includes('manager')
      )
    },
    {
      title: 'Academic, Community & Organization',
      icon: FlaskConical,
      badge: 'Leadership & Academic',
      desc: 'Kepemimpinan organisasi kemahasiswaan, asistensi laboratorium, dan evaluasi rekrutmen institusi.',
      items: list.filter(e => 
        !e.role.toLowerCase().includes('technical') && 
        !e.role.toLowerCase().includes('writer') && 
        !e.company.includes('Mitreka') && 
        !e.company.includes('Mitra') && 
        !e.company.includes('PT.') && 
        !e.role.toLowerCase().includes('designer') && 
        !e.role.toLowerCase().includes('manager')
      )
    }
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
  <div ref="sectionRef" class="pt-24 pb-16 sm:pt-28 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 font-sans">
    
    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- HERO / PROFILE INTRO (Premium Visual Identity)        -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="relative">
      <!-- Ambient background glow -->
      <div 
        class="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        :class="currentProfile === 'raqwan' ? 'bg-emerald-500' : 'bg-[#FB4617]'"
      ></div>
      <div 
        class="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        :class="currentProfile === 'raqwan' ? 'bg-teal-400' : 'bg-orange-300'"
      ></div>

      <div class="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        <div class="lg:col-span-7 space-y-5 order-2 lg:order-1">
          <!-- Top Tag Pill -->
          <div 
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono-tag font-bold uppercase shadow-xs backdrop-blur-sm"
            :class="currentProfile === 'raqwan' 
              ? 'text-emerald-400 border-[#047857]/40 bg-[#047857]/10' 
              : 'text-[#FB4617] border-[#FB4617]/30 bg-[#FB4617]/10'"
          >
            <Sparkles class="w-3.5 h-3.5" />
            <span>About Me /2026/</span>
          </div>

          <!-- Headline -->
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#1C1313] dark:text-white leading-[1.15]" v-if="currentProfile === 'raqwan'">
            Translating AI Research into <span class="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Scalable Production Systems</span>
          </h1>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#1C1313] dark:text-white leading-[1.15]" v-else>
            Merancang Produk Digital yang <span class="bg-gradient-to-r from-[#FB4617] to-[#FF8A65] bg-clip-text text-transparent">Bermakna</span> & Berdampak
          </h1>

          <!-- Bio Paragraph -->
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-2xl">
            {{ portfolioInfo.bio }}
          </p>

          <!-- Status & Contact Info Row -->
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 text-xs font-mono-tag">
            <div class="flex items-center gap-2">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#FB4617]'"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5" :class="currentProfile === 'raqwan' ? 'bg-emerald-500' : 'bg-[#FB4617]'"></span>
              </span>
              <span class="font-semibold" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#FB4617]'">{{ portfolioInfo.status }}</span>
            </div>
            <span class="w-px h-3.5 bg-zinc-300 dark:bg-zinc-600"></span>
            <div class="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              <MapPin class="w-3 h-3" />
              <span class="font-semibold">{{ portfolioInfo.location }}</span>
            </div>
            <span class="w-px h-3.5 bg-zinc-300 dark:bg-zinc-600 hidden sm:block"></span>
            <span class="text-zinc-400 dark:text-zinc-500 font-semibold hidden sm:block">{{ portfolioInfo.email }}</span>
          </div>

          <!-- CTA Buttons -->
          <div class="pt-3 flex flex-wrap items-center gap-3">
            <a 
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3 rounded-2xl text-white text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
              :class="currentProfile === 'raqwan' 
                ? 'bg-gradient-to-r from-[#047857] to-[#059669] hover:from-[#065F46] hover:to-[#047857] shadow-[#047857]/25' 
                : 'bg-gradient-to-r from-[#FB4617] to-[#FF6B35] hover:from-[#E0370E] hover:to-[#FB4617] shadow-[#FB4617]/25'"
            >
              <MessageCircle class="w-4 h-4" />
              <span>Chat Langsung WhatsApp</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </a>

            <a 
              :href="'mailto:' + portfolioInfo.email"
              class="px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-semibold text-[#1C1313] dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/10 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Mail class="w-4 h-4" />
              <span>Kirim Email</span>
            </a>
          </div>
        </div>

        <!-- Right Visual Monogram Card (Original White Card with Gradient Border) -->
        <div class="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <div 
            class="relative w-64 h-80 sm:w-72 sm:h-[22rem] rounded-3xl p-1 shadow-2xl"
            :class="currentProfile === 'raqwan' ? 'bg-gradient-to-br from-[#047857]/40 via-white/10 to-teal-500/20' : 'bg-gradient-to-br from-[#FB4617]/30 via-white/10 to-[#9FC2EA]/30'"
          >
            <div class="w-full h-full rounded-[22px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden group">
              <div 
                class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-all group-hover:scale-125"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857]/25' : 'bg-[#FB4617]/20'"
              ></div>
              
              <div 
                class="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-extrabold text-3xl shadow-lg transition-transform group-hover:scale-105"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857] shadow-[#047857]/35' : 'bg-[#FB4617] shadow-[#FB4617]/30'"
              >
                {{ currentProfile === 'raqwan' ? 'R*' : 'N*' }}
              </div>
              <div>
                <h3 class="font-bold text-lg text-[#1C1313] dark:text-white">{{ portfolioInfo.name }}</h3>
                <p class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">{{ portfolioInfo.title }}</p>
              </div>
              <span class="px-3 py-1 text-[11px] font-mono-tag font-bold rounded-full bg-[#FFF9F9] dark:bg-white/5 border border-[#EEDCDC] dark:border-white/10 text-[#5C4848] dark:text-zinc-300">
                {{ portfolioInfo.location }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 1. SKILLS & KEAHLIAN TERKATEGORI                      -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="space-y-8">
      
      <!-- Section Header with Filter Switcher -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EEDCDC] dark:border-white/10">
        <div class="space-y-2">
          <div class="flex items-center gap-2.5">
            <div 
              class="w-8 h-8 rounded-xl flex items-center justify-center"
              :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-orange-100 dark:bg-[#FB4617]/15 text-[#FB4617]'"
            >
              <Code2 class="w-4 h-4" />
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-[#1C1313] dark:text-white">Skills & Keahlian Terkategori</h2>
          </div>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400 max-w-lg">
            Daftar kompetensi teknis, framework, dan tools produksi yang dikelompokkan secara terstruktur.
          </p>
        </div>

        <!-- Filter Segmented Tabs -->
        <div class="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 self-start md:self-auto">
          <button
            @click="activeSkillFilter = 'all'"
            class="px-3 py-1.5 rounded-xl text-xs font-mono-tag font-bold transition-all cursor-pointer"
            :class="activeSkillFilter === 'all' ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white shadow-xs' : 'bg-[#FB4617] text-white shadow-xs') : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'"
          >
            All Categories
          </button>
          <button
            v-for="cat in skillCategories"
            :key="cat.id"
            @click="activeSkillFilter = cat.id"
            class="px-3 py-1.5 rounded-xl text-xs font-mono-tag font-bold transition-all cursor-pointer"
            :class="activeSkillFilter === cat.id ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white shadow-xs' : 'bg-[#FB4617] text-white shadow-xs') : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'"
          >
            {{ cat.name.split('&')[0].trim() }}
          </button>
        </div>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div 
          v-for="(category, idx) in filteredSkillCategories" 
          :key="category.name"
          class="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm hover:shadow-lg group overflow-hidden"
          :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#FB4617]/40'"
        >
          <!-- Subtle corner accent glow on hover -->
          <div 
            class="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#FB4617]'"
          ></div>

          <!-- Category Card Header -->
          <div class="relative space-y-3">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div 
                  class="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                  :class="currentProfile === 'raqwan' 
                    ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-300 border border-emerald-200 dark:border-[#047857]/30' 
                    : 'bg-orange-100 dark:bg-[#FB4617]/10 text-[#FB4617] border border-orange-200 dark:border-[#FB4617]/20'"
                >
                  <component :is="category.icon" class="w-5 h-5" />
                </div>
                <h3 class="font-bold text-base sm:text-lg text-[#1C1313] dark:text-white leading-snug">
                  {{ category.name }}
                </h3>
              </div>
              <span class="text-xs font-mono-tag font-bold text-[#5C4848] dark:text-zinc-400 px-2.5 py-1 rounded-full bg-[#FFF9F9] dark:bg-white/5 border border-[#EEDCDC] dark:border-white/10 shrink-0">
                {{ category.skills.length }} Skills
              </span>
            </div>
            <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed pl-14">
              {{ category.desc }}
            </p>
          </div>

          <!-- Skill Badges -->
          <div class="flex flex-wrap gap-2.5 pt-4 border-t border-[#EEDCDC]/60 dark:border-white/5">
            <SkillBadge 
              v-for="skill in category.skills" 
              :key="skill.name" 
              :skill="skill" 
            />
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 2. PENGALAMAN & TRACK RECORD                          -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="space-y-8">
      <div class="flex items-center justify-between pb-6 border-b border-[#EEDCDC] dark:border-white/10">
        <div class="space-y-2">
          <div class="flex items-center gap-2.5">
            <div 
              class="w-8 h-8 rounded-xl flex items-center justify-center"
              :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-orange-100 dark:bg-[#FB4617]/15 text-[#FB4617]'"
            >
              <Briefcase class="w-4 h-4" />
            </div>
            <h2 class="text-xl sm:text-2xl font-bold text-[#1C1313] dark:text-white">Pengalaman & Track Record</h2>
          </div>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400 max-w-lg">
            Riwayat karier profesional, riset saintifik multimodal, dan kepemimpinan operasional teknologi.
          </p>
        </div>
      </div>

      <!-- Experience Categorized Sections -->
      <div class="space-y-12">
        <div 
          v-for="sec in experienceSections" 
          :key="sec.title"
          class="space-y-6"
        >
          <!-- Section Sub-Header -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10">
            <div class="flex items-center gap-3">
              <div 
                class="w-8 h-8 rounded-lg flex items-center justify-center"
                :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-orange-100 dark:bg-[#FB4617]/15 text-[#FB4617]'"
              >
                <component :is="sec.icon" class="w-4 h-4" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-[#1C1313] dark:text-white">
                  {{ sec.title }}
                </h3>
                <p class="text-[11px] text-[#5C4848] dark:text-zinc-500 mt-0.5">{{ sec.desc }}</p>
              </div>
            </div>
            <span 
              class="text-xs font-mono-tag font-bold px-3 py-1 rounded-full"
              :class="currentProfile === 'raqwan' 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20' 
                : 'bg-orange-50 dark:bg-[#FB4617]/10 text-[#FB4617] border border-orange-200 dark:border-[#FB4617]/20'"
            >{{ sec.items.length }} Peran</span>
          </div>

          <!-- Experience Cards Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              v-for="exp in sec.items" 
              :key="exp.role + exp.company"
              class="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between space-y-4 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 overflow-hidden"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#FB4617]/40'"
            >
              <!-- Hover glow -->
              <div 
                class="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
                :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#FB4617]'"
              ></div>

              <div class="relative space-y-3">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span 
                    class="px-3 py-1 rounded-lg text-xs font-mono-tag font-bold uppercase tracking-wider" 
                    :class="currentProfile === 'raqwan' 
                      ? 'bg-emerald-50 dark:bg-[#047857]/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-[#047857]/40' 
                      : 'bg-orange-50 dark:bg-[#FB4617]/10 text-orange-900 dark:text-[#FB4617] border border-orange-200 dark:border-[#FB4617]/30'"
                  >
                    {{ exp.company }}
                  </span>
                  <div class="flex items-center gap-1.5 text-xs font-mono-tag font-bold text-[#5C4848] dark:text-zinc-400">
                    <Calendar class="w-3 h-3" />
                    <span>{{ exp.period }}</span>
                  </div>
                </div>

                <h4 class="text-lg font-bold text-[#1C1313] dark:text-white leading-snug">
                  {{ exp.role }}
                </h4>
              </div>

              <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed pt-3 border-t border-[#EEDCDC]/60 dark:border-white/5">
                {{ exp.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 3. PENGHARGAAN & MILESTONES                           -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="space-y-8" v-if="milestones && milestones.length > 0">
      <div class="flex items-center gap-2.5 pb-6 border-b border-[#EEDCDC] dark:border-white/10">
        <div 
          class="w-8 h-8 rounded-xl flex items-center justify-center"
          :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-orange-100 dark:bg-[#FB4617]/15 text-[#FB4617]'"
        >
          <Trophy class="w-4 h-4" />
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-[#1C1313] dark:text-white">Penghargaan & Milestones</h2>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">Prestasi kompetisi teknologi dan rekognisi industri terverifikasi.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div 
          v-for="mile in milestones" 
          :key="mile.title"
          class="group relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between space-y-4 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
          :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#FB4617]/40'"
        >
          <!-- Hover accent -->
          <div 
            class="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#FB4617]'"
          ></div>

          <div class="relative space-y-3">
            <div class="flex items-center justify-between gap-2">
              <span 
                class="px-2.5 py-1 rounded-md text-[10px] font-mono-tag font-bold uppercase" 
                :class="currentProfile === 'raqwan' 
                  ? 'bg-[#047857]/20 text-emerald-300 border border-[#047857]/40' 
                  : 'bg-[#FB4617]/10 text-[#FB4617] border border-[#FB4617]/30'"
              >
                {{ mile.badge }}
              </span>
              <span class="text-xs font-mono-tag font-bold text-zinc-400">{{ mile.year }}</span>
            </div>

            <h3 
              class="font-bold text-base text-[#1C1313] dark:text-white transition-colors"
              :class="currentProfile === 'raqwan' ? 'group-hover:text-emerald-400' : 'group-hover:text-[#FB4617]'"
            >
              {{ mile.title }}
            </h3>

            <p class="text-xs font-mono-tag font-semibold text-[#5C4848] dark:text-zinc-400">
              {{ mile.issuer }}
            </p>
          </div>

          <p class="text-xs text-[#5C4848] dark:text-zinc-300 leading-relaxed pt-3 border-t border-[#EEDCDC]/60 dark:border-white/5">
            {{ mile.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 4. PENDIDIKAN & SERTIFIKASI                           -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      <!-- Education -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-5 shadow-sm">
        <div class="flex items-center gap-3 pb-4 border-b border-[#EEDCDC] dark:border-white/10">
          <div 
            class="w-8 h-8 rounded-xl flex items-center justify-center"
            :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-orange-100 dark:bg-[#FB4617]/15 text-[#FB4617]'"
          >
            <GraduationCap class="w-4 h-4" />
          </div>
          <h3 class="font-bold text-lg text-[#1C1313] dark:text-white">Pendidikan Formal</h3>
        </div>
        <div class="space-y-3">
          <div 
            v-for="edu in educations" 
            :key="edu.degree" 
            class="space-y-2 p-5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 hover:border-opacity-60 transition-all"
            :class="currentProfile === 'raqwan' ? 'hover:border-emerald-300 dark:hover:border-emerald-500/30' : 'hover:border-orange-300 dark:hover:border-[#FB4617]/30'"
          >
            <h4 class="font-bold text-sm sm:text-base text-[#1C1313] dark:text-white">{{ edu.degree }}</h4>
            <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">{{ edu.school }}</p>
            <div class="flex items-center gap-1.5 pt-1">
              <Calendar class="w-3 h-3" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'" />
              <span class="text-xs font-mono-tag font-bold" :class="currentProfile === 'raqwan' ? 'text-emerald-500 dark:text-emerald-400' : 'text-[#FB4617]'">{{ edu.year }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-5 shadow-sm">
        <div class="flex items-center gap-3 pb-4 border-b border-[#EEDCDC] dark:border-white/10">
          <div 
            class="w-8 h-8 rounded-xl flex items-center justify-center"
            :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : 'bg-orange-100 dark:bg-[#FB4617]/15 text-[#FB4617]'"
          >
            <Award class="w-4 h-4" />
          </div>
          <h3 class="font-bold text-lg text-[#1C1313] dark:text-white">Sertifikasi & Afiliasi</h3>
        </div>
        <div class="space-y-3">
          <div 
            v-for="cert in certifications" 
            :key="cert"
            class="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs sm:text-sm font-semibold text-[#1C1313] dark:text-zinc-200 hover:border-opacity-60 transition-all"
            :class="currentProfile === 'raqwan' ? 'hover:border-emerald-300 dark:hover:border-emerald-500/30' : 'hover:border-orange-300 dark:hover:border-[#FB4617]/30'"
          >
            <CheckCircle2 class="w-4.5 h-4.5 shrink-0" :class="currentProfile === 'raqwan' ? 'text-emerald-500 dark:text-emerald-400' : 'text-[#FB4617]'" />
            <span>{{ cert }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Infinite Continuous Marquee at About Bottom -->
    <div class="pt-4">
      <InfiniteMarquee />
    </div>

  </div>
</template>
