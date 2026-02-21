export const personalInfo = {
  name: "Alexandro Francisco",
  roles: [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Open Source Contributor",
    "Problem Solver",
  ],
  bio: "Developer dengan obsesi terhadap detail dan performa. Saya tidak hanya menulis kode — saya membangun pengalaman digital yang clean, cepat, dan berkesan.",
  email: "lexyorforger22@example.com",
  github: "lexxyxyforger",
  location: "Jakarta, Indonesia",
  available: true,
  cvUrl: "/cv.pdf",
  avatar:
    "https://i.ibb.co.com/7JMD6MZ4/Chat-GPT-Image-19-Feb-2026-19-31-41.png",
};

export const skills = [
  { name: "React", level: 95, category: "Frontend" },
  { name: "Next.js", level: 90, category: "Frontend" },
  { name: "C++", level: 88, category: "Language" },
  { name: "Node.js", level: 82, category: "Backend" },
  { name: "TailwindCSS", level: 95, category: "Frontend" },
  { name: "PHP", level: 75, category: "Backend" },
  { name: "MySQL", level: 70, category: "Database" },
  { name: "Python", level: 72, category: "Language" },
];

export const skillRadar = [
  { subject: "Frontend", value: 95, fullMark: 100 },
  { subject: "Backend", value: 78, fullMark: 100 },
  { subject: "DataAnalystt", value: 65, fullMark: 100 },
  { subject: "Database", value: 74, fullMark: 100 },
  { subject: "UI/UX", value: 85, fullMark: 100 },
  { subject: "Mobile", value: 55, fullMark: 100 },
];

export const allTechStacks = ["Next.js", "API", "MySQL", "PHP"];

