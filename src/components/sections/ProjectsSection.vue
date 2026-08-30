<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { 
  ArrowUpRight, 
  ArrowRight,
  Sparkles, 
  LayoutGrid, 
  Columns,
  ExternalLink,
  CheckCircle2,
  TrendingUp
} from 'lucide-vue-next'
import { projects } from '@/data/portfolioData'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const router = useRouter()

// View Mode: 'showcase' (Interactive Split Stage) | 'grid' (Classic Cards)
const viewMode = ref('showcase')

// Selected Category Filter
const selectedCategory = ref('All')
const categories = ['All', 'Product Design', 'UX Design', 'Product Management', 'Design System']

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects
  }
  return projects.filter(p => p.category === selectedCategory.value)
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

// 3D Tilt & Mouse Parallax on Stage
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

const handleStageMouseEnter = () => {
  isStageHovered.value = true
}

const handleStageMouseLeave = () => {
  isStageHovered.value = false
  tiltX.value = 0
  tiltY.value = 0
}

// Scroll Reveal
const sectionRef = ref(null)
const { observeAll } = useScrollReveal()

onMounted(() => {
  observeAll(sectionRef.value)
})
</script>

<template>
  <section ref="sectionRef" class="py-14 sm:py-20 relative overflow-hidden scroll-mt-28" id="works">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
      
      <!-- ═══════════════════════════════════════════ -->
      <!-- TOP HEADER & FILTER BAR                     -->
      <!-- ═══════════════════════════════════════════ -->
      <div data-reveal="fade-up" class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div class="space-y-3 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase text-[#9E0402] dark:text-[#ff4d4d] shadow-xs">
            <Sparkles class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
            <span>Selected Case Studies /2026/</span>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-[#1C1313] dark:text-white">
            Featured Works & <span class="text-[#9E0402] dark:text-[#ff3b38]">Craft</span>
          </h2>
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-xl">
            Riset pengguna mendalam, strategi produk end-to-end, dan antarmuka terukur yang mengubah insight menjadi produk bernilai tinggi.
          </p>
        </div>

        <!-- Right: View Switcher & Archive Link -->
        <div class="flex items-center gap-3 flex-wrap">
          <div class="p-1 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-center gap-1 shadow-xs">
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

          <RouterLink
            to="/projects"
            class="px-5 py-2.5 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 hover:border-[#9E0402]/40 text-[#9E0402] dark:text-[#ff4d4d] text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>All Works ({{ projects.length }})</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </RouterLink>
        </div>
      </div>

      <!-- Categories Filter Tabs -->
      <div data-reveal="fade-up" data-reveal-delay="1" class="flex items-center justify-between gap-4 flex-wrap pb-1">
        <div class="flex flex-wrap gap-2 overflow-x-auto">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat; activeIndex = 0"
            class="px-4 py-1.5 rounded-full text-xs font-mono-tag uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap font-bold"
            :class="[
              selectedCategory === cat 
                ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/25' 
                : 'bg-white dark:bg-[#15161B] text-[#5C4848] dark:text-zinc-300 hover:text-[#9E0402] dark:hover:text-white hover:border-[#9E0402]/40 border border-[#EEDCDC] dark:border-white/10'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">
          Showing {{ filteredProjects.length }} Case Studies
        </span>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- VIEW 1: INTERACTIVE SPLIT STAGE             -->
      <!-- Clean, Spacious, Benjamin Creative Vibe     -->
      <!-- ═══════════════════════════════════════════ -->
      <transition name="view-fade" mode="out-in">
        
        <div 
          v-if="viewMode === 'showcase' && activeProject" 
          key="showcase"
          class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          <!-- LEFT: Clean Vertical Project Index List -->
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
                <!-- Active Indicator Line on Left -->
                <div 
                  v-if="activeIndex === idx"
                  class="absolute left-0 top-3 bottom-3 w-1.5 bg-[#9E0402] dark:bg-[#ff4d4d] rounded-r-full"
                ></div>

                <!-- Top Row: Index & Category -->
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

                <!-- Project Title -->
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

                  <!-- Expandable Summary & Tags for Active Item -->
                  <div v-if="activeIndex === idx" class="space-y-2.5 pt-1.5">
                    <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed line-clamp-2">
                      {{ p.description }}
                    </p>

                    <!-- Tags -->
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

                <!-- Bottom CTA Link for Active Item -->
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

          <!-- RIGHT: Large Cinematic Mockup Stage (Matching Height) -->
          <div class="lg:col-span-7 flex flex-col h-full">
            <div 
              ref="stageRef"
              @mousemove="handleStageMouseMove"
              @mouseenter="handleStageMouseEnter"
              @mouseleave="handleStageMouseLeave"
              @click="navigateToProject(activeProject.id)"
              class="w-full h-full min-h-[440px] p-3 sm:p-4 rounded-[36px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden group cursor-pointer select-none"
            >
              <!-- Dynamic Shine Spotlight -->
              <div 
                class="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 rounded-[36px]"
                :style="{
                  opacity: isStageHovered ? 1 : 0,
                  background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.2) 0%, rgba(158, 4, 2, 0.08) 45%, transparent 70%)`
                }"
              ></div>

              <!-- Main Viewport Image with Absolute Fill -->
              <div class="relative overflow-hidden rounded-[26px] bg-[#14161D] shadow-inner flex-1 w-full h-full min-h-[360px]">
                <img 
                  :src="activeProject.image" 
                  :alt="activeProject.title"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30"></div>

                <!-- Top Badges Row -->
                <div class="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                  <span class="px-3.5 py-1 text-xs font-bold font-mono-tag uppercase rounded-xl bg-black/70 text-white border border-white/20 backdrop-blur-md shadow-sm">
                    {{ activeProject.category }}
                  </span>

                  <!-- Metric badge if available -->
                  <span 
                    v-if="activeProject.detail?.results?.length" 
                    class="px-3.5 py-1 text-xs font-bold font-mono-tag uppercase rounded-xl bg-[#9E0402] text-white border border-white/20 backdrop-blur-md shadow-md flex items-center gap-1.5"
                  >
                    <TrendingUp class="w-3.5 h-3.5" />
                    <span>{{ activeProject.detail.results[0].metric }}: {{ activeProject.detail.results[0].after }}</span>
                  </span>
                </div>

                <!-- Hover Center Explore Pill -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                  <span class="px-7 py-3.5 rounded-full bg-[#9E0402] hover:bg-[#B80604] text-white font-mono-tag font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                    <span>Explore Case Study</span>
                    <ArrowUpRight class="w-4 h-4" />
                  </span>
                </div>

                <!-- Bottom Title & Action Strip -->
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
  </section>
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
