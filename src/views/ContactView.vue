<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  Linkedin, 
  Github, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ChevronDown, 
  Briefcase, 
  FileText, 
  Layers, 
  Cpu, 
  ArrowUpRight,
  MessageCircle,
  HelpCircle
} from 'lucide-vue-next'
import { usePortfolioStore } from '@/composables/usePortfolioStore'
import { sendContactMessage } from '@/lib/supabase'

const { portfolioInfo, currentProfile, addMessage } = usePortfolioStore()

// -------------------------------------------------------------
// LIVE JAKARTA TIME & AVAILABILITY STATUS
// -------------------------------------------------------------
const currentTimeStr = ref('')
const isOfficeHours = ref(true)
let timerId = null

const updateJakartaTime = () => {
  try {
    const now = new Date()
    const options = {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }
    const formatter = new Intl.DateTimeFormat('id-ID', options)
    currentTimeStr.value = `${formatter.format(now)} WIB`
    
    // Check hour in Jakarta (8:00 AM - 9:00 PM is active hours)
    const hourFormatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta', hour: 'numeric', hour12: false })
    const jakartaHour = parseInt(hourFormatter.format(now), 10)
    isOfficeHours.value = jakartaHour >= 8 && jakartaHour < 21
  } catch {
    currentTimeStr.value = 'WIB (GMT+7)'
    isOfficeHours.value = true
  }
}

onMounted(() => {
  updateJakartaTime()
  timerId = setInterval(updateJakartaTime, 1000)
})

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
})

// -------------------------------------------------------------
// COPY TO CLIPBOARD ACTIONS
// -------------------------------------------------------------
const copiedEmail = ref(false)
const copyEmail = async () => {
  if (!portfolioInfo.value.email) return
  try {
    await navigator.clipboard.writeText(portfolioInfo.value.email)
    copiedEmail.value = true
    setTimeout(() => {
      copiedEmail.value = false
    }, 2500)
  } catch (err) {
    console.error('Gagal menyalin email:', err)
  }
}

// -------------------------------------------------------------
// WHATSAPP DIRECT LINK
// -------------------------------------------------------------
const directPhone = computed(() => {
  if (currentProfile.value === 'raqwan') return '+62 812-9828-7897'
  return '+62 821-1146-4583'
})