export const projects = [
  {
    id: "1",
    slug: "github-clone",
    title: "Github Clone",
    description:
      "Rekonstruksi GitHub dari nol — repository management, file upload, dan struktur folder yang fungsional dengan arsitektur fullstack modern.",
    longDescription:
      "Aplikasi ini memungkinkan pengguna membuat repository, upload file, dan melihat struktur folder. Fokus utama di arsitektur fullstack Next.js App Router, file handling di web, dan UI yang bersih serta responsif.",
    techStack: ["Next.js", "React", "API"],
    image: "https://i.ibb.co.com/7dsbYRYX/github.jpg",
    previewUrl: "#",
    repoUrl: "#",
    featured: true,
    status: "live",
    features: [
      "Repository management",
      "File upload & preview",
      "Folder structure viewer",
      "Responsive UI",
    ],
    problemSolving:
      "Tantangan utama adalah mensimulasikan sistem file di web. Solved dengan tree data structure dan recursive rendering.",
    year: "2024",
    tags: ["Fullstack", "Clone", "Next.js"],
  },
  {
    id: "2",
    slug: "nightfall-topup",
    title: "Nightfall Topup",
    description:
      "Platform top-up game dengan payment gateway terintegrasi — transaksi cepat, aman, dan real-time untuk semua gamer Indonesia.",
    longDescription:
      "E-commerce platform top-up game yang dibangun dari scratch dengan fitur lengkap mulai dari product catalog, checkout, hingga admin dashboard monitoring transaksi.",
    techStack: ["Next.js", "API"],
    image: "https://i.ibb.co.com/Z6yVfghP/image.png",
    previewUrl: "https://nightfalls-topup.vercel.app/",
    repoUrl: "#",
    featured: true,
    status: "live",
    features: [
      "Payment gateway integration",
      "Real-time order status",
      "SEO optimized",
      "Admin dashboard",
    ],
    problemSolving:
      "Race condition saat banyak user checkout bersamaan. Solved dengan database transaction dan optimistic locking.",
    year: "2024",
    tags: ["E-Commerce", "Payment", "Gaming"],
  },
  {
    id: "3",
    slug: "nekonime",
    title: "Nekonime — Anime Review",
    description:
      "Platform review anime dengan database lengkap, rating sistem, dan UI yang immersive buat para weeb sejati.",
    longDescription:
      "Platform review dan discovery anime yang terintegrasi dengan anime database API. User bisa search, review, rating, dan bookmark anime favorit mereka.",
    techStack: ["API", "Next.js"],
    image: "https://i.ibb.co.com/V6wcRBF/nekonime.jpg",
    previewUrl: "https://example.com",
    repoUrl: "https://github.com/example/nekonime",
    featured: false,
    status: "live",
    features: [
      "Anime search & discovery",
      "Review & rating system",
      "Bookmark collection",
      "Responsive design",
    ],
    problemSolving:
      "Rate limiting dari third-party API. Implementasi caching layer dengan revalidation untuk efisiensi request.",
    year: "2023",
    tags: ["Entertainment", "API Integration"],
  },
  {
    id: "4",
    slug: "nightfall-tech",
    title: "Nightfall Tech",
    description:
      "Platform teknologi all-in-one — dari landing page modern hingga sistem manajemen konten yang powerful untuk bisnis digital.",
    longDescription:
      "Platform layanan teknologi yang mencakup web development, digital marketing tools, dan CMS yang mudah digunakan oleh non-technical users.",
    techStack: ["PHP", "MySQL", "API"],
    image: "https://i.ibb.co.com/4BSpcY9/nightfall-assist.jpg",
    previewUrl: null,
    repoUrl: "https://github.com/example/nightfall-tech",
    featured: false,
    status: "open-source",
    features: [
      "Custom CMS",
      "SEO tools",
      "Analytics dashboard",
      "Multi-user support",
    ],
    problemSolving:
      "Performa lambat saat load konten besar. Implementasi lazy loading dan query optimization di MySQL.",
    year: "2023",
    tags: ["CMS", "PHP", "Business"],
  },
  {
    id: "5",
    slug: "techstore",
    title: "TechStore",
    description:
      "Toko elektronik online dengan katalog produk dinamis, keranjang belanja, dan sistem checkout yang smooth dari awal sampai selesai.",
    longDescription:
      "Platform e-commerce untuk produk teknologi dengan fitur filter produk, wishlist, cart management, dan integrasi payment lokal.",
    techStack: ["PHP", "MySQL", "API"],
    image: "https://i.ibb.co.com/QFmRwbWy/Cuplikan-layar-2026-02-10-175231.png",
    previewUrl: null,
    repoUrl: "https://github.com/example/techstore",
    featured: false,
    status: "open-source",
    features: [
      "Product catalog & filter",
      "Cart & wishlist",
      "Order management",
      "Payment integration",
    ],
    problemSolving:
      "Inconsistent cart state antar session. Solved dengan server-side session management dan database-backed cart.",
    year: "2023",
    tags: ["E-Commerce", "PHP", "MySQL"],
  },
 {
    id: "6",
    slug: "Snapshot Code",
    title: "Snapshot Code",
    description:
      "Tool untuk menghasilkan screenshot kode yang indah dan siap share ke mana saja.",
    longDescription:
      "Snapshot Code memungkinkan developer mengubah kode mereka menjadi gambar estetik dengan kustomisasi penuh — tema warna, font, padding, background, dan watermark. Output siap dipakai untuk portofolio, media sosial, atau dokumentasi.",
    techStack: ["Next.js", "API"],
    image: "https://i.ibb.co.com/NnjwnQnT/image.png",
    previewUrl: "https://snapshot-code.vercel.app/",
    repoUrl: "https://github.com/example/snapshot-code",
    featured: false,
    status: "open-source",
    features: [
      "Kustomisasi tema & warna",
      "Pilihan font programming",
      "Export PNG / SVG",
      "Background gradient & blur",
    ],
    problemSolving:
      "Developer sering share kode sebagai teks biasa yang susah dibaca. Snapshot Code mengubahnya jadi visual yang clean dan profesional dalam hitungan detik.",
    year: "2023",
    tags: ["Snapshot", "Next.js", "Tool"],
  },
  {
    id: "7",
    slug: "URL-Shortener",
    title: "URL Shortener",
    description:
      "Perpendek URL panjang jadi link bersih yang mudah dibagikan dan dilacak.",
    longDescription:
      "Platform URL shortener dengan fitur custom alias, tracking klik real-time, dan analytics sederhana. Dibangun untuk cepat, ringan, dan bisa diintegrasikan via API ke project lain.",
    techStack: ["PHP", "MySQL", "API"],
    image: "https://i.ibb.co.com/NnjwnQnT/image.png",
    previewUrl: "https://snapshot-code.vercel.app/",
    repoUrl: "https://github.com/example/url-shortener",
    featured: false,
    status: "open-source",
    features: [
      "Custom alias URL",
      "Klik tracking & analytics",
      "API endpoint tersedia",
      "QR code generator",
    ],
    problemSolving:
      "Link panjang susah dibagikan dan tidak bisa dilacak. URL Shortener memberi kontrol penuh atas link — dari alias hingga statistik klik.",
    year: "2023",
    tags: ["URL", "PHP", "API"],
  },
];

