export const portfolioInfo = {
  name: "Nadya Najelina Salsabillah",
  shortName: "Nadya",
  title: "Product Manager & UI/UX Designer",
  tagline: "Merancang produk digital yang berdampak — dari riset pengguna hingga desain interface yang intuitif dan scalable.",
  bio: "Hi! Saya Nadya Najelina Salsabillah, seorang Product Manager & UI/UX Designer yang passionate dalam menciptakan pengalaman digital yang bermakna. Saya menggabungkan pemikiran strategis product management dengan keahlian visual design untuk memastikan setiap produk tidak hanya indah secara estetika, tetapi juga memberikan nilai nyata bagi pengguna dan bisnis.",
  status: "Open for Product & Design roles",
  location: "Indonesia",
  email: "nadyanjln@gmail.com",
  socials: {
    github: "https://github.com/nadyanjln",
    linkedin: "https://www.linkedin.com/in/nadyanjln/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
    dribbble: "https://dribbble.com/",
    behance: "https://behance.net/"
  }
}

export const educations = [
  {
    degree: "S1 Informatika (Sarjana Komputer)",
    school: "Universitas Gunadarma",
    year: "2020 - 2024"
  }
]

export const skills = [
  { name: "Product Strategy", category: "Product", level: "Expert", color: "indigo" },
  { name: "User Research", category: "UX Research", level: "Expert", color: "cyan" },
  { name: "Wireframing & Prototyping", category: "UI/UX", level: "Expert", color: "purple" },
  { name: "Figma", category: "Design Tool", level: "Expert", color: "pink" },
  { name: "Design System", category: "UI/UX", level: "Advanced", color: "violet" },
  { name: "PRD & User Stories", category: "Product", level: "Expert", color: "blue" },
  { name: "A/B Testing", category: "Product", level: "Advanced", color: "emerald" },
  { name: "Data-Driven Decision", category: "Product", level: "Advanced", color: "amber" },
  { name: "Usability Testing", category: "UX Research", level: "Expert", color: "green" },
  { name: "Stakeholder Management", category: "Product", level: "Advanced", color: "orange" },
  { name: "Agile / Scrum", category: "Product", level: "Expert", color: "yellow" },
  { name: "Interaction Design", category: "UI/UX", level: "Expert", color: "rose" }
]

