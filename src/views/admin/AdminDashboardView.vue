<script setup>
import { ref, computed } from 'vue'
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
  Clock
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
  messages,
  isSupabaseLoaded,
  isLoadingSupabase,
  isLoadedFromCache,
  cacheExpiryTime,
  refreshCacheFromBackend,
  pushDataToSupabase,
  updateInfo,
  addProject,
  updateProject,
  deleteProject,
  addSkill,
  deleteSkill,
  updateEducations,
  markMessageRead,
  deleteMessage,
  resetToDefault
} = usePortfolioStore()

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
// PROFILE EDITING STATE
// -------------------------------------------------------------
const profileForm = ref({ ...portfolioInfo.value })
const saveProfile = () => {
  updateInfo(profileForm.value)
  showToast('Profil dan data diri berhasil diperbarui!')
}

// -------------------------------------------------------------
// PROJECT MODAL & FORM STATE
// -------------------------------------------------------------
const isProjectModalOpen = ref(false)
const isEditingProject = ref(false)
const editingProjectId = ref(null)

const projectForm = ref({
  title: '',
  category: 'Product Design',
  description: '',
  tagsString: '',
  image: '',
  liveUrl: '',
  githubUrl: '',
  featured: true,
  duration: '3 bulan',
  problem: '',
  solution: '',
  resultMetric: '',
  resultBefore: '',
  resultAfter: ''
})

const openAddProjectModal = () => {
  isEditingProject.value = false
  editingProjectId.value = null
  projectForm.value = {
    title: '',
    category: 'Product Design',
    description: '',
    tagsString: 'Figma, UI/UX, Product Strategy',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: '',
    githubUrl: '',
    featured: true,
    duration: '3 bulan',
    problem: 'Tantangan utama yang dihadapi pengguna.',
    solution: 'Pendekatan desain dan strategi produk yang diterapkan.',
    resultMetric: 'Task Completion Rate',
    resultBefore: '55%',
    resultAfter: '85%'
  }
  isProjectModalOpen.value = true
}