const whatsappUrl = computed(() => {
  const fallbackNum = currentProfile.value === 'raqwan' ? '6281298287897' : '6282111464583'
  const phone = portfolioInfo.value.phone 
    ? portfolioInfo.value.phone.replace(/[^0-9]/g, '') 
    : fallbackNum
  const isNadya = currentProfile.value === 'nadya'
  const text = isNadya
    ? `Halo Nadya, saya tertarik untuk mendiskusikan peluang kolaborasi / lowongan kerja terkait Product Management & UI/UX.`
    : `Halo Raqwan, saya ingin berdiskusi mengenai proyek machine learning / peluang implementasi AI.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
})

// -------------------------------------------------------------
// INQUIRY FORM STATE
// -------------------------------------------------------------
const form = reactive({
  name: '',
  email: '',
  inquiryType: 'fulltime',
  timeline: '1-2-bulan',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const inquiryOptions = computed(() => {
  if (currentProfile.value === 'raqwan') {
    return [
      { id: 'fulltime', label: 'Full-time AI Role', desc: 'Rekayasa model AI & sistem produksi' },
      { id: 'vision', label: 'Computer Vision & Edge AI', desc: 'Deteksi objek, tracking, TensorRT' },
      { id: 'agentic', label: 'Agentic AI & GraphRAG', desc: 'Multi-agent workflows & Knowledge Graph' },
      { id: 'mlops', label: 'MLOps & Model Serving', desc: 'Deployment, Docker, telemetry' },
      { id: 'consulting', label: 'Tech Advisory & Konsultasi', desc: 'Studi kelayakan & konsultasi teknis' }
    ]
  }
  return [
    { id: 'fulltime', label: 'Full-time / Kontrak', desc: 'Peran Product Management atau Tech Writer' },
    { id: 'uiux', label: 'Product & UI/UX Design', desc: 'Riset pengguna, wireframe, figma high-fidelity' },
    { id: 'techwriting', label: 'Technical Writing & PRD', desc: 'Spesifikasi produk, API docs, release notes' },
    { id: 'audit', label: 'Usability Audit & Strategy', desc: 'Evaluasi konversi dan perbaikan pengalaman' },
    { id: 'chat', label: 'Diskusi Bebas & Networking', desc: 'Brainstorming ide atau perkenalan profesional' }
  ]
})

const timelineOptions = [
  { id: 'segera', label: 'Segera (< 2 Minggu)' },
  { id: '1-2-bulan', label: '1 – 2 Bulan' },
  { id: 'fleksibel', label: 'Fleksibel / Diskusi Awal' }
]

const lastWaUrl = ref('')

const handleSubmit = async () => {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    submitError.value = 'Harap lengkapi Nama, Email, dan Pesan sebelum mengirim.'
    return
  }

  submitError.value = ''
  isSubmitting.value = true

  const selectedCategoryObj = inquiryOptions.value.find(opt => opt.id === form.inquiryType)
  const categoryLabel = selectedCategoryObj ? selectedCategoryObj.label : 'General Inquiry'

  const selectedTimelineObj = timelineOptions.find(opt => opt.id === form.timeline)
  const timelineLabel = selectedTimelineObj ? selectedTimelineObj.label : form.timeline

  const recipientName = currentProfile.value === 'raqwan' ? 'Muhammad Raqwan' : 'Nadya Najelina'

  // Construct structured, professional WhatsApp text
  const waMessage = `Halo ${recipientName},

Saya ingin mendiskusikan peluang kolaborasi / pertanyaan melalui website portofolio Anda:

*Topik / Kebutuhan:* ${categoryLabel}
*Nama / Organisasi:* ${form.name.trim()}
*Email Kontak:* ${form.email.trim()}
*Target Linimasa:* ${timelineLabel}

*Ringkasan Kebutuhan / Detail Proyek:*
${form.message.trim()}

Terima kasih.`

  // Retrieve official profile WhatsApp phone number
  const defaultPhone = currentProfile.value === 'raqwan' ? '+62 812-9828-7897' : '+62 821-1146-4583'
  const rawPhone = portfolioInfo.value?.phone || defaultPhone
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '')
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`
  lastWaUrl.value = waUrl

  try {
    // 1. Save to reactive CMS store (visible immediately in /admin inbox)
    addMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      category: `${categoryLabel} [Linimasa: ${timelineLabel}]`,
      message: form.message.trim()
    }, currentProfile.value)

    // 2. Persist to Supabase Cloud Database as secure backup
    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        message: `[Kategori: ${categoryLabel}] [Linimasa: ${timelineLabel}]\n\n${form.message.trim()}`
      })
    } catch (dbErr) {
      console.warn('Database backup warning:', dbErr)
    }

    // 3. Immediately open WhatsApp in new tab / app
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer')
    }

    submitSuccess.value = true
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err) {
    console.error('Contact submission error:', err)
    submitError.value = 'Terjadi kendala saat memproses formulir. Silakan hubungi langsung via tombol WhatsApp di samping.'
  } finally {
    isSubmitting.value = false
  }
}

const resetFormSuccess = () => {
  submitSuccess.value = false
  lastWaUrl.value = ''
}

