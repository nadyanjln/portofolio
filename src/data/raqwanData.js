/**
 * Portfolio Data Model for Muhammad Raqwan
 * Head of Artificial Intelligence at PT. Mitra Teknologi Gemilang
 */

export const raqwanInfo = {
  name: "Muhammad Raqwan Kauthar",
  shortName: "Raqwan",
  title: "Head of Artificial Intelligence | AI & Data Specialist",
  tagline: "Head of Artificial Intelligence at PT Mitra Teknologi Gemilang — Architecting MarketForge Agentic AI, high-throughput Financial Screening Engines, GraphRAG, and production deep learning systems.",
  bio: "Head of Artificial Intelligence at PT Mitra Teknologi Gemilang and Computer Science Graduate (S1 Informatika, IPK 3.78) from Gunadarma University with 2+ years of combined industry leadership and advanced deep learning research experience. Specialized in architecting MarketForge Agentic AI, sub-millisecond Financial Screening Engines, distributed ML orchestration (Ray), GraphRAG (FalkorDB + Cognee), and real-time WebSocket telemetry. Committed to translating frontier AI research into scalable, high-throughput production systems.",
  status: "Head of Artificial Intelligence at PT Mitra Teknologi Gemilang",
  location: "Depok, Jawa Barat, Indonesia",
  phone: "+62 812 9828 7897",
  email: "mraqwan471@gmail.com",
  socials: {
    github: "https://github.com/Rqwannn",
    linkedin: "https://www.linkedin.com/in/muhammad-raqwan-kauthar-5427b221a/",
    portfolio: "https://github.com/Rqwannn"
  }
}

export const raqwanSkills = [
  { name: "Agentic AI & Multi-Agent Architecture", category: "AI Core", level: "Expert", color: "emerald" },
  { name: "GraphRAG & Knowledge Graph (FalkorDB / Cognee)", category: "Knowledge AI", level: "Expert", color: "teal" },
  { name: "Computer Vision & Edge Deep Learning", category: "Vision & Edge", level: "Expert", color: "emerald" },
  { name: "Distributed ML & GPU Orchestration (Ray / Celery)", category: "Distributed AI", level: "Advanced", color: "cyan" },
  { name: "Real-Time Streaming (FastAPI & WebSockets)", category: "Backend & Systems", level: "Expert", color: "teal" },
  { name: "Explainable AI (LIME / SHAP)", category: "Model Interpretability", level: "Advanced", color: "emerald" }
]

