import { ref, computed } from 'vue'
import { 
  supabase, 
  isSupabaseConfigured,
  fetchProjectsFromSupabase,
  fetchProfileFromSupabase,
  saveProjectToSupabase,
  deleteProjectFromSupabase,
  updateProfileInSupabase,
  fetchMessagesFromSupabase,
  deleteMessageFromSupabase
} from '@/lib/supabase'

// 6 Hours Cache TTL (in milliseconds)
export const CACHE_TTL_MS = 6 * 60 * 60 * 1000
const CACHE_STORAGE_KEY = 'portfolio_cloud_cache_v8'
const MESSAGES_STORAGE_KEY = 'portfolio_messages_cache'

// Active profile global state ('nadya' | 'raqwan')
const activeProfileKey = ref('nadya')

const createEmptyProfile = (profileId = 'nadya') => ({
  name: '',
  shortName: '',
  title: '',
  tagline: '',
  bio: '',
  status: '',
  location: '',
  phone: profileId === 'raqwan' ? '+62 812-9828-7897' : '+62 821-1146-4583',
  email: '',
  socials: {}
})

// Reactive states for NADYA (Populated dynamically from Supabase Cloud)
const nadyaInfoState = ref(createEmptyProfile('nadya'))
const nadyaSkillsState = ref([])
const nadyaProjectsState = ref([])
const nadyaTestimonialsState = ref([])
const nadyaEducationsState = ref([])
const nadyaWorkflowsState = ref([])
const nadyaExperiencesState = ref([])
const nadyaMilestonesState = ref([])
const nadyaCertificationsState = ref([])
const nadyaFaqsState = ref([])
const nadyaMessagesState = ref([])

// Reactive states for RAQWAN (Populated dynamically from Supabase Cloud)
const raqwanInfoState = ref(createEmptyProfile('raqwan'))
const raqwanSkillsState = ref([])
const raqwanProjectsState = ref([])
const raqwanTestimonialsState = ref([])
const raqwanEducationsState = ref([])
const raqwanWorkflowsState = ref([])
const raqwanExperiencesState = ref([])
const raqwanMilestonesState = ref([])
const raqwanCertificationsState = ref([])
const raqwanFaqsState = ref([])
const raqwanMessagesState = ref([])

// Status Indicators
const isSupabaseLoaded = ref(false)
const isLoadingSupabase = ref(false)
const isLoadedFromCache = ref(false)
const cacheExpiryTime = ref(null)

// -------------------------------------------------------------
// CACHE & LOCAL PERSISTENCE HELPERS
// -------------------------------------------------------------
const formatExpiryTime = (timestamp) => {
  const d = new Date(timestamp + CACHE_TTL_MS)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

const persistToLocalStorage = () => {
  try {
    const payload = {
      timestamp: Date.now(),
      nadya: {
        info: nadyaInfoState.value,
        skills: nadyaSkillsState.value,
        projects: nadyaProjectsState.value,
        testimonials: nadyaTestimonialsState.value,
        educations: nadyaEducationsState.value,
        workflows: nadyaWorkflowsState.value,
        experiences: nadyaExperiencesState.value,
        milestones: nadyaMilestonesState.value,
        certifications: nadyaCertificationsState.value,
        faqs: nadyaFaqsState.value
      },
      raqwan: {
        info: raqwanInfoState.value,
        skills: raqwanSkillsState.value,
        projects: raqwanProjectsState.value,
        testimonials: raqwanTestimonialsState.value,
        educations: raqwanEducationsState.value,
        workflows: raqwanWorkflowsState.value,
        experiences: raqwanExperiencesState.value,
        milestones: raqwanMilestonesState.value,
        certifications: raqwanCertificationsState.value,
        faqs: raqwanFaqsState.value
      }
    }
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(payload))
    cacheExpiryTime.value = formatExpiryTime(payload.timestamp)
  } catch (e) {
    console.warn('[Cache] Gagal menyimpan cache:', e)
  }
}

