<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const { portfolioInfo } = usePortfolioStore()

const canvasRef = ref(null)
const containerRef = ref(null)
let ctx = null
let animationFrameId = null
let width = 0
let height = 0

// Mouse state for interactive particle glow & distortion
const mouse = {
  x: -1000,
  y: -1000,
  targetX: -1000,
  targetY: -1000,
  isHovered: false,
  radius: 140
}

// Particle grid data
let particles = []
const currentYear = new Date().getFullYear()

class Particle {
  constructor(x, y) {
    this.originX = x
    this.originY = y
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.baseRadius = Math.random() * 1.2 + 0.8
    this.radius = this.baseRadius
    this.phase = Math.random() * Math.PI * 2
    this.speed = Math.random() * 0.02 + 0.01
    
    // Color distribution: 60% brand cyan/ice blue, 30% crimson red, 10% white
    const rand = Math.random()
    if (rand < 0.60) {
      this.colorType = 'ice'      // #9FC2EA / cyan
    } else if (rand < 0.88) {
      this.colorType = 'crimson'  // #9E0402 / red
    } else {
      this.colorType = 'white'    // white glow
    }
  }

  update(time) {
    // 1. Ambient undulating wave
    const wave = Math.sin(this.originX * 0.015 + time * 0.002 + this.phase) * 2.5
    const waveY = Math.cos(this.originY * 0.015 + time * 0.002 + this.phase) * 2.5

    // 2. Mouse repulsion & interaction
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    let force = 0
    let angle = 0
    
    if (dist < mouse.radius && mouse.isHovered) {
      force = (mouse.radius - dist) / mouse.radius
      angle = Math.atan2(dy, dx)
      this.vx -= Math.cos(angle) * force * 1.8
      this.vy -= Math.sin(angle) * force * 1.8
      this.radius = this.baseRadius + force * 2.5
    } else {
      this.radius += (this.baseRadius - this.radius) * 0.1
    }

    // Physics spring back to home position
    this.vx += (this.originX - this.x) * 0.08
    this.vy += (this.originY + wave - this.y) * 0.08
    this.vx *= 0.82
    this.vy *= 0.82

    this.x += this.vx
    this.y += this.vy
  }