export const raqwanProjects = [
  {
    id: "marketforge-securities-platform",
    title: "MarketForge — Autonomous Securities Intelligence & Real-Time Screening Engine",
    category: "Agentic AI",
    description: "Platform intelijen pasar modal sekuritas berbasis MarketForge Agentic AI dengan sub-millisecond screening engine untuk 900+ emiten, analisis kuantitatif teknikal & fundamental, serta WebSocket real-time ticker stream.",
    tags: ["MarketForge", "Agentic AI", "Screening Engine", "FastAPI", "WebSockets", "Quantitative Finance", "Python", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://app.notion.com/p/Sekuritas-Platform-16a4bf881acb83d89a3e8196f470a4c8",
    githubUrl: "https://github.com/Rqwannn/MarketForge-Backend/tree/raqwan-dev",
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
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
          caption: "MarketForge Autonomous Financial Screening Architecture & WebSocket Ticker Feed"
        },
        {
          url: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
          caption: "Sub-12ms High-Throughput Screening Engine Pipeline & Multi-Agent Reasoning Graph"
        }
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
    liveUrl: "https://github.com/Rqwannn",
    githubUrl: "https://github.com/Rqwannn",
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
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
          caption: "Multi-Agent System Communication Protocol (Agent-to-Agent Event Bus)"
        },
        {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          caption: "LIME Explainable AI Feature Attribution & Student Diagnostic Visualization"
        }
      ]
    }
  },
  {
    id: "reclaimyt-smart-conveyor-ai",
    title: "Reclaimyt — AI-Powered Smart Conveyor Waste Classification System",
    category: "Computer Vision & Edge",
    description: "Sistem conveyor pintar bertenaga Deep Learning Computer Vision untuk pemilahan sampah otomatis di bank sampah, peraih Top 10 Best Team Samsung Innovation Campus Batch 5 (2024).",
    tags: ["Computer Vision", "Deep Learning", "TensorFlow", "Samsung Innovation Campus", "CNN", "Python"],
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/Rqwannn",
    githubUrl: "https://github.com/Rqwannn",
    featured: true,
    highlights: [
      "Merancang arsitektur model Convolutional Neural Network (CNN) untuk klasifikasi citra sampah multi-kelas pada conveyor belt bergerak",
      "Mengintegrasikan inference pipeline kamera optik dengan aktuator pemilah otomatis secara real-time",
      "Memimpin tim meraih Top 10 Best Team Samsung Innovation Campus Batch 5 (2024)",
      "Optimasi inferensi edge agar mampu mendeteksi objek bergerak dalam waktu di bawah 80 milidetik"
    ],
    detail: {
      duration: "Feb 2024 — Agu 2024",
      role: "Lead Machine Learning Engineer",
      technology: "Computer Vision & Edge",
      tools: ["TensorFlow", "Keras", "OpenCV", "Python", "Edge AI", "CNN"],
      overview: "Reclaimyt adalah solusi hardware-software terintegrasi yang memanfaatkan kecerdasan buatan untuk mengotomatisasi pemilahan sampah anorganik di fasilitas pengolahan sampah, meningkatkan efisiensi daur ulang secara drastis.",
      problem: {
        title: "The Core Challenge — Tantangan Klasifikasi Citra Objek Bergerak & Integrasi Aktuator",
        description: "Mendeteksi dan mengklasifikasikan sampah anorganik yang terdeformasi dan kotor pada conveyor belt bergerak secara real-time dengan latensi di bawah 80ms.",
        points: [
          "Bentuk sampah yang bervariasi, kotor, dan saling bertumpuk di atas belt konveyor membuat model computer vision standar mengalami penurunan akurasi.",
          "Kecepatan pergerakan konveyor membutuhkan pipeline pemrosesan citra berlatensi ultra-rendah sebelum objek melewati sensor aktuator mekanik.",
          "Keterbatasan daya komputasi perangkat edge di fasilitas pengolahan sampah menuntut kompresi bobot model tanpa mengorbankan ketepatan deteksi."
        ]
      },
      results: [
        { metric: "Award Recognition", before: "Top 100", after: "Top 10 Samsung Innovation", change: "National Finalist" },
        { metric: "Classification Accuracy", before: "71%", after: "94.2%", change: "+23.2% Akurasi" },
        { metric: "Conveyor Edge Latency", before: "350ms", after: "78ms", change: "4.5x Lebih Cepat" }
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
          caption: "Smart Conveyor CNN Real-Time Object Detection & Sorting Actuator Interface"
        },
        {
          url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
          caption: "Hardware Integration Architecture: Camera Optical Sensor to Pneumatic Sorter"
        }
      ]
    }
  },
  {
    id: "2gether-mobile-waste-detection",
    title: "2Gether — Mobile Waste Detection App with Quantized TFLite",
    category: "Computer Vision & Edge",
    description: "Aplikasi seluler pemilahan sampah berbasis on-device deep learning menggunakan quantized TensorFlow Lite untuk inferensi offline cepat di smartphone.",
    tags: ["Mobile AI", "TensorFlow Lite", "Quantization", "Flutter", "Edge AI", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/Rqwannn",
    githubUrl: "https://github.com/Rqwannn",
    featured: false,
    highlights: [
      "Mengembangkan model klasifikasi citra terkuantisasi (INT8) menggunakan TensorFlow Lite untuk eksekusi on-device tanpa internet",
      "Mengurangi ukuran model hingga 75% sehingga dapat berjalan lancar pada perangkat smartphone spesifikasi menengah ke bawah",
      "Mengintegrasikan model AI ke dalam aplikasi seluler Flutter dengan respons inferensi kamera real-time di bawah 45ms"
    ],
    detail: {
      duration: "Sep 2024 — Des 2024",
      role: "Mobile AI Engineer",
      technology: "Mobile AI & TFLite",
      tools: ["TensorFlow Lite", "Python", "Flutter", "Post-Training Quantization", "MobileNetV3"],
      overview: "2Gether memberdayakan masyarakat untuk memilah sampah secara mandiri melalui kamera smartphone mereka, memberikan edukasi daur ulang instan tanpa memerlukan koneksi internet.",
      problem: {
        title: "The Core Challenge — Tantangan Kuantisasi Model On-Device & Batasan Memori Mobile",
        description: "Mengompresi arsitektur model vision kompleks agar dapat beroperasi penuh secara offline di smartphone pengguna dengan RAM terbatas.",
        points: [
          "Banyak daerah di Indonesia memiliki keterbatasan sinyal internet sehingga inferensi berbasis cloud tidak dapat diandalkan untuk pemilahan sampah harian.",
          "Ukuran file model deep learning standar (>100MB) terlalu besar untuk diunduh dan dijalankan secara instan di smartphone kelas entry-level.",
          "Kebutuhan menjaga rasio akurasi deteksi tetap tinggi saat melakukan kuantisasi bobot model dari Float32 menjadi INT8."
        ]
      },
      results: [
        { metric: "Model Size Reduction", before: "128 MB", after: "31 MB", change: "75.7% Lebih Ringan" },
        { metric: "On-Device Latency", before: "210ms (Cloud)", after: "42ms (Offline)", change: "5x Lebih Responsif" },
        { metric: "Offline Usability", before: "Requires Internet", after: "100% Offline Capable", change: "Zero Dependency" }
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80",
          caption: "Quantized TensorFlow Lite On-Device Inference Pipeline (<45ms Latency)"
        },
        {
          url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1200&q=80",
          caption: "Mobile UI Workflow for Offline Recyclable Waste Scanning and Material Tagging"
        }
      ]
    }
  },
  {
    id: "pertamina-graphrag-pipeline",
    title: "Enterprise GraphRAG — Hybrid Graph & Vector Knowledge Retrieval Pipeline",
    category: "GraphRAG & LLM",
    description: "Sistem Knowledge Graph Retrieval-Augmented Generation (GraphRAG) enterprise menggunakan FalkorDB dan Cognee untuk pemrosesan dokumen operasional teknis berskala besar.",
    tags: ["GraphRAG", "Knowledge Graph", "FalkorDB", "Cognee", "LLM", "Vector DB", "Python"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/Rqwannn",
    githubUrl: "https://github.com/Rqwannn",
    featured: true,
    highlights: [
      "Membangun arsitektur GraphRAG hibrida yang menggabungkan dense vector retrieval dengan representasi graf relasional FalkorDB & Cognee",
      "Mengekstraksi entitas teknis, hierarki organisasi, dan dependensi prosedur dari ribuan dokumen SOP operasional",
      "Mereduksi tingkat halusinasi LLM pada domain teknis khusus hingga 88% dibandingkan RAG vektor standar"
    ],
    detail: {
      duration: "Agu 2026 — Present",
      role: "Lead Knowledge AI Architect at PT. MTG",
      technology: "GraphRAG & LLM",
      tools: ["FalkorDB", "Cognee", "LangChain", "OpenAI / Claude API", "Python", "Cypher"],
      overview: "GraphRAG mengatasi keterbatasan RAG vektor konvensional dalam menjawab pertanyaan yang memerlukan pemahaman relasi multi-hop dan keterkaitan antar dokumen kompleks di lingkungan korporasi energi.",
      problem: {
        title: "The Core Challenge — Tantangan Penalaran Multi-Hop & Eliminasi Halusinasi RAG",
        description: "Menghubungkan entitas teknis terisolasi di ribuan SOP dan dokumen teknik migas untuk memberikan jawaban terverifikasi tanpa halusinasi.",
        points: [
          "RAG berbasis vector similarity standar sering gagal menemukan korelasi logika ketika jawaban tersebar di beberapa dokumen teknis yang berbeda (multi-hop reasoning).",
          "Tingginya risiko fatal akibat halusinasi model LLM saat merespons kueri prosedur keselamatan kerja dan manual teknis perminyakan.",
          "Kebutuhan indexing otomatis yang mampu memetakan entitas semantik kompleks (peralatan, standar keselamatan, regulasi) ke dalam graf pengetahuan dinamis."
        ]
      },
      results: [
        { metric: "Hallucination Rate", before: "34%", after: "4.1%", change: "88% Pengurangan Halusinasi" },
        { metric: "Multi-Hop Retrieval", before: "48% Precision", after: "92.5% Precision", change: "+44.5% Presisi" },
        { metric: "Document Query Time", before: "15 min (Manual)", after: "1.2 detik (GraphRAG)", change: "Instant Verification" }
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
          caption: "FalkorDB & Cognee Enterprise Knowledge Graph Schema & Semantic Entity Network"
        },
        {
          url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
          caption: "GraphRAG Multi-Hop Retrieval Pipeline vs Traditional Dense Vector Search Benchmark"
        }
      ]
    }
  },
  {
    id: "upstream-energy-data-pipeline",
    title: "Upstream Energy Telemetry & Anomaly Analytics Pipeline",
    category: "Data & Distributed ML",
    description: "Infrastruktur ingestion data telemetri sumur dan fasilitas hulu migas berkecepatan tinggi dengan deteksi anomali tekanan berbasis machine learning time-series.",
    tags: ["Data Pipeline", "Time-Series ML", "PostgreSQL", "Grafana", "FastAPI", "Python"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/Rqwannn",
    githubUrl: "https://github.com/Rqwannn",
    featured: false,
    highlights: [
      "Merancang data ingestion pipeline untuk memproses ribuan data point sensor tekanan, suhu, dan laju alir setiap detik",
      "Mengembangkan model deteksi anomali unsupervised untuk mendeteksi penurunan performa sumur secara dini",
      "Menyusun dashboard visualisasi metrik teknis terintegrasi di Grafana & web internal"
    ],
    detail: {
      duration: "Mei 2026 — Jul 2026",
      role: "Data & ML Engineer at PT. MTG",
      technology: "Data & ML Pipeline",
      tools: ["PostgreSQL", "FastAPI", "Pandas", "Scikit-Learn", "Grafana", "Docker"],
      overview: "Sistem telemetri ini mengamankan operasional fasilitas hulu dengan memberikan deteksi awal terhadap anomali fluktuasi tekanan pipa dan sumur sebelum terjadi kegagalan sistem.",
      problem: {
        title: "The Core Challenge — Tantangan Ingestion Data Sensor Masif & Deteksi Dini Anomali",
        description: "Menelan dan menganalisis ribuan stream data point per detik dari sensor sumur hulu migas untuk mencegah unplanned downtime fasilitas.",
        points: [
          "Volume data telemetri sensor yang sangat besar menghasilkan bottleneck pada database transaksional biasa saat visualisasi real-time.",
          "Keterlambatan dalam mendeteksi fluktuasi tekanan abnormal dapat menyebabkan kerusakan peralatan produksi bernilai miliaran rupiah.",
          "Fluktuasi noise data sensor di lapangan sering kali memicu false alarm pada sistem monitoring konvensional berbasis ambang batas statis (static threshold)."
        ]
      },
      results: [
        { metric: "Ingestion Throughput", before: "500 pts/sec", after: "10,000+ pts/sec", change: "20x Kapasitas" },
        { metric: "Anomaly Detection", before: "Post-Incident", after: "<5 detik Real-Time", change: "Early Warning" },
        { metric: "False Alarm Reduction", before: "42%", after: "6.8%", change: "83.8% Lebih Presisi" }
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
          caption: "Real-Time 32-Metric Upstream Wellhead & Pipeline Telemetry Grafana Dashboard"
        },
        {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          caption: "PostgreSQL Time-Series Partitioning Architecture with 30% Visual Latency Reduction"
        }
      ]
    }
  },
  {
    id: "slogmate-tactical-logistics-ai",
    title: "SLOGMate — AI-Powered Military Logistics & Tactical Fleet Orchestrator",
    category: "Agentic AI",
    description: "Sistem pendukung keputusan taktis dan orkestrasi rantai pasok logistik militer otonom dengan validasi inventaris real-time dan optimasi rute strategis.",
    tags: ["Defense Tech", "Tactical AI", "Route Optimization", "FastAPI", "PostgreSQL", "WebSockets"],
    image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/Rqwannn",
    githubUrl: "https://github.com/Rqwannn",
    featured: false,
    highlights: [
      "Merancang modul orkestrasi rute distribusi logistik taktis berdasarkan kondisi medan dan ketersediaan aset",
      "Membangun sistem validasi otomatis dokumen keputusan formal rantai pasok menggunakan AI parser",
      "Mengintegrasikan WebSocket untuk tracking real-time konvoi logistik dan status inventaris pos komando"
    ],
    detail: {
      duration: "Nov 2025 — Feb 2026",
      role: "AI & Backend Engineer at PT. MTG",
      technology: "Tactical Agentic AI",
      tools: ["FastAPI", "WebSockets", "Python", "PostgreSQL", "NetworkX", "Docker"],
      overview: "SLOGMate memberikan kepastian suplai logistik di zona taktis dengan mengotomatisasi kalkulasi kebutuhan amunisi, bahan bakar, dan rute konvoi teraman bagi komandan operasi.",
      problem: {
        title: "The Core Challenge — Tantangan Keputusan Logistik Real-Time & Dinamika Rute Taktis",
        description: "Menyediakan rekomendasi alokasi inventaris dan rute suplai logistik taktis di bawah kondisi medan operasi yang dinamis dan berisiko tinggi.",
        points: [
          "Penyusunan rencana kebutuhan suplai darurat militer secara manual rentan terhadap keterlambatan kalkulasi dan salah hitung kebutuhan logistik.",
          "Perubahan rute secara tiba-tiba di lapangan membutuhkan algoritma re-routing instan yang mempertimbangkan kapasitas muatan dan risiko medan.",
          "Ketiadaan sistem sentralisasi terenkripsi yang mampu menyajikan status amunisi dan bahan bakar pos terdepan secara real-time."
        ]
      },
      results: [
        { metric: "Route Calculation Time", before: "45 menit", after: "3.4 detik", change: "790x Lebih Cepat" },
        { metric: "Document Validation", before: "Manual Verification", after: "100% Automated Parsing", change: "Zero Delay" },
        { metric: "Supply Readiness", before: "78%", after: "98.5%", change: "+20.5% Kesiapan" }
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1200&q=80",
          caption: "WebSocket Real-Time Tactical Logistics Orchestration & Fleet State Machine"
        },
        {
          url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
          caption: "Autonomous Formal Decision Document Generation Engine with Schema Validation"
        }
      ]
    }
  },
  {
    id: "distributed-voice-cloning-ray",
    title: "Distributed Low-Latency Voice Synthesis & Cloning Cluster",
    category: "Data & Distributed ML",
    description: "Infrastruktur kloning suara dan sintesis audio terdistribusi berbasis Ray cluster untuk melayani inferensi TTS konkuren skala ribuan permintaan per menit.",
    tags: ["Distributed ML", "Ray Framework", "Voice Cloning", "PyTorch", "Audio AI", "Python"],
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://github.com/Rqwannn",
    githubUrl: "https://github.com/Rqwannn",
    featured: false,
    highlights: [
      "Mengorkestrasi worker GPU multi-node menggunakan Ray cluster untuk distribusi beban inferensi model suara secara dinamis",
      "Mengurangi latensi generasi audio dari 1.8 detik menjadi 240 milidetik menggunakan pipeline audio vocoder teroptimasi",
      "Menerapkan load balancing dinamis untuk menangani lonjakan traffic panggilan suara interaktif"
    ],
    detail: {
      duration: "Mar 2026 — Mei 2026",
      role: "Distributed AI Infrastructure Engineer",
      technology: "Distributed Voice AI",
      tools: ["Ray Framework", "PyTorch", "FastAPI", "Redis", "Docker", "CUDA"],
      overview: "Sistem sintesis suara terdistribusi ini memungkinkan aplikasi conversational AI melakukan kloning suara berkualitas studio dalam waktu nyata bagi kebutuhan agen layanan pelanggan otonom.",
      problem: {
        title: "The Core Challenge — Tantangan Orkestrasi Multi-GPU & Latensi Generasi Audio",
        description: "Menghilangkan jeda audio pada agen percakapan real-time dengan mendistribusikan komputasi neural vocoder ke kluster GPU Ray secara paralel.",
        points: [
          "Inferensi model text-to-speech neural vocoder membutuhkan daya komputasi GPU tinggi yang sering menimbulkan jeda hening (latency lag) pada panggilan telepon interaktif.",
          "Manajemen alokasi memori GPU pada server tunggal sering crash ketika menerima ratusan permintaan sintesis suara secara simultan.",
          "Kebutuhan orkestrasi worker pool dinamis yang mampu melakukan auto-scaling beban inferensi audio tanpa menjatuhkan koneksi audio streaming yang sedang aktif."
        ]
      },
      results: [
        { metric: "Audio Synthesis Latency", before: "1.8s", after: "240ms", change: "7.5x Lebih Cepat" },
        { metric: "GPU Cluster Utilization", before: "45% (Unbalanced)", after: "92% (Ray Orchestrated)", change: "+47% Efisiensi" },
        { metric: "Concurrent Streams", before: "8 streams", after: "120+ parallel streams", change: "15x Kapasitas" }
      ],
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
          caption: "Distributed Ray Cluster GPU Worker Task Queue & Audio Vocoder Pipeline"
        },
        {
          url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
          caption: "Multi-Client Concurrency Stress Benchmark: 10 Parallel Streams with Zero Latency Spike"
        }
      ]
    }
  }
]

