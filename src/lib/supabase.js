import { createClient } from '@supabase/supabase-js'

const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : (typeof process !== 'undefined' ? process.env : {})

const supabaseUrl = 
  env.VITE_SUPABASE_URL || 
  env.SUPABASE_URL || 
  'https://wruhxkwvombesziefvmn.supabase.co'

const supabaseAnonKey = 
  env.VITE_SUPABASE_ANON_KEY || 
  env.SUPABASE_ANON_KEY || 
  'sb_publishable_ydynUzIVH7B9lgj82Rf5Ow_-Kop2yjJ'

// Check if credentials are valid
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id')
  )
}

// Initialize Supabase Client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper to normalize profile ID
const normalizeProfileId = (key) => {
  if (!key) return 'nadya_profile'
  if (key.endsWith('_profile')) return key
  return `${key}_profile`
}

const normalizeProfileKey = (key) => {
  if (!key) return 'nadya'
  return key.replace('_profile', '')
}

// -------------------------------------------------------------
// 1. FETCH FULL PROFILE DATA FROM SUPABASE
// -------------------------------------------------------------
export async function fetchProfileFromSupabase(profileIdentifier = 'nadya') {
  const profileKey = normalizeProfileKey(profileIdentifier)
  const profileTableId = normalizeProfileId(profileIdentifier)

  const emptyProfileData = {
    name: '',
    shortName: '',
    title: '',
    tagline: '',
    bio: '',
    status: '',
    location: '',
    phone: '',
    email: '',
    socials: {},
    skills: [],
    testimonials: [],
    educations: [],
    workflows: [],
    experiences: [],
    milestones: [],
    certifications: [],
    faqs: []
  }

  if (!isSupabaseConfigured() || !supabase) {
    return { data: emptyProfileData, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('profile_info')
      .select('*')
      .eq('id', profileTableId)
      .maybeSingle()

    if (error) throw error

    if (data) {
      const socials = data.socials || {}
      return {
        data: {
          name: data.name || '',
          shortName: data.short_name || '',
          title: data.title || '',
          tagline: data.tagline || '',
          bio: data.bio || '',
          status: data.status || '',
          location: data.location || '',
          phone: data.phone || socials.phone || '',
          email: data.email || '',
          socials: socials,
          skills: socials.skills || [],
          testimonials: socials.testimonials || [],
          educations: socials.educations || [],
          workflows: socials.workflows || [],
          experiences: socials.experiences || [],
          milestones: socials.milestones || [],
          certifications: socials.certifications || [],
          faqs: socials.faqs || []
        },
        error: null
      }
    }

    return { data: emptyProfileData, error: null }
  } catch (err) {
    console.warn(`[Supabase] Gagal mengambil profile_info untuk ${profileTableId}:`, err.message)
    return { data: emptyProfileData, error: err }
  }
}

// -------------------------------------------------------------
// 2. FETCH PROJECTS FROM SUPABASE (DYNAMIC PER PROFILE)
// -------------------------------------------------------------
export async function fetchProjectsFromSupabase(profileIdentifier = 'nadya') {
  const profileKey = normalizeProfileKey(profileIdentifier)

  if (!isSupabaseConfigured() || !supabase) {
    return { data: [], error: null }
  }

  try {
    // Dynamic query: filter by detail->>profile_id
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('detail->>profile_id', profileKey)
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      const mapped = data.map(item => ({
        ...item,
        liveUrl: item.live_url || item.liveUrl || '',
        githubUrl: item.github_url || item.githubUrl || ''
      }))
      return { data: mapped, error: null }
    }

    return { data: [], error: null }
  } catch (err) {
    console.warn(`[Supabase] Gagal mengambil projects untuk ${profileKey}:`, err.message)
    return { data: [], error: err }
  }
}

// -------------------------------------------------------------
// 3. PROJECT CLOUD CRUD MUTATIONS
// -------------------------------------------------------------
export async function saveProjectToSupabase(project, profileIdentifier = 'nadya') {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, message: 'Supabase client not configured' }
  }

  const profileKey = normalizeProfileKey(profileIdentifier)
  const formattedProject = {
    id: project.id || `proj-${Date.now()}`,
    title: project.title,
    category: project.category,
    description: project.description,
    tags: project.tags || [],
    image: project.image || '',
    live_url: project.liveUrl || project.live_url || '',
    github_url: project.githubUrl || project.github_url || '',
    featured: project.featured ?? true,
    highlights: project.highlights || [],
    detail: {
      ...(project.detail || {}),
      profile_id: profileKey
    },
    created_at: project.created_at || new Date().toISOString()
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .upsert(formattedProject, { onConflict: 'id' })
      .select()

    if (error) throw error
    return { success: true, data }
  } catch (err) {
    console.error('[Supabase] Error saving project to cloud:', err.message)
    return { success: false, error: err.message }
  }
}

export async function deleteProjectFromSupabase(projectId) {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, message: 'Supabase client not configured' }
  }

  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) throw error
    return { success: true }
  } catch (err) {
    console.error('[Supabase] Error deleting project from cloud:', err.message)
    return { success: false, error: err.message }
  }
}

// -------------------------------------------------------------
// 4. PROFILE & BUNDLE CLOUD CRUD MUTATIONS
// -------------------------------------------------------------
export async function updateProfileInSupabase(profileIdentifier, updatedRecord) {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, message: 'Supabase client not configured' }
  }

  const profileTableId = normalizeProfileId(profileIdentifier)

  try {
    const payload = {
      id: profileTableId,
      name: updatedRecord.name,
      short_name: updatedRecord.shortName || updatedRecord.short_name,
      title: updatedRecord.title,
      tagline: updatedRecord.tagline,
      bio: updatedRecord.bio,
      status: updatedRecord.status,
      location: updatedRecord.location,
      email: updatedRecord.email,
      socials: updatedRecord.socials || {},
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('profile_info')
      .upsert(payload, { onConflict: 'id' })
      .select()

    if (error) throw error
    return { success: true, data }
  } catch (err) {
    console.error(`[Supabase] Error updating profile ${profileTableId}:`, err.message)
    return { success: false, error: err.message }
  }
}

// -------------------------------------------------------------
// 5. CONTACT MESSAGES
// -------------------------------------------------------------
export async function sendContactMessage(payload) {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('[Supabase] Pesan disimpan secara simulasi.', payload)
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: { success: true, mock: true }, error: null }
  }

  try {
    const { data, error } = await supabase.from('messages').insert([
      {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        category: payload.category || 'Inquiry Landing Page',
        created_at: new Date().toISOString()
      }
    ])

    if (error) throw error
    return { data: { success: true }, error: null }
  } catch (err) {
    console.error('[Supabase] Error sending message:', err)
    return { data: null, error: err }
  }
}

export async function fetchMessagesFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: [], error: null }
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (err) {
    console.warn('[Supabase] Gagal mengambil messages:', err.message)
    return { data: [], error: err }
  }
}

export async function deleteMessageFromSupabase(id) {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false }
  }

  try {
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (error) throw error
    return { success: true }
  } catch (err) {
    console.error('[Supabase] Error deleting message:', err.message)
    return { success: false, error: err.message }
  }
}