  draw(context, time) {
    // Calculate brightness and proximity boost
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const proximity = mouse.isHovered && dist < mouse.radius ? (1 - dist / mouse.radius) : 0

    // Dynamic Alpha with shimmering
    const shimmer = (Math.sin(time * this.speed + this.phase) + 1) * 0.5
    const baseAlpha = 0.25 + shimmer * 0.35
    const finalAlpha = Math.min(1, baseAlpha + proximity * 0.75)

    context.beginPath()
    context.arc(this.x, this.y, this.radius + proximity * 1.5, 0, Math.PI * 2)

    if (this.colorType === 'crimson') {
      context.fillStyle = `rgba(230, 40, 40, ${finalAlpha})`
      if (proximity > 0.3) {
        context.shadowColor = 'rgba(230, 40, 40, 0.8)'
        context.shadowBlur = 8
      } else {
        context.shadowBlur = 0
      }
    } else if (this.colorType === 'ice') {
      context.fillStyle = `rgba(100, 200, 240, ${finalAlpha})`
      if (proximity > 0.3) {
        context.shadowColor = 'rgba(100, 200, 240, 0.8)'
        context.shadowBlur = 8
      } else {
        context.shadowBlur = 0
      }
    } else {
      context.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`
      if (proximity > 0.3) {
        context.shadowColor = 'rgba(255, 255, 255, 0.9)'
        context.shadowBlur = 10
      } else {
        context.shadowBlur = 0
      }
    }

    context.fill()
    context.shadowBlur = 0 // Reset
  }
}

const initGrid = () => {
  if (!width || !height) return
  particles = []

  // Spacing between grid points
  const spacing = Math.max(16, Math.min(22, width / 70))
  const cols = Math.floor(width / spacing) + 2
  const rows = Math.floor(height / spacing) + 2
  const offsetX = (width - (cols - 1) * spacing) / 2
  const offsetY = (height - (rows - 1) * spacing) / 2

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Add slight jitter for organic matrix feel
      const jitterX = (Math.random() - 0.5) * 6
      const jitterY = (Math.random() - 0.5) * 6
      const x = offsetX + c * spacing + jitterX
      const y = offsetY + r * spacing + jitterY
      particles.push(new Particle(x, y))
    }
  }
}

const handleResize = () => {
  if (!containerRef.value || !canvasRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  
  width = rect.width
  height = rect.height

  canvasRef.value.width = width * dpr
  canvasRef.value.height = height * dpr
  canvasRef.value.style.width = `${width}px`
  canvasRef.value.style.height = `${height}px`

  ctx = canvasRef.value.getContext('2d')
  ctx.scale(dpr, dpr)

  initGrid()
}

const onMouseMove = (e) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.isHovered = true
}

const onMouseEnter = () => {
  mouse.isHovered = true
}

const onMouseLeave = () => {
  mouse.isHovered = false
  mouse.x = -1000
  mouse.y = -1000
}

let startTime = null
const render = (time) => {
  if (!startTime) startTime = time
  const elapsed = time - startTime

  if (ctx && width && height) {
    ctx.clearRect(0, 0, width, height)

    // Render particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(elapsed)
      particles[i].draw(ctx, elapsed)
    }

    // Connect close neighbors near mouse cursor with glowing filaments
    if (mouse.isHovered) {
      for (let i = 0; i < particles.length; i += 3) {
        const p1 = particles[i]
        const dMouse = Math.hypot(p1.x - mouse.x, p1.y - mouse.y)
        if (dMouse < mouse.radius) {
          for (let j = i + 1; j < Math.min(particles.length, i + 8); j++) {
            const p2 = particles[j]
            const d = Math.hypot(p1.x - p2.x, p1.y - p2.y)
            if (d < 30) {
              const alpha = (1 - d / 30) * (1 - dMouse / mouse.radius) * 0.4
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(158, 4, 2, ${alpha})`
              ctx.lineWidth = 0.8
              ctx.stroke()
            }
          }
        }
      }
    }
  }

  animationFrameId = requestAnimationFrame(render)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  animationFrameId = requestAnimationFrame(render)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <div 
    ref="containerRef"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    class="relative w-full overflow-hidden bg-[#07080A] rounded-[32px] sm:rounded-[40px] border border-white/10 shadow-2xl py-16 sm:py-24 lg:py-28 px-4 sm:px-8 select-none group cursor-crosshair"
  >
    <!-- Background Interactive Particle Matrix Canvas -->
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 pointer-events-none z-0"
    ></canvas>

    <!-- Top & Radial Atmosphere Glows matching Brand Identity -->
    <div class="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-[#07080A] via-transparent to-[#07080A]/90"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#9E0402]/10 blur-[100px] pointer-events-none z-10"></div>
    <div class="absolute bottom-0 right-1/4 w-72 h-32 bg-[#9FC2EA]/10 blur-[100px] pointer-events-none z-10"></div>

    <!-- Center Stage: Giant Typographic Monogram/Name -->
    <div class="relative z-20 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
      
      <!-- Top Small Monospace Badge -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3 sm:mb-4 shadow-sm">
        <span class="w-2 h-2 rounded-full bg-[#9E0402] animate-pulse"></span>
        <span class="text-[11px] font-mono-tag tracking-widest text-zinc-300 uppercase font-bold">
          Product Manager • UI/UX Designer
        </span>
      </div>

      <!-- Giant Bold Typography (Matching Screenshot) -->
      <h2 
        class="text-[11vw] sm:text-[12.5vw] lg:text-[13vw] font-black tracking-tighter text-white uppercase leading-[0.88] drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.01]"
        style="font-family: 'Syne', 'Space Grotesk', system-ui, sans-serif; text-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), 0 0 50px rgba(158, 4, 2, 0.2);"
      >
        Nadya Najelina
      </h2>

      <!-- Bottom Subtitle / Tagline -->
      <p class="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base font-mono-tag text-zinc-400 max-w-2xl px-4 leading-relaxed">
        Bridging high-impact product strategy with pixel-crafted digital experiences.
      </p>
    </div>

    <!-- Bottom Metadata Details (Exact match with reference screenshot) -->
    <div class="relative z-20 max-w-7xl mx-auto mt-10 sm:mt-14 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono-tag text-zinc-400">
      <div class="flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>Jakarta & Worldwide • Open for collaboration</span>
      </div>

      <div class="text-center sm:text-right text-[10px] text-zinc-400 leading-tight">
        <p>©{{ currentYear }} All rights reserved. Nadya Najelina Salsabillah.</p>
        <p class="text-zinc-400">Crafted with precision & code. Unauthorised reproduction prohibited.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth rendering */
canvas {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>
