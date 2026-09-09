// src/app/(admin)/moderation/data.js

export const formatRupiah = (number) => {
  if (number === undefined || number === null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// 1. MODERATION & COMPLIANCE KPI SUMMARY
export const moderationKpiSummary = {
  totalProductsAudited: 128450,       // 128.450 Total Produk Terdaftar di Ekosistem Indovia
  approvedProducts: 126120,          // 126.120 Produk Lolos & Tayang Publik (APPROVED)
  flaggedForReview: 1890,            // 1.890 Produk Terdeteksi Kata Terlarang (FLAGGED_FOR_REVIEW)
  takedownByAdmin: 440,              // 440 Produk Dicabut Sepihak (TAKEDOWN_BY_ADMIN)
  activePenalizedStores: 38,         // 38 Toko Terkena Poin Pelanggaran (Strike)
  autoScanAccuracy: '99.2%',         // Akurasi Filter Kata Terlarang
  totalBlacklistKeywords: 215,       // 215 Kata Kunci Terlarang dalam Kamus
};

// 2. PENALTY STRIKE KPI SUMMARY
export const penaltyKpiSummary = {
  totalStrikesActive: 38,
  strike1Warnings: 22,               // 1x Pelanggaran: Peringatan Tertulis + Takedown
  strike2UploadFreeze: 11,           // 2x Pelanggaran: Pembatasan Upload 7 Hari
  strike3PermanentBan: 5,            // 3x Pelanggaran: Toko Dibekukan Permanen
  takedownsThisMonth: 86,
  appealsPending: 7,
};

// 3. AUTOMATED BLACKLIST WORD DICTIONARY
export const blacklistDictionary = [
  {
    category: 'Narkotika & Psikotropika',
    severity: 'CRITICAL',
    description: 'Zat adiktif, narkotika golongan 1-3, dan obat penenang ilegal dilarang keras berdasarkan UU Narkotika No. 35/2009.',
    keywords: [
      'ganja', 'sabu', 'gorilla', 'tramadol', 'alprazolam', 'dumolid',
      'tembakau sintetis', 'ekstasi', 'bong', 'heroin', 'sinte'
    ],
  },
  {
    category: 'Senjata Api & Benda Berbahaya',
    severity: 'HIGH',
    description: 'Senjata api, amunisi, bahan peledak, atau senjata tajam tanpa izin resmi UU Darurat No. 12/1951.',
    keywords: [
      'airsoft tanpa izin', 'amunisi', 'senpi', 'pistol rakitan',
      'celurit tawuran', 'senapan angin ilegal', 'karambit tajam', 'pedang samurai ilegal'
    ],
  },
  {
    category: 'Obat Keras & Tanpa Izin BPOM',
    severity: 'HIGH',
    description: 'Obat keras daftar G, obat kuat ilegal, suplemen berbahaya, atau kosmetik tanpa notifikasi BPOM resmi.',
    keywords: [
      'obat kuat tanpa bpom', 'penggugur kandungan', 'cytotec', 'gastrul',
      'suntik putih ilegal', 'merkuri pemutih', 'pil perangsang', 'injeksi botox ilegal'
    ],
  },
  {
    category: 'Barang Palsu Bermerek (Hak Cipta / KW Super)',
    severity: 'MEDIUM',
    description: 'Produk tiruan atau pemalsuan merek dagang terdaftar melanggar UU Merek No. 20/2016.',
    keywords: [
      'rolex kw', 'rolex clone 1:1', 'nike replika super', 'gucci fake',
      'louis vuitton mirror', 'sepatu adidas kw', 'jersey grade ori thailand', 'tas hermes palsu'
    ],
  },
  {
    category: 'Konten Asusila & Pornografi',
    severity: 'CRITICAL',
    description: 'Media atau barang asusila yang melanggar UU Pornografi No. 44/2008 & Pasal 27 ayat 1 UU ITE.',
    keywords: [
      'alat bantu seks tanpa izin', 'video asusila', 'bokep', 'obat perangsang',
      'obat tidur wanita', 'lingerie vulgar ekstrem'
    ],
  },
];

// 4. FORMAL LEGAL VIOLATION REASONS
export const formalViolationReasons = [
  {
    code: 'NARCOTICS_SUBSTANCES',
    title: 'Pelanggaran UU Narkotika No. 35/2009',
    description: 'Menjual zat psikotropika, obat penenang terlarang, atau peralatan konsumsi narkotika tanpa izin Kemenkes.',
  },
  {
    code: 'BPOM_HEALTH_VIOLATION',
    title: 'Pelanggaran Standar BPOM & Kesehatan (UU Kesehatan No. 17/2023)',
    description: 'Menjual obat keras daftar G tanpa resep dokter, kosmetik bermerkuri, atau suplemen tanpa izin edar resmi.',
  },
  {
    code: 'TRADEMARK_COUNTERFEIT',
    title: 'Pelanggaran Hak Cipta & Merek Dagang (UU Merek No. 20/2016)',
    description: 'Menjual barang palsu, tiruan KW Super, replika 1:1, atau pembajakan merek internasional berlisensi resmi.',
  },
  {
    code: 'ILLEGAL_WEAPONS',
    title: 'Kepemilikan Senjata Ilegal (UU Darurat No. 12/1951)',
    description: 'Menjual senjata api, airsoft ilegal, amunisi, atau senjata tajam yang berpotensi membahayakan keselamatan umum.',
  },
  {
    code: 'PORNOGRAPHY_ITE',
    title: 'Pelanggaran Konten Asusila (UU ITE & UU Pornografi No. 44/2008)',
    description: 'Menjual konten pornografi, jasa ilegal, atau barang asusila yang dilarang peredarannya di Indonesia.',
  },
  {
    code: 'FRAUD_MISLEADING',
    title: 'Penipuan Konsumen & Iklan Menyesatkan (UU Perlindungan Konsumen)',
    description: 'Deskripsi produk fiktif, indikasi skema penipuan, atau pencantuman garansi palsu.',
  },
];

// 5. SAMPLE AUDIT PRODUCTS ACROSS MERCHANTS
export const sampleCatalogProducts = [
  {
    id: 'PRD-MOD-101',
    name: 'Jam Tangan Pria Mewah Automatic Rolex KW Super Clone 1:1 Ceramic Bezel',
    sku: 'RLX-SUB-KW-09',
    storeId: 'MCH-002',
    storeName: 'TechnoGadget & Watch Official',
    ownerName: 'Michael Tanuwidjaja',
    category: 'Jam Tangan & Perhiasan',
    price: 1850000,
    stock: 24,
    uploadDate: '2026-09-08 14:20 WIB',
    status: 'FLAGGED_FOR_REVIEW',
    detectedKeywords: ['rolex kw', 'rolex clone 1:1'],
    violationCategory: 'Barang Palsu Bermerek (Hak Cipta / KW Super)',
    flagReason: 'Terdeteksi kata kunci barang tiruan merek terdaftar Rolex pada judul produk.',
    riskLevel: 'HIGH',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80',
  },
  {
    id: 'PRD-MOD-102',
    name: 'Tramadol HCL Kapsul Penenang Saraf Herbal Original Ampuh',
    sku: 'TRM-KPS-88',
    storeId: 'MCH-008',
    storeName: 'Herbal Alam Sejahtera',
    ownerName: 'Dr. Faisal Rahman',
    category: 'Kesehatan & Obat-obatan',
    price: 95000,
    stock: 120,
    uploadDate: '2026-09-09 08:15 WIB',
    status: 'FLAGGED_FOR_REVIEW',
    detectedKeywords: ['tramadol'],
    violationCategory: 'Narkotika & Psikotropika',
    flagReason: 'Terdeteksi penjualan obat keras daftar G (Tramadol) yang memerlukan resep dokter dan izin khusus.',
    riskLevel: 'CRITICAL',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80',
  },
  {
    id: 'PRD-MOD-103',
    name: 'Unit Airsoft Tanpa Izin Full Metal M4 Tembakan BB Bulat Gotri',
    sku: 'ARS-M4-01',
    storeId: 'MCH-006',
    storeName: 'Sneakers Holic & Tactical',
    ownerName: 'Kevin Sanjaya',
    category: 'Olahraga & Hobi',
    price: 2450000,
    stock: 5,
    uploadDate: '2026-09-07 19:40 WIB',
    status: 'TAKEDOWN_BY_ADMIN',
    detectedKeywords: ['airsoft tanpa izin'],
    violationCategory: 'Senjata Api & Benda Berbahaya',
    flagReason: 'Dicabut sepihak karena melanggar UU Darurat senjata api dan replika tanpa izin kepolisian.',
    takedownDate: '2026-09-08 09:30 WIB',
    takedownBy: 'Superadmin Indovia Compliance Team',
    riskLevel: 'CRITICAL',
    imageUrl: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=300&q=80',
  },
  {
    id: 'PRD-MOD-104',
    name: 'Cream Pemutih Wajah Instan Glowing Tanpa BPOM Alami 100%',
    sku: 'CRM-WHT-99',
    storeId: 'MCH-004',
    storeName: 'Hijab Elegance & Beauty ID',
    ownerName: 'Siti Nurhaliza Putri',
    category: 'Kecantikan & Kosmetik',
    price: 65000,
    stock: 80,
    uploadDate: '2026-09-09 10:10 WIB',
    status: 'FLAGGED_FOR_REVIEW',
    detectedKeywords: ['tanpa bpom'],
    violationCategory: 'Obat Keras & Tanpa Izin BPOM',
    flagReason: 'Klaim tanpa BPOM terindikasi mengandung bahan berbahaya atau belum ternotifikasi.',
    riskLevel: 'HIGH',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80',
  },
  {
    id: 'PRD-MOD-105',
    name: 'Batik Tulis Sutra Halus Motif Parang Rusak Barong Solo Tradisional',
    sku: 'BTK-PRG-01',
    storeId: 'MCH-001',
    storeName: 'Batik Nusantara Heritage',
    ownerName: 'Raden Mas Arya',
    category: 'Pakaian & Mode Tradisional',
    price: 1450000,
    stock: 45,
    uploadDate: '2026-09-05 11:30 WIB',
    status: 'APPROVED',
    detectedKeywords: [],
    violationCategory: null,
    flagReason: null,
    riskLevel: 'SAFE',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80',
  },
  {
    id: 'PRD-MOD-106',
    name: 'Kopi Arabika Java Preanger Single Origin Grade 1 Specialty 250gr',
    sku: 'KOP-JPR-250',
    storeId: 'MCH-003',
    storeName: 'Java Coffee Roastery',
    ownerName: 'Bambang Sudibyo',
    category: 'Makanan & Minuman',
    price: 85000,
    stock: 200,
    uploadDate: '2026-09-06 09:00 WIB',
    status: 'APPROVED',
    detectedKeywords: [],
    violationCategory: null,
    flagReason: null,
    riskLevel: 'SAFE',
    imageUrl: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=300&q=80',
  },
  {
    id: 'PRD-MOD-107',
    name: 'Sepatu Lari Nike Replika Super Grade Ori Vietnam Bantalan Empuk',
    sku: 'NKE-RUN-KW-02',
    storeId: 'MCH-006',
    storeName: 'Sneakers Holic & Tactical',
    ownerName: 'Kevin Sanjaya',
    category: 'Sepatu Pria & Olahraga',
    price: 320000,
    stock: 60,
    uploadDate: '2026-09-08 17:05 WIB',
    status: 'FLAGGED_FOR_REVIEW',
    detectedKeywords: ['nike replika super', 'grade ori'],
    violationCategory: 'Barang Palsu Bermerek (Hak Cipta / KW Super)',
    flagReason: 'Terindikasi produk tiruan tidak resmi merek dagang terdaftar Nike.',
    riskLevel: 'HIGH',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
  },
  {
    id: 'PRD-MOD-108',
    name: 'Kursi Tamu Ukir Jati Jepara Formasi 3211 Finishing Melamine Natural',
    sku: 'FNT-JPR-001',
    storeId: 'MCH-005',
    storeName: 'Furnitur Jepara Asli',
    ownerName: 'Haji Ahmad Soleh',
    category: 'Perlengkapan Rumah & Furnitur',
    price: 6500000,
    stock: 8,
    uploadDate: '2026-09-04 14:15 WIB',
    status: 'APPROVED',
    detectedKeywords: [],
    violationCategory: null,
    flagReason: null,
    riskLevel: 'SAFE',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80',
  },
  {
    id: 'PRD-MOD-109',
    name: 'Buku Resep Masakan Tradisional Nusantara Aneka Sambal Dapur Mama',
    sku: 'BKO-DPR-12',
    storeId: 'MCH-007',
    storeName: 'Dapur Mama Rasa',
    ownerName: 'Dewi Sartika',
    category: 'Buku & Majalah',
    price: 49000,
    stock: 150,
    uploadDate: '2026-09-06 16:20 WIB',
    status: 'APPROVED',
    detectedKeywords: [],
    violationCategory: null,
    flagReason: null,
    riskLevel: 'SAFE',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80',
  },
  {
    id: 'PRD-MOD-110',
    name: 'Sinte Tembakau Sintetis Premium Aroma Buah Kering 5 Gram',
    sku: 'SNT-GR-05',
    storeId: 'MCH-012',
    storeName: 'Vape & Tobacco Corner',
    ownerName: 'Rian Pratama',
    category: 'Rokok & Tembakau',
    price: 350000,
    stock: 15,
    uploadDate: '2026-09-09 11:45 WIB',
    status: 'FLAGGED_FOR_REVIEW',
    detectedKeywords: ['sinte', 'tembakau sintetis'],
    violationCategory: 'Narkotika & Psikotropika',
    flagReason: 'Zat narkotika sintetis golongan 1 dilarang keras beredar oleh BNN & UU Narkotika.',
    riskLevel: 'CRITICAL',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&q=80',
  },
  {
    id: 'PRD-MOD-111',
    name: 'Tas Wanita Louis Vuitton Mirror Quality Kulit Monogram Asli Canvas',
    sku: 'LV-MRR-01',
    storeId: 'MCH-004',
    storeName: 'Hijab Elegance & Beauty ID',
    ownerName: 'Siti Nurhaliza Putri',
    category: 'Tas & Aksesoris Wanita',
    price: 890000,
    stock: 18,
    uploadDate: '2026-09-07 13:00 WIB',
    status: 'TAKEDOWN_BY_ADMIN',
    detectedKeywords: ['louis vuitton mirror'],
    violationCategory: 'Barang Palsu Bermerek (Hak Cipta / KW Super)',
    flagReason: 'Dicabut sepihak atas aduan pemilik lisensi merek resmi Louis Vuitton Malletier.',
    takedownDate: '2026-09-07 16:45 WIB',
    takedownBy: 'Superadmin Legal & IP Officer',
    riskLevel: 'HIGH',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80',
  },
  {
    id: 'PRD-MOD-112',
    name: 'Suplemen Herbal Ekstrak Kulit Manggis & Daun Sirsak Terdaftar BPOM',
    sku: 'MGS-BPOM-60',
    storeId: 'MCH-008',
    storeName: 'Herbal Alam Sejahtera',
    ownerName: 'Dr. Faisal Rahman',
    category: 'Kesehatan & Obat-obatan',
    price: 110000,
    stock: 90,
    uploadDate: '2026-09-05 10:00 WIB',
    status: 'APPROVED',
    detectedKeywords: [],
    violationCategory: null,
    flagReason: null,
    riskLevel: 'SAFE',
    imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=300&q=80',
  },
];

// 6. MERCHANT PENALTY STRIKE DIRECTORY
export const penaltyStrikeMerchants = [
  {
    merchantId: 'MCH-006',
    storeName: 'Sneakers Holic & Tactical',
    ownerName: 'Kevin Sanjaya',
    ownerEmail: 'kevin.sneakersholic@gmail.com',
    ownerPhone: '+62 817-1234-5678',
    strikeLevel: 2, // 2x Pelanggaran: Pembatasan upload produk baru selama 7 hari
    strikeStatus: 'RESTRICTED_UPLOAD',
    activePenalty: 'Pembatasan Upload Produk Baru (7 Hari)',
    cooldownUntil: '2026-09-15 00:00 WIB (Sisa 6 Hari)',
    takedownCount: 4,
    violations: [
      {
        strikeNo: 1,
        date: '2026-08-20',
        productName: 'Sepatu Adidas Yeezy KW Super Vietnam',
        reason: 'Barang Palsu Bermerek (Hak Cipta / KW Super)',
        actionTaken: 'Surat Peringatan Tertulis + Takedown Produk',
      },
      {
        strikeNo: 2,
        date: '2026-09-08',
        productName: 'Unit Airsoft Tanpa Izin Full Metal M4 Gotri',
        reason: 'Senjata Api & Benda Berbahaya (UU Darurat No. 12/1951)',
        actionTaken: 'Takedown Produk + Pembekuan Upload Produk Baru 7 Hari',
      },
    ],
  },
  {
    merchantId: 'MCH-012',
    storeName: 'Vape & Tobacco Corner',
    ownerName: 'Rian Pratama',
    ownerEmail: 'rian.vapetobacco@yahoo.com',
    ownerPhone: '+62 813-7766-9900',
    strikeLevel: 3, // 3x Pelanggaran: Permanent Store Ban / Freeze
    strikeStatus: 'BANNED_FREEZE',
    activePenalty: 'Permanent Store Ban & Saldo Escrow Dibekukan',
    cooldownUntil: 'PERMANEN (Toko Ditutup untuk Publik)',
    takedownCount: 6,
    violations: [
      {
        strikeNo: 1,
        date: '2026-07-15',
        productName: 'Liquid Vape Tanpa Cukai Resmi',
        reason: 'Pelanggaran Cukai Rokok & Bea Cukai',
        actionTaken: 'Peringatan Tertulis 1 + Takedown Produk',
      },
      {
        strikeNo: 2,
        date: '2026-08-10',
        productName: 'Bong Kaca Pyrex Alat Hisap',
        reason: 'Peralatan Konsumsi Narkotika Terlarang',
        actionTaken: 'Peringatan Keras 2 + Pembatasan Upload 7 Hari',
      },
      {
        strikeNo: 3,
        date: '2026-09-09',
        productName: 'Sinte Tembakau Sintetis Premium 5gr',
        reason: 'Narkotika Golongan 1 (UU Narkotika No. 35/2009)',
        actionTaken: 'Permanent Store Ban / Freeze & Laporan ke BNN/Kepolisian',
      },
    ],
  },
  {
    merchantId: 'MCH-002',
    storeName: 'TechnoGadget & Watch Official',
    ownerName: 'Michael Tanuwidjaja',
    ownerEmail: 'michael@technogadget.co.id',
    ownerPhone: '+62 811-9988-7766',
    strikeLevel: 1, // 1x Pelanggaran: Peringatan tertulis + Takedown
    strikeStatus: 'WARNING_ACTIVE',
    activePenalty: 'Surat Peringatan Tertulis Resmi (Strike 1)',
    cooldownUntil: 'Masa Pantau 30 Hari',
    takedownCount: 2,
    violations: [
      {
        strikeNo: 1,
        date: '2026-09-08',
        productName: 'Jam Tangan Pria Rolex KW Super Clone 1:1',
        reason: 'Barang Palsu Bermerek (UU Merek No. 20/2016)',
        actionTaken: 'Surat Teguran Resmi via Email + Takedown Produk',
      },
    ],
  },
  {
    merchantId: 'MCH-004',
    storeName: 'Hijab Elegance & Beauty ID',
    ownerName: 'Siti Nurhaliza Putri',
    ownerEmail: 'siti.nurhaliza@hijabelegance.com',
    ownerPhone: '+62 819-4455-6677',
    strikeLevel: 1,
    strikeStatus: 'WARNING_ACTIVE',
    activePenalty: 'Surat Peringatan Tertulis Resmi (Strike 1)',
    cooldownUntil: 'Masa Pantau 30 Hari',
    takedownCount: 1,
    violations: [
      {
        strikeNo: 1,
        date: '2026-09-07',
        productName: 'Tas Wanita Louis Vuitton Mirror Quality',
        reason: 'Barang Palsu Bermerek (Hak Cipta / KW Super)',
        actionTaken: 'Surat Peringatan Tertulis + Takedown Produk',
      },
    ],
  },
  {
    merchantId: 'MCH-008',
    storeName: 'Herbal Alam Sejahtera',
    ownerName: 'Dr. Faisal Rahman',
    ownerEmail: 'faisal.herbalalam@gmail.com',
    ownerPhone: '+62 812-5566-7788',
    strikeLevel: 2,
    strikeStatus: 'RESTRICTED_UPLOAD',
    activePenalty: 'Pembatasan Upload Produk Baru (7 Hari)',
    cooldownUntil: '2026-09-14 00:00 WIB (Sisa 5 Hari)',
    takedownCount: 3,
    violations: [
      {
        strikeNo: 1,
        date: '2026-08-05',
        productName: 'Pil Pelangsing Ekstrem Tanpa BPOM',
        reason: 'Obat Keras & Tanpa Izin BPOM',
        actionTaken: 'Surat Teguran Tertulis + Takedown Produk',
      },
      {
        strikeNo: 2,
        date: '2026-09-09',
        productName: 'Tramadol HCL Kapsul Penenang Saraf',
        reason: 'Obat Keras Tanpa Resep / Narkotika',
        actionTaken: 'Takedown Produk + Pembekuan Upload Produk Baru 7 Hari',
      },
    ],
  },
];
