import { ref, computed } from 'vue'
import { 
  portfolioInfo as defaultNadyaInfo, 
  skills as defaultNadyaSkills, 
  projects as defaultNadyaProjects,
  testimonials as defaultNadyaTestimonials,
  educations as defaultNadyaEducations,
  workflows as defaultNadyaWorkflows,
  experiences as defaultNadyaExperiences,
  milestones as defaultNadyaMilestones,
  certifications as defaultNadyaCertifications,
  faqs as defaultNadyaFaqs
} from '@/data/portfolioData'
import {
  raqwanInfo as defaultRaqwanInfo,
  raqwanSkills as defaultRaqwanSkills,
  raqwanProjects as defaultRaqwanProjects,
  raqwanTestimonials as defaultRaqwanTestimonials,
  raqwanEducations as defaultRaqwanEducations,
  raqwanWorkflows as defaultRaqwanWorkflows,
  raqwanExperiences as defaultRaqwanExperiences,
  raqwanMilestones as defaultRaqwanMilestones,
  raqwanCertifications as defaultRaqwanCertifications
} from '@/data/raqwanData'
import { 
  supabase, 
  isSupabaseConfigured,
  fetchProjectsFromSupabase,
  fetchSkillsFromSupabase,
  fetchTestimonialsFromSupabase,
  fetchEducationsFromSupabase,
  fetchProfileFromSupabase
} from '@/lib/supabase'

// 1 Day Cache TTL (24 hours)
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000

// Active profile global state ('nadya' | 'raqwan')
const activeProfileKey = ref('nadya')

// Reactive states for NADYA
const nadyaInfoState = ref(JSON.parse(JSON.stringify(defaultNadyaInfo)))
const nadyaSkillsState = ref(JSON.parse(JSON.stringify(defaultNadyaSkills)))
const nadyaProjectsState = ref(JSON.parse(JSON.stringify(defaultNadyaProjects)))
const nadyaTestimonialsState = ref(JSON.parse(JSON.stringify(defaultNadyaTestimonials)))
const nadyaEducationsState = ref(JSON.parse(JSON.stringify(defaultNadyaEducations)))
const nadyaWorkflowsState = ref(JSON.parse(JSON.stringify(defaultNadyaWorkflows)))
const nadyaExperiencesState = ref(JSON.parse(JSON.stringify(defaultNadyaExperiences)))
const nadyaMilestonesState = ref(JSON.parse(JSON.stringify(defaultNadyaMilestones)))
const nadyaCertificationsState = ref(JSON.parse(JSON.stringify(defaultNadyaCertifications)))
const nadyaFaqsState = ref(JSON.parse(JSON.stringify(defaultNadyaFaqs)))
const nadyaMessagesState = ref([])

// Reactive states for RAQWAN
const raqwanInfoState = ref(JSON.parse(JSON.stringify(defaultRaqwanInfo)))
const raqwanSkillsState = ref(JSON.parse(JSON.stringify(defaultRaqwanSkills)))
const raqwanProjectsState = ref(JSON.parse(JSON.stringify(defaultRaqwanProjects)))
const raqwanTestimonialsState = ref(JSON.parse(JSON.stringify(defaultRaqwanTestimonials)))
const raqwanEducationsState = ref(JSON.parse(JSON.stringify(defaultRaqwanEducations)))
const raqwanWorkflowsState = ref(JSON.parse(JSON.stringify(defaultRaqwanWorkflows)))
const raqwanExperiencesState = ref(JSON.parse(JSON.stringify(defaultRaqwanExperiences)))
const raqwanMilestonesState = ref(JSON.parse(JSON.stringify(defaultRaqwanMilestones)))
const raqwanCertificationsState = ref(JSON.parse(JSON.stringify(defaultRaqwanCertifications)))
const raqwanFaqsState = ref([
  {
    question: "Apakah Anda terbuka untuk full-time role atau remote contract sebagai AI Engineer?",
    answer: "Ya, saya sangat terbuka untuk posisi Head of AI, Lead AI Architect, Full-Time AI Engineer, maupun remote contract untuk perancangan Agentic AI, Computer Vision, dan Distributed ML."
  },
  {
    question: "Framework & teknologi apa yang menjadi spesialisasi utama Anda?",
    answer: "Saya berspesialisasi pada ekosistem PyTorch, CUDA, Ray (Distributed ML), LangGraph & FalkorDB (Agentic AI & GraphRAG), FastAPI, WebSockets, Docker, serta PostgreSQL & Grafana."
  },
  {
    question: "Bagaimana pendekatan Anda dalam mengoptimasi sistem AI agar berlatensi rendah?",
    answer: "Saya menerapkan kuantisasi model (INT8/FP16/TFLite), asynchronous concurrency streaming via WebSockets, in-memory vectorized indexing, serta orkestrasi worker GPU terdistribusi menggunakan Ray."
  }
])
const raqwanMessagesState = ref([])