const openEditProjectModal = (proj) => {
  isEditingProject.value = true
  editingProjectId.value = proj.id
  projectForm.value = {
    title: proj.title || '',
    category: proj.category || 'Product Design',
    description: proj.description || '',
    tagsString: (proj.tags || []).join(', '),
    image: proj.image || '',
    liveUrl: proj.liveUrl || '',
    githubUrl: proj.githubUrl || '',
    featured: proj.featured ?? true,
    duration: proj.detail?.duration || '3 bulan',
    problem: proj.detail?.problem || '',
    solution: proj.detail?.solution || '',
    resultMetric: proj.detail?.results?.[0]?.metric || '',
    resultBefore: proj.detail?.results?.[0]?.before || '',
    resultAfter: proj.detail?.results?.[0]?.after || ''
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

  const payload = {
    title: projectForm.value.title,
    category: projectForm.value.category,
    description: projectForm.value.description,
    tags,
    image: projectForm.value.image,
    liveUrl: projectForm.value.liveUrl,
    githubUrl: projectForm.value.githubUrl,
    featured: projectForm.value.featured,
    detail: {
      client: 'Internal Project',
      duration: projectForm.value.duration,
      role: 'Lead PM & UI/UX Designer',
      team: 'Cross-functional Team',
      problem: projectForm.value.problem,
      solution: projectForm.value.solution,
      results: projectForm.value.resultMetric ? [
        {
          metric: projectForm.value.resultMetric,
          before: projectForm.value.resultBefore,
          after: projectForm.value.resultAfter,
          note: 'Berdasarkan data analytics post-launch'
        }
      ] : []
    }
  }

  if (isEditingProject.value && editingProjectId.value) {
    updateProject(editingProjectId.value, payload)
    showToast('Proyek berhasil diperbarui!')
  } else {
    addProject(payload)
    showToast('Proyek baru berhasil ditambahkan!')
  }

  isProjectModalOpen.value = false
}

const handleDeleteProject = (id, title) => {
  if (confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
    deleteProject(id)
    showToast('Proyek berhasil dihapus!')
  }
}

// -------------------------------------------------------------
// SKILLS FORM STATE
// -------------------------------------------------------------
const newSkillName = ref('')
const newSkillCategory = ref('UI/UX')
const newSkillLevel = ref('Expert')

const handleAddSkill = () => {
  if (!newSkillName.value.trim()) return
  addSkill({
    name: newSkillName.value.trim(),
    category: newSkillCategory.value,
    level: newSkillLevel.value,
    color: 'indigo'
  })
  newSkillName.value = ''
  showToast('Skill berhasil ditambahkan!')
}

const handleDeleteSkill = (name) => {
  deleteSkill(name)
  showToast('Skill dihapus!')
}

// -------------------------------------------------------------
// EDUCATION STATE
// -------------------------------------------------------------
const educationList = ref(JSON.parse(JSON.stringify(educations.value)))
const saveEducations = () => {
  updateEducations(educationList.value)
  showToast('Data pendidikan berhasil disimpan!')
}

const addEducationEntry = () => {
  educationList.value.push({
    degree: 'Gelar / Jurusan Baru',
    school: 'Nama Universitas',
    year: '2024 - 2026'
  })
}

const removeEducationEntry = (idx) => {
  educationList.value.splice(idx, 1)
}

// -------------------------------------------------------------
// RESET TO DEFAULT
// -------------------------------------------------------------
const handleReset = () => {
  if (confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data kembali ke bawaan awal?')) {
    resetToDefault()
    profileForm.value = { ...portfolioInfo.value }
    educationList.value = JSON.parse(JSON.stringify(educations.value))
    showToast('Seluruh data berhasil direset ke nilai awal!')
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#07080A] text-white flex flex-col font-sans">
    
    <!-- Top Navbar -->
    <header class="sticky top-0 z-40 bg-[#0B0C10]/80 border-b border-white/10 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[#9E0402] text-white font-extrabold flex items-center justify-center text-xs shadow-md">
          CMS
        </div>
        <div>
          <h1 class="text-sm sm:text-base font-bold text-white leading-tight">Admin Dashboard</h1>
          <span class="text-[10px] font-mono-tag text-zinc-400">Nadya Portfolio CMS • v2.0</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Supabase Live Connection Indicator -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono-tag">
          <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span class="text-zinc-300 font-semibold">Supabase Live</span>
        </div>

        <RouterLink 
          to="/" 
          target="_blank"
          class="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-tag text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <span>Live Site</span>
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
            <span>Projects ({{ projects.length }})</span>
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
          <span>Profil & Bio</span>
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
                  <span class="text-xs font-bold font-mono-tag uppercase text-white">Client-Side Cache (TTL 24 Jam)</span>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono-tag font-bold">
                    {{ isLoadedFromCache ? 'Cached Active' : 'Live Fetched' }}
                  </span>
                </div>
                <p class="text-[11px] text-zinc-400">
                  Data Supabase disimpan di cache lokal browser selama 24 jam untuk kecepatan instan & menghemat kuota request API.
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
        <!-- TAB 3: PROFILE & BIO                                 -->
        <!-- ---------------------------------------------------- -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <div class="pb-2">
            <h2 class="text-xl font-bold text-white">Profil & Data Diri</h2>
            <p class="text-xs text-zinc-400">Informasi utama yang tampil di seluruh section landing page</p>
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

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Email Kontak</label>
                <input 
                  v-model="profileForm.email"
                  type="email"
                  class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 focus:border-[#9E0402] text-xs sm:text-sm text-white outline-none"
                />
              </div>

              <div class="space-y-1.5">
                <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Status Ketersediaan</label>
                <input 
                  v-model="profileForm.status"
                  type="text"
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
            <div class="space-y-3 pt-2 border-t border-white/5">
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
                class="px-6 py-3 rounded-2xl bg-[#9E0402] hover:bg-[#B80604] text-white font-mono-tag font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#9E0402]/20 cursor-pointer"
              >
                <Save class="w-4 h-4" />
                <span>Simpan Perubahan Profil</span>
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

        <form @submit.prevent="saveProjectForm" class="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scroll">
          
          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Judul Proyek</label>
            <input 
              v-model="projectForm.title"
              type="text"
              required
              placeholder="Contoh: Zenith Analytics — SaaS Dashboard Redesign"
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Kategori</label>
              <select 
                v-model="projectForm.category"
                class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
              >
                <option value="Product Design">Product Design</option>
                <option value="UX Design">UX Design</option>
                <option value="Product Management">Product Management</option>
                <option value="Design System">Design System</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Durasi Pengerjaan</label>
              <input 
                v-model="projectForm.duration"
                type="text"
                placeholder="Contoh: 3 bulan (Sep – Nov 2024)"
                class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
              />
            </div>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Deskripsi Singkat</label>
            <textarea 
              v-model="projectForm.description"
              rows="2"
              placeholder="Ringkasan dampak dan pendekatan proyek..."
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
            ></textarea>
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">Tags (Pisahkan dengan koma)</label>
            <input 
              v-model="projectForm.tagsString"
              type="text"
              placeholder="Product Strategy, Figma, User Research, Design System"
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
            />
          </div>

          <div class="space-y-1">
            <label class="block text-xs font-mono-tag font-bold uppercase text-zinc-300">URL Gambar Mockup</label>
            <input 
              v-model="projectForm.image"
              type="url"
              placeholder="https://images.unsplash.com/..."
              class="w-full px-4 py-2.5 rounded-xl bg-[#090A0D] border border-white/10 text-xs sm:text-sm text-white outline-none"
            />
          </div>

          <!-- Impact Metrics -->
          <div class="p-4 rounded-2xl bg-[#0B0C0E] border border-white/10 space-y-3">
            <span class="text-xs font-mono-tag font-bold text-[#ff8080] uppercase block">Dampak & Metrik Terukur</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="space-y-1">
                <label class="block text-[11px] font-mono-tag text-zinc-400">Nama Metrik</label>
                <input 
                  v-model="projectForm.resultMetric"
                  type="text"
                  placeholder="Task Completion Rate"
                  class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
                />
              </div>

              <div class="space-y-1">
                <label class="block text-[11px] font-mono-tag text-zinc-400">Sebelum</label>
                <input 
                  v-model="projectForm.resultBefore"
                  type="text"
                  placeholder="55%"
                  class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
                />
              </div>

              <div class="space-y-1">
                <label class="block text-[11px] font-mono-tag text-zinc-400">Sesudah</label>
                <input 
                  v-model="projectForm.resultAfter"
                  type="text"
                  placeholder="85%"
                  class="w-full px-3 py-2 rounded-xl bg-[#111319] border border-white/10 text-xs text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3">
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