export const raqwanTestimonials = [
  {
    id: 1,
    name: "PT. Mitra Teknologi Gemilang",
    role: "Chief Technology Officer",
    company: "PT. MTG",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    content: "Raqwan adalah arsitek AI yang luar biasa. Kepemimpinannya dalam mengembangkan platform MarketForge dan screening engine berlatensi sub-milidetik memberikan lompatan kapabilitas teknologi finansial yang sangat signifikan bagi perusahaan.",
    badge: "Leadership & Architecture"
  },
  {
    id: 2,
    name: "Dicoding x Accenture Asah Capstone 2026",
    role: "Lead Evaluation Committee",
    company: "Dicoding x Accenture",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content: "Proyek AI Learning Insight yang dipimpin oleh Raqwan menunjukkan integrasi Multi-Agent System dan Explainable AI (LIME) yang sangat matang. Layak mendapatkan predikat Best Capstone Project 2026.",
    badge: "Best Capstone 2026"
  },
  {
    id: 3,
    name: "Samsung Innovation Campus Batch 5",
    role: "National Technical Reviewer",
    company: "Samsung R&D Institute",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    content: "Pengembangan sistem conveyor Reclaimyt membuktikan keahlian mendalam Raqwan dalam mengintegrasikan model Computer Vision canggih dengan perangkat keras di kondisi lapangan secara presisi.",
    badge: "Top 10 National Team"
  }
]

