<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Play, 
  RotateCcw, 
  Layers, 
  Cpu, 
  Activity, 
  Sliders, 
  Zap, 
  CheckCircle2,
  Workflow,
  SlidersHorizontal,
  BarChart3
} from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

// State
const canvasRef = ref(null)
const isPlaying = ref(true)
const selectedActivation = ref('relu') // 'relu' | 'gelu' | 'leaky_relu' | 'sigmoid'
const selectedKernel = ref('sobel') // 'sobel' | 'sharpen' | 'gaussian' | 'ridge'
const selectedInputPattern = ref('vehicle') // 'vehicle' | 'drone' | 'pedestrian' | 'edge'

const isPulseActive = ref(false)
const pulseProgress = ref(0) // 0 to 1
let pulseStartTime = 0

// Telemetry & Inspector state
const hoveredNode = ref(null)
const forwardPassCount = ref(1)

// Presets with unique mathematical activation signatures & class probabilities
const presets = {
  vehicle: {
    id: 'vehicle',
    name: 'Vehicle Detection',
    domain: 'Automotive Edge Vision',
    dataset: 'Waymo / KITTI Benchmark',
    primaryColor: '#10b981', // Emerald
    accentColor: '#06b6d4',  // Cyan
    classes: [
      { label: 'Autonomous Vehicle', conf: 96.8, color: '#10b981' },
      { label: 'Urban Pedestrian', conf: 1.8, color: '#06b6d4' },
      { label: 'Traffic Signal', conf: 0.8, color: '#64748b' },
      { label: 'Road Obstacle', conf: 0.4, color: '#475569' },
      { label: 'Background Noise', conf: 0.2, color: '#334155' }
    ],
    layerWeights: [
      [0.9, 0.4, 0.85, 0.95, 0.3, 0.8],
      [0.95, 0.2, 0.8, 0.9, 0.1, 0.85, 0.4, 0.9],
      [0.9, 0.3, 0.95, 0.1, 0.85, 0.4],
      [0.95, 0.1, 0.88, 0.2, 0.92, 0.3, 0.85],
      [0.95, 0.2, 0.9, 0.15, 0.88, 0.25, 0.92, 0.1],
      [0.98, 0.05, 0.02, 0.01, 0.01]
    ]
  },
  drone: {
    id: 'drone',
    name: 'Aerial Drone',
    domain: 'High-Altitude Aerial UAV',
    dataset: 'VisDrone Benchmark',
    primaryColor: '#06b6d4', // Cyan
    accentColor: '#34d399',  // Lime-Emerald
    classes: [
      { label: 'Autonomous Drone', conf: 98.4, color: '#06b6d4' },
      { label: 'Aerial Obstacle', conf: 1.1, color: '#10b981' },
      { label: 'Bird / Wildlife', conf: 0.3, color: '#64748b' },
      { label: 'Atmospheric Cloud', conf: 0.1, color: '#475569' },
      { label: 'Ground Object', conf: 0.1, color: '#334155' }
    ],
    layerWeights: [
      [0.95, 0.9, 0.2, 0.1, 0.85, 0.9],
      [0.92, 0.88, 0.15, 0.95, 0.9, 0.2, 0.85, 0.1],
      [0.95, 0.9, 0.15, 0.88, 0.2, 0.92],
      [0.9, 0.95, 0.1, 0.85, 0.92, 0.2, 0.9],
      [0.92, 0.95, 0.1, 0.88, 0.9, 0.15, 0.85, 0.2],
      [0.98, 0.04, 0.01, 0.01, 0.01]
    ]
  },
  pedestrian: {
    id: 'pedestrian',
    name: 'Pedestrian Target',
    domain: 'Autonomous Safety & MOT',
    dataset: 'MOT17 / CityScapes',
    primaryColor: '#f59e0b', // Amber
    accentColor: '#10b981',  // Emerald
    classes: [
      { label: 'Urban Pedestrian', conf: 95.2, color: '#f59e0b' },
      { label: 'Cyclist / Mobility', conf: 3.2, color: '#10b981' },
      { label: 'Static Post / Bollard', conf: 0.9, color: '#64748b' },
      { label: 'Building Edge', conf: 0.4, color: '#475569' },
      { label: 'Pavement Clutter', conf: 0.3, color: '#334155' }
    ],
    layerWeights: [
      [0.4, 0.95, 0.92, 0.88, 0.95, 0.3],
      [0.3, 0.9, 0.95, 0.85, 0.92, 0.9, 0.25, 0.88],
      [0.2, 0.95, 0.9, 0.88, 0.92, 0.3],
      [0.25, 0.92, 0.95, 0.9, 0.88, 0.3, 0.85],
      [0.2, 0.95, 0.9, 0.85, 0.92, 0.88, 0.25, 0.9],
      [0.95, 0.08, 0.02, 0.01, 0.01]
    ]
  },
  edge: {
    id: 'edge',
    name: 'Geometric Contour',
    domain: 'Spatial Feature Saliency',
    dataset: 'BSR / BSDS500 Benchmark',
    primaryColor: '#a855f7', // Purple
    accentColor: '#06b6d4',  // Cyan
    classes: [
      { label: 'Salient Boundary', conf: 93.6, color: '#a855f7' },
      { label: 'Surface Normal', conf: 4.2, color: '#06b6d4' },
      { label: 'Corner Junction', conf: 1.4, color: '#64748b' },
      { label: 'Texture Gradient', conf: 0.5, color: '#475569' },
      { label: 'Specular Noise', conf: 0.3, color: '#334155' }
    ],
    layerWeights: [
      [0.95, 0.2, 0.95, 0.2, 0.95, 0.2],
      [0.9, 0.15, 0.92, 0.1, 0.95, 0.2, 0.9, 0.15],
      [0.95, 0.1, 0.92, 0.2, 0.95, 0.1],
      [0.92, 0.15, 0.95, 0.1, 0.9, 0.2, 0.95],
      [0.95, 0.1, 0.9, 0.2, 0.95, 0.15, 0.9, 0.1],
      [0.94, 0.09, 0.03, 0.01, 0.01]
    ]
  }
}

