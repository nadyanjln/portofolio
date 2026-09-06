<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { useTheme } from '@/composables/useTheme'

const { portfolioInfo, currentProfile } = usePortfolioStore()
const { isDark } = useTheme()
const containerRef = ref(null)
const canvasRef = ref(null)
const currentYear = new Date().getFullYear()

let animationFrameId = null
let observer = null
let isLooping = false
let lastFrameTime = 0
let width = 0
let height = 0
let particles = []

// Mouse Interaction State
const mouse = {
  x: -1000,
  y: -1000,
  radius: 180,
  isHovered: false
}

// Particle Class
class MatrixDot {
  constructor(x, y, profile) {
    this.originX = x
    this.originY = y
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.baseRadius = 1.8 + Math.random() * 1.0
    this.radius = this.baseRadius
    this.speed = 0.02 + Math.random() * 0.03
    this.phase = Math.random() * Math.PI * 2

    // Palette per profile
    const rand = Math.random()
    if (profile === 'raqwan') {
      // Dark Emerald / Teal / White for Raqwan
      if (rand < 0.60) {
        this.colorType = 'emerald'  // #047857
      } else if (rand < 0.88) {
        this.colorType = 'teal'     // #0d9488
      } else {
        this.colorType = 'white'
      }
    } else {
      // Crimson / Ice Blue / White for Nadya
      if (rand < 0.60) {
        this.colorType = 'ice'      // #9FC2EA
      } else if (rand < 0.88) {
        this.colorType = 'crimson'  // #9E0402
      } else {
        this.colorType = 'white'
      }
    }
  }

