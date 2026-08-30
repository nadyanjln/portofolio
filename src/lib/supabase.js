import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if credentials are properly filled and not just dummy strings
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id')
  )
}

// Inisialisasi Supabase client jika konfigurasi tersedia
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

/**
 * Helper: Simpan pesan formulir kontak ke Supabase
 * @param {{ name: string, email: string, message: string }} payload
 */
export async function sendContactMessage(payload) {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('[Supabase] Credential belum disetel di .env. Pesan disimpan secara simulasi (mock mode).', payload)
    // Simulasi delay response 600ms
    await new Promise(resolve => setTimeout(resolve, 600))
    return { data: { success: true, mock: true }, error: null }
  }

  return await supabase.from('messages').insert([
    {
      name: payload.name,
      email: payload.email,
      message: payload.message,
      created_at: new Date().toISOString()
    }
  ])
}

/**
 * Helper: Ambil data projects dari Supabase table 'projects' (opsional)
 */
export async function fetchProjectsFromSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: 'Supabase not configured' }
  }

  return await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
}