export const raqwanWorkflows = [
  {
    step: "01",
    phase: "Problem Framing & Mathematical Modeling",
    tagline: "Mathematical Precision & Architecture Scoping",
    description: "Menganalisis domain problem teknis, memetakan batas latensi & throughput sistem, memilih fondasi algoritma deep learning / graf / multi-agent, serta merancang arsitektur data pipeline.",
    deliverables: ["Technical Architecture Blueprint", "Latency & SLA Constraint Matrix", "Mathematical Formulation & Schema", "Data Pipeline Ingestion Spec"]
  },
  {
    step: "02",
    phase: "Model Research, Training & Fine-Tuning",
    tagline: "Rigorous Training & Optimization",
    description: "Eksperimentasi model di PyTorch/TensorFlow, kuantisasi bobot (INT8/FP16), integrasi Explainable AI (LIME/SHAP), serta optimasi inferensi GPU/Edge menggunakan Ray & TensorRT.",
    deliverables: ["Trained Model Checkpoints & Weights", "XAI Interpretability & Audit Reports", "Quantization & Latency Benchmark", "Evaluation Metrics Matrix"]
  },
  {
    step: "03",
    phase: "Distributed Microservices & Real-Time Ingestion",
    tagline: "Ultra-Fast Production Backend",
    description: "Membangun backend microservices asinkron dengan FastAPI, orkestrasi streaming WebSockets berlatensi sub-milidetik, serta integrasi FalkorDB Knowledge Graph dan database relasional.",
    deliverables: ["FastAPI Microservices Codebase", "High-Throughput WebSocket Server", "Knowledge Graph Schema & Cypher Queries", "Docker / Container Configurations"]
  },
  {
    step: "04",
    phase: "Telemetry Monitoring & Production Stress-Testing",
    tagline: "Reliability, Scale & Continuous ML",
    description: "Melakukan load testing konkurensi ribuan request, instrumentasi telemetri Grafana/Prometheus, implementasi circuit breaker, serta pipeline CI/CD retraining otomatis.",
    deliverables: ["Grafana Real-Time Telemetry Dashboard", "Load & Concurrency Stress Test Report", "Production Deployment Runbook", "Automated Retraining Pipeline"]
  }
]