  update(time) {
    // Ambient undulating wave
    const wave = Math.sin(this.originX * 0.015 + time * 0.002 + this.phase) * 2.5

    // Mouse repulsion & interaction
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    
    let force = 0
    let angle = 0
    
    if (dist < mouse.radius && mouse.isHovered) {
      force = (mouse.radius - dist) / mouse.radius
      angle = Math.atan2(dy, dx)
      this.vx -= Math.cos(angle) * force * 2.0
      this.vy -= Math.sin(angle) * force * 2.0
      this.radius = this.baseRadius + force * 2.8
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

  draw(context, time, dark) {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    const proximity = mouse.isHovered && dist < mouse.radius ? (1 - dist / mouse.radius) : 0

    const shimmer = (Math.sin(time * this.speed + this.phase) + 1) * 0.5
    const baseAlpha = dark ? (0.28 + shimmer * 0.35) : (0.35 + shimmer * 0.40)
    const finalAlpha = Math.min(1, baseAlpha + proximity * 0.75)

    context.beginPath()
    context.arc(this.x, this.y, this.radius + proximity * 1.5, 0, Math.PI * 2)

    if (this.colorType === 'emerald') {
      context.fillStyle = `rgba(4, 120, 87, ${finalAlpha})`
      if (proximity > 0.3) {
        context.shadowColor = 'rgba(4, 120, 87, 0.8)'
        context.shadowBlur = 8
      }
    } else if (this.colorType === 'teal') {
      context.fillStyle = `rgba(13, 148, 136, ${finalAlpha})`
      if (proximity > 0.3) {
        context.shadowColor = 'rgba(13, 148, 136, 0.8)'
        context.shadowBlur = 8
      }
    } else if (this.colorType === 'crimson') {
      context.fillStyle = `rgba(158, 4, 2, ${finalAlpha})`
      if (proximity > 0.3) {
        context.shadowColor = 'rgba(158, 4, 2, 0.8)'
        context.shadowBlur = 8
      }
    } else if (this.colorType === 'ice') {
      context.fillStyle = `rgba(159, 194, 234, ${finalAlpha})`
      if (proximity > 0.3) {
        context.shadowColor = 'rgba(159, 194, 234, 0.8)'
        context.shadowBlur = 8
      }
    } else {
      // White dots: in light mode use dark dots instead
      if (dark) {
        context.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`
        if (proximity > 0.3) {
          context.shadowColor = 'rgba(255, 255, 255, 0.9)'
          context.shadowBlur = 10
        }
      } else {
        context.fillStyle = `rgba(100, 116, 139, ${finalAlpha * 0.6})`
        if (proximity > 0.3) {
          context.shadowColor = 'rgba(100, 116, 139, 0.5)'
          context.shadowBlur = 8
        }
      }
    }

    context.fill()
    context.shadowBlur = 0
  }
}

const initGrid = () => {
  if (!width || !height) return
  particles = []

  const spacing = Math.max(18, Math.min(24, width / 55))
  const cols = Math.ceil(width / spacing) + 2
  const rows = Math.ceil(height / spacing) + 2
  const offsetX = (width - (cols - 1) * spacing) / 2
  const offsetY = (height - (rows - 1) * spacing) / 2

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = offsetX + i * spacing
      const y = offsetY + j * spacing
      particles.push(new MatrixDot(x, y, currentProfile.value))
    }
  }
}

watch(currentProfile, () => {
  initGrid()
})

const handleMouseMove = (e) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  mouse.isHovered = true
}

const handleMouseEnter = () => {
  mouse.isHovered = true
}

const handleMouseLeave = () => {
  mouse.isHovered = false
  mouse.x = -1000
  mouse.y = -1000
}

const handleResize = () => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  width = Math.ceil(rect.width)
  height = Math.ceil(rect.height)

  canvasRef.value.width = width
  canvasRef.value.height = height

  initGrid()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  handleResize()
  window.addEventListener('resize', handleResize)

  let startTime = performance.now()

  const loop = (currentTime) => {
    if (!isLooping) return

    // Throttle to 30 FPS for 50% CPU savings
    if (currentTime - lastFrameTime < 33) {
      animationFrameId = requestAnimationFrame(loop)
      return
    }
    lastFrameTime = currentTime

    const time = (currentTime - startTime) * 0.05
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)

    const dark = isDark.value

    // Render connection filaments between close particles
    ctx.lineWidth = 0.5
    for (let i = 0; i < particles.length; i += 3) {
      const p1 = particles[i]
      const dx = mouse.x - p1.x
      const dy = mouse.y - p1.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 90 && mouse.isHovered) {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = currentProfile.value === 'raqwan' 
          ? `rgba(4, 120, 87, ${Math.max(0, (1 - dist / 90) * 0.4)})`
          : `rgba(158, 4, 2, ${Math.max(0, (1 - dist / 90) * 0.4)})`
        ctx.stroke()
      }
    }

    // Render particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(time)
      particles[i].draw(ctx, time, dark)
    }

    animationFrameId = requestAnimationFrame(loop)
  }

  // IntersectionObserver: Only run RAF loop when the footer is actually visible in the viewport!
  const target = containerRef.value || canvas
  observer = new IntersectionObserver((entries) => {
    const isVisible = entries[0]?.isIntersecting
    if (isVisible) {
      if (!isLooping) {
        isLooping = true
        startTime = performance.now()
        animationFrameId = requestAnimationFrame(loop)
      }
    } else {
      if (isLooping) {
        isLooping = false
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
          animationFrameId = null
        }
      }
    }
  }, { threshold: 0.05 })

  observer.observe(target)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div 
    ref="containerRef"
    class="relative w-full rounded-3xl sm:rounded-[48px] border overflow-hidden py-8 sm:py-16 lg:py-20 px-3 sm:px-8 select-none group transition-colors duration-300"
    :class="currentProfile === 'raqwan'
      ? 'bg-[#F0FDF4] dark:bg-[#07080A] border-emerald-200 dark:border-white/10'
      : 'bg-[#FFF5F5] dark:bg-[#07080A] border-[#EEDCDC] dark:border-white/10'"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Background Canvas covering 100% full width and height -->
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 w-full h-full pointer-events-none z-0"
    ></canvas>

    <!-- Top & Radial Atmosphere Glows -->
    <div 
      class="absolute inset-0 pointer-events-none z-10"
      :class="currentProfile === 'raqwan'
        ? 'bg-gradient-to-b from-[#F0FDF4]/80 via-transparent to-[#F0FDF4]/60 dark:from-[#07080A] dark:via-transparent dark:to-[#07080A]/90'
        : 'bg-gradient-to-b from-[#FFF5F5]/80 via-transparent to-[#FFF5F5]/60 dark:from-[#07080A] dark:via-transparent dark:to-[#07080A]/90'"
    ></div>
    <div 
      class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-[100px] pointer-events-none z-10"
      :class="currentProfile === 'raqwan' ? 'bg-[#047857]/15' : 'bg-[#9E0402]/10'"
    ></div>

    <!-- Center Stage: Giant Typographic Monogram/Name -->
    <div class="relative z-20 max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-1 sm:px-2">
      
      <!-- Top Small Monospace Badge -->
      <div 
        class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full backdrop-blur-md mb-3 sm:mb-6 shadow-sm border transition-colors max-w-[95%] sm:max-w-none"
        :class="currentProfile === 'raqwan'
          ? 'bg-emerald-50 dark:bg-white/10 border-emerald-200 dark:border-white/20'
          : 'bg-[#FFF0F0] dark:bg-white/10 border-[#EEDCDC] dark:border-white/20'"
      >
        <span 
          class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse shrink-0"
          :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#ff4d4d]'"
        ></span>
        <span 
          class="text-[9px] sm:text-[11px] font-mono-tag tracking-wider sm:tracking-widest uppercase font-bold transition-colors truncate"
          :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-white' : 'text-[#9E0402] dark:text-white'"
        >
          {{ portfolioInfo.title }}
        </span>
      </div>

      <!-- Clean 2-Line Bold Typography -->
      <h2 
        class="text-[28px] xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight uppercase leading-[0.92] sm:leading-[0.88] transition-all duration-500 ease-out group-hover:scale-[1.01] px-1"
        :class="currentProfile === 'raqwan' 
          ? 'text-[#0F172A] dark:text-white drop-shadow-[0_4px_20px_rgba(4,120,87,0.15)] dark:drop-shadow-2xl' 
          : 'text-[#1C1313] dark:text-white drop-shadow-[0_4px_20px_rgba(158,4,2,0.12)] dark:drop-shadow-2xl'"
        style="font-family: 'Syne', 'Space Grotesk', system-ui, sans-serif;"
      >
        <span class="block">{{ currentProfile === 'raqwan' ? 'Muhammad' : 'Nadya' }}</span>
        <span class="block">{{ currentProfile === 'raqwan' ? 'Raqwan' : 'Najelina' }}</span>
      </h2>

      <!-- Bottom Subtitle / Tagline -->
      <p 
        class="mt-3 sm:mt-6 text-xs sm:text-sm md:text-base font-mono-tag max-w-2xl px-2 sm:px-4 leading-relaxed font-medium transition-colors text-center"
        :class="currentProfile === 'raqwan' ? 'text-slate-600 dark:text-zinc-200' : 'text-[#5C4848] dark:text-zinc-200'"
      >
        {{ portfolioInfo.tagline }}
      </p>
    </div>

    <!-- Bottom Metadata Details -->
    <div 
      class="relative z-20 max-w-7xl mx-auto mt-6 sm:mt-12 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left text-[10px] sm:text-[11px] font-mono-tag transition-colors"
      :class="currentProfile === 'raqwan'
        ? 'border-emerald-200 dark:border-white/15 text-slate-500 dark:text-zinc-300'
        : 'border-[#EEDCDC] dark:border-white/15 text-[#5C4848] dark:text-zinc-300'"
    >
      <div class="flex items-center justify-center sm:justify-start gap-2">
        <span class="w-1.5 h-1.5 rounded-full" :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#ff4d4d]'"></span>
        <span>Indonesia & Worldwide • Open for collaboration</span>
      </div>

      <div class="text-center sm:text-right text-[10px] leading-tight space-y-0.5">
        <p>©{{ currentYear }} All rights reserved. {{ portfolioInfo.name }}.</p>
        <p :class="currentProfile === 'raqwan' ? 'text-slate-400 dark:text-zinc-400' : 'text-[#8B7676] dark:text-zinc-400'">Crafted with precision & code. Unauthorised reproduction prohibited.</p>
      </div>
    </div>
  </div>
</template>
