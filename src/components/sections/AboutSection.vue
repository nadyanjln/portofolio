<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Sparkles, Users, Lightbulb, TrendingUp, Cpu, Brain, Network, ArrowRight } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import SkillBadge from '@/components/ui/SkillBadge.vue'
import { useScrollReveal } from '@/composables/useAnimations'

const { portfolioInfo, skills, currentProfile } = usePortfolioStore()

const highlights = computed(() => {
  if (currentProfile.value === 'raqwan') {
    return [
      {
        icon: Brain,
        title: 'MarketForge & Agentic AI',
        description: 'Mengarsiteksi MarketForge Agentic AI dan financial screening engine sub-millisecond untuk intelijen pasar modal sekuritas.'
      },
      {
        icon: Network,
        title: 'GraphRAG & Knowledge Graphs',
        description: 'Mengembangkan Knowledge Graph enterprise dengan FalkorDB & Cognee untuk mitigasi halusinasi LLM dan semantic search.'
      },
      {
        icon: Cpu,
        title: 'Distributed AI & Real-Time Telemetry',
        description: 'Merancang arsitektur distributed inference dengan Ray, WebSocket streaming real-time, dan telemetri 32 metrik operasional.'
      }
    ]
  }

  return [
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
})

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
              <div 
                class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#15161B] border text-xs font-mono-tag font-bold uppercase"
                :class="currentProfile === 'raqwan' ? 'text-emerald-400 border-[#047857]/40 bg-[#047857]/10' : 'text-[#9E0402] dark:text-[#ff4d4d] border-[#EEDCDC] dark:border-white/10'"
              >
                <Sparkles class="w-3.5 h-3.5" />
                <span>About Me</span>
              </div>
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1313] dark:text-[#F4F4F6] leading-tight" v-if="currentProfile === 'raqwan'">
                Dari Fondasi Matematika Hingga Sistem AI yang <span class="text-emerald-400">Scalable</span>
              </h2>
              <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1C1313] dark:text-[#F4F4F6] leading-tight" v-else>
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
              class="p-5 rounded-2xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 space-y-2.5 hover:-translate-y-1.5 transition-all duration-300 group shadow-xs flex flex-col justify-between"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60 hover:bg-[#0e1a16]' : 'hover:border-[#9E0402]/40 hover:bg-[#FDF6F6] dark:hover:bg-[#1C1E24]'"
            >
              <div class="space-y-2.5">
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  :class="currentProfile === 'raqwan' ? 'bg-[#047857]/20 text-emerald-300 group-hover:bg-[#047857] group-hover:text-white' : 'bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] group-hover:bg-[#9E0402] group-hover:text-white'"
                >
                  <component :is="item.icon" class="w-5 h-5" />
                </div>
                <h3 
                  class="font-bold text-sm text-[#1C1313] dark:text-[#F4F4F6] transition-colors"
                  :class="currentProfile === 'raqwan' ? 'group-hover:text-emerald-300' : 'group-hover:text-[#9E0402] dark:group-hover:text-[#ff4d4d]'"
                >
                  {{ item.title }}
                </h3>
              </div>
              <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Skills & Expertise List -->
        <div data-reveal="fade-left" class="lg:col-span-5 flex flex-col">
          <div class="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm">
            <div class="space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-[#EEDCDC] dark:border-white/10">
                <h3 class="font-bold text-lg text-[#1C1313] dark:text-[#F4F4F6]">Skills & Expertise</h3>
                <span 
                  class="text-xs font-mono-tag font-bold"
                  :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'"
                >
                  ({{ skills.length }} Core Skills)
                </span>
              </div>
              
              <!-- Skills Badges Flex Wrap -->
              <div class="flex flex-wrap gap-2 pt-1 max-h-[300px] overflow-y-auto pr-1">
                <SkillBadge 
                  v-for="skill in skills" 
                  :key="skill.name" 
                  :skill="skill" 
                />
              </div>
            </div>

            <!-- Bottom CTA Link inside skills card -->
            <div class="pt-4 border-t border-[#EEDCDC] dark:border-white/10 flex items-center justify-between">
              <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">Tertarik berkolaborasi?</span>
              <RouterLink 
                :to="'/' + currentProfile + '/contact'"
                class="inline-flex items-center gap-1.5 text-xs font-bold font-mono-tag uppercase tracking-wider transition-colors group"
                :class="currentProfile === 'raqwan' ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#9E0402] dark:text-[#ff4d4d] hover:text-[#B80604]'"
              >
                <span>Hubungi Saya</span>
                <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </RouterLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
