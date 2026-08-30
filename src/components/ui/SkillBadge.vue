<script setup>
defineProps({
  skill: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="px-4 py-2.5 rounded-xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 hover:border-[#9E0402]/50 hover:bg-[#FDF6F6] dark:hover:bg-[#1C1E24] hover:translate-x-1.5 transition-all duration-300 flex items-center justify-between gap-3 group w-full shadow-xs cursor-default">
    <div class="flex items-center gap-2.5 min-w-0">
      <div class="w-2 h-2 rounded-full bg-[#9E0402] dark:bg-[#ff4d4d] group-hover:scale-150 transition-all duration-300 shrink-0"></div>
      <span class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-[#F4F4F6] group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d] transition-colors truncate">
        {{ skill.name }}
      </span>
    </div>
    <div class="flex items-center gap-1.5 shrink-0">
      <span v-if="skill.level" class="text-[10px] font-bold font-mono-tag px-2 py-0.5 rounded-md bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] border border-[#9FC2EA]/60 dark:border-[#9FC2EA]/30">
        {{ skill.level }}
      </span>
      <span class="text-[10px] sm:text-[11px] font-medium font-mono-tag px-2 py-0.5 rounded-md bg-[#FDF6F6] dark:bg-white/5 text-[#5C4848] dark:text-zinc-400 border border-[#EEDCDC] dark:border-white/10">
        {{ skill.category }}
      </span>
    </div>
  </div>
</template>
