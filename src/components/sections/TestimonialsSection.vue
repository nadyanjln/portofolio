<script setup>
import { ref, computed, onMounted } from 'vue'
import { Sparkles, Quote, CheckCircle, Star, Award, Building2 } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useScrollReveal } from '@/composables/useAnimations'

const { testimonials, currentProfile } = usePortfolioStore()

const testimonialList = computed(() => {
  return testimonials.value || []
})

// Lead testimonial (Featured large bento tile)
const leadTestimonial = computed(() => {
  const list = testimonialList.value
  if (!list.length) return null
  return list[0]
})

// Secondary testimonials (Stacked bento tiles)
const secondaryTestimonials = computed(() => {
  const list = testimonialList.value
  if (list.length <= 1) return []
  return list.slice(1, 3)
})

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <section ref="sectionRef" class="py-20 sm:py-28 relative scroll-mt-24" id="testimonials">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- ══════════════════════════════════════════════════════════
           1. FULL-WIDTH EDITORIAL SECTION HEADER (Varied Layout)
           ══════════════════════════════════════════════════════════ -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-black/10 dark:border-white/10">
        
        <div class="space-y-4 max-w-2xl">
          <div class="flex items-center gap-3">
            <span 
              class="px-3 py-1 rounded-full text-xs font-mono-tag font-bold tracking-wider uppercase border"
              :class="currentProfile === 'raqwan'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                : 'bg-[#FB4617]/10 text-[#FB4617] dark:text-[#FB4617] border-[#FB4617]/25'"
            >
              (05) / ENDORSEMENTS
            </span>
            <span class="text-xs font-mono-tag text-zinc-500 uppercase tracking-widest">
              • Peer Validation & Trust
            </span>
          </div>

          <h2 class="text-4xl sm:text-6xl font-black tracking-tighter text-[#1C1313] dark:text-white leading-[0.95]">
            <span v-if="currentProfile === 'raqwan'">
              What ML Leaders <br />
              <span class="text-[#047857] dark:text-[#00F59B]">say & endorse</span>
            </span>
            <span v-else>
              What Stakeholders <br />
              <span class="text-[#FB4617] dark:text-[#FB4617]">say & endorse</span>
            </span>
          </h2>
        </div>

        <!-- Trust Telemetry Accreditation Badge -->
        <div class="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-2xl bg-white dark:bg-[#13151D] border border-black/5 dark:border-white/10 shadow-xs">
          <div class="flex items-center gap-1 text-amber-400">
            <Star v-for="s in 5" :key="s" class="w-4 h-4 fill-amber-400" />
          </div>
          <div class="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>
          <span class="font-mono-tag text-xs font-bold text-zinc-600 dark:text-zinc-300">
            100% Verified Peer Endorsements
          </span>
        </div>

      </div>

      <!-- ══════════════════════════════════════════════════════════
           2. ASYMMETRIC BENTO ENDORSEMENT WALL
           ══════════════════════════════════════════════════════════ -->
      <div class="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        <!-- ──────────────────────────────────────────────────────────
             FEATURED LEAD TESTIMONIAL (Col-span 7)
             ────────────────────────────────────────────────────────── -->
        <div 
          v-if="leadTestimonial"
          class="lg:col-span-7 rounded-3xl p-7 sm:p-10 border transition-all duration-300 relative flex flex-col justify-between shadow-xl overflow-hidden group bg-white dark:bg-[#13151E]"
          :class="currentProfile === 'raqwan'
            ? 'border-emerald-500/30 hover:border-[#00F59B]'
            : 'border-[#FB4617]/30 hover:border-[#FB4617]'"
        >
          <!-- Top Accent Row -->
          <div class="flex items-center justify-between pb-6">
            <div 
              class="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 duration-300"
              :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
            >
              <Quote class="w-6 h-6" />
            </div>

            <span 
              class="inline-flex items-center gap-1.5 text-xs font-mono-tag font-bold px-3 py-1 rounded-full border"
              :class="currentProfile === 'raqwan'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/40 text-[#047857] dark:text-emerald-300'
                : 'bg-orange-50 dark:bg-[#FB4617]/15 border-orange-200 dark:border-[#FB4617]/40 text-[#FB4617] dark:text-[#FB4617]'"
            >
              <CheckCircle class="w-3.5 h-3.5" />
              <span>{{ leadTestimonial.badge || 'Verified Principal Endorsement' }}</span>
            </span>
          </div>

          <!-- Bold Pull-Quote Typography -->
          <div class="my-auto py-4">
            <p class="text-lg sm:text-2xl font-semibold text-[#1C1313] dark:text-zinc-100 leading-relaxed font-sans">
              "{{ leadTestimonial.content }}"
            </p>
          </div>

          <!-- Author Info & Metadata Footer -->
          <div class="pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="relative">
                <img
                  :src="leadTestimonial.avatar"
                  :alt="leadTestimonial.name"
                  class="w-14 h-14 rounded-full object-cover border-2 bg-zinc-800"
                  :class="currentProfile === 'raqwan' ? 'border-emerald-500' : 'border-[#FB4617]'"
                  loading="lazy"
                  decoding="async"
                />
                <div 
                  class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900"
                  :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]' : 'bg-[#FB4617]'"
                ></div>
              </div>

              <div>
                <h4 class="font-bold text-base text-[#1C1313] dark:text-white leading-tight">
                  {{ leadTestimonial.name }}
                </h4>
                <p class="text-xs font-mono-tag text-zinc-500 dark:text-zinc-400 pt-0.5">
                  {{ leadTestimonial.role }} • {{ leadTestimonial.company }}
                </p>
              </div>
            </div>

            <span class="hidden sm:block font-mono-tag text-xs text-zinc-400 dark:text-zinc-500">
              01 / {{ String(testimonialList.length || 3).padStart(2, '0') }}
            </span>
          </div>
        </div>

        <!-- ──────────────────────────────────────────────────────────
             SECONDARY STACKED BENTO TESTIMONIALS (Col-span 5)
             ────────────────────────────────────────────────────────── -->
        <div class="lg:col-span-5 flex flex-col justify-between gap-6">
          
          <div
            v-for="(item, sIdx) in secondaryTestimonials"
            :key="item.id || sIdx"
            class="rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#13151D] border border-black/5 dark:border-white/10 shadow-md flex-1 flex flex-col justify-between space-y-4 transition-all duration-300 hover:shadow-lg group"
            :class="currentProfile === 'raqwan' 
              ? 'hover:border-emerald-500/40' 
              : 'hover:border-[#FB4617]/40'"
          >
            <!-- Top Verified Tag -->
            <div class="flex items-center justify-between">
              <span class="font-mono-tag text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                // PEER TESTIMONIAL 0{{ sIdx + 2 }}
              </span>

              <span 
                class="inline-flex items-center gap-1 text-[11px] font-mono-tag font-semibold"
                :class="currentProfile === 'raqwan' ? 'text-emerald-500 dark:text-emerald-400' : 'text-[#FB4617]'"
              >
                <CheckCircle class="w-3 h-3" />
                <span>Verified Colleague</span>
              </span>
            </div>

            <!-- Quote Text -->
            <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-200 leading-relaxed italic">
              "{{ item.content }}"
            </p>

            <!-- Author Micro Profile -->
            <div class="flex items-center gap-3 pt-3 border-t border-black/5 dark:border-white/10">
              <img
                :src="item.avatar"
                :alt="item.name"
                class="w-10 h-10 rounded-full object-cover border border-black/10 dark:border-white/10 bg-zinc-800 shrink-0"
                loading="lazy"
                decoding="async"
              />
              <div class="truncate">
                <h5 class="font-bold text-xs sm:text-sm text-[#1C1313] dark:text-white truncate">
                  {{ item.name }}
                </h5>
                <p class="text-[11px] font-mono-tag text-zinc-500 dark:text-zinc-400 truncate">
                  {{ item.role }} • {{ item.company }}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
