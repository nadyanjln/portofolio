<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import { projects } from '@/data/portfolioData'
import ProjectCard from '@/components/ui/ProjectCard.vue'

const selectedCategory = ref('All')
const categories = ['All', 'Product Design', 'UX Design', 'Product Management', 'Design System']

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects
  }
  return projects.filter(p => p.category === selectedCategory.value)
})
</script>

<template>
  <section class="py-10 sm:py-16 relative" id="works">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
      
      <!-- Big Bento Header Container (#9E0402 Crimson) -->
      <div class="bento-primary p-8 sm:p-12 lg:p-14 rounded-[32px] sm:rounded-[40px] relative overflow-hidden">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
          <div class="space-y-3.5 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#9E0402] border border-white/30 text-xs font-mono-tag uppercase tracking-wider font-bold shadow-xs">
              <span>Featured Works /2026/</span>
            </div>
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.95] text-white">
              Selected Works & Case Studies
            </h2>
            <p class="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl">
              Riset mendalam, strategi produk, dan desain antarmuka berbasis data untuk startup dan enterprise.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <RouterLink
              to="/projects"
              class="px-6 py-3 rounded-full bg-white text-[#9E0402] hover:bg-[#FFF9F9] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 shrink-0"
            >
              <span>View Archive</span>
              <ArrowUpRight class="w-4 h-4 text-[#9E0402]" />
            </RouterLink>
          </div>
        </div>

        <!-- Watermark Number in Background -->
        <span class="absolute -bottom-8 -right-3 text-8xl sm:text-[160px] font-black text-black/10 select-none pointer-events-none font-mono-tag">
          /04/
        </span>
      </div>

      <!-- Filter Controls with Clean White/Dark Pills -->
      <div class="flex items-center justify-between gap-4 flex-wrap pb-1">
        <div class="flex flex-wrap gap-2 overflow-x-auto">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
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

      <!-- Projects Grid with 3D Tilt Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id" 
          :project="project" 
        />
      </div>

    </div>
  </section>
</template>
