<script setup>
import { ref, computed, onMounted } from 'vue'
import { Sparkles, Sliders, CheckCircle2, RefreshCw, Layers, TrendingUp, FileText, ArrowRight } from 'lucide-vue-next'
import { useScrollReveal } from '@/composables/useAnimations'

const activeTab = ref('uiux') // 'uiux' | 'pm' | 'metrics'

// UI/UX Sandbox State
const buttonState = ref('default') // 'default' | 'loading' | 'success'
const borderRadius = ref(16)
const selectedTheme = ref('primary')
const showTokens = ref(false)

// Product Metrics Sandbox State
const baselineUsers = ref(50000)
const conversionRate = ref(2.4)
const aov = ref(350000) // Average Order Value (IDR)

const projectedImpact = computed(() => {
  const currentOrders = baselineUsers.value * (conversionRate.value / 100)
  const improvedConversion = conversionRate.value * 1.28 // +28% UX overhaul
  const newOrders = baselineUsers.value * (improvedConversion / 100)
  const revenueGain = (newOrders - currentOrders) * aov.value
  return {
    currentOrders: Math.round(currentOrders),
    newOrders: Math.round(newOrders),
    revenueGain: Math.round(revenueGain).toLocaleString('id-ID'),
    upliftPercent: '+28%'
  }
})

// PM RICE Calculator State
const rice = ref({
  reach: 80,
  impact: 3, // 1: Low, 2: Med, 3: High
  confidence: 85, // %
  effort: 2 // Person-weeks
})

const riceScore = computed(() => {
  const score = (rice.value.reach * rice.value.impact * (rice.value.confidence / 100)) / rice.value.effort
  return Math.round(score * 10) / 10
})