const initFromCache = () => {
  try {
    // Purge old legacy keys to prevent stale project crossover
    if (typeof localStorage !== 'undefined') {
      ['portfolio_nadya_data', 'portfolio_raqwan_data', 'portfolio_cloud_cache', 'portfolio_cloud_cache_v2', 'portfolio_cloud_cache_v3', 'portfolio_cloud_cache_v4', 'portfolio_cloud_cache_v5', 'portfolio_cloud_cache_v6'].forEach(k => {
        try { localStorage.removeItem(k) } catch (e) {}
      })
    }

    const raw = localStorage.getItem(CACHE_STORAGE_KEY)
    if (!raw) return false

    const parsed = JSON.parse(raw)
    const age = Date.now() - (parsed.timestamp || 0)

    if (age < CACHE_TTL_MS) {
      // Valid cache within 6 hours
      if (parsed.nadya) {
        if (parsed.nadya.info) nadyaInfoState.value = parsed.nadya.info
        if (parsed.nadya.skills?.length) nadyaSkillsState.value = parsed.nadya.skills
        if (parsed.nadya.projects?.length) nadyaProjectsState.value = parsed.nadya.projects
        if (parsed.nadya.testimonials?.length) nadyaTestimonialsState.value = parsed.nadya.testimonials
        if (parsed.nadya.educations?.length) nadyaEducationsState.value = parsed.nadya.educations
        if (parsed.nadya.workflows?.length) nadyaWorkflowsState.value = parsed.nadya.workflows
        if (parsed.nadya.experiences?.length) nadyaExperiencesState.value = parsed.nadya.experiences
        if (parsed.nadya.milestones?.length) nadyaMilestonesState.value = parsed.nadya.milestones
        if (parsed.nadya.certifications?.length) nadyaCertificationsState.value = parsed.nadya.certifications
        if (parsed.nadya.faqs?.length) nadyaFaqsState.value = parsed.nadya.faqs
      }

      if (parsed.raqwan) {
        if (parsed.raqwan.info) raqwanInfoState.value = parsed.raqwan.info
        if (parsed.raqwan.skills?.length) raqwanSkillsState.value = parsed.raqwan.skills
        if (parsed.raqwan.projects?.length) raqwanProjectsState.value = parsed.raqwan.projects
        if (parsed.raqwan.testimonials?.length) raqwanTestimonialsState.value = parsed.raqwan.testimonials
        if (parsed.raqwan.educations?.length) raqwanEducationsState.value = parsed.raqwan.educations
        if (parsed.raqwan.workflows?.length) raqwanWorkflowsState.value = parsed.raqwan.workflows
        if (parsed.raqwan.experiences?.length) raqwanExperiencesState.value = parsed.raqwan.experiences
        if (parsed.raqwan.milestones?.length) raqwanMilestonesState.value = parsed.raqwan.milestones
        if (parsed.raqwan.certifications?.length) raqwanCertificationsState.value = parsed.raqwan.certifications
        if (parsed.raqwan.faqs?.length) raqwanFaqsState.value = parsed.raqwan.faqs
      }

      isLoadedFromCache.value = true
      isSupabaseLoaded.value = true
      cacheExpiryTime.value = formatExpiryTime(parsed.timestamp)
      console.log(`[Cache] Data berhasil dimuat dari cache 6 jam (berlaku s.d ${cacheExpiryTime.value})`)
      return true
    } else {
      console.log('[Cache] Cache 6 jam telah kedaluwarsa, memperbarui dari Supabase Cloud...')
      return false
    }
  } catch (e) {
    console.warn('[Cache] Gagal membaca cache:', e)
    return false
  }
}

// Initial cache check
const hasValidCache = initFromCache()

