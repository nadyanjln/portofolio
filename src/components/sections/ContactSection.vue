<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ArrowUpRight, CheckCircle2, AlertCircle, Mail, Linkedin, Github } from 'lucide-vue-next'
import { sendContactMessage, isSupabaseConfigured } from '@/lib/supabase'
import { useScrollReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const isConfigured = isSupabaseConfigured()
const showForm = ref(false)
const { addMessage, portfolioInfo, currentProfile } = usePortfolioStore()

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')
const isMock = ref(false)

const handleSubmit = async () => {
  if (!form.name || !form.email || !form.message) {
    submitError.value = 'Harap lengkapi semua kolom formulir.'
    return
  }

  submitError.value = ''
  isSubmitting.value = true

  try {
    // Record in local CMS Store
    addMessage({
      name: form.name,
      email: form.email,
      message: form.message,
      category: currentProfile.value === 'raqwan' ? 'AI Inquiry' : 'Inquiry Landing Page'
    }, currentProfile.value)

    const res = await sendContactMessage({
      name: form.name,
      email: form.email,
      message: form.message
    })

    if (res.error) {
      throw new Error(res.error.message || 'Gagal mengirim pesan')
    }

    submitSuccess.value = true
    isMock.value = Boolean(res.data?.mock)
    
    // Reset form
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err) {
    console.error('Contact submission error:', err)
    submitError.value = 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
  } finally {
    isSubmitting.value = false
  }
}

const sectionRef = ref(null)
const { observeAll } = useScrollReveal()
onMounted(() => observeAll(sectionRef.value))
</script>

<template>
  <section ref="sectionRef" class="py-14 sm:py-20 relative overflow-hidden" id="contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Big Statement Creative CTA -->
      <div data-reveal="scale-up" class="p-8 sm:p-12 lg:p-16 rounded-[36px] sm:rounded-[48px] bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 shadow-sm relative overflow-hidden text-center space-y-6 sm:space-y-8">
        
        <!-- Glow effect -->
        <div 
          class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 absolute w-96 h-96 rounded-full blur-[120px] pointer-events-none"
          :class="currentProfile === 'raqwan' ? 'bg-[#047857]/30' : 'bg-[#9E0402]/20'"
        ></div>

        <!-- Parenthesized Creative Headline (Clean 2-line structure) -->
        <div class="relative z-10 max-w-3xl mx-auto select-none space-y-3" v-if="currentProfile === 'raqwan'">
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1313] dark:text-[#F4F4F6] leading-[1.15]">
            <span class="inline-block whitespace-nowrap">
              <span class="text-emerald-400 font-light">(</span> Have an ambitious AI idea? <span class="text-emerald-400 font-light">)</span>
            </span>
            <span class="block mt-2 sm:mt-3">
              Let's <span class="text-emerald-400 underline decoration-cyan-500 decoration-wavy decoration-2 sm:decoration-3">train & deploy it</span> together!
            </span>
          </h2>

          <!-- Pulsing Beacon Dot -->
          <div class="pt-2 flex justify-center">
            <span class="w-3 h-3 rounded-full bg-[#047857] shadow-md shadow-[#047857] animate-pulse"></span>
          </div>
        </div>

        <div class="relative z-10 max-w-3xl mx-auto select-none space-y-3" v-else>
          <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1313] dark:text-[#F4F4F6] leading-[1.15]">
            <span class="inline-block whitespace-nowrap">
              <span class="text-[#9E0402] dark:text-[#ff4d4d] font-light">(</span> Have an ambitious idea? <span class="text-[#9E0402] dark:text-[#ff4d4d] font-light">)</span>
            </span>
            <span class="block mt-2 sm:mt-3">
              Let's <span class="text-[#9E0402] dark:text-[#ff4d4d] underline decoration-[#9FC2EA] decoration-wavy decoration-2 sm:decoration-3">build it</span> together!
            </span>
          </h2>

          <!-- Pulsing Beacon Dot -->
          <div class="pt-2 flex justify-center">
            <span class="w-3 h-3 rounded-full bg-[#9E0402] dark:bg-[#ff4d4d] shadow-md shadow-[#9E0402] animate-pulse"></span>
          </div>
        </div>

        <!-- Start the project button / Toggle form -->
        <div class="relative z-10 flex flex-col items-center gap-4 pt-1">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button
              @click="showForm = !showForm"
              class="px-8 py-4 rounded-full text-white font-mono-tag font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-lg flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
              :class="currentProfile === 'raqwan' ? 'bg-[#047857] hover:bg-[#065F46] shadow-[#047857]/30' : 'bg-[#9E0402] hover:bg-[#B80604] shadow-[#9E0402]/25'"
            >
              <span>{{ showForm ? 'TUTUP FORMULIR [X]' : 'START THE PROJECT ↗' }}</span>
            </button>

            <a
              :href="'mailto:' + portfolioInfo.email"
              class="px-6 py-4 rounded-full bg-white dark:bg-[#1A1C24] hover:bg-[#FDF6F6] dark:hover:bg-[#252834] text-[#1C1313] dark:text-white border border-[#EEDCDC] dark:border-white/10 font-mono-tag font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-xs hover:scale-105 active:scale-95"
            >
              <Mail class="w-4 h-4" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'" />
              <span>{{ portfolioInfo.email }}</span>
            </a>
          </div>

          <!-- Direct Social Channels -->
          <div class="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              v-if="portfolioInfo.socials?.linkedin"
              :href="portfolioInfo.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold text-[#1C1313] dark:text-zinc-200 hover:text-white transition-all"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60 hover:text-emerald-300' : 'hover:border-[#9E0402]/40 hover:text-[#9E0402]'"
            >
              <Linkedin class="w-3.5 h-3.5" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#1E3A60] dark:text-[#9FC2EA]'" />
              <span>LinkedIn Profile ↗</span>
            </a>

            <a
              v-if="portfolioInfo.socials?.github"
              :href="portfolioInfo.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold text-[#1C1313] dark:text-zinc-200 hover:text-white transition-all"
              :class="currentProfile === 'raqwan' ? 'hover:border-[#047857]/60 hover:text-emerald-300' : 'hover:border-[#9E0402]/40 hover:text-[#9E0402]'"
            >
              <Github class="w-3.5 h-3.5" :class="currentProfile === 'raqwan' ? 'text-emerald-400' : 'text-[#9E0402] dark:text-[#ff4d4d]'" />
              <span>GitHub Profile ↗</span>
            </a>
          </div>
          
          <p class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 pt-1" v-if="currentProfile === 'raqwan'">
            Open for AI Engineering, Computer Vision & Research roles
          </p>
          <p class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 pt-1" v-else>
            Open for Product Management & UI/UX roles or consulting
          </p>
        </div>

        <!-- Embedded Interactive Form -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-if="showForm" class="relative z-10 max-w-2xl mx-auto pt-6 text-left border-t border-[#EEDCDC] dark:border-white/10 mt-8">
            <form @submit.prevent="handleSubmit" class="space-y-4">
              
              <!-- Success Alert -->
              <div 
                v-if="submitSuccess" 
                class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-mono-tag flex items-start gap-3"
              >
                <CheckCircle2 class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div class="space-y-1">
                  <p class="font-bold">Pesan Anda Berhasil Terkirim!</p>
                  <p class="text-xs">
                    {{ isMock ? 'Pesan dicatat di local state & disinkronkan ke CMS.' : 'Pesan tersimpan di Supabase Inbox.' }} 
                    Saya akan merespons dalam waktu 1x24 jam.
                  </p>
                </div>
              </div>

              <!-- Error Alert -->
              <div 
                v-if="submitError" 
                class="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-xs font-mono-tag flex items-center gap-3"
              >
                <AlertCircle class="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                <span>{{ submitError }}</span>
              </div>

              <!-- Form Inputs -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-mono-tag font-bold text-[#1C1313] dark:text-white uppercase tracking-wider block">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    v-model="form.name"
                    placeholder="Contoh: Alex Morgan"
                    required
                    class="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-[#1C1313] dark:text-white focus:outline-none transition-colors"
                    :class="currentProfile === 'raqwan' ? 'focus:border-[#047857]' : 'focus:border-[#9E0402]'"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="text-xs font-mono-tag font-bold text-[#1C1313] dark:text-white uppercase tracking-wider block">
                    Email Kontak *
                  </label>
                  <input
                    type="email"
                    v-model="form.email"
                    placeholder="alex@company.com"
                    required
                    class="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-[#1C1313] dark:text-white focus:outline-none transition-colors"
                    :class="currentProfile === 'raqwan' ? 'focus:border-[#047857]' : 'focus:border-[#9E0402]'"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-mono-tag font-bold text-[#1C1313] dark:text-white uppercase tracking-wider block">
                  Detail Proyek / Pesan *
                </label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="Ceritakan gambaran proyek atau peran yang sedang Anda cari..."
                  required
                  class="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-[#1C1313] dark:text-white focus:outline-none transition-colors resize-none"
                  :class="currentProfile === 'raqwan' ? 'focus:border-[#047857]' : 'focus:border-[#9E0402]'"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3.5 text-xs sm:text-sm font-mono-tag font-bold uppercase tracking-wider text-white rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857] hover:bg-[#065F46] shadow-[#047857]/30' : 'bg-[#9E0402] hover:bg-[#B80604] shadow-[#9E0402]/25'"
              >
                <span>{{ isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang ↗' }}</span>
              </button>
            </form>
          </div>
        </transition>

      </div>
    </div>
  </section>
</template>
