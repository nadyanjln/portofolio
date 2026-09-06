<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { 
  LayoutDashboard, 
  FolderKanban, 
  UserCog, 
  Sparkles, 
  GraduationCap, 
  Mail, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  TrendingUp,
  Briefcase,
  X,
  Search,
  Check,
  Database,
  RefreshCw,
  Zap,
  Clock,
  Image as ImageIcon,
  Workflow,
  MessageSquareQuote,
  Phone,
  MapPin,
  Layers
} from 'lucide-vue-next'
import { useAuth } from '@/composables/useAuth'
import { usePortfolioStore } from '@/composables/usePortfolioStore'

const router = useRouter()
const { currentUser, logout } = useAuth()
const { 
  portfolioInfo, 
  skills, 
  projects, 
  educations, 
  testimonials,
  workflows,
  messages,
  isSupabaseLoaded,
  isLoadingSupabase,
  isLoadedFromCache,
  cacheExpiryTime,
  refreshCacheFromBackend,
  pushDataToSupabase,
  setActiveProfile,
  updateInfo,
  addProject,
  updateProject,
  deleteProject,
  addSkill,
  deleteSkill,
  updateEducations,
  updateWorkflows,
  updateTestimonials,
  addTestimonial,
  deleteTestimonial,
  markMessageRead,
  deleteMessage,
  resetToDefault,
  nadyaState,
  raqwanState
} = usePortfolioStore()

// Selected Profile to manage in Admin CMS: 'nadya' | 'raqwan'
const selectedAdminProfile = ref('nadya')

const switchAdminProfile = (profileKey) => {
  selectedAdminProfile.value = profileKey
  setActiveProfile(profileKey)
  profileForm.value = { ...portfolioInfo.value }
  if (!profileForm.value.socials) profileForm.value.socials = {}
  educationList.value = JSON.parse(JSON.stringify(educations.value || []))
  workflowList.value = JSON.parse(JSON.stringify(workflows.value || [])).map(w => ({
    ...w,
    deliverablesString: (w.deliverables || []).join(', ')
  }))
  showToast(`Beralih ke pengelolaan portofolio: ${profileKey === 'nadya' ? 'Nadya Najelina' : 'Muhammad Raqwan Kauthar'}`)
}

// Navigation Tabs: 'overview' | 'projects' | 'profile' | 'skills' | 'education' | 'inbox'
const activeTab = ref('overview')

// Toast Notification State
const toast = ref({ show: false, message: '', type: 'success' })
const showToast = (msg, type = 'success') => {
  toast.value = { show: true, message: msg, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3500)
}

const isSyncing = ref(false)
const handleSyncSupabase = async () => {
  isSyncing.value = true
  try {
    const res = await pushDataToSupabase()
    if (res.success) {
      showToast('Seluruh data (Proyek, Skill, Testimoni, Profil) berhasil disinkronkan ke Supabase!')
    } else {
      showToast('Sebagian tabel Supabase belum dibuat. Pastikan script schema.sql sudah dijalankan di Supabase SQL Editor.', 'error')
    }
  } catch (err) {
    showToast('Gagal sinkronisasi: ' + err.message, 'error')
  } finally {
    isSyncing.value = false
  }
}

const isRefreshingCache = ref(false)
const handleRefreshCache = async () => {
  isRefreshingCache.value = true
  try {
    await refreshCacheFromBackend()
    showToast('Cache diperbarui! Data terbaru berhasil diambil dari backend Supabase.')
  } catch (err) {
    showToast('Gagal memperbarui cache: ' + err.message, 'error')
  } finally {
    isRefreshingCache.value = false
  }
}

const handleLogout = () => {
  logout()
  router.push('/')
}

// -------------------------------------------------------------
// PROFILE EDITING STATE (SYNCED WITH SUPABASE CLOUD)
// -------------------------------------------------------------
const profileForm = ref({ ...portfolioInfo.value })
const isSavingProfile = ref(false)

// Keep form reactively synced when portfolioInfo loads from Supabase
watch(portfolioInfo, (newVal) => {
  if (newVal && newVal.name) {
    profileForm.value = { ...newVal }
    if (!profileForm.value.socials) profileForm.value.socials = {}
  }
}, { immediate: true, deep: true })

watch(educations, (newEdus) => {
  if (newEdus && newEdus.length) {
    educationList.value = JSON.parse(JSON.stringify(newEdus))
  }
}, { immediate: true, deep: true })

watch(workflows, (newWorkflows) => {
  if (newWorkflows && newWorkflows.length) {
    workflowList.value = JSON.parse(JSON.stringify(newWorkflows)).map(w => ({
      ...w,
      deliverablesString: (w.deliverables || []).join(', ')
    }))
  }
}, { immediate: true, deep: true })

const saveProfile = async () => {
  isSavingProfile.value = true
  try {
    const res = await updateInfo(profileForm.value, selectedAdminProfile.value)
    if (res?.success !== false) {
      showToast(`Profil ${selectedAdminProfile.value === 'nadya' ? 'Nadya' : 'Raqwan'} berhasil disimpan langsung ke Supabase Cloud!`)
    } else {
      showToast(`Gagal menyimpan ke Supabase: ${res?.error || 'Periksa koneksi'}`, 'error')
    }
  } catch (err) {
    showToast(`Error: ${err.message}`, 'error')
  } finally {
    isSavingProfile.value = false
  }
}

// -------------------------------------------------------------
// PROJECT MODAL & FORM STATE
// -------------------------------------------------------------
// PROJECT MODAL & FORM STATE (FULLY ACCOMMODATED FOR SUPABASE & LIVE VIEWS)
// -------------------------------------------------------------
const isProjectModalOpen = ref(false)
const isEditingProject = ref(false)
const editingProjectId = ref(null)

const nadyaCategories = [
  'Product Design',
  'UX Design',
  'Product Management',
  'Design System',
  'Technical Writing'
]

const raqwanCategories = [
  'Agentic AI & LLMs',
  'Computer Vision & MLOps',
  'Edge Computing & IoT',
  'Robotics & Embedded Systems',
  'Fullstack AI Systems'
]

const currentCategories = computed(() => {
  return selectedAdminProfile.value === 'raqwan' ? raqwanCategories : nadyaCategories
})

const projectForm = ref({
  title: '',
  category: 'Product Design',
  role: '',
  duration: '3 bulan',
  description: '',
  tagsString: '',
  image: '',
  liveUrl: '',
  githubUrl: '',
  featured: true,
  prolog: '',
  problem: '',
  problemPointsString: '',
  solution: '',
  resultMetric: '',
  resultBefore: '',
  resultAfter: '',
  galleryString: ''
})

const openAddProjectModal = () => {
  isEditingProject.value = false
  editingProjectId.value = null
  const isRaqwan = selectedAdminProfile.value === 'raqwan'
  projectForm.value = {
    title: '',
    category: isRaqwan ? 'Agentic AI & LLMs' : 'Product Design',
    role: isRaqwan ? 'Lead AI Engineer & MLOps' : 'Product Manager & UI/UX Designer',
    duration: '3 bulan (Sep – Nov 2024)',
    description: '',
    tagsString: isRaqwan ? 'PyTorch, TensorRT, FastAPI, Docker' : 'Figma, User Research, Design System, Agile',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: '',
    githubUrl: '',
    featured: true,
    prolog: '',
    problem: 'Tantangan teknis atau bisnis utama yang diselesaikan.',
    problemPointsString: 'Bottleneck performa dan skalabilitas sistem lama\nKurangnya standarisasi arsitektur produk\nKebutuhan latensi rendah dan keandalan tinggi',
    solution: 'Pendekatan arsitektur dan sistem modular yang diimplementasikan secara teruji.',
    resultMetric: isRaqwan ? 'Inference Speedup' : 'Usability Score',
    resultBefore: isRaqwan ? '45 ms' : '62/100',
    resultAfter: isRaqwan ? '3.8 ms' : '91/100',
    galleryString: ''
  }
  isProjectModalOpen.value = true
}