// Status
const isSupabaseLoaded = ref(false)
const isLoadingSupabase = ref(false)
const isLoadedFromCache = ref(false)
const cacheExpiryTime = ref(null)

// -------------------------------------------------------------
// LOCALSTORAGE & CACHE PER PROFILE
// -------------------------------------------------------------
const getStorageKey = (profile, suffix) => `portfolio_${profile}_${suffix}`

const mergeProjectsWithDefaults = (savedProjects, defaultProjects) => {
  if (!savedProjects || !savedProjects.length) {
    return JSON.parse(JSON.stringify(defaultProjects))
  }
  
  const mergedDefaults = defaultProjects.map(defProj => {
    const saved = savedProjects.find(p => p.id === defProj.id)
    if (!saved) return JSON.parse(JSON.stringify(defProj))

    return {
      ...defProj,
      ...saved,
      detail: {
        ...defProj.detail,
        ...(saved.detail || {})
      }
    }
  })

  const customProjects = savedProjects.filter(sp => !defaultProjects.some(dp => dp.id === sp.id))
  return [...mergedDefaults, ...customProjects]
}

const initProfileFromLocal = (profileKey) => {
  try {
    const saved = localStorage.getItem(getStorageKey(profileKey, 'data'))
    if (saved) {
      const parsed = JSON.parse(saved)
      if (profileKey === 'nadya') {
        if (parsed.portfolioInfo) nadyaInfoState.value = { ...defaultNadyaInfo, ...parsed.portfolioInfo }
        nadyaProjectsState.value = mergeProjectsWithDefaults(parsed.projects, defaultNadyaProjects)
        if (parsed.skills && parsed.skills.length > 0) nadyaSkillsState.value = parsed.skills
        if (parsed.testimonials && parsed.testimonials.length > 0) nadyaTestimonialsState.value = parsed.testimonials
        if (parsed.educations && parsed.educations.length > 0) nadyaEducationsState.value = parsed.educations
        if (parsed.workflows && parsed.workflows.length > 0) nadyaWorkflowsState.value = parsed.workflows
      } else {
        if (parsed.portfolioInfo) raqwanInfoState.value = { ...defaultRaqwanInfo, ...parsed.portfolioInfo }
        raqwanProjectsState.value = mergeProjectsWithDefaults(parsed.projects, defaultRaqwanProjects)
        if (parsed.skills && parsed.skills.length > 0) raqwanSkillsState.value = parsed.skills
        if (parsed.testimonials && parsed.testimonials.length > 0) raqwanTestimonialsState.value = parsed.testimonials
        if (parsed.educations && parsed.educations.length > 0) raqwanEducationsState.value = parsed.educations
        if (parsed.workflows && parsed.workflows.length > 0) raqwanWorkflowsState.value = parsed.workflows
      }
    }
  } catch (e) {
    console.error(`Error loading local data for ${profileKey}:`, e)
  }

  try {
    const savedMsgs = localStorage.getItem(getStorageKey(profileKey, 'messages'))
    if (savedMsgs) {
      const parsed = JSON.parse(savedMsgs)
      if (profileKey === 'nadya') nadyaMessagesState.value = parsed
      else raqwanMessagesState.value = parsed
    } else {
      const defaultMsg = [
        {
          id: 'msg-1',
          name: 'Sarah Anderson',
          email: 'sarah.anderson@techventures.co',
          category: profileKey === 'nadya' ? 'Product Management Role' : 'AI Engineering Role',
          message: profileKey === 'nadya'
            ? 'Halo Nadya, kami sangat terkesan dengan case study TaskFlow Anda. Kami sedang mencari Lead Product Manager di Q3.'
            : 'Halo Raqwan, kami sangat tertarik dengan sistem GraphRAG dan arsitektur distributed ML Anda. Kami sedang mencari AI Specialist untuk tim kami.',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: false
        }
      ]
      if (profileKey === 'nadya') nadyaMessagesState.value = defaultMsg
      else raqwanMessagesState.value = defaultMsg
    }
  } catch (e) {
    console.error(`Error loading messages for ${profileKey}:`, e)
  }
}