const currentPreset = computed(() => presets[selectedInputPattern.value] || presets.vehicle)

// 3x3 Convolution Kernels
const kernelMatrices = {
  sobel: {
    name: 'Sobel-X Filter',
    type: 'Spatial Edge Differential',
    matrix: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
    formula: 'G_x = [[-1, 0, +1], [-2, 0, +2], [-1, 0, +1]]'
  },
  sharpen: {
    name: 'High-Pass Sharpen',
    type: 'High Frequency Peak',
    matrix: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
    formula: 'K = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]]'
  },
  gaussian: {
    name: 'Gaussian Blur (σ=1)',
    type: 'Noise Denoising',
    matrix: [[0.06, 0.12, 0.06], [0.12, 0.25, 0.12], [0.06, 0.12, 0.06]],
    formula: 'G(x,y) = \\frac{1}{2\\pi\\sigma^2} e^{-\\frac{x^2+y^2}{2\\sigma^2}}'
  },
  ridge: {
    name: 'Laplacian Ridge',
    type: '2nd Order Derivative',
    matrix: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
    formula: '\\nabla^2 f = \\frac{\\partial^2 f}{\\partial x^2} + \\frac{\\partial^2 f}{\\partial y^2}'
  }
}

const currentKernel = computed(() => kernelMatrices[selectedKernel.value] || kernelMatrices.sobel)

// Clean Layer Definitions
const layerSpecs = [
  { id: 'input', name: 'Input Tensor', shape: '3×32×32', desc: 'Normalized RGB Matrix', nodes: 5 },
  { id: 'conv1', name: 'Conv2D (16@3×3)', shape: '16×28×28', desc: 'Low-level Edge Primitives', nodes: 7 },
  { id: 'pool1', name: 'MaxPool (2×2)', shape: '16×14×14', desc: 'Spatial Downsampling', nodes: 5 },
  { id: 'conv2', name: 'Conv2D (32@3×3)', shape: '32×10×10', desc: 'Deep Semantic Features', nodes: 6 },
  { id: 'dense', name: 'Dense (FC-64)', shape: '64 Units', desc: 'Latent Manifold Vector', nodes: 7 },
  { id: 'softmax', name: 'Softmax Out', shape: '5 Classes', desc: 'Calibrated Class Probabilities', nodes: 5 }
]

