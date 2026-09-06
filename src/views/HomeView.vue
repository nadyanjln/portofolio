<script setup>
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import DesignPlayground from '@/components/interactive/DesignPlayground.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- 1. Hero Section with Editorial Statement & Moving Ticker -->
    <HeroSection />

    <!-- 2. Selected Works & Case Studies (01 / WORKS) -->
    <ProjectsSection />

    <!-- 3. Skill Sets Capabilities (02 / CAPABILITIES - Benjamin Creative Style) -->
    <SkillsSection />

    <!-- 4. End-to-End Product & AI Framework (03 / METHODOLOGY) -->
    <ProcessSection />

    <!-- 5. Interactive PM & AI Craft Sandbox (CNN & ROI Calculator) -->
    <DesignPlayground />

    <!-- 6. About Bio & Highlights -->
    <AboutSection />

    <!-- 7. Social Proof & Endorsement Wall (05 / ENDORSEMENTS) -->
    <TestimonialsSection />

    <!-- 8. Frequently Asked Questions Accordion -->
    <FaqSection />

    <!-- 9. Creative Parenthesized Callout & Proposal Form -->
    <ContactSection />
  </div>
</template>
