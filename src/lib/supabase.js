import { createClient } from '@supabase/supabase-js'
import { 
  portfolioInfo as defaultInfo, 
  skills as defaultSkills, 
  projects as defaultProjects,
  testimonials as defaultTestimonials,
  educations as defaultEducations
} from '@/data/portfolioData'

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  'https://wruhxkwvombesziefvmn.supabase.co'

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY || 
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

// -------------------------------------------------------------
// 1. FETCH PROJECTS
// -------------------------------------------------------------
export async function fetchProjectsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: defaultProjects, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    if (data && data.length > 0) {
      // Map columns if needed
      const mapped = data.map(item => ({
        ...item,
        liveUrl: item.live_url || item.liveUrl || '',
        githubUrl: item.github_url || item.githubUrl || ''
      }))
      return { data: mapped, error: null }
    }

    return { data: defaultProjects, error: null }
  } catch (err) {
    console.warn('[Supabase] Gagal mengambil projects, menggunakan data default:', err.message)
    return { data: defaultProjects, error: err }
  }
}

// -------------------------------------------------------------
// 2. FETCH SKILLS
// -------------------------------------------------------------
export async function fetchSkillsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: defaultSkills, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error
    if (data && data.length > 0) {
      return { data, error: null }
    }

    return { data: defaultSkills, error: null }
  } catch (err) {
    console.warn('[Supabase] Gagal mengambil skills, menggunakan data default:', err.message)
    return { data: defaultSkills, error: err }
  }
}

// -------------------------------------------------------------
// 3. FETCH TESTIMONIALS ("Apa Kata Rekan & Stakeholder")
// -------------------------------------------------------------
export async function fetchTestimonialsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: defaultTestimonials, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error
    if (data && data.length > 0) {
      return { data, error: null }
    }

    return { data: defaultTestimonials, error: null }
  } catch (err) {
    console.warn('[Supabase] Gagal mengambil testimonials, menggunakan data default:', err.message)
    return { data: defaultTestimonials, error: err }
  }
}

// -------------------------------------------------------------
// 4. FETCH PROFILE INFO
// -------------------------------------------------------------
export async function fetchProfileFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: defaultInfo, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('profile_info')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    if (data) {
      return {
        data: {
          name: data.name || defaultInfo.name,
          shortName: data.short_name || defaultInfo.shortName,
          title: data.title || defaultInfo.title,
          tagline: data.tagline || defaultInfo.tagline,
          bio: data.bio || defaultInfo.bio,
          status: data.status || defaultInfo.status,
          location: data.location || defaultInfo.location,
          email: data.email || defaultInfo.email,
          socials: data.socials || defaultInfo.socials
        },
        error: null
      }
    }

    return { data: defaultInfo, error: null }
  } catch (err) {
    console.warn('[Supabase] Gagal mengambil profile_info, menggunakan data default:', err.message)
    return { data: defaultInfo, error: err }
  }
}

// -------------------------------------------------------------
// 5. FETCH EDUCATIONS
// -------------------------------------------------------------
export async function fetchEducationsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: defaultEducations, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('educations')
      .select('*')
      .order('id', { ascending: true })

    if (error) throw error
    if (data && data.length > 0) {
      return { data, error: null }
    }

    return { data: defaultEducations, error: null }
  } catch (err) {
    console.warn('[Supabase] Gagal mengambil educations:', err.message)
    return { data: defaultEducations, error: err }
  }
}

// -------------------------------------------------------------
// 6. SEND CONTACT MESSAGE
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

// -------------------------------------------------------------
// 6. SEED / SYNC LOCAL DATA TO SUPABASE
// -------------------------------------------------------------
export async function seedAllDataToSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, message: 'Supabase client not configured' }
  }

  const results = {
    projects: false,
    skills: false,
    testimonials: false,
    profile: false,
    errors: []
  }

  // 1. Projects
  try {
    const formattedProjects = defaultProjects.map(p => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      tags: p.tags,
      image: p.image,
      live_url: p.liveUrl || '',
      featured: p.featured ?? true,
      highlights: p.highlights || [],
      detail: p.detail || {}
    }))

    const { error: pErr } = await supabase
      .from('projects')
      .upsert(formattedProjects, { onConflict: 'id' })

    if (pErr) throw pErr
    results.projects = true
  } catch (err) {
    results.errors.push('Projects: ' + err.message)
  }

  // 2. Skills
  try {
    const formattedSkills = defaultSkills.map(s => ({
      name: s.name,
      category: s.category,
      level: s.level,
      color: s.color || 'indigo'
    }))

    const { error: sErr } = await supabase
      .from('skills')
      .upsert(formattedSkills, { onConflict: 'name' })

    if (sErr) throw sErr
    results.skills = true
  } catch (err) {
    results.errors.push('Skills: ' + err.message)
  }

  // 3. Testimonials
  try {
    const formattedTestimonials = defaultTestimonials.map(t => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      avatar: t.avatar,
      content: t.content,
      badge: t.badge
    }))

    const { error: tErr } = await supabase
      .from('testimonials')
      .upsert(formattedTestimonials, { onConflict: 'id' })

    if (tErr) throw tErr
    results.testimonials = true
  } catch (err) {
    results.errors.push('Testimonials: ' + err.message)
  }

  // 4. Profile
  try {
    const { error: profErr } = await supabase
      .from('profile_info')
      .upsert({
        id: 'nadya_profile',
        name: defaultInfo.name,
        short_name: defaultInfo.shortName,
        title: defaultInfo.title,
        tagline: defaultInfo.tagline,
        bio: defaultInfo.bio,
        status: defaultInfo.status,
        location: defaultInfo.location,
        email: defaultInfo.email,
        socials: defaultInfo.socials
      }, { onConflict: 'id' })

    if (profErr) throw profErr
    results.profile = true
  } catch (err) {
    results.errors.push('Profile: ' + err.message)
  }

  return {
    success: results.errors.length === 0,
    results
  }
}
