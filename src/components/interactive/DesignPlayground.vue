<script setup>
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { 
  Sparkles, 
  Layers, 
  TrendingUp, 
  FileText, 
  ArrowRight, 
  Cpu, 
  Bot, 
  Network, 
  Sliders, 
  Zap, 
  Play, 
  CheckCircle2, 
  Activity,
  Terminal,
  RefreshCw
} from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useScrollReveal } from '@/composables/useAnimations'

const NeuralNetworkVisualizer = defineAsyncComponent(() => import('@/components/interactive/NeuralNetworkVisualizer.vue'))

const { currentProfile } = usePortfolioStore()

// -------------------------------------------------------------
// NADYA PLAYGROUND STATE (PM & UI/UX)
// -------------------------------------------------------------
const activeNadyaTab = ref('uiux') // 'uiux' | 'metrics' | 'pm'
const buttonState = ref('default')
const borderRadius = ref(16)
const selectedTheme = ref('primary')
const showTokens = ref(false)

const baselineUsers = ref(50000)
const conversionRate = ref(2.4)
const aov = ref(350000)

const projectedImpact = computed(() => {
  const currentOrders = baselineUsers.value * (conversionRate.value / 100)
  const improvedConversion = conversionRate.value * 1.28
  const newOrders = baselineUsers.value * (improvedConversion / 100)
  const revenueGain = (newOrders - currentOrders) * aov.value
  return {
    currentOrders: Math.round(currentOrders),
    newOrders: Math.round(newOrders),
    revenueGain: Math.round(revenueGain).toLocaleString('id-ID'),
    upliftPercent: '+28%'
  }
})