const openEditProjectModal = (proj) => {
  isEditingProject.value = true
  editingProjectId.value = proj.id
  const isRaqwan = selectedAdminProfile.value === 'raqwan'

  // Extract problem string & points
  let problemDesc = ''
  let problemPointsStr = ''
  if (typeof proj.detail?.problem === 'string') {
    problemDesc = proj.detail.problem
  } else if (typeof proj.detail?.problem === 'object' && proj.detail?.problem) {
    problemDesc = proj.detail.problem.description || proj.detail.problem.overview || ''
    if (Array.isArray(proj.detail.problem.points)) {
      problemPointsStr = proj.detail.problem.points.map(p => {
        if (typeof p === 'string') return p
        return p.title ? `${p.title}: ${p.description || ''}` : (p.description || '')
      }).filter(Boolean).join('\n')
    }
  }

  // Extract solution
  const solutionDesc = typeof proj.detail?.solution === 'string' 
    ? proj.detail.solution 
    : (proj.detail?.solution?.description || '')

  // Extract gallery
  let galleryStr = ''
  if (Array.isArray(proj.detail?.gallery)) {
    galleryStr = proj.detail.gallery.map(g => typeof g === 'string' ? g : (g.image || g.url)).filter(Boolean).join('\n')
  }

  // Extract prolog / overview
  const prologText = proj.detail?.prolog || (typeof proj.detail?.overview === 'string' ? proj.detail.overview : proj.detail?.overview?.description) || ''

  projectForm.value = {
    title: proj.title || '',
    category: proj.category || (isRaqwan ? 'Agentic AI & LLMs' : 'Product Design'),
    role: proj.detail?.role || (isRaqwan ? 'Lead AI Engineer' : 'Lead PM & UI/UX Designer'),
    duration: proj.detail?.duration || '3 bulan',
    description: proj.description || '',
    tagsString: (proj.tags || []).join(', '),
    image: proj.image || '',
    liveUrl: proj.liveUrl || proj.live_url || '',
    githubUrl: proj.githubUrl || proj.github_url || '',
    featured: proj.featured ?? true,
    prolog: prologText,
    problem: problemDesc,
    problemPointsString: problemPointsStr,
    solution: solutionDesc,
    resultMetric: proj.detail?.results?.[0]?.metric || '',
    resultBefore: proj.detail?.results?.[0]?.before || '',
    resultAfter: proj.detail?.results?.[0]?.after || '',
    galleryString: galleryStr
  }
  isProjectModalOpen.value = true
}

const saveProjectForm = () => {
  if (!projectForm.value.title.trim()) {
    showToast('Judul proyek tidak boleh kosong!', 'error')
    return
  }

  const tags = projectForm.value.tagsString
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)

  const existingProject = (isEditingProject.value && editingProjectId.value)
    ? (selectedAdminProfile.value === 'raqwan' ? raqwanState.projects.value : nadyaState.projects.value).find(p => p.id === editingProjectId.value)
    : null

  const existingDetail = existingProject?.detail || {}

  // Parse problem points
  const points = projectForm.value.problemPointsString
    ? projectForm.value.problemPointsString.split('\n').map(p => p.trim()).filter(Boolean).map((pt, idx) => {
        const parts = pt.split(':')
        if (parts.length > 1) {
          return { num: `0${idx + 1}`, title: parts[0].trim(), description: parts.slice(1).join(':').trim() }
        }
        return { num: `0${idx + 1}`, title: `Tantangan 0${idx + 1}`, description: pt }
      })
    : (existingDetail.problem?.points || [])

  // Parse gallery
  const galleryUrls = projectForm.value.galleryString
    ? projectForm.value.galleryString.split('\n').map(u => u.trim()).filter(Boolean)
    : []

  const formattedGallery = galleryUrls.length ? galleryUrls.map((url, i) => {
    const existingG = Array.isArray(existingDetail.gallery) ? existingDetail.gallery[i] : null
    return {
      image: url,
      title: existingG?.title || `Artifact Showcase 0${i + 1}`,
      caption: existingG?.caption || `Visual production artifact 0${i + 1}`
    }
  }) : (existingDetail.gallery || [])

  const payload = {
    title: projectForm.value.title,
    category: projectForm.value.category,
    description: projectForm.value.description,
    tags,
    image: projectForm.value.image,
    liveUrl: projectForm.value.liveUrl,
    githubUrl: projectForm.value.githubUrl,
    featured: projectForm.value.featured,
    highlights: existingProject?.highlights || [
      `Mengembangkan solusi ${projectForm.value.category} dengan pendekatan teruji`,
      `Meningkatkan metrik performa sistem dan kepuasan pengguna`
    ],
    detail: {
      ...existingDetail,
      duration: projectForm.value.duration,
      role: projectForm.value.role || (selectedAdminProfile.value === 'raqwan' ? 'Lead AI Engineer' : 'Lead PM & UI/UX Designer'),
      technology: existingDetail.technology || projectForm.value.category,
      tools: existingDetail.tools || tags,
      overview: projectForm.value.prolog || projectForm.value.description,
      prolog: projectForm.value.prolog,
      problem: {
        title: 'The Core Challenge',
        overview: projectForm.value.problem,
        description: projectForm.value.problem,
        points: points
      },
      solution: {
        title: 'Production Architecture',
        description: projectForm.value.solution
      },
      gallery: formattedGallery,
      results: projectForm.value.resultMetric ? [
        {
          metric: projectForm.value.resultMetric,
          before: projectForm.value.resultBefore,
          after: projectForm.value.resultAfter,
          change: `${projectForm.value.resultAfter} achieved`
        }
      ] : (existingDetail.results || [])
    }
  }

  if (isEditingProject.value && editingProjectId.value) {
    updateProject(editingProjectId.value, payload, selectedAdminProfile.value)
    showToast('Proyek & Artifact Gallery berhasil diperbarui langsung ke Supabase Cloud!')
  } else {
    addProject(payload, selectedAdminProfile.value)
    showToast('Proyek & Artifact Gallery baru berhasil ditambahkan langsung ke Supabase Cloud!')
  }

  isProjectModalOpen.value = false
}

const handleDeleteProject = (id, title) => {
  if (confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
    deleteProject(id, selectedAdminProfile.value)
    showToast('Proyek berhasil dihapus!')
  }
}

// -------------------------------------------------------------
// SKILLS FORM STATE
// -------------------------------------------------------------
const newSkillName = ref('')
const newSkillCategory = ref('AI Core')
const newSkillLevel = ref('Expert')

const handleAddSkill = () => {
  if (!newSkillName.value.trim()) return

  addSkill({
    name: newSkillName.value.trim(),
    category: newSkillCategory.value,
    level: newSkillLevel.value,
    color: selectedAdminProfile.value === 'raqwan' ? 'emerald' : 'rose'
  }, selectedAdminProfile.value)

  newSkillName.value = ''
  showToast('Skill baru berhasil ditambahkan!')
}

const handleDeleteSkill = (name) => {
  if (confirm(`Hapus skill "${name}"?`)) {
    deleteSkill(name, selectedAdminProfile.value)
    showToast('Skill berhasil dihapus!')
  }
}

