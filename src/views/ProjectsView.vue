<script setup>
import { ref, computed } from 'vue'
import { Search, Sparkles } from 'lucide-vue-next'
import { projects } from '@/data/portfolioData'
import ProjectCard from '@/components/ui/ProjectCard.vue'

const searchQuery = ref('')
const selectedCategory = ref('All')

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
</script>

<template>
  <div class="pt-24 pb-14 sm:pt-28 sm:pb-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
    <!-- Header -->
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

    <!-- Search & Filter Controls Container -->
    <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
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
          @click="selectedCategory = cat"
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

    <!-- Results Grid -->
    <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <ProjectCard 
        v-for="project in filteredProjects" 
        :key="project.id" 
        :project="project" 
      />
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
