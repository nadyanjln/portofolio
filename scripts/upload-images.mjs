import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wruhxkwvombesziefvmn.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_ydynUzIVH7B9lgj82Rf5Ow_-Kop2yjJ'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

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

async function uploadImages() {
  console.log('🚀 Mulai proses upload gambar ke Supabase Storage (bucket: portfolio)...')
  
  for (const item of imagesToUpload) {
    try {
      console.log(`Mengunduh ${item.path}...`)
      const res = await fetch(item.sourceUrl)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      console.log(`Mengupload ${item.path} ke Supabase Storage...`)
      const { data, error } = await supabase.storage
        .from('portfolio')
        .upload(item.path, buffer, {
          contentType: item.contentType,
          upsert: true
        })

      if (error) {
        console.error(`❌ Gagal upload ${item.path}:`, error.message)
      } else {
        const { data: pubUrl } = supabase.storage.from('portfolio').getPublicUrl(item.path)
        console.log(`✅ Berhasil: ${item.path} -> ${pubUrl.publicUrl}`)
      }
    } catch (err) {
      console.error(`❌ Error ${item.path}:`, err.message)
    }
  }

  console.log('🏁 Selesai.')
}

uploadImages()