// -------------------------------------------------------------
// WORKFLOWS ("BAGAIMANA SAYA BEKERJA") STATE
// -------------------------------------------------------------
const workflowList = ref(
  (workflows.value || []).map(w => ({
    ...w,
    deliverablesString: (w.deliverables || []).join(', ')
  }))
)

const addWorkflowStep = () => {
  const nextNum = String(workflowList.value.length + 1).padStart(2, '0')
  workflowList.value.push({
    step: nextNum,
    phase: 'Nama Fase Alur Kerja Baru',
    tagline: 'Tagline Singkat Metodologi',
    description: 'Penjelasan pendekatan teknis dan eksekusi pada fase ini.',
    deliverablesString: 'Deliverable 1, Deliverable 2',
    deliverables: ['Deliverable 1', 'Deliverable 2']
  })
}

const removeWorkflowStep = (idx) => {
  workflowList.value.splice(idx, 1)
}

const saveWorkflows = () => {
  const sanitized = workflowList.value.map(w => {
    const dels = typeof w.deliverablesString === 'string'
      ? w.deliverablesString.split(',').map(s => s.trim()).filter(Boolean)
      : (w.deliverables || [])
    return {
      step: w.step,
      phase: w.phase,
      tagline: w.tagline,
      description: w.description,
      deliverables: dels
    }
  })
  updateWorkflows(sanitized, selectedAdminProfile.value)
  showToast('Alur kerja ("Bagaimana Saya Bekerja") berhasil disimpan!')
}

// -------------------------------------------------------------
// TESTIMONIALS ("APA KATA REKAN & STAKEHOLDER") STATE
// -------------------------------------------------------------
const isTestiModalOpen = ref(false)
const isEditingTesti = ref(false)
const testiForm = ref({
  id: null,
  name: '',
  role: '',
  company: '',
  content: '',
  badge: 'Stakeholder Feedback',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
})

const openAddTestiModal = () => {
  isEditingTesti.value = false
  testiForm.value = {
    id: null,
    name: '',
    role: selectedAdminProfile.value === 'raqwan' ? 'Chief Technology Officer' : 'Lead Product Manager',
    company: 'PT. Mitra Teknologi Gemilang',
    content: 'Feedback dan apresiasi stakeholder terhadap delivery proyek dan solusi yang dirancang.',
    badge: selectedAdminProfile.value === 'raqwan' ? 'AI Leadership Feedback' : 'Product & UX Feedback',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  }
  isTestiModalOpen.value = true
}

const openEditTestiModal = (t) => {
  isEditingTesti.value = true
  testiForm.value = { ...t }
  isTestiModalOpen.value = true
}

const saveTestiForm = () => {
  if (!testiForm.value.name.trim() || !testiForm.value.content.trim()) {
    showToast('Nama dan isi testimoni tidak boleh kosong!', 'error')
    return
  }
  if (isEditingTesti.value && testiForm.value.id) {
    const list = selectedAdminProfile.value === 'nadya' ? [...nadyaState.testimonials.value] : [...raqwanState.testimonials.value]
    const idx = list.findIndex(item => item.id === testiForm.value.id)
    if (idx !== -1) {
      list[idx] = { ...testiForm.value }
      updateTestimonials(list, selectedAdminProfile.value)
      showToast('Testimoni berhasil diperbarui!')
    }
  } else {
    addTestimonial({ ...testiForm.value }, selectedAdminProfile.value)
    showToast('Testimoni baru berhasil ditambahkan!')
  }
  isTestiModalOpen.value = false
}

const handleDeleteTestimonial = (id, name) => {
  if (confirm(`Hapus testimoni dari "${name}"?`)) {
    deleteTestimonial(id, selectedAdminProfile.value)
    showToast('Testimoni berhasil dihapus.')
  }
}

// -------------------------------------------------------------
// EDUCATION EDITING STATE
// -------------------------------------------------------------
const educationList = ref(JSON.parse(JSON.stringify(educations.value || [])))
const addEducationRow = () => {
  educationList.value.push({
    degree: 'S1 Teknik Informatika',
    school: 'Universitas Gunadarma',
    year: '2022 - 2026'
  })
}

const removeEducationRow = (index) => {
  educationList.value.splice(index, 1)
}

const saveEducation = () => {
  updateEducations(educationList.value, selectedAdminProfile.value)
  showToast('Daftar riwayat pendidikan berhasil disimpan!')
}

// -------------------------------------------------------------
// INBOX & RESET
// -------------------------------------------------------------
const activeMessage = ref(null)
const openMessageModal = (msg) => {
  activeMessage.value = msg
  markMessageRead(msg.id, selectedAdminProfile.value)
}

const handleDeleteMessage = (id) => {
  if (confirm('Hapus pesan kontak ini?')) {
    deleteMessage(id, selectedAdminProfile.value)
    if (activeMessage.value?.id === id) {
      activeMessage.value = null
    }
    showToast('Pesan berhasil dihapus.')
  }
}

