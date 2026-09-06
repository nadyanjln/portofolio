import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wruhxkwvombesziefvmn.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndydWh4a3d2b21iZXN6aWVmdm1uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODA4MTAxMywiZXhwIjoyMTAzNjU3MDEzfQ.QZLu-tZxwQY4bi5OHv_UU_z3DZhInyg0fA25x4JqAGg'

// Create Supabase Admin Client
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setup() {
  console.log('🚀 [1/4] Memeriksa & Membuat Storage Bucket "portfolio"...')
  
  // 1. Create Storage Bucket
  const { data: buckets } = await supabaseAdmin.storage.listBuckets()
  const exists = buckets?.some(b => b.name === 'portfolio')
  
  if (!exists) {
    const { data: bData, error: bErr } = await supabaseAdmin.storage.createBucket('portfolio', {
      public: true,
      fileSizeLimit: 10485760
    })
    if (bErr) {
      console.error('❌ Gagal membuat bucket:', bErr.message)
    } else {
      console.log('✅ Bucket "portfolio" berhasil dibuat!')
    }
  } else {
    console.log('ℹ️ Bucket "portfolio" sudah ada.')
  }

  // 2. Upload Images to Supabase Storage
  console.log('\n🚀 [2/4] Mengunggah Gambar ke Supabase Storage...')
  const imagesToUpload = [
    {
      path: 'projects/zenith-analytics.jpg',
      sourceUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      contentType: 'image/jpeg'
    },
    {
      path: 'projects/luxe-ecommerce.jpg',
      sourceUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      contentType: 'image/jpeg'
    },
    {
      path: 'projects/taskflow.jpg',
      sourceUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      contentType: 'image/jpeg'
    },
    {
      path: 'projects/nexus-design-system.jpg',
      sourceUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
      contentType: 'image/jpeg'
    },
    {
      path: 'avatars/rian-pratama.jpg',
      sourceUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      contentType: 'image/jpeg'
    },
    {
      path: 'avatars/devi-anggraini.jpg',
      sourceUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      contentType: 'image/jpeg'
    },
    {
      path: 'avatars/arif-wicaksono.jpg',
      sourceUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      contentType: 'image/jpeg'
    }
  ]

  for (const img of imagesToUpload) {
    try {
      const fetchRes = await fetch(img.sourceUrl)
      if (!fetchRes.ok) throw new Error(`HTTP ${fetchRes.status}`)
      const arrayBuffer = await fetchRes.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { data: upData, error: upErr } = await supabaseAdmin.storage
        .from('portfolio')
        .upload(img.path, buffer, {
          contentType: img.contentType,
          upsert: true
        })

      if (upErr) {
        console.error(`❌ Gagal upload ${img.path}:`, upErr.message)
      } else {
        const { data: pubData } = supabaseAdmin.storage.from('portfolio').getPublicUrl(img.path)
        console.log(`✅ Gambar terupload: ${img.path} -> ${pubData.publicUrl}`)
      }
    } catch (e) {
      console.error(`❌ Error ${img.path}:`, e.message)
    }
  }

  // 3. Seed Database Tables
  console.log('\n🚀 [3/4] Menyinkronkan Data ke Tabel Database Supabase...')

  // Seed Projects
  const formattedProjects = projects.map(p => ({
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

  const { error: projErr } = await supabaseAdmin
    .from('projects')
    .upsert(formattedProjects, { onConflict: 'id' })

  if (projErr) {
    console.error('❌ Gagal seed projects:', projErr.message)
  } else {
    console.log(`✅ ${formattedProjects.length} Projects berhasil disimpan di database!`)
  }

  // Seed Skills
  const formattedSkills = skills.map(s => ({
    name: s.name,
    category: s.category,
    level: s.level,
    color: s.color || 'indigo'
  }))

  const { error: skillErr } = await supabaseAdmin
    .from('skills')
    .upsert(formattedSkills, { onConflict: 'name' })

  if (skillErr) {
    console.error('❌ Gagal seed skills:', skillErr.message)
  } else {
    console.log(`✅ ${formattedSkills.length} Skills berhasil disimpan di database!`)
  }

  // Seed Testimonials
  const formattedTestimonials = testimonials.map(t => ({
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    avatar: t.avatar,
    content: t.content,
    badge: t.badge
  }))

  const { error: testErr } = await supabaseAdmin
    .from('testimonials')
    .upsert(formattedTestimonials, { onConflict: 'id' })

  if (testErr) {
    console.error('❌ Gagal seed testimonials:', testErr.message)
  } else {
    console.log(`✅ ${formattedTestimonials.length} Testimonials berhasil disimpan di database!`)
  }

  // Seed Profile
  const { error: profErr } = await supabaseAdmin
    .from('profile_info')
    .upsert({
      id: 'nadya_profile',
      name: portfolioInfo.name,
      short_name: portfolioInfo.shortName,
      title: portfolioInfo.title,
      tagline: portfolioInfo.tagline,
      bio: portfolioInfo.bio,
      status: portfolioInfo.status,
      location: portfolioInfo.location,
      email: portfolioInfo.email,
      socials: portfolioInfo.socials
    }, { onConflict: 'id' })

  if (profErr) {
    console.error('❌ Gagal seed profile_info:', profErr.message)
  } else {
    console.log('✅ Profile info berhasil disimpan di database!')
  }

  // Seed Educations
  const formattedEducations = educations.map(e => ({
    degree: e.degree,
    school: e.school,
    year: e.year
  }))

  const { error: eduErr } = await supabaseAdmin
    .from('educations')
    .upsert(formattedEducations)

  if (eduErr) {
    console.error('❌ Gagal seed educations:', eduErr.message)
  } else {
    console.log(`✅ ${formattedEducations.length} Educations berhasil disimpan di database!`)
  }

  console.log('\n🎉 [4/4] SELURUH SETUP SUPABASE BERHASIL 100%!')
}

setup().catch(err => console.error('Fatal setup error:', err))