// Activation Calculation Function
const computeActivation = (rawVal, actType) => {
  if (actType === 'relu') return Math.max(0, rawVal)
  if (actType === 'leaky_relu') return rawVal >= 0 ? rawVal : rawVal * 0.15
  if (actType === 'gelu') return 0.5 * rawVal * (1 + Math.tanh(0.797884 * (rawVal + 0.044715 * Math.pow(rawVal, 3))))
  if (actType === 'sigmoid') return 1 / (1 + Math.exp(-rawVal * 3))
  return rawVal
}

// Canvas & Animation Loop state
let animationFrameId = null
let visualizerObserver = null
let isCanvasVisible = false
let lastRenderTime = 0
let width = 0
let height = 0
let time = 0

const triggerForwardPass = () => {
  forwardPassCount.value++
  isPulseActive.value = true
  pulseStartTime = performance.now()
}

// Mouse Interaction for Node Hovering
const handleCanvasMouseMove = (e) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  // Check collision with nodes
  const numLayers = layerSpecs.length
  const marginX = Math.max(45, width * 0.08)
  const layerSpacing = (width - marginX * 2) / (numLayers - 1)

  let found = null

  for (let lIdx = 0; lIdx < numLayers; lIdx++) {
    const spec = layerSpecs[lIdx]
    const x = marginX + lIdx * layerSpacing
    const nodeCount = spec.nodes
    const nodeSpacing = Math.min(42, (height - 130) / (nodeCount + 1))
    const startY = 80 + (height - 110 - (nodeCount - 1) * nodeSpacing) / 2

    for (let nIdx = 0; nIdx < nodeCount; nIdx++) {
      const y = startY + nIdx * nodeSpacing
      const dist = Math.hypot(mouseX - x, mouseY - y)
      if (dist < 16) {
        found = { layerIdx: lIdx, nodeIdx: nIdx, x, y, layerName: spec.name }
        break
      }
    }
    if (found) break
  }

  hoveredNode.value = found
}

