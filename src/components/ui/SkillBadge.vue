<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const props = defineProps({
  skill: {
    type: Object,
    required: true
  },
  showCategory: {
    type: Boolean,
    default: false
  }
})

const { currentProfile } = usePortfolioStore()

const levelColor = computed(() => {
  const lvl = props.skill.level?.toLowerCase()
  if (lvl === 'expert') {
    return currentProfile.value === 'raqwan'
      ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30'
      : 'bg-rose-50 dark:bg-[#9E0402]/15 text-rose-900 dark:text-[#ff4d4d] border-rose-200 dark:border-[#9E0402]/30'
  }
  if (lvl === 'advanced') {
    return 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30'
  }
  return 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-white/10'
})
</script>

<template>
  <div 
    class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 hover:border-[#047857]/60 dark:hover:border-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs group cursor-default"
    :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60' : 'hover:border-[#9E0402]/50'"
  >
    <!-- Status Indicator Dot -->
    <span 
      class="w-1.5 h-1.5 rounded-full shrink-0 group-hover:scale-125 transition-transform"
      :class="currentProfile === 'raqwan' ? 'bg-emerald-500' : 'bg-[#9E0402] dark:bg-[#ff4d4d]'"
    ></span>

    <!-- Skill Name (Full, Never Truncated) -->
    <span class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-[#F4F4F6] whitespace-nowrap">
      {{ skill.name }}
    </span>

    <!-- Level Pill -->
    <span 
      v-if="skill.level" 
      class="text-[10px] font-mono-tag font-bold px-2 py-0.5 rounded-md border shrink-0"
      :class="levelColor"
    >
      {{ skill.level }}
    </span>

    <!-- Optional Category (Only if requested) -->
    <span 
      v-if="showCategory && skill.category" 
      class="text-[10px] font-mono-tag text-[#5C4848] dark:text-zinc-400 px-1.5 py-0.5 rounded bg-[#FFF9F9] dark:bg-white/5 border border-[#EEDCDC] dark:border-white/5 shrink-0 hidden sm:inline-block"
    >
      {{ skill.category }}
    </span>
  </div>
</template>
