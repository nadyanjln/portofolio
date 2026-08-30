<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Layers, 
  Cpu, 
  Activity, 
  Sliders, 
  Zap, 
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Workflow
} from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

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
const liveFps = ref(60)
const forwardPassCount = ref(1)

// Presets with unique mathematical activation signatures & class probabilities (No emojis)
const presets = {
  vehicle: {
    id: 'vehicle',
    name: 'Vehicle Detection',
    shortName: 'Vehicle',
    desc: 'Deteksi kontur kendaraan dan roda berlatensi rendah',
    primaryColor: '#10b981', // Emerald
    accentColor: '#06b6d4',  // Cyan
    classes: [
      { label: 'Autonomous Vehicle', conf: 96.8, color: '#10b981' },
      { label: 'Urban Pedestrian', conf: 1.8, color: '#06b6d4' },
      { label: 'Traffic Signal', conf: 0.8, color: '#64748b' },
      { label: 'Road Obstacle', conf: 0.4, color: '#475569' },
      { label: 'Background Noise', conf: 0.2, color: '#334155' }
    ],
    nodeWeights: [
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
    shortName: 'Drone',
    desc: 'Deteksi wahana udara pada citra ketinggian',
    primaryColor: '#06b6d4', // Cyan
    accentColor: '#34d399',  // Lime-Emerald
    classes: [
      { label: 'Autonomous Drone', conf: 98.4, color: '#06b6d4' },
      { label: 'Aerial Obstacle', conf: 1.1, color: '#10b981' },
      { label: 'Bird / Wildlife', conf: 0.3, color: '#64748b' },
      { label: 'Weather Noise', conf: 0.1, color: '#475569' },
      { label: 'Ground Target', conf: 0.1, color: '#334155' }
    ],
    nodeWeights: [
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
    shortName: 'Pedestrian',
    desc: 'Deteksi siluet pejalan kaki dan postur gerak tubuh',
    primaryColor: '#f59e0b', // Amber
    accentColor: '#10b981',  // Emerald
    classes: [
      { label: 'Urban Pedestrian', conf: 95.2, color: '#f59e0b' },
      { label: 'Cyclist / Rider', conf: 3.2, color: '#10b981' },
      { label: 'Static Post', conf: 0.9, color: '#64748b' },
      { label: 'Vehicle Edge', conf: 0.4, color: '#475569' },
      { label: 'Background', conf: 0.3, color: '#334155' }
    ],
    nodeWeights: [
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
    shortName: 'Contour',
    desc: 'Ekstraksi gradien spasial dan segmentasi batas geometri',
    primaryColor: '#a855f7', // Purple
    accentColor: '#06b6d4',  // Cyan
    classes: [
      { label: 'Geometric Boundary', conf: 93.6, color: '#a855f7' },
      { label: 'Texture Gradient', conf: 4.2, color: '#06b6d4' },
      { label: 'Corner Point', conf: 1.4, color: '#64748b' },
      { label: 'Surface Normal', conf: 0.5, color: '#475569' },
      { label: 'Noise Artifact', conf: 0.3, color: '#334155' }
    ],
    nodeWeights: [
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

const kernelMatrices = {
  sobel: {
    name: 'Sobel Filter',
    type: 'Edge Detection',
    glowColor: 'rgba(16, 185, 129, 0.9)'
  },
  sharpen: {
    name: 'Sharpen 3×3',
    type: 'High-Pass Peak',
    glowColor: 'rgba(6, 182, 212, 0.9)'
  },
  gaussian: {
    name: 'Gaussian Blur',
    type: 'Denoising Blur',
    glowColor: 'rgba(52, 211, 153, 0.9)'
  },
  ridge: {
    name: 'Ridge Extractor',
    type: 'Laplace Contour',
    glowColor: 'rgba(168, 85, 247, 0.9)'
  }
}

const currentKernel = computed(() => kernelMatrices[selectedKernel.value] || kernelMatrices.sobel)

const layerSpecs = [
  { id: 'input', name: 'Input Tensor', shape: '3×32×32', desc: 'RGB Input Image Stream', nodes: 6 },
  { id: 'conv1', name: 'Conv2D (16@3×3)', shape: '16×28×28', desc: 'Feature Maps & Kernel Scan', nodes: 8 },
  { id: 'pool1', name: 'MaxPool (2×2)', shape: '16×14×14', desc: 'Spatial Downsampling', nodes: 6 },
  { id: 'conv2', name: 'Conv2D (32@3×3)', shape: '32×10×10', desc: 'Deep Semantic Features', nodes: 7 },
  { id: 'dense', name: 'Dense (FC-64)', shape: '64 Units', desc: 'Fully-Connected Latent Vector', nodes: 8 },
  { id: 'softmax', name: 'Softmax Out', shape: '5 Classes', desc: 'Calibrated Class Probabilities', nodes: 5 }
]

// Activation Calculation Function
const computeActivation = (rawVal, actType) => {
  if (actType === 'relu') {
    return Math.max(0, rawVal)
  } else if (actType === 'leaky_relu') {
    return rawVal >= 0 ? rawVal : rawVal * 0.15
  } else if (actType === 'gelu') {
    return 0.5 * rawVal * (1 + Math.tanh(0.797884 * (rawVal + 0.044715 * Math.pow(rawVal, 3))))
  } else if (actType === 'sigmoid') {
    return 1 / (1 + Math.exp(-rawVal * 3))
  }
  return rawVal
}

// Canvas Render Loop
let animationFrameId = null
let width = 0
let height = 0
let time = 0
let lastFpsTime = performance.now()
let frameCount = 0

const triggerForwardPass = () => {
  forwardPassCount.value++
  isPulseActive.value = true
  pulseStartTime = performance.now()
}

// Watchers: Trigger immediate visual wave on setting change
watch([selectedInputPattern, selectedKernel, selectedActivation], () => {
  triggerForwardPass()
})

const handleCanvasMouseMove = (e) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  const numLayers = layerSpecs.length
  const marginX = Math.max(40, width * 0.07)
  const layerSpacing = (width - marginX * 2) / (numLayers - 1)

  let found = null
  for (let l = 0; l < numLayers; l++) {
    const x = marginX + l * layerSpacing
    const nodeCount = layerSpecs[l].nodes
    const nodeSpacing = Math.min(38, (height - 130) / (nodeCount + 1))
    const startY = 85 + (height - 110 - (nodeCount - 1) * nodeSpacing) / 2

    for (let n = 0; n < nodeCount; n++) {
      const y = startY + n * nodeSpacing
      const dx = mouseX - x
      const dy = mouseY - y
      if (Math.sqrt(dx * dx + dy * dy) < 16) {
        found = { layerIdx: l, nodeIdx: n, layerName: layerSpecs[l].name }
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
    height = canvas.height = Math.max(380, Math.ceil(rect.height || 410))
  }

  handleResize()
  window.addEventListener('resize', handleResize)

  const render = (now) => {
    time += isPlaying.value ? 0.022 : 0.003

    // FPS Meter
    frameCount++
    if (now - lastFpsTime >= 1000) {
      liveFps.value = Math.round((frameCount * 1000) / (now - lastFpsTime))
      frameCount = 0
      lastFpsTime = now
    }

    // Pulse Shockwave Animation
    if (isPulseActive.value) {
      const elapsed = (now - pulseStartTime) / 1000
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
    const marginX = Math.max(40, width * 0.07)
    const layerSpacing = (width - marginX * 2) / (numLayers - 1)

    const layerPositions = layerSpecs.map((spec, lIdx) => {
      const x = marginX + lIdx * layerSpacing
      const nodeCount = spec.nodes
      const nodeSpacing = Math.min(38, (height - 130) / (nodeCount + 1))
      const startY = 85 + (height - 110 - (nodeCount - 1) * nodeSpacing) / 2

      const nodeCoords = []
      const weights = currentPreset.value.nodeWeights[lIdx] || []

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

    // 1. Draw Synaptic Weight Connections between Adjacent Layers
    for (let l = 0; l < layerPositions.length - 1; l++) {
      const currentLayer = layerPositions[l]
      const nextLayer = layerPositions[l + 1]
      const layerProg = l / (numLayers - 1)

      for (let i = 0; i < currentLayer.nodeCoords.length; i++) {
        const from = currentLayer.nodeCoords[i]

        for (let j = 0; j < nextLayer.nodeCoords.length; j++) {
          const to = nextLayer.nodeCoords[j]

          const rawWeight = (from.baseWeight * 0.6 + to.baseWeight * 0.4)
          const dynamicActivation = computeActivation(
            rawWeight + Math.sin(l * 1.5 + i * 2 + j * 1.2 + time) * 0.25,
            selectedActivation.value
          )

          const isForwardPulse = isPulseActive.value && 
            pulseProgress.value >= layerProg && 
            pulseProgress.value <= layerProg + 0.25

          const isNodeConnectedToHover = hoveredNode.value && (
            (hoveredNode.value.layerIdx === l && hoveredNode.value.nodeIdx === i) ||
            (hoveredNode.value.layerIdx === l + 1 && hoveredNode.value.nodeIdx === j)
          )

          ctx.beginPath()
          ctx.moveTo(from.x, from.y)

          const cp1x = from.x + (to.x - from.x) * 0.5
          const cp1y = from.y
          const cp2x = from.x + (to.x - from.x) * 0.5
          const cp2y = to.y
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, to.x, to.y)

          if (isForwardPulse) {
            ctx.strokeStyle = currentPreset.value.primaryColor
            ctx.lineWidth = 2.4
            ctx.shadowColor = currentPreset.value.primaryColor
            ctx.shadowBlur = 10
          } else if (isNodeConnectedToHover) {
            ctx.strokeStyle = dark ? 'rgba(52, 211, 153, 0.95)' : 'rgba(4, 120, 87, 0.95)'
            ctx.lineWidth = 2.0
            ctx.shadowColor = dark ? '#34d399' : '#047857'
            ctx.shadowBlur = 8
          } else if (dynamicActivation > 0.5) {
            ctx.strokeStyle = dark
              ? `rgba(4, 120, 87, ${0.15 + dynamicActivation * 0.45})`
              : `rgba(5, 150, 105, ${0.25 + dynamicActivation * 0.55})`
            ctx.lineWidth = 1.0 + dynamicActivation * 0.6
            ctx.shadowBlur = 0
          } else {
            ctx.strokeStyle = dark
              ? (selectedActivation.value === 'relu' ? 'rgba(6, 95, 70, 0.04)' : 'rgba(6, 95, 70, 0.12)')
              : (selectedActivation.value === 'relu' ? 'rgba(148, 163, 184, 0.20)' : 'rgba(148, 163, 184, 0.35)')
            ctx.lineWidth = 0.5
            ctx.shadowBlur = 0
          }
          ctx.stroke()
          ctx.shadowBlur = 0

          // Draw Travelling Electrical Sparks
          if (isPlaying.value || isPulseActive.value) {
            const speedFactor = isForwardPulse ? 1.5 : 0.7
            const particlePhase = (time * speedFactor + (i * 7 + j * 13) * 0.1) % 1
            const px = from.x + (to.x - from.x) * particlePhase
            const py = from.y + (to.y - from.y) * particlePhase + Math.sin(particlePhase * Math.PI) * (j - i) * 3

            if (particlePhase > 0.05 && particlePhase < 0.95 && (i + j) % 2 === 0 && dynamicActivation > 0.3) {
              ctx.beginPath()
              ctx.arc(px, py, isForwardPulse ? 3.0 : 1.5, 0, Math.PI * 2)
              ctx.fillStyle = isForwardPulse ? (dark ? '#ffffff' : '#047857') : currentPreset.value.primaryColor
              ctx.fill()
            }
          }
        }
      }
    }

    // 2. Draw Forward Shockwave Laser Beam
    if (isPulseActive.value) {
      const beamX = marginX + pulseProgress.value * (width - marginX * 2)
      ctx.beginPath()
      ctx.moveTo(beamX, 70)
      ctx.lineTo(beamX, height - 20)
      ctx.strokeStyle = dark ? 'rgba(52, 211, 153, 0.6)' : 'rgba(4, 120, 87, 0.5)'
      ctx.lineWidth = 3
      ctx.shadowColor = currentPreset.value.primaryColor
      ctx.shadowBlur = 16
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // 3. Draw Layer Headers & Bounding Boxes
    layerPositions.forEach((layer, lIdx) => {
      ctx.fillStyle = lIdx === layerPositions.length - 1 
        ? (dark ? currentPreset.value.primaryColor : '#047857') 
        : (dark ? 'rgba(255, 255, 255, 0.95)' : '#0F172A')
      ctx.font = 'bold 11px "Fragment Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText(layer.spec.name, layer.x, 32)

      ctx.fillStyle = dark ? 'rgba(156, 163, 175, 0.7)' : '#64748B'
      ctx.font = '10px "Fragment Mono", monospace'
      ctx.fillText(layer.spec.shape, layer.x, 48)

      // Conv2D Sliding Kernel Visualizer
      if (lIdx === 1 || lIdx === 3) {
        const kernelSpeed = lIdx === 1 ? 1.4 : 1.9
        const kernelY = 95 + (height - 180) / 2 + Math.sin(time * kernelSpeed + lIdx) * ((height - 190) * 0.35)
        
        ctx.strokeStyle = dark ? currentKernel.value.glowColor : '#047857'
        ctx.lineWidth = 1.6
        ctx.strokeRect(layer.x - 16, kernelY - 16, 32, 32)
        ctx.fillStyle = dark ? 'rgba(4, 120, 87, 0.25)' : 'rgba(16, 185, 129, 0.15)'
        ctx.fillRect(layer.x - 16, kernelY - 16, 32, 32)

        // 3x3 grid inside kernel
        ctx.strokeStyle = dark ? 'rgba(52, 211, 153, 0.5)' : 'rgba(4, 120, 87, 0.45)'
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(layer.x - 5, kernelY - 16); ctx.lineTo(layer.x - 5, kernelY + 16)
        ctx.moveTo(layer.x + 5, kernelY - 16); ctx.lineTo(layer.x + 5, kernelY + 16)
        ctx.moveTo(layer.x - 16, kernelY - 5); ctx.lineTo(layer.x + 16, kernelY - 5)
        ctx.moveTo(layer.x - 16, kernelY + 5); ctx.lineTo(layer.x + 16, kernelY + 5)
        ctx.stroke()

        ctx.fillStyle = dark ? '#34d399' : '#047857'
        ctx.font = 'bold 8px "Fragment Mono", monospace'
        ctx.fillText(selectedKernel.value.toUpperCase(), layer.x, kernelY + 24)
      }

      // Draw Neurons & Activation Nodes
      layer.nodeCoords.forEach((node, nIdx) => {
        const rawAct = node.baseWeight + Math.sin(time * 2.2 + lIdx * 1.5 + nIdx * 1.1) * 0.3
        const finalAct = computeActivation(rawAct, selectedActivation.value)
        const isHovered = hoveredNode.value && hoveredNode.value.layerIdx === lIdx && hoveredNode.value.nodeIdx === nIdx
        const isTopOutput = lIdx === layerPositions.length - 1 && nIdx === 0

        const nodeRadius = isTopOutput ? 8 : (isHovered ? 7.5 : 5.2)

        if (finalAct > 0.05) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, nodeRadius + (finalAct * 5), 0, Math.PI * 2)
          ctx.fillStyle = isTopOutput
            ? (dark ? `rgba(16, 185, 129, ${0.25 + finalAct * 0.45})` : `rgba(4, 120, 87, ${0.20 + finalAct * 0.35})`)
            : (dark ? `rgba(4, 120, 87, ${0.10 + finalAct * 0.35})` : `rgba(16, 185, 129, ${0.15 + finalAct * 0.35})`)
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2)

        if (isTopOutput) {
          ctx.fillStyle = dark ? currentPreset.value.primaryColor : '#047857'
          ctx.strokeStyle = dark ? '#ffffff' : '#10b981'
          ctx.lineWidth = 2.5
          ctx.shadowColor = currentPreset.value.primaryColor
          ctx.shadowBlur = dark ? 12 : 6
        } else if (finalAct > 0.65) {
          ctx.fillStyle = dark ? '#059669' : '#047857'
          ctx.strokeStyle = dark ? '#34d399' : '#10b981'
          ctx.lineWidth = 1.6
          ctx.shadowColor = '#059669'
          ctx.shadowBlur = dark ? 6 : 2
        } else if (finalAct > 0.2) {
          ctx.fillStyle = dark ? '#064e3b' : '#10b981'
          ctx.strokeStyle = dark ? 'rgba(52, 211, 153, 0.7)' : '#047857'
          ctx.lineWidth = 1.0
          ctx.shadowBlur = 0
        } else {
          ctx.fillStyle = dark ? '#090d16' : '#E2E8F0'
          ctx.strokeStyle = dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(100, 116, 139, 0.4)'
          ctx.lineWidth = 0.8
          ctx.shadowBlur = 0
        }

        ctx.fill()
        ctx.stroke()
        ctx.shadowBlur = 0
      })
    })

    // 4. Draw Tooltip when node is hovered
    if (hoveredNode.value) {
      const { layerIdx, nodeIdx, layerName } = hoveredNode.value
      const targetNode = layerPositions[layerIdx]?.nodeCoords[nodeIdx]
      if (targetNode) {
        const val = computeActivation(targetNode.baseWeight, selectedActivation.value).toFixed(3)
        const tooltipText = `${layerName} [Node #${nodeIdx + 1}] • a: ${val}`
        
        ctx.fillStyle = dark ? 'rgba(11, 12, 16, 0.92)' : 'rgba(255, 255, 255, 0.98)'
        ctx.strokeStyle = dark ? 'rgba(52, 211, 153, 0.7)' : '#047857'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(targetNode.x - 80, targetNode.y - 34, 160, 22, 6)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = dark ? '#34d399' : '#047857'
        ctx.font = 'bold 9px "Fragment Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillText(tooltipText, targetNode.x, targetNode.y - 20)
      }
    }

    animationFrameId = requestAnimationFrame(render)
  }

  animationFrameId = requestAnimationFrame(render)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
})
</script>

<template>
  <div class="space-y-6 select-none font-sans">
    
    <!-- Top Interactive Controls Bar (Clean Single-Row Flex Layout) -->
    <div class="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#F8FAFC] dark:bg-[#0B0C0E] border border-[#E2E8F0] dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 shadow-xs transition-colors">
      
      <!-- Left: Pattern Switcher Buttons without Emojis -->
      <div class="flex items-center gap-2 sm:gap-3 max-w-full overflow-x-auto custom-scroll pb-1 md:pb-0">
        <span class="text-xs font-mono-tag font-bold uppercase text-[#475569] dark:text-zinc-400 shrink-0 hidden sm:inline-block">Input Pattern:</span>
        <div class="flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/10 shrink-0">
          <button
            v-for="(p, key) in presets"
            :key="key"
            @click="selectedInputPattern = key"
            class="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono-tag font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap"
            :class="selectedInputPattern === key ? 'bg-[#047857] text-white shadow-xs' : 'text-[#475569] dark:text-zinc-400 hover:text-[#0F172A] dark:hover:text-white'"
          >
            {{ p.name }}
          </button>
        </div>
      </div>

      <!-- Right: Action Triggers (Clean Minimalist Buttons) -->
      <div class="flex items-center gap-2 self-start md:self-auto shrink-0">
        <button
          @click="triggerForwardPass"
          class="px-3.5 sm:px-4 py-2 rounded-xl bg-[#047857] hover:bg-[#065F46] text-white text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#047857]/30 cursor-pointer hover:scale-105 active:scale-95"
        >
          <Zap class="w-3.5 h-3.5 fill-white" />
          <span>Forward Pass</span>
        </button>

        <button
          @click="isPlaying = !isPlaying"
          class="p-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-[#E2E8F0] dark:border-white/10 text-[#475569] dark:text-white transition-all cursor-pointer"
          :title="isPlaying ? 'Pause Continuous Signal' : 'Play Continuous Signal'"
        >
          <Pause v-if="isPlaying" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <Play v-else class="w-4 h-4 text-[#475569] dark:text-zinc-300" />
        </button>
      </div>

    </div>

    <!-- Main CNN Neural Canvas Viewport -->
    <div class="relative w-full rounded-3xl bg-white dark:bg-[#07080A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg dark:shadow-2xl p-2 sm:p-4 transition-colors">
      
      <!-- Mobile Horizontal Swipe Indicator -->
      <div class="lg:hidden flex items-center justify-between px-3 py-1.5 mb-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] font-mono-tag text-emerald-800 dark:text-emerald-300">
        <span class="flex items-center gap-1.5 font-bold">
          <span class="w-1.5 h-1.5 rounded-full bg-[#047857] dark:bg-emerald-400 animate-pulse"></span>
          <span>Pipeline CNN (6 Layer)</span>
        </span>
        <span class="text-[10px] text-slate-500 dark:text-zinc-400 flex items-center gap-1 font-semibold">
          <span>Geser horizontal</span>
          <span class="animate-bounce-x">👉</span>
        </span>
      </div>

      <!-- Horizontal Scrollable Canvas Area -->
      <div class="overflow-x-auto custom-scroll max-w-full pb-1">
        <div class="min-w-[760px]">
          
          <!-- Top HUD Telemetry Overlay -->
          <div class="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 dark:bg-black/60 border-b border-slate-200 dark:border-white/10 rounded-2xl mb-2">
            <div class="inline-flex items-center gap-2 text-xs font-mono-tag text-slate-800 dark:text-zinc-300 font-medium">
              <span class="w-2 h-2 rounded-full bg-[#047857] dark:bg-emerald-400 animate-pulse"></span>
              <span>Deep Vision CNN Pipeline: Conv2D → MaxPool → Dense → Softmax</span>
            </div>

            <div class="inline-flex items-center gap-3 text-[11px] font-mono-tag text-slate-500 dark:text-zinc-400">
              <span>Inference: <strong class="text-[#047857] dark:text-emerald-400 font-bold">3.4ms</strong></span>
              <span>FLOPs: <strong class="text-teal-600 dark:text-cyan-400 font-bold">42.8M</strong></span>
              <span>FPS: <strong class="text-slate-800 dark:text-white font-bold">{{ liveFps }}</strong></span>
              <span>Pass: <strong class="text-[#047857] dark:text-emerald-300 font-bold">#{{ forwardPassCount }}</strong></span>
            </div>
          </div>

          <!-- HTML5 Neural Graph Canvas with hover inspector -->
          <canvas 
            ref="canvasRef" 
            @mousemove="handleCanvasMouseMove"
            @mouseleave="handleCanvasMouseLeave"
            class="w-full h-[380px] sm:h-[420px] block cursor-crosshair min-w-[760px]"
          ></canvas>

          <!-- Bottom Architecture Flow Legend -->
          <div class="p-3 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tag mt-2">
            <div class="flex flex-wrap items-center gap-4 text-slate-600 dark:text-zinc-400">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#047857] dark:bg-[#10b981]"></span>
                <span>Active Neurons (f(x) &gt; 0)</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-md border border-[#047857] dark:border-emerald-400 bg-emerald-500/20"></span>
                <span>3×3 Kernel Convolution ({{ currentKernel.name }})</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-[#047857]"></span>
                <span>Dense Synapses</span>
              </div>
            </div>

            <div class="text-[#047857] dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <span>Top Detection:</span>
              <span class="text-slate-900 dark:text-white underline decoration-emerald-500 font-bold">{{ currentPreset.classes[0].label }} ({{ currentPreset.classes[0].conf }}%)</span>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!-- Bottom Hyperparameters & Softmax Output Split View -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      
      <!-- Left: Hyperparameters & Activation Settings -->
      <div class="lg:col-span-6 p-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0B0C0E] border border-[#E2E8F0] dark:border-white/10 space-y-5 flex flex-col justify-between shadow-xs transition-colors">
        <div class="space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-white/10">
            <div class="flex items-center gap-2">
              <Sliders class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 class="text-xs font-mono-tag font-bold uppercase text-[#0F172A] dark:text-white">Neural Layer Parameters</h4>
            </div>
            <span class="text-[11px] font-mono-tag text-emerald-600 dark:text-emerald-400 font-bold">Real-time Reactive</span>
          </div>

          <!-- Activation Function Picker -->
          <div class="space-y-2">
            <label class="text-xs font-mono-tag uppercase text-[#475569] dark:text-zinc-400 font-bold block">
              Non-Linear Activation Function (Changes Neuron Glow & Zero Clamping)
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="act in [
                  { id: 'relu', name: 'ReLU', formula: 'max(0, x)', desc: 'Zero Clamping' },
                  { id: 'gelu', name: 'GELU', formula: 'x·Φ(x)', desc: 'Gaussian Curve' },
                  { id: 'leaky_relu', name: 'Leaky', formula: 'max(αx, x)', desc: 'Negative Leak' },
                  { id: 'sigmoid', name: 'Sigmoid', formula: '1/(1+e⁻ˣ)', desc: 'S-Curve [0,1]' }
                ]"
                :key="act.id"
                @click="selectedActivation = act.id"
                class="p-2.5 rounded-xl border text-center transition-all cursor-pointer"
                :class="selectedActivation === act.id ? 'bg-[#047857]/15 dark:bg-[#047857]/30 border-[#047857] text-[#047857] dark:text-white shadow-md shadow-[#047857]/20 scale-102 font-bold' : 'bg-white dark:bg-white/5 border-[#E2E8F0] dark:border-white/5 text-[#475569] dark:text-zinc-400 hover:text-[#0F172A] dark:hover:text-white'"
              >
                <div class="text-xs font-mono-tag font-bold">{{ act.name }}</div>
                <div class="text-[10px] text-[#64748B] dark:text-zinc-400 font-mono-tag">{{ act.formula }}</div>
                <div class="text-[9px] text-emerald-600 dark:text-emerald-400/80 font-mono-tag pt-0.5">{{ act.desc }}</div>
              </button>
            </div>
          </div>

          <!-- Convolutional Kernel Feature Filter -->
          <div class="space-y-2">
            <label class="text-xs font-mono-tag uppercase text-[#475569] dark:text-zinc-400 font-bold block">
              Feature Extraction Kernel (Changes Conv2D Filter & Scan Lines)
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="k in [
                  { id: 'sobel', name: 'Sobel Filter', type: 'Edge Detection' },
                  { id: 'sharpen', name: 'Sharpen 3×3', type: 'High-Pass Peak' },
                  { id: 'gaussian', name: 'Gaussian Blur', type: 'Denoising Blur' },
                  { id: 'ridge', name: 'Ridge Extractor', type: 'Laplace Contour' }
                ]"
                :key="k.id"
                @click="selectedKernel = k.id"
                class="p-2.5 rounded-xl border text-center transition-all cursor-pointer"
                :class="selectedKernel === k.id ? 'bg-[#047857]/15 dark:bg-[#047857]/30 border-[#047857] text-[#047857] dark:text-white shadow-md shadow-[#047857]/20 scale-102 font-bold' : 'bg-white dark:bg-white/5 border-[#E2E8F0] dark:border-white/5 text-[#475569] dark:text-zinc-400 hover:text-[#0F172A] dark:hover:text-white'"
              >
                <div class="text-xs font-mono-tag font-bold">{{ k.name }}</div>
                <div class="text-[10px] text-emerald-600 dark:text-emerald-400/80 font-mono-tag">{{ k.type }}</div>
              </button>
            </div>
          </div>
        </div>

        <div class="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-[#E2E8F0] dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tag text-[#334155] dark:text-zinc-300">
          <span>Active Kernel: <strong class="text-[#0F172A] dark:text-white">{{ currentKernel.name }}</strong> ({{ currentKernel.type }})</span>
          <span>Activation: <strong class="text-emerald-600 dark:text-emerald-400">{{ selectedActivation.toUpperCase() }}</strong></span>
        </div>
      </div>

      <!-- Right: Real-time Softmax Probability Distribution -->
      <div class="lg:col-span-6 p-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#0B0C0E] border border-[#E2E8F0] dark:border-white/10 space-y-4 flex flex-col justify-between shadow-xs transition-colors">
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-white/10">
            <div class="flex items-center gap-2">
              <Activity class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 class="text-xs font-mono-tag font-bold uppercase text-[#0F172A] dark:text-white">Softmax Classification Output</h4>
            </div>
            <span class="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono-tag font-bold">
              Σ p(y) = 1.0
            </span>
          </div>

          <div class="space-y-3.5 pt-3">
            <div 
              v-for="(cls, cIdx) in currentPreset.classes" 
              :key="cIdx"
              class="space-y-1.5"
            >
              <div class="flex items-center justify-between text-xs font-mono-tag">
                <span :class="cIdx === 0 ? 'text-[#0F172A] dark:text-white font-bold' : 'text-[#64748B] dark:text-zinc-400'">{{ cls.label }}</span>
                <span class="font-bold font-mono-tag" :class="cIdx === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#64748B] dark:text-zinc-400'">{{ cls.conf }}%</span>
              </div>

              <!-- Animated Confidence Bar -->
              <div class="w-full h-2 rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-700 ease-out"
                  :style="{
                    width: `${cls.conf}%`,
                    backgroundColor: cls.color
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-[#047857]/40 flex items-center gap-3">
          <CheckCircle2 class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div class="text-xs font-mono-tag text-[#1E293B] dark:text-zinc-300">
            <strong class="text-emerald-700 dark:text-emerald-300">High-Confidence Inference:</strong> Model mengenali pola <span class="font-bold text-[#0F172A] dark:text-white">{{ currentPreset.name }}</span> dengan probabilitas <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{ currentPreset.classes[0].conf }}%</span>.
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
