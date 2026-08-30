<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { 
  Search, 
  Sparkles, 
  Columns, 
  LayoutGrid, 
  ArrowUpRight, 
  ArrowRight,
  TrendingUp
} from 'lucide-vue-next'
import { projects } from '@/data/portfolioData'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('All')
const viewMode = ref('showcase') // 'showcase' | 'grid'

const categories = ['All', 'Product Design', 'UX Design', 'Product Management', 'Design System']

const filteredProjects = computed(() => {
  return projects.filter(project => {
    const matchesCategory = selectedCategory.value === 'All' || project.category === selectedCategory.value
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()))
    return matchesCategory && matchesSearch
  })
})

// Active Selected Project
const activeIndex = ref(0)
const activeProject = computed(() => {
  if (!filteredProjects.value.length) return projects[0]
  return filteredProjects.value[activeIndex.value] || filteredProjects.value[0]
})

const selectProject = (idx) => {
  activeIndex.value = idx
}

const navigateToProject = (id) => {
  router.push(`/projects/${id}`)
}

// 3D Tilt Stage
const stageRef = ref(null)
const tiltX = ref(0)
const tiltY = ref(0)
const shineX = ref(50)
const shineY = ref(50)
const isStageHovered = ref(false)

const handleStageMouseMove = (e) => {
  if (!stageRef.value) return
  const rect = stageRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  tiltX.value = -((y - centerY) / centerY) * 3
  tiltY.value = ((x - centerX) / centerX) * 3
  shineX.value = (x / rect.width) * 100
  shineY.value = (y / rect.height) * 100
}

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <div ref="sectionRef" class="pt-24 pb-16 sm:pt-28 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
    
    <!-- Header -->
    <div data-reveal="fade-up" class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div class="space-y-3 max-w-3xl">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase text-[#9E0402] dark:text-[#ff4d4d] shadow-xs">
          <Sparkles class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
          <span>Case Studies Archive /2026/</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
          Semua Case Studies & Karya
        </h1>
        <p class="text-[#5C4848] dark:text-zinc-300 text-sm sm:text-base md:text-lg leading-relaxed">
          Kumpulan studi kasus product management, desain UI/UX, dan riset pengguna — dari penemuan insight hingga delivery produk berdampak.
        </p>
      </div>

      <!-- View Switcher Tabs -->
      <div class="p-1 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-center gap-1 shadow-xs self-start lg:self-end">
        <button
          @click="viewMode = 'showcase'"
          class="px-4 py-2 rounded-xl text-xs font-mono-tag font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer"
          :class="[
            viewMode === 'showcase' 
              ? 'bg-[#9E0402] text-white shadow-xs' 
              : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402] dark:hover:text-white'
          ]"
        >
          <Columns class="w-3.5 h-3.5" />
          <span>Interactive View</span>
        </button>

        <button
          @click="viewMode = 'grid'"
          class="px-4 py-2 rounded-xl text-xs font-mono-tag font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer"
          :class="[
            viewMode === 'grid' 
              ? 'bg-[#9E0402] text-white shadow-xs' 
              : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#9E0402] dark:hover:text-white'
          ]"
        >
          <LayoutGrid class="w-3.5 h-3.5" />
          <span>Grid View</span>
        </button>
      </div>
    </div>

    <!-- Search & Filter Controls Container -->
    <div data-reveal="fade-up" data-reveal-delay="1" class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
      <!-- Search Input -->
      <div class="relative w-full md:w-80 lg:w-96">
        <Search class="w-4 h-4 text-[#5C4848] dark:text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari case study, skill, atau kata kunci..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 focus:border-[#9E0402] dark:focus:border-[#ff4d4d] focus:ring-1 focus:ring-[#9E0402] text-xs sm:text-sm text-[#1C1313] dark:text-white placeholder:text-[#94A3B8] outline-none transition-all shadow-xs"
        />
      </div>

      <!-- Categories Filter Tabs -->
      <div class="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat; activeIndex = 0"
          class="px-3.5 py-1.5 rounded-full text-xs font-mono-tag font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap"
          :class="[
            selectedCategory === cat 
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/25' 
              : 'bg-[#FFF9F9] dark:bg-[#1A1C24] text-[#5C4848] dark:text-zinc-300 hover:text-[#9E0402] dark:hover:text-white hover:bg-white dark:hover:bg-[#252834] border border-[#EEDCDC] dark:border-white/10'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- RESULTS VIEW                                -->
    <!-- ═══════════════════════════════════════════ -->
    <div v-if="filteredProjects.length > 0">
      
      <transition name="view-fade" mode="out-in">
        
        <!-- VIEW 1: INTERACTIVE SPLIT STAGE -->
        <div 
          v-if="viewMode === 'showcase' && activeProject" 
          key="showcase"
          class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          <!-- LEFT: Project Index List -->
          <div class="lg:col-span-5 flex flex-col justify-between h-full space-y-2">
            <div 
              class="h-full flex flex-col gap-2.5"
              :class="[
                filteredProjects.length > 4 
                  ? 'max-h-[500px] lg:max-h-[540px] overflow-y-auto custom-scroll pr-1.5 justify-start' 
                  : 'justify-between'
              ]"
            >
              <div
                v-for="(p, idx) in filteredProjects"
                :key="p.id"
                @mouseenter="selectProject(idx)"
                @click="selectProject(idx)"
                class="p-4 sm:p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden shrink-0"
                :class="[
                  activeIndex === idx
                    ? 'bg-white dark:bg-[#14161D] border-[#9E0402] dark:border-[#ff4d4d]/60 shadow-lg shadow-[#9E0402]/5 -translate-y-0.5'
                    : 'bg-white/70 dark:bg-[#14161D]/50 border-[#EEDCDC] dark:border-white/10 hover:border-[#9E0402]/30 hover:bg-white dark:hover:bg-[#14161D]'
                ]"
              >
                <div 
                  v-if="activeIndex === idx"
                  class="absolute left-0 top-3 bottom-3 w-1.5 bg-[#9E0402] dark:bg-[#ff4d4d] rounded-r-full"
                ></div>

                <div class="flex items-center justify-between gap-2 pb-1">
                  <div class="flex items-center gap-2">
                    <span 
                      class="text-xs font-mono-tag font-bold"
                      :class="activeIndex === idx ? 'text-[#9E0402] dark:text-[#ff4d4d]' : 'text-[#5C4848] dark:text-zinc-400'"
                    >
                      ({{ String(idx + 1).padStart(2, '0') }})
                    </span>
                    <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 uppercase font-semibold">
                      {{ p.category }}
                    </span>
                  </div>

                  <span 
                    v-if="p.detail"
                    class="text-[11px] font-mono-tag text-[#5C4848] dark:text-zinc-400 hidden sm:inline-block"
                  >
                    {{ p.detail.duration }}
                  </span>
                </div>

                <div class="space-y-1">
                  <h3 
                    class="text-base sm:text-lg font-bold leading-snug transition-colors"
                    :class="[
                      activeIndex === idx 
                        ? 'text-[#9E0402] dark:text-[#ff4d4d]' 
                        : 'text-[#1C1313] dark:text-white group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'
                    ]"
                  >
                    {{ p.title }}
                  </h3>

                  <div v-if="activeIndex === idx" class="space-y-2.5 pt-1.5">
                    <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed line-clamp-2">
                      {{ p.description }}
                    </p>

                    <div class="flex flex-wrap gap-1.5">
                      <span 
                        v-for="tag in p.tags" 
                        :key="tag"
                        class="px-2 py-0.5 text-[10px] font-bold font-mono-tag rounded-md bg-[#9FC2EA]/20 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] border border-[#9FC2EA]/40"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>

                <div v-if="activeIndex === idx" class="pt-2.5 mt-1.5 border-t border-[#EEDCDC] dark:border-white/10 flex items-center justify-between">
                  <RouterLink
                    :to="'/projects/' + p.id"
                    class="text-xs font-bold font-mono-tag uppercase text-[#9E0402] dark:text-[#ff4d4d] flex items-center gap-1.5 hover:underline"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </RouterLink>

                  <span class="text-xs font-mono-tag text-[#1E3A60] dark:text-[#9FC2EA] font-semibold">
                    Live Preview ↗
                  </span>
                </div>
              </div>
            </div>

            <!-- Scroll Indicator Helper when > 4 projects -->
            <div v-if="filteredProjects.length > 4" class="pt-1.5 text-center text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 flex items-center justify-center gap-1.5">
              <span>Scroll untuk melihat {{ filteredProjects.length - 4 }} proyek lainnya</span>
              <span class="animate-bounce text-[#9E0402] dark:text-[#ff4d4d]">↓</span>
            </div>
          </div>

          <!-- RIGHT: Cinematic Stage (Matching Height) -->
          <div class="lg:col-span-7 flex flex-col h-full">
            <div 
              ref="stageRef"
              @mousemove="handleStageMouseMove"
              @mouseenter="isStageHovered = true"
              @mouseleave="isStageHovered = false; tiltX = 0; tiltY = 0"
              @click="navigateToProject(activeProject.id)"
              class="w-full h-full min-h-[440px] p-3 sm:p-4 rounded-[36px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer select-none"
            >
              <div 
                class="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 rounded-[36px]"
                :style="{
                  opacity: isStageHovered ? 1 : 0,
                  background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.2) 0%, rgba(158, 4, 2, 0.08) 45%, transparent 70%)`
                }"
              ></div>

              <div class="relative overflow-hidden rounded-[26px] bg-[#14161D] shadow-inner flex-1 w-full h-full min-h-[360px]">
                <img 
                  :src="activeProject.image" 
                  :alt="activeProject.title"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30"></div>

                <div class="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                  <span class="px-3.5 py-1 text-xs font-bold font-mono-tag uppercase rounded-xl bg-black/70 text-white border border-white/20 backdrop-blur-md shadow-sm">
                    {{ activeProject.category }}
                  </span>

                  <span 
                    v-if="activeProject.detail?.results?.length" 
                    class="px-3.5 py-1 text-xs font-bold font-mono-tag uppercase rounded-xl bg-[#9E0402] text-white border border-white/20 backdrop-blur-md shadow-md flex items-center gap-1.5"
                  >
                    <TrendingUp class="w-3.5 h-3.5" />
                    <span>{{ activeProject.detail.results[0].metric }}: {{ activeProject.detail.results[0].after }}</span>
                  </span>
                </div>

                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                  <span class="px-7 py-3.5 rounded-full bg-[#9E0402] hover:bg-[#B80604] text-white font-mono-tag font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                    <span>Explore Case Study</span>
                    <ArrowUpRight class="w-4 h-4" />
                  </span>
                </div>

                <div class="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white">
                  <div class="space-y-0.5 min-w-0">
                    <span class="text-[10px] font-mono-tag text-zinc-400 uppercase tracking-wider block">Featured Project</span>
                    <h4 class="text-sm sm:text-base font-bold truncate">{{ activeProject.title }}</h4>
                  </div>

                  <RouterLink
                    :to="'/projects/' + activeProject.id"
                    @click.stop
                    class="px-4 py-2 rounded-xl bg-white text-[#9E0402] hover:bg-[#FFF9F9] font-mono-tag text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-md hover:scale-103 transition-all"
                  >
                    <span>Read Study</span>
                    <ArrowRight class="w-3.5 h-3.5" />
                  </RouterLink>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- VIEW 2: CLASSIC CARDS GRID -->
        <div 
          v-else 
          key="grid"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <ProjectCard 
            v-for="project in filteredProjects" 
            :key="project.id" 
            :project="project" 
          />
        </div>

      </transition>

    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 space-y-3 p-8 rounded-3xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10">
      <Sparkles class="w-8 h-8 text-[#9E0402] dark:text-[#ff4d4d] mx-auto" />
      <h3 class="text-lg font-bold text-[#1C1313] dark:text-white">Tidak ada case study yang sesuai</h3>
      <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">Coba gunakan kata kunci pencarian atau kategori lain.</p>
      <button 
        @click="searchQuery = ''; selectedCategory = 'All'"
        class="mt-1 px-5 py-2.5 rounded-full bg-[#9E0402] text-white text-xs font-bold font-mono-tag uppercase hover:bg-[#B80604] transition-colors"
      >
        Reset Filter
      </button>
    </div>

  </div>
</template>

<style scoped>
.view-fade-enter-active,
.view-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.view-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.view-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
