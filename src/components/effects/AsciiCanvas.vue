<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationFrameId = null

const chars = ['@', '#', '$', '%', '&', '*', '+', '=', '-', ':', '.', ' ']
const paletteHues = [
  'rgba(158, 4, 2, 0.85)',     // Primary #9E0402
  'rgba(194, 5, 3, 0.65)',     // Crimson bright
  'rgba(159, 194, 234, 0.75)', // Secondary #9FC2EA
  'rgba(159, 194, 234, 0.45)', // Secondary soft
  'rgba(158, 4, 2, 0.30)',
  'rgba(159, 194, 234, 0.20)',
  'rgba(158, 4, 2, 0.08)'
]

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  let mouseX = width / 2
  let mouseY = height / 2
  let targetMouseX = mouseX
  let targetMouseY = mouseY

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }

  const handleMouseMove = (e) => {
    targetMouseX = e.clientX
    targetMouseY = e.clientY
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove, { passive: true })

  const fontSize = 14
  let time = 0

  const draw = () => {
    time += 0.012
    mouseX += (targetMouseX - mouseX) * 0.05
    mouseY += (targetMouseY - mouseY) * 0.05

    ctx.clearRect(0, 0, width, height)
    ctx.font = `bold ${fontSize}px "Fragment Mono", "SF Mono", monospace, monospace`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const cols = Math.ceil(width / fontSize)
    const rows = Math.ceil(height / fontSize)

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const x = i * fontSize + fontSize / 2
        const y = j * fontSize + fontSize / 2

        const dx = x - mouseX
        const dy = y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        const noise = 
          Math.sin(i * 0.06 + time) * 
          Math.cos(j * 0.06 + time * 0.8) +
          Math.sin((x + y) * 0.004 + time)

        const mouseInfluence = Math.max(0, 1 - dist / 400)
        const density = Math.min(Math.max((noise + 1) / 2 + mouseInfluence * 0.65, 0), 1)

        const charIndex = Math.floor((1 - density) * (chars.length - 1))
        const char = chars[charIndex]

        if (density > 0.38) {
          const colorIdx = Math.min(Math.floor((1 - density) * paletteHues.length), paletteHues.length - 1)
          ctx.fillStyle = paletteHues[colorIdx]
          ctx.fillText(char, x, y)
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw)
  }

  draw()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
})
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-65 dark:opacity-75 transition-opacity duration-500">
    <canvas ref="canvasRef" class="w-full h-full block"></canvas>
    
    <!-- Seamless Gradient Vignette for Light and Dark Modes -->
    <div class="absolute inset-0 bg-gradient-to-t from-[#FFF9F9] dark:from-[#0B0C0E] via-transparent to-[#FFF9F9]/80 dark:to-[#0B0C0E]/80 pointer-events-none transition-colors duration-300"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-[#FFF9F9]/80 dark:from-[#0B0C0E]/80 via-transparent to-[#FFF9F9]/80 dark:to-[#0B0C0E]/80 pointer-events-none transition-colors duration-300"></div>
  </div>
</template>