// -------------------------------------------------------------
// CACHED SUPABASE LOADER (100% DINAMIS, ZERO HARDCODE)
// -------------------------------------------------------------
const loadFromSupabase = async (forceRefresh = false) => {
  if (!isSupabaseConfigured() || !supabase) return

  // If cache is valid and not force refreshing, we don't need to block UI
  if (hasValidCache && !forceRefresh && isSupabaseLoaded.value) {
    return
  }

  isLoadingSupabase.value = true
  try {
    const [nadyaProfRes, raqwanProfRes, nadyaProjsRes, raqwanProjsRes] = await Promise.all([
      fetchProfileFromSupabase('nadya'),
      fetchProfileFromSupabase('raqwan'),
      fetchProjectsFromSupabase('nadya'),
      fetchProjectsFromSupabase('raqwan')
    ])

    // 1. Nadya Profile & Child Data
    if (nadyaProfRes.data) {
      const d = nadyaProfRes.data
      nadyaInfoState.value = {
        name: d.name,
        shortName: d.shortName,
        title: d.title,
        tagline: d.tagline,
        bio: d.bio,
        status: d.status,
        location: d.location,
        email: d.email,
        socials: d.socials
      }
      if (d.skills?.length) nadyaSkillsState.value = d.skills
      if (d.testimonials?.length) nadyaTestimonialsState.value = d.testimonials
      if (d.educations?.length) nadyaEducationsState.value = d.educations
      if (d.workflows?.length) nadyaWorkflowsState.value = d.workflows
      if (d.experiences?.length) nadyaExperiencesState.value = d.experiences
      if (d.milestones?.length) nadyaMilestonesState.value = d.milestones
      if (d.certifications?.length) nadyaCertificationsState.value = d.certifications
      if (d.faqs?.length) nadyaFaqsState.value = d.faqs
    }

    // 2. Raqwan Profile & Child Data
    if (raqwanProfRes.data) {
      const d = raqwanProfRes.data
      raqwanInfoState.value = {
        name: d.name,
        shortName: d.shortName,
        title: d.title,
        tagline: d.tagline,
        bio: d.bio,
        status: d.status,
        location: d.location,
        email: d.email,
        socials: d.socials
      }
      if (d.skills?.length) raqwanSkillsState.value = d.skills
      if (d.testimonials?.length) raqwanTestimonialsState.value = d.testimonials
      if (d.educations?.length) raqwanEducationsState.value = d.educations
      if (d.workflows?.length) raqwanWorkflowsState.value = d.workflows
      if (d.experiences?.length) raqwanExperiencesState.value = d.experiences
      if (d.milestones?.length) raqwanMilestonesState.value = d.milestones
      if (d.certifications?.length) raqwanCertificationsState.value = d.certifications
      if (d.faqs?.length) raqwanFaqsState.value = d.faqs
    }

    // 3. Projects per Profile
    if (nadyaProjsRes.data?.length) {
      nadyaProjectsState.value = nadyaProjsRes.data
    }
    if (raqwanProjsRes.data?.length) {
      raqwanProjectsState.value = raqwanProjsRes.data
    }

    // Persist to 6-hour cache
    persistToLocalStorage()

    isSupabaseLoaded.value = true
    isLoadedFromCache.value = false
    console.log('[Supabase Cloud] 100% Data berhasil dimuat dan dicache selama 6 jam!')
  } catch (err) {
    console.warn('[Supabase Store] Error loading Supabase data:', err)
  } finally {
    isLoadingSupabase.value = false
  }
}

// Initial fetch from Supabase if cache is missing or expired
loadFromSupabase(false)

// Helper to push profile updates to Supabase
const syncProfileToCloud = async (targetProfile) => {
  const isNadya = targetProfile === 'nadya'
  const info = isNadya ? nadyaInfoState.value : raqwanInfoState.value
  const skills = isNadya ? nadyaSkillsState.value : raqwanSkillsState.value
  const testimonials = isNadya ? nadyaTestimonialsState.value : raqwanTestimonialsState.value
  const educations = isNadya ? nadyaEducationsState.value : raqwanEducationsState.value
  const workflows = isNadya ? nadyaWorkflowsState.value : raqwanWorkflowsState.value
  const experiences = isNadya ? nadyaExperiencesState.value : raqwanExperiencesState.value
  const milestones = isNadya ? nadyaMilestonesState.value : raqwanMilestonesState.value
  const certifications = isNadya ? nadyaCertificationsState.value : raqwanCertificationsState.value
  const faqs = isNadya ? nadyaFaqsState.value : raqwanFaqsState.value

  const payload = {
    ...info,
    socials: {
      ...(info.socials || {}),
      skills,
      testimonials,
      educations,
      workflows,
      experiences,
      milestones,
      certifications,
      faqs
    }
  }

  persistToLocalStorage()
  return await updateProfileInSupabase(targetProfile, payload)
}

