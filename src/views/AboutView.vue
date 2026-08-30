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
  Filter
} from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import SkillBadge from '@/components/ui/SkillBadge.vue'
import InfiniteMarquee from '@/components/effects/InfiniteMarquee.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const { portfolioInfo, skills, educations, experiences, milestones, certifications, currentProfile } = usePortfolioStore()

const activeSkillFilter = ref('all')

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
        items: list.filter(e => ['Accenture', 'PT. Arna Teknologi Peduli', 'PT. Mitra Teknologi Gemilang'].includes(e.company))
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
      badge: 'Product & Design',
      desc: 'Pengalaman profesional merancang alur produk digital, UX audit, dan pembuatan asset desain terstruktur.',
      items: list.filter(e => e.company.includes('Mitra Teknologi Gemilang') || e.company.includes('PT.'))
    },
    {
      title: 'Academic, Community & Organization',
      icon: FlaskConical,
      badge: 'Leadership & Academic',
      desc: 'Kepemimpinan organisasi kemahasiswaan, asistensi laboratorium, dan evaluasi rekrutmen institusi.',
      items: list.filter(e => !e.company.includes('Mitra Teknologi Gemilang') && !e.company.includes('PT.'))
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
  <div ref="sectionRef" class="pt-24 pb-16 sm:pt-28 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 font-sans">
    
    <!-- Hero / Profile Intro with Floating Avatar Animation -->
    <div data-reveal="fade-up" class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div class="lg:col-span-8 space-y-4">
        <!-- Top Tag Pill -->
        <div 
          class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border text-xs font-mono-tag font-bold uppercase shadow-xs"
          :class="currentProfile === 'raqwan' ? 'text-emerald-400 border-[#047857]/40 bg-[#047857]/10' : 'text-[#9E0402] dark:text-[#ff4d4d] border-[#EEDCDC] dark:border-white/10'"
        >
          <Sparkles class="w-3.5 h-3.5" />
          <span>About Me /2026/</span>
        </div>

        <!-- Headline -->
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1C1313] dark:text-white leading-tight" v-if="currentProfile === 'raqwan'">
          Translating AI Research into <span class="text-emerald-400">Scalable Production Systems</span>
        </h1>
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1C1313] dark:text-white leading-tight" v-else>
          Merancang Produk Digital yang <span class="text-[#9E0402] dark:text-[#ff3b38]">Bermakna</span> & Berdampak
        </h1>

        <!-- Bio Paragraph -->
        <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-3xl">
          {{ portfolioInfo.bio }}
        </p>

        <!-- Status & Contact Pills -->
        <div class="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-tag">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full animate-pulse" :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#9E0402]'"></span>
            <span class="font-semibold" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">{{ portfolioInfo.status }}</span>
          </div>
          <span class="text-zinc-500">•</span>
          <span class="text-zinc-400 font-semibold">{{ portfolioInfo.email }}</span>
        </div>
      </div>

      <!-- Right Visual Monogram Card -->
      <div class="lg:col-span-4 flex justify-center">
        <div 
          class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl p-1 shadow-2xl"
          :class="currentProfile === 'raqwan' ? 'bg-gradient-to-br from-[#047857]/40 via-white/10 to-teal-500/20' : 'bg-gradient-to-br from-[#9E0402]/30 via-white/10 to-[#9FC2EA]/30'"
        >
          <div class="w-full h-full rounded-[22px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden group">
            <div 
              class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-all group-hover:scale-125"
              :class="currentProfile === 'raqwan' ? 'bg-[#047857]/25' : 'bg-[#9E0402]/20'"
            ></div>
            
            <div 
              class="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-extrabold text-3xl shadow-lg transition-transform group-hover:scale-105"
              :class="currentProfile === 'raqwan' ? 'bg-[#047857] shadow-[#047857]/35' : 'bg-[#9E0402] shadow-[#9E0402]/30'"
            >
              {{ currentProfile === 'raqwan' ? 'R*' : 'N*' }}
            </div>
            <div>
              <h3 class="font-bold text-lg text-[#1C1313] dark:text-white">{{ portfolioInfo.name }}</h3>
              <p class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">{{ portfolioInfo.title }}</p>
            </div>
            <span class="px-3 py-1 text-[11px] font-mono-tag font-bold rounded-full bg-[#FFF9F9] dark:bg-white/5 border border-[#EEDCDC] dark:border-white/10 text-[#5C4848] dark:text-zinc-300">
              📍 {{ portfolioInfo.location }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════ -->
    <!-- 1. SKILLS & KEAHLIAN TERKATEGORI (Spacious 2-Col Grid) -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="space-y-6">
      
      <!-- Section Header with Filter Switcher -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EEDCDC] dark:border-white/10">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#9E0402]'"></span>
            <h2 class="text-xl sm:text-2xl font-bold text-[#1C1313] dark:text-white">Skills & Keahlian Terkategori</h2>
          </div>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">
            Daftar kompetensi teknis, framework, dan tools produksi yang dikelompokkan secara terstruktur.
          </p>
        </div>

        <!-- Filter Segmented Tabs -->
        <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 self-start md:self-auto">
          <button
            @click="activeSkillFilter = 'all'"
            class="px-3 py-1.5 rounded-xl text-xs font-mono-tag font-bold transition-all cursor-pointer"
            :class="activeSkillFilter === 'all' ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white shadow-xs' : 'bg-[#9E0402] text-white shadow-xs') : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'"
          >
            All Categories
          </button>
          <button
            v-for="cat in skillCategories"
            :key="cat.id"
            @click="activeSkillFilter = cat.id"
            class="px-3 py-1.5 rounded-xl text-xs font-mono-tag font-bold transition-all cursor-pointer"
            :class="activeSkillFilter === cat.id ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white shadow-xs' : 'bg-[#9E0402] text-white shadow-xs') : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'"
          >
            {{ cat.name.split('&')[0].trim() }}
          </button>
        </div>
      </div>

      <!-- Spacious 2-Column Responsive Card Grid (No Squeezing) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div 
          v-for="category in filteredSkillCategories" 
          :key="category.name"
          class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between space-y-6 transition-all duration-300 shadow-sm hover:shadow-md"
          :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
        >
          <!-- Category Card Header -->
          <div class="space-y-2">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div 
                  class="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                  :class="currentProfile === 'raqwan' ? 'bg-emerald-100 dark:bg-[#047857]/20 text-[#047857] dark:text-emerald-300 border border-emerald-200 dark:border-[#047857]/30' : 'bg-rose-100 dark:bg-[#9E0402]/10 text-[#9E0402] dark:text-[#ff4d4d] border border-rose-200 dark:border-[#9E0402]/20'"
                >
                  <component :is="category.icon" class="w-5 h-5" />
                </div>
                <h3 class="font-bold text-base sm:text-lg text-[#1C1313] dark:text-white">
                  {{ category.name }}
                </h3>
              </div>
              <span class="text-xs font-mono-tag font-bold text-[#5C4848] dark:text-zinc-400 px-2.5 py-1 rounded-full bg-[#FFF9F9] dark:bg-white/5 border border-[#EEDCDC] dark:border-white/10 shrink-0">
                {{ category.skills.length }} Skills
              </span>
            </div>
            <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed pl-13">
              {{ category.desc }}
            </p>
          </div>

          <!-- Skill Badges Wrap (Spacious Chips with Full Visibility) -->
          <div class="flex flex-wrap gap-2.5 pt-3 border-t border-[#EEDCDC]/60 dark:border-white/5">
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
    <!-- 2. PENGALAMAN & TRACK RECORD (Spacious 2-Col Grid)    -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="space-y-8">
      <div class="flex items-center justify-between pb-4 border-b border-[#EEDCDC] dark:border-white/10">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <Briefcase class="w-5 h-5" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'" />
            <h2 class="text-xl sm:text-2xl font-bold text-[#1C1313] dark:text-white">Pengalaman & Track Record</h2>
          </div>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">
            Riwayat karier profesional, riset saintifik multimodal, dan kepemimpinan operasional teknologi.
          </p>
        </div>
      </div>

      <!-- Experience Categorized Sections -->
      <div class="space-y-10">
        <div 
          v-for="sec in experienceSections" 
          :key="sec.title"
          class="space-y-5"
        >
          <!-- Section Sub-Header Badge -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10">
            <div class="flex items-center gap-2.5">
              <component :is="sec.icon" class="w-4.5 h-4.5 text-emerald-400" v-if="currentProfile === 'raqwan'" />
              <component :is="sec.icon" class="w-4.5 h-4.5 text-[#9E0402] dark:text-[#ff4d4d]" v-else />
              <h3 class="text-sm font-bold text-[#1C1313] dark:text-white">
                {{ sec.title }}
              </h3>
            </div>
            <span class="text-xs font-mono-tag font-bold text-[#5C4848] dark:text-zinc-400">{{ sec.items.length }} Peran</span>
          </div>

          <!-- Spacious 2-Column Experience Cards (No Cramping) -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div 
              v-for="exp in sec.items" 
              :key="exp.role + exp.company"
              class="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between space-y-4 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
            >
              <div class="space-y-3">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <span 
                    class="px-3 py-1 rounded-lg text-xs font-mono-tag font-bold uppercase tracking-wider" 
                    :class="currentProfile === 'raqwan' ? 'bg-emerald-50 dark:bg-[#047857]/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-[#047857]/40' : 'bg-rose-50 dark:bg-[#9E0402]/10 text-rose-900 dark:text-[#ff4d4d] border border-rose-200 dark:border-[#9E0402]/30'"
                  >
                    {{ exp.company }}
                  </span>
                  <span class="text-xs font-mono-tag font-bold text-[#5C4848] dark:text-zinc-400">{{ exp.period }}</span>
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
    <!-- 3. PENGHARGAAN & MILESTONES (3-Column Grid)           -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="space-y-6" v-if="milestones && milestones.length > 0">
      <div class="flex items-center gap-2.5 pb-4 border-b border-[#EEDCDC] dark:border-white/10">
        <Trophy class="w-5 h-5" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'" />
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-[#1C1313] dark:text-white">Penghargaan & Milestones</h2>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">Prestasi kompetisi teknologi dan rekognisi industri terverifikasi.</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          v-for="mile in milestones" 
          :key="mile.title"
          class="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between space-y-4 relative overflow-hidden transition-all duration-300 shadow-sm group hover:-translate-y-1"
          :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
        >
          <div class="space-y-2.5">
            <div class="flex items-center justify-between gap-2">
              <span class="px-2.5 py-1 rounded-md text-[10px] font-mono-tag font-bold uppercase" :class="currentProfile === 'raqwan' ? 'bg-[#047857]/20 text-emerald-300 border border-[#047857]/40' : 'bg-[#9E0402]/10 text-[#ff4d4d] border border-[#9E0402]/30'">
                {{ mile.badge }}
              </span>
              <span class="text-xs font-mono-tag font-bold text-zinc-400">{{ mile.year }}</span>
            </div>

            <h3 class="font-bold text-base text-[#1C1313] dark:text-white group-hover:text-emerald-400 transition-colors">
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
    <!-- 4. PENDIDIKAN & SERTIFIKASI GRID                      -->
    <!-- ═══════════════════════════════════════════════════════ -->
    <div data-reveal="fade-up" class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      <!-- Education -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-4 shadow-sm">
        <div class="flex items-center gap-2 pb-3 border-b border-[#EEDCDC] dark:border-white/10">
          <GraduationCap class="w-5 h-5" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'" />
          <h3 class="font-bold text-lg text-[#1C1313] dark:text-white">Pendidikan Formal</h3>
        </div>
        <div 
          v-for="edu in educations" 
          :key="edu.degree" 
          class="space-y-2 p-5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10"
        >
          <h4 class="font-bold text-sm sm:text-base text-[#1C1313] dark:text-white">{{ edu.degree }}</h4>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">{{ edu.school }}</p>
          <span class="text-xs font-mono-tag font-bold block pt-1" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'">{{ edu.year }}</span>
        </div>
      </div>

      <!-- Certifications -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-4 shadow-sm">
        <div class="flex items-center gap-2 pb-3 border-b border-[#EEDCDC] dark:border-white/10">
          <Award class="w-5 h-5" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'" />
          <h3 class="font-bold text-lg text-[#1C1313] dark:text-white">Sertifikasi & Afiliasi</h3>
        </div>
        <div class="space-y-3">
          <div 
            v-for="cert in certifications" 
            :key="cert"
            class="flex items-center gap-3 p-3.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs sm:text-sm font-semibold text-[#1C1313] dark:text-zinc-200"
          >
            <CheckCircle2 class="w-4.5 h-4.5 text-emerald-400 shrink-0" />
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
