<script setup>
import { ref, computed, onMounted } from 'vue'
import { Sparkles, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useScrollReveal } from '@/composables/useAnimations'

const { workflows, currentProfile } = usePortfolioStore()

// Active Stage for Interactive Pipeline Console
const activeStageIndex = ref(0)

const stageList = computed(() => {
  return workflows.value || []
})

const activeStage = computed(() => {
  const list = stageList.value
  if (!list.length) return null
  return list[activeStageIndex.value] || list[0]
})

const setStage = (idx) => {
  activeStageIndex.value = idx
}

const nextStage = () => {
  if (activeStageIndex.value < stageList.value.length - 1) {
    activeStageIndex.value++
  } else {
    activeStageIndex.value = 0
  }
}

const prevStage = () => {
  if (activeStageIndex.value > 0) {
    activeStageIndex.value--
  } else {
    activeStageIndex.value = stageList.value.length - 1
  }
}

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <section ref="sectionRef" class="py-20 sm:py-28 relative scroll-mt-24" id="process">
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
              (03) / METHODOLOGY • 4-STAGE EXECUTION LIFECYCLE
            </span>
            <span class="text-xs font-mono-tag text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
              {{ currentProfile === 'raqwan' ? '• Alur Eksekusi Rekayasa AI (Fase 01 s/d 04)' : '• Alur Eksekusi Desain & Produk (Fase 01 s/d 04)' }}
            </span>
          </div>

          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-[#1C1313] dark:text-white leading-[1.05]">
            <span v-if="currentProfile === 'raqwan'">
              Siklus Eksekusi Proyek <br />
              <span class="text-[#047857] dark:text-[#00F59B]">& rekayasa AI end-to-end terukur</span>
            </span>
            <span v-else>
              Siklus Eksekusi Proyek <br />
              <span class="text-[#FB4617] dark:text-[#FB4617]">& delivery produk presisi tinggi</span>
            </span>
          </h2>
        </div>

        <div class="max-w-md space-y-2">
          <span class="font-mono-tag text-xs font-bold text-zinc-400 dark:text-zinc-500 tracking-wider block uppercase">
            {{ currentProfile === 'raqwan' ? '(AI-OPS WORKFLOW® // DARI BRIEFING HINGGA PRODUCTION)' : '(PRODUCT WORKFLOW® // DARI DISCOVERY HINGGA HANDOVER)' }}
          </span>
          <p class="text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed font-sans">
            {{ currentProfile === 'raqwan'
              ? 'Bagaimana saya memimpin dan mengeksekusi setiap proyek kolaborasi secara terstruktur dalam 4 fase sekuensial: mulai dari problem framing & model research, backend microservices terdistribusi, hingga stress-testing dan telemetri produksi.'
              : 'Bagaimana saya memimpin dan mengeksekusi setiap inisiatif produk digital secara terstruktur dalam 4 fase sekuensial: mulai dari riset kebutuhan pengguna, perumusan roadmap & PRD, perancangan antarmuka high-fidelity, hingga usability testing dan engineering handover.' }}
          </p>
        </div>

      </div>

      <!-- ══════════════════════════════════════════════════════════
           2. HORIZONTAL CONNECTED STAGE PIPELINE CONDUIT TRACK
           ══════════════════════════════════════════════════════════ -->
      <div class="pt-10 pb-8">
        <!-- Stage Conduit Guidance Header -->
        <div class="flex items-center justify-between pb-3">
          <span class="font-mono-tag text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full" :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]' : 'bg-[#FB4617]'"></span>
            <span>4 Tahapan Pengerjaan Proyek:</span>
          </span>
          <span class="font-mono-tag text-[11px] text-zinc-400 dark:text-zinc-500 hidden sm:inline-block">
            KLIK FASE UNTUK MELIHAT RINCIAN DELIVERABLE
          </span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative">
          
          <button
            v-for="(stage, idx) in stageList"
            :key="stage.step || idx"
            @click="setStage(idx)"
            class="text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer"
            :class="activeStageIndex === idx
              ? (currentProfile === 'raqwan' 
                  ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-[#00F59B] shadow-lg shadow-emerald-500/10' 
                  : 'bg-[#FB4617]/10 dark:bg-[#FB4617]/15 border-[#FB4617] shadow-lg shadow-[#FB4617]/15')
              : 'bg-white dark:bg-[#13151D] border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'"
          >
            <!-- Top Step & Status Indicator -->
            <div class="flex items-center justify-between mb-3">
              <span 
                class="font-mono-tag text-xs font-bold px-2 py-0.5 rounded-sm"
                :class="activeStageIndex === idx
                  ? (currentProfile === 'raqwan' ? 'bg-[#047857] text-white' : 'bg-[#FB4617] text-white')
                  : 'bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-400'"
              >
                FASE 0{{ stage.step }}
              </span>

              <div 
                class="w-2 h-2 rounded-full transition-all"
                :class="activeStageIndex === idx
                  ? (currentProfile === 'raqwan' ? 'bg-[#00F59B] animate-ping' : 'bg-[#FB4617] animate-ping')
                  : 'bg-zinc-300 dark:bg-zinc-700'"
              ></div>
            </div>

            <!-- Stage Phase Name -->
            <h4 
              class="font-bold text-sm sm:text-base text-[#1C1313] dark:text-white truncate transition-colors"
              :class="activeStageIndex === idx ? (currentProfile === 'raqwan' ? 'text-[#047857] dark:text-[#00F59B]' : 'text-[#FB4617]') : ''"
            >
              {{ stage.phase }}
            </h4>

            <!-- Subtitle / Tagline -->
            <p class="text-[11px] font-mono-tag text-zinc-500 dark:text-zinc-400 truncate mt-1">
              {{ stage.tagline }}
            </p>

            <!-- Bottom Active Accent Conduit Line -->
            <div 
              v-if="activeStageIndex === idx"
              class="absolute bottom-0 left-0 right-0 h-1"
              :class="currentProfile === 'raqwan' ? 'bg-[#00F59B]' : 'bg-[#FB4617]'"
            ></div>
          </button>

        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════
           3. EXPANSIVE STAGE COCKPIT / CONSOLE (Active Stage View)
           ══════════════════════════════════════════════════════════ -->
      <div 
        v-if="activeStage"
        class="rounded-3xl p-6 sm:p-10 border transition-all duration-500 relative overflow-hidden shadow-xl bg-white dark:bg-[#111319]"
        :class="currentProfile === 'raqwan'
          ? 'border-emerald-500/30'
          : 'border-[#FB4617]/30'"
      >
        <!-- Background Ambient Watermark Numeral -->
        <div class="absolute -right-6 -bottom-10 select-none pointer-events-none opacity-5 dark:opacity-10">
          <span 
            class="text-[14rem] sm:text-[18rem] font-black font-mono-tag tracking-tighter"
            :class="currentProfile === 'raqwan' ? 'text-emerald-500' : 'text-[#FB4617]'"
          >
            0{{ activeStage.step }}
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          <!-- LEFT COCKPIT: STAGE IDENTITY & NARRATIVE (Col 7) -->
          <div class="lg:col-span-7 space-y-6">
            
            <div class="flex items-center gap-3">
              <span 
                class="px-3.5 py-1 rounded-full text-xs font-mono-tag font-extrabold uppercase text-white shadow-xs"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
              >
                FASE 0{{ activeStage.step }}
              </span>
              <span class="font-mono-tag text-xs font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                / 0{{ stageList.length }} SIKLUS EKSEKUSI
              </span>
            </div>

            <div>
              <h3 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1C1313] dark:text-white">
                {{ activeStage.phase }}
              </h3>
              <p 
                class="text-xs sm:text-sm font-mono-tag font-bold uppercase tracking-wider mt-2"
                :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : 'text-[#FB4617] dark:text-[#FB4617]'"
              >
                {{ activeStage.tagline }}
              </p>
            </div>

            <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed font-sans max-w-xl">
              {{ activeStage.description }}
            </p>

            <!-- Navigation Controls -->
            <div class="pt-4 flex items-center gap-3">
              <button
                @click="prevStage"
                class="p-2.5 rounded-full border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
                title="Previous Stage"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>

              <button
                @click="nextStage"
                class="px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-white transition-all duration-300 shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                :class="currentProfile === 'raqwan' 
                  ? 'bg-[#047857] hover:bg-[#059669] shadow-emerald-500/20' 
                  : 'bg-[#FB4617] hover:bg-[#E0370E] shadow-[#FB4617]/30'"
              >
                <span>Fase Berikutnya (0{{ activeStage.step === stageList.length ? 1 : activeStage.step + 1 }})</span>
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>

          </div>

          <!-- RIGHT COCKPIT: KEY ARTIFACTS & METRIC BADGES (Col 5) -->
          <div class="lg:col-span-5 space-y-4">
            
            <div class="p-5 rounded-2xl bg-white/90 dark:bg-black/40 border border-black/5 dark:border-white/10 backdrop-blur-md space-y-4">
              <div class="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10">
                <span class="font-mono-tag text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Key Deliverables & Artefak Fase Ini
                </span>
                <ShieldCheck 
                  class="w-4 h-4" 
                  :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#FB4617]'"
                />
              </div>

              <!-- Deliverable Chips -->
              <div class="space-y-2">
                <div
                  v-for="(del, dIdx) in activeStage.deliverables"
                  :key="dIdx"
                  class="flex items-center gap-2.5 text-xs text-[#1C1313] dark:text-zinc-200 p-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/5 transition-all hover:translate-x-1"
                >
                  <CheckCircle2 
                    class="w-4 h-4 shrink-0" 
                    :class="currentProfile === 'raqwan' ? 'text-emerald-500 dark:text-emerald-400' : 'text-[#FB4617]'"
                  />
                  <span class="font-medium truncate">{{ del }}</span>
                </div>
              </div>

              <!-- Telemetry SLA Spec Footer -->
              <div class="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] font-mono-tag text-zinc-500 dark:text-zinc-400">
                <span>{{ currentProfile === 'raqwan' ? 'LATENCY SLA: < 15MS' : 'BENCHMARK: 100% PRD PASS' }}</span>
                <span class="font-bold" :class="currentProfile === 'raqwan' ? 'text-emerald-500 dark:text-emerald-400' : 'text-[#FB4617]'">VERIFIED</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </section>
</template>