// -------------------------------------------------------------
// MAIN COMPOSABLE
// -------------------------------------------------------------
export function usePortfolioStore(profileExplicit = null) {
  const currentProfile = computed(() => {
    if (profileExplicit) return profileExplicit
    return activeProfileKey.value || 'nadya'
  })

  // Dynamic getters according to active profile
  const portfolioInfo = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaInfoState.value : raqwanInfoState.value
  })

  const skills = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaSkillsState.value : raqwanSkillsState.value
  })

  const projects = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaProjectsState.value : raqwanProjectsState.value
  })

  const testimonials = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaTestimonialsState.value : raqwanTestimonialsState.value
  })

  const educations = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaEducationsState.value : raqwanEducationsState.value
  })

  const experiences = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaExperiencesState.value : raqwanExperiencesState.value
  })

  const milestones = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaMilestonesState.value : raqwanMilestonesState.value
  })

  const workflows = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaWorkflowsState.value : raqwanWorkflowsState.value
  })

  const certifications = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaCertificationsState.value : raqwanCertificationsState.value
  })

  const faqs = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaFaqsState.value : raqwanFaqsState.value
  })

  const messages = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaMessagesState.value : raqwanMessagesState.value
  })

  // Profile setter
  const setActiveProfile = (profile) => {
    if (profile === 'nadya' || profile === 'raqwan') {
      activeProfileKey.value = profile
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-profile', profile)
      }
    }
  }

  // Profile Updates -> Local State + 6H Cache + Supabase Cloud
  const updateInfo = async (newInfo, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaInfoState.value = { ...nadyaInfoState.value, ...newInfo }
    } else {
      raqwanInfoState.value = { ...raqwanInfoState.value, ...newInfo }
    }
    return await syncProfileToCloud(targetProfile)
  }

  // Projects CRUD -> Local State + 6H Cache + Supabase Cloud
  const addProject = async (project, targetProfile = currentProfile.value) => {
    const newProj = {
      ...project,
      id: project.id || 'proj-' + Date.now(),
      featured: project.featured ?? true,
      detail: {
        ...(project.detail || {}),
        profile_id: targetProfile
      }
    }
    if (targetProfile === 'nadya') {
      nadyaProjectsState.value.unshift(newProj)
    } else {
      raqwanProjectsState.value.unshift(newProj)
    }
    persistToLocalStorage()
    await saveProjectToSupabase(newProj, targetProfile)
    return newProj
  }

  const updateProject = async (id, updatedData, targetProfile = currentProfile.value) => {
    const list = targetProfile === 'nadya' ? nadyaProjectsState : raqwanProjectsState
    const index = list.value.findIndex(p => p.id === id)
    if (index !== -1) {
      list.value[index] = { 
        ...list.value[index], 
        ...updatedData,
        detail: {
          ...(list.value[index].detail || {}),
          ...(updatedData.detail || {}),
          profile_id: targetProfile
        }
      }
      persistToLocalStorage()
      await saveProjectToSupabase(list.value[index], targetProfile)
    }
  }

  const deleteProject = async (id, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaProjectsState.value = nadyaProjectsState.value.filter(p => p.id !== id)
    } else {
      raqwanProjectsState.value = raqwanProjectsState.value.filter(p => p.id !== id)
    }
    persistToLocalStorage()
    await deleteProjectFromSupabase(id)
  }

  // Skills CRUD -> Local State + 6H Cache + Supabase Cloud
  const addSkill = async (skill, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaSkillsState.value.push(skill)
    } else {
      raqwanSkillsState.value.push(skill)
    }
    await syncProfileToCloud(targetProfile)
  }

  const deleteSkill = async (name, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaSkillsState.value = nadyaSkillsState.value.filter(s => s.name !== name)
    } else {
      raqwanSkillsState.value = raqwanSkillsState.value.filter(s => s.name !== name)
    }
    await syncProfileToCloud(targetProfile)
  }

  // Educations CRUD -> Local State + 6H Cache + Supabase Cloud
  const updateEducations = async (newEducations, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaEducationsState.value = newEducations
    } else {
      raqwanEducationsState.value = newEducations
    }
    await syncProfileToCloud(targetProfile)
  }

  // Workflows CRUD -> Local State + 6H Cache + Supabase Cloud
  const updateWorkflows = async (newWorkflows, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaWorkflowsState.value = newWorkflows
    } else {
      raqwanWorkflowsState.value = newWorkflows
    }
    await syncProfileToCloud(targetProfile)
  }

  // Testimonials CRUD -> Local State + 6H Cache + Supabase Cloud
  const updateTestimonials = async (newTestimonials, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaTestimonialsState.value = newTestimonials
    } else {
      raqwanTestimonialsState.value = newTestimonials
    }
    await syncProfileToCloud(targetProfile)
  }

  const addTestimonial = async (testi, targetProfile = currentProfile.value) => {
    const newTesti = {
      id: Date.now(),
      ...testi
    }
    if (targetProfile === 'nadya') {
      nadyaTestimonialsState.value.push(newTesti)
    } else {
      raqwanTestimonialsState.value.push(newTesti)
    }
    await syncProfileToCloud(targetProfile)
    return newTesti
  }

  const deleteTestimonial = async (id, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaTestimonialsState.value = nadyaTestimonialsState.value.filter(t => t.id !== id)
    } else {
      raqwanTestimonialsState.value = raqwanTestimonialsState.value.filter(t => t.id !== id)
    }
    await syncProfileToCloud(targetProfile)
  }

  // Messages CRUD
  const addMessage = (msgData, targetProfile = currentProfile.value) => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      date: new Date().toISOString(),
      read: false,
      ...msgData
    }
    if (targetProfile === 'nadya') {
      nadyaMessagesState.value.unshift(newMsg)
    } else {
      raqwanMessagesState.value.unshift(newMsg)
    }
    return newMsg
  }

  const markMessageRead = (id, targetProfile = currentProfile.value) => {
    const list = targetProfile === 'nadya' ? nadyaMessagesState.value : raqwanMessagesState.value
    const msg = list.find(m => m.id === id)
    if (msg) msg.read = true
  }

  const deleteMessage = (id, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaMessagesState.value = nadyaMessagesState.value.filter(m => m.id !== id)
    } else {
      raqwanMessagesState.value = raqwanMessagesState.value.filter(m => m.id !== id)
    }
  }

  // Force Refresh Cache: bypasses cache and hits Supabase Cloud
  const refreshCacheFromBackend = async () => {
    localStorage.removeItem(CACHE_STORAGE_KEY)
    await loadFromSupabase(true)
  }

  // Push Data to Supabase (Sync Current State)
  const pushDataToSupabase = async () => {
    const res1 = await syncProfileToCloud('nadya')
    const res2 = await syncProfileToCloud('raqwan')
    return { success: res1.success && res2.success }
  }

  // Reset to default / reload from cloud
  const resetToDefault = async () => {
    localStorage.removeItem(CACHE_STORAGE_KEY)
    await loadFromSupabase(true)
  }

  return {
    activeProfileKey,
    currentProfile,
    setActiveProfile,
    portfolioInfo,
    skills,
    projects,
    testimonials,
    educations,
    experiences,
    milestones,
    workflows,
    certifications,
    faqs,
    messages,
    // Raw profile states for admin
    nadyaState: {
      info: nadyaInfoState,
      skills: nadyaSkillsState,
      projects: nadyaProjectsState,
      testimonials: nadyaTestimonialsState,
      educations: nadyaEducationsState,
      workflows: nadyaWorkflowsState,
      messages: nadyaMessagesState
    },
    raqwanState: {
      info: raqwanInfoState,
      skills: raqwanSkillsState,
      projects: raqwanProjectsState,
      testimonials: raqwanTestimonialsState,
      educations: raqwanEducationsState,
      workflows: raqwanWorkflowsState,
      messages: raqwanMessagesState
    },
    isSupabaseLoaded,
    isLoadingSupabase,
    isLoadedFromCache,
    cacheExpiryTime,
    loadFromSupabase,
    refreshCacheFromBackend,
    pushDataToSupabase,
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
    addMessage,
    markMessageRead,
    deleteMessage,
    resetToDefault
  }
}
