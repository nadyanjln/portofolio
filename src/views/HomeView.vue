<script setup>
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- 1. Hero Section with Editorial Statement & Moving Ticker -->
    <HeroSection />

    <!-- 2. Selected Works & Case Studies Bento Showcase -->
    <ProjectsSection />

    <!-- 3. End-to-End Product & UX Framework (How I Work) -->
    <ProcessSection />

    <!-- 4. About Bio & 1x1 Vertical Skills Scanner -->
    <AboutSection />

    <!-- 5. Social Proof & Endorsement Wall -->
    <TestimonialsSection />

    <!-- 6. Frequently Asked Questions Accordion -->
    <FaqSection />

    <!-- 7. Creative Parenthesized Callout & Proposal Form -->
    <ContactSection />
  </div>
</template>
