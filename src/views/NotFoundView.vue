<script setup>
import { RouterLink } from 'vue-router'
import { Home, Sparkles } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-[65vh] flex items-center justify-center px-4 pt-20 pb-12">
    <div class="glass-panel p-6 sm:p-10 rounded-3xl text-center max-w-md w-full space-y-4">
      <div class="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
        <Sparkles class="w-7 h-7" />
      </div>
      
      <div class="space-y-1.5">
        <span class="text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold">Error 404</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">Halaman Tidak Ditemukan</h1>
        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Halaman yang Anda tuju mungkin telah dipindahkan atau tidak tersedia.
        </p>
      </div>

      <RouterLink
        to="/"
        class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 hover:from-indigo-500 hover:to-purple-500 transition-all"
      >
        <Home class="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </RouterLink>
    </div>
  </div>
</template>