export const projects = [
  {
    id: "zenith-analytics-redesign",
    title: "Zenith Analytics — SaaS Dashboard Redesign",
    category: "Product Design",
    description: "Merancang ulang dashboard analitik SaaS dengan pendekatan user-centered design, meningkatkan task completion rate sebesar 40%.",
    tags: ["Product Strategy", "Figma", "User Research", "Design System"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/zenith",
    githubUrl: "",
    featured: true,
    highlights: [
      "Conducted 15+ user interviews & synthesized insights into actionable personas",
      "Created comprehensive information architecture & user flows",
      "Built a reusable design system with 60+ Figma components",
      "Achieved 40% improvement in task completion rate post-launch"
    ],

    // ── Case Study Detail ──
    detail: {
      duration: "3 bulan (Sep — Nov 2024)",
      role: "Product Manager & Lead UI/UX Designer",
      team: ["1 Product Manager (saya)", "2 UI/UX Designers", "4 Frontend Engineers", "1 QA Engineer"],
      tools: ["Figma", "FigJam", "Maze", "Notion", "Jira", "Google Analytics"],

      overview: "Zenith Analytics adalah platform SaaS analitik yang digunakan oleh 2.000+ pengguna B2B untuk monitoring metrik bisnis real-time. Dashboard lama mengalami penurunan engagement dan peningkatan support ticket terkait navigasi yang membingungkan. Saya ditugaskan memimpin redesign end-to-end dari fase discovery hingga delivery.",

      problem: {
        title: "Masalah yang Ditemukan",
        points: [
          "Task completion rate hanya 58% — pengguna kesulitan menemukan data yang relevan di antara terlalu banyak widget.",
          "Rata-rata 35 support ticket/minggu terkait navigasi dan filter data yang tidak intuitif.",
          "Bounce rate halaman dashboard naik 18% dalam 6 bulan terakhir, menunjukkan pengguna frustrasi.",
          "Tidak ada design system konsisten — setiap fitur baru dibangun dengan styling ad-hoc."
        ]
      },

      process: [
        {
          phase: "Discovery & Research",
          description: "Melakukan 15 user interview mendalam (30-45 menit per sesi) dengan segmen pengguna utama: data analyst, marketing manager, dan C-level executive. Dilengkapi dengan heuristic evaluation terhadap dashboard existing dan competitive audit terhadap 4 produk kompetitor (Mixpanel, Amplitude, Metabase, Looker).",
          deliverables: ["Interview transcripts & affinity map", "3 user personas", "Heuristic evaluation report", "Competitive analysis matrix"]
        },
        {
          phase: "Define & Ideation",
          description: "Mensintesis temuan riset menjadi problem statement yang jelas menggunakan framework How Might We. Menyelenggarakan design sprint 3 hari bersama tim cross-functional untuk menghasilkan solusi konseptual dan memprioritaskan fitur berdasarkan impact vs. effort matrix.",
          deliverables: ["Problem statements (HMW)", "Impact vs. effort matrix", "Feature prioritization (MoSCoW)", "Information architecture baru"]
        },
        {
          phase: "Wireframing & Prototyping",
          description: "Merancang wireframe low-fidelity untuk 8 screen utama, lalu mengiterasikannya menjadi high-fidelity prototype di Figma. Setiap iterasi divalidasi melalui internal design review dan feedback session dengan stakeholder.",
          deliverables: ["Low-fi wireframes (8 screens)", "High-fi Figma prototype", "Interactive prototype untuk usability testing", "Design system foundation (60+ components)"]
        },
        {
          phase: "Usability Testing & Iteration",
          description: "Melaksanakan 2 round moderated usability testing dengan 12 partisipan menggunakan Maze. Round pertama mengungkap 7 critical friction points yang kemudian diperbaiki sebelum round kedua. Hasil round kedua menunjukkan peningkatan signifikan pada semua metrik task completion.",
          deliverables: ["Usability test plan & script", "Test findings report (per round)", "Prioritized iteration backlog", "Final validated prototype"]
        },
        {
          phase: "Handoff & Launch",
          description: "Menyiapkan design specification lengkap untuk engineering handoff: annotated screens, redline documentation, component specs, dan design tokens. Mendampingi tim engineering selama 4 sprint implementasi dan melakukan QA review untuk memastikan fidelity desain terjaga.",
          deliverables: ["Dev handoff documentation", "Design QA checklist", "Launch readiness review", "Post-launch monitoring plan"]
        }
      ],

      results: [
        { metric: "Task Completion Rate", before: "58%", after: "81%", change: "+40%" },
        { metric: "Support Tickets (navigasi)", before: "35/minggu", after: "9/minggu", change: "-74%" },
        { metric: "Dashboard Bounce Rate", before: "42%", after: "28%", change: "-33%" },
        { metric: "User Satisfaction (SUS)", before: "62/100", after: "84/100", change: "+35%" }
      ],

      learnings: [
        "Melibatkan stakeholder engineering sejak awal discovery membantu mengidentifikasi technical constraint lebih awal dan menghindari rework.",
        "Usability testing 2 round sangat efektif — round pertama menangkap masalah besar, round kedua memvalidasi perbaikan.",
        "Design system yang dibangun selama proyek ini menjadi fondasi untuk 3 produk lainnya di perusahaan."
      ],

      gallery: [
        {
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
          caption: "User flow & information architecture mapping session"
        },
        {
          image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
          caption: "High-fidelity dashboard prototype di Figma"
        },
        {
          image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80",
          caption: "Usability testing session dengan partisipan"
        }
      ]
    }
  },

  {
    id: "luxe-ecommerce-experience",
    title: "Luxe Store — E-Commerce UX Overhaul",
    category: "UX Design",
    description: "Mendesain ulang pengalaman belanja online end-to-end, dari product discovery hingga checkout, menghasilkan peningkatan konversi 28%.",
    tags: ["UX Research", "Usability Testing", "Figma", "Interaction Design"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/luxe",
    githubUrl: "",
    featured: true,
    highlights: [
      "Performed heuristic evaluation & competitive UX audit on 5 competitors",
      "Designed streamlined 3-step checkout reducing cart abandonment by 22%",
      "Created interactive Figma prototype tested with 12 real users",
      "Conversion rate increased by 28% within first quarter post-launch"
    ],

    detail: {
      duration: "2.5 bulan (Mar — Mei 2024)",
      role: "Lead UX Designer",
      team: ["1 UX Designer (saya)", "1 UI Designer", "1 UX Researcher", "3 Developers", "1 Product Owner"],
      tools: ["Figma", "Optimal Workshop", "Hotjar", "Google Analytics", "Notion"],

      overview: "Luxe Store adalah platform e-commerce fashion premium dengan 50.000+ monthly active users. Meskipun trafik tinggi, conversion rate stagnan di 1.8% dan cart abandonment rate mencapai 72%. Saya ditugaskan mengidentifikasi pain points sepanjang customer journey dan merancang solusi UX yang meningkatkan konversi secara signifikan.",

      problem: {
        title: "Masalah yang Ditemukan",
        points: [
          "Cart abandonment rate 72% — checkout flow terlalu panjang (7 step) dan membingungkan.",
          "Conversion rate hanya 1.8%, jauh di bawah rata-rata industri fashion e-commerce (3.2%).",
          "Heatmap Hotjar menunjukkan 60% pengguna tidak menemukan fitur filter produk yang tersembunyi di side panel.",
          "Mobile experience buruk — 65% traffic dari mobile tapi UI belum dioptimasi untuk layar kecil."
        ]
      },

      process: [
        {
          phase: "UX Audit & Data Analysis",
          description: "Menganalisis data kuantitatif dari Google Analytics dan Hotjar (heatmap, session recording, funnel analysis) untuk mengidentifikasi drop-off points. Kemudian melakukan heuristic evaluation menggunakan Nielsen's 10 heuristics terhadap 28 screen utama customer journey.",
          deliverables: ["Funnel analysis report", "Heuristic evaluation (28 screens)", "Hotjar heatmap & session recording analysis", "UX audit presentation untuk stakeholder"]
        },
        {
          phase: "User Research",
          description: "Melakukan card sorting (open) dengan 20 partisipan untuk memahami mental model pengguna tentang kategori produk. Dilanjutkan dengan 8 contextual inquiry sessions mengamati pengguna berbelanja secara real-time, serta survey online terhadap 200 responden untuk validasi kuantitatif.",
          deliverables: ["Card sorting results & dendogram", "Contextual inquiry findings", "Survey analysis (200 responden)", "Revised user journey map"]
        },
        {
          phase: "Redesign & Prototyping",
          description: "Merancang solusi berupa: simplified 3-step checkout, redesign navigation & filter system yang lebih accessible, optimasi mobile-first layout, dan penambahan micro-interactions untuk feedback visual. Semua desain diiterasi melalui 3 round internal design critique.",
          deliverables: ["Redesigned checkout flow (3 steps)", "New navigation & filter system", "Mobile-first responsive design", "Interactive Figma prototype (42 screens)"]
        },
        {
          phase: "Usability Testing",
          description: "Melaksanakan moderated usability testing dengan 12 partisipan (6 desktop, 6 mobile) menggunakan think-aloud protocol. Mengukur task completion rate, time on task, dan error rate. Mengiterasi desain berdasarkan temuan sebelum final handoff.",
          deliverables: ["Usability test results (12 partisipan)", "Task analysis report", "Iteration changelog", "Final validated design"]
        },
        {
          phase: "A/B Testing & Launch",
          description: "Bekerja dengan tim engineering untuk implementasi. Menjalankan A/B test selama 4 minggu membandingkan old vs. new checkout flow pada 50% traffic. Setelah hasil positif tervalidasi secara statistik, dilakukan full rollout.",
          deliverables: ["A/B test plan & hypothesis", "Statistical analysis report", "Full rollout recommendation", "Post-launch conversion tracking"]
        }
      ],

      results: [
        { metric: "Conversion Rate", before: "1.8%", after: "2.3%", change: "+28%" },
        { metric: "Cart Abandonment", before: "72%", after: "56%", change: "-22%" },
        { metric: "Mobile Conversion", before: "0.9%", after: "1.7%", change: "+89%" },
        { metric: "Avg. Time to Checkout", before: "6.2 min", after: "3.1 min", change: "-50%" }
      ],

      learnings: [
        "Mobile-first approach sangat penting — optimasi mobile saja sudah memberikan dampak konversi hampir 2x lipat.",
        "Simplifikasi checkout dari 7 ke 3 langkah adalah single biggest impact change dalam proyek ini.",
        "Card sorting sangat membantu menata ulang arsitektur navigasi berdasarkan mental model pengguna, bukan asumsi internal."
      ],

      gallery: [
        {
          image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
          caption: "Customer journey mapping & pain point analysis"
        },
        {
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
          caption: "Before vs. after checkout flow comparison"
        },
        {
          image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80",
          caption: "A/B testing dashboard — tracking conversion metrics"
        }
      ]
    }
  },

  {
    id: "taskflow-product-management",
    title: "TaskFlow — Project Management App",
    category: "Product Management",
    description: "Memimpin pengembangan produk aplikasi manajemen proyek dari 0 ke 1, mengelola roadmap, backlog, dan koordinasi tim cross-functional.",
    tags: ["Product Roadmap", "PRD", "Agile/Scrum", "Figma"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/taskflow",
    githubUrl: "",
    featured: true,
    highlights: [
      "Defined MVP scope & prioritized features using RICE framework",
      "Authored detailed PRDs and user stories for 3 major feature releases",
      "Managed sprint backlog & facilitated agile ceremonies for a 6-person team",
      "Achieved 4.6/5 user satisfaction score within 3 months of launch"
    ],

    detail: {
      duration: "6 bulan (Jan — Jun 2024)",
      role: "Product Manager",
      team: ["1 Product Manager (saya)", "1 UI/UX Designer", "3 Full-stack Engineers", "1 Backend Engineer", "1 QA"],
      tools: ["Notion", "Jira", "Figma", "Miro", "Slack", "Amplitude"],

      overview: "TaskFlow adalah aplikasi manajemen proyek yang saya pimpin dari ide awal hingga peluncuran. Target pasar adalah tim startup kecil-menengah (5-20 orang) yang membutuhkan tool kolaborasi ringan namun powerful — alternatif yang lebih sederhana dari Jira, lebih terstruktur dari Trello. Saya mengelola keseluruhan product lifecycle: market research, strategi, roadmap, backlog, hingga go-to-market.",

      problem: {
        title: "Peluang & Masalah Pasar",
        points: [
          "Riset pasar menunjukkan 67% tim startup merasa tool project management existing terlalu kompleks atau terlalu simpel.",
          "Wawancara 20 potential users menunjukkan kebutuhan akan real-time collaboration yang seamless tanpa learning curve tinggi.",
          "Kompetitor seperti Trello kurang fitur untuk tracking progress, sementara Jira terlalu overwhelming untuk tim kecil.",
          "Market opportunity: $4.3B project management software market dengan CAGR 13.7%, segmen SMB masih underserved."
        ]
      },

      process: [
        {
          phase: "Market Research & Validation",
          description: "Melakukan competitive analysis terhadap 6 produk kompetitor, wawancara 20 potential users dari 12 startup berbeda, dan survey online terhadap 150 responden. Memvalidasi problem-solution fit dan mengidentifikasi unique value proposition.",
          deliverables: ["Competitive analysis (6 produk)", "User interview synthesis (20 responden)", "Market sizing & TAM/SAM/SOM", "Value proposition canvas"]
        },
        {
          phase: "Product Strategy & MVP Definition",
          description: "Mendefinisikan visi produk, strategi go-to-market, dan MVP scope. Menggunakan RICE framework untuk memprioritaskan 47 feature requests menjadi 12 core features MVP. Menyusun product roadmap 6 bulan dengan milestone yang jelas.",
          deliverables: ["Product vision & strategy document", "RICE prioritization matrix", "MVP feature scope document", "6-month product roadmap"]
        },
        {
          phase: "PRD & Sprint Planning",
          description: "Menulis PRD detail untuk setiap epic dan user stories untuk setiap feature. Bekerja erat dengan engineering lead untuk estimasi effort dan technical feasibility assessment. Mengelola sprint planning dan backlog grooming dalam siklus 2-minggu.",
          deliverables: ["5 detailed PRDs (per epic)", "42 user stories with acceptance criteria", "Sprint backlog & velocity tracking", "Technical feasibility assessment"]
        },
        {
          phase: "Design Collaboration & UI/UX",
          description: "Berkolaborasi dengan UI/UX designer untuk merancang experience kanban board, task detail panel, dan real-time collaboration features. Melakukan design review, memberikan product context, dan memvalidasi desain terhadap user stories.",
          deliverables: ["Wireframe reviews & feedback", "Design-product alignment docs", "Prototype validation sessions", "UI specification approval"]
        },
        {
          phase: "Beta Launch & Iteration",
          description: "Menjalankan closed beta dengan 50 pengguna dari 15 tim selama 4 minggu. Mengumpulkan feedback melalui in-app survey, weekly check-in calls, dan Amplitude analytics. Mengiterasi produk berdasarkan data sebelum public launch.",
          deliverables: ["Beta program plan & recruitment", "Weekly beta feedback reports", "Feature iteration backlog", "Go/no-go launch assessment"]
        },
        {
          phase: "Public Launch & Growth",
          description: "Mengoordinasikan public launch bersama tim marketing: landing page, Product Hunt launch, dan social media campaign. Setelah launch, mengelola feedback loop berkelanjutan dan merencanakan roadmap V2.",
          deliverables: ["Launch checklist & coordination plan", "Product Hunt launch strategy", "Post-launch analytics dashboard", "V2 roadmap draft"]
        }
      ],

      results: [
        { metric: "Users (3 bulan post-launch)", before: "0", after: "1,200+", change: "Dari nol" },
        { metric: "User Satisfaction (CSAT)", before: "N/A", after: "4.6/5.0", change: "Target: 4.0" },
        { metric: "Weekly Active Teams", before: "0", after: "85 teams", change: "Dari nol" },
        { metric: "Feature Adoption Rate", before: "N/A", after: "73%", change: "Core features" },
        { metric: "Sprint Velocity Consistency", before: "N/A", after: "92%", change: "On-track delivery" }
      ],

      learnings: [
        "Closed beta 4 minggu sangat berharga — 3 dari 12 fitur MVP ternyata jarang digunakan dan bisa di-descope, sementara 2 fitur baru muncul dari feedback yang tidak terantisipasi.",
        "RICE framework efektif untuk menjaga objektivitas prioritisasi ketika banyak stakeholder memiliki permintaan berbeda.",
        "Kolaborasi erat PM-Designer-Engineer sejak hari pertama mencegah 'throw over the wall' syndrome dan mempercepat delivery 25%."
      ],

      gallery: [
        {
          image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80",
          caption: "Product roadmap & feature prioritization session"
        },
        {
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
          caption: "Sprint planning & backlog grooming board"
        },
        {
          image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80",
          caption: "Amplitude analytics dashboard — tracking user adoption"
        }
      ]
    }
  },

  {
    id: "nexus-design-system",
    title: "Nexus — Enterprise Design System",
    category: "Design System",
    description: "Membangun dan mengelola design system perusahaan yang melayani 4 product squad dengan 80+ komponen konsisten.",
    tags: ["Design System", "Figma", "Documentation", "Component Library"],
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/nexus",
    githubUrl: "",
    featured: false,
    highlights: [
      "Built 80+ accessible and responsive Figma components",
      "Defined design tokens: color, typography, spacing, elevation",
      "Reduced design-to-dev handoff time by 50%",
      "Created living documentation adopted by 4 product squads"
    ],

    detail: {
      duration: "4 bulan (ongoing maintenance, Aug — Nov 2023)",
      role: "Design System Lead & Product Manager",
      team: ["1 Design System Lead (saya)", "2 UI Designers", "2 Frontend Engineers", "1 Technical Writer"],
      tools: ["Figma", "Storybook", "Notion", "Zeroheight", "GitHub"],

      overview: "Nexus Design System adalah inisiatif strategis lintas tim yang saya inisiasi dan pimpin untuk mengatasi inkonsistensi visual dan duplikasi effort di 4 produk digital perusahaan. Sebelum Nexus, setiap squad membangun komponen sendiri-sendiri, menghasilkan pengalaman pengguna yang fragmentaris dan memperlambat development velocity.",

      problem: {
        title: "Masalah Sebelum Design System",
        points: [
          "4 produk digital memiliki 4 varian button, 3 varian form, dan 5 palet warna berbeda — pengalaman pengguna tidak konsisten.",
          "Designer menghabiskan 40% waktu membangun komponen dari nol alih-alih fokus pada problem solving.",
          "Design-to-dev handoff memakan waktu rata-rata 3 hari karena tidak ada spesifikasi standar.",
          "Accessibility tidak terjamin — banyak komponen tidak memenuhi standar WCAG 2.1 AA."
        ]
      },

      process: [
        {
          phase: "Audit & Inventory",
          description: "Melakukan UI audit menyeluruh terhadap 4 produk: menginventarisasi semua komponen, pattern, warna, tipografi, dan spacing yang digunakan. Mengidentifikasi overlap, inkonsistensi, dan gap. Hasilnya menjadi foundation untuk keputusan design token.",
          deliverables: ["Component inventory spreadsheet (240+ instances)", "Visual inconsistency report", "Consolidation opportunity map", "Design system proposal deck untuk leadership"]
        },
        {
          phase: "Token & Foundation Design",
          description: "Mendefinisikan design tokens sebagai building blocks: color palette (semantic + brand), typography scale, spacing scale, elevation levels, border radius, dan breakpoints. Semua token dirancang dengan accessibility-first approach, memastikan color contrast ratio memenuhi WCAG 2.1 AA.",
          deliverables: ["Color token system (primitives + semantic)", "Typography scale & guidelines", "Spacing & layout grid system", "Token naming convention document"]
        },
        {
          phase: "Component Library Build",
          description: "Merancang dan membangun 80+ komponen Figma menggunakan auto layout, variants, dan component properties. Setiap komponen memiliki state lengkap (default, hover, active, disabled, error, loading) dan mendukung light/dark theme.",
          deliverables: ["80+ Figma components (with variants)", "Component usage guidelines", "Interaction specification per component", "Accessibility checklist per component"]
        },
        {
          phase: "Documentation & Governance",
          description: "Menyusun dokumentasi interaktif di Zeroheight yang menjelaskan kapan dan bagaimana menggunakan setiap komponen, pattern, dan token. Mendefinisikan governance model: contribution process, versioning strategy, dan review workflow untuk menjaga kualitas design system.",
          deliverables: ["Zeroheight documentation site", "Contribution guidelines", "Versioning & changelog strategy", "Quarterly review process"]
        },
        {
          phase: "Adoption & Training",
          description: "Menjalankan program adopsi bertahap: workshop hands-on untuk 4 squad (designer + engineer), office hours mingguan untuk Q&A, dan pairing sessions untuk migrasi produk existing ke komponen baru. Mengukur adoption rate per squad.",
          deliverables: ["Training workshop materials (4 sessions)", "Migration guide per product", "Adoption tracking dashboard", "Feedback collection & iteration"]
        }
      ],

      results: [
        { metric: "Design-to-Dev Handoff Time", before: "3 hari", after: "1.5 hari", change: "-50%" },
        { metric: "Designer Time on Components", before: "40%", after: "12%", change: "-70%" },
        { metric: "Cross-product UI Consistency", before: "Rendah", after: "95%+", change: "Signifikan" },
        { metric: "WCAG 2.1 AA Compliance", before: "~40%", after: "100%", change: "Full compliance" },
        { metric: "Squad Adoption Rate", before: "0/4", after: "4/4", change: "100%" }
      ],

      learnings: [
        "Design system bukan hanya tentang komponen — governance model dan kultur adopsi sama pentingnya dengan kualitas library.",
        "Melibatkan engineer sejak awal dalam mendefinisikan token naming convention memastikan mapping seamless antara Figma dan code.",
        "Office hours mingguan menjadi channel paling efektif untuk driving adoption dan mengumpulkan feedback improvement."
      ],

      gallery: [
        {
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
          caption: "Design token system — color, typography, dan spacing"
        },
        {
          image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
          caption: "Figma component library — button variants"
        },
        {
          image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
          caption: "Team workshop session — design system onboarding"
        }
      ]
    }
  }
]

export const workflows = [
  {
    step: "01",
    phase: "Discover & Empathize",
    tagline: "Uncovering Deep Insights",
    description: "Memahami akar masalah pengguna dan peluang bisnis melalui wawancara mendalam, telemetry data, competitive audit, dan user journey mapping.",
    deliverables: ["User Persona & Empathy Map", "Competitive Matrix", "Quantitative Funnel Audit", "Problem Definition (HMW)"]
  },
  {
    step: "02",
    phase: "Define & Strategize",
    tagline: "Framing The Product Vision",
    description: "Menyusun Product Requirement Document (PRD), merumuskan acceptance criteria, mendefinisikan OKR/KPI kesuksesan, serta prioritisasi fitur via RICE framework.",
    deliverables: ["Comprehensive PRD", "User Stories & Acceptance Criteria", "RICE Prioritization Matrix", "Information Architecture"]
  },
  {
    step: "03",
    phase: "Design & Prototype",
    tagline: "Crafting Intuitive Interfaces",
    description: "Merancang wireframe terstruktur hingga high-fidelity prototype interaktif di Figma, dengan fondasi design system yang accessible (WCAG 2.1 AA) dan scalable.",
    deliverables: ["Interactive Figma Prototypes", "Design System Tokens & Components", "Micro-Interactions & Motion", "Usability Test Scripts"]
  },
  {
    step: "04",
    phase: "Deliver, Test & Iterate",
    tagline: "Measuring Real Impact",
    description: "Mendampingi sprint engineering via clear dev-handoff, memfasilitasi usability testing & A/B testing, serta mengukur metrik post-launch untuk iterasi berkelanjutan.",
    deliverables: ["Dev Handoff & Redline Specs", "Usability Findings & Iteration Log", "A/B Testing Statistical Validation", "Post-Launch Growth Telemetry"]
  }
]

export const testimonials = [
  {
    id: 1,
    name: "Rian Pratama",
    role: "VP of Product",
    company: "Scale-up SaaS Enterprise",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    content: "Nadya memiliki kombinasi langka antara pemikiran strategis product management dan ketajaman visual UI/UX kelas atas. Kecepatannya dalam menyederhanakan workflow yang rumit menjadi interface yang intuitif benar-benar mendongkrak retensi produk kami.",
    badge: "Verified Colleague"
  },
  {
    id: 2,
    name: "Devi Anggraini",
    role: "Lead Frontend Engineer",
    company: "Digital Fintech Studio",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    content: "Bekerja dengan Nadya sangat menyenangkan untuk tim engineering. Dokumentasi PRD-nya sangat rinci, design system di Figma terstruktur rapi dengan token standar, sehingga proses handoff dan slicing berjalan 2x lebih cepat tanpa multitafsir.",
    badge: "Engineering Partner"
  },
  {
    id: 3,
    name: "Arif Wicaksono",
    role: "Startup Founder & CEO",
    company: "TaskFlow Workspace",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content: "Nadya memimpin produk kami dari tahap 0 ke 1 dengan kepemimpinan yang solid. Riset penggunanya tajam, validasi MVP tepat sasaran, dan hasil desainnya mendapat rating kepuasan 4.6/5 saat debut peluncuran.",
    badge: "Founder Endorsement"
  }
]

export const faqs = [
  {
    question: "Apakah Anda terbuka untuk posisi Full-time (Remote/Hybrid) atau Freelance Consulting?",
    answer: "Ya, saya terbuka untuk peluang Full-Time (baik Remote, Hybrid, maupun On-site di Indonesia) untuk peran Product Manager, UI/UX Designer, maupun Product Designer. Saya juga menerima konsultasi freelance strategis untuk startup yang ingin merancang MVP atau meredesain produk."
  },
  {
    question: "Bagaimana pendekatan Anda dalam menyelaraskan kebutuhan Bisnis dengan Pengalaman Pengguna (UX)?",
    answer: "Saya menggunakan pendekatan 'Impact-First Design' — setiap keputusan desain harus memiliki hipotesis terukur yang mendukung metrik bisnis (seperti konversi, retensi, atau efisiensi waktu tugas) tanpa mengorbankan kenyamanan dan aksesibilitas pengguna."
  },
  {
    question: "Apa saja tools dan metodologi utama yang menjadi andalan harian Anda?",
    answer: "Untuk Design: Figma (Auto Layout, Variables, Component Properties, Interactive Prototypes) & FigJam. Untuk Product Management: Notion, Jira, Linear, PRD Documentation, RICE Framework, dan Agile/Scrum. Untuk Riset & Analitik: Maze, Hotjar, Google Analytics, Amplitude, serta moderated user interviews."
  },
  {
    question: "Bagaimana cara Anda berkolaborasi dengan tim Engineering agar delivery tetap lancar?",
    answer: "Saya melibatkan tim engineering sejak tahap awal discovery untuk memvalidasi feasibility teknis. Saat handoff, saya menyediakan annotated screens, token documentation, edge cases (empty, error, loading states), serta aktif mendampingi selama sprint grooming dan QA review."
  }
]

