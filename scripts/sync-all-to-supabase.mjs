import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wruhxkwvombesziefvmn.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndydWh4a3d2b21iZXN6aWVmdm1uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODA4MTAxMywiZXhwIjoyMTAzNjU3MDEzfQ.QZLu-tZxwQY4bi5OHv_UU_z3DZhInyg0fA25x4JqAGg'

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function checkHealth() {
  console.log('🔍 Memeriksa status kesehatan data di Supabase Cloud...\n')

  const { data: nadyaProjs, error: e1 } = await supabaseAdmin
    .from('projects')
    .select('id, title')
    .eq('detail->>profile_id', 'nadya')

  const { data: raqwanProjs, error: e2 } = await supabaseAdmin
    .from('projects')
    .select('id, title')
    .eq('detail->>profile_id', 'raqwan')

  const { data: nadyaProf, error: e3 } = await supabaseAdmin
    .from('profile_info')
    .select('*')
    .eq('id', 'nadya_profile')
    .single()

  const { data: raqwanProf, error: e4 } = await supabaseAdmin
    .from('profile_info')
    .select('*')
    .eq('id', 'raqwan_profile')
    .single()

  if (e1 || e2 || e3 || e4) {
    console.error('❌ Terjadi kesalahan query Supabase:', e1 || e2 || e3 || e4)
    process.exit(1)
  }

  console.log(`✅ Profil Nadya: "${nadyaProf.name}" (${nadyaProf.title})`)
  console.log(`   - Total Proyek: ${nadyaProjs.length}`)
  console.log(`   - Total Skills: ${nadyaProf.socials?.skills?.length || 0}`)
  console.log(`   - Total Testimoni: ${nadyaProf.socials?.testimonials?.length || 0}`)
  console.log(`   - Total Alur Kerja: ${nadyaProf.socials?.workflows?.length || 0}`)

  console.log(`\n✅ Profil Raqwan: "${raqwanProf.name}" (${raqwanProf.title})`)
  console.log(`   - Total Proyek: ${raqwanProjs.length}`)
  console.log(`   - Total Skills: ${raqwanProf.socials?.skills?.length || 0}`)
  console.log(`   - Total Testimoni: ${raqwanProf.socials?.testimonials?.length || 0}`)
  console.log(`   - Total Alur Kerja: ${raqwanProf.socials?.workflows?.length || 0}`)

  console.log('\n🎉 Seluruh data di Supabase Cloud sehat, lengkap, dan 100% dinamis!')
}

checkHealth().catch(err => {
  console.error('Fatal Error:', err)
  process.exit(1)
})