// -------------------------------------------------------------
// COLLABORATION MODELS
// -------------------------------------------------------------
const collaborationModels = computed(() => {
  if (currentProfile.value === 'raqwan') {
    return [
      {
        title: 'Full-time / Embedded AI Engineer',
        badge: 'Jangka Panjang',
        desc: 'Bergabung sebagai insinyur AI inti untuk merancang, melatih, dan menyebarkan model AI produksi end-to-end.',
        deliverables: ['Custom Model Training & Fine-tuning', 'Real-time Edge Inference Pipeline', 'Production MLOps & Telemetry']
      },
      {
        title: 'AI Architecture & PoC Sprint',
        badge: '2 – 4 Minggu',
        desc: 'Validasi cepat kelayakan teknis ide AI Anda menjadi Proof-of-Concept fungsional dengan metrik terukur.',
        deliverables: ['Benchmark Akurasi & Latensi', 'Prototipe API Berbasis FastAPI', 'Rekomendasi Arsitektur Skalabel']
      },
      {
        title: 'Model Optimization & Audit',
        badge: '1 – 2 Minggu',
        desc: 'Mengaudit pipeline inference lambat dan mengoptimalkannya dengan TensorRT/ONNX untuk memangkas biaya server.',
        deliverables: ['Profil Latensi & VRAM Profiling', 'Kuantisasi Presisi Tinggi (INT8/FP16)', 'Panduan Deployment Docker']
      }
    ]
  }
  return [
    {
      title: 'Full-time / In-house Leadership',
      badge: 'Jangka Panjang',
      desc: 'Memimpin visi produk, pengalaman pengguna, atau arsitektur dokumentasi teknis secara menyeluruh di tim Anda.',
      deliverables: ['Product Roadmap & Sprint Backlog', 'End-to-end UI/UX Architecture', 'Standarisasi Dokumentasi Teknis']
    },
    {
      title: 'Design Sprint & MVP Launch',
      badge: '3 – 6 Minggu',
      desc: 'Membawa ide abstrak dari tahap riset pengguna hingga menjadi prototipe Figma beresolusi tinggi yang siap didevelop.',
      deliverables: ['User Journey & Wireframing', 'High-fidelity Figma UI Kit', 'Usability Testing Report']
    },
    {
      title: 'Technical Writing & PRD Architecture',
      badge: '1 – 3 Minggu',
      desc: 'Menjembatani bisnis dan engineering dengan dokumen spesifikasi produk (PRD), panduan API, dan sistem dokumentasi yang tajam.',
      deliverables: ['Spesifikasi Fitur Terperinci (PRD)', 'API & Developer Documentation', 'Knowledge Base & User Guides']
    }
  ]
})

// -------------------------------------------------------------
// FAQS ACCORDION
// -------------------------------------------------------------
const activeFaqIndex = ref(0)
const toggleFaq = (idx) => {
  activeFaqIndex.value = activeFaqIndex.value === idx ? null : idx
}

