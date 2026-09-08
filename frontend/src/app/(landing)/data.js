export const navLinks = [
  { label: 'Fitur', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Statistik', href: '#stats' },
  { label: 'Harga', href: '#pricing' },
  { label: 'Testimoni', href: '#testimonials' }
];

export const statsData = [
  {
    number: '99.9%',
    label: 'Uptime & Keandalan',
    description: 'Infrastruktur cloud berkinerja tinggi',
    icon: 'solar:server-square-bold-duotone',
    variant: 'primary'
  },
  {
    number: '150K+',
    label: 'Pengguna Aktif',
    description: 'Dipercaya merchant global setiap hari',
    icon: 'solar:users-group-rounded-bold-duotone',
    variant: 'success'
  },
  {
    number: '$2.8M+',
    label: 'Volume Transaksi',
    description: 'Diproses aman setiap bulannya',
    icon: 'solar:chart-square-bold-duotone',
    variant: 'warning'
  },
  {
    number: '4.95 / 5',
    label: 'Rating Kepuasan',
    description: 'Dari lebih dari 3.400 ulasan merchant',
    icon: 'solar:star-bold-duotone',
    variant: 'danger'
  }
];

export const featuresData = [
  {
    title: 'Real-Time Analytics',
    description: 'Pantau tren penjualan, retensi pelanggan, dan metrik konversi secara langsung dengan visualisasi interaktif.',
    icon: 'solar:graph-new-up-bold-duotone',
    badge: 'Realtime',
    badgeVariant: 'primary'
  },
  {
    title: 'Manajemen Order & Stok',
    description: 'Kelola inventaris multi-lokasi, pelacakan status pengiriman, dan pemenuhan pesanan dalam satu kontrol pusat.',
    icon: 'solar:box-bold-duotone',
    badge: 'E-Commerce',
    badgeVariant: 'info'
  },
  {
    title: 'Manajemen Pelanggan & Seller',
    description: 'Database pelanggan terpadu dengan analisis riwayat belanja, profil seller, dan sistem ticketing terintegrasi.',
    icon: 'solar:users-group-two-rounded-bold-duotone',
    badge: 'CRM',
    badgeVariant: 'success'
  },
  {
    title: 'Role & Izin Akses Fleksibel',
    description: 'Proteksi data dengan kontrol akses berbasis peran (RBAC) bertingkat untuk admin, manager, dan staf gudang.',
    icon: 'solar:shield-keyhole-bold-duotone',
    badge: 'Security',
    badgeVariant: 'danger'
  },
  {
    title: 'Invoicing & Kupon Promosi',
    description: 'Cetak faktur instan, buat kampanye diskon, kode kupon berbatas waktu, dan integrasi gateway pembayaran multi-mata uang.',
    icon: 'solar:bill-list-bold-duotone',
    badge: 'Finance',
    badgeVariant: 'warning'
  },
  {
    title: 'Tema Gelap & Terang Modern',
    description: 'Pengalaman visual ergonomis dengan palet warna HSL modern yang otomatis mengikuti preferensi pengguna.',
    icon: 'solar:sun-2-bold-duotone',
    badge: 'UI/UX',
    badgeVariant: 'secondary'
  }
];

export const adminShowcaseData = [
  {
    id: 'dashboard',
    title: 'Admin Dashboard Utama',
    category: 'Pusat Kendali',
    description: 'Ringkasan metrik harian, grafik performa, statistik regional, dan feed aktivitas toko Anda secara live.',
    route: '/dashboard',
    icon: 'solar:widget-5-bold-duotone',
    highlight: 'Ikhtisar Realtime'
  },
  {
    id: 'products',
    title: 'Katalog Produk & Varian',
    category: 'E-Commerce',
    description: 'Manajemen produk komprehensif, mulai dari kategori, stok, atribut, hingga upload gambar drag-and-drop.',
    route: '/products/product-list',
    icon: 'solar:bag-heart-bold-duotone',
    highlight: 'CRUD Lengkap'
  },
  {
    id: 'orders',
    title: 'Pelacakan Pesanan Terpadu',
    category: 'Operasional',
    description: 'Filter pesanan berdasarkan status pembayaran, kurir ekspedisi, dan cetak invoice dalam hitungan detik.',
    route: '/orders/order-list',
    icon: 'solar:cart-check-bold-duotone',
    highlight: 'Workflow Cepat'
  },
  {
    id: 'customers',
    title: 'Data & Perilaku Pelanggan',
    category: 'CRM',
    description: 'Kenali pelanggan setia Anda dengan profil mendalam, analitik lifetime value, dan riwayat transaksi.',
    route: '/customer/customer-list',
    icon: 'solar:user-speak-rounded-bold-duotone',
    highlight: 'Customer 360°'
  }
];

export const pricingData = [
  {
    name: 'Starter',
    badge: 'Untuk Usaha Rintisan',
    price: '$29',
    period: '/bulan',
    description: 'Solusi tepat untuk toko baru yang ingin berkembang dengan sistem yang rapi dan terukur.',
    isPopular: false,
    features: [
      'Hingga 1.000 produk aktif',
      'Dashboard analitik dasar',
      '2 Akun Admin & Staf',
      'Manajemen order standar',
      'Support email 24/7'
    ],
    buttonText: 'Mulai Uji Coba Gratis',
    buttonVariant: 'outline-primary'
  },
  {
    name: 'Professional',
    badge: 'Paling Diminati',
    price: '$79',
    period: '/bulan',
    description: 'Paket lengkap untuk bisnis e-commerce yang ingin otomatisasi dan analisis mendalam.',
    isPopular: true,
    features: [
      'Produk tidak terbatas',
      'Real-time Advanced Analytics & Charts',
      '10 Akun Admin dengan custom role',
      'Manajemen inventaris multi-gudang',
      'Sistem kupon & invoice otomatis',
      'Dukungan prioritas 24/7'
    ],
    buttonText: 'Coba Paket Pro',
    buttonVariant: 'primary'
  },
  {
    name: 'Enterprise',
    badge: 'Skala Besar',
    price: '$199',
    period: '/bulan',
    description: 'Kustomisasi penuh dan infrastruktur khusus untuk korporasi dengan jutaan transaksi.',
    isPopular: false,
    features: [
      'Semua fitur Professional',
      'Unlimited seat pengguna & staf',
      'Dedicated Account Manager',
      'Custom API & Webhook Integrations',
      'SLA Uptime 99.99% dengan garansi',
      'Audit log & kepatuhan enterprise'
    ],
    buttonText: 'Hubungi Tim Sales',
    buttonVariant: 'outline-primary'
  }
];

export const testimonialsData = [
  {
    name: 'Ahmad Fauzi',
    role: 'Founder & CEO di RetailTech',
    content: 'Larkon merevolusi cara kami memantau 15 toko cabang. Dashboard-nya sangat intuitif dan performanya luar biasa cepat!',
    rating: 5,
    avatar: '/images/users/avatar-1.jpg'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Head of Operations di Luxe Apparel',
    content: 'Pemisahan modul dan kemudahan navigasi membuat tim operasional kami 3x lebih efisien dalam memproses order setiap hari.',
    rating: 5,
    avatar: '/images/users/avatar-2.jpg'
  },
  {
    name: 'David Reynolds',
    role: 'Tech Lead di Omnichannel Asia',
    content: 'Clean code architecture yang luar biasa! Komponen-komponennya sangat mudah dikustomisasi sesuai kebutuhan bisnis kami.',
    rating: 5,
    avatar: '/images/users/avatar-3.jpg'
  }
];