export const raqwanExperiences = [
  {
    role: "Head of Artificial Intelligence",
    company: "PT Mitra Teknologi Gemilang",
    period: "Jul 2026 — Present",
    description: "Memimpin divisi AI dalam perancangan MarketForge Securities Platform, sistem GraphRAG enterprise, dan orkestrasi infrastruktur inferensi terdistribusi.",
    tags: ["Agentic AI", "MarketForge", "FastAPI", "WebSockets", "GraphRAG", "PostgreSQL"]
  },
  {
    role: "Lead Machine Learning Engineer (SIC Batch 5)",
    company: "Samsung Innovation Campus",
    period: "Feb 2024 — Agu 2024",
    description: "Merancang Convolutional Neural Network (CNN) untuk conveyor pemilah sampah otomatis dan memimpin tim meraih Top 10 Best Team nasional.",
    tags: ["Computer Vision", "Deep Learning", "TensorFlow", "Edge AI"]
  }
]

export const raqwanMilestones = [
  {
    title: "Head of Artificial Intelligence",
    organization: "PT Mitra Teknologi Gemilang",
    description: "Dipercaya memimpin arsitektur riset dan engineering produk kecerdasan buatan enterprise skala nasional."
  },
  {
    title: "Best Capstone Project 2026",
    organization: "Dicoding x Accenture Asah",
    description: "Memenangkan predikat proyek capstone terbaik untuk platform AI Learning Insight berbasis Multi-Agent System dan XAI."
  },
  {
    title: "Top 10 Best Team SIC Batch 5 (2024)",
    organization: "Samsung Innovation Campus",
    description: "Membawa Reclaimyt masuk dalam 10 tim inovasi terbaik nasional pada kompetisi kecerdasan buatan dan IoT."
  },
  {
    title: "Computer Science Graduate — IPK 3.78",
    organization: "Universitas Gunadarma",
    description: "Lulus Sarjana Komputer (S1 Informatika) dengan predikat Sangat Memuaskan."
  }
]