const faqList = computed(() => {
  if (currentProfile.value === 'raqwan') {
    return [
      {
        q: 'Apakah terbuka untuk kerja secara Remote, Hybrid, atau On-site?',
        a: 'Ya, saya sangat fleksibel untuk model kerja Full Remote, Hybrid (area Jakarta / Jabodetabek), maupun On-site untuk sprint teknis dan deployment edge hardware kritis.'
      },
      {
        q: 'Bagaimana pendekatan rekayasa dalam deployment model ke perangkat edge?',
        a: 'Saya menggunakan pipeline kuantisasi (INT8/FP16) dengan TensorRT, ONNX Runtime, atau OpenVINO, didukung benchmarking mendalam untuk memastikan latensi sub-millisecond dan pemakaian VRAM minimal.'
      },
      {
        q: 'Apakah bersedia menandatangani Non-Disclosure Agreement (NDA)?',
        a: 'Tentu. Privasi data kepemilikan, bobot model (model weights), serta kode arsitektur bisnis klien selalu menjadi prioritas utama dengan standar kerahasiaan ketat.'
      },
      {
        q: 'Bagaimana format serah terima (handover) solusi sistem AI?',
        a: 'Deliverable mencakup container Docker teruji, REST/gRPC API endpoints (FastAPI), skrip validasi benchmark, dokumentasi arsitektur sistem lengkap, dan petunjuk monitoring telemetri.'
      }
    ]
  }
  return [
    {
      q: 'Apakah terbuka untuk kerja secara Remote, Hybrid, atau On-site?',
      a: 'Sangat terbuka! Saya berpengalaman berkolaborasi secara Full Remote dengan tim lintas zona waktu, maupun Hybrid dan On-site untuk kebutuhan kerja sama di area Jabodetabek.'
    },
    {
      q: 'Berapa lama estimasi pengerjaan satu siklus proyek produk atau dokumentasi?',
      a: 'Tergantung pada ruang lingkup. Untuk audit UX & PRD kilat biasanya memakan waktu 1–2 minggu. Untuk perancangan produk end-to-end (riset hingga deliverable Figma siap dev) biasanya berlangsung 3–6 minggu.'
    },
    {
      q: 'Tools apa saja yang digunakan dalam kolaborasi harian?',
      a: 'Saya terbiasa menggunakan Figma & FigJam untuk perancangan visual, Notion & Linear untuk spesifikasi produk (PRD) dan manajemen tugas, Git/GitHub untuk dokumentasi teknis, serta Slack/Google Meet untuk komunikasi rutin.'
    },
    {
      q: 'Bagaimana format serah terima (handover) deliverable ke tim developer?',
      a: 'Setiap desain diserahkan dengan Figma Dev Mode lengkap (token desain, spesifikasi komponen, spacing, interaksi), disertai dokumen PRD terstruktur di Notion atau Markdown yang siap dieksekusi oleh tim engineering.'
    },
    {
      q: 'Apakah bersedia menandatangani Non-Disclosure Agreement (NDA)?',
      a: 'Tentu saja. Kerahasiaan ide bisnis, data pengguna, dan strategi produk klien selalu terlindungi dengan penuh integritas profesional.'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen pt-24 sm:pt-32 pb-24 relative overflow-hidden bg-[#FFF9F9] dark:bg-[#090A0D] text-[#1C1313] dark:text-[#F4F4F6] transition-colors duration-300">
    
    <!-- Ambient Radial Glow Backlights -->
    <div 
      class="fixed top-20 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 dark:opacity-25"
      :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
    ></div>
    <div 
      class="fixed bottom-10 -right-40 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15 dark:opacity-20"
      :class="currentProfile === 'raqwan' ? 'bg-[#06B6D4]' : 'bg-[#9FC2EA]'"
    ></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-24">
      
      <!-- ═════════════════════════════════════════════════════════════ -->
      <!-- 1. HERO HEADER SECTION                                        -->
      <!-- ═════════════════════════════════════════════════════════════ -->
      <section class="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6 pt-4">
        
        <!-- Top Status Pill with Live Pulsing Beacon -->
        <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-[#15161B] border border-[#EEDCDC] dark:border-white/10 shadow-xs">
          <span class="relative flex h-2.5 w-2.5">
            <span 
              class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              :class="currentProfile === 'raqwan' ? 'bg-emerald-400' : 'bg-[#FB4617]'"
            ></span>
            <span 
              class="relative inline-flex rounded-full h-2.5 w-2.5"
              :class="currentProfile === 'raqwan' ? 'bg-emerald-500' : 'bg-[#FB4617]'"
            ></span>
          </span>
          <span class="text-xs font-mono-tag tracking-wider font-semibold uppercase text-[#5C4848] dark:text-zinc-300">
            {{ portfolioInfo.status || 'Tersedia untuk Peran Baru & Diskusi Proyek' }}
          </span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
          <template v-if="currentProfile === 'raqwan'">
            Siap membangun <span class="text-[#047857] dark:text-emerald-400 underline decoration-cyan-500/50 decoration-wavy decoration-2">sistem AI produksi</span>? Mari wujudkan bersama.
          </template>
          <template v-else>
            Punya ide ambisius? Mari ciptakan <span class="text-[#FB4617] dark:text-[#FB4617] underline decoration-[#9FC2EA] decoration-wavy decoration-2">produk bernilai tinggi</span> bersama.
          </template>
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg text-[#5C4848] dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          <template v-if="currentProfile === 'raqwan'">
            Terbuka untuk posisi Full-time AI Engineering, implementasi Computer Vision, sistem Multi-agent, serta optimasi latensi edge computing.
          </template>
          <template v-else>
            Terbuka untuk posisi Product Management, perancangan UI/UX komprehensif, penyusunan Technical Writing (PRD & Docs), dan sesi konsultasi strategis.
          </template>
        </p>

      </section>

      <!-- ═════════════════════════════════════════════════════════════ -->
      <!-- 2. MAIN 2-COLUMN HUB: INTERACTIVE FORM + DIRECT CHANNELS     -->
      <!-- ═════════════════════════════════════════════════════════════ -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <!-- LEFT COLUMN: Direct Channels & Operational Context (5 Cols) -->
        <div class="lg:col-span-5 space-y-5">
          
          <!-- Direct Email Card with 1-Click Copy -->
          <div class="p-6 rounded-3xl bg-white dark:bg-[#13141A] border border-[#EEDCDC] dark:border-white/10 shadow-xs hover:border-[#FB4617]/30 dark:hover:border-white/20 transition-all space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div 
                  class="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
                  :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-[#FB4617]'"
                >
                  <Mail class="w-5 h-5" />
                </div>
                <div>
                  <span class="text-xs font-mono-tag uppercase text-zinc-500 dark:text-zinc-400 block">Surat Elektronik</span>
                  <span class="text-sm font-bold text-[#1C1313] dark:text-white">Email Resmi</span>
                </div>
              </div>
              
              <!-- Quick Mailto Icon -->
              <a 
                :href="'mailto:' + portfolioInfo.email"
                class="p-2 rounded-xl bg-zinc-100 dark:bg-white/5 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Buka Aplikasi Email"
              >
                <ArrowUpRight class="w-4 h-4" />
              </a>
            </div>

            <div class="p-3.5 rounded-2xl bg-[#FFF9F9] dark:bg-[#0B0C0E] border border-[#EEDCDC]/80 dark:border-white/5 flex items-center justify-between gap-2">
              <span class="text-xs sm:text-sm font-mono font-medium text-[#1C1313] dark:text-zinc-200 truncate">
                {{ portfolioInfo.email }}
              </span>

              <button 
                @click="copyEmail"
                type="button"
                class="px-3 py-1.5 rounded-xl text-xs font-mono-tag font-bold uppercase transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                :class="copiedEmail 
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40' 
                  : 'bg-white dark:bg-white/10 text-[#1C1313] dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-white/20 border border-[#EEDCDC] dark:border-white/10'"
              >
                <Check v-if="copiedEmail" class="w-3.5 h-3.5" />
                <Copy v-else class="w-3.5 h-3.5" />
                <span>{{ copiedEmail ? 'Tersalin!' : 'Salin' }}</span>
              </button>
            </div>
          </div>

          <!-- Instant WhatsApp & Fast Chat -->
          <div class="p-6 rounded-3xl bg-white dark:bg-[#13141A] border border-[#EEDCDC] dark:border-white/10 shadow-xs hover:border-[#FB4617]/30 dark:hover:border-white/20 transition-all space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <MessageCircle class="w-5 h-5" />
                </div>
                <div>
                  <span class="text-xs font-mono-tag uppercase text-zinc-500 dark:text-zinc-400 block">Pesan Instan</span>
                  <span class="text-sm font-bold text-[#1C1313] dark:text-white">WhatsApp Direct</span>
                </div>
              </div>

              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono-tag font-bold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Respon Cepat
              </span>
            </div>

            <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-relaxed">
              Ingin diskusi cepat atau menjadwalkan panggilan pengantar? Hubungi langsung via WhatsApp dengan pesan pembuka siap pakai.
            </p>

            <a 
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-3 px-4 rounded-2xl font-mono-tag font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm text-white bg-[#047857] hover:bg-[#065F46]"
            >
              <span>Mulai Chat di WhatsApp ↗</span>
            </a>
          </div>

          <!-- Live Jakarta Timezone & Location Card -->
          <div class="p-6 rounded-3xl bg-white dark:bg-[#13141A] border border-[#EEDCDC] dark:border-white/10 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <Clock class="w-4 h-4 text-zinc-400" />
                <span class="text-xs font-mono-tag uppercase text-zinc-500 dark:text-zinc-400">Zona Waktu Lokal</span>
              </div>
              
              <div class="flex items-center gap-1.5">
                <span 
                  class="w-2 h-2 rounded-full"
                  :class="isOfficeHours ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'"
                ></span>
                <span class="text-[11px] font-mono-tag font-bold" :class="isOfficeHours ? 'text-emerald-500' : 'text-amber-500'">
                  {{ isOfficeHours ? 'Jam Kerja Aktif' : 'Di Luar Jam Kerja' }}
                </span>
              </div>
            </div>

            <div class="flex items-baseline justify-between border-b border-[#EEDCDC]/60 dark:border-white/5 pb-3">
              <span class="text-2xl sm:text-3xl font-mono font-bold text-[#1C1313] dark:text-white">
                {{ currentTimeStr || 'WIB (GMT+7)' }}
              </span>
              <span class="text-xs font-mono-tag text-zinc-500">Jakarta (GMT+7)</span>
            </div>

            <div class="flex items-center gap-2 text-xs text-[#5C4848] dark:text-zinc-400">
              <MapPin class="w-4 h-4 text-red-500 shrink-0" />
              <span>{{ portfolioInfo.location || 'Depok, Jawa Barat, Indonesia' }} (Terbuka untuk kolaborasi global)</span>
            </div>
          </div>

          <!-- Professional Network Cards (LinkedIn & GitHub) -->
          <div class="grid grid-cols-2 gap-3">
            <a 
              v-if="portfolioInfo.socials?.linkedin"
              :href="portfolioInfo.socials.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="p-4 rounded-2xl bg-white dark:bg-[#13141A] border border-[#EEDCDC] dark:border-white/10 hover:border-[#FB4617]/50 transition-all flex items-center justify-between group"
            >
              <div class="flex items-center gap-2.5">
                <Linkedin class="w-4 h-4 text-[#0A66C2]" />
                <span class="text-xs font-bold text-[#1C1313] dark:text-zinc-200 group-hover:text-[#FB4617] transition-colors">LinkedIn</span>
              </div>
              <ArrowUpRight class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a 
              v-if="portfolioInfo.socials?.github"
              :href="portfolioInfo.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="p-4 rounded-2xl bg-white dark:bg-[#13141A] border border-[#EEDCDC] dark:border-white/10 hover:border-[#FB4617]/50 transition-all flex items-center justify-between group"
            >
              <div class="flex items-center gap-2.5">
                <Github class="w-4 h-4 text-zinc-800 dark:text-white" />
                <span class="text-xs font-bold text-[#1C1313] dark:text-zinc-200 group-hover:text-[#FB4617] transition-colors">GitHub</span>
              </div>
              <ArrowUpRight class="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <!-- Response Commitment Banner -->
          <div class="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.02] border border-[#EEDCDC] dark:border-white/5 flex items-center gap-3">
            <ShieldCheck class="w-5 h-5 text-emerald-500 shrink-0" />
            <p class="text-xs text-[#5C4848] dark:text-zinc-400 leading-snug">
              <strong class="text-[#1C1313] dark:text-zinc-200">Garansi Respon:</strong> Rata-rata pesan dibalas dalam 2–4 jam di hari kerja. NDA tersedia atas permintaan.
            </p>
          </div>

        </div>

        <!-- RIGHT COLUMN: High-Impact Inquiry Form (7 Cols) -->
        <div class="lg:col-span-7">
          
          <div class="p-6 sm:p-10 rounded-3xl sm:rounded-[36px] bg-white dark:bg-[#13141A] border border-[#EEDCDC] dark:border-white/10 shadow-lg relative overflow-hidden">
            
            <!-- Success Overlay -->
            <div 
              v-if="submitSuccess"
              class="py-12 px-6 text-center space-y-6 flex flex-col items-center justify-center min-h-[460px]"
            >
              <div 
                class="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/20"
                :class="currentProfile === 'raqwan' ? 'bg-[#047857]' : 'bg-emerald-500'"
              >
                <CheckCircle2 class="w-8 h-8" />
              </div>

              <div class="space-y-2 max-w-md">
                <h3 class="text-2xl font-bold text-[#1C1313] dark:text-white">Pesan Dialihkan ke WhatsApp!</h3>
                <p class="text-sm text-[#5C4848] dark:text-zinc-400 leading-relaxed">
                  Data formulir Anda telah siap dan diteruskan ke WhatsApp resmi kami, serta dicadangkan secara aman di sistem.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm pt-2">
                <a 
                  v-if="lastWaUrl"
                  :href="lastWaUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full sm:w-auto px-6 py-3.5 rounded-xl text-white text-xs font-mono-tag font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  :class="currentProfile === 'raqwan' ? 'bg-[#047857] hover:bg-[#065F46] shadow-[#047857]/30' : 'bg-[#FB4617] hover:bg-[#E0370E] shadow-[#FB4617]/30'"
                >
                  <MessageCircle class="w-4 h-4" />
                  <span>Buka WhatsApp Sekarang ↗</span>
                </a>

                <button 
                  @click="resetFormSuccess"
                  type="button"
                  class="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-xs font-mono-tag font-bold uppercase tracking-wider text-[#1C1313] dark:text-white cursor-pointer transition-all"
                >
                  Kirim Pesan Lainnya
                </button>
              </div>
            </div>

            <!-- Active Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
              
              <div>
                <span class="text-xs font-mono-tag uppercase tracking-wider text-[#FB4617] dark:text-[#FB4617] font-bold block" :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : ''">
                  Formulir Kolaborasi & Pertanyaan
                </span>
                <h2 class="text-xl sm:text-2xl font-bold text-[#1C1313] dark:text-white mt-1">
                  Mulai Diskusi atau Kirimkan Tawaran
                </h2>
              </div>

              <!-- 1. Inquiry Topic Pills -->
              <div class="space-y-2">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-600 dark:text-zinc-300">
                  Jenis Kebutuhan / Topik Diskusi *
                </label>
                <div class="flex flex-wrap gap-2 pt-1">
                  <button 
                    v-for="opt in inquiryOptions"
                    :key="opt.id"
                    type="button"
                    @click="form.inquiryType = opt.id"
                    class="px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-left flex items-center gap-1.5"
                    :class="form.inquiryType === opt.id 
                      ? (currentProfile === 'raqwan' 
                          ? 'bg-[#047857] text-white shadow-md shadow-[#047857]/25 font-bold' 
                          : 'bg-[#FB4617] text-white shadow-md shadow-[#FB4617]/25 font-bold')
                      : 'bg-zinc-100 dark:bg-white/5 text-[#5C4848] dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10'"
                  >
                    <span>{{ opt.label }}</span>
                  </button>
                </div>
              </div>

              <!-- 2. Sender Identity Inputs -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-600 dark:text-zinc-300">
                    Nama Lengkap / Organisasi *
                  </label>
                  <input 
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso (PT Inovasi)"
                    class="w-full px-4 py-3 rounded-2xl bg-[#FFF9F9] dark:bg-[#090A0D] border border-[#EEDCDC] dark:border-white/10 text-xs sm:text-sm text-[#1C1313] dark:text-white outline-none focus:border-[#FB4617] dark:focus:border-white/30 transition-all"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-600 dark:text-zinc-300">
                    Alamat Email Kontak *
                  </label>
                  <input 
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="budi@perusahaan.com"
                    class="w-full px-4 py-3 rounded-2xl bg-[#FFF9F9] dark:bg-[#090A0D] border border-[#EEDCDC] dark:border-white/10 text-xs sm:text-sm text-[#1C1313] dark:text-white outline-none focus:border-[#FB4617] dark:focus:border-white/30 transition-all"
                  />
                </div>
              </div>

              <!-- 3. Target Timeline Chips -->
              <div class="space-y-2">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-600 dark:text-zinc-300">
                  Target Waktu / Linimasa Pelaksanaan
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button 
                    v-for="time in timelineOptions"
                    :key="time.id"
                    type="button"
                    @click="form.timeline = time.id"
                    class="px-3 py-2 rounded-xl text-xs font-mono-tag text-center transition-all cursor-pointer border"
                    :class="form.timeline === time.id 
                      ? 'border-[#FB4617] bg-[#FB4617]/10 text-[#FB4617] dark:text-[#ff8080] font-bold' 
                      : 'border-[#EEDCDC] dark:border-white/5 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5'"
                  >
                    {{ time.label }}
                  </button>
                </div>
              </div>

              <!-- 4. Detailed Message Input -->
              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-600 dark:text-zinc-300">
                  Ringkasan Kebutuhan / Detail Proyek *
                </label>
                <textarea 
                  v-model="form.message"
                  rows="4"
                  required
                  :placeholder="currentProfile === 'raqwan' 
                    ? 'Ceritakan tentang pipeline AI yang ingin dibangun, target latensi, dataset, atau peran yang Anda tawarkan...' 
                    : 'Ceritakan tentang produk, tantangan desain/spesifikasi teknis, atau ruang lingkup peran yang Anda tawarkan...'"
                  class="w-full px-4 py-3 rounded-2xl bg-[#FFF9F9] dark:bg-[#090A0D] border border-[#EEDCDC] dark:border-white/10 text-xs sm:text-sm text-[#1C1313] dark:text-white outline-none focus:border-[#FB4617] dark:focus:border-white/30 transition-all resize-y"
                ></textarea>
              </div>

              <!-- Error Alert -->
              <div v-if="submitError" class="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 flex items-center gap-2">
                <AlertCircle class="w-4 h-4 shrink-0" />
                <span>{{ submitError }}</span>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-4 px-6 rounded-2xl font-mono-tag font-bold text-xs sm:text-sm uppercase tracking-wider text-white shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                :class="currentProfile === 'raqwan' 
                  ? 'bg-[#047857] hover:bg-[#065F46] shadow-[#047857]/30' 
                  : 'bg-[#FB4617] hover:bg-[#E0370E] shadow-[#FB4617]/30'"
              >
                <Send v-if="!isSubmitting" class="w-4 h-4" />
                <span v-else class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                <span>{{ isSubmitting ? 'Menyiapkan Pesan WhatsApp...' : 'KIRIM PESAN VIA WHATSAPP ↗' }}</span>
              </button>

              <div class="text-center">
                <span class="text-[11px] font-mono-tag text-zinc-500 dark:text-zinc-500">
                  Pesan langsung diteruskan ke WhatsApp resmi & dicadangkan secara aman.
                </span>
              </div>

            </form>

          </div>

        </div>

      </section>

      <!-- ═════════════════════════════════════════════════════════════ -->
      <!-- 3. COLLABORATION FRAMEWORK / CARA BEKERJA                    -->
      <!-- ═════════════════════════════════════════════════════════════ -->
      <section class="space-y-8">
        
        <div class="text-center space-y-2 max-w-2xl mx-auto">
          <span class="text-xs font-mono-tag uppercase tracking-wider text-[#FB4617] dark:text-[#ff8080] font-bold" :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : ''">
            Model Keterlibatan (Engagement Models)
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">
            Pilihan Format Kolaborasi Fleksibel
          </h2>
          <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400">
            Disesuaikan dengan tahapan pertumbuhan produk, kebutuhan tim engineering, dan kecepatan rilis Anda.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(model, idx) in collaborationModels" 
            :key="idx"
            class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#13141A] border border-[#EEDCDC] dark:border-white/10 shadow-xs hover:border-[#FB4617]/40 dark:hover:border-white/20 transition-all flex flex-col justify-between space-y-6 group"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono-tag font-bold text-zinc-400">0{{ idx + 1 }}</span>
                <span 
                  class="px-2.5 py-1 rounded-full text-[10px] font-mono-tag font-bold uppercase tracking-wider bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-300 border border-[#EEDCDC] dark:border-white/10"
                >
                  {{ model.badge }}
                </span>
              </div>

              <h3 class="text-lg font-bold text-[#1C1313] dark:text-white group-hover:text-[#FB4617] dark:group-hover:text-[#ff8080] transition-colors" :class="currentProfile === 'raqwan' ? 'group-hover:text-emerald-400 dark:group-hover:text-emerald-400' : ''">
                {{ model.title }}
              </h3>

              <p class="text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400 leading-relaxed">
                {{ model.desc }}
              </p>
            </div>

            <div class="space-y-2 pt-4 border-t border-[#EEDCDC]/60 dark:border-white/5">
              <span class="text-[11px] font-mono-tag font-bold uppercase text-zinc-500 block">Deliverables Kunci:</span>
              <ul class="space-y-1.5">
                <li 
                  v-for="(item, i) in model.deliverables" 
                  :key="i"
                  class="text-xs text-[#1C1313] dark:text-zinc-300 flex items-center gap-2"
                >
                  <Check class="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      <!-- ═════════════════════════════════════════════════════════════ -->
      <!-- 4. FREQUENTLY ASKED QUESTIONS (FAQ)                          -->
      <!-- ═════════════════════════════════════════════════════════════ -->
      <section class="max-w-3xl mx-auto space-y-8">
        
        <div class="text-center space-y-2">
          <span class="text-xs font-mono-tag uppercase tracking-wider text-[#FB4617] dark:text-[#ff8080] font-bold" :class="currentProfile === 'raqwan' ? 'text-[#047857] dark:text-emerald-400' : ''">
            Pertanyaan yang Sering Diajukan
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#1C1313] dark:text-white">
            FAQ & Hal Penting Seputar Kerja Sama
          </h2>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(faq, idx) in faqList" 
            :key="idx"
            class="rounded-2xl bg-white dark:bg-[#13141A] border border-[#EEDCDC] dark:border-white/10 overflow-hidden transition-all shadow-2xs"
          >
            <button 
              @click="toggleFaq(idx)"
              class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <span class="text-sm sm:text-base font-bold text-[#1C1313] dark:text-white">
                {{ faq.q }}
              </span>
              <ChevronDown 
                class="w-4 h-4 text-zinc-400 transition-transform duration-200 shrink-0"
                :class="{ 'rotate-180': activeFaqIndex === idx }"
              />
            </button>

            <div 
              v-show="activeFaqIndex === idx" 
              class="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-[#5C4848] dark:text-zinc-400 leading-relaxed border-t border-[#EEDCDC]/40 dark:border-white/5"
            >
              <div class="pt-3">
                {{ faq.a }}
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>

  </div>
</template>
