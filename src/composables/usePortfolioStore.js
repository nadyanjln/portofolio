import { ref } from 'vue'
import { 
  portfolioInfo as defaultInfo, 
  skills as defaultSkills, 
  projects as defaultProjects,
  testimonials as defaultTestimonials,
  educations as defaultEducations
} from '@/data/portfolioData'
import { 
  supabase, 
  isSupabaseConfigured,
  fetchProjectsFromSupabase,
  fetchSkillsFromSupabase,
  fetchTestimonialsFromSupabase,
  fetchProfileFromSupabase,
  seedAllDataToSupabase
} from '@/lib/supabase'

const STORE_STORAGE_KEY = 'nadya_portfolio_cms_data'
const MESSAGES_STORAGE_KEY = 'nadya_portfolio_messages'
const SUPABASE_CACHE_KEY = 'nadya_portfolio_supabase_cache'

// 1 Day Cache TTL (24 hours in milliseconds)
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000

// Reactive state
const infoState = ref(JSON.parse(JSON.stringify(defaultInfo)))
const skillsState = ref(JSON.parse(JSON.stringify(defaultSkills)))
const projectsState = ref(JSON.parse(JSON.stringify(defaultProjects)))
const testimonialsState = ref(JSON.parse(JSON.stringify(defaultTestimonials)))
const educationsState = ref(JSON.parse(JSON.stringify(defaultEducations)))
const messagesState = ref([])
const isSupabaseLoaded = ref(false)
const isLoadingSupabase = ref(false)
const isLoadedFromCache = ref(false)
const cacheExpiryTime = ref(null)

// -------------------------------------------------------------
// CACHE HELPER FUNCTIONS
// -------------------------------------------------------------
const getCachedData = () => {
  try {
    const raw = localStorage.getItem(SUPABASE_CACHE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)
    const now = Date.now()

    // Check if cache is still valid (< 24 hours)
    if (parsed.expiresAt && now < parsed.expiresAt) {
      return parsed
    }
    
    console.log('[Supabase Cache] Cache 1 hari telah kedaluwarsa. Mengambil data baru dari backend...')
    return null
  } catch (e) {
    console.error('[Supabase Cache] Error membaca cache:', e)
    return null
  }
}

const saveCacheData = (dataPayload) => {
  try {
    const now = Date.now()
    const expiresAt = now + CACHE_TTL_MS
    const cachePayload = {
      cachedAt: new Date(now).toISOString(),
      expiresAt: expiresAt,
      expiresAtReadable: new Date(expiresAt).toLocaleString('id-ID'),
      data: dataPayload
    }
    localStorage.setItem(SUPABASE_CACHE_KEY, JSON.stringify(cachePayload))
    cacheExpiryTime.value = new Date(expiresAt)
    console.log(`[Supabase Cache] Data berhasil dicache untuk 1 hari (berlaku hingga ${cachePayload.expiresAtReadable})`)
  } catch (e) {
    console.error('[Supabase Cache] Error menyimpan cache:', e)
  }
}

// Invalidate Cache
const clearSupabaseCache = () => {
  localStorage.removeItem(SUPABASE_CACHE_KEY)
  cacheExpiryTime.value = null
  isLoadedFromCache.value = false
}

// -------------------------------------------------------------
// STORE INITIALIZATION & BACKEND SYNC
// -------------------------------------------------------------
const initStoreFromLocal = () => {
  try {
    const savedData = localStorage.getItem(STORE_STORAGE_KEY)
    if (savedData) {
      const parsed = JSON.parse(savedData)
      if (parsed.portfolioInfo) infoState.value = parsed.portfolioInfo
      if (parsed.skills) skillsState.value = parsed.skills
      if (parsed.projects) projectsState.value = parsed.projects
      if (parsed.testimonials) testimonialsState.value = parsed.testimonials
      if (parsed.educations) educationsState.value = parsed.educations
    }
  } catch (e) {
    console.error('Error loading portfolio store data:', e)
  }

  try {
    const savedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY)
    if (savedMessages) {
      messagesState.value = JSON.parse(savedMessages)
    } else {
      messagesState.value = [
        {
          id: 'msg-1',
          name: 'Sarah Anderson',
          email: 'sarah.anderson@techventures.co',
          category: 'Product Management Role',
          message: 'Halo Nadya, kami sangat terkesan dengan case study TaskFlow Anda. Kami sedang mencari Lead Product Manager untuk produk SaaS kami di Q3. Apakah ada waktu untuk diskusi singkat minggu depan?',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: false
        }
      ]
    }
  } catch (e) {
    console.error('Error loading messages:', e)
  }
}

