/**
 * Portfolio Data Model for Nadya Najelina Salsabillah
 * Connected with Supabase Cloud Database.
 */

export const portfolioInfo = {
  name: "Nadya Najelina Salsabillah",
  shortName: "Nadya",
  title: "Product Manager & UI/UX Designer",
  tagline: "Building digital products that simplify complex workflows, empower better decisions, and create meaningful value for both users and businesses.",
  bio: "Computer Science Graduate (S1 Informatika, GPA: 3.97 / 4.00) from Gunadarma University with a multidisciplinary background in UI/UX design, software engineering, business, and AI, focused on Product Management. By combining user empathy, technical expertise, business thinking, and data-driven decision making, I strive to build products that simplify complex workflows, empower better decisions, and create meaningful value for both users and businesses.",
  status: "Open for Product Management & UI/UX Roles",
  location: "Depok, Jawa Barat, Indonesia",
  email: "nadyanjln@gmail.com",
  socials: {
    github: "https://github.com/nadyanjln",
    linkedin: "https://www.linkedin.com/in/nadyanjln/",
    portfolio: "https://www.linkedin.com/in/nadyanjln/"
  }
}

export const skills = [
  { name: "Product Strategy & Discovery", category: "Product", level: "Expert", color: "indigo" },
  { name: "Product Requirement Doc (PRD)", category: "Product", level: "Expert", color: "indigo" },
  { name: "Feature Prioritization (RICE/MoSCoW)", category: "Product", level: "Expert", color: "indigo" },
  { name: "UI/UX Design & Prototyping", category: "UI/UX", level: "Expert", color: "purple" },
  { name: "Design System Architecture", category: "UI/UX", level: "Advanced", color: "purple" },
  { name: "User Research & Usability Testing", category: "UX Research", level: "Advanced", color: "amber" },
  { name: "Figma & FigJam", category: "Design Tool", level: "Expert", color: "pink" }
]

export const projects = [
  {
    id: "meatsure-ai-smart-monitoring",
    title: "MeatSure — AI Smart Monitoring Hub for Seafood Safety",
    category: "Product Strategy & AI IoT",
    description: "Platform IoT dan AI cerdas untuk monitoring kesegaran dan rantai pasok produk laut secara real-time, peraih penghargaan Best AI Integration pada International Business Pitch Fest 2025.",
    tags: ["Product Lead", "Best AI Integration 2025", "IoT Monitoring", "Product Strategy", "Figma", "User Research"],
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://www.linkedin.com/in/nadyanjln/",
    githubUrl: "https://github.com/nadyanjln",
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
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=1200&q=80",
          caption: "IoT Telemetry Dashboard — Real-time Cold Chain Spoilage Detection & Ammonia Sensor Monitoring"
        },
        {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          caption: "High-Fidelity Mobile App Prototype — Push Alert Notification System for Logistics Operators"
        }
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
    liveUrl: "https://www.linkedin.com/in/nadyanjln/",
    githubUrl: "https://github.com/nadyanjln",
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
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
          caption: "Campaign Performance Analytics & Influencer Matchmaking Scoring Interface"
        },
        {
          url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
          caption: "Modular Wireframe System & Step-by-Step Campaign Creation Wizard"
        }
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
    liveUrl: "https://www.linkedin.com/in/nadyanjln/",
    githubUrl: "https://github.com/nadyanjln",
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
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
          caption: "Child-Friendly Interactive History Quiz & Artifact Scanner UI"
        },
        {
          url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
          caption: "Gamification Leaderboard & Audio Storytelling Narration Flow"
        }
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
    liveUrl: "https://www.linkedin.com/in/nadyanjln/",
    githubUrl: "https://github.com/nadyanjln",
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
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
          caption: "Medical Equipment Catalog & Transparent Deposit Checkout Flow"
        },
        {
          url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
          caption: "Elderly-Accessible UI Design System & Delivery Schedule Tracking"
        }
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
    liveUrl: "https://www.linkedin.com/in/nadyanjln/",
    githubUrl: "https://github.com/nadyanjln",
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
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
          caption: "Sub-2s Emergency SOS Trigger & Live GPS Location Broadcast Flow"
        },
        {
          url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
          caption: "Custom 8+ Iconography Design System & Safety Check-in Dashboard"
        }
      ]
    }
  }
]

export const testimonials = [
  {
    id: 1,
    name: "PT. Mitra Teknologi Gemilang",
    role: "Product Leadership",
    company: "PT. MTG",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    content: "Nadya mendemonstrasikan keahlian UX audit yang luar biasa pada proyek SaveMe. Desain yang dirancangnya tidak hanya memukau secara visual, tapi juga menyederhanakan alur darurat secara signifikan sehingga meningkatkan usability aplikasi.",
    badge: "UI/UX Client Feedback"
  },
  {
    id: 2,
    name: "International Business Pitch Fest 2025",
    role: "Judging Committee",
    company: "IBPF 2025",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    content: "Kepemimpinan produk Nadya dalam mengembangkan MeatSure sangat impresif. Kemampuannya mengintegrasikan teknologi AI dengan pemecahan masalah rantai pasok nyata mengantarkan timnya meraih predikat Best AI Integration.",
    badge: "Best AI Integration 2025"
  },
  {
    id: 3,
    name: "Universitas Gunadarma Computerization Institute",
    role: "Academic Coordination Team",
    company: "Gunadarma University",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    content: "Sebagai asisten tutor dan interviewer, Nadya memiliki kemampuan komunikasi yang luar biasa dan pemikiran analitis yang tajam dalam memproses feedback mahasiswa dan menyederhanakan proses administratif institusi.",
    badge: "Academic & Leadership"
  }
]

export const workflows = [
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
]

export const experiences = [
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
]

export const milestones = [
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
]

export const certifications = [
  { name: "Product Management Professional", issuer: "Google / Coursera", year: "2025" },
  { name: "UI/UX Design Masterclass & Systems", issuer: "Interaction Design Foundation", year: "2024" }
]

export const educations = [
  {
    degree: "Sarjana Komputer (S1 Informatika) — IPK 3.97 / 4.00",
    school: "Universitas Gunadarma",
    year: "2022 — 2026"
  }
]

export const faqs = [
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