export const experiences = [
  {
    id: "1",
    company: "Media Nursantara Citra University",
    role: "Penjoki Tugas",
    period: "Oct 2025 – Sekarang",
    description:
      "Membantu mahasiswa dalam menyelesaikan tugas akademik berbasis teknologi — dari web development, presentasi, hingga dokumentasi teknis.",
    techStack: ["React", "Next.js", "PHP", "MySQL"],
    type: "work",
  },
  {
    id: "2",
    company: "Media Nursantara Citra University",
    role: "Mahasiswa Aktif",
    period: "2022 – Sekarang",
    description:
      "Menempuh pendidikan di bidang teknologi informasi sambil aktif mengembangkan skill fullstack secara mandiri dan melalui proyek nyata.",
    techStack: [
      "Java",
      "Node.js",
      "PHP",
      "C++",
      "React",
      "JavaScript",
      "MySQL",
    ],
    type: "education",
  },
  {
    id: "3",
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2022 – Sekarang",
    description:
      "Mengerjakan 30+ proyek freelance untuk klien lokal dan internasional — dari landing page, platform e-commerce, hingga sistem manajemen internal.",
    techStack: ["Next.js", "React", "PHP", "MySQL", "Node.js"],
    type: "work",
  },
  {
    id: "4",
    company: "Freelance",
    role: "Web Developer",
    period: "2019 – 2022",
    description:
      "Memulai karir sebagai web developer dengan fokus di company profile dan toko online sederhana menggunakan WordPress dan PHP.",
    techStack: ["React", "WordPress", "PHP"],
    type: "work",
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Adi Santoso",
    role: "CTO, TechCorp Indonesia",
    avatar: "https://picsum.photos/seed/budi/100/100",
    content:
      "Alex adalah developer yang luar biasa. Dia tidak hanya menulis kode yang bersih, tapi juga selalu memberikan solusi yang tepat untuk setiap masalah.",
    rating: 5,
  },
  {
    id: "2",
    name: "Valeri",
    role: "Product Manager, StartupXYZ",
    avatar: "https://picsum.photos/seed/sarah/100/100",
    content:
      "Bekerja dengan Alex adalah pengalaman yang menyenangkan. Dia selalu deliver on time dan kualitas kerjanya konsisten tinggi.",
    rating: 5,
  },
  {
    id: "3",
    name: "Azka",
    role: "CEO Laguna",
    avatar: "https://picsum.photos/seed/ahmad/100/100",
    content:
      "Alex berhasil rebuild platform kami dalam 3 bulan dan hasilnya melampaui ekspektasi. Performance meningkat drastis.",
    rating: 5,
  },
];