const rice = ref({
  reach: 80,
  impact: 3,
  confidence: 85,
  effort: 2
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

// -------------------------------------------------------------
// RAQWAN PLAYGROUND STATE (AI & DEEP LEARNING)
// -------------------------------------------------------------
const activeRaqwanTab = ref('cnn') // 'cnn' | 'quantization' | 'agentic' | 'gan'

// 1. Quantization & Latency Benchmark
const selectedModel = ref('yolov8')
const selectedPrecision = ref('int8') // 'fp32' | 'fp16' | 'int8'
const batchSize = ref(1)
const resolution = ref('640x640')

const aiMetrics = computed(() => {
  let baseLatency = 64
  let baseVram = 1850

  if (selectedModel.value === 'yolov8') {
    baseLatency = 58
    baseVram = 1200
  } else if (selectedModel.value === 'indobert') {
    baseLatency = 42
    baseVram = 850
  } else if (selectedModel.value === 'gan') {
    baseLatency = 110
    baseVram = 2400
  }

  // Precision multiplier
  let precisionFactor = 1
  let vramFactor = 1
  if (selectedPrecision.value === 'fp16') {
    precisionFactor = 0.42
    vramFactor = 0.50
  } else if (selectedPrecision.value === 'int8') {
    precisionFactor = 0.21
    vramFactor = 0.26
  }

  const resFactor = resolution.value === '1280x1280' ? 2.4 : resolution.value === '1024x1024' ? 1.6 : 1
  const finalLatency = Math.round(baseLatency * precisionFactor * (1 + (batchSize.value - 1) * 0.08) * resFactor)
  const finalVram = Math.round(baseVram * vramFactor * (1 + (batchSize.value - 1) * 0.25) * resFactor)
  const finalFps = Math.max(1, Math.round((1000 / finalLatency) * batchSize.value))
  const compressionRatio = selectedPrecision.value === 'int8' ? '3.8x' : selectedPrecision.value === 'fp16' ? '2.0x' : '1.0x'

  return {
    latency: finalLatency,
    vram: finalVram,
    fps: finalFps,
    compression: compressionRatio
  }
})

// 2. Agentic Workflow Runner
const agenticRunning = ref(false)
const agentStep = ref(0)
const agentLogs = ref([])
const agentPrompt = ref('Analisis video stream kamera #04 dan deteksi anomali pada pergerakan objek')

const runAgenticSimulation = () => {
  if (agenticRunning.value) return
  agenticRunning.value = true
  agentStep.value = 1
  agentLogs.value = ['[Planner Agent] Parsing query intent & domain ontology...']

  setTimeout(() => {
    agentStep.value = 2
    agentLogs.value.push('[Vector DB] Hybrid dense-sparse retrieval: matched 4 context chunks (similarity 0.94)')
    setTimeout(() => {
      agentStep.value = 3
      agentLogs.value.push('[Tool Executor] Calling VisionGuard Edge API (latency 12ms, 0 anomalies detected)')
      setTimeout(() => {
        agentStep.value = 4
        agentLogs.value.push('[Critic Agent] Verification pass: confidence 98.4%, 0 hallucinations detected')
        setTimeout(() => {
          agentStep.value = 5
          agentLogs.value.push('[Final Synthesizer] Output formatted & telemetry broadcasted.')
          agenticRunning.value = false
        }, 800)
      }, 900)
    }, 900)
  }, 800)
}

// 3. GAN Latent Space Slider
const ganNoise = ref(42)
const ganFidelity = ref(88)
const ganScale = ref('4x')

const ganMetrics = computed(() => {
  const fid = Math.max(12.4, Math.round((38.5 - (ganFidelity.value / 100) * 24.3) * 10) / 10)
  const modeCollapseRisk = ganFidelity.value > 80 ? '0.0% (Stable)' : '4.2% (Low)'
  return { fid, modeCollapseRisk }
})

// Scroll Reveal
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
          <div 
            class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border text-xs font-mono-tag font-bold uppercase shadow-xs"
            :class="currentProfile === 'raqwan' ? 'text-emerald-400 border-[#047857]/40 bg-[#047857]/10' : 'text-[#9E0402] dark:text-[#ff4d4d] border-[#EEDCDC] dark:border-white/10'"
          >
            <Sparkles class="w-3.5 h-3.5" />
            <span>{{ currentProfile === 'raqwan' ? 'AI & Deep Learning Sandbox /2026/' : 'Interactive Craft Sandbox' }}</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight" v-if="currentProfile === 'raqwan'">
            AI & Machine Learning <span class="text-emerald-400">Playground</span>
          </h2>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#1C1313] dark:text-white tracking-tight" v-else>
            PM & UI/UX <span class="text-[#9E0402] dark:text-[#ff3b38]">Playground</span>
          </h2>
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed" v-if="currentProfile === 'raqwan'">
            Eksplorasi interaktif arsitektur Convolutional Neural Network (CNN) real-time, pengujian latency kuantisasi model edge, simulasi Autonomous Multi-Agent DAG, dan eksplorasi latent space GANs.
          </p>
          <p class="text-sm sm:text-base text-[#5C4848] dark:text-zinc-300 leading-relaxed" v-else>
            Eksplorasi interaktif bagaimana saya merancang komponen sistem desain dan menghitung dampak bisnis produk secara terukur.
          </p>
        </div>
      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- RAQWAN AI SANDBOX                           -->
      <!-- ═══════════════════════════════════════════ -->
      <div 
        v-if="currentProfile === 'raqwan'"
        class="p-4 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[36px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 shadow-lg space-y-6 sm:space-y-8 relative overflow-hidden"
      >
        <!-- Tab Selector Switcher (Scrollable on mobile) -->
        <div class="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 max-w-full overflow-x-auto custom-scroll pb-2 sm:pb-1.5">
          <button
            @click="activeRaqwanTab = 'cnn'"
            class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            :class="[
              activeRaqwanTab === 'cnn'
                ? 'bg-[#047857] text-white shadow-md shadow-[#047857]/30'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <Activity class="w-4 h-4 shrink-0" />
            <span>CNN Neural Network</span>
          </button>

          <button
            @click="activeRaqwanTab = 'quantization'"
            class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            :class="[
              activeRaqwanTab === 'quantization'
                ? 'bg-[#047857] text-white shadow-md shadow-[#047857]/30'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <Cpu class="w-4 h-4 shrink-0" />
            <span>Quantization & Latency</span>
          </button>

          <button
            @click="activeRaqwanTab = 'agentic'"
            class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            :class="[
              activeRaqwanTab === 'agentic'
                ? 'bg-[#047857] text-white shadow-md shadow-[#047857]/30'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <Bot class="w-4 h-4 shrink-0" />
            <span>Agentic DAG Simulator</span>
          </button>

          <button
            @click="activeRaqwanTab = 'gan'"
            class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            :class="[
              activeRaqwanTab === 'gan'
                ? 'bg-[#047857] text-white shadow-md shadow-[#047857]/30'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <Network class="w-4 h-4 shrink-0" />
            <span>GAN Latent Space</span>
          </button>
        </div>

        <!-- TAB 0: CNN NEURAL NETWORK VISUALIZER -->
        <div v-if="activeRaqwanTab === 'cnn'">
          <NeuralNetworkVisualizer />
        </div>

        <!-- TAB 1: QUANTIZATION & LATENCY BENCHMARK -->
        <div v-if="activeRaqwanTab === 'quantization'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-6 space-y-6">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-[#1C1313] dark:text-white">Model & Optimization Parameters</h3>
              <p class="text-xs text-[#5C4848] dark:text-zinc-400">Simulasikan dampak kuantisasi FP16 dan INT8 TensorRT terhadap performa inference edge hardware.</p>
            </div>

            <!-- Model Selection -->
            <div class="space-y-2">
              <label class="text-xs font-mono-tag uppercase text-[#5C4848] dark:text-zinc-400 font-bold block">Model Architecture</label>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  v-for="m in [{ id: 'yolov8', name: 'YOLOv8 Edge' }, { id: 'indobert', name: 'IndoBERT NLP' }, { id: 'gan', name: 'BioGen GAN' }]"
                  :key="m.id"
                  @click="selectedModel = m.id"
                  class="p-2.5 rounded-xl text-xs font-mono-tag font-bold border transition-all cursor-pointer text-center"
                  :class="selectedModel === m.id ? 'bg-[#047857]/15 dark:bg-[#047857]/20 border-[#047857] text-[#047857] dark:text-emerald-300 font-bold' : 'bg-white dark:bg-white/5 border-[#EEDCDC] dark:border-white/10 text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'"
                >
                  {{ m.name }}
                </button>
              </div>
            </div>

            <!-- Precision Format Selection -->
            <div class="space-y-2">
              <label class="text-xs font-mono-tag uppercase text-[#5C4848] dark:text-zinc-400 font-bold block">Precision & Engine</label>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  v-for="p in [{ id: 'fp32', name: 'FP32 Baseline' }, { id: 'fp16', name: 'FP16 Half' }, { id: 'int8', name: 'INT8 TensorRT' }]"
                  :key="p.id"
                  @click="selectedPrecision = p.id"
                  class="p-2.5 rounded-xl text-xs font-mono-tag font-bold border transition-all cursor-pointer text-center"
                  :class="selectedPrecision === p.id ? 'bg-[#047857] border-[#047857] text-white shadow-xs' : 'bg-white dark:bg-white/5 border-[#EEDCDC] dark:border-white/10 text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'"
                >
                  {{ p.name }}
                </button>
              </div>
            </div>

            <!-- Batch Size Slider -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs font-mono-tag">
                <span class="text-[#5C4848] dark:text-zinc-400 font-bold">Batch Size:</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ batchSize }} stream(s)</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="16" 
                v-model.number="batchSize" 
                class="w-full accent-[#047857] cursor-pointer"
              />
            </div>
          </div>

          <!-- Right Live Telemetry -->
          <div class="lg:col-span-6 p-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0B0C0E] border border-[#E2E8F0] dark:border-white/10 space-y-6 shadow-xs transition-colors">
            <div class="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-white/10">
              <div class="flex items-center gap-2">
                <Activity class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span class="text-xs font-mono-tag font-bold uppercase text-[#0F172A] dark:text-white">Live Edge Telemetry</span>
              </div>
              <span class="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono-tag font-bold">
                NVIDIA Jetson / CUDA Active
              </span>
            </div>

            <!-- Metrics Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/5 space-y-1 shadow-xs">
                <span class="text-[10px] font-mono-tag uppercase text-[#64748B] dark:text-zinc-400 font-bold block">Inference Latency</span>
                <p class="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono-tag">{{ aiMetrics.latency }} ms</p>
                <span class="text-[10px] text-[#64748B] dark:text-zinc-400 block">per frame prediction</span>
              </div>

              <div class="p-4 rounded-2xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/5 space-y-1 shadow-xs">
                <span class="text-[10px] font-mono-tag uppercase text-[#64748B] dark:text-zinc-400 font-bold block">Throughput Rate</span>
                <p class="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono-tag">{{ aiMetrics.fps }} FPS</p>
                <span class="text-[10px] text-[#64748B] dark:text-zinc-400 block">real-time streaming</span>
              </div>

              <div class="p-4 rounded-2xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/5 space-y-1 shadow-xs">
                <span class="text-[10px] font-mono-tag uppercase text-[#64748B] dark:text-zinc-400 font-bold block">VRAM Footprint</span>
                <p class="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white font-mono-tag">{{ aiMetrics.vram }} MB</p>
                <span class="text-[10px] text-[#64748B] dark:text-zinc-400 block">GPU memory usage</span>
              </div>

              <div class="p-4 rounded-2xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/5 space-y-1 shadow-xs">
                <span class="text-[10px] font-mono-tag uppercase text-[#64748B] dark:text-zinc-400 font-bold block">Compression Boost</span>
                <p class="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 font-mono-tag">{{ aiMetrics.compression }}</p>
                <span class="text-[10px] text-[#64748B] dark:text-zinc-400 block">vs FP32 raw weights</span>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 2: AGENTIC WORKFLOW & RAG SIMULATOR -->
        <div v-if="activeRaqwanTab === 'agentic'" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div class="lg:col-span-6 space-y-4">
              <div class="space-y-2">
                <h3 class="text-lg font-bold text-[#1C1313] dark:text-white">Autonomous Multi-Agent Orchestrator</h3>
                <p class="text-xs text-[#5C4848] dark:text-zinc-400">Simulasikan eksekusi task otonom dengan tool-calling, hybrid RAG, dan self-reflection loop.</p>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-mono-tag uppercase text-[#5C4848] dark:text-zinc-400 font-bold block">User Request Prompt</label>
                <input 
                  type="text" 
                  v-model="agentPrompt"
                  class="w-full px-4 py-3 rounded-2xl bg-white dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 text-[#1C1313] dark:text-white text-xs font-mono-tag focus:border-[#047857] focus:outline-none shadow-xs"
                />
              </div>

              <button 
                @click="runAgenticSimulation"
                :disabled="agenticRunning"
                class="px-6 py-3 rounded-2xl bg-[#047857] hover:bg-[#065F46] text-white font-mono-tag text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md shadow-[#047857]/30"
              >
                <Play class="w-4 h-4 fill-white" />
                <span>{{ agenticRunning ? 'Executing Agentic Pipeline...' : 'Run Agentic Simulation' }}</span>
              </button>
            </div>

            <!-- Pipeline Visual DAG -->
            <div class="lg:col-span-6 p-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0B0C0E] border border-[#E2E8F0] dark:border-white/10 space-y-4 font-mono-tag shadow-xs transition-colors">
              <div class="flex items-center gap-2 pb-2 border-b border-[#E2E8F0] dark:border-white/10 text-xs font-bold text-[#0F172A] dark:text-white uppercase">
                <Terminal class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>DAG State Machine Execution</span>
              </div>

              <div class="space-y-2 text-xs">
                <div 
                  v-for="(stepText, sIdx) in ['Planner Agent', 'Vector DB Retrieval', 'Tool Executor (Vision)', 'Critic & Guard Agent', 'Final Synthesizer']" 
                  :key="sIdx"
                  class="p-2.5 rounded-xl border flex items-center justify-between transition-all"
                  :class="[
                    agentStep > sIdx 
                      ? 'bg-[#047857]/15 dark:bg-[#047857]/20 border-[#047857]/40 text-[#047857] dark:text-emerald-300 font-bold'
                      : agentStep === sIdx + 1 
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300 animate-pulse font-bold'
                        : 'bg-white dark:bg-white/5 border-[#E2E8F0] dark:border-white/5 text-[#64748B] dark:text-zinc-400'
                  ]"
                >
                  <span>{{ sIdx + 1 }}. {{ stepText }}</span>
                  <CheckCircle2 v-if="agentStep > sIdx" class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              <!-- Terminal Log output -->
              <div v-if="agentLogs.length" class="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px] text-zinc-300 max-h-32 overflow-y-auto">
                <p v-for="(log, lIdx) in agentLogs" :key="lIdx" class="text-emerald-400">> {{ log }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 3: GAN LATENT SPACE EXPLORER -->
        <div v-if="activeRaqwanTab === 'gan'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 space-y-6">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-[#1C1313] dark:text-white">Generative Adversarial Network (GAN) Explorer</h3>
              <p class="text-xs text-[#5C4848] dark:text-zinc-400">Atur parameter noise seed dan WGAN-GP gradient penalty untuk mensimulasikan kestabilan sintesis citra biomedis.</p>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-mono-tag">
                  <span class="text-[#5C4848] dark:text-zinc-400 font-bold">Latent Seed (Z-Space):</span>
                  <span class="text-purple-600 dark:text-purple-400 font-bold">#{{ ganNoise }}</span>
                </div>
                <input type="range" min="1" max="100" v-model.number="ganNoise" class="w-full accent-purple-500 cursor-pointer" />
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-mono-tag">
                  <span class="text-[#5C4848] dark:text-zinc-400 font-bold">WGAN-GP Penalty Fidelity:</span>
                  <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ ganFidelity }}%</span>
                </div>
                <input type="range" min="40" max="100" v-model.number="ganFidelity" class="w-full accent-[#047857] cursor-pointer" />
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 p-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0B0C0E] border border-[#E2E8F0] dark:border-white/10 space-y-4 shadow-xs transition-colors">
            <span class="text-xs font-mono-tag font-bold uppercase text-[#0F172A] dark:text-white block pb-2 border-b border-[#E2E8F0] dark:border-white/10">Synthesis Quality Metrics</span>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/5 space-y-1 shadow-xs">
                <span class="text-[10px] font-mono-tag uppercase text-[#64748B] dark:text-zinc-400 font-bold block">Fréchet Inception Distance (FID)</span>
                <p class="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono-tag">{{ ganMetrics.fid }}</p>
                <span class="text-[10px] text-[#64748B] dark:text-zinc-400 block">Lower score = higher realism</span>
              </div>
              <div class="p-4 rounded-2xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/5 space-y-1 shadow-xs">
                <span class="text-[10px] font-mono-tag uppercase text-[#64748B] dark:text-zinc-400 font-bold block">Mode Collapse Risk</span>
                <p class="text-lg font-black text-purple-600 dark:text-purple-400 font-mono-tag">{{ ganMetrics.modeCollapseRisk }}</p>
                <span class="text-[10px] text-[#64748B] dark:text-zinc-400 block">Wasserstein convergence</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════════════════ -->
      <!-- NADYA PM & UI/UX SANDBOX                    -->
      <!-- ═══════════════════════════════════════════ -->
      <div 
        v-else
        class="p-4 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[36px] bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 shadow-lg space-y-6 sm:space-y-8 relative overflow-hidden"
      >
        <!-- Tab Selector Switcher (Scrollable on mobile) -->
        <div class="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 max-w-full overflow-x-auto custom-scroll pb-2 sm:pb-1.5">
          <button
            @click="activeNadyaTab = 'uiux'"
            class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            :class="[
              activeNadyaTab === 'uiux'
                ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/25'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <Layers class="w-4 h-4 shrink-0" />
            <span>UI/UX Design Tokens</span>
          </button>

          <button
            @click="activeNadyaTab = 'metrics'"
            class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            :class="[
              activeNadyaTab === 'metrics'
                ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/25'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <TrendingUp class="w-4 h-4 shrink-0" />
            <span>Business Impact Simulator</span>
          </button>

          <button
            @click="activeNadyaTab = 'pm'"
            class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-mono-tag font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            :class="[
              activeNadyaTab === 'pm'
                ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/25'
                : 'text-[#5C4848] dark:text-zinc-400 hover:text-[#1C1313] dark:hover:text-white'
            ]"
          >
            <FileText class="w-4 h-4 shrink-0" />
            <span>PM RICE Prioritizer</span>
          </button>
        </div>

        <!-- TAB 1: UI/UX DESIGN SYSTEM TOKENS -->
        <div v-if="activeNadyaTab === 'uiux'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 space-y-6">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-[#1C1313] dark:text-white">Design Token Controls</h3>
              <p class="text-xs text-[#5C4848] dark:text-zinc-400">Ubah token desain secara langsung dan amati komponen antarmuka merespons secara real-time.</p>
            </div>

            <!-- Border Radius Slider -->
            <div class="space-y-2">
              <div class="flex items-center justify-between text-xs font-mono-tag">
                <span class="text-[#5C4848] dark:text-zinc-400 font-bold">Corner Radius:</span>
                <span class="text-[#9E0402] dark:text-[#ff4d4d] font-bold">{{ borderRadius }}px</span>
              </div>
              <input type="range" min="4" max="32" v-model="borderRadius" class="w-full accent-[#9E0402] cursor-pointer" />
            </div>

            <!-- Theme Tone Selection -->
            <div class="space-y-2">
              <span class="text-xs font-mono-tag uppercase text-[#5C4848] dark:text-zinc-400 font-bold block">Palet Warna Utama</span>
              <div class="flex gap-2">
                <button
                  v-for="t in [{ id: 'primary', name: 'Crimson Red (#9E0402)', bg: 'bg-[#9E0402]' }, { id: 'secondary', name: 'Ice Blue (#9FC2EA)', bg: 'bg-[#9FC2EA]' }, { id: 'dark', name: 'Obsidian (#15161B)', bg: 'bg-[#15161B]' }]"
                  :key="t.id"
                  @click="selectedTheme = t.id"
                  class="flex-1 py-2 px-3 rounded-xl border text-xs font-mono-tag font-bold flex items-center justify-center gap-2 cursor-pointer transition-all"
                  :class="selectedTheme === t.id ? 'border-[#9E0402] bg-white dark:bg-white/10 shadow-xs' : 'border-[#EEDCDC] dark:border-white/10'"
                >
                  <span class="w-3 h-3 rounded-full" :class="t.bg"></span>
                  <span>{{ t.name.split(' ')[0] }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Component Sandbox Preview -->
          <div class="lg:col-span-6 p-8 rounded-3xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 flex flex-col items-center justify-center space-y-6">
            <div 
              class="w-full max-w-sm p-6 bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 shadow-xl space-y-4"
              :style="{ borderRadius: `${borderRadius}px` }"
            >
              <div class="flex items-center gap-3">
                <div 
                  class="w-10 h-10 flex items-center justify-center text-white font-extrabold text-sm"
                  :class="selectedTheme === 'secondary' ? 'bg-[#9FC2EA] text-[#1E3A60]' : selectedTheme === 'dark' ? 'bg-zinc-800' : 'bg-[#9E0402]'"
                  :style="{ borderRadius: `${Math.max(4, borderRadius / 2)}px` }"
                >
                  UI
                </div>
                <div>
                  <h4 class="font-bold text-sm text-[#1C1313] dark:text-white">Design Token Live Preview</h4>
                  <span class="text-[10px] font-mono-tag text-[#5C4848] dark:text-zinc-400">WCAG AAA Accessible</span>
                </div>
              </div>

              <button
                @click="simulateLoading"
                class="w-full py-3 text-xs font-mono-tag font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                :class="selectedTheme === 'secondary' ? 'bg-[#1E3A60] hover:bg-[#2A4D7E]' : selectedTheme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-[#9E0402] hover:bg-[#B80604]'"
                :style="{ borderRadius: `${borderRadius}px` }"
              >
                <RefreshCw v-if="buttonState === 'loading'" class="w-4 h-4 animate-spin" />
                <CheckCircle2 v-else-if="buttonState === 'success'" class="w-4 h-4" />
                <span>{{ buttonState === 'loading' ? 'Processing...' : buttonState === 'success' ? 'State Verified!' : 'Trigger Micro-Interaction' }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- TAB 2: BUSINESS IMPACT SIMULATOR -->
        <div v-if="activeNadyaTab === 'metrics'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 space-y-5">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-[#1C1313] dark:text-white">Product Growth & Conversion Model</h3>
              <p class="text-xs text-[#5C4848] dark:text-zinc-400">Hitung proyeksi pendapatan tambahan hasil optimasi conversion funnel dan perbaikan UX.</p>
            </div>

            <div class="space-y-4">
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-mono-tag">
                  <span class="text-[#5C4848] dark:text-zinc-400 font-bold">Monthly Active Users (MAU):</span>
                  <span class="text-[#9E0402] dark:text-[#ff4d4d] font-bold">{{ baselineUsers.toLocaleString('id-ID') }} users</span>
                </div>
                <input type="range" min="10000" max="200000" step="5000" v-model.number="baselineUsers" class="w-full accent-[#9E0402] cursor-pointer" />
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-mono-tag">
                  <span class="text-[#5C4848] dark:text-zinc-400 font-bold">Baseline Conversion Rate:</span>
                  <span class="text-[#9E0402] dark:text-[#ff4d4d] font-bold">{{ conversionRate }}%</span>
                </div>
                <input type="range" min="0.5" max="8.0" step="0.1" v-model.number="conversionRate" class="w-full accent-[#9E0402] cursor-pointer" />
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 space-y-4">
            <span class="text-xs font-mono-tag uppercase text-[#9E0402] dark:text-[#ff4d4d] font-bold block">Projected Revenue Lift (+28% UX Overhaul)</span>
            <p class="text-3xl sm:text-4xl font-black text-[#1C1313] dark:text-white font-mono-tag">+Rp {{ projectedImpact.revenueGain }}</p>
            <div class="grid grid-cols-2 gap-4 pt-3 border-t border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag">
              <div>
                <span class="text-zinc-400 block">Baseline Orders:</span>
                <span class="font-bold text-[#1C1313] dark:text-white">{{ projectedImpact.currentOrders }} orders/bln</span>
              </div>
              <div>
                <span class="text-zinc-400 block">Projected Orders:</span>
                <span class="font-bold text-emerald-500">{{ projectedImpact.newOrders }} orders/bln</span>
              </div>
            </div>
          </div>
        </div>

        <!-- TAB 3: PM RICE PRIORITIZATION -->
        <div v-if="activeNadyaTab === 'pm'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 space-y-4">
            <h3 class="text-lg font-bold text-[#1C1313] dark:text-white">RICE Prioritization Framework</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[11px] font-mono-tag font-bold text-zinc-400">Reach (0 - 100): {{ rice.reach }}</label>
                <input type="range" min="10" max="100" v-model.number="rice.reach" class="w-full accent-[#9E0402]" />
              </div>
              <div class="space-y-1">
                <label class="text-[11px] font-mono-tag font-bold text-zinc-400">Impact (1 - 3): {{ rice.impact }}</label>
                <input type="range" min="1" max="3" v-model.number="rice.impact" class="w-full accent-[#9E0402]" />
              </div>
              <div class="space-y-1">
                <label class="text-[11px] font-mono-tag font-bold text-zinc-400">Confidence (%): {{ rice.confidence }}%</label>
                <input type="range" min="50" max="100" v-model.number="rice.confidence" class="w-full accent-[#9E0402]" />
              </div>
              <div class="space-y-1">
                <label class="text-[11px] font-mono-tag font-bold text-zinc-400">Effort (weeks): {{ rice.effort }}w</label>
                <input type="range" min="1" max="6" v-model.number="rice.effort" class="w-full accent-[#9E0402]" />
              </div>
            </div>
          </div>

          <div class="lg:col-span-6 p-8 rounded-3xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 text-center space-y-2">
            <span class="text-xs font-mono-tag uppercase text-[#9E0402] dark:text-[#ff4d4d] font-bold block">Calculated RICE Score</span>
            <p class="text-5xl font-black text-[#1C1313] dark:text-white font-mono-tag">{{ riceScore }}</p>
            <p class="text-xs text-zinc-400 font-mono-tag">Score tinggi = Prioritas implementasi sprint berikutnya</p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