const simulateLoading = () => {
  buttonState.value = 'loading'
  setTimeout(() => {
    buttonState.value = 'success'
    setTimeout(() => {
      buttonState.value = 'default'
    }, 2000)
  }, 1200)
}

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <section ref="sectionRef" class="py-12 sm:py-18 relative" id="playground">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
      
      <!-- Header -->
      <div data-reveal="fade-up" class="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-3xl">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase text-[#9E0402] dark:text-[#ff4d4d] shadow-xs">
            <Sparkles class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
            <span>Interactive Craft Sandbox</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight">
            PM & UI/UX <span class="text-[#9E0402] dark:text-[#ff3b38]">Playground</span>
          </h2>
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed">
            Eksplorasi interaktif bagaimana saya merancang komponen sistem desain dan menghitung dampak bisnis produk secara terukur.
          </p>
        </div>
      </div>

      <!-- Main Sandbox Container -->
      <div class="p-6 sm:p-10 rounded-[36px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 shadow-lg space-y-8 relative overflow-hidden">
        
        <!-- Tab Selector Switcher -->
        <div class="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 w-fit">
          <button
            @click="activeTab = 'uiux'"
            class="px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
            :class="[
              activeTab === 'uiux'
                ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/25'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <Layers class="w-4 h-4" />
            <span>UI/UX Design Tokens</span>
          </button>

          <button
            @click="activeTab = 'metrics'"
            class="px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
            :class="[
              activeTab === 'metrics'
                ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/25'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <TrendingUp class="w-4 h-4" />
            <span>Funnel ROI Calculator</span>
          </button>

          <button
            @click="activeTab = 'pm'"
            class="px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
            :class="[
              activeTab === 'pm'
                ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/25'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <FileText class="w-4 h-4" />
            <span>RICE Prioritization</span>
          </button>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- TAB 1: UI/UX Component & Token Inspector    -->
        <!-- ═══════════════════════════════════════════ -->
        <div v-if="activeTab === 'uiux'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Controls -->
          <div class="lg:col-span-6 space-y-6">
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-[#1C1313] dark:text-white">Design Token & Component States</h3>
              <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">
                Ubah parameter di bawah untuk melihat adaptabilitas komponen secara instan:
              </p>
            </div>

            <!-- Border Radius Control -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs font-mono-tag font-bold">
                <span class="text-[#1C1313] dark:text-zinc-300">Border Radius (Tokens)</span>
                <span class="text-[#9E0402] dark:text-[#ff4d4d]">{{ borderRadius }}px</span>
              </div>
              <input
                v-model.number="borderRadius"
                type="range"
                min="4"
                max="32"
                step="4"
                class="w-full accent-[#9E0402] cursor-pointer"
              />
              <div class="flex justify-between text-[10px] font-mono-tag text-[#5C4848] dark:text-zinc-500">
                <span>4px (Sharp)</span>
                <span>16px (Smooth)</span>
                <span>32px (Pill)</span>
              </div>
            </div>

            <!-- Color Palette Variant Selector -->
            <div class="space-y-2">
              <span class="text-xs font-mono-tag font-bold text-[#1C1313] dark:text-zinc-300 block">Color Semantic Token</span>
              <div class="flex gap-2">
                <button
                  @click="selectedTheme = 'primary'"
                  class="px-4 py-1.5 rounded-lg text-xs font-mono-tag font-bold transition-all"
                  :class="selectedTheme === 'primary' ? 'bg-[#9E0402] text-white' : 'bg-[#FFF9F9] dark:bg-[#1A1C24] text-[#1C1313] dark:text-white border border-[#EEDCDC] dark:border-white/10'"
                >
                  Primary Crimson
                </button>
                <button
                  @click="selectedTheme = 'secondary'"
                  class="px-4 py-1.5 rounded-lg text-xs font-mono-tag font-bold transition-all"
                  :class="selectedTheme === 'secondary' ? 'bg-[#9FC2EA] text-[#1E3A60]' : 'bg-[#FFF9F9] dark:bg-[#1A1C24] text-[#1C1313] dark:text-white border border-[#EEDCDC] dark:border-white/10'"
                >
                  Sky Secondary
                </button>
              </div>
            </div>

            <!-- Trigger State Simulation -->
            <div class="pt-2">
              <button
                @click="simulateLoading"
                class="px-5 py-2.5 rounded-xl bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold text-[#1C1313] dark:text-white hover:border-[#9E0402] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <RefreshCw class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
                <span>Simulate Async Action States (Loading → Success)</span>
              </button>
            </div>
          </div>

          <!-- Live Interactive Canvas Preview -->
          <div class="lg:col-span-6 p-8 sm:p-12 rounded-3xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 flex flex-col items-center justify-center space-y-6 text-center shadow-inner">
            <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-500 font-bold uppercase tracking-wider">
              ✦ Live Component Preview
            </span>

            <!-- The Dynamically Styled Button -->
            <button
              @click="simulateLoading"
              :style="{ borderRadius: `${borderRadius}px` }"
              class="px-8 py-4 font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg flex items-center gap-3 cursor-pointer select-none hover:scale-105 active:scale-95"
              :class="[
                selectedTheme === 'primary' ? 'bg-[#9E0402] text-white shadow-[#9E0402]/30 hover:bg-[#B80604]' : 'bg-[#9FC2EA] text-[#1E3A60] shadow-[#9FC2EA]/40 hover:bg-[#8AB6E5]'
              ]"
            >
              <template v-if="buttonState === 'default'">
                <span>Primary Action CTA</span>
                <ArrowRight class="w-4 h-4" />
              </template>

              <template v-else-if="buttonState === 'loading'">
                <RefreshCw class="w-4 h-4 animate-spin" />
                <span>Processing Request...</span>
              </template>

              <template v-else-if="buttonState === 'success'">
                <CheckCircle2 class="w-4 h-4 text-emerald-300" />
                <span>Action Confirmed!</span>
              </template>
            </button>

            <!-- Code Inspect Badge -->
            <div class="p-3 rounded-xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 font-mono-tag text-[11px] text-[#5C4848] dark:text-zinc-400 space-y-1 text-left w-full max-w-sm">
              <p><span class="text-[#9E0402] dark:text-[#ff4d4d]">radius</span>: {{ borderRadius }}px;</p>
              <p><span class="text-[#9E0402] dark:text-[#ff4d4d]">variant</span>: {{ selectedTheme }};</p>
              <p><span class="text-[#9E0402] dark:text-[#ff4d4d]">wcag_aa</span>: Passed (Contrast 4.8:1);</p>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- TAB 2: Funnel ROI Calculator (Business PM)  -->
        <!-- ═══════════════════════════════════════════ -->
        <div v-else-if="activeTab === 'metrics'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 space-y-5">
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-[#1C1313] dark:text-white">UX Overhaul ROI & Impact Simulator</h3>
              <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400 leading-relaxed">
                Menghitung estimasi proyeksi pertambahan omset bisnis dari peningkatan konversi desain sebesar 28%.
              </p>
            </div>

            <!-- Sliders -->
            <div class="space-y-4">
              <div class="space-y-1.5">
                <div class="flex justify-between text-xs font-mono-tag font-bold">
                  <span class="text-[#1C1313] dark:text-zinc-300">Monthly Visitors (Traffic)</span>
                  <span class="text-[#9E0402] dark:text-[#ff4d4d]">{{ baselineUsers.toLocaleString('id-ID') }} Users</span>
                </div>
                <input v-model.number="baselineUsers" type="range" min="10000" max="200000" step="5000" class="w-full accent-[#9E0402] cursor-pointer" />
              </div>

              <div class="space-y-1.5">
                <div class="flex justify-between text-xs font-mono-tag font-bold">
                  <span class="text-[#1C1313] dark:text-zinc-300">Baseline Conversion Rate</span>
                  <span class="text-[#9E0402] dark:text-[#ff4d4d]">{{ conversionRate }}%</span>
                </div>
                <input v-model.number="conversionRate" type="range" min="1.0" max="5.0" step="0.1" class="w-full accent-[#9E0402] cursor-pointer" />
              </div>
            </div>
          </div>

          <!-- Result Display Cards -->
          <div class="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 space-y-4">
            <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-500 font-bold uppercase tracking-wider block">
              ✦ Projected Business Impact
            </span>

            <div class="grid grid-cols-2 gap-3.5">
              <div class="p-4 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10">
                <span class="text-[10px] font-mono-tag text-[#5C4848] dark:text-zinc-400 uppercase block">Baseline Orders</span>
                <span class="text-xl sm:text-2xl font-extrabold text-[#1C1313] dark:text-white">{{ projectedImpact.currentOrders }}</span>
              </div>

              <div class="p-4 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10">
                <span class="text-[10px] font-mono-tag text-[#9E0402] dark:text-[#ff4d4d] uppercase block">Post-UX Redesign</span>
                <span class="text-xl sm:text-2xl font-extrabold text-[#9E0402] dark:text-[#ff4d4d]">{{ projectedImpact.newOrders }}</span>
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-[#9E0402] text-white shadow-lg shadow-[#9E0402]/25 space-y-1">
              <span class="text-[11px] font-mono-tag uppercase tracking-wider opacity-80 block">Estimated Revenue Uplift / Month</span>
              <span class="text-2xl sm:text-3xl font-black block">+Rp {{ projectedImpact.revenueGain }}</span>
              <span class="text-xs opacity-90 block">Berdasarkan benchmark +28% rata-rata peningkatan studi kasus.</span>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════ -->
        <!-- TAB 3: RICE Prioritization (Product Mgmt)   -->
        <!-- ═══════════════════════════════════════════ -->
        <div v-else-if="activeTab === 'pm'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-7 space-y-5">
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-[#1C1313] dark:text-white">RICE Prioritization Framework</h3>
              <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">
                Model pengambilan keputusan berbasis kuantitatif untuk memprioritaskan fitur pada backlog produk:
              </p>
            </div>

            <!-- Parameters -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-xs font-mono-tag text-[#1C1313] dark:text-zinc-300 font-bold block">Reach (0-100% Users): {{ rice.reach }}%</label>
                <input v-model.number="rice.reach" type="range" min="10" max="100" class="w-full accent-[#9E0402] cursor-pointer" />
              </div>

              <div class="space-y-1">
                <label class="text-xs font-mono-tag text-[#1C1313] dark:text-zinc-300 font-bold block">Impact (1-3x): {{ rice.impact }}x</label>
                <input v-model.number="rice.impact" type="range" min="1" max="3" class="w-full accent-[#9E0402] cursor-pointer" />
              </div>

              <div class="space-y-1">
                <label class="text-xs font-mono-tag text-[#1C1313] dark:text-zinc-300 font-bold block">Confidence: {{ rice.confidence }}%</label>
                <input v-model.number="rice.confidence" type="range" min="50" max="100" class="w-full accent-[#9E0402] cursor-pointer" />
              </div>

              <div class="space-y-1">
                <label class="text-xs font-mono-tag text-[#1C1313] dark:text-zinc-300 font-bold block">Effort (Weeks): {{ rice.effort }} W</label>
                <input v-model.number="rice.effort" type="range" min="1" max="6" class="w-full accent-[#9E0402] cursor-pointer" />
              </div>
            </div>
          </div>

          <!-- RICE Score Result Card -->
          <div class="lg:col-span-5 p-8 rounded-3xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 text-center space-y-3">
            <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 font-bold uppercase tracking-wider block">
              ✦ RICE Priority Score
            </span>
            <div class="text-5xl sm:text-6xl font-black text-[#9E0402] dark:text-[#ff4d4d] font-mono-tag">
              {{ riceScore }}
            </div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tag font-bold"
              :class="riceScore > 50 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'"
            >
              {{ riceScore > 50 ? '🚀 High Priority for Sprint Backlog' : '⏳ Backlog Candidate / Need Iteration' }}
            </span>
            <p class="text-[11px] text-[#5C4848] dark:text-zinc-400 font-mono-tag pt-2">
              Formula: (Reach × Impact × Confidence) / Effort
            </p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
