<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  KeyRound,
  ArrowRight
} from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!username.value.trim() || !password.value) {
    errorMessage.value = 'Silakan masukkan username dan password.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await login(username.value, password.value)
    if (res.success) {
      router.push('/admin')
    } else {
      errorMessage.value = res.message || 'Login gagal.'
    }
  } catch (err) {
    errorMessage.value = 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#07080A] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
    
    <!-- Ambient Background Glow & Grids -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9E0402]/15 rounded-full blur-[140px]"></div>
      <div class="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#9FC2EA]/10 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#1f2430_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
    </div>

    <!-- Top Back Link -->
    <div class="absolute top-6 left-6 z-20">
      <button 
        @click="router.push('/')"
        class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tag uppercase tracking-wider text-zinc-400 hover:text-white transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        <span>Kembali ke Portfolio</span>
      </button>
    </div>

    <!-- Main Card Container -->
    <div class="w-full max-w-md relative z-10">
      <div class="p-7 sm:p-9 rounded-[32px] bg-[#111319]/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-7">
        
        <!-- Header -->
        <div class="text-center space-y-2.5">
          <div class="w-14 h-14 rounded-2xl bg-[#9E0402]/15 border border-[#9E0402]/30 text-[#ff4d4d] flex items-center justify-center mx-auto shadow-inner">
            <KeyRound class="w-6 h-6" />
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono-tag font-bold uppercase text-[#ff4d4d] mb-1.5">
              <ShieldCheck class="w-3 h-3 text-[#ff4d4d]" />
              <span>Restricted Access</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Admin Portal</h1>
            <p class="text-xs text-zinc-400 mt-1">Masuk untuk mengelola landing page & case studies</p>
          </div>
        </div>

        <!-- Error Alert -->
        <transition name="fade">
          <div 
            v-if="errorMessage" 
            class="p-3.5 rounded-2xl bg-[#9E0402]/15 border border-[#9E0402]/40 flex items-start gap-2.5 text-xs text-[#ff8080]"
          >
            <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" />
            <span>{{ errorMessage }}</span>
          </div>
        </transition>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          
          <!-- Username Input -->
          <div class="space-y-1.5">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">
              Username
            </label>
            <div class="relative">
              <User class="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                v-model="username"
                type="text"
                autocomplete="username"
                placeholder="Masukkan username"
                required
                class="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] focus:ring-1 focus:ring-[#9E0402] text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div class="space-y-1.5">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">
              Password
            </label>
            <div class="relative">
              <Lock class="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Masukkan password"
                required
                class="w-full pl-10 pr-11 py-3 rounded-2xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] focus:ring-1 focus:ring-[#9E0402] text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full py-3.5 px-6 rounded-2xl bg-[#9E0402] hover:bg-[#B80604] active:scale-[0.99] text-white font-bold font-mono-tag text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#9E0402]/25 cursor-pointer disabled:opacity-50 mt-2"
          >
            <span v-if="!isLoading">Masuk ke Dashboard</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Memverifikasi...</span>
            </span>
            <ArrowRight v-if="!isLoading" class="w-3.5 h-3.5" />
          </button>

        </form>

        <!-- Security Footer Badge -->
        <div class="pt-2 border-t border-white/5 text-center">
          <p class="text-[11px] font-mono-tag text-zinc-400">
            Protected Admin Session • Portofolio Nadya
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
