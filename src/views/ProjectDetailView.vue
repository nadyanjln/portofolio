<script setup>
import { computed } from 'vue'
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
  BookOpen
} from 'lucide-vue-next'
import { projects } from '@/data/portfolioData'

const route = useRoute()

const project = computed(() => {
  return projects.find(p => p.id === route.params.id) || null
})

const detail = computed(() => project.value?.detail || null)

// Next/Prev Project Navigation helpers
const allProjects = computed(() => projects)
const currentIndex = computed(() => projects.findIndex(p => p.id === route.params.id))
const prevProject = computed(() => {
  if (currentIndex.value > 0) return projects[currentIndex.value - 1]
  return projects[projects.length - 1]
})
const nextProject = computed(() => {
  if (currentIndex.value < projects.length - 1) return projects[currentIndex.value + 1]
  return projects[0]
})
</script>

<template>
  <div class="pt-24 pb-14 sm:pt-28 sm:pb-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Back Link -->
    <RouterLink
      to="/projects"
      class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono-tag text-[#5C4848] hover:text-[#9E0402] mb-5 sm:mb-6 transition-colors group uppercase tracking-wider"
    >
      <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      <span>Kembali ke Daftar Proyek</span>
    </RouterLink>

    <div v-if="project" class="space-y-10 sm:space-y-12">

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 1: Hero Header                     -->
      <!-- ═══════════════════════════════════════════ -->
      <div class="space-y-3 sm:space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3.5 py-1 text-xs font-bold font-mono-tag uppercase rounded-lg bg-white text-[#9E0402] border border-[#EEDCDC]">
            {{ project.category }}
          </span>
          <span v-if="detail" class="px-3.5 py-1 text-xs font-medium font-mono-tag rounded-lg bg-white text-[#5C4848] border border-[#EEDCDC]">
            {{ detail.duration }}
          </span>
        </div>
        <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1C1313] leading-tight">
          {{ project.title }}
        </h1>
        <p class="text-sm sm:text-base md:text-lg text-[#5C4848] leading-relaxed max-w-4xl">
          {{ project.description }}
        </p>
      </div>

      <!-- Hero Image -->
      <div class="p-2 sm:p-3 rounded-[32px] bg-white border border-[#EEDCDC] overflow-hidden shadow-sm">
        <img 
          :src="project.image" 
          :alt="project.title"
          class="w-full aspect-video md:aspect-[21/9] object-cover rounded-2xl"
          loading="lazy"
        />
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 2: Project Meta Info Cards          -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <!-- Role -->
        <div class="p-5 rounded-2xl bg-white border border-[#EEDCDC] space-y-1.5 shadow-xs">
          <div class="flex items-center gap-2 text-[#9E0402]">
            <UserCircle class="w-4 h-4" />
            <span class="text-xs font-bold font-mono-tag uppercase tracking-wider">Peran Saya</span>
          </div>
          <p class="text-sm font-bold text-[#1C1313]">{{ detail.role }}</p>
        </div>
        <!-- Duration -->
        <div class="p-5 rounded-2xl bg-white border border-[#EEDCDC] space-y-1.5 shadow-xs">
          <div class="flex items-center gap-2 text-[#9E0402]">
            <Clock class="w-4 h-4" />
            <span class="text-xs font-bold font-mono-tag uppercase tracking-wider">Durasi</span>
          </div>
          <p class="text-sm font-bold text-[#1C1313]">{{ detail.duration }}</p>
        </div>
        <!-- Team -->
        <div class="p-5 rounded-2xl bg-white border border-[#EEDCDC] space-y-1.5 shadow-xs">
          <div class="flex items-center gap-2 text-[#9E0402]">
            <Users class="w-4 h-4" />
            <span class="text-xs font-bold font-mono-tag uppercase tracking-wider">Tim</span>
          </div>
          <p class="text-sm font-bold text-[#1C1313]">{{ detail.team.length }} Anggota</p>
        </div>
        <!-- Tools -->
        <div class="p-5 rounded-2xl bg-white border border-[#EEDCDC] space-y-1.5 shadow-xs">
          <div class="flex items-center gap-2 text-[#9E0402]">
            <Wrench class="w-4 h-4" />
            <span class="text-xs font-bold font-mono-tag uppercase tracking-wider">Tools</span>
          </div>
          <p class="text-sm font-bold text-[#1C1313]">{{ detail.tools.length }} Tools</p>
        </div>
      </div>

      <!-- Tags & Prototype CTA row -->
      <div class="p-5 rounded-2xl bg-white border border-[#EEDCDC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div class="flex flex-wrap gap-1.5">
          <span 
            v-for="tag in project.tags" 
            :key="tag"
            class="px-3 py-1 text-xs font-bold font-mono-tag rounded-lg bg-[#FDF6F6] text-[#1E3A60] border border-[#EEDCDC]"
          >
            {{ tag }}
          </span>
        </div>
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#9E0402] hover:bg-[#B80604] text-white font-bold text-xs sm:text-sm font-mono-tag uppercase flex items-center justify-center gap-2 shadow-md shadow-[#9E0402]/20 hover:scale-105 transition-all"
        >
          <ExternalLink class="w-4 h-4" />
          <span>View Prototype / Live ↗</span>
        </a>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 3: Overview                        -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail" class="space-y-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 text-[#1E3A60] flex items-center justify-center shrink-0">
            <BookOpen class="w-4 h-4" />
          </div>
          <h2 class="text-2xl font-extrabold text-[#1C1313]">Overview</h2>
        </div>
        <div class="pl-0 sm:pl-10">
          <p class="text-[#5C4848] leading-relaxed text-sm sm:text-base">
            {{ detail.overview }}
          </p>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 4: Team & Tools Detail             -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail" class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <!-- Team Roster -->
        <div class="p-6 sm:p-7 rounded-2xl bg-white border border-[#EEDCDC] space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-[#1C1313]">
            <Users class="w-4 h-4 text-[#9E0402]" />
            <h3 class="font-bold text-base">Komposisi Tim</h3>
          </div>
          <ul class="space-y-2">
            <li 
              v-for="(member, idx) in detail.team" 
              :key="idx"
              class="flex items-start gap-2.5 text-xs sm:text-sm text-[#5C4848]"
            >
              <div class="w-2 h-2 rounded-full bg-[#9E0402] mt-1.5 shrink-0"></div>
              <span>{{ member }}</span>
            </li>
          </ul>
        </div>

        <!-- Tools Used -->
        <div class="p-6 sm:p-7 rounded-2xl bg-white border border-[#EEDCDC] space-y-3 shadow-xs">
          <div class="flex items-center gap-2 text-[#1C1313]">
            <Wrench class="w-4 h-4 text-[#9E0402]" />
            <h3 class="font-bold text-base">Tools yang Digunakan</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tool in detail.tools" 
              :key="tool"
              class="px-3.5 py-1.5 text-xs font-bold font-mono-tag rounded-xl bg-[#FDF6F6] text-[#1C1313] border border-[#EEDCDC] hover:border-[#9E0402]/50 transition-colors shadow-xs"
            >
              {{ tool }}
            </span>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 5: Problem Statement               -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail?.problem" class="space-y-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9E0402]/15 text-[#9E0402] flex items-center justify-center shrink-0">
            <AlertTriangle class="w-4 h-4" />
          </div>
          <h2 class="text-2xl font-extrabold text-[#1C1313]">{{ detail.problem.title }}</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pl-0 sm:pl-10">
          <div 
            v-for="(point, idx) in detail.problem.points" 
            :key="idx"
            class="p-5 rounded-2xl bg-white border border-[#EEDCDC] flex items-start gap-3.5 shadow-xs"
          >
            <span class="text-[#9E0402] font-bold font-mono-tag text-base shrink-0">{{ String(idx + 1).padStart(2, '0') }}</span>
            <p class="text-xs sm:text-sm text-[#5C4848] leading-relaxed">{{ point }}</p>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 6: Process / Phases                -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail?.process" class="space-y-5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 text-[#1E3A60] flex items-center justify-center shrink-0">
            <ChevronRight class="w-4 h-4" />
          </div>
          <h2 class="text-2xl font-extrabold text-[#1C1313]">Proses & Tahapan Eksekusi</h2>
        </div>

        <div class="pl-0 sm:pl-10 space-y-4 relative">
          <!-- Process Cards -->
          <div 
            v-for="(step, idx) in detail.process" 
            :key="idx"
            class="p-6 sm:p-7 rounded-2xl bg-white border border-[#EEDCDC] space-y-3 shadow-xs hover:border-[#9E0402]/40 transition-colors"
          >
            <div class="flex items-start gap-3.5">
              <div class="w-9 h-9 rounded-xl bg-[#9E0402] flex items-center justify-center text-white font-bold font-mono-tag text-sm shrink-0 shadow-md shadow-[#9E0402]/20">
                {{ String(idx + 1).padStart(2, '0') }}
              </div>
              <div class="space-y-1 min-w-0">
                <h3 class="text-base font-bold text-[#1C1313]">{{ step.phase }}</h3>
                <p class="text-xs sm:text-sm text-[#5C4848] leading-relaxed">{{ step.description }}</p>
              </div>
            </div>

            <!-- Deliverables -->
            <div v-if="step.deliverables?.length" class="sm:ml-12 space-y-1.5 pt-1">
              <span class="text-xs font-bold font-mono-tag uppercase tracking-wider text-[#9E0402] block">Deliverables & Output:</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div 
                  v-for="(del, dIdx) in step.deliverables" 
                  :key="dIdx"
                  class="flex items-start gap-2 text-xs text-[#1C1313] bg-[#FDF6F6] px-3 py-2 rounded-xl border border-[#EEDCDC] font-medium"
                >
                  <CheckCircle2 class="w-3.5 h-3.5 text-[#9E0402] shrink-0 mt-0.5" />
                  <span>{{ del }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 7: Results / Impact Metrics        -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail?.results" class="space-y-5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9E0402]/15 text-[#9E0402] flex items-center justify-center shrink-0">
            <TrendingUp class="w-4 h-4" />
          </div>
          <h2 class="text-2xl font-extrabold text-[#1C1313]">Hasil & Dampak Terukur</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 pl-0 sm:pl-10">
          <div 
            v-for="(res, idx) in detail.results" 
            :key="idx"
            class="p-5 sm:p-6 rounded-2xl bg-white border border-[#EEDCDC] space-y-3 flex flex-col justify-between hover:border-[#9E0402]/40 transition-colors shadow-xs"
          >
            <span class="text-xs font-bold font-mono-tag text-[#5C4848] uppercase tracking-wider block">
              {{ res.metric }}
            </span>

            <!-- Before → After -->
            <div class="flex items-center justify-between gap-2 py-0.5">
              <div v-if="res.before !== 'N/A' && res.before !== '0'">
                <span class="text-[10px] font-mono-tag text-[#5C4848] block">Before</span>
                <p class="text-sm font-bold text-[#5C4848] line-through">{{ res.before }}</p>
              </div>
              <ArrowUpRight v-if="res.before !== 'N/A' && res.before !== '0'" class="w-4 h-4 text-[#5C4848] shrink-0" />
              <div>
                <span class="text-[10px] font-mono-tag text-[#5C4848] block">{{ res.before === 'N/A' || res.before === '0' ? 'Result' : 'After' }}</span>
                <p class="text-2xl sm:text-3xl font-extrabold text-[#9E0402]">{{ res.after }}</p>
              </div>
            </div>

            <!-- Change Badge -->
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono-tag border bg-[#9FC2EA]/30 text-[#1E3A60] border-[#9FC2EA]/60 w-fit">
              <TrendingUp class="w-3.5 h-3.5 text-[#1E3A60]" />
              <span>{{ res.change }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 8: Gallery                         -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail?.gallery?.length" class="space-y-5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 text-[#1E3A60] flex items-center justify-center shrink-0">
            <ImageIcon class="w-4 h-4" />
          </div>
          <h2 class="text-2xl font-extrabold text-[#1C1313]">Galeri Proses & Desain</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pl-0 sm:pl-10">
          <div 
            v-for="(item, idx) in detail.gallery" 
            :key="idx"
            class="group p-3 rounded-2xl bg-white border border-[#EEDCDC] overflow-hidden hover:border-[#9E0402]/40 transition-all duration-300 flex flex-col justify-between shadow-xs"
          >
            <div class="overflow-hidden rounded-xl aspect-[4/3] bg-[#FDF6F6]">
              <img 
                :src="item.image" 
                :alt="item.caption"
                class="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            <p class="text-xs text-[#5C4848] text-center mt-2.5 mb-0.5 px-2 font-semibold">{{ item.caption }}</p>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- SECTION 9: Key Learnings                   -->
      <!-- ═══════════════════════════════════════════ -->
      <div v-if="detail?.learnings?.length" class="space-y-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9E0402]/15 text-[#9E0402] flex items-center justify-center shrink-0">
            <Lightbulb class="w-4 h-4" />
          </div>
          <h2 class="text-2xl font-extrabold text-[#1C1313]">Key Learnings & Takeaways</h2>
        </div>

        <div class="space-y-2.5 pl-0 sm:pl-10">
          <div 
            v-for="(learning, idx) in detail.learnings" 
            :key="idx"
            class="p-5 rounded-2xl bg-white border border-[#EEDCDC] flex items-start gap-3.5 shadow-xs"
          >
            <div class="w-7 h-7 rounded-xl bg-[#9E0402] text-white flex items-center justify-center text-xs font-bold font-mono-tag shrink-0">
              {{ String(idx + 1).padStart(2, '0') }}
            </div>
            <p class="text-xs sm:text-sm text-[#5C4848] leading-relaxed">{{ learning }}</p>
          </div>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- Navigation: Prev / Next Case Study         -->
      <!-- ═══════════════════════════════════════════ -->
      <div class="border-t border-[#EEDCDC] pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Prev Project -->
        <RouterLink
          v-if="prevProject"
          :to="'/projects/' + prevProject.id"
          class="p-5 rounded-2xl bg-white border border-[#EEDCDC] hover:border-[#9E0402]/40 transition-all group flex items-center gap-3.5 shadow-xs"
        >
          <div class="w-9 h-9 rounded-xl bg-[#FFF9F9] flex items-center justify-center text-[#1C1313] group-hover:text-white group-hover:bg-[#9E0402] transition-colors shrink-0 shadow-xs">
            <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <div class="min-w-0">
            <span class="text-[10px] font-mono-tag text-[#5C4848] block uppercase font-bold tracking-wider">Previous Case Study</span>
            <span class="text-xs sm:text-sm font-bold text-[#1C1313] group-hover:text-[#9E0402] transition-colors truncate block">
              {{ prevProject.title }}
            </span>
          </div>
        </RouterLink>

        <!-- Next Project -->
        <RouterLink
          v-if="nextProject"
          :to="'/projects/' + nextProject.id"
          class="p-5 rounded-2xl bg-white border border-[#EEDCDC] hover:border-[#9E0402]/40 transition-all group flex items-center justify-between gap-3.5 text-right shadow-xs"
        >
          <div class="min-w-0 flex-1">
            <span class="text-[10px] font-mono-tag text-[#5C4848] block uppercase font-bold tracking-wider">Next Case Study</span>
            <span class="text-xs sm:text-sm font-bold text-[#1C1313] group-hover:text-[#9E0402] transition-colors truncate block">
              {{ nextProject.title }}
            </span>
          </div>
          <div class="w-9 h-9 rounded-xl bg-[#FFF9F9] flex items-center justify-center text-[#1C1313] group-hover:text-white group-hover:bg-[#9E0402] transition-colors shrink-0 shadow-xs">
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </RouterLink>
      </div>

    </div>

    <!-- 404 Project Not Found -->
    <div v-else class="text-center py-16 space-y-3 p-8 rounded-3xl bg-white border border-[#EEDCDC]">
      <Sparkles class="w-8 h-8 text-[#9E0402] mx-auto" />
      <h2 class="text-2xl font-bold text-[#1C1313]">Proyek Tidak Ditemukan</h2>
      <p class="text-xs sm:text-sm text-[#5C4848]">Proyek dengan ID "{{ route.params.id }}" tidak tersedia di database.</p>
      <RouterLink 
        to="/projects"
        class="inline-block px-5 py-2.5 rounded-full bg-[#9E0402] text-white text-xs font-bold font-mono-tag uppercase hover:bg-[#B80604] transition-colors"
      >
        Lihat Semua Proyek
      </RouterLink>
    </div>
  </div>
</template>
