import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wruhxkwvombesziefvmn.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndydWh4a3d2b21iZXN6aWVmdm1uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODA4MTAxMywiZXhwIjoyMTAzNjU3MDEzfQ.QZLu-tZxwQY4bi5OHv_UU_z3DZhInyg0fA25x4JqAGg'

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

// Complete Nadya Dataset
const nadyaData = {
  profile: {
    id: 'nadya_profile',
    name: 'Nadya Najelina Salsabillah',
    short_name: 'Nadya',
    title: 'Product Manager & UI/UX Designer',
    tagline: 'Building digital products that simplify complex workflows, empower better decisions, and create meaningful value for both users and businesses.',
    bio: 'Computer Science Graduate (S1 Informatika, GPA: 3.97 / 4.00) from Gunadarma University with a multidisciplinary background in UI/UX design, software engineering, business, and AI, focused on Product Management. By combining user empathy, technical expertise, business thinking, and data-driven decision making, I strive to build products that simplify complex workflows, empower better decisions, and create meaningful value for both users and businesses.',
    status: 'Open for Product Management & UI/UX Roles',
    location: 'Depok, Jawa Barat, Indonesia',
    email: 'nadyanjln@gmail.com',
    socials: {
      github: 'https://github.com/nadyanjln',
      linkedin: 'https://www.linkedin.com/in/nadyanjln/',
      portfolio: 'https://www.linkedin.com/in/nadyanjln/',
      workflows: [
        {
          step: "01",
          phase: "Product Discovery & User Research",
          tagline: "Uncovering Deep User Insights",
          description: "Menganalisis kebutuhan pengguna, membedah lanskap pasar & kompetitor, serta memetakan problem-solution fit menggunakan riset kualitatif (wawancara) dan analitik kuantitatif.",
          deliverables: ["User Research & Interview Synthesis", "Competitive Landscape Analysis", "User Personas & Empathy Maps", "Problem Framing & HMW Statements"]
        },
        {
          step: "02",
          phase: "Product Strategy & Roadmap Definition",
          tagline: "Defining Value & Direction",
          description: "Menyusun Product Requirement Document (PRD), menyelaraskan ekspektasi stakeholder bisnis & teknis, serta memprioritaskan fitur MVP menggunakan framework teruji (RICE / MoSCoW).",
          deliverables: ["Comprehensive PRD & User Stories", "Information Architecture & User Flows", "MVP Scoping & Feature Roadmap", "Success Metrics (KPI/OKR) Framework"]
        },
        {
          step: "03",
          phase: "UI/UX Design & High-Fidelity Prototyping",
          tagline: "Crafting Intuitive Interfaces",
          description: "Merancang wireframe, antarmuka visual fidelity tinggi (UI), membangun design system & token library yang konsisten, serta interaksi mikro yang intuitif dan aksesibel (WCAG).",
          deliverables: ["Wireframes & User Journeys", "High-Fidelity UI Screen Designs", "Design System & Component Tokens", "Interactive Prototype for Validation"]
        },
        {
          step: "04",
          phase: "Usability Testing & Iterative Delivery",
          tagline: "Validating Impact & Continuous Growth",
          description: "Melakukan usability testing terpimpin kepada target pengguna, evaluasi metrik kegunaan (SUS/CSAT), kolaborasi handover dengan tim engineering, serta iterasi berkelanjutan pasca rilis.",
          deliverables: ["Usability Testing Findings & Report", "Design QA & Engineering Handover", "User Feedback Analysis & Iteration", "Post-Launch Growth Backlog"]
        }
      ],
      experiences: [
        {
          role: "Freelance UI/UX Designer",
          company: "PT Mitra Teknologi Gemilang",
          period: "Maret 2026",
          description: "Memimpin UX audit mendalam dan redesign 3 core safety flows untuk 20+ layar di aplikasi SaveMe serta pembuatan 8+ custom icon assets di PT Mitra Teknologi Gemilang.",
          tags: ["UX Audit", "Design System", "Custom Icons", "Figma", "Safety App"]
        },
        {
          role: "CFO & UI/UX Designer",
          company: "Recad (P2MW Kemendikbudristek)",
          period: "Feb 2024 — Nov 2024",
          description: "Memvalidasi kelayakan bisnis Recad, memenangkan pendanaan hibah P2MW Rp 12.000.000, merancang 6+ layar UI aksesibel, dan menyusun proyeksi keuangan.",
          tags: ["P2MW Awardee", "HealthTech", "Financial Modeling", "UI Design"]
        }
      ],
      milestones: [
        {
          title: "Best AI Integration Award 2025",
          organization: "International Business Pitch Fest",
          description: "Memimpin tim produk MeatSure meraih juara Best AI Integration atas inovasi monitoring IoT kesegaran rantai pasok produk laut."
        },
        {
          title: "P2MW Kemendikbudristek 2024 Grantee",
          organization: "Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI",
          description: "Meraih hibah pendanaan pengembangan usaha Rp 12.000.000 untuk platform Recad Medical Device Rental."
        },
        {
          title: "Top Graduate GPA 3.97 / 4.00",
          organization: "Universitas Gunadarma — S1 Informatika",
          description: "Lulus dengan predikat Cum Laude dan IPK 3.97 pada program studi Sarjana Informatika."
        }
      ],
      certifications: [
        { name: "Product Management Professional", issuer: "Google / Coursera", year: "2025" },
        { name: "UI/UX Design Masterclass & Systems", issuer: "Interaction Design Foundation", year: "2024" }
      ],
      faqs: [
        {
          question: "Apakah Anda terbuka untuk kesempatan kerja Full-Time atau Kontrak?",
          answer: "Ya, saya sangat terbuka untuk posisi Full-Time Product Manager, Associate Product Manager, maupun UI/UX Designer di perusahaan teknologi dan startup."
        },
        {
          question: "Bagaimana pendekatan Anda dalam memimpin perancangan produk dari nol?",
          answer: "Saya mengadopsi kerangka kerja Discovery-to-Delivery yang mengintegrasikan user research mendalam, perumusan PRD terstruktur, pembuatan prototype fidelity tinggi di Figma, hingga validasi metrik usability testing."
        },
        {
          question: "Tools apa saja yang menjadi keahlian utama Anda dalam merancang produk?",
          answer: "Figma, FigJam, Notion, Miro, Canva, Framework PRD & RICE Scoring, serta pemodelan keuangan dan strategi bisnis."
        }
      ]
    }
  },
  projects: [
    {
      id: "meatsure-ai-smart-monitoring",
      title: "MeatSure — AI Smart Monitoring Hub for Seafood Safety",
      category: "Product Strategy & AI IoT",
      description: "Platform IoT dan AI cerdas untuk monitoring kesegaran dan rantai pasok produk laut secara real-time, peraih penghargaan Best AI Integration pada International Business Pitch Fest 2025.",
      tags: ["Product Lead", "Best AI Integration 2025", "IoT Monitoring", "Product Strategy", "Figma", "User Research"],
      image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://www.linkedin.com/in/nadyanjln/",
      featured: true,
      highlights: [
        "Memimpin perumusan visi produk, target persona, value proposition, dan scope MVP berdasarkan riset kompetitor & pasar",
        "Mengorkestrasi tim lintas fungsi (4 orang) dalam merancang prototype dan business pitch hingga memenangkan Best AI Integration di International Business Pitch Fest 2025",
        "Menyusun arsitektur alur monitoring sensor IoT cerdas dengan antarmuka dashboard prediktif",
        "Memvalidasi product-market fit bersama stakeholder industri perikanan dan logistik cold-chain"
      ],
      detail: {
        duration: "November 2025",
        role: "Product Lead, Researcher, Product Developer",
        technology: "Product Strategy & IoT",
        tools: ["Figma", "FigJam", "Notion", "Product Discovery", "Market Research", "Pitch Deck"],
        overview: "MeatSure dirancang untuk menyelesaikan masalah pembusukan dan penurunan kualitas produk laut selama proses distribusi. Dengan integrasi sensor IoT dan algoritma AI deteksi kesegaran, MeatSure menyediakan dashboard terpusat bagi distributor untuk memantau kondisi produk secara langsung.",
        problem: {
          title: "The Core Challenge — Tantangan Kualitas Rantai Pasok Dingin & Risiko Pembusukan",
          description: "Mencegah pembusukan komoditas produk laut bernilai tinggi selama distribusi antar-pulau dengan visibilitas telemetri suhu dan gas secara instan.",
          points: [
            "Tingginya angka kerugian finansial distributor hingga 18-25% akibat pembusukan produk laut selama proses pengiriman rantai pasok dingin (cold chain).",
            "Kurangnya transparansi data real-time mengenai parameter kritis seperti suhu, kelembaban, dan emisi gas amonia di dalam kontainer logistik.",
            "Ketiadaan sistem peringatan dini (early warning system) dengan antarmuka prediktif yang mudah diakses dan dipahami oleh operator gudang dan manajer logistik."
          ]
        },
        results: [
          { metric: "Award Recognition", before: "Competitor", after: "Best AI Integration 2025", change: "International Winner" },
          { metric: "Monitoring Precision", before: "Manual Check (Hours)", after: "Real-Time (<5s)", change: "Instant Telemetry" },
          { metric: "Spoilage Risk Reduction", before: "High (18-25%)", after: "Predicted <4%", change: "80% Risk Mitigated" }
        ]
      }
    },
    {
      id: "aisee-ai-digital-marketing",
      title: "AiSee — AI-Powered Digital Marketing Platform for MSMEs",
      category: "UI/UX & Product Design",
      description: "Platform strategi pemasaran digital bertenaga AI untuk pelaku UMKM yang memprioritaskan rekomendasi konten kreator, insight performa kampanye, dan tracking progres.",
      tags: ["UI/UX Design", "User Research", "Wireframing", "Figma", "MSME Growth"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://www.linkedin.com/in/nadyanjln/",
      featured: true,
      highlights: [
        "Menentukan scope produk AiSee khusus untuk kebutuhan UMKM (analisis kampanye, rekomendasi kreator, tracking progres)",
        "Melakukan user research mendalam untuk validasi product-market fit dan penyusunan proposal pengembangan",
        "Menerjemahkan temuan riset pengguna ke dalam user flows, wireframes modular, dan UI design fidelity tinggi",
        "Merancang antarmuka dashboard analitik yang intuitif bagi pengguna non-teknis"
      ],
      detail: {
        duration: "Desember 2025",
        role: "UI/UX Designer & Researcher",
        technology: "UI/UX & AI Product",
        tools: ["Figma", "FigJam", "User Interview", "Wireframing", "Usability Testing"],
        overview: "AiSee mengatasi kesulitan pelaku UMKM dalam memilih influencer dan merancang strategi pemasaran digital yang efisien. Dengan kecerdasan buatan, platform ini mencocokkan profil bisnis dengan kreator yang memiliki audiens paling relevan.",
        problem: {
          title: "The Core Challenge — Tantangan Strategi Pemasaran Digital & Analitik UMKM",
          description: "Menjembatani keterbatasan literasi analitik digital pemilik usaha kecil dengan antarmuka rekomendasi pemasaran berbasis kecerdasan buatan.",
          points: [
            "Pelaku UMKM sering mengalami kerugian biaya iklan karena kesulitan memilih konten kreator/influencer yang memiliki profil audiens relevan dengan produk mereka.",
            "Platform analitik periklanan yang ada di pasar terlalu rumit dan dipenuhi istilah teknis sehingga menghambat UMKM dalam membaca performa kampanye.",
            "Minimnya panduan otomatis mengenai tren konten lokal dan kalkulasi estimasi Return on Investment (ROI) sebelum meluncurkan kampanye pemasaran."
          ]
        },
        results: [
          { metric: "Task Completion Rate", before: "52%", after: "91%", change: "+39% Task Success" },
          { metric: "Time on Campaign Setup", before: "45 menit", after: "8 menit", change: "5.6x Lebih Cepat" },
          { metric: "SUS Usability Score", before: "62 (Marginal)", after: "86.5 (Excellent)", change: "+24.5 Poin" }
        ]
      }
    },
    {
      id: "edufatahillah-ai-history-learning",
      title: "EduFatahillah-AI — AI-Based Interactive History Learning App",
      category: "EdTech & Child-Friendly UX",
      description: "Aplikasi pembelajaran sejarah interaktif ramah anak dengan fitur pengenalan artefak berbasis AI, narasi text-to-speech, dan kuis gamifikasi untuk siswa sekolah dasar.",
      tags: ["EdTech", "Child-Friendly UX", "Interactive Prototype", "Figma", "User Research", "Gamification"],
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://www.linkedin.com/in/nadyanjln/",
      featured: true,
      highlights: [
        "Merumuskan core features aplikasi sejarah interaktif (pengenalan artefak AI, narasi suara, dan kuis gamifikasi)",
        "Melakukan riset pengguna untuk memahami kebutuhan psikologis belajar anak-anak usia sekolah dasar",
        "Mendesain user flow, wireframe, dan prototype interaktif dengan visual cerah dan ramah anak",
        "Mengoptimalkan kemudahan navigasi agar siswa dapat belajar mandiri tanpa bimbingan orang tua yang rumit"
      ],
      detail: {
        duration: "September 2025",
        role: "UI/UX Designer & Researcher",
        technology: "EdTech UX",
        tools: ["Figma", "FigJam", "Child-Centered Design", "Prototyping", "Gamification"],
        overview: "EduFatahillah-AI merevolusi cara anak-anak mempelajari sejarah museum dan peninggalan budaya. Dengan memindai gambar artefak, aplikasi menceritakan kisah bersejarah secara interaktif dengan suara naratif yang menarik dan kuis berhadiah poin.",
        problem: {
          title: "The Core Challenge — Tantangan Minat Belajar Sejarah & Interaktivitas Siswa SD",
          description: "Mengubah materi pembelajaran sejarah yang statis dan tekstual menjadi pengalaman interaktif visual berbasis gamifikasi untuk anak sekolah dasar.",
          points: [
            "Materi sejarah di buku teks konvensional dirasa kaku, membosankan, dan kurang visual sehingga siswa sekolah dasar cepat kehilangan fokus dalam belajar.",
            "Antarmuka aplikasi edukasi umum sering kali terlalu padat teks dan tidak ramah bagi pola interaksi serta perkembangan motorik visual anak-anak.",
            "Kurangnya elemen gamifikasi interaktif dan narasi suara yang imersif saat siswa mempelajari artefak budaya di museum maupun di rumah."
          ]
        },
        results: [
          { metric: "Student Engagement Duration", before: "6 menit", after: "28 menit", change: "4.6x Lebih Lama" },
          { metric: "Quiz Completion Rate", before: "44%", after: "93%", change: "+49% Penyelesaian" },
          { metric: "Child Navigation Ease", before: "3.2 / 5", after: "4.8 / 5", change: "+50% Kemudahan" }
        ]
      }
    },
    {
      id: "recad-medical-equipment-rental",
      title: "Recad — Medical Equipment Rental & Financing Platform",
      category: "HealthTech & Digital Business",
      description: "Platform penyewaan alat medis terjangkau peraih pendanaan P2MW Kemendikbudristek Rp 12 Juta, mengombinasikan desain UI inklusif dan model bisnis teruji.",
      tags: ["P2MW Awardee", "HealthTech", "UI Design", "Financial Modeling", "Figma", "Social Impact"],
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://www.linkedin.com/in/nadyanjln/",
      featured: false,
      highlights: [
        "Memvalidasi kelayakan bisnis Recad melalui analisis pasar, proyeksi keuangan, dan memenangkan hibah P2MW Rp 12.000.000",
        "Merancang 6+ layar UI yang aksesibel dan mudah digunakan oleh pasien maupun keluarga lansia",
        "Mengelola penganggaran dan memproduksi 43+ konten media sosial untuk akuisisi pengguna awal",
        "Menyusun alur verifikasi deposit dan penyewaan alat medis yang transparan dan aman"
      ],
      detail: {
        duration: "Februari 2024 — November 2024",
        role: "Chief Financial Officer (CFO), UI/UX Designer & Social Media Manager",
        technology: "HealthTech UI/UX",
        tools: ["Figma", "Financial Modeling", "Canva", "P2MW Framework", "User Testing"],
        overview: "Recad menjembatani kesenjangan akses alat-alat kesehatan esensial seperti konsentrator oksigen dan tempat tidur medis bagi pasien rawat jalan dengan sistem sewa fleksibel yang terjangkau.",
        problem: {
          title: "The Core Challenge — Tantangan Aksesibilitas & Skema Sewa Alat Medis Pasien",
          description: "Menghadirkan layanan sewa peralatan medis darurat yang transparan, mudah diverifikasi secara daring, dan aksesibel bagi keluarga pasien lansia.",
          points: [
            "Tingginya harga pembelian alat-alat kesehatan esensial (seperti konsentrator oksigen dan tempat tidur medis) sangat memberatkan keluarga pasien rawat jalan.",
            "Proses penyewaan alat kesehatan konvensional tidak memiliki standardisasi kebersihan, kepastian jadwal pengantaran, dan transparansi biaya deposit.",
            "Desain antarmuka pemesanan alat kesehatan sering kali membingungkan keluarga pasien lansia yang membutuhkan alur registrasi cepat dan sederhana."
          ]
        },
        results: [
          { metric: "Grant Funding Secured", before: "IDR 0", after: "IDR 12,000,000", change: "P2MW 2024 Winner" },
          { metric: "Social Content Reach", before: "0", after: "43+ Publications", change: "Broad Awareness" },
          { metric: "Rental Booking Ease", before: "Offline Phone Call", after: "1-Click Online Booking", change: "100% Digitalized" }
        ]
      }
    },
    {
      id: "saveme-safety-flows-redesign",
      title: "SaveMe — Core Safety Flows & Custom Icon UI Redesign",
      category: "UX Audit & Design Systems",
      description: "UX audit mendalam dan redesign 3 core safety flows untuk 20+ layar di aplikasi SaveMe serta pembuatan 8+ custom icon assets di PT Mitra Teknologi Gemilang.",
      tags: ["UX Audit", "Design System", "Custom Icons", "Figma", "Safety App", "PT MTG"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://www.linkedin.com/in/nadyanjln/",
      featured: false,
      highlights: [
        "Memimpin audit UX dan merancang ulang 3 alur keselamatan inti SaveMe pada 20+ layar aplikasi",
        "Meningkatkan kejelasan navigasi darurat dan menyelaraskan keputusan desain dengan target bisnis",
        "Membuat 8+ custom icon dan UI asset menggunakan Figma dan Canva untuk konsistensi visual",
        "Mempersingkat waktu respons pengguna dalam memicu sinyal darurat (SOS action)"
      ],
      detail: {
        duration: "Maret 2026",
        role: "Freelance UI/UX Designer at PT. MTG",
        technology: "UX Audit & Design System",
        tools: ["Figma", "Canva", "UX Audit", "Iconography", "Design Tokens"],
        overview: "SaveMe adalah aplikasi keamanan personal dan respons darurat. Redesign difokuskan pada penyederhanaan alur navigasi saat situasi kritis agar pengguna dapat mengaktifkan alarm dan mengirim lokasi dalam hitungan detik.",
        problem: {
          title: "The Core Challenge — Tantangan Alur Respons Darurat & Ergonomi Navigasi Kritis",
          description: "Menyederhanakan alur antarmuka darurat (SOS) agar dapat diakses seketika di bawah 2 detik saat pengguna menghadapi situasi panik.",
          points: [
            "Alur navigasi aplikasi keselamatan sebelumnya memiliki tombol yang terlalu padat dan letak aksi darurat yang tidak ergonomis saat pengguna berada dalam kondisi panik.",
            "Ikonografi visual standar aplikasi tidak memiliki hierarki pembeda yang jelas antara fitur pelaporan rutin dan pemicu sirene darurat (SOS action).",
            "Fragmentasi gaya visual di lebih dari 20 layar aplikasi menurunkan kredibilitas kepercayaan pengguna terhadap keandalan sistem respons keselamatan."
          ]
        },
        results: [
          { metric: "Emergency Trigger Speed", before: "6.4 detik", after: "1.8 detik", change: "3.5x Lebih Cepat" },
          { metric: "Screen Consistency", before: "Fragmented", after: "20+ Redesigned Screens", change: "Unified System" },
          { metric: "Custom Icons Delivered", before: "Generic Stock", after: "8+ Custom Vectors", change: "100% Custom Assets" }
        ]
      }
    }
  ]
}

// Complete Raqwan Dataset
const raqwanData = {
  profile: {
    id: 'raqwan_profile',
    name: 'Muhammad Raqwan Kauthar',
    short_name: 'Raqwan',
    title: 'Head of Artificial Intelligence | AI & Data Specialist',
    tagline: 'Head of Artificial Intelligence at PT Mitra Teknologi Gemilang — Architecting MarketForge Agentic AI, high-throughput Financial Screening Engines, GraphRAG, and production deep learning systems.',
    bio: 'Head of Artificial Intelligence di PT Mitra Teknologi Gemilang dan Lulusan Sarjana Informatika (S1 Informatika, IPK 3.78) dari Universitas Gunadarma dengan 2+ tahun pengalaman gabungan kepemimpinan industri dan riset advanced deep learning. Terspesialisasi dalam merancang arsitektur MarketForge Agentic AI, sub-millisecond Financial Screening Engine, orkestrasi distributed ML (Ray), GraphRAG (FalkorDB + Cognee), serta telemetri WebSocket real-time. Berdedikasi untuk menerjemahkan riset AI mutakhir menjadi sistem produksi yang scalable dan berkecepatan tinggi (high-throughput).',
    status: 'Head of Artificial Intelligence at PT Mitra Teknologi Gemilang',
    location: 'Depok, Jawa Barat, Indonesia',
    email: 'mraqwan471@gmail.com',
    socials: {
      github: 'https://github.com/Rqwannn',
      linkedin: 'https://www.linkedin.com/in/muhammad-raqwan-kauthar-5427b221a/',
      workflows: [
        {
          step: "01",
          phase: "Problem Framing & Data Engineering",
          tagline: "Building Robust Foundations",
          description: "Menganalisis kebutuhan problem bisnis & teknis, merancang arsitektur pipeline data ingestion multi-sumber (structured, vision, audio, graph), validasi integritas, serta Exploratory Data Analysis (EDA) mendalam.",
          deliverables: ["Data Ingestion & ETL Pipelines", "Exploratory Data Analysis (EDA)", "Feature Engineering & Data Cleansing", "Data Schema & Ontology Definition"]
        },
        {
          step: "02",
          phase: "AI & Deep Learning Architecture",
          tagline: "Designing Frontier Intelligence",
          description: "Merancang arsitektur model kecerdasan buatan mutakhir — mencakup Deep Learning (CNN/Vision), NLP/LLM, Agentic Systems, hingga GraphRAG dan formulasi custom loss functions sesuai target akurasi.",
          deliverables: ["Model Selection & Architecture Design", "Training Pipeline & Fine-Tuning", "Loss Formulation & Evaluation Metrics", "Multi-Agent & Graph Reasoning Systems"]
        },
        {
          step: "03",
          phase: "Optimization & Distributed Scaling",
          tagline: "Maximizing Speed & Throughput",
          description: "Mengoptimalkan performa inferensi melalui kuantisasi (INT8/FP16/TFLite), orkestrasi komputasi terdistribusi (GPU clusters/Ray), reduksi latensi, serta stress-testing beban konkuren tinggi.",
          deliverables: ["Quantization & Tensor Optimization", "Distributed Compute Orchestration", "Latency Reduction & Throughput Benchmarking", "Robustness & Edge Optimization"]
        },
        {
          step: "04",
          phase: "Production Deployment & MLOps Lifecycle",
          tagline: "Production-Grade AI Reliability",
          description: "Mendeploy microservices API performa tinggi ke production, integrasi real-time streaming, implementasi automated CI/CD pipelines, serta telemetry monitoring performa dan data drift secara kontinu.",
          deliverables: ["Production API & Real-Time Streaming", "Automated CI/CD Deployment", "Real-Time Telemetry & Observability", "Model Monitoring & Drift Detection"]
        }
      ],
      experiences: [
        {
          role: "Head of Artificial Intelligence",
          company: "PT Mitra Teknologi Gemilang",
          period: "Jul 2026 — Present",
          description: "Memimpin divisi AI merancang MarketForge Agentic AI, sub-millisecond financial screening engine untuk 900+ emiten, WebSocket live ticker stream, dan orkestrasi distributed ML dengan Ray.",
          tags: ["Head of AI", "MarketForge", "Agentic AI", "Distributed ML", "FastAPI"]
        },
        {
          role: "Lead AI Engineer Freelance",
          company: "Pertamina Patra Niaga",
          period: "Jan 2026 — Apr 2026",
          description: "Membangun AI Knowledge Graph dan sistem GraphRAG enterprise berbasis FalkorDB dan Cognee untuk mitigasi halusinasi model AI serta ekstraksi dokumen teknis korporat.",
          tags: ["GraphRAG", "FalkorDB", "Cognee", "LLM", "Knowledge Graph"]
        },
        {
          role: "Data Engineer Intern",
          company: "Accenture",
          period: "Apr 2026 — Jul 2026",
          description: "Mengembangkan platform pemantauan real-time dan alerting 32 metrik telemetri hulu energi migas dengan PostgreSQL dan Grafana, mereduksi visual query latency hingga 30%.",
          tags: ["Data Engineering", "PostgreSQL", "Grafana", "Accenture"]
        }
      ],
      milestones: [
        {
          title: "Best Capstone Project 2026 Champion",
          organization: "Dicoding x Accenture Asah 2026",
          description: "Memimpin tim meraih Juara 1 Best Capstone Project dengan karya 'AI Learning Insight' berbasis Multi-Agent System dan Explainable AI (LIME)."
        },
        {
          title: "Top 10 Best Team Samsung Innovation Campus 2024",
          organization: "Samsung Electronics Indonesia (SIC Batch 5)",
          description: "Terpilih sebagai Top 10 Tim Terbaik Nasional dengan inovasi Reclaimyt — AI-Powered Smart Conveyor Waste Classification System."
        },
        {
          title: "Runner-up InHacks Hackathon Indonesia 2023",
          organization: "Google Developer Student Clubs (GDSC ITTP)",
          description: "Meraih Juara 2 Nasional pada kompetisi inovasi aplikasi mobile 2Gether dengan on-device deep learning object detection (TensorFlow Lite)."
        }
      ],
      certifications: [
        { name: "TensorFlow Certified Developer & Deep Learning Specialist", issuer: "Google / DeepLearning.AI", year: "2025" },
        { name: "Multi-Agent Systems & LangGraph Architecture", issuer: "LangChain / DeepLearning.AI", year: "2026" },
        { name: "Advanced Data Engineering & Distributed Systems", issuer: "Accenture & Dicoding", year: "2026" }
      ],
      faqs: [
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
      ]
    }
  },
  projects: [
    {
      id: "marketforge-securities-platform",
      title: "MarketForge — Autonomous Securities Intelligence & Real-Time Screening Engine",
      category: "FinTech & Agentic AI",
      description: "Platform intelijen pasar modal sekuritas berbasis MarketForge Agentic AI dengan sub-millisecond screening engine untuk 900+ emiten, analisis kuantitatif teknikal & fundamental, serta WebSocket real-time ticker stream.",
      tags: ["MarketForge", "Agentic AI", "Screening Engine", "FastAPI", "WebSockets", "Quantitative Finance", "Python", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://app.notion.com/p/Sekuritas-Platform-16a4bf881acb83d89a3e8196f470a4c8",
      featured: true,
      highlights: [
        "Arsitektur MarketForge Agentic AI dengan multi-agent collaboration untuk sentimen berita emiten, laporan keuangan, dan quantitative alpha signals",
        "Real-Time High-Throughput Financial Screening Engine memproses ratusan instrumen saham dengan latency <12ms berdasarkan indikator teknikal & fundamental",
        "Backend microservices performa tinggi berbasis FastAPI & asynchronous WebSocket streaming untuk distribusi live market data dan portfolio risk metrics",
        "Integrasi database relasional PostgreSQL dan vector store terindeks untuk retrieval histori emiten dan deteksi anomali volume transaksi pasar"
      ],
      detail: {
        duration: "Jul 2026 — Present",
        role: "Head of Artificial Intelligence & Lead Financial AI Architect at PT. MTG",
        technology: "Agentic AI",
        tools: ["MarketForge Agentic AI", "FastAPI", "WebSockets", "Python", "PostgreSQL", "Pandas", "TA-Lib", "Docker"],
        overview: "MarketForge dirancang sebagai platform intelijen pasar saham komprehensif bagi sekuritas dan institusi finansial. Menggabungkan Autonomous Agentic reasoning dengan screening engine berkecepatan tinggi, analis dan investor dapat menyaring ribuan saham, melakukan stress-testing portofolio, dan menerima rekomendasi berbasis data secara instan.",
        problem: {
          title: "The Core Challenge — Tantangan Kuantitatif & Skalabilitas Pasar Modal",
          description: "Pasar modal menuntut pemrosesan data real-time dari 900+ emiten dengan ribuan variabel teknikal, fundamental, dan sentimen berita tanpa adanya latensi eksekusi.",
          points: [
            "Sistem screening konvensional berbasis REST API lambat dalam memproses multi-kriteria teknikal & fundamental secara real-time saat jam bursa aktif.",
            "Analisis laporan keuangan kuartalan dan ekstraksi sentimen berita 900+ emiten membutuhkan waktu manual berjam-jam sehingga sering tertinggal momentum pasar modal.",
            "Kebutuhan streaming WebSocket berlatensi sub-milidetik untuk mendistribusikan live tick market data kepada ribuan koneksi concurrent tanpa memory leak."
          ]
        },
        results: [
          { metric: "Screening Latency", before: "1.4s", after: "12ms", change: "116x Lebih Cepat" },
          { metric: "Supported Tickers", before: "100 manual", after: "900+ real-time", change: "Full Market Coverage" },
          { metric: "Agent Reasoning Accuracy", before: "74%", after: "95.8%", change: "+21.8% Akurasi" },
          { metric: "WebSocket Concurrency", before: "50 clients", after: "5,000+ streams", change: "100x Concurrency" }
        ]
      }
    },
    {
      id: "ai-learning-insight",
      title: "AI Learning Insight — Multi-Agent System with Explainable AI (LIME)",
      category: "Multi-Agent & XAI",
      description: "Platform analitik edukasi cerdas berbasis arsitektur Multi-Agent System dengan Agent Communication Protocol otonom serta Explainable AI (LIME) peraih penghargaan Best Capstone Project 2026 (Dicoding x Accenture Asah).",
      tags: ["Multi-Agent System", "Explainable AI", "LIME", "Supervised Learning", "Best Capstone 2026", "Python", "FastAPI"],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://github.com/Rqwannn",
      featured: true,
      highlights: [
        "Memimpin tim lintas disiplin memenangkan Best Capstone Project 2026 di Dicoding x Accenture Asah",
        "Merancang arsitektur Multi-Agent System dengan autonomous Agent Communication Protocol untuk pertukaran info antar agen cerdas",
        "Mengembangkan model Supervised Learning transparan dengan LIME (Explainable AI) agar insight sistem dapat diinterpretasi pengguna",
        "Pipeline analitik data terstruktur untuk memetakan kekuatan belajar dan rekomendasi kurikulum adaptif"
      ],
      detail: {
        duration: "Jan 2026 — Mei 2026",
        role: "Team Lead & Lead AI Architect",
        technology: "Multi-Agent System",
        tools: ["Multi-Agent Systems", "LIME (Explainable AI)", "Supervised Learning", "PyTorch", "FastAPI", "Python"],
        overview: "AI Learning Insight diciptakan untuk memecahkan problem 'black-box' pada model kecerdasan buatan dalam dunia pendidikan. Dengan mengimplementasikan Explainable AI (LIME) dan arsitektur Multi-Agent, setiap rekomendasi belajar yang dihasilkan memiliki audit trail dan penjelasan bobot fitur yang jelas.",
        problem: {
          title: "The Core Challenge — Tantangan Transparansi Model & Orkestrasi Multi-Agen",
          description: "Rekomendasi kurikulum adaptif harus dapat dipertanggungjawabkan secara logis dan mudah dipahami oleh pendidik maupun siswa tanpa kehilangan fleksibilitas multi-agen cerdas.",
          points: [
            "Model AI konvensional bersifat 'black-box' sehingga guru dan siswa tidak memahami alasan logis di balik rekomendasi materi belajar yang diberikan.",
            "Koordinasi antar agen cerdas (profiling agent, curriculum agent, assessment agent) memerlukan protokol komunikasi asinkron yang terstruktur dan bebas deadlock.",
            "Diperlukan inferensi berlatensi rendah agar insight diagnostik performa siswa dapat dikalkulasi secara instan saat sesi evaluasi berlangsung."
          ]
        },
        results: [
          { metric: "Award Recognition", before: "Nominated", after: "Best Capstone 2026", change: "Champion 1st Place" },
          { metric: "Model Explainability", before: "0% (Black box)", after: "100% LIME Interpretable", change: "Full Transparency" },
          { metric: "Agent Response Latency", before: "2.1s", after: "240ms", change: "8.7x Lebih Cepat" }
        ]
      }
    },
    {
      id: "reclaimyt-smart-conveyor-ai",
      title: "Reclaimyt — AI-Powered Smart Conveyor Waste Classification System",
      category: "Computer Vision & IoT",
      description: "Sistem conveyor pintar bertenaga Deep Learning Computer Vision untuk pemilahan sampah otomatis di bank sampah, peraih Top 10 Best Team Samsung Innovation Campus Batch 5 (2024).",
      tags: ["Computer Vision", "Deep Learning", "TensorFlow", "Samsung Innovation Campus", "CNN", "Python"],
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://github.com/Rqwannn",
      featured: true,
      highlights: [
        "Terpilih sebagai Top 10 Best Team Samsung Innovation Campus Batch 5 (2024) oleh Samsung Electronics Indonesia",
        "Mengembangkan model Deep Learning Convolutional Neural Network (CNN) untuk klasifikasi sampah multi-kategori secara real-time",
        "Merancang solusi end-to-end terintegrasi sistem konveyor fisik untuk mengoptimalkan operasional bank sampah",
        "Integrasi model machine learning performa tinggi ke dalam web dashboard interaktif untuk monitoring data pemilahan"
      ],
      detail: {
        duration: "Jul 2024 — Nov 2024",
        role: "Lead Deep Learning & Computer Vision Engineer",
        technology: "Computer Vision",
        tools: ["TensorFlow", "Computer Vision (CNN)", "Python", "Flask", "OpenCV", "IoT Sensors"],
        overview: "Reclaimyt mengotomatiskan proses pemilahan sampah fisik pada jalur conveyor bank sampah menggunakan kamera optical sensor dan model CNN berkecepatan tinggi, memitigasi risiko kesehatan pekerja dan melipatgandakan throughput pemilahan.",
        problem: {
          title: "The Core Challenge — Tantangan Klasifikasi Sampah Fisik pada Jalur Konveyor",
          description: "Mengidentifikasi dan memilah sampah fisik multi-kategori secara visual pada kecepatan gerak konveyor tinggi dengan akurasi konsisten.",
          points: [
            "Pemilahan sampah manual di bank sampah sangat lambat, berisiko tinggi terhadap kesehatan pekerja, dan rentan terhadap kesalahan klasifikasi jenis material plastik.",
            "Variasi kondisi fisik sampah di lapangan (terlipat, kotor, basah, dan saling bertumpuk) menyulitkan ekstraksi fitur visual model Computer Vision standar.",
            "Diperlukan sinkronisasi inferensi model AI secara real-time dengan aktuator mekanik pneumatik konveyor dalam rentang toleransi di bawah 50 milidetik."
          ]
        },
        results: [
          { metric: "Classification Accuracy", before: "65% manual", after: "94.2% AI", change: "+29.2% Akurasi" },
          { metric: "Sorting Throughput", before: "12 pcs / min", after: "60 pcs / min", change: "5x Lebih Cepat" },
          { metric: "SIC Batch 5 Ranking", before: "Top 500+", after: "Top 10 Finalist", change: "Top 10 Nationally" }
        ]
      }
    },
    {
      id: "twogether-ondevice-object-detection",
      title: "2Gether — Mobile Platform with On-Device Deep Learning Object Detection",
      category: "Mobile AI & Edge ML",
      description: "Platform mobile Android dengan model deep learning on-device untuk alur daur ulang sampah dan klasifikasi material otomatis, peraih Runner-up InHacks Hackathon Indonesia 2023 (Google DSC ITTP).",
      tags: ["On-Device AI", "Object Detection", "TensorFlow Lite", "Android", "InHacks Runner-Up", "Python"],
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://github.com/Rqwannn",
      featured: false,
      highlights: [
        "Meraih Runner-up pada Innovation Competition Hackathon Indonesia 2023 (InHacks) Google DSC ITTP",
        "Mengembangkan aplikasi mobile Android dengan arsitektur end-to-end untuk manajemen alur daur ulang sampah",
        "Mendeploy sistem deteksi objek deep learning terkuantisasi (TFLite) langsung on-device untuk klasifikasi presisi tinggi",
        "Pengoperasian deteksi offline tanpa memerlukan koneksi internet stabil di lapangan"
      ],
      detail: {
        duration: "Nov 2023",
        role: "Lead Mobile ML Developer",
        technology: "Mobile ML / Edge AI",
        tools: ["TensorFlow Lite", "MobileNet", "Android SDK", "Java / Kotlin", "Python"],
        overview: "2Gether mempermudah masyarakat umum dalam mengidentifikasi material daur ulang hanya dengan mengarahkan kamera smartphone. Model deep learning terkuantisasi berjalan langsung di chipset ponsel tanpa perlu mengirim gambar ke server cloud.",
        problem: {
          title: "The Core Challenge — Tantangan Komputasi On-Device & Konektivitas Offline",
          description: "Menjalankan deep neural network secara real-time pada resource komputasi terbatas perangkat mobile tanpa menguras baterai dan memori.",
          points: [
            "Model deteksi objek standar (YOLO/SSD) memiliki ukuran tensor yang terlalu besar (>80MB) dan membebani RAM pada smartphone Android kelas entry-level.",
            "Keterbatasan jaringan internet seluler di area tempat pembuangan akhir (TPA) dan pelosok menuntut seluruh pipeline AI berjalan 100% offline langsung pada chipset ponsel.",
            "Presisi deteksi material harus tetap konsisten dan akurat dalam kondisi pencahayaan ekstrem, bayangan objek, serta sudut kamera yang bervariasi."
          ]
        },
        results: [
          { metric: "Hackathon Result", before: "Participant", after: "Runner-Up Champion", change: "2nd Place Nationally" },
          { metric: "On-Device Inference", before: "450ms", after: "45ms", change: "10x Lebih Cepat" },
          { metric: "Model Size", before: "84 MB", after: "6.2 MB (TFLite)", change: "92.6% Lebih Ringan" }
        ]
      }
    },
    {
      id: "pertamina-graphrag-knowledge-graph",
      title: "AI Knowledge Graph & GraphRAG System — Pertamina Patra Niaga",
      category: "Knowledge Graph & LLM",
      description: "Pembangunan Knowledge Graph enterprise berskala besar menggabungkan FalkorDB dan Cognee untuk mitigasi halusinasi AI dan ekstraksi relasi semantik dokumen korporat.",
      tags: ["GraphRAG", "FalkorDB", "Cognee", "LLM", "Python", "FastAPI"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://github.com/Rqwannn",
      featured: true,
      highlights: [
        "Fusi FalkorDB dan Cognee untuk mensistematisasi dataset korporat kompleks Pertamina Patra Niaga",
        "Pencegahan halusinasi model AI melalui kerangka kerja GraphRAG berbasis multi-dimensional entity mapping",
        "Transformasi dokumentasi teknis non-terstruktur menjadi jaringan semantik terstruktur dan searchable",
        "Peningkatan presisi retrieval informasi dokumen hingga 96.4% dibanding traditional vector search"
      ],
      detail: {
        duration: "4 bulan (Jan — Apr 2026)",
        role: "Lead AI Engineer Freelance",
        technology: "Knowledge Graph & GraphRAG",
        tools: ["FalkorDB", "Cognee", "GraphRAG", "Python", "FastAPI", "Docker"],
        overview: "Proyek GraphRAG untuk Pertamina Patra Niaga dirancang untuk memetakan dan menghubungkan ribuan dokumen teknis, SOP, dan dataset operasional ke dalam satu Graph Database terpadu. Dengan integrasi FalkorDB dan Cognee, query LLM tidak hanya mengandalkan vector similarity biasa, melainkan menelusuri graf relasi entitas sehingga bebas dari halusinasi dan memiliki audit trail yang jelas.",
        problem: {
          title: "The Core Challenge — Tantangan Halusinasi LLM & Fragmentasi Data Korporat",
          description: "Menghubungkan ribuan SOP dan manual teknis yang terisolasi agar dapat dijawab secara tepat oleh AI tanpa risiko kesalahan data aset vital.",
          points: [
            "Dataset teknis operasional korporat Pertamina Patra Niaga sangat masif, kompleks, dan terfragmentasi di berbagai format dokumen PDF, manual teknis, dan database relasional.",
            "Model RAG konvensional (dense vector similarity) sering mengalami halusinasi dan kehilangan konteks relasional hierarki antar aset, kilang, dan alur logistik migas.",
            "Dibutuhkan sistem pencarian informasi berpresisi tinggi dengan audit trail sumber referensi dokumen yang dapat diverifikasi keabsahannya secara langsung."
          ]
        },
        results: [
          { metric: "Retrieval Precision", before: "68.2%", after: "96.4%", change: "+28.2% Presisi" },
          { metric: "Hallucination Rate", before: "18.5%", after: "1.2%", change: "-93.5% Halusinasi" },
          { metric: "Query Traversal Latency", before: "3.2s", after: "280ms", change: "11.4x Lebih Cepat" }
        ]
      }
    },
    {
      id: "upstream-energy-data-monitoring",
      title: "Real-Time Data Monitoring & Alerting Platform — Upstream Energy",
      category: "Data Engineering",
      description: "Sistem pemantauan dan alerting telemetri 32 metrik operasional hulu energi secara real-time dengan sinkronisasi PostgreSQL ke Grafana (30% latency reduction).",
      tags: ["Data Engineering", "PostgreSQL", "Grafana", "SQL", "Energy Upstream"],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://github.com/Rqwannn",
      featured: true,
      highlights: [
        "Visualisasi 32 metrik kunci operasional hulu migas dengan presisi dan alerting instan",
        "Perancangan arsitektur visualisasi data dan mockups fidelity tinggi untuk stakeholder decision-making",
        "Eksekusi optimasi query SQL kompleks pada database PostgreSQL dengan reduksi visual latency 30%",
        "Integrasi automated threshold alerts untuk deteksi anomali tekanan dan throughput pipa"
      ],
      detail: {
        duration: "Apr 2026 — Jul 2026",
        role: "Data Engineer Intern at Accenture",
        technology: "Data Engineering",
        tools: ["PostgreSQL", "Grafana", "Advanced SQL", "Data Modeling", "Python"],
        overview: "Platform monitoring data hulu energi ini menyinkronkan data sensor telemetri lapangan secara kontinu ke dashboard analitik terpusat, memungkinkan para insinyur dan pengambil keputusan memantau efisiensi produksi secara langsung tanpa jeda waktu.",
        problem: {
          title: "The Core Challenge — Tantangan Latensi Telemetri & Skalabilitas Monitoring Energi",
          description: "Menghubungkan puluhan aliran data sensor sumur dan pipa berkecepatan tinggi ke dashboard visualisasi tanpa penurunan performa query.",
          points: [
            "Data sensor operasional sumur dan pipa migas hulu mengalir ribuan tick per detik sehingga query analitik konvensional mengalami lag hingga lebih dari 1.8 detik.",
            "Minimnya sentralisasi visualisasi telemetri menyebabkan engineer lapangan kesulitan memantau 32 metrik kunci secara terpadu dalam satu layar dashboard.",
            "Ketiadaan sistem automated threshold alerting instan meningkatkan risiko keterlambatan mitigasi lonjakan tekanan pipa dan fluktuasi laju alir fluida."
          ]
        },
        results: [
          { metric: "Visual Latency", before: "1.8s", after: "1.2s", change: "-30% Latency" },
          { metric: "Monitored Metrics", before: "8 Manual", after: "32 Automated", change: "4x Coverage" },
          { metric: "Alert Response Time", before: "15 min", after: "Real-time (<5s)", change: "Instant Alerts" }
        ]
      }
    },
    {
      id: "slogmate-national-police-agentic",
      title: "SLOGMate — Real-Time WebSocket Agentic AI for National Police",
      category: "Agentic AI",
      description: "Arsitektur Agentic AI terintegrasi WebSocket untuk otomasi alokasi sumber daya logistik dan pembuatan dokumen keputusan berbasis data untuk Kepolisian Negara Republik Indonesia.",
      tags: ["Agentic AI", "WebSocket", "LangGraph", "FastAPI", "Public Sector"],
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://github.com/Rqwannn",
      featured: false,
      highlights: [
        "Arsitektur Agentic AI otonom terintegrasi WebSocket streaming untuk koordinasi logistik taktis",
        "Otomasi penjadwalan armada dan kalkulasi ketersediaan logistik di seluruh wilayah kepolisian",
        "Pembuatan dokumen formal dan laporan berbasis data secara otomatis dengan zero formatting error",
        "Peningkatan kecepatan alokasi logistik darurat dari hitungan jam menjadi hitungan detik"
      ],
      detail: {
        duration: "Mar 2025 — Apr 2026",
        role: "Machine Learning & AI Engineer at PT. MTG",
        technology: "Agentic AI",
        tools: ["LangGraph", "FastAPI", "WebSockets", "PostgreSQL", "Docker", "PyTorch"],
        overview: "SLOGMate mengintegrasikan kemampuan autonomous agentic reasoning ke dalam operasional logistik instansi kepolisian. Sistem ini merespons instruksi operasional secara real-time via WebSocket, memvalidasi inventaris, dan menyusun dokumen perintah gerak logistik secara instan.",
        problem: {
          title: "The Core Challenge — Tantangan Efisiensi Alokasi Logistik & Pembuatan Dokumen Taktis",
          description: "Memangkas birokrasi dan waktu disposisi logistik darurat dari hitungan jam menjadi hitungan detik dengan validasi inventaris instan.",
          points: [
            "Proses disposisi dan alokasi armada logistik darurat antar polda/polres sebelumnya membutuhkan koordinasi manual berjenjang yang memakan waktu hingga 4 jam.",
            "Penyusunan dokumen formal surat perintah gerak logistik rawan terjadi inkonsistensi format penomoran dan human error pada kalkulasi kuantitas stok perlengkapan.",
            "Dibutuhkan arsitektur Agentic AI real-time via WebSocket yang mampu memvalidasi ketersediaan gudang logistik dan mengeksekusi instruksi perwira secara instan."
          ]
        },
        results: [
          { metric: "Logistics Allocation Speed", before: "4 jam", after: "12 detik", change: "1200x Lebih Cepat" },
          { metric: "Document Accuracy", before: "88%", after: "99.8%", change: "+11.8% Akurasi" },
          { metric: "System Availability", before: "95%", after: "99.9%", change: "High Availability" }
        ]
      }
    },
    {
      id: "distributed-voice-cloning-ray",
      title: "Distributed High-Throughput Voice Cloning Pipeline",
      category: "Deep Learning & Audio",
      description: "Pipeline sintesis suara terdistribusi menggunakan Ray dan FastAPI untuk memisahkan beban komputasi GPU, memungkinkan 10 request konkuren secara paralel.",
      tags: ["Distributed AI", "Ray", "FastAPI", "Deep Learning", "PyTorch", "Audio Synthesis"],
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
      live_url: "https://github.com/Rqwannn",
      featured: false,
      highlights: [
        "Distributed task queue menggunakan Ray Cluster untuk memparalelkan inferensi voice synthesis GPU-intensive",
        "Peningkatan throughput dari 1 request sekuensial menjadi 10 concurrent requests tanpa latency spike",
        "Implementasi custom vocoder & acoustic model adapter dengan zero audio clipping",
        "Backend microservices berbasis FastAPI dengan streaming audio chunks via WebSocket"
      ],
      detail: {
        duration: "Mar 2025 — Apr 2026",
        role: "Machine Learning Engineer at PT. MTG",
        technology: "Distributed AI",
        tools: ["Ray", "FastAPI", "PyTorch", "CUDA", "Torchaudio", "Docker"],
        overview: "Sistem voice cloning terdistribusi ini mengatasi bottleneck pemrosesan model generative audio berat dengan memanfaatkan Ray cluster orchestration, mendistribusikan beban tensor ke beberapa GPU worker secara efisien.",
        problem: {
          title: "The Core Challenge — Tantangan Komputasi Sintesis Suara & Throughput GPU",
          description: "Mendistribusikan beban inferensi neural vocoder generative yang berat ke multi-worker GPU untuk mencegah lonjakan latensi saat request tinggi.",
          points: [
            "Model generative voice cloning deep learning berbasis neural vocoder sangat haus komputasi GPU dan mengalami bottleneck parah saat menerima lebih dari 1 request secara bersamaan.",
            "Proses sintesis audio berdurasi panjang sering mengalami audio clipping, distorsi frekuensi, dan lonjakan latensi (latency spikes) yang tidak dapat diprediksi.",
            "Dibutuhkan arsitektur distributed task orchestration menggunakan Ray Cluster untuk membagi beban tensor komputasi ke worker GPU terpisah tanpa jeda streaming."
          ]
        },
        results: [
          { metric: "Concurrent Requests", before: "1 Sequential", after: "10 Parallel", change: "10x Concurrency" },
          { metric: "Audio Synthesis Latency", before: "18s / min audio", after: "2.4s / min audio", change: "7.5x Lebih Cepat" },
          { metric: "GPU Utilization", before: "35%", after: "92%", change: "+57% Efisiensi" }
        ]
      }
    }
  ]
}

async function syncAll() {
  console.log('🚀 Menyinkronkan 100% Data Lengkap ke Database Supabase Cloud...\n')

  // 1. PROJECTS
  const allProjects = [...nadyaData.projects, ...raqwanData.projects]
  const { error: projErr } = await supabaseAdmin.from('projects').upsert(allProjects, { onConflict: 'id' })
  if (projErr) console.error('❌ Error projects:', projErr.message)
  else console.log(`✅ ${allProjects.length} Projects berhasil disimpan ke Supabase!`)

  // 2. PROFILES (with Workflows, Experiences, Milestones, Certifications, FAQs inside JSON)
  const profiles = [nadyaData.profile, raqwanData.profile]
  const { error: profErr } = await supabaseAdmin.from('profile_info').upsert(profiles, { onConflict: 'id' })
  if (profErr) console.error('❌ Error profile_info:', profErr.message)
  else console.log(`✅ ${profiles.length} Profiles (Workflows, Experiences, Milestones, Certifications, FAQs) berhasil disimpan ke Supabase!`)

  console.log('\n🎉 SINKRONISASI 100% DATABASE LENGKAP & BERHASIL!')
}

syncAll().catch(console.error)