// Fetch live data from Supabase with 1-Day Cache check
const loadFromSupabase = async (forceRefresh = false) => {
  if (!isSupabaseConfigured() || !supabase) return

  // 1. Check if 1-day cache exists and forceRefresh is false
  if (!forceRefresh) {
    const cached = getCachedData()
    if (cached && cached.data) {
      console.log(`⚡ [Supabase Cache] Menggunakan data cache lokal (Valid hingga: ${cached.expiresAtReadable}). Tidak merequest backend.`)
      if (cached.data.projects?.length) projectsState.value = cached.data.projects
      if (cached.data.skills?.length) skillsState.value = cached.data.skills
      if (cached.data.testimonials?.length) testimonialsState.value = cached.data.testimonials
      if (cached.data.profile) infoState.value = { ...infoState.value, ...cached.data.profile }
      
      isLoadedFromCache.value = true
      isSupabaseLoaded.value = true
      cacheExpiryTime.value = new Date(cached.expiresAt)
      return
    }
  }

  // 2. Fetch fresh data from backend
  isLoadingSupabase.value = true
  isLoadedFromCache.value = false
  try {
    console.log('🌐 [Supabase] Mengambil data terbaru dari backend...')
    const [pRes, sRes, tRes, profRes] = await Promise.all([
      fetchProjectsFromSupabase(),
      fetchSkillsFromSupabase(),
      fetchTestimonialsFromSupabase(),
      fetchProfileFromSupabase()
    ])

    if (pRes.data && pRes.data.length > 0) {
      projectsState.value = pRes.data
    }
    if (sRes.data && sRes.data.length > 0) {
      skillsState.value = sRes.data
    }
    if (tRes.data && tRes.data.length > 0) {
      testimonialsState.value = tRes.data
    }
    if (profRes.data) {
      infoState.value = { ...infoState.value, ...profRes.data }
    }

    // 3. Save to 24-Hour Cache
    saveCacheData({
      projects: projectsState.value,
      skills: skillsState.value,
      testimonials: testimonialsState.value,
      profile: infoState.value
    })

    isSupabaseLoaded.value = true
  } catch (err) {
    console.warn('[Supabase Store] Error loading data from Supabase, using local state:', err)
  } finally {
    isLoadingSupabase.value = false
  }
}

// Initialize on load
initStoreFromLocal()
loadFromSupabase()

// Auto-save changes to localStorage
const persistStore = () => {
  try {
    const payload = {
      portfolioInfo: infoState.value,
      skills: skillsState.value,
      projects: projectsState.value,
      testimonials: testimonialsState.value,
      educations: educationsState.value
    }
    localStorage.setItem(STORE_STORAGE_KEY, JSON.stringify(payload))
    // Also update cache with new edits
    saveCacheData({
      projects: projectsState.value,
      skills: skillsState.value,
      testimonials: testimonialsState.value,
      profile: infoState.value
    })
  } catch (e) {
    console.error('Failed to persist portfolio store:', e)
  }
}

const persistMessages = () => {
  try {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messagesState.value))
  } catch (e) {
    console.error('Failed to persist messages:', e)
  }
}

