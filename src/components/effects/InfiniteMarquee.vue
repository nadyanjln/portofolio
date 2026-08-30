<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [
      'Product Strategy',
      'User Research',
      'UI/UX Design',
      'Figma Prototyping',
      'Design Systems',
      'PRD & User Stories',
      'Usability Testing',
      'A/B Testing',
      'Interaction Design',
      'Agile / Scrum',
      'Data-Driven Decision'
    ]
  },
  speed: {
    type: String,
    default: 'normal'
  },
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="relative w-full overflow-hidden py-3 select-none">
    <!-- Gradient Fade Edges -->
    <div class="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FFF9F9] dark:from-[#0B0C0E] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
    <div class="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FFF9F9] dark:from-[#0B0C0E] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>

    <!-- Scrolling Ribbon -->
    <div 
      class="flex items-center gap-3.5 whitespace-nowrap cursor-default"
      :class="[
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      ]"
    >
      <!-- Batch 1 -->
      <div class="flex items-center gap-3.5 shrink-0">
        <div
          v-for="(item, idx) in items"
          :key="'b1-' + idx"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 shadow-xs hover:border-[#9E0402] dark:hover:border-[#ff4d4d] hover:scale-102 transition-all duration-200 group"
        >
          <span class="text-[#9E0402] dark:text-[#ff4d4d] text-xs font-bold group-hover:rotate-45 transition-transform">✦</span>
          <span class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-zinc-200 group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d] tracking-wide uppercase font-mono-tag">
            {{ item }}
          </span>
        </div>
      </div>

      <!-- Batch 2 -->
      <div class="flex items-center gap-3.5 shrink-0" aria-hidden="true">
        <div
          v-for="(item, idx) in items"
          :key="'b2-' + idx"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 shadow-xs hover:border-[#9E0402] dark:hover:border-[#ff4d4d] hover:scale-102 transition-all duration-200 group"
        >
          <span class="text-[#9E0402] dark:text-[#ff4d4d] text-xs font-bold group-hover:rotate-45 transition-transform">✦</span>
          <span class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-zinc-200 group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d] tracking-wide uppercase font-mono-tag">
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