// Initialize both profiles
initProfileFromLocal('nadya')
initProfileFromLocal('raqwan')

// Persist single profile to localStorage
const persistProfile = (profileKey) => {
  try {
    const payload = profileKey === 'nadya' 
      ? {
          portfolioInfo: nadyaInfoState.value,
          skills: nadyaSkillsState.value,
          projects: nadyaProjectsState.value,
          testimonials: nadyaTestimonialsState.value,
          educations: nadyaEducationsState.value,
          workflows: nadyaWorkflowsState.value
        }
      : {
          portfolioInfo: raqwanInfoState.value,
          skills: raqwanSkillsState.value,
          projects: raqwanProjectsState.value,
          testimonials: raqwanTestimonialsState.value,
          educations: raqwanEducationsState.value,
          workflows: raqwanWorkflowsState.value
        }

    localStorage.setItem(getStorageKey(profileKey, 'data'), JSON.stringify(payload))
  } catch (e) {
    console.error(`Error saving ${profileKey} data:`, e)
  }
}

const persistMessages = (profileKey) => {
  try {
    const msgs = profileKey === 'nadya' ? nadyaMessagesState.value : raqwanMessagesState.value
    localStorage.setItem(getStorageKey(profileKey, 'messages'), JSON.stringify(msgs))
  } catch (e) {
    console.error(`Error saving messages for ${profileKey}:`, e)
  }
}

// -------------------------------------------------------------
// CACHED SUPABASE LOADER
// -------------------------------------------------------------
const loadFromSupabase = async (forceRefresh = false) => {
  if (!isSupabaseConfigured() || !supabase) return

  isLoadingSupabase.value = true
  try {
    const [pRes, sRes, tRes, eduRes, nadyaProfRes, raqwanProfRes] = await Promise.all([
      fetchProjectsFromSupabase(),
      fetchSkillsFromSupabase(),
      fetchTestimonialsFromSupabase(),
      fetchEducationsFromSupabase(),
      fetchProfileFromSupabase('nadya_profile'),
      fetchProfileFromSupabase('raqwan_profile')
    ])

    if (pRes.data && pRes.data.length > 0) {
      const raqwanProjectIds = new Set([
        'marketforge-securities-platform', 
        'pertamina-graphrag-knowledge-graph', 
        'upstream-energy-data-monitoring', 
        'ai-learning-insight', 
        'reclaimyt-smart-conveyor-ai', 
        'twogether-ondevice-object-detection', 
        'distributed-voice-cloning-ray', 
        'slogmate-national-police-agentic'
      ])

      const nadyaList = pRes.data.filter(p => !raqwanProjectIds.has(p.id))
      const raqwanList = pRes.data.filter(p => raqwanProjectIds.has(p.id))
      if (nadyaList.length) nadyaProjectsState.value = nadyaList
      if (raqwanList.length) raqwanProjectsState.value = raqwanList
    }

    if (sRes.data && sRes.data.length > 0) {
      const nadyaCategories = new Set(['Product', 'UI/UX', 'Design Tool', 'UX Research'])
      const nadyaSkills = sRes.data.filter(s => nadyaCategories.has(s.category))
      const raqwanSkills = sRes.data.filter(s => !nadyaCategories.has(s.category))
      if (nadyaSkills.length) nadyaSkillsState.value = nadyaSkills
      if (raqwanSkills.length) raqwanSkillsState.value = raqwanSkills
    }

    if (tRes.data && tRes.data.length > 0) {
      const nadyaTests = tRes.data.filter(t => t.id < 100)
      const raqwanTests = tRes.data.filter(t => t.id >= 100)
      if (nadyaTests.length) nadyaTestimonialsState.value = nadyaTests
      if (raqwanTests.length) raqwanTestimonialsState.value = raqwanTests
    }

    if (eduRes.data && eduRes.data.length > 0) {
      const nadyaEdu = eduRes.data.filter(e => (e.degree && e.degree.includes('3.97')) || e.school.includes('Gunadarma'))
      const raqwanEdu = eduRes.data.filter(e => e.degree && e.degree.includes('3.78'))
      if (nadyaEdu.length) nadyaEducationsState.value = nadyaEdu
      if (raqwanEdu.length) raqwanEducationsState.value = raqwanEdu
    }

    if (nadyaProfRes.data) {
      nadyaInfoState.value = { ...nadyaInfoState.value, ...nadyaProfRes.data }
      if (nadyaProfRes.data.socials?.workflows?.length) nadyaWorkflowsState.value = nadyaProfRes.data.socials.workflows
      if (nadyaProfRes.data.socials?.experiences?.length) nadyaExperiencesState.value = nadyaProfRes.data.socials.experiences
      if (nadyaProfRes.data.socials?.milestones?.length) nadyaMilestonesState.value = nadyaProfRes.data.socials.milestones
      if (nadyaProfRes.data.socials?.certifications?.length) nadyaCertificationsState.value = nadyaProfRes.data.socials.certifications
      if (nadyaProfRes.data.socials?.faqs?.length) nadyaFaqsState.value = nadyaProfRes.data.socials.faqs
    }
    if (raqwanProfRes.data) {
      raqwanInfoState.value = { ...raqwanInfoState.value, ...raqwanProfRes.data }
      if (raqwanProfRes.data.socials?.workflows?.length) raqwanWorkflowsState.value = raqwanProfRes.data.socials.workflows
      if (raqwanProfRes.data.socials?.experiences?.length) raqwanExperiencesState.value = raqwanProfRes.data.socials.experiences
      if (raqwanProfRes.data.socials?.milestones?.length) raqwanMilestonesState.value = raqwanProfRes.data.socials.milestones
      if (raqwanProfRes.data.socials?.certifications?.length) raqwanCertificationsState.value = raqwanProfRes.data.socials.certifications
      if (raqwanProfRes.data.socials?.faqs?.length) raqwanFaqsState.value = raqwanProfRes.data.socials.faqs
    }

    persistProfile('nadya')
    persistProfile('raqwan')

    isSupabaseLoaded.value = true
    console.log('⚡ [Supabase] Data successfully synchronized from Supabase cloud database!')
  } catch (err) {
    console.warn('[Supabase Store] Error loading Supabase data:', err)
  } finally {
    isLoadingSupabase.value = false
  }
}

// Load Supabase on startup
loadFromSupabase()

// -------------------------------------------------------------
// MAIN COMPOSABLE
// -------------------------------------------------------------
export function usePortfolioStore(profileExplicit = null) {
  // Determine current active profile: explicit parameter or global state
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

  // Profile Updates
  const updateInfo = (newInfo, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaInfoState.value = { ...nadyaInfoState.value, ...newInfo }
    } else {
      raqwanInfoState.value = { ...raqwanInfoState.value, ...newInfo }
    }
    persistProfile(targetProfile)
  }

  // Projects CRUD
  const addProject = (project, targetProfile = currentProfile.value) => {
    const newProj = {
      ...project,
      id: project.id || 'proj-' + Date.now(),
      featured: project.featured ?? true
    }
    if (targetProfile === 'nadya') {
      nadyaProjectsState.value.unshift(newProj)
    } else {
      raqwanProjectsState.value.unshift(newProj)
    }
    persistProfile(targetProfile)
    return newProj
  }

  const updateProject = (id, updatedData, targetProfile = currentProfile.value) => {
    const list = targetProfile === 'nadya' ? nadyaProjectsState : raqwanProjectsState
    const index = list.value.findIndex(p => p.id === id)
    if (index !== -1) {
      list.value[index] = { ...list.value[index], ...updatedData }
      persistProfile(targetProfile)
    }
  }

  const deleteProject = (id, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaProjectsState.value = nadyaProjectsState.value.filter(p => p.id !== id)
    } else {
      raqwanProjectsState.value = raqwanProjectsState.value.filter(p => p.id !== id)
    }
    persistProfile(targetProfile)
  }

  // Skills CRUD
  const addSkill = (skill, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaSkillsState.value.push(skill)
    } else {
      raqwanSkillsState.value.push(skill)
    }
    persistProfile(targetProfile)
  }

  const deleteSkill = (name, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaSkillsState.value = nadyaSkillsState.value.filter(s => s.name !== name)
    } else {
      raqwanSkillsState.value = raqwanSkillsState.value.filter(s => s.name !== name)
    }
    persistProfile(targetProfile)
  }

  // Educations CRUD
  const updateEducations = (newEducations, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaEducationsState.value = newEducations
    } else {
      raqwanEducationsState.value = newEducations
    }
    persistProfile(targetProfile)
  }

  // Workflows ("Bagaimana Saya Bekerja") CRUD
  const updateWorkflows = (newWorkflows, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaWorkflowsState.value = newWorkflows
    } else {
      raqwanWorkflowsState.value = newWorkflows
    }
    persistProfile(targetProfile)
  }

  // Testimonials ("Apa Kata Rekan & Stakeholder") CRUD
  const updateTestimonials = (newTestimonials, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaTestimonialsState.value = newTestimonials
    } else {
      raqwanTestimonialsState.value = newTestimonials
    }
    persistProfile(targetProfile)
  }

  const addTestimonial = (testi, targetProfile = currentProfile.value) => {
    const newTesti = {
      id: Date.now(),
      ...testi
    }
    if (targetProfile === 'nadya') {
      nadyaTestimonialsState.value.push(newTesti)
    } else {
      raqwanTestimonialsState.value.push(newTesti)
    }
    persistProfile(targetProfile)
    return newTesti
  }

  const deleteTestimonial = (id, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaTestimonialsState.value = nadyaTestimonialsState.value.filter(t => t.id !== id)
    } else {
      raqwanTestimonialsState.value = raqwanTestimonialsState.value.filter(t => t.id !== id)
    }
    persistProfile(targetProfile)
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
    persistMessages(targetProfile)
    return newMsg
  }

  const markMessageRead = (id, targetProfile = currentProfile.value) => {
    const list = targetProfile === 'nadya' ? nadyaMessagesState.value : raqwanMessagesState.value
    const msg = list.find(m => m.id === id)
    if (msg) {
      msg.read = true
      persistMessages(targetProfile)
    }
  }

  const deleteMessage = (id, targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaMessagesState.value = nadyaMessagesState.value.filter(m => m.id !== id)
    } else {
      raqwanMessagesState.value = raqwanMessagesState.value.filter(m => m.id !== id)
    }
    persistMessages(targetProfile)
  }

  // Reset to default
  const resetToDefault = (targetProfile = currentProfile.value) => {
    if (targetProfile === 'nadya') {
      nadyaInfoState.value = JSON.parse(JSON.stringify(defaultNadyaInfo))
      nadyaSkillsState.value = JSON.parse(JSON.stringify(defaultNadyaSkills))
      nadyaProjectsState.value = JSON.parse(JSON.stringify(defaultNadyaProjects))
      nadyaTestimonialsState.value = JSON.parse(JSON.stringify(defaultNadyaTestimonials))
      nadyaEducationsState.value = JSON.parse(JSON.stringify(defaultNadyaEducations))
      nadyaWorkflowsState.value = JSON.parse(JSON.stringify(defaultNadyaWorkflows))
    } else {
      raqwanInfoState.value = JSON.parse(JSON.stringify(defaultRaqwanInfo))
      raqwanSkillsState.value = JSON.parse(JSON.stringify(defaultRaqwanSkills))
      raqwanProjectsState.value = JSON.parse(JSON.stringify(defaultRaqwanProjects))
      raqwanTestimonialsState.value = JSON.parse(JSON.stringify(defaultRaqwanTestimonials))
      raqwanEducationsState.value = JSON.parse(JSON.stringify(defaultRaqwanEducations))
      raqwanWorkflowsState.value = JSON.parse(JSON.stringify(defaultRaqwanWorkflows))
    }
    localStorage.removeItem(getStorageKey(targetProfile, 'data'))
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