export function usePortfolioStore() {
  // Update Profile Info
  const updateInfo = async (newInfo) => {
    infoState.value = { ...infoState.value, ...newInfo }
    persistStore()

    if (supabase) {
      try {
        await supabase.from('profile_info').upsert({
          id: 'nadya_profile',
          name: newInfo.name,
          short_name: newInfo.shortName,
          title: newInfo.title,
          tagline: newInfo.tagline,
          bio: newInfo.bio,
          status: newInfo.status,
          location: newInfo.location,
          email: newInfo.email,
          socials: newInfo.socials
        }, { onConflict: 'id' })
      } catch (e) {
        console.warn('[Supabase Sync] Profile update:', e)
      }
    }
  }

  // Projects CRUD
  const addProject = async (project) => {
    const newProj = {
      ...project,
      id: project.id || 'proj-' + Date.now(),
      featured: project.featured ?? true
    }
    projectsState.value.unshift(newProj)
    persistStore()

    if (supabase) {
      try {
        await supabase.from('projects').insert([{
          id: newProj.id,
          title: newProj.title,
          category: newProj.category,
          description: newProj.description,
          tags: newProj.tags,
          image: newProj.image,
          live_url: newProj.liveUrl || '',
          featured: newProj.featured,
          highlights: newProj.highlights || [],
          detail: newProj.detail || {}
        }])
      } catch (e) {
        console.warn('[Supabase Sync] Add project:', e)
      }
    }

    return newProj
  }

  const updateProject = async (id, updatedData) => {
    const index = projectsState.value.findIndex(p => p.id === id)
    if (index !== -1) {
      projectsState.value[index] = { ...projectsState.value[index], ...updatedData }
      persistStore()

      if (supabase) {
        try {
          await supabase.from('projects').update({
            title: updatedData.title,
            category: updatedData.category,
            description: updatedData.description,
            tags: updatedData.tags,
            image: updatedData.image,
            live_url: updatedData.liveUrl || '',
            featured: updatedData.featured,
            detail: updatedData.detail || {}
          }).eq('id', id)
        } catch (e) {
          console.warn('[Supabase Sync] Update project:', e)
        }
      }
    }
  }

  const deleteProject = async (id) => {
    projectsState.value = projectsState.value.filter(p => p.id !== id)
    persistStore()

    if (supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id)
      } catch (e) {
        console.warn('[Supabase Sync] Delete project:', e)
      }
    }
  }

  // Skills CRUD
  const addSkill = async (skill) => {
    skillsState.value.push(skill)
    persistStore()

    if (supabase) {
      try {
        await supabase.from('skills').insert([skill])
      } catch (e) {
        console.warn('[Supabase Sync] Add skill:', e)
      }
    }
  }

  const deleteSkill = async (name) => {
    skillsState.value = skillsState.value.filter(s => s.name !== name)
    persistStore()

    if (supabase) {
      try {
        await supabase.from('skills').delete().eq('name', name)
      } catch (e) {
        console.warn('[Supabase Sync] Delete skill:', e)
      }
    }
  }

  // Education CRUD
  const updateEducations = (newEducations) => {
    educationsState.value = newEducations
    persistStore()
  }

  // Messages / Inquiries
  const addMessage = (messageData) => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      date: new Date().toISOString(),
      read: false,
      ...messageData
    }
    messagesState.value.unshift(newMsg)
    persistMessages()
    return newMsg
  }

  const markMessageRead = (id) => {
    const msg = messagesState.value.find(m => m.id === id)
    if (msg) {
      msg.read = true
      persistMessages()
    }
  }

  const deleteMessage = (id) => {
    messagesState.value = messagesState.value.filter(m => m.id !== id)
    persistMessages()
  }

  // Reset to default
  const resetToDefault = () => {
    infoState.value = JSON.parse(JSON.stringify(defaultInfo))
    skillsState.value = JSON.parse(JSON.stringify(defaultSkills))
    projectsState.value = JSON.parse(JSON.stringify(defaultProjects))
    testimonialsState.value = JSON.parse(JSON.stringify(defaultTestimonials))
    educationsState.value = JSON.parse(JSON.stringify(defaultEducations))
    localStorage.removeItem(STORE_STORAGE_KEY)
    clearSupabaseCache()
  }

  // Seed / Push default data to Supabase
  const pushDataToSupabase = async () => {
    clearSupabaseCache()
    return await seedAllDataToSupabase()
  }

  // Force refresh cache
  const refreshCacheFromBackend = async () => {
    await loadFromSupabase(true)
  }

  return {
    portfolioInfo: infoState,
    skills: skillsState,
    projects: projectsState,
    testimonials: testimonialsState,
    educations: educationsState,
    messages: messagesState,
    isSupabaseLoaded,
    isLoadingSupabase,
    isLoadedFromCache,
    cacheExpiryTime,
    loadFromSupabase,
    refreshCacheFromBackend,
    clearSupabaseCache,
    pushDataToSupabase,
    updateInfo,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    deleteSkill,
    updateEducations,
    addMessage,
    markMessageRead,
    deleteMessage,
    resetToDefault
  }
}
