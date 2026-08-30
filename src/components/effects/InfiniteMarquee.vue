<script setup>
import { computed } from 'vue'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const { currentProfile } = usePortfolioStore()

const props = defineProps({
  items: {
    type: Array,
    default: null
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

const marqueeItems = computed(() => {
  if (props.items && props.items.length) {
    return props.items
  }

  if (currentProfile.value === 'raqwan') {
    return [
      'Computer Vision',
      'Object Detection (YOLO)',
      'NLP & Transformers',
      'Autonomous Agentic AI',
      'LangGraph Multi-Agent',
      'GANs & Generative Modeling',
      'PyTorch & CUDA',
      'RAG & Vector DBs',
      'TensorRT & FP16/INT8',
      'MLOps & Model Serving',
      'Deep Learning Pipelines'
    ]
  }

  return [
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
          v-for="(item, idx) in marqueeItems"
          :key="'b1-' + idx"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 shadow-xs hover:scale-102 transition-all duration-200 group"
          :class="currentProfile === 'raqwan' ? 'hover:border-emerald-500' : 'hover:border-[#9E0402] dark:hover:border-[#ff4d4d]'"
        >
          <span 
            class="text-xs font-bold group-hover:rotate-45 transition-transform"
            :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'"
          >
            ✦
          </span>
          <span 
            class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-zinc-200 tracking-wide uppercase font-mono-tag transition-colors"
            :class="currentProfile === 'raqwan' ? 'group-hover:text-emerald-300' : 'group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <!-- Batch 2 -->
      <div class="flex items-center gap-3.5 shrink-0" aria-hidden="true">
        <div
          v-for="(item, idx) in marqueeItems"
          :key="'b2-' + idx"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 shadow-xs hover:scale-102 transition-all duration-200 group"
          :class="currentProfile === 'raqwan' ? 'hover:border-emerald-500' : 'hover:border-[#9E0402] dark:hover:border-[#ff4d4d]'"
        >
          <span 
            class="text-xs font-bold group-hover:rotate-45 transition-transform"
            :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'"
          >
            ✦
          </span>
          <span 
            class="text-xs sm:text-sm font-bold text-[#1C1313] dark:text-zinc-200 tracking-wide uppercase font-mono-tag transition-colors"
            :class="currentProfile === 'raqwan' ? 'group-hover:text-emerald-300' : 'group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