const handleCanvasMouseLeave = () => {
  hoveredNode.value = null
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  const handleResize = () => {
    const rect = canvas.getBoundingClientRect()
    width = canvas.width = Math.max(760, Math.ceil(rect.width))
    height = canvas.height = Math.max(360, Math.ceil(rect.height || 380))
  }

  handleResize()
  window.addEventListener('resize', handleResize)

  const render = (now = 0) => {
    if (!isCanvasVisible) return

    // Throttle to 30 FPS for 50% CPU savings
    if (now - lastRenderTime < 33) {
      animationFrameId = requestAnimationFrame(render)
      return
    }
    lastRenderTime = now

    time += isPlaying.value ? 0.022 : 0.003

    // Pulse Shockwave Animation
    if (isPulseActive.value) {
      const elapsed = (now - pulseStartTime) / 1100
      pulseProgress.value = elapsed
      if (elapsed >= 1) {
        isPulseActive.value = false
        pulseProgress.value = 0
      }
    }

    ctx.clearRect(0, 0, width, height)

    const dark = isDark.value

    // Calculate Layer Positions horizontally
    const numLayers = layerSpecs.length
    const marginX = Math.max(45, width * 0.08)
    const layerSpacing = (width - marginX * 2) / (numLayers - 1)

    const layerPositions = layerSpecs.map((spec, lIdx) => {
      const x = marginX + lIdx * layerSpacing
      const nodeCount = spec.nodes
      const nodeSpacing = Math.min(42, (height - 130) / (nodeCount + 1))
      const startY = 80 + (height - 110 - (nodeCount - 1) * nodeSpacing) / 2

      const nodeCoords = []
      const weights = currentPreset.value.layerWeights[lIdx] || []

      for (let n = 0; n < nodeCount; n++) {
        const baseWeight = weights[n] !== undefined ? weights[n] : 0.5
        nodeCoords.push({
          x,
          y: startY + n * nodeSpacing,
          layerIdx: lIdx,
          nodeIdx: n,
          baseWeight
        })
      }
      return { spec, x, nodeCoords }
    })

    // ═════════════════════════════════════════════════════════
    // 1. DRAW CLEAN, HIGH-PRECISION SYNAPSES (NO SPAGHETTI)
    // ═════════════════════════════════════════════════════════
    for (let l = 0; l < layerPositions.length - 1; l++) {
      const currentLayer = layerPositions[l]
      const nextLayer = layerPositions[l + 1]
      const layerProg = l / (numLayers - 1)

      for (let i = 0; i < currentLayer.nodeCoords.length; i++) {
        const from = currentLayer.nodeCoords[i]

        for (let j = 0; j < nextLayer.nodeCoords.length; j++) {
          const to = nextLayer.nodeCoords[j]

          // Compute deterministic learned weight
          const rawWeight = (from.baseWeight * 0.6 + to.baseWeight * 0.4)
          const dynamicActivation = computeActivation(
            rawWeight + Math.sin(l * 1.5 + i * 2 + j * 1.2 + time) * 0.25,
            selectedActivation.value
          )

          // Pulse wave packet flow
          const isForwardPulse = isPulseActive.value && 
            pulseProgress.value >= layerProg && 
            pulseProgress.value <= layerProg + 0.24

          // Interactive Hover Synapse Filter: Only highlight connected lines when hovered!
          const isNodeConnectedToHover = hoveredNode.value && (
            (hoveredNode.value.layerIdx === l && hoveredNode.value.nodeIdx === i) ||
            (hoveredNode.value.layerIdx === l + 1 && hoveredNode.value.nodeIdx === j)
          )

          ctx.beginPath()
          ctx.moveTo(from.x, from.y)

          // Sleek horizontal S-curve bezier with tight curvature (clean, not messy)
          const cx1 = from.x + (to.x - from.x) * 0.55
          const cy1 = from.y
          const cx2 = from.x + (to.x - from.x) * 0.45
          const cy2 = to.y
          ctx.bezierCurveTo(cx1, cy1, cx2, cy2, to.x, to.y)

          if (isForwardPulse) {
            ctx.strokeStyle = currentPreset.value.primaryColor
            ctx.lineWidth = 2.2
            ctx.shadowColor = currentPreset.value.primaryColor
            ctx.shadowBlur = 8
            ctx.stroke()
          } else if (isNodeConnectedToHover) {
            ctx.strokeStyle = dark ? 'rgba(52, 211, 153, 0.95)' : 'rgba(4, 120, 87, 0.95)'
            ctx.lineWidth = 2.0
            ctx.shadowColor = dark ? '#34d399' : '#047857'
            ctx.shadowBlur = 7
            ctx.stroke()
          } else if (hoveredNode.value) {
            // Unconnected synapses dim out to near 0 for high clarity
            ctx.strokeStyle = dark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.03)'
            ctx.lineWidth = 0.5
            ctx.shadowBlur = 0
            ctx.stroke()
          } else {
            // Resting state: elegant, subtle hairline connections (10-14% opacity, NEVER muddy)
            ctx.strokeStyle = dark 
              ? `rgba(4, 120, 87, ${0.07 + dynamicActivation * 0.12})` 
              : `rgba(4, 120, 87, ${0.10 + dynamicActivation * 0.15})`
            ctx.lineWidth = 0.8
            ctx.shadowBlur = 0
            ctx.stroke()
          }
        }
      }
    }

    // Reset shadow blur
    ctx.shadowBlur = 0

    // ═════════════════════════════════════════════════════════
    // 2. DRAW LAYER HEADERS & LABELS
    // ═════════════════════════════════════════════════════════
    layerPositions.forEach((layer, lIdx) => {
      const isLayerActive = hoveredNode.value && hoveredNode.value.layerIdx === lIdx

      ctx.fillStyle = isLayerActive 
        ? (dark ? currentPreset.value.primaryColor : '#047857') 
        : (dark ? 'rgba(255, 255, 255, 0.95)' : '#0F172A')
      ctx.font = 'bold 11px "Fragment Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText(layer.spec.name, layer.x, 30)

      ctx.fillStyle = dark ? 'rgba(156, 163, 175, 0.7)' : '#64748B'
      ctx.font = '10px "Fragment Mono", monospace'
      ctx.fillText(layer.spec.shape, layer.x, 46)

      // ═════════════════════════════════════════════════════════
      // 3. DRAW HIGH-PRECISION NEURON NODES
      // ═════════════════════════════════════════════════════════
      layer.nodeCoords.forEach((node, nIdx) => {
        const rawAct = node.baseWeight + Math.sin(time * 2.2 + lIdx * 1.5 + nIdx * 1.1) * 0.3
        const finalAct = computeActivation(rawAct, selectedActivation.value)
        const isHovered = hoveredNode.value && hoveredNode.value.layerIdx === lIdx && hoveredNode.value.nodeIdx === nIdx
        const isTopOutput = lIdx === layerPositions.length - 1 && nIdx === 0

        const nodeRadius = isTopOutput ? 8 : (isHovered ? 8 : 5.5)

        // Outer halo ring when active or top winner
        if (isTopOutput || isHovered) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, nodeRadius + 5, 0, Math.PI * 2)
          ctx.strokeStyle = dark ? currentPreset.value.primaryColor : '#047857'
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Neuron Body
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)
        ctx.fillStyle = isTopOutput
          ? (dark ? currentPreset.value.primaryColor : '#047857')
          : isHovered
            ? (dark ? '#34d399' : '#047857')
            : (dark 
                ? `rgba(16, 185, 129, ${0.25 + finalAct * 0.75})` 
                : `rgba(4, 120, 87, ${0.25 + finalAct * 0.75})`)
        ctx.fill()

        ctx.strokeStyle = dark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      })
    })

    // ═════════════════════════════════════════════════════════
    // 4. FLOATING TELEMETRY BADGE ON HOVER
    // ═════════════════════════════════════════════════════════
    if (hoveredNode.value) {
      const { x, y, layerName, nodeIdx, layerIdx } = hoveredNode.value
      const targetNode = layerPositions[layerIdx]?.nodeCoords[nodeIdx]
      if (targetNode) {
        const val = computeActivation(targetNode.baseWeight, selectedActivation.value).toFixed(3)
        const tooltipText = `${layerName} [Node #${nodeIdx + 1}] • act: ${val}`
        
        ctx.fillStyle = dark ? 'rgba(11, 12, 16, 0.95)' : 'rgba(255, 255, 255, 0.98)'
        ctx.strokeStyle = dark ? 'rgba(52, 211, 153, 0.7)' : '#047857'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(targetNode.x - 85, targetNode.y - 32, 170, 22, 6)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = dark ? '#34d399' : '#047857'
        ctx.font = 'bold 9px "Fragment Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillText(tooltipText, targetNode.x, targetNode.y - 18)
      }
    }

    animationFrameId = requestAnimationFrame(render)
  }

  // IntersectionObserver: Only render when visible in viewport
  visualizerObserver = new IntersectionObserver((entries) => {
    const isVisible = entries[0]?.isIntersecting
    if (isVisible) {
      if (!isCanvasVisible) {
        isCanvasVisible = true
        lastRenderTime = performance.now()
        animationFrameId = requestAnimationFrame(render)
      }
    } else {
      isCanvasVisible = false
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    }
  }, { threshold: 0.05 })

  visualizerObserver.observe(canvas)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (visualizerObserver) {
      visualizerObserver.disconnect()
      visualizerObserver = null
    }
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
})
</script>