export const raqwanCertifications = [
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2025" },
  { name: "Distributed Computing & Ray Framework", issuer: "Anyscale", year: "2025" },
  { name: "Samsung Innovation Campus AI & IoT Certified", issuer: "Samsung R&D Institute", year: "2024" }
]

export const raqwanEducations = [
  {
    degree: "Sarjana Komputer (S1 Informatika) — IPK 3.78 / 4.00",
    school: "Universitas Gunadarma",
    year: "2022 — 2026"
  }
]

export const raqwanFaqs = [
  {
    question: "Apa keunggulan arsitektur MarketForge Agentic AI dibanding sistem konvensional?",
    answer: "MarketForge mengintegrasikan multi-agent reasoning dengan screening engine biner berkecepatan tinggi, memungkinkan analisis 900+ saham secara real-time dengan latensi di bawah 12 milidetik dan streaming WebSocket live."
  },
  {
    question: "Bagaimana pendekatan Anda dalam menangani latency pada model deep learning?",
    answer: "Saya menggunakan teknik post-training quantization (INT8/FP16), TensorRT optimization, orkestrasi worker pool terdistribusi dengan Ray, dan caching multi-tier untuk memastikan respons inferensi ultra-cepat."
  },
  {
    question: "Apakah Anda menerima konsultasi arsitektur AI dan kolaborasi proyek?",
    answer: "Ya, saya terbuka untuk konsultasi teknis tingkat tinggi, perancangan sistem Agentic AI/GraphRAG, dan arsitektur backend performa tinggi."
  }
]
