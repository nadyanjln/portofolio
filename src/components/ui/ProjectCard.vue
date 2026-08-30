<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ExternalLink, ArrowRight } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const { currentProfile } = usePortfolioStore()

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const cardRef = ref(null)
const rotateX = ref(0)
const rotateY = ref(0)
const shineX = ref(50)
const shineY = ref(50)
const isHovered = ref(false)

const handleMouseMove = (e) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2

  rotateX.value = -((y - centerY) / centerY) * 5
  rotateY.value = ((x - centerX) / centerX) * 5

  shineX.value = (x / rect.width) * 100
  shineY.value = (y / rect.height) * 100
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
  rotateX.value = 0
  rotateY.value = 0
}
</script>

<template>
  <div 
    ref="cardRef"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    class="relative glass-card rounded-3xl overflow-hidden group flex flex-col h-full [perspective:1000px] transition-all duration-300 ease-out border border-[#EEDCDC] dark:border-white/10 bg-white dark:bg-[#15161B] shadow-xs"
    :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/40'"
    :style="{
      transform: isHovered 
        ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.01)` 
        : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
      transformStyle: 'preserve-3d'
    }"
  >
    <!-- Dynamic Shine Spotlight Layer on Mouse Move -->
    <div 
      class="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-3xl"
      :style="{
        opacity: isHovered ? 1 : 0,
        background: currentProfile === 'raqwan'
          ? `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.15) 0%, rgba(4, 120, 87, 0.12) 40%, transparent 70%)`
          : `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.15) 0%, rgba(158, 4, 2, 0.08) 40%, transparent 70%)`
      }"
    ></div>

    <!-- Image Thumbnail -->
    <div 
      data-cursor-text="VIEW ↗" 
      class="relative overflow-hidden aspect-video bg-[#FDF6F6] dark:bg-[#1C1E24] rounded-t-3xl cursor-pointer"
    >
      <img 
        :src="project.image" 
        :alt="project.title"
        class="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
      
      <!-- Category Badge -->
      <div class="absolute top-3.5 left-3.5 z-20">
        <span 
          class="px-3 py-1 text-xs font-bold font-mono-tag uppercase rounded-xl backdrop-blur-md shadow-sm border"
          :class="currentProfile === 'raqwan' ? 'bg-black/80 text-emerald-300 border-[#047857]/50' : 'bg-white/90 dark:bg-black/80 text-[#9E0402] dark:text-[#ff4d4d] border-[#EEDCDC] dark:border-white/15'"
        >
          {{ project.category || 'AI Engineering' }}
        </span>
      </div>

      <!-- Quick Action Button -->
      <div class="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
        <a 
          v-if="project.liveUrl" 
          :href="project.liveUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="p-2.5 rounded-xl bg-white dark:bg-[#15161B] text-zinc-200 border border-white/15 transition-all shadow-md hover:scale-105"
          :class="currentProfile === 'raqwan' ? 'hover:bg-[#047857] hover:text-white' : 'hover:bg-[#9E0402] hover:text-white'"
          title="View Prototype"
        >
          <ExternalLink class="w-4 h-4" />
        </a>
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
      <div class="space-y-2">
        <h3 
          class="text-lg sm:text-xl font-bold text-[#1C1313] dark:text-[#F4F4F6] transition-colors leading-snug"
          :class="currentProfile === 'raqwan' ? 'group-hover:text-emerald-400' : 'group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'"
        >
          {{ project.title }}
        </h3>
        <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400 leading-relaxed line-clamp-2">
          {{ project.description }}
        </p>
      </div>

      <!-- Tags & Detail Link -->
      <div class="space-y-3 pt-3 border-t border-[#EEDCDC] dark:border-white/10">
        <div class="flex flex-wrap gap-1.5">
          <span 
            v-for="tag in project.tags" 
            :key="tag"
            class="px-2.5 py-1 text-[11px] font-bold font-mono-tag rounded-lg transition-colors"
            :class="currentProfile === 'raqwan' ? 'bg-[#047857]/20 text-emerald-300 border border-[#047857]/40' : 'bg-[#9FC2EA]/20 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] border border-[#9FC2EA]/50 dark:border-[#9FC2EA]/30 group-hover:border-[#9E0402]/30'"
          >
            {{ tag }}
          </span>
        </div>

        <RouterLink 
          :to="'/' + currentProfile + '/projects/' + project.id"
          class="inline-flex items-center gap-1.5 text-xs font-bold group-hover:translate-x-1.5 transition-all uppercase tracking-wider font-mono-tag"
          :class="currentProfile === 'raqwan' ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#9E0402] dark:text-[#ff4d4d] hover:text-[#B80604]'"
        >
          <span>Explore Case Study</span>
          <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