<template>
  <div class="space-y-6 select-none font-sans">
    
    <!-- ══════════════════════════════════════════════════════════
         TOP CONTROLS & SENSOR STREAM SWITCHER
         ══════════════════════════════════════════════════════════ -->
    <div class="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] dark:bg-[#0B0C0E] border border-[#E2E8F0] dark:border-white/10 shadow-xs space-y-4 transition-colors">
      
      <!-- Top Row: Input Stream Selector & Run Forward Pass CTA -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        
        <!-- Left: Input Stream Title & Pill Buttons (Flex Wrap, NO scrollbar cutoff!) -->
        <div class="flex items-center gap-2.5 flex-wrap">
          <span class="text-xs font-mono-tag font-bold uppercase text-[#475569] dark:text-zinc-400 shrink-0 flex items-center gap-1.5">
            <Activity class="w-3.5 h-3.5 text-emerald-500" />
            <span>Input Stream:</span>
          </span>
          <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10 shadow-2xs">
            <button
              v-for="(p, key) in presets"
              :key="key"
              @click="selectedInputPattern = key; triggerForwardPass()"
              class="px-3 py-1.5 rounded-lg text-xs font-mono-tag font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              :class="selectedInputPattern === key 
                ? 'bg-[#047857] text-white shadow-xs' 
                : 'text-[#64748B] dark:text-zinc-400 hover:text-[#0F172A] dark:hover:text-white'"
            >
              <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: p.primaryColor }"></span>
              <span>{{ p.name }}</span>
            </button>
          </div>
        </div>

        <!-- Right: Primary Forward Pass Action Button -->
        <button
          @click="triggerForwardPass"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#047857] to-emerald-600 hover:from-[#059669] hover:to-teal-600 text-white text-xs font-mono-tag font-bold uppercase tracking-wider shadow-md shadow-[#047857]/25 flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shrink-0 self-start lg:self-auto"
        >
          <Play class="w-3.5 h-3.5 fill-white" :class="{ 'animate-spin': isPulseActive }" />
          <span>{{ isPulseActive ? 'Forward Signal Flowing...' : 'Run Forward Pass' }}</span>
        </button>

      </div>

      <!-- Bottom Sub-bar: Real-Time Edge Hardware Telemetry Chips -->
      <div class="pt-3 border-t border-[#E2E8F0] dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 font-mono-tag text-[11px]">
        <div class="flex items-center gap-2 flex-wrap text-[#475569] dark:text-zinc-400">
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10">
            Latency: <strong class="text-emerald-500 font-bold">3.4ms</strong>
          </span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10">
            Compute: <strong class="text-cyan-500 font-bold">42.8M FLOPs</strong>
          </span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10">
            Engine: <strong class="text-[#0F172A] dark:text-white font-bold">TensorRT INT8</strong>
          </span>
          <span class="px-2.5 py-1 rounded-md bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10">
            Target: <strong class="text-emerald-600 dark:text-emerald-400 font-bold">{{ currentPreset.dataset }}</strong>
          </span>
        </div>

        <div class="text-[10px] text-[#64748B] dark:text-zinc-500 flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CUDA Acceleration • Sub-millisecond Streaming</span>
        </div>
      </div>

    </div>

    <!-- ══════════════════════════════════════════════════════════
         INTERACTIVE NEURAL NETWORK CANVAS (LIVE, HIGH-PRECISION)
         ══════════════════════════════════════════════════════════ -->
    <div class="rounded-2xl sm:rounded-3xl bg-[#090A0D] border border-white/10 overflow-hidden relative shadow-2xl">
      
      <!-- Top HUD Header Inside Canvas Card -->
      <div class="px-5 py-3.5 border-b border-white/10 flex items-center justify-between text-xs font-mono-tag text-zinc-400 bg-white/[0.02]">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-white font-bold">Interactive Deep Vision Graph</span>
          <span class="text-zinc-500">• Hover node to inspect synaptic paths</span>
        </div>
        <div class="flex items-center gap-4 text-[11px]">
          <span>Pass: <strong class="text-emerald-400">#{{ forwardPassCount }}</strong></span>
          <span>Target: <strong class="text-white">{{ currentPreset.dataset }}</strong></span>
        </div>
      </div>

      <!-- The Real-time Interactive Graph Canvas -->
      <div class="relative w-full h-[360px] sm:h-[400px]">
        <canvas
          ref="canvasRef"
          class="w-full h-full block cursor-crosshair"
          @mousemove="handleCanvasMouseMove"
          @mouseleave="handleCanvasMouseLeave"
        ></canvas>
      </div>

    </div>

    <!-- ══════════════════════════════════════════════════════════
         LOWER TELEMETRY: SOFTMAX PROBABILITIES & KERNEL MATH
         ══════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      <!-- Left: Softmax Classification Predictions -->
      <div class="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#0E0F14] border border-[#EEDCDC] dark:border-white/10 shadow-sm space-y-4">
        <div class="flex items-center justify-between border-b border-[#EEDCDC] dark:border-white/10 pb-3">
          <div class="flex items-center gap-2">
            <BarChart3 class="w-4 h-4 text-emerald-500" />
            <h4 class="text-xs font-mono-tag font-bold uppercase text-[#1C1313] dark:text-white">
              Softmax Probability Output
            </h4>
          </div>
          <span class="text-xs font-mono-tag font-bold text-emerald-500">
            Top: {{ currentPreset.classes[0].label }}
          </span>
        </div>

        <div class="space-y-2.5">
          <div
            v-for="(cls, cIdx) in currentPreset.classes"
            :key="cIdx"
            class="flex items-center gap-3 text-xs"
          >
            <span class="w-36 truncate font-mono-tag text-[#5C4848] dark:text-zinc-400 text-[11px]">
              {{ cls.label }}
            </span>
            <div class="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
              <div
                class="h-full rounded-full transition-all duration-700 ease-out"
                :style="{
                  width: `${cls.conf}%`,
                  backgroundColor: cIdx === 0 ? currentPreset.primaryColor : '#64748b'
                }"
              ></div>
            </div>
            <span class="w-12 text-right font-mono-tag text-[11px] font-bold" :class="cIdx === 0 ? 'text-emerald-500 dark:text-emerald-400' : 'text-zinc-400'">
              {{ cls.conf }}%
            </span>
          </div>
        </div>
      </div>

      <!-- Right: Convolution Kernel Math & Activation Operator -->
      <div class="lg:col-span-6 p-5 rounded-2xl bg-white dark:bg-[#0E0F14] border border-[#EEDCDC] dark:border-white/10 shadow-sm space-y-4">
        
        <div class="flex items-center justify-between border-b border-[#EEDCDC] dark:border-white/10 pb-3">
          <div class="flex items-center gap-2">
            <SlidersHorizontal class="w-4 h-4 text-cyan-500" />
            <h4 class="text-xs font-mono-tag font-bold uppercase text-[#1C1313] dark:text-white">
              3×3 Kernel Matrix & Activation
            </h4>
          </div>
          <div class="flex items-center gap-1 text-[10px] font-mono-tag">
            <button
              v-for="(k, key) in kernelMatrices"
              :key="key"
              @click="selectedKernel = key"
              class="px-2 py-0.5 rounded border transition-all cursor-pointer uppercase"
              :class="selectedKernel === key 
                ? 'bg-[#047857] text-white border-[#047857] font-bold' 
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 border-transparent hover:text-black dark:hover:text-white'"
            >
              {{ key }}
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-4">
          <!-- 3x3 Numeric Grid -->
          <div class="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-zinc-50 dark:bg-black/40 border border-[#EEDCDC] dark:border-white/10 shrink-0 font-mono-tag text-xs font-bold text-center">
            <template v-for="(row, r) in currentKernel.matrix" :key="r">
              <div
                v-for="(weight, c) in row"
                :key="c"
                class="w-10 h-7 rounded flex items-center justify-center border"
                :class="weight > 0 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                  : weight < 0 
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30' 
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 border-zinc-200 dark:border-white/5'"
              >
                {{ typeof weight === 'number' ? (weight > 0 ? `+${weight}` : `${weight}`) : weight }}
              </div>
            </template>
          </div>

          <!-- Kernel Details -->
          <div class="space-y-1.5 text-xs text-[#5C4848] dark:text-zinc-300 flex-1">
            <div class="font-bold text-[#1C1313] dark:text-white font-mono-tag">
              {{ currentKernel.name }}
            </div>
            <div class="text-[11px] font-mono-tag text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-1.5 rounded border border-emerald-200 dark:border-emerald-800/40">
              {{ currentKernel.formula }}
            </div>
            <p class="text-[11px] text-[#5C4848] dark:text-zinc-400 leading-relaxed">
              {{ currentKernel.type }} — Menghitung gradien konvolusi spasial untuk mengekstrak feature maps representatif.
            </p>
          </div>
        </div>

        <!-- Non-linear Activation Function Selector -->
        <div class="pt-2 border-t border-[#EEDCDC] dark:border-white/10 flex items-center justify-between text-xs font-mono-tag">
          <span class="text-[#5C4848] dark:text-zinc-400">Non-linear Activation:</span>
          <div class="flex items-center gap-1">
            <button
              v-for="act in ['relu', 'gelu', 'leaky_relu', 'sigmoid']"
              :key="act"
              @click="selectedActivation = act"
              class="px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all cursor-pointer"
              :class="selectedActivation === act 
                ? 'bg-[#047857] text-white' 
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'"
            >
              {{ act }}
            </button>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
