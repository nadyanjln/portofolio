<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Sparkles, Users, Lightbulb, TrendingUp, ArrowRight, ArrowDown } from 'lucide-vue-next'
import { portfolioInfo, skills } from '@/data/portfolioData'
import SkillBadge from '@/components/ui/SkillBadge.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const highlights = [
  {
    icon: Lightbulb,
    title: 'Product Thinking',
    description: 'Mengidentifikasi kebutuhan pengguna dan peluang bisnis untuk merancang solusi produk yang tepat sasaran.'
  },
  {
    icon: Users,
    title: 'User-Centered Design',
    description: 'Mendasarkan setiap keputusan desain pada riset pengguna, usability testing, dan data kualitatif.'
  },
  {
    icon: TrendingUp,
    title: 'Data-Driven Impact',
    description: 'Mengukur keberhasilan produk melalui metrik yang jelas dan melakukan iterasi berdasarkan data nyata.'
  }
]

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <section ref="sectionRef" class="py-10 sm:py-16 relative" id="about">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
        
        <!-- Left: Bio & Highlights -->
        <div data-reveal="fade-right" class="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6">
          <div class="space-y-4">
            <div class="space-y-2.5">
              <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase text-[#9E0402] dark:text-[#ff4d4d]">
                <Sparkles class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
                <span>About Me</span>
              </div>
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1313] dark:text-[#F4F4F6] leading-tight">
                Dari Riset Pengguna Hingga Produk yang <span class="text-[#9E0402] dark:text-[#ff4d4d]">Berdampak</span>
              </h2>
            </div>

            <p class="text-[#5C4848] dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
              {{ portfolioInfo.bio }}
            </p>
          </div>

          <!-- Core Values Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
            <div 
              v-for="item in highlights" 
              :key="item.title"
              class="p-5 rounded-2xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 space-y-2.5 hover:border-[#9E0402]/40 hover:-translate-y-1.5 transition-all duration-300 group shadow-xs hover:bg-[#FDF6F6] dark:hover:bg-[#1C1E24] flex flex-col justify-between"
            >
              <div class="space-y-2.5">
                <div class="w-10 h-10 rounded-xl bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#9E0402] group-hover:text-white transition-all duration-300">
                  <component :is="item.icon" class="w-5 h-5" />
                </div>
                <h3 class="font-bold text-sm text-[#1C1313] dark:text-[#F4F4F6] group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d] transition-colors">{{ item.title }}</h3>
              </div>
              <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Skills & Expertise List (Equal Height) -->
        <div data-reveal="fade-left" data-reveal-delay="2" class="lg:col-span-5 p-6 sm:p-7 rounded-[32px] bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between shadow-xs h-full space-y-4">
          <!-- Top Header -->
          <div class="flex items-center justify-between pb-3 border-b border-[#EEDCDC] dark:border-white/10">
            <div>
              <h3 class="text-lg font-extrabold text-[#1C1313] dark:text-[#F4F4F6]">Skills & Expertise</h3>
              <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">{{ skills.length }} Core Competencies</span>
            </div>
            <RouterLink 
              to="/about" 
              class="text-xs font-bold font-mono-tag text-[#9E0402] dark:text-[#ff4d4d] hover:text-[#B80604] dark:hover:text-[#ff6b6b] flex items-center gap-1 group uppercase tracking-wider"
            >
              <span>Selengkapnya</span>
              <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </RouterLink>
          </div>

          <!-- 1 x 1 Vertical Scrollable List (Expanded to fill height) -->
          <div class="flex flex-col gap-2.5 flex-1 min-h-[300px] max-h-[380px] lg:max-h-[390px] overflow-y-auto pr-1.5 custom-scroll">
            <SkillBadge 
              v-for="skill in skills" 
              :key="skill.name" 
              :skill="skill" 
            />
          </div>

          <!-- Bottom scroll hint / status -->
          <div class="pt-3 border-t border-[#EEDCDC] dark:border-white/10 flex items-center justify-between text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">
            <span class="flex items-center gap-1.5 text-[#9E0402] dark:text-[#ff4d4d]">
              <ArrowDown class="w-3.5 h-3.5 animate-bounce" />
              <span>Scroll untuk melihat semua</span>
            </span>
            <span class="text-[#1E3A60] dark:text-[#9FC2EA] font-bold">Updated 2026</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
