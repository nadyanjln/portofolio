<script setup>
import { Sparkles, GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-vue-next'
import { portfolioInfo, skills } from '@/data/portfolioData'
import SkillBadge from '@/components/ui/SkillBadge.vue'
import InfiniteMarquee from '@/components/effects/InfiniteMarquee.vue'

const experiences = [
  {
    role: 'Product Manager & UI/UX Lead',
    company: 'Tech Startup Indonesia',
    period: '2023 - Sekarang',
    description: 'Memimpin product development lifecycle dari discovery hingga delivery. Menyusun PRD, mendefinisikan roadmap produk, melakukan user research, dan merancang high-fidelity UI di Figma. Berkolaborasi dengan tim engineering, marketing, dan stakeholder untuk memastikan alignment visi produk.'
  },
  {
    role: 'UI/UX Designer',
    company: 'Creative Digital Agency',
    period: '2022 - 2023',
    description: 'Merancang pengalaman pengguna untuk klien di berbagai industri. Melakukan user research, competitive analysis, wireframing, prototyping, dan usability testing. Meningkatkan kepuasan pengguna rata-rata 30% melalui pendekatan design thinking iteratif.'
  },
  {
    role: 'Product Design Intern',
    company: 'SaaS Company',
    period: '2021 - 2022',
    description: 'Berkontribusi pada desain fitur baru dan maintenance design system. Membantu melakukan usability testing, menyusun findings report, dan mengiterasi desain berdasarkan feedback pengguna.'
  }
]

const educations = [
  {
    degree: 'Sarjana — Sistem Informasi / Desain Komunikasi Visual',
    school: 'Universitas Terkemuka di Indonesia',
    year: '2019 - 2023'
  }
]

const certifications = [
  'Google UX Design Professional Certificate',
  'Product Management Fundamentals — Product School',
  'Interaction Design Foundation — UX Management'
]
</script>

<template>
  <div class="pt-24 pb-14 sm:pt-28 sm:pb-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
    
    <!-- Hero / Profile Intro with Floating Avatar Animation -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
      <div class="lg:col-span-8 space-y-3 sm:space-y-4">
        <!-- Top Tag Pill -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold uppercase text-[#9E0402] dark:text-[#ff4d4d] shadow-xs">
          <Sparkles class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
          <span>About Me /2026/</span>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1C1313] dark:text-white leading-tight">
          Merancang Produk Digital yang <span class="text-[#9E0402] dark:text-[#ff3b38]">Bermakna</span> & Berdampak
        </h1>

        <!-- Bio Paragraph -->
        <p class="text-sm sm:text-base md:text-lg text-[#5C4848] dark:text-zinc-300 leading-relaxed max-w-3xl">
          {{ portfolioInfo.bio }}
        </p>
      </div>

      <!-- Avatar Badge -->
      <div class="lg:col-span-4 flex justify-center lg:justify-end">
        <div class="relative group">
          <div class="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-[#9E0402] p-1 shadow-xl animate-float">
            <div class="w-full h-full bg-white dark:bg-[#14161D] rounded-[22px] flex flex-col items-center justify-center p-5 text-center space-y-1.5 border border-[#EEDCDC] dark:border-white/10">
              <div class="w-16 h-16 rounded-full bg-[#9E0402] flex items-center justify-center text-white font-extrabold text-2xl shadow-md group-hover:scale-110 transition-transform">
                N*
              </div>
              <span class="font-bold text-[#1C1313] dark:text-white text-base">{{ portfolioInfo.name }}</span>
              <span class="text-xs text-[#9E0402] dark:text-[#ff4d4d] font-mono-tag font-bold">PM & UI/UX Designer</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Moving Marquee on About Page -->
    <div>
      <InfiniteMarquee speed="slow" />
    </div>

    <!-- Experience Timeline -->
    <div class="space-y-4">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center shrink-0">
          <Briefcase class="w-4 h-4" />
        </div>
        <h2 class="text-2xl font-extrabold text-[#1C1313] dark:text-white">Pengalaman Kerja</h2>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(exp, idx) in experiences" 
          :key="idx"
          class="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-2 relative hover:border-[#9E0402]/40 dark:hover:border-[#ff4d4d]/40 hover:-translate-y-1 transition-all duration-300 shadow-xs"
        >
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 class="text-base sm:text-lg font-bold text-[#1C1313] dark:text-white">{{ exp.role }}</h3>
            <span class="text-xs font-mono-tag font-bold px-3 py-0.5 rounded-full bg-[#9E0402] text-white w-fit">
              {{ exp.period }}
            </span>
          </div>
          <p class="text-xs sm:text-sm font-bold text-[#1E3A60] dark:text-[#9FC2EA] font-mono-tag">{{ exp.company }}</p>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-300 leading-relaxed pt-0.5">{{ exp.description }}</p>
        </div>
      </div>
    </div>

    <!-- Skills & Expertise -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-extrabold text-[#1C1313] dark:text-white">Keahlian & Metodologi</h2>
        <span class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400">{{ skills.length }} Core Competencies</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
        <SkillBadge 
          v-for="skill in skills" 
          :key="skill.name" 
          :skill="skill" 
        />
      </div>
    </div>

    <!-- Education & Certifications (2-col grid on desktop) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Education -->
      <div class="space-y-4">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center shrink-0">
            <GraduationCap class="w-4 h-4" />
          </div>
          <h2 class="text-2xl font-extrabold text-[#1C1313] dark:text-white">Pendidikan</h2>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(edu, idx) in educations" 
            :key="idx"
            class="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 space-y-1 shadow-xs"
          >
            <h3 class="text-sm sm:text-base font-bold text-[#1C1313] dark:text-white">{{ edu.degree }}</h3>
            <p class="text-xs text-[#9E0402] dark:text-[#ff4d4d] font-mono-tag font-bold">{{ edu.school }} • {{ edu.year }}</p>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div class="space-y-4">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-[#9FC2EA]/30 dark:bg-[#9FC2EA]/15 text-[#1E3A60] dark:text-[#9FC2EA] flex items-center justify-center shrink-0">
            <Award class="w-4 h-4" />
          </div>
          <h2 class="text-2xl font-extrabold text-[#1C1313] dark:text-white">Sertifikasi Profesional</h2>
        </div>

        <div class="space-y-2.5">
          <div 
            v-for="cert in certifications" 
            :key="cert"
            class="p-4 rounded-xl bg-white dark:bg-[#14161D] border border-[#EEDCDC] dark:border-white/10 flex items-center gap-3 shadow-xs"
          >
            <CheckCircle2 class="w-4 h-4 text-[#9E0402] dark:text-[#ff4d4d] shrink-0" />
            <span class="text-xs sm:text-sm text-[#1C1313] dark:text-zinc-200 font-semibold">{{ cert }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
