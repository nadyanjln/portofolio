<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  ArrowRight, 
  Sparkles, 
  Heart,
  Layout, 
  Brain, 
  Layers, 
  Code2, 
  Eye, 
  Network,
  Bot
} from 'lucide-vue-next'
import ModernAmbientBackground from '@/components/effects/ModernAmbientBackground.vue'

// 3D Tilt State for Cards
const leftTilt = ref({ rx: 0, ry: 0, hovered: false })
const rightTilt = ref({ rx: 0, ry: 0, hovered: false })

const handleMouseMove = (e, target) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const cx = rect.width / 2
  const cy = rect.height / 2
  
  const rx = -((y - cy) / cy) * 6
  const ry = ((x - cx) / cx) * 6

  if (target === 'left') {
    leftTilt.value = { rx, ry, hovered: true }
  } else {
    rightTilt.value = { rx, ry, hovered: true }
  }
}

const handleMouseLeave = (target) => {
  if (target === 'left') {
    leftTilt.value = { rx: 0, ry: 0, hovered: false }
  } else {
    rightTilt.value = { rx: 0, ry: 0, hovered: false }
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#07080A] text-white flex flex-col justify-between relative overflow-hidden selection:bg-[#9E0402] selection:text-white font-sans">
    
    <!-- Modern Ambient Architectural Background (100% GPU) -->
    <ModernAmbientBackground />

    <!-- Header Brand Bar -->
    <header class="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#9E0402] to-[#047857] p-0.5 shadow-lg shadow-black/50">
          <div class="w-full h-full rounded-[14px] bg-[#07080A] flex items-center justify-center font-mono-tag font-bold text-xs text-white">
            N&R
          </div>
        </div>
        <div>
          <h1 class="text-xs sm:text-sm font-bold tracking-tight text-white uppercase flex items-center gap-1.5">
            <span>Nadya & Raqwan</span>
            <Heart class="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse inline" />
          </h1>
          <span class="text-[10px] font-mono-tag text-zinc-400">Creative Space • Two Minds, One Space</span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono-tag text-zinc-300 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>Dua Ruang Portofolio</span>
        </span>
      </div>
    </header>

    <!-- Main Selection Stage -->
    <main class="relative z-20 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col justify-center">
      
      <!-- Central Title -->
      <div class="text-center max-w-3xl mx-auto space-y-3.5 mb-8 sm:mb-12">
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono-tag uppercase text-zinc-300 shadow-sm backdrop-blur-md">
          <Sparkles class="w-3.5 h-3.5 text-amber-400" />
          <span>Our Shared Digital Space</span>
        </div>
        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Dua Perspektif, Satu Visi Digital.
        </h2>
        <p class="text-xs sm:text-sm md:text-base text-zinc-400 font-mono-tag max-w-2xl mx-auto leading-relaxed">
          Selamat datang di ruang karya kami bersama. Temukan dunia riset dan desain produk oleh Nadya, atau arsitektur kecerdasan buatan canggih oleh Raqwan.
        </p>
      </div>

      <!-- 2 Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        <!-- ═══════════════════════════════════════════ -->
        <!-- CARD 1: NADYA NAJELINA                      -->
        <!-- ═══════════════════════════════════════════ -->
        <RouterLink
          to="/nadya"
          @mousemove="(e) => handleMouseMove(e, 'left')"
          @mouseleave="() => handleMouseLeave('left')"
          class="relative p-6 sm:p-8 rounded-[32px] bg-[#111319]/80 hover:bg-[#151722]/95 border border-white/10 hover:border-[#9E0402]/60 shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer [perspective:1000px] overflow-hidden"
          :style="{
            transform: leftTilt.hovered 
              ? `perspective(1000px) rotateX(${leftTilt.rx}deg) rotateY(${leftTilt.ry}deg) translateY(-6px)` 
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
          }"
        >
          <!-- Crimson Glow Ambient (Contained with exact border radius) -->
          <div class="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(158,4,2,0.30)_0%,transparent_60%)] group-hover:opacity-100 opacity-70"></div>

          <div class="space-y-6 relative z-10">
            <!-- Header Badge & Icon -->
            <div class="flex items-center justify-between">
              <div class="w-12 h-12 rounded-2xl bg-[#9E0402] text-white flex items-center justify-center text-base font-extrabold shadow-lg shadow-[#9E0402]/30 group-hover:scale-105 transition-transform">
                N*
              </div>
              <span class="px-3 py-1 rounded-full bg-[#9E0402]/15 border border-[#9E0402]/40 text-[#ff8080] text-[11px] font-mono-tag font-bold uppercase">
                Product & UX
              </span>
            </div>

            <!-- Profile Info -->
            <div class="space-y-2">
              <span class="text-xs font-mono-tag text-zinc-400 uppercase tracking-wider block">Product Manager & Designer</span>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#ff8080] transition-colors leading-tight">
                Nadya Najelina Salsabillah
              </h3>
              <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Merancang produk digital yang berdampak — dari riset pengguna mendalam hingga desain interface yang intuitif, scalable, dan teruji.
              </p>
            </div>

            <!-- Core Pillars Badges -->
            <div class="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono-tag">Product Strategy</span>
              <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono-tag">UI/UX Design</span>
              <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono-tag">Design Systems</span>
              <span class="px-2.5 py-1 rounded-lg bg-[#9FC2EA]/15 border border-[#9FC2EA]/30 text-[#9FC2EA] text-[11px] font-mono-tag font-bold">User Research</span>
            </div>
          </div>

          <!-- Bottom Action Strip -->
          <div class="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-tag font-bold uppercase text-[#ff8080] group-hover:text-white transition-colors relative z-10">
            <span class="tracking-wider">Lihat Karya Nadya</span>
            <div class="w-8 h-8 rounded-full bg-[#9E0402] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight class="w-4 h-4" />
            </div>
          </div>
        </RouterLink>

        <!-- ═══════════════════════════════════════════ -->
        <!-- CARD 2: MUHAMMAD RAQWAN KAUTHAR             -->
        <!-- ═══════════════════════════════════════════ -->
        <RouterLink
          to="/raqwan"
          @mousemove="(e) => handleMouseMove(e, 'right')"
          @mouseleave="() => handleMouseLeave('right')"
          class="relative p-6 sm:p-8 rounded-[32px] bg-[#111319]/80 hover:bg-[#0e1a16]/95 border border-white/10 hover:border-[#047857]/60 shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer [perspective:1000px] overflow-hidden"
          :style="{
            transform: rightTilt.hovered 
              ? `perspective(1000px) rotateX(${rightTilt.rx}deg) rotateY(${rightTilt.ry}deg) translateY(-6px)` 
              : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
          }"
        >
          <!-- Deep Dark Emerald Glow Ambient (Contained with exact border radius) -->
          <div class="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(4,120,87,0.35)_0%,transparent_60%)] group-hover:opacity-100 opacity-70"></div>

          <div class="space-y-6 relative z-10">
            <!-- Header Badge & Icon -->
            <div class="flex items-center justify-between">
              <div class="w-12 h-12 rounded-2xl bg-[#047857] text-white flex items-center justify-center text-base font-extrabold shadow-lg shadow-[#047857]/35 group-hover:scale-105 transition-transform">
                R*
              </div>
              <span class="px-3 py-1 rounded-full bg-[#047857]/20 border border-[#047857]/45 text-emerald-300 text-[11px] font-mono-tag font-bold uppercase">
                AI & ML Engineering
              </span>
            </div>

            <!-- Profile Info -->
            <div class="space-y-2">
              <span class="text-xs font-mono-tag text-zinc-400 uppercase tracking-wider block">AI Engineer & ML Specialist</span>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                Muhammad Raqwan Kauthar
              </h3>
              <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Membangun sistem AI end-to-end — dari Computer Vision dan NLP canggih hingga Autonomous Agentic Workflows & Deep Generative Models (GANs).
              </p>
            </div>

            <!-- Core Pillars Badges -->
            <div class="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono-tag">Computer Vision</span>
              <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono-tag">NLP & Transformers</span>
              <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-mono-tag">Agentic AI Workflows</span>
              <span class="px-2.5 py-1 rounded-lg bg-[#047857]/20 border border-[#047857]/40 text-emerald-300 text-[11px] font-mono-tag font-bold">GANs & Super-Res</span>
            </div>
          </div>

          <!-- Bottom Action Strip -->
          <div class="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-tag font-bold uppercase text-emerald-400 group-hover:text-white transition-colors relative z-10">
            <span class="tracking-wider">Lihat Karya Raqwan</span>
            <div class="w-8 h-8 rounded-full bg-[#047857] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight class="w-4 h-4" />
            </div>
          </div>
        </RouterLink>

      </div>
    </main>

    <!-- Footer Identity Strip -->
    <footer class="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 text-center text-xs font-mono-tag text-zinc-400 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div class="flex items-center gap-1.5">
        <span>Nadya & Raqwan</span>
        <Heart class="w-3 h-3 text-rose-500 fill-rose-500 inline" />
        <span>© 2026</span>
      </div>
      <div class="text-zinc-500 text-[11px]">
        Two journeys, complementary perspectives in craft & code.
      </div>
    </footer>
  </div>
</template>