const handleReset = () => {
  if (confirm(`Peringatan: Seluruh data lokal ${selectedAdminProfile.value === 'nadya' ? 'Nadya' : 'Raqwan'} akan dikembalikan ke data awal. Lanjutkan?`)) {
    resetToDefault(selectedAdminProfile.value)
    profileForm.value = { ...portfolioInfo.value }
    educationList.value = JSON.parse(JSON.stringify(educations.value || []))
    workflowList.value = JSON.parse(JSON.stringify(workflows.value || [])).map(w => ({
      ...w,
      deliverablesString: (w.deliverables || []).join(', ')
    }))
    showToast('Seluruh data berhasil direset ke nilai awal!')
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#07080A] text-white flex flex-col font-sans">
    
    <!-- Top Navbar -->
    <header class="sticky top-0 z-40 bg-[#0B0C10]/80 border-b border-white/10 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="flex items-center gap-3 self-start sm:self-auto">
        <div class="w-8 h-8 rounded-lg bg-[#9E0402] text-white font-extrabold flex items-center justify-center text-xs shadow-md">
          CMS
        </div>
        <div>
          <h1 class="text-sm sm:text-base font-bold text-white leading-tight">Admin Dashboard</h1>
          <span class="text-[10px] font-mono-tag text-zinc-400">Multi-Portfolio CMS Hub • v2.0</span>
        </div>
      </div>

      <!-- Profile Selector Switcher in Header -->
      <div class="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
        <button 
          @click="switchAdminProfile('nadya')"
          class="px-3.5 py-1.5 rounded-xl text-xs font-mono-tag font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="selectedAdminProfile === 'nadya' ? 'bg-[#9E0402] text-white shadow-md' : 'text-zinc-400 hover:text-white'"
        >
          <span>Nadya (PM & UX)</span>
        </button>
        <button 
          @click="switchAdminProfile('raqwan')"
          class="px-3.5 py-1.5 rounded-xl text-xs font-mono-tag font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="selectedAdminProfile === 'raqwan' ? 'bg-[#047857] text-white shadow-md' : 'text-zinc-400 hover:text-white'"
        >
          <span>Raqwan (AI Eng)</span>
        </button>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
        <!-- Supabase Live Connection Indicator -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono-tag">
          <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span class="text-zinc-300 font-semibold">Supabase Live</span>
        </div>

        <RouterLink 
          :to="'/' + selectedAdminProfile" 
          target="_blank"
          class="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tag text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
          :title="'Buka live portofolio ' + selectedAdminProfile"
        >
          <span>Lihat Site ({{ selectedAdminProfile }})</span>
          <ExternalLink class="w-3 h-3" />
        </RouterLink>

        <button 
          @click="handleLogout"
          class="px-3.5 py-1.5 rounded-xl bg-[#9E0402]/20 hover:bg-[#9E0402]/30 border border-[#9E0402]/40 text-xs font-mono-tag font-bold text-[#ff8080] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>

    <!-- Main Container with Sidebar + Content -->
    <div class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      
      <!-- ═══════════════════════════════════════════ -->
      <!-- SIDEBAR NAVIGATION                          -->
      <!-- ═══════════════════════════════════════════ -->
      <aside class="lg:col-span-3 p-3 rounded-3xl bg-[#111319] border border-white/10 space-y-1 shadow-lg">
        <div class="px-4 py-3 border-b border-white/5 mb-1">
          <span class="text-[10px] font-mono-tag uppercase text-zinc-400 font-bold tracking-wider">Navigasi Panel</span>
        </div>

        <button 
          @click="activeTab = 'overview'"
          class="w-full px-4 py-2.5 rounded-2xl text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer text-left"
          :class="[
            activeTab === 'overview'
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <LayoutDashboard class="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button 
          @click="activeTab = 'projects'"
          class="w-full px-4 py-2.5 rounded-2xl text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer text-left"
          :class="[
            activeTab === 'projects'
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <div class="flex items-center gap-3">
            <FolderKanban class="w-4 h-4" />
            <span>Featured Works ({{ projects.length }})</span>
          </div>
        </button>

        <button 
          @click="activeTab = 'workflows'"
          class="w-full px-4 py-2.5 rounded-2xl text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer text-left"
          :class="[
            activeTab === 'workflows'
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <div class="flex items-center gap-3">
            <Workflow class="w-4 h-4" />
            <span>Bagaimana Bekerja ({{ workflows.length }})</span>
          </div>
        </button>

        <button 
          @click="activeTab = 'skills'"
          class="w-full px-4 py-2.5 rounded-2xl text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer text-left"
          :class="[
            activeTab === 'skills'
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <div class="flex items-center gap-3">
            <Sparkles class="w-4 h-4" />
            <span>Skills ({{ skills.length }})</span>
          </div>
        </button>

        <button 
          @click="activeTab = 'testimonials'"
          class="w-full px-4 py-2.5 rounded-2xl text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer text-left"
          :class="[
            activeTab === 'testimonials'
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <div class="flex items-center gap-3">
            <MessageSquareQuote class="w-4 h-4" />
            <span>Testimoni ({{ testimonials.length }})</span>
          </div>
        </button>

        <button 
          @click="activeTab = 'profile'"
          class="w-full px-4 py-2.5 rounded-2xl text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer text-left"
          :class="[
            activeTab === 'profile'
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <UserCog class="w-4 h-4" />
          <span>Profil & Kontak</span>
        </button>

        <button 
          @click="activeTab = 'education'"
          class="w-full px-4 py-2.5 rounded-2xl text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-3 transition-all cursor-pointer text-left"
          :class="[
            activeTab === 'education'
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <GraduationCap class="w-4 h-4" />
          <span>Pendidikan</span>
        </button>

        <button 
          @click="activeTab = 'inbox'"
          class="w-full px-4 py-2.5 rounded-2xl text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer text-left"
          :class="[
            activeTab === 'inbox'
              ? 'bg-[#9E0402] text-white shadow-md shadow-[#9E0402]/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          ]"
        >
          <div class="flex items-center gap-3">
            <Mail class="w-4 h-4" />
            <span>Inbox Pesan</span>
          </div>
          <span 
            v-if="messages.filter(m => !m.read).length > 0"
            class="px-2 py-0.5 rounded-full bg-[#ff4d4d] text-white text-[10px] font-bold font-mono-tag"
          >
            {{ messages.filter(m => !m.read).length }}
          </span>
        </button>

        <!-- System Reset Action -->
        <div class="pt-3 mt-3 border-t border-white/5">
          <button 
            @click="handleReset"
            class="w-full px-4 py-2 rounded-2xl text-[11px] font-mono-tag text-zinc-400 hover:text-[#ff8080] hover:bg-[#9E0402]/10 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>Reset Data ke Awal</span>
          </button>
        </div>
      </aside>

      <!-- ═══════════════════════════════════════════ -->
      <!-- MAIN TAB CONTENT AREA                       -->
      <!-- ═══════════════════════════════════════════ -->
      <main class="lg:col-span-9 space-y-6">
        
        <!-- ---------------------------------------------------- -->
        <!-- TAB 1: OVERVIEW                                      -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <!-- Welcome Card -->
          <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#14161D] to-[#1F1418] border border-white/10 shadow-xl space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <span class="text-xs font-mono-tag text-[#ff8080] uppercase tracking-wider font-bold">Selamat Datang, Admin</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-white">{{ portfolioInfo.name }}</h2>
                <p class="text-xs sm:text-sm text-zinc-400">{{ portfolioInfo.title }}</p>
              </div>

              <!-- Live Status Pill -->
              <div class="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <div class="text-xs">
                  <span class="text-zinc-400 block text-[10px] font-mono-tag uppercase">Status Saat Ini</span>
                  <span class="font-bold text-white">{{ portfolioInfo.status }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Counter Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="p-5 rounded-2xl bg-[#111319] border border-white/10 space-y-1.5">
              <span class="text-[10px] font-mono-tag uppercase text-zinc-400">Total Proyek</span>
              <div class="text-2xl sm:text-3xl font-extrabold text-white">{{ projects.length }}</div>
              <span class="text-[11px] text-[#ff8080] font-mono-tag">Featured & Archive</span>
            </div>

            <div class="p-5 rounded-2xl bg-[#111319] border border-white/10 space-y-1.5">
              <span class="text-[10px] font-mono-tag uppercase text-zinc-400">Core Skills</span>
              <div class="text-2xl sm:text-3xl font-extrabold text-white">{{ skills.length }}</div>
              <span class="text-[11px] text-zinc-400 font-mono-tag">Competencies</span>
            </div>

            <div class="p-5 rounded-2xl bg-[#111319] border border-white/10 space-y-1.5">
              <span class="text-[10px] font-mono-tag uppercase text-zinc-400">Pesan Masuk</span>
              <div class="text-2xl sm:text-3xl font-extrabold text-white">{{ messages.length }}</div>
              <span class="text-[11px] text-emerald-400 font-mono-tag">Inquiries</span>
            </div>

            <div class="p-5 rounded-2xl bg-[#111319] border border-white/10 space-y-1.5">
              <span class="text-[10px] font-mono-tag uppercase text-zinc-400">Pendidikan</span>
              <div class="text-2xl sm:text-3xl font-extrabold text-white">{{ educations.length }}</div>
              <span class="text-[11px] text-zinc-400 font-mono-tag">Akademik</span>
            </div>
          </div>

          <!-- Quick Actions Grid with Supabase Sync -->
          <div class="p-6 rounded-3xl bg-[#111319] border border-white/10 space-y-4">
            <h3 class="text-base font-bold text-white">Aksi Cepat & Database</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button 
                @click="openAddProjectModal"
                class="p-4 rounded-2xl bg-white/5 hover:bg-[#9E0402]/20 border border-white/10 hover:border-[#9E0402]/40 text-left transition-all group cursor-pointer"
              >
                <Plus class="w-5 h-5 text-[#ff4d4d] mb-2 group-hover:scale-110 transition-transform" />
                <h4 class="text-xs font-bold font-mono-tag uppercase text-white">Tambah Proyek</h4>
                <p class="text-[11px] text-zinc-400 mt-0.5">Publikasikan case study</p>
              </button>

              <button 
                @click="activeTab = 'profile'"
                class="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group cursor-pointer"
              >
                <Edit3 class="w-5 h-5 text-[#9FC2EA] mb-2 group-hover:scale-110 transition-transform" />
                <h4 class="text-xs font-bold font-mono-tag uppercase text-white">Edit Profil</h4>
                <p class="text-[11px] text-zinc-400 mt-0.5">Perbarui deskripsi diri</p>
              </button>

              <button 
                @click="activeTab = 'inbox'"
                class="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group cursor-pointer"
              >
                <Mail class="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <h4 class="text-xs font-bold font-mono-tag uppercase text-white">Buka Inbox</h4>
                <p class="text-[11px] text-zinc-400 mt-0.5">Lihat pesan kontak</p>
              </button>

              <button 
                @click="handleSyncSupabase"
                :disabled="isSyncing"
                class="p-4 rounded-2xl bg-[#9E0402]/15 hover:bg-[#9E0402]/25 border border-[#9E0402]/40 text-left transition-all group cursor-pointer"
              >
                <div class="flex items-center justify-between mb-2">
                  <Database class="w-5 h-5 text-[#ff4d4d] group-hover:scale-110 transition-transform" />
                  <RefreshCw class="w-3.5 h-3.5 text-zinc-400" :class="{ 'animate-spin': isSyncing }" />
                </div>
                <h4 class="text-xs font-bold font-mono-tag uppercase text-white">
                  {{ isSyncing ? 'Menyinkronkan...' : 'Sync ke Supabase' }}
                </h4>
                <p class="text-[11px] text-zinc-400 mt-0.5">Upload dummy data live</p>
              </button>
            </div>
          </div>

          <!-- 1-Day Cache Performance Card -->
          <div class="p-5 rounded-3xl bg-[#111319] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Zap class="w-5 h-5" />
              </div>
              <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold font-mono-tag uppercase text-white">Client-Side Cache (TTL 6 Jam)</span>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono-tag font-bold">
                    {{ isLoadedFromCache ? 'Cached Active' : 'Live Fetched' }}
                  </span>
                </div>
                <p class="text-[11px] text-zinc-400">
                  Data Supabase disimpan di cache lokal browser selama 6 jam untuk kecepatan instan & menghemat kuota request API.
                </p>
              </div>
            </div>

            <button 
              @click="handleRefreshCache"
              :disabled="isRefreshingCache"
              class="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tag font-bold text-zinc-300 hover:text-white flex items-center gap-2 transition-all shrink-0 cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw class="w-3.5 h-3.5 text-amber-400" :class="{ 'animate-spin': isRefreshingCache }" />
              <span>{{ isRefreshingCache ? 'Memuat Ulang...' : 'Bypass & Refresh Cache' }}</span>
            </button>
          </div>
        </div>

        <!-- ---------------------------------------------------- -->
        <!-- TAB 2: PROJECTS MANAGEMENT                           -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'projects'" class="space-y-4">
          <div class="flex items-center justify-between pb-2">
            <div>
              <h2 class="text-xl font-bold text-white">Kelola Case Studies & Proyek</h2>
              <p class="text-xs text-zinc-400">Tambah, edit, atau hapus case study portofolio</p>
            </div>
            <button 
              @click="openAddProjectModal"
              class="px-4 py-2 rounded-xl bg-[#9E0402] hover:bg-[#B80604] text-white text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus class="w-4 h-4" />
              <span>Tambah Proyek</span>
            </button>
          </div>

          <!-- Projects List Table/Cards -->
          <div class="space-y-3">
            <div 
              v-for="(proj, idx) in projects" 
              :key="proj.id"
              class="p-4 sm:p-5 rounded-2xl bg-[#111319] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-all"
            >
              <div class="flex items-center gap-4 min-w-0">
                <img 
                  :src="proj.image" 
                  :alt="proj.title"
                  class="w-16 h-12 rounded-xl object-cover shrink-0 bg-black/40 border border-white/10"
                />
                <div class="min-w-0 space-y-0.5">
                  <div class="flex items-center gap-2">
                    <span class="text-[10px] font-mono-tag font-bold text-[#ff8080]">({{ String(idx + 1).padStart(2, '0') }})</span>
                    <span class="text-[10px] font-mono-tag px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 uppercase font-semibold">{{ proj.category }}</span>
                  </div>
                  <h3 class="text-sm font-bold text-white truncate">{{ proj.title }}</h3>
                  <p class="text-xs text-zinc-400 truncate max-w-md">{{ proj.description }}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <RouterLink 
                  :to="'/projects/' + proj.id"
                  target="_blank"
                  class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  title="Lihat Proyek"
                >
                  <Eye class="w-4 h-4" />
                </RouterLink>

                <button 
                  @click="openEditProjectModal(proj)"
                  class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#9FC2EA] hover:text-white transition-colors cursor-pointer"
                  title="Edit Proyek"
                >
                  <Edit3 class="w-4 h-4" />
                </button>

                <button 
                  @click="handleDeleteProject(proj.id, proj.title)"
                  class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Hapus Proyek"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------- -->
        <!-- TAB 2: BAGAIMANA SAYA BEKERJA (WORKFLOWS)            -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'workflows'" class="space-y-6">
          <div class="flex items-center justify-between pb-2">
            <div>
              <h2 class="text-xl font-bold text-white">Bagaimana Saya Bekerja (Workflows)</h2>
              <p class="text-xs text-zinc-400">Kelola 4 langkah metodologi kerja & deliverables di landing page</p>
            </div>
            <button 
              @click="addWorkflowStep"
              class="px-4 py-2 rounded-xl bg-[#9E0402] hover:bg-[#B80604] text-white text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus class="w-4 h-4" />
              <span>Tambah Fase</span>
            </button>
          </div>

          <div class="space-y-4">
            <div 
              v-for="(w, idx) in workflowList" 
              :key="idx"
              class="p-5 sm:p-6 rounded-3xl bg-[#111319] border border-white/10 space-y-4 hover:border-white/20 transition-all"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 rounded-xl bg-[#9E0402]/20 border border-[#9E0402]/40 text-[#ff8080] flex items-center justify-center font-mono-tag font-bold text-xs">
                    {{ String(idx + 1).padStart(2, '0') }}
                  </span>
                  <h3 class="text-sm font-bold text-white">Fase {{ String(idx + 1).padStart(2, '0') }}</h3>
                </div>

                <button 
                  @click="removeWorkflowStep(idx)"
                  class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Hapus Fase Ini"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1.5">
                  <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Nama Fase (Phase Name)</label>
                  <input 
                    v-model="w.phase"
                    type="text"
                    placeholder="Contoh: Product Discovery & User Research"
                    class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
                  />
                </div>

                <div class="space-y-1.5">
                  <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Tagline Fase</label>
                  <input 
                    v-model="w.tagline"
                    type="text"
                    placeholder="Contoh: Uncovering Deep User Insights"
                    class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Deskripsi Metodologi</label>
                <textarea 
                  v-model="w.description"
                  rows="2"
                  placeholder="Jelaskan apa yang dilakukan pada tahap ini..."
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
                ></textarea>
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Key Deliverables (Pisahkan dengan koma)</label>
                <input 
                  v-model="w.deliverablesString"
                  type="text"
                  placeholder="User Research, Wireframes, PRD, Technical Spec"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div class="pt-2">
            <button 
              @click="saveWorkflows"
              class="px-6 py-3 rounded-2xl bg-[#9E0402] hover:bg-[#B80604] text-white font-mono-tag font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#9E0402]/20 cursor-pointer"
            >
              <Save class="w-4 h-4" />
              <span>Simpan Seluruh Alur Kerja</span>
            </button>
          </div>
        </div>

        <!-- ---------------------------------------------------- -->
        <!-- TAB 3: TESTIMONI & REVIEWS                           -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'testimonials'" class="space-y-6">
          <div class="flex items-center justify-between pb-2">
            <div>
              <h2 class="text-xl font-bold text-white">Apa Kata Rekan & Stakeholder</h2>
              <p class="text-xs text-zinc-400">Kelola testimoni dan rekomendasi yang tampil di landing page</p>
            </div>
            <button 
              @click="openAddTestiModal"
              class="px-4 py-2 rounded-xl bg-[#9E0402] hover:bg-[#B80604] text-white text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Plus class="w-4 h-4" />
              <span>Tambah Testimoni</span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="t in testimonials" 
              :key="t.id"
              class="p-5 rounded-3xl bg-[#111319] border border-white/10 space-y-3 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img :src="t.avatar" :alt="t.name" class="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <div>
                      <h4 class="text-sm font-bold text-white">{{ t.name }}</h4>
                      <p class="text-xs text-zinc-400">{{ t.role }} • {{ t.company }}</p>
                    </div>
                  </div>
                  <span class="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono-tag text-zinc-300">
                    {{ t.badge }}
                  </span>
                </div>
                <p class="text-xs text-zinc-300 italic leading-relaxed">
                  "{{ t.content }}"
                </p>
              </div>

              <div class="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                <button 
                  @click="openEditTestiModal(t)"
                  class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#9FC2EA] hover:text-white transition-colors cursor-pointer"
                  title="Edit Testimoni"
                >
                  <Edit3 class="w-4 h-4" />
                </button>
                <button 
                  @click="handleDeleteTestimonial(t.id, t.name)"
                  class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Hapus Testimoni"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------- -->
        <!-- TAB 4: PROFILE & BIO                                 -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <div class="pb-2">
            <h2 class="text-xl font-bold text-white">Profil & Kontak</h2>
            <p class="text-xs text-zinc-400">Informasi data diri dan kontak yang tampil di hero, about, dan footer landing page</p>
          </div>

          <div class="p-6 sm:p-7 rounded-3xl bg-[#111319] border border-white/10 space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Nama Lengkap</label>
                <input 
                  v-model="profileForm.name"
                  type="text"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Profesi / Title</label>
                <input 
                  v-model="profileForm.title"
                  type="text"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Email Kontak</label>
                <input 
                  v-model="profileForm.email"
                  type="email"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">No. Telepon / WhatsApp</label>
                <input 
                  v-model="profileForm.phone"
                  type="text"
                  placeholder="+62 ..."
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Lokasi / Domisili</label>
                <input 
                  v-model="profileForm.location"
                  type="text"
                  placeholder="Depok, Jawa Barat, Indonesia"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Status Ketersediaan</label>
                <input 
                  v-model="profileForm.status"
                  type="text"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Tahun Pengalaman (Track Record)</label>
                <input 
                  v-model="profileForm.experienceYears"
                  type="text"
                  placeholder="Contoh: 1+ Tahun atau 2+ Tahun"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Tagline Hero Section</label>
              <textarea 
                v-model="profileForm.tagline"
                rows="2"
                class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
              ></textarea>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Bio Paragraf (About Section)</label>
              <textarea 
                v-model="profileForm.bio"
                rows="4"
                class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
              ></textarea>
            </div>

            <!-- Social Links -->
            <div class="space-y-3 pt-2 border-t border-white/5" v-if="profileForm.socials">
              <h4 class="text-xs font-mono-tag font-bold uppercase text-[#ff8080]">Tautan Sosial Media & Portfolio</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <label class="block text-[11px] font-mono-tag text-zinc-400">LinkedIn URL</label>
                  <input 
                    v-model="profileForm.socials.linkedin"
                    type="url"
                    class="w-full px-3.5 py-2 rounded-xl bg-[#090A0D] border border-white/10 text-xs text-white outline-none"
                  />
                </div>

                <div class="space-y-1">
                  <label class="block text-[11px] font-mono-tag text-zinc-400">GitHub URL</label>
                  <input 
                    v-model="profileForm.socials.github"
                    type="url"
                    class="w-full px-3.5 py-2 rounded-xl bg-[#090A0D] border border-white/10 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- Save Button -->
            <div class="pt-3">
              <button 
                @click="saveProfile"
                :disabled="isSavingProfile"
                class="px-6 py-3 rounded-2xl bg-[#9E0402] hover:bg-[#B80604] disabled:opacity-50 text-white font-mono-tag font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#9E0402]/20 cursor-pointer"
              >
                <Save v-if="!isSavingProfile" class="w-4 h-4" />
                <RefreshCw v-else class="w-4 h-4 animate-spin" />
                <span>{{ isSavingProfile ? 'Menyimpan ke Supabase...' : 'Simpan Perubahan Profil' }}</span>
              </button>
            </div>

          </div>
        </div>

        <!-- ---------------------------------------------------- -->
        <!-- TAB 4: SKILLS & EXPERTISE                            -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'skills'" class="space-y-5">
          <div class="pb-2">
            <h2 class="text-xl font-bold text-white">Kelola Core Skills & Keahlian</h2>
            <p class="text-xs text-zinc-400">Daftar kompetensi yang tampil pada About section & Project filter</p>
          </div>

          <!-- Add Skill Bar -->
          <div class="p-4 sm:p-5 rounded-2xl bg-[#111319] border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input 
              v-model="newSkillName"
              type="text"
              placeholder="Nama skill baru (misal: Design System, Figma, PRD...)"
              class="flex-1 px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
              @keydown.enter="handleAddSkill"
            />

            <select 
              v-model="newSkillCategory"
              class="px-3 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs font-mono-tag text-zinc-300 outline-none"
            >
              <option value="UI/UX">UI/UX</option>
              <option value="Product">Product</option>
              <option value="UX Research">UX Research</option>
              <option value="Design Tool">Design Tool</option>
            </select>

            <select 
              v-model="newSkillLevel"
              class="px-3 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs font-mono-tag text-zinc-300 outline-none"
            >
              <option value="Expert">Expert</option>
              <option value="Advanced">Advanced</option>
              <option value="Intermediate">Intermediate</option>
            </select>

            <button 
              @click="handleAddSkill"
              class="px-4 py-2.5 rounded-xl bg-[#9E0402] hover:bg-[#B80604] text-white text-xs font-mono-tag font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus class="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </div>

          <!-- Skills Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div 
              v-for="skill in skills" 
              :key="skill.name"
              class="p-3.5 rounded-xl bg-[#111319] border border-white/10 flex items-center justify-between gap-2 hover:border-white/20 transition-all"
            >
              <div class="space-y-0.5 min-w-0">
                <h4 class="text-xs sm:text-sm font-bold text-white truncate">{{ skill.name }}</h4>
                <div class="flex items-center gap-1.5 text-[10px] font-mono-tag text-zinc-400">
                  <span>{{ skill.category }}</span>
                  <span>•</span>
                  <span class="text-[#ff8080] font-semibold">{{ skill.level }}</span>
                </div>
              </div>

              <button 
                @click="handleDeleteSkill(skill.name)"
                class="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Hapus Skill"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------- -->
        <!-- TAB 5: EDUCATION                                     -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'education'" class="space-y-5">
          <div class="flex items-center justify-between pb-2">
            <div>
              <h2 class="text-xl font-bold text-white">Kelola Riwayat Pendidikan</h2>
              <p class="text-xs text-zinc-400">Riwayat pendidikan yang tampil pada halaman About</p>
            </div>
            <button 
              @click="addEducationEntry"
              class="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tag font-bold uppercase text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>Tambah Baris</span>
            </button>
          </div>

          <div class="space-y-3">
            <div 
              v-for="(edu, idx) in educationList" 
              :key="idx"
              class="p-5 rounded-2xl bg-[#111319] border border-white/10 space-y-3"
            >
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono-tag font-bold text-[#ff8080]">Pendidikan #{{ idx + 1 }}</span>
                <button 
                  v-if="educationList.length > 1"
                  @click="removeEducationEntry(idx)"
                  class="text-xs text-red-400 hover:underline cursor-pointer flex items-center gap-1 font-mono-tag"
                >
                  <Trash2 class="w-3 h-3" />
                  <span>Hapus</span>
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="space-y-1 sm:col-span-2">
                  <label class="block text-[11px] font-mono-tag text-zinc-400">Gelar & Jurusan</label>
                  <input 
                    v-model="edu.degree"
                    type="text"
                    class="w-full px-3.5 py-2 rounded-xl bg-[#090A0D] border border-white/10 text-xs text-white outline-none"
                  />
                </div>

                <div class="space-y-1">
                  <label class="block text-[11px] font-mono-tag text-zinc-400">Tahun</label>
                  <input 
                    v-model="edu.year"
                    type="text"
                    class="w-full px-3.5 py-2 rounded-xl bg-[#090A0D] border border-white/10 text-xs text-white outline-none"
                  />
                </div>

                <div class="space-y-1 sm:col-span-3">
                  <label class="block text-[11px] font-mono-tag text-zinc-400">Nama Universitas / Institusi</label>
                  <input 
                    v-model="edu.school"
                    type="text"
                    class="w-full px-3.5 py-2 rounded-xl bg-[#090A0D] border border-white/10 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div class="pt-2">
              <button 
                @click="saveEducations"
                class="px-6 py-3 rounded-2xl bg-[#9E0402] hover:bg-[#B80604] text-white font-mono-tag font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save class="w-4 h-4" />
                <span>Simpan Data Pendidikan</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------- -->
        <!-- TAB 6: INBOX & MESSAGES                              -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'inbox'" class="space-y-5">
          <div class="pb-2">
            <h2 class="text-xl font-bold text-white">Inbox Pesan Masuk</h2>
            <p class="text-xs text-zinc-400">Pesan dan tawaran kolaborasi yang dikirim melalui formulir kontak</p>
          </div>

          <div v-if="messages.length > 0" class="space-y-3">
            <div 
              v-for="msg in messages" 
              :key="msg.id"
              class="p-5 rounded-2xl border transition-all space-y-3"
              :class="[
                msg.read 
                  ? 'bg-[#111319] border-white/10' 
                  : 'bg-[#181A22] border-[#9E0402]/40 shadow-md shadow-[#9E0402]/5'
              ]"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div class="flex items-center gap-2.5">
                  <div 
                    class="w-2.5 h-2.5 rounded-full"
                    :class="msg.read ? 'bg-zinc-600' : 'bg-[#ff4d4d] animate-pulse'"
                  ></div>
                  <h3 class="text-sm font-bold text-white">{{ msg.name }}</h3>
                  <span class="text-xs text-zinc-400 font-mono-tag">({{ msg.email }})</span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-mono-tag text-zinc-500">
                    {{ new Date(msg.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) }}
                  </span>
                  <span class="px-2.5 py-0.5 rounded-md bg-white/5 text-[10px] font-mono-tag text-zinc-300 font-semibold">
                    {{ msg.category || 'General' }}
                  </span>
                </div>
              </div>

              <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-[#0B0C0E] p-3.5 rounded-xl border border-white/5">
                {{ msg.message }}
              </p>

              <div class="flex items-center justify-between pt-1">
                <a 
                  :href="'mailto:' + msg.email + '?subject=Re: Inquiry from Portfolio'"
                  class="text-xs font-mono-tag font-bold text-[#ff8080] hover:underline flex items-center gap-1"
                >
                  <Mail class="w-3 h-3" />
                  <span>Balas Email</span>
                </a>

                <div class="flex items-center gap-2">
                  <button 
                    v-if="!msg.read"
                    @click="markMessageRead(msg.id)"
                    class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono-tag text-zinc-300 cursor-pointer"
                  >
                    Tandai Sudah Dibaca
                  </button>

                  <button 
                    @click="deleteMessage(msg.id)"
                    class="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-16 p-8 rounded-3xl bg-[#111319] border border-white/10 space-y-2">
            <Mail class="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 class="text-sm font-bold text-white">Inbox Kosong</h3>
            <p class="text-xs text-zinc-400">Belum ada pesan baru yang masuk dari formulir kontak.</p>
          </div>
        </div>

      </main>

    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- PROJECT CREATE / EDIT MODAL                 -->
    <!-- ═══════════════════════════════════════════ -->
    <div 
      v-if="isProjectModalOpen"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      @click.self="isProjectModalOpen = false"
    >
      <div class="w-full max-w-2xl bg-[#111319] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl my-8">
        
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 class="text-lg font-bold text-white">
              {{ isEditingProject ? 'Edit Case Study Proyek' : 'Tambah Case Study Baru' }}
            </h3>
            <span class="text-xs text-zinc-400">Lengkapi detail proyek untuk portofolio</span>
          </div>
          <button 
            @click="isProjectModalOpen = false"
            class="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="saveProjectForm" class="space-y-4 max-h-[75vh] overflow-y-auto pr-2 custom-scroll">
          
          <!-- 1. Identitas Proyek & Role -->
          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Judul Proyek *</label>
            <input 
              v-model="projectForm.title"
              type="text"
              required
              placeholder="Contoh: Zenith Analytics — SaaS Dashboard Redesign"
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="space-y-1">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Kategori Proyek</label>
              <input 
                v-model="projectForm.category"
                list="category-suggestions"
                type="text"
                placeholder="Pilih atau ketik kategori..."
                class="w-full px-3.5 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs text-white outline-none"
              />
              <datalist id="category-suggestions">
                <option v-for="cat in currentCategories" :key="cat" :value="cat" />
              </datalist>
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Role / Peran</label>
              <input 
                v-model="projectForm.role"
                type="text"
                :placeholder="selectedAdminProfile === 'raqwan' ? 'Lead AI Engineer & MLOps' : 'Lead PM & UI/UX Designer'"
                class="w-full px-3.5 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs text-white outline-none"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Durasi Pengerjaan</label>
              <input 
                v-model="projectForm.duration"
                type="text"
                placeholder="Contoh: 3 bulan (Sep – Nov 2024)"
                class="w-full px-3.5 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs text-white outline-none"
              />
            </div>
          </div>

          <!-- 2. Deskripsi & Tags -->
          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Deskripsi Singkat (Ringkasan Card)</label>
            <textarea 
              v-model="projectForm.description"
              rows="2"
              placeholder="Ringkasan singkat dampak dan pendekatan proyek untuk kartu..."
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
            ></textarea>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Tags Teknologi / Tools (Pisahkan koma)</label>
            <input 
              v-model="projectForm.tagsString"
              type="text"
              placeholder="PyTorch, TensorRT, FastAPI, Docker, Figma, Design System"
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
            />
          </div>

          <!-- 3. Tautan Eksternal & Gambar Utama -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Live Demo / Product URL</label>
              <input 
                v-model="projectForm.liveUrl"
                type="url"
                placeholder="https://..."
                class="w-full px-3.5 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs text-white outline-none"
              />
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Repository GitHub / Docs</label>
              <input 
                v-model="projectForm.githubUrl"
                type="url"
                placeholder="https://github.com/..."
                class="w-full px-3.5 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs text-white outline-none"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">URL Gambar Mockup Utama</label>
            <input 
              v-model="projectForm.image"
              type="url"
              placeholder="https://images.unsplash.com/..."
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
            />
          </div>

          <!-- 4. Prolog, Masalah & Solusi (Detail Case Study) -->
          <div class="p-4 rounded-2xl bg-[#0B0C0E] border border-white/10 space-y-4">
            <span class="text-xs font-mono-tag font-bold text-[#ff8080] uppercase block">Narasi Case Study (Halaman Detail)</span>
            
            <div class="space-y-1">
              <label class="block text-[11px] font-mono-tag text-zinc-400">Prolog — Latar Belakang & Visi Utama</label>
              <textarea 
                v-model="projectForm.prolog"
                rows="3"
                placeholder="Ceritakan latar belakang kemunculan proyek, visi strategis, dan problem space yang dihadapi..."
                class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="block text-[11px] font-mono-tag text-zinc-400">Tantangan Utama (The Core Challenge)</label>
                <textarea 
                  v-model="projectForm.problem"
                  rows="3"
                  placeholder="Gambaran umum kendala teknis / bisnis utama..."
                  class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
                ></textarea>
              </div>

              <div class="space-y-1">
                <label class="block text-[11px] font-mono-tag text-zinc-400">Solusi & Rekayasa Arsitektur</label>
                <textarea 
                  v-model="projectForm.solution"
                  rows="3"
                  placeholder="Pendekatan arsitektur dan sistem yang dieksekusi..."
                  class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
                ></textarea>
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-[11px] font-mono-tag text-zinc-400">Poin Kendala / Pain Points (1 per baris, contoh: "Judul: Deskripsi")</label>
              <textarea 
                v-model="projectForm.problemPointsString"
                rows="2"
                placeholder="Latensi Tinggi: Pipeline lama membutuhkan 120ms&#10;Akurasi Rendah: Terlalu banyak false positive"
                class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none font-mono"
              ></textarea>
            </div>
          </div>

          <!-- 5. Galeri Gambar Artefak Tambahan -->
          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">
              Galeri Mockup & Artifact Showcase (1 URL Gambar per baris)
            </label>
            <textarea 
              v-model="projectForm.galleryString"
              rows="2"
              placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs font-mono text-white outline-none"
            ></textarea>
          </div>

          <!-- 6. Impact Metrics -->
          <div class="p-4 rounded-2xl bg-[#0B0C0E] border border-white/10 space-y-3">
            <span class="text-xs font-mono-tag font-bold text-[#ff8080] uppercase block">Dampak & Metrik Terukur</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="space-y-1">
                <label class="block text-[11px] font-mono-tag text-zinc-400">Nama Metrik</label>
                <input 
                  v-model="projectForm.resultMetric"
                  type="text"
                  placeholder="Contoh: Inference Latency"
                  class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
                />
              </div>

              <div class="space-y-1">
                <label class="block text-[11px] font-mono-tag text-zinc-400">Sebelum</label>
                <input 
                  v-model="projectForm.resultBefore"
                  type="text"
                  placeholder="Contoh: 45 ms"
                  class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
                />
              </div>

              <div class="space-y-1">
                <label class="block text-[11px] font-mono-tag text-zinc-400">Sesudah</label>
                <input 
                  v-model="projectForm.resultAfter"
                  type="text"
                  placeholder="Contoh: 3.8 ms"
                  class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>

          <!-- 7. Opsi Tampilan -->
          <div class="flex items-center gap-3 pt-1">
            <label class="flex items-center gap-2 cursor-pointer text-xs font-mono-tag text-zinc-300">
              <input 
                type="checkbox" 
                v-model="projectForm.featured" 
                class="w-4 h-4 rounded accent-[#9E0402]"
              />
              <span>Tampilkan sebagai Proyek Unggulan (Featured Project) di Beranda</span>
            </label>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button 
              type="button"
              @click="isProjectModalOpen = false"
              class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono-tag uppercase text-zinc-300 cursor-pointer"
            >
              Batal
            </button>

            <button 
              type="submit"
              class="px-6 py-2.5 rounded-xl bg-[#9E0402] hover:bg-[#B80604] text-white text-xs font-mono-tag font-bold uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Save class="w-4 h-4" />
              <span>Simpan Proyek</span>
            </button>
          </div>

        </form>

      </div>
    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- TESTIMONIAL CREATE / EDIT MODAL              -->
    <!-- ═══════════════════════════════════════════ -->
    <div 
      v-if="isTestiModalOpen"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div class="w-full max-w-xl bg-[#111319] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
        
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-[#9E0402]/20 border border-[#9E0402]/40 text-[#ff8080] flex items-center justify-center font-bold">
              <MessageSquareQuote class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-base font-bold text-white">
                {{ isEditingTesti ? 'Edit Testimoni Stakeholder' : 'Tambah Testimoni Baru' }}
              </h3>
              <span class="text-xs text-zinc-400 font-mono-tag">Portofolio: {{ selectedAdminProfile === 'nadya' ? 'Nadya Najelina' : 'Muhammad Raqwan Kauthar' }}</span>
            </div>
          </div>
          <button 
            @click="isTestiModalOpen = false"
            class="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="saveTestiForm" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Nama Pemberi Testimoni</label>
              <input 
                v-model="testiForm.name"
                type="text"
                required
                placeholder="Contoh: Sarah Anderson"
                class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Role / Jabatan</label>
              <input 
                v-model="testiForm.role"
                type="text"
                required
                placeholder="Contoh: VP of Engineering"
                class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Perusahaan / Institusi</label>
              <input 
                v-model="testiForm.company"
                type="text"
                placeholder="Contoh: Fintech Global"
                class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
              />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Badge Label</label>
              <input 
                v-model="testiForm.badge"
                type="text"
                placeholder="Contoh: Stakeholder Feedback"
                class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">URL Foto Avatar</label>
            <input 
              v-model="testiForm.avatar"
              type="url"
              placeholder="https://images.unsplash.com/..."
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Isi Testimoni / Rekomendasi</label>
            <textarea 
              v-model="testiForm.content"
              rows="4"
              required
              placeholder="Tuliskan testimoni atau feedback stakeholder..."
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
            ></textarea>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
            <button 
              type="button"
              @click="isTestiModalOpen = false"
              class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono-tag uppercase text-zinc-300 cursor-pointer"
            >
              Batal
            </button>

            <button 
              type="submit"
              class="px-6 py-2.5 rounded-xl bg-[#9E0402] hover:bg-[#B80604] text-white text-xs font-mono-tag font-bold uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Save class="w-4 h-4" />
              <span>Simpan Testimoni</span>
            </button>
          </div>
        </form>

      </div>
    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- TOAST NOTIFICATION                          -->
    <!-- ═══════════════════════════════════════════ -->
    <transition name="fade">
      <div 
        v-if="toast.show" 
        class="fixed bottom-6 right-6 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border"
        :class="[
          toast.type === 'error'
            ? 'bg-red-950/90 border-red-500/40 text-red-200'
            : 'bg-[#111319]/95 border-emerald-500/40 text-emerald-300'
        ]"
      >
        <CheckCircle2 v-if="toast.type !== 'error'" class="w-4 h-4 text-emerald-400 shrink-0" />
        <AlertCircle v-else class="w-4 h-4 text-red-400 shrink-0" />
        <span class="text-xs font-mono-tag font-bold">{{ toast.message }}</span>
      </div>
    </transition>

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
  transform: translateY(8px);
}
</style>
