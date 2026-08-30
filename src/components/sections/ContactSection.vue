<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ArrowUpRight, CheckCircle2, AlertCircle, Mail, Linkedin, Github } from 'lucide-vue-next'
import { portfolioInfo } from '@/data/portfolioData'
import { sendContactMessage, isSupabaseConfigured } from '@/lib/supabase'
import { useScrollReveal } from '@/composables/useAnimations'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const isConfigured = isSupabaseConfigured()
const showForm = ref(false)
const { addMessage } = usePortfolioStore()

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
      category: 'Inquiry Landing Page'
    })

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
      <div data-reveal="scale-up" class="p-8 sm:p-14 lg:p-16 rounded-[36px] sm:rounded-[48px] bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 shadow-sm relative overflow-hidden text-center space-y-8">
        
        <!-- Glow effect -->
        <div class="glow-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"></div>

        <!-- Parenthesized Creative Headline -->
        <div class="space-y-2 relative z-10 max-w-4xl mx-auto select-none">
          <div class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight text-[#1C1313] dark:text-[#F4F4F6]">
            <span class="text-[#9E0402] dark:text-[#ff4d4d] font-light">(</span> Have an ambitious idea in <span class="text-[#9E0402] dark:text-[#ff4d4d] font-light">)</span>
          </div>
          <div class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight text-[#1C1313] dark:text-[#F4F4F6]">
            your mind? Let's <span class="text-[#9E0402] dark:text-[#ff4d4d] underline decoration-[#9FC2EA] decoration-wavy decoration-3">build it</span>
          </div>
          <div class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight text-[#1C1313] dark:text-[#F4F4F6]">
            together!
          </div>

          <!-- Pulsing Red Beacon Dot -->
          <div class="pt-4 flex justify-center">
            <span class="w-3.5 h-3.5 rounded-full bg-[#9E0402] dark:bg-[#ff4d4d] shadow-md shadow-[#9E0402] animate-pulse"></span>
          </div>
        </div>

        <!-- Start the project button / Toggle form (#9E0402 Primary Button) -->
        <div class="relative z-10 flex flex-col items-center gap-4 pt-2">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button
              @click="showForm = !showForm"
              class="px-8 py-4 rounded-full bg-[#9E0402] hover:bg-[#B80604] text-white font-mono-tag font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#9E0402]/25 flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>{{ showForm ? 'TUTUP FORMULIR [X]' : 'START THE PROJECT ↗' }}</span>
            </button>

            <a
              :href="'mailto:' + portfolioInfo.email"
              class="px-6 py-4 rounded-full bg-white dark:bg-[#1A1C24] hover:bg-[#FDF6F6] dark:hover:bg-[#252834] text-[#1C1313] dark:text-white border border-[#EEDCDC] dark:border-white/10 font-mono-tag font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-xs hover:scale-105 active:scale-95"
            >
              <Mail class="w-4 h-4 text-[#9E0402] dark:text-[#ff4d4d]" />
              <span>{{ portfolioInfo.email }}</span>
            </a>
          </div>

          <!-- Direct Social Channels -->
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              :href="portfolioInfo.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold text-[#1C1313] dark:text-zinc-200 hover:text-[#9E0402] dark:hover:text-[#ff4d4d] hover:border-[#9E0402]/40 transition-all"
            >
              <Linkedin class="w-3.5 h-3.5 text-[#1E3A60] dark:text-[#9FC2EA]" />
              <span>LinkedIn Profile ↗</span>
            </a>

            <a
              :href="portfolioInfo.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF9F9] dark:bg-[#1A1C24] border border-[#EEDCDC] dark:border-white/10 text-xs font-mono-tag font-bold text-[#1C1313] dark:text-zinc-200 hover:text-[#9E0402] dark:hover:text-[#ff4d4d] hover:border-[#9E0402]/40 transition-all"
            >
              <Github class="w-3.5 h-3.5 text-[#9E0402] dark:text-[#ff4d4d]" />
              <span>GitHub Profile ↗</span>
            </a>
          </div>
          
          <p class="text-xs font-mono-tag text-[#5C4848] dark:text-zinc-400 pt-1">
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
                class="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3"
              >
                <CheckCircle2 class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p class="font-bold">Pesan berhasil terkirim!</p>
                  <p class="text-xs text-emerald-700 dark:text-emerald-400/80 mt-0.5">
                    {{ isMock ? '(Simulation Mode) Terima kasih telah mencoba.' : 'Terima kasih, saya akan segera merespons.' }}
                  </p>
                </div>
              </div>

              <!-- Error Alert -->
              <div 
                v-if="submitError" 
                class="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-sm flex items-start gap-3"
              >
                <AlertCircle class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <p>{{ submitError }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="text-xs font-mono-tag uppercase tracking-wider text-[#1C1313] dark:text-zinc-300 font-bold">Nama Lengkap</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Nama / Perusahaan Anda"
                    class="w-full px-4 py-3 rounded-xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 focus:border-[#9E0402] focus:ring-1 focus:ring-[#9E0402] text-sm text-[#1C1313] dark:text-white placeholder:text-[#94A3B8] outline-none transition-all shadow-xs"
                  />
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-mono-tag uppercase tracking-wider text-[#1C1313] dark:text-zinc-300 font-bold">Email Address</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    class="w-full px-4 py-3 rounded-xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 focus:border-[#9E0402] focus:ring-1 focus:ring-[#9E0402] text-sm text-[#1C1313] dark:text-white placeholder:text-[#94A3B8] outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-mono-tag uppercase tracking-wider text-[#1C1313] dark:text-zinc-300 font-bold">Detail Proyek</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="3"
                  placeholder="Ceritakan tentang ide produk, timeline, atau scope proyek..."
                  class="w-full px-4 py-3 rounded-xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC] dark:border-white/10 focus:border-[#9E0402] focus:ring-1 focus:ring-[#9E0402] text-sm text-[#1C1313] dark:text-white placeholder:text-[#94A3B8] outline-none transition-all resize-none shadow-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3.5 px-6 rounded-xl bg-[#9E0402] hover:bg-[#B80604] text-white font-mono-tag font-bold text-xs uppercase tracking-widest shadow-md shadow-[#9E0402]/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Mengirim Pesan...</span>
                <span v-else>SEND PROPOSAL ↗</span>
              </button>
            </form>
          </div>
        </transition>

      </div>
    </div>
  </section>
</template>
