<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  LayoutGrid, 
  Columns,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  ChevronDown,
  Filter
} from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const router = useRouter()
const { projects, currentProfile } = usePortfolioStore()

// View Mode: 'showcase' (Interactive Split Stage) | 'grid' (Classic Cards)
const viewMode = ref('showcase')

// Selected Category Filter
const selectedCategory = ref('All')
const categories = computed(() => {
  const cats = Array.from(new Set((projects.value || []).map(p => p.category).filter(Boolean)))
  return ['All', ...cats]
})

const getCategoryCount = (cat) => {
  if (cat === 'All') return (projects.value || []).length
  return (projects.value || []).filter(p => p.category === cat).length
}

const filteredProjects = computed(() => {
  const list = projects.value || []
  if (selectedCategory.value === 'All') {
    return list
  }
  return list.filter(p => p.category === selectedCategory.value)
})

// Active Selected Project
const activeIndex = ref(0)
const activeProject = computed(() => {
  const list = filteredProjects.value || []
  if (!list.length) return (projects.value && projects.value[0]) || null
  return list[activeIndex.value] || list[0]
})

const selectProject = (idx) => {
  activeIndex.value = idx
}

const navigateToProject = (id) => {
  router.push(`/${currentProfile.value}/projects/${id}`)
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

watch(currentProfile, () => {
  nextTick(() => {
    observeAll(sectionRef.value)
  })
})
</script>

<template>
  <section ref="sectionRef" class="py-16 sm:py-24 relative scroll-mt-28" id="works">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- 2-Column Sticky Pin-and-Scroll Layout (Benjamin Creative Style) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        <!-- ══════════════════════════════════════════════════════
             LEFT COLUMN: STICKY PINNED PANEL ("DI-HOLD")
             ══════════════════════════════════════════════════════ -->
        <div class="lg:col-span-5 relative self-stretch">
          <div class="lg:sticky lg:top-28 sm:lg:top-32 space-y-6 sm:space-y-8 select-none">
          
            <!-- Category Index & Section Badge -->
            <div class="flex items-center gap-2.5">
            <span 
              class="px-3 py-1 rounded-full text-xs font-mono-tag font-bold tracking-wider uppercase border"
              :class="currentProfile === 'raqwan'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-[#FB4617]/10 text-[#FB4617] dark:text-[#FB4617] border-[#FB4617]/20'"
            >
              (01) / WORKS
            </span>
            <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-500 uppercase">
              • Case Studies /2026/
            </span>
          </div>

          <!-- Giant Editorial Title -->
          <div class="space-y-4">
            <h2 
              class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95] text-[#1C1313] dark:text-white"
            >
              <span v-if="currentProfile === 'raqwan'">
                Selected Works & <br />
                <span class="text-[#047857] dark:text-emerald-400">AI Craft</span>
              </span>
              <span v-else>
                Selected Works & <br />
                <span class="text-[#FB4617] dark:text-[#FB4617]">Product Craft</span>
              </span>
            </h2>

            <!-- Heavy Solid Accent Bar (Benjamin Style) -->
            <div 
              class="w-36 sm:w-48 h-2 rounded-full transition-all duration-500"
              :class="currentProfile === 'raqwan' ? 'bg-[#047857] dark:bg-emerald-400' : 'bg-[#FB4617] dark:bg-[#FB4617]'"
            ></div>
          </div>

          <!-- Monospace Trademark Tag & Statement Paragraph -->
          <div class="space-y-3 pt-2">
            <span class="font-mono-tag text-xs font-bold text-[#5C4848] dark:text-zinc-400 tracking-wider block uppercase">
              {{ currentProfile === 'raqwan' ? '(DEEP-VISION® — 2026)' : '(UX-STRATEGY® — 2026)' }}
            </span>

            <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed font-sans max-w-md">
              <span v-if="currentProfile === 'raqwan'">
                Sistem kecerdasan buatan end-to-end — dari Computer Vision dan NLP canggih hingga Autonomous Agentic AI & Generative Modeling berakurasi tinggi.
              </span>
              <span v-else>
                Riset pengguna mendalam, strategi produk end-to-end, dan antarmuka terukur yang mengubah insight menjadi produk bernilai tinggi bagi bisnis dan pengguna.
              </span>
            </p>
          </div>

          <!-- Filter & Controls Toolbar in Left Sticky Column -->
          <div class="space-y-3 pt-2">
            <!-- Category Filter Dropdown -->
            <div class="relative w-full">
              <div class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <Filter class="w-4 h-4" :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'" />
              </div>
              <select
                v-model="selectedCategory"
                @change="activeIndex = 0"
                class="w-full appearance-none pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#14161D] border text-xs sm:text-sm font-mono-tag font-bold tracking-wide outline-none cursor-pointer transition-all shadow-xs"
                :class="currentProfile === 'raqwan' 
                  ? 'border-emerald-300/60 dark:border-white/10 text-zinc-900 dark:text-white focus:border-emerald-500 hover:border-emerald-400' 
                  : 'border-orange-300/60 dark:border-white/10 text-zinc-900 dark:text-white focus:border-[#FB4617] hover:border-orange-400'"
              >
                <option 
                  v-for="cat in categories" 
                  :key="cat" 
                  :value="cat" 
                  class="bg-white dark:bg-[#14161D] text-zinc-900 dark:text-white py-2"
                >
                  {{ cat === 'All' ? 'Semua Kategori (All Works)' : cat }} ({{ getCategoryCount(cat) }})
                </option>
              </select>
              <ChevronDown class="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <!-- View Switcher & Link -->
            <div class="flex items-center gap-2 pt-1 flex-wrap">
              <div class="p-1 rounded-xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-center gap-1 shadow-xs">
                <button
                  @click="viewMode = 'showcase'"
                  class="px-3 py-1.5 rounded-lg text-xs font-mono-tag font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer"
                  :class="[
                    viewMode === 'showcase' 
                      ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white shadow-xs' : 'bg-[#FB4617] text-white shadow-xs')
                      : 'text-[#5C4848] dark:text-zinc-400 hover:text-black dark:hover:text-white'
                  ]"
                >
                  <Columns class="w-3.5 h-3.5 shrink-0" />
                  <span>Stream</span>
                </button>

                <button
                  @click="viewMode = 'grid'"
                  class="px-3 py-1.5 rounded-lg text-xs font-mono-tag font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer"
                  :class="[
                    viewMode === 'grid' 
                      ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white shadow-xs' : 'bg-[#FB4617] text-white shadow-xs')
                      : 'text-[#5C4848] dark:text-zinc-400 hover:text-black dark:hover:text-white'
                  ]"
                >
                  <LayoutGrid class="w-3.5 h-3.5 shrink-0" />
                  <span>Grid</span>
                </button>
              </div>

              <RouterLink
                :to="'/' + currentProfile + '/projects'"
                class="px-4 py-2 rounded-xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors"
                :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400 hover:border-[#047857]/60' : 'text-[#FB4617] dark:text-[#FB4617] hover:border-[#FB4617]/40'"
              >
                <span>All ({{ projects.length }})</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </RouterLink>
            </div>
          </div>

          <!-- Large Minimalist Arrow Graphic (Benjamin Style) -->
          <div class="pt-6 hidden lg:block opacity-15 dark:opacity-20 hover:opacity-30 transition-opacity pointer-events-none">
            <ArrowUpRight 
              class="w-36 h-36" 
              :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#FB4617] dark:text-[#FB4617]'" 
            />
          </div>
        </div>
      </div>

        <!-- ══════════════════════════════════════════════════════
             RIGHT COLUMN: SCROLLABLE PROJECT CARDS (STREAM / GRID)
             ══════════════════════════════════════════════════════ -->
        <div class="lg:col-span-7 space-y-8 sm:space-y-10">
          
          <!-- STREAM MODE (Benjamin Creative Featured Cards) -->
          <div v-if="viewMode === 'showcase'" class="space-y-8 sm:space-y-10">
            <div
              v-for="(p, idx) in filteredProjects"
              :key="p.id"
              class="rounded-3xl sm:rounded-[36px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/50' : 'hover:border-[#FB4617]/40'"
            >
              <!-- Card Image Viewport with Hover Zoom -->
              <div 
                class="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-zinc-900 cursor-pointer"
                @click="navigateToProject(p.id)"
              >
                <img 
                  :src="p.image" 
                  :alt="p.title"
                  class="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>

                <!-- Top Floating Pills -->
                <div class="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                  <!-- Benjamin Creative Style Number Badge -->
                  <div 
                    class="px-3 py-1 rounded-sm font-mono-tag font-bold text-xs text-white uppercase tracking-wider shadow-sm"
                    :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
                  >
                    ({{ String(idx + 1).padStart(2, '0') }})
                  </div>

                  <!-- Category Tag -->
                  <span class="px-3.5 py-1 text-xs font-bold font-mono-tag uppercase rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md">
                    {{ p.category }}
                  </span>
                </div>

                <!-- Hover Center Explore Pill -->
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                  <span 
                    class="px-6 py-3 rounded-full text-white font-mono-tag font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform"
                    :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
                  >
                    <span>Explore Case Study</span>
                    <ArrowUpRight class="w-4 h-4" />
                  </span>
                </div>

                <!-- Bottom Image Bar (Metric if exists) -->
                <div 
                  v-if="p.detail?.results?.length" 
                  class="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-white text-xs font-mono-tag"
                >
                  <div class="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <TrendingUp class="w-3.5 h-3.5" />
                    <span>{{ p.detail.results[0].metric }}: {{ p.detail.results[0].after }}</span>
                  </div>
                  <span v-if="p.detail.duration" class="text-zinc-400">
                    {{ p.detail.duration }}
                  </span>
                </div>
              </div>

              <!-- Card Content Area -->
              <div class="p-6 sm:p-8 space-y-4">
                <!-- Title -->
                <h3 
                  @click="navigateToProject(p.id)"
                  class="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1313] dark:text-white group-hover:underline cursor-pointer transition-colors"
                  :class="currentProfile === 'raqwan' ? 'group-hover:text-emerald-400' : 'group-hover:text-[#FB4617] dark:group-hover:text-[#FB4617]'"
                >
                  {{ p.title }}
                </h3>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed line-clamp-3">
                  {{ p.description }}
                </p>

                <!-- Tags Row -->
                <div class="flex flex-wrap gap-1.5 pt-1">
                  <span 
                    v-for="tag in p.tags" 
                    :key="tag" 
                    class="px-2.5 py-1 text-[11px] font-bold font-mono-tag rounded-lg"
                    :class="currentProfile === 'raqwan' 
                      ? 'bg-emerald-50 dark:bg-[#047857]/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-[#047857]/40' 
                      : 'bg-orange-50 dark:bg-[#FB4617]/15 text-orange-900 dark:text-[#FB4617] border border-orange-200 dark:border-[#FB4617]/40'"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Footer Action Strip -->
                <div class="pt-4 border-t border-[#EEDCDC] dark:border-white/10 flex items-center justify-between">
                  <RouterLink
                    :to="'/' + currentProfile + '/projects/' + p.id"
                    class="text-xs font-bold font-mono-tag uppercase flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#FB4617] dark:text-[#FB4617]'"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight class="w-3.5 h-3.5" />
                  </RouterLink>

                  <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 font-semibold">
                    Case Study ↗
                  </span>
                </div>
              </div>

            </div>
          </div>

          <!-- GRID MODE -->
          <div 
            v-else 
            class="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <ProjectCard 
              v-for="project in filteredProjects" 
              :key="project.id" 
              :project="project" 
            />
          </div>

        </div>

      </div>

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