export const blogPosts = [
  {
    id: "1",
    slug: "next-js-performance-tips",
    title: "10 Tips Optimasi Performance Next.js yang Wajib Kamu Tahu",
    excerpt:
      "Pengalaman saya mengoptimasi Next.js app dari Lighthouse score 60 menjadi 98+.",
    content:
      "## Introduction\n\nSetelah berbulan-bulan bergulat dengan performance issues di Next.js, saya berhasil menemukan beberapa tips yang sangat membantu...\n\n## 1. Gunakan Image Component\n\nSelalu gunakan `next/image` bukan tag `<img>` biasa. Ini otomatis melakukan lazy loading dan optimasi format.\n\n## 2. Code Splitting\n\nManfaatkan dynamic imports untuk component yang tidak perlu dimuat di awal.",
    tags: ["Next.js", "Performance", "Web Dev"],
    readTime: "8 min",
    date: "2024-07-15",
    views: 1234,
  },
  {
    id: "2",
    slug: "typescript-advanced-patterns",
    title: "TypeScript Advanced Patterns yang Mengubah Cara Saya Coding",
    excerpt: "Dari conditional types sampai template literal types.",
    content:
      "## Why Advanced TypeScript?\n\nSetelah 3 tahun pakai TypeScript, saya akhirnya mulai eksplorasi fitur-fitur advanced yang selama ini saya hindari...",
    tags: ["TypeScript", "Patterns", "Best Practices"],
    readTime: "12 min",
    date: "2024-06-22",
    views: 892,
  },
  {
    id: "3",
    slug: "debugging-react-performance",
    title: "Cara Debugging React Performance Issues Seperti Pro",
    excerpt:
      "React DevTools Profiler, memo, useMemo, useCallback - kapan dipakai dan kapan tidak.",
    content:
      "## The Problem\n\nBanyak developer React yang langsung reach for useMemo dan useCallback padahal itu belum tentu yang diperlukan...",
    tags: ["React", "Performance", "Debugging"],
    readTime: "10 min",
    date: "2024-05-10",
    views: 2103,
  },
];
export const certificates = [
  {
    id: "1",
    title: "TEENS - PROGRAMMER",
    issuer: "Timedoor Academy",
    date: "2023-12",
    image: "https://res.cloudinary.com/dhzxohznj/image/upload/v1771552434/download_doy9qf.jpg",
    description:
      "Menguasai fundamental programming — logic, algoritma, dan problem solving sebagai pondasi karir developer.",
  },
  {
    id: "2",
    title: "AI ENGINEER - PYTHON FOR DATA SCIENCE",
    issuer: "Timedoor Academy",
    date: "2024-03",
    image: "https://res.cloudinary.com/dhzxohznj/image/upload/v1771552634/uc_a7ch4g.jpg",
    description:
      "Menguasai Python untuk data science — dari manipulasi data dengan Pandas, visualisasi, hingga analisis statistik berbasis AI.",
  },
  {
    id: "3",
    title: "AI ENGINEER - AI MACHINE LEARNING",
    issuer: "Timedoor Academy",
    date: "2025-10",
    image: "https://res.cloudinary.com/dhzxohznj/image/upload/v1771552831/uc_ejp43j.jpg",
    description:
      "Membangun dan melatih model machine learning — supervised learning, evaluasi model, dan implementasi ke aplikasi nyata.",
  },
  {
    id: "4",
    title: "SOFTWARE DEVELOPER - ANDROID APPS DEVELOPER",
    issuer: "Timedoor Academy",
    date: "2025-03",
    image: "https://res.cloudinary.com/dhzxohznj/image/upload/v1771553056/uc_yfzscr.jpg",
    description:
      "Membangun aplikasi Android yang fungsional dan production-ready — dari UI/UX hingga integrasi API dan deployment ke Play Store.",
  },
  {
    id: "5",
    title: "AI ENGINEER - AI COMPUTER VISION",
    issuer: "Timedoor Academy",
    date: "2026-01",
    image: "https://res.cloudinary.com/dhzxohznj/image/upload/v1771553611/uc_jwvjvz.jpg",
    description:
      "Mengimplementasikan computer vision — deteksi objek, image classification, dan real-time visual AI menggunakan Python dan OpenCV.",
  },
  {
    id: "6",
    title: "TEENS WEB DEVELOPER",
    issuer: "Timedoor Academy",
    date: "2024-10",
    image: "https://res.cloudinary.com/dhzxohznj/image/upload/v1771553784/uc_qbr8xr.jpg",
    description:
      "Menguasai HTML, CSS, dan JavaScript untuk membangun website yang responsif dan interaktif dari nol.",
  },
  {
    id: "7",
    title: "WEBSITE DEVELOPMENT",
    issuer: "Timedoor Academy Pro",
    date: "2026-02",
    image: "https://res.cloudinary.com/dhzxohznj/image/upload/v1771553942/img19_n7myw0.jpg",
    description:
      "Membangun website modern end-to-end — frontend responsif, backend API, database, authentication, dan deployment production.",
  },
];