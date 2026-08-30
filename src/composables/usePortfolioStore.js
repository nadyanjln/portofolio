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
  certifications as defaultNadyaCertifications
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
const nadyaMessagesState = ref([])

// Reactive states for RAQWAN
const raqwanInfoState = ref(JSON.parse(JSON.stringify(defaultRaqwanInfo)))
const raqwanSkillsState = ref(JSON.parse(JSON.stringify(defaultRaqwanSkills)))
const raqwanProjectsState = ref(JSON.parse(JSON.stringify(defaultRaqwanProjects)))
const raqwanTestimonialsState = ref(JSON.parse(JSON.stringify(defaultRaqwanTestimonials)))
const raqwanEducationsState = ref(JSON.parse(JSON.stringify(defaultRaqwanEducations)))
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

const initProfileFromLocal = (profileKey) => {
  try {
    const saved = localStorage.getItem(getStorageKey(profileKey, 'data'))
    if (saved) {
      const parsed = JSON.parse(saved)
      if (profileKey === 'nadya') {
        nadyaInfoState.value = { ...defaultNadyaInfo, ...parsed.portfolioInfo }
        if (parsed.projects && parsed.projects.length > 0) {
          const existingIds = new Set(parsed.projects.map(p => p.id))
          const missingProjects = defaultNadyaProjects.filter(p => !existingIds.has(p.id))
          nadyaProjectsState.value = [...missingProjects, ...parsed.projects]
        } else {
          nadyaProjectsState.value = JSON.parse(JSON.stringify(defaultNadyaProjects))
        }
        if (parsed.skills && parsed.skills.length > 0) {
          const existingSkillNames = new Set(parsed.skills.map(s => s.name))
          const missingSkills = defaultNadyaSkills.filter(s => !existingSkillNames.has(s.name))
          nadyaSkillsState.value = [...missingSkills, ...parsed.skills]
        } else {
          nadyaSkillsState.value = JSON.parse(JSON.stringify(defaultNadyaSkills))
        }
        if (parsed.testimonials && parsed.testimonials.length > 0) nadyaTestimonialsState.value = parsed.testimonials
        if (parsed.educations && parsed.educations.length > 0) nadyaEducationsState.value = parsed.educations
      } else {
        // Always ensure updated default data and projects if newly added
        raqwanInfoState.value = { 
          ...parsed.portfolioInfo,
          ...defaultRaqwanInfo
        }
        
        if (parsed.projects && parsed.projects.length > 0) {
          const existingIds = new Set(parsed.projects.map(p => p.id))
          const missingProjects = defaultRaqwanProjects.filter(p => !existingIds.has(p.id))
          raqwanProjectsState.value = [...missingProjects, ...parsed.projects]
        } else {
          raqwanProjectsState.value = JSON.parse(JSON.stringify(defaultRaqwanProjects))
        }

        if (parsed.skills && parsed.skills.length > 0) {
          const existingSkillNames = new Set(parsed.skills.map(s => s.name))
          const missingSkills = defaultRaqwanSkills.filter(s => !existingSkillNames.has(s.name))
          raqwanSkillsState.value = [...missingSkills, ...parsed.skills]
        } else {
          raqwanSkillsState.value = JSON.parse(JSON.stringify(defaultRaqwanSkills))
        }

        if (parsed.testimonials && parsed.testimonials.length > 0) {
          raqwanTestimonialsState.value = parsed.testimonials
        }
        if (parsed.educations && parsed.educations.length > 0) {
          raqwanEducationsState.value = parsed.educations
        }
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
          educations: nadyaEducationsState.value
        }
      : {
          portfolioInfo: raqwanInfoState.value,
          skills: raqwanSkillsState.value,
          projects: raqwanProjectsState.value,
          testimonials: raqwanTestimonialsState.value,
          educations: raqwanEducationsState.value
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
    const [pRes, sRes, tRes, eduRes, profRes] = await Promise.all([
      fetchProjectsFromSupabase(),
      fetchSkillsFromSupabase(),
      fetchTestimonialsFromSupabase(),
      fetchEducationsFromSupabase(),
      fetchProfileFromSupabase()
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

      nadyaProjectsState.value = pRes.data.filter(p => !raqwanProjectIds.has(p.id))
      raqwanProjectsState.value = pRes.data.filter(p => raqwanProjectIds.has(p.id))
    }

    if (sRes.data && sRes.data.length > 0) {
      const nadyaCategories = new Set(['Product', 'UI/UX', 'Design Tool', 'UX Research'])
      nadyaSkillsState.value = sRes.data.filter(s => nadyaCategories.has(s.category))
      raqwanSkillsState.value = sRes.data.filter(s => !nadyaCategories.has(s.category))
    }

    if (tRes.data && tRes.data.length > 0) {
      nadyaTestimonialsState.value = tRes.data
    }

    if (eduRes.data && eduRes.data.length > 0) {
      const nadyaEdu = eduRes.data.filter(e => (e.degree && e.degree.includes('3.97')) || e.school.includes('Gunadarma'))
      const raqwanEdu = eduRes.data.filter(e => e.degree && e.degree.includes('3.78'))
      if (nadyaEdu.length) nadyaEducationsState.value = nadyaEdu
      if (raqwanEdu.length) raqwanEducationsState.value = raqwanEdu
    }

    if (profRes.data) {
      nadyaInfoState.value = { ...nadyaInfoState.value, ...profRes.data }
    }

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
    return currentProfile.value === 'nadya' ? defaultNadyaExperiences : defaultRaqwanExperiences
  })

  const milestones = computed(() => {
    return currentProfile.value === 'nadya' ? defaultNadyaMilestones : defaultRaqwanMilestones
  })

  const workflows = computed(() => {
    return currentProfile.value === 'nadya' ? defaultNadyaWorkflows : defaultRaqwanWorkflows
  })

  const certifications = computed(() => {
    return currentProfile.value === 'nadya' ? defaultNadyaCertifications : defaultRaqwanCertifications
  })

  const messages = computed(() => {
    return currentProfile.value === 'nadya' ? nadyaMessagesState.value : raqwanMessagesState.value
  })

  // Profile setter
  const setActiveProfile = (profile) => {
    if (profile === 'nadya' || profile === 'raqwan') {
      activeProfileKey.value = profile
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
    } else {
      raqwanInfoState.value = JSON.parse(JSON.stringify(defaultRaqwanInfo))
      raqwanSkillsState.value = JSON.parse(JSON.stringify(defaultRaqwanSkills))
      raqwanProjectsState.value = JSON.parse(JSON.stringify(defaultRaqwanProjects))
      raqwanTestimonialsState.value = JSON.parse(JSON.stringify(defaultRaqwanTestimonials))
      raqwanEducationsState.value = JSON.parse(JSON.stringify(defaultRaqwanEducations))
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
    messages,
    // Raw profile states for admin
    nadyaState: {
      info: nadyaInfoState,
      skills: nadyaSkillsState,
      projects: nadyaProjectsState,
      testimonials: nadyaTestimonialsState,
      educations: nadyaEducationsState,
      messages: nadyaMessagesState
    },
    raqwanState: {
      info: raqwanInfoState,
      skills: raqwanSkillsState,
      projects: raqwanProjectsState,
      testimonials: raqwanTestimonialsState,
      educations: raqwanEducationsState,
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
    addMessage,
    markMessageRead,
    deleteMessage,
    resetToDefault
  }
}
