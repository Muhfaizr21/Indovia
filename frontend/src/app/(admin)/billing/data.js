// Data & Helper configurations for Modul 2: SaaS Monetization, Subscription & Billing Engine

export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// Initial Pricing Plans Tier
export const initialPricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    badge: 'Bisnis Pemula',
    badgeColor: 'secondary',
    tagline: 'Solusi ideal bagi UMKM dan penjual baru yang baru memulai storefront mandiri.',
    priceMonthly: 199000,
    price6Month: 1074600, // 10% diskon: 199k * 6 = 1.194k -> 1.074.600
    priceYearly: 1910400, // 20% diskon: 199k * 12 = 2.388k -> 1.910.400
    isActive: true,
    isPopular: false,
    quotas: {
      maxProducts: 50,
      maxStaff: 1,
      storageGb: 2,
      customDomain: false, // Hanya subdomain .indovia.com
      customTheme: false,
      apiWebhook: false,
      bandwidthGb: 50,
      supportSla: 'Komunitas & Email (24-48 Jam)',
    },
    takeRate: {
      percent: 1.5, // 1.5% GMV
      fixedFee: 1000, // Rp 1.000 / order
    },
    subscriberCount: 68,
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: 'Paling Populer',
    badgeColor: 'primary',
    tagline: 'Untuk brand berkembang yang butuh domain sendiri, staf toko, dan kapasitas katalog besar.',
    priceMonthly: 499000,
    price6Month: 2694600, // 10% diskon: 499k * 6 = 2.994k -> 2.694.600
    priceYearly: 4790400, // 20% diskon: 499k * 12 = 5.988k -> 4.790.400
    isActive: true,
    isPopular: true,
    quotas: {
      maxProducts: 500,
      maxStaff: 5,
      storageGb: 20,
      customDomain: true, // Domain kustom + Zero-touch SSL
      customTheme: true,
      apiWebhook: true,
      bandwidthGb: 250,
      supportSla: 'Prioritas Email & WhatsApp (4-8 Jam)',
    },
    takeRate: {
      percent: 0.8, // 0.8% GMV
      fixedFee: 500, // Rp 500 / order
    },
    subscriberCount: 54,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    badge: 'Skala Besar',
    badgeColor: 'warning',
    tagline: 'Untuk brand mapan dengan volume tinggi. Nikmati 0% take-rate dan akses tak terbatas.',
    priceMonthly: 1499000,
    price6Month: 8094600, // 10% diskon: 1.499k * 6 = 8.994k -> 8.094.600
    priceYearly: 14390400, // 20% diskon: 1.499k * 12 = 17.988k -> 14.390.400
    isActive: true,
    isPopular: false,
    quotas: {
      maxProducts: 'Unlimited',
      maxStaff: 'Unlimited',
      storageGb: 100,
      customDomain: true,
      customTheme: true,
      apiWebhook: true,
      bandwidthGb: 'Unlimited',
      supportSla: 'Dedicated Account Manager (1 Jam Response)',
    },
    takeRate: {
      percent: 0.0, // 0% GMV (hanya bayar sewa SaaS)
      fixedFee: 0,
    },
    subscriberCount: 20,
  },
  {
    id: 'custom',
    name: 'Custom Tailored',
    badge: 'Solusi Korporasi',
    badgeColor: 'dark',
    tagline: 'Infrastruktur dedicated cluster, private VPC, audit ISO compliance, dan kontrak khusus.',
    priceMonthly: 4999000,
    price6Month: 26994600,
    priceYearly: 47990400,
    isActive: true,
    isPopular: false,
    quotas: {
      maxProducts: 'Unlimited',
      maxStaff: 'Unlimited',
      storageGb: 500,
      customDomain: true,
      customTheme: true,
      apiWebhook: true,
      bandwidthGb: 'Unlimited Dedicated',
      supportSla: '24/7 Hotline & 99.99% SLA Uptime',
    },
    takeRate: {
      percent: 0.0,
      fixedFee: 0,
    },
    subscriberCount: 5,
  },
];

// Dunning Engine Queue Data
export const initialDunningQueue = [
  {
    id: 'DUN-001',
    merchantCode: 'IND-M-201',
    merchantName: 'Toko Hijab Cantik Solo',
    subdomain: 'hijabcantik',
    ownerName: 'Aisyah Rahma',
    ownerPhone: '0812-4455-8899',
    plan: 'Pro',
    billingCycle: 'Bulanan',
    amount: 499000,
    dueDate: '2026-09-09T00:00:00Z',
    attemptCount: 1,
    lastAttemptAt: '2026-09-09T04:15:00Z',
    nextRetryAt: '2026-09-10T04:15:00Z',
    dunningStage: 'STAGE_H', // Hari H
    status: 'RETRY_1',
    paymentMethod: 'Kartu Kredit (Visa ****4321)',
    failureReason: 'Saldo Rekening / Limit Kartu Tidak Cukup (Insufficient Funds)',
    notificationLogs: [
      { type: 'EMAIL', sentAt: '2026-09-09T04:15:10Z', status: 'Delivered' },
      { type: 'WHATSAPP', sentAt: '2026-09-09T04:15:12Z', status: 'Read' },
    ],
    gracePeriodEndsAt: '2026-09-16T00:00:00Z',
  },
  {
    id: 'DUN-002',
    merchantCode: 'IND-M-202',
    merchantName: 'Kopi Nusantara Roastery',
    subdomain: 'kopinusantara',
    ownerName: 'Bambang Sudibyo',
    ownerPhone: '0813-9988-2211',
    plan: 'Starter',
    billingCycle: 'Bulanan',
    amount: 199000,
    dueDate: '2026-09-08T00:00:00Z',
    attemptCount: 2,
    lastAttemptAt: '2026-09-09T02:30:00Z',
    nextRetryAt: '2026-09-11T02:30:00Z',
    dunningStage: 'STAGE_H1', // Hari H+1
    status: 'RETRY_2',
    paymentMethod: 'BCA Virtual Account Auto-Debit',
    failureReason: 'Otorisasi Bank Ditolak (Do Not Honor)',
    notificationLogs: [
      { type: 'EMAIL', sentAt: '2026-09-08T03:00:00Z', status: 'Delivered' },
      { type: 'WHATSAPP', sentAt: '2026-09-08T03:00:05Z', status: 'Delivered' },
      { type: 'WHATSAPP', sentAt: '2026-09-09T02:30:05Z', status: 'Sent' },
    ],
    gracePeriodEndsAt: '2026-09-15T00:00:00Z',
  },
  {
    id: 'DUN-003',
    merchantCode: 'IND-M-203',
    merchantName: 'Sepatu Trendi Bandung',
    subdomain: 'sepatutrendi',
    ownerName: 'Hendra Gunawan',
    ownerPhone: '0817-2233-4455',
    plan: 'Pro',
    billingCycle: '6 Bulan',
    amount: 2694600,
    dueDate: '2026-09-06T00:00:00Z',
    attemptCount: 3,
    lastAttemptAt: '2026-09-09T01:00:00Z',
    nextRetryAt: '2026-09-13T01:00:00Z',
    dunningStage: 'STAGE_H3', // Hari H+3
    status: 'PAST_DUE', // Warning banner aktif
    paymentMethod: 'Mandiri Auto-Debit',
    failureReason: 'Akun Terblokir / Masa Berlaku Kartu Habis (Expired Card)',
    notificationLogs: [
      { type: 'EMAIL', sentAt: '2026-09-06T01:00:00Z', status: 'Delivered' },
      { type: 'WHATSAPP', sentAt: '2026-09-07T01:00:00Z', status: 'Delivered' },
      { type: 'WHATSAPP', sentAt: '2026-09-09T01:00:00Z', status: 'Delivered' },
    ],
    gracePeriodEndsAt: '2026-09-13T00:00:00Z',
  },
  {
    id: 'DUN-004',
    merchantCode: 'IND-M-204',
    merchantName: 'Gadget Second Murah',
    subdomain: 'gadgetsecond',
    ownerName: 'Rian Setyawan',
    ownerPhone: '0856-1122-3344',
    plan: 'Starter',
    billingCycle: 'Bulanan',
    amount: 199000,
    dueDate: '2026-09-02T00:00:00Z',
    attemptCount: 4,
    lastAttemptAt: '2026-09-09T00:00:00Z',
    nextRetryAt: null,
    dunningStage: 'STAGE_H7', // Hari H+7
    status: 'FROZEN', // Checkout toko publik dikunci
    paymentMethod: 'GoPay Auto-Debit',
    failureReason: 'Token Pembayaran Tidak Valid / E-Wallet Dibatalkan Pemilik',
    notificationLogs: [
      { type: 'EMAIL', sentAt: '2026-09-02T00:00:00Z', status: 'Delivered' },
      { type: 'WHATSAPP', sentAt: '2026-09-05T00:00:00Z', status: 'Delivered' },
      { type: 'WHATSAPP', sentAt: '2026-09-09T00:00:00Z', status: 'Delivered' },
    ],
    gracePeriodEndsAt: '2026-09-09T00:00:00Z',
  },
  {
    id: 'DUN-005',
    merchantCode: 'IND-M-205',
    merchantName: 'Batik Semar Solo',
    subdomain: 'batiksemar',
    ownerName: 'Danang Wicaksono',
    ownerPhone: '0812-7788-9900',
    plan: 'Enterprise',
    billingCycle: 'Tahunan',
    amount: 14390400,
    dueDate: '2026-09-08T00:00:00Z',
    attemptCount: 2,
    lastAttemptAt: '2026-09-09T06:00:00Z',
    nextRetryAt: null,
    dunningStage: 'STAGE_RESOLVED',
    status: 'RESOLVED',
    paymentMethod: 'Kartu Kredit (Mastercard ****8812)',
    failureReason: null,
    notificationLogs: [
      { type: 'EMAIL', sentAt: '2026-09-08T00:00:00Z', status: 'Delivered' },
      { type: 'WHATSAPP', sentAt: '2026-09-09T06:01:00Z', status: 'Delivered' },
    ],
    gracePeriodEndsAt: '2026-09-15T00:00:00Z',
  },
];

// Live Platform Take-rate Commission Transaction Feed
export const initialTakeRateTransactions = [
  {
    orderId: 'ORD-89210',
    merchantCode: 'IND-M-101',
    merchantName: 'Batik Nusantara Official',
    plan: 'Enterprise',
    gmvAmount: 1850000,
    takeRateScheme: '0.0% + Rp 0',
    platformCommission: 0,
    merchantNetPayout: 1850000,
    orderDate: '2026-09-09T07:54:12Z',
    settlementStatus: 'SETTLED',
  },
  {
    orderId: 'ORD-89209',
    merchantCode: 'IND-M-102',
    merchantName: 'Bandung Gadget Hub',
    plan: 'Pro',
    gmvAmount: 3450000,
    takeRateScheme: '0.8% + Rp 500',
    platformCommission: 28100, // (3.450.000 * 0.008) + 500 = 27.600 + 500 = 28.100
    merchantNetPayout: 3421900,
    orderDate: '2026-09-09T07:41:00Z',
    settlementStatus: 'PENDING_PAYOUT',
  },
  {
    orderId: 'ORD-89208',
    merchantCode: 'IND-M-103',
    merchantName: 'Kopi Gayo Mandiri',
    plan: 'Starter',
    gmvAmount: 240000,
    takeRateScheme: '1.5% + Rp 1.000',
    platformCommission: 4600, // (240.000 * 0.015) + 1.000 = 3.600 + 1.000 = 4.600
    merchantNetPayout: 235400,
    orderDate: '2026-09-09T07:22:30Z',
    settlementStatus: 'SETTLED',
  },
  {
    orderId: 'ORD-89207',
    merchantCode: 'IND-M-104',
    merchantName: 'Surabaya Sneaker Vault',
    plan: 'Pro',
    gmvAmount: 1250000,
    takeRateScheme: '0.8% + Rp 500',
    platformCommission: 10500, // 10.000 + 500 = 10.500
    merchantNetPayout: 1239500,
    orderDate: '2026-09-09T06:50:11Z',
    settlementStatus: 'PENDING_PAYOUT',
  },
  {
    orderId: 'ORD-89206',
    merchantCode: 'IND-M-105',
    merchantName: 'Kue Lapis Legit Surabaya',
    plan: 'Starter',
    gmvAmount: 480000,
    takeRateScheme: '1.5% + Rp 1.000',
    platformCommission: 8200, // 7.200 + 1.000 = 8.200
    merchantNetPayout: 471800,
    orderDate: '2026-09-09T06:14:05Z',
    settlementStatus: 'SETTLED',
  },
  {
    orderId: 'ORD-89205',
    merchantCode: 'IND-M-106',
    merchantName: 'Sneakers Urban Jakarta',
    plan: 'Enterprise',
    gmvAmount: 2890000,
    takeRateScheme: '0.0% + Rp 0',
    platformCommission: 0,
    merchantNetPayout: 2890000,
    orderDate: '2026-09-09T05:30:22Z',
    settlementStatus: 'SETTLED',
  },
];

// Global Billing & Financial KPI Summary
export const billingKpiSummary = {
  totalNetRevenue: 126650000, // Langganan SaaS + Komisi GMV
  mrr: 84500000,              // Monthly Recurring Revenue
  arrRunRate: 1014000000,     // 12 x MRR
  activeSubscribers: 142,
  trialSubscribers: 28,
  totalPlatformGmv: 3820000000, // Rp 3.82 Miliar GMV
  platformTakeRateNet: 42150000,// Total komisi dari transaksi
  dunningAtRisk: 4990000,       // Nominal gagal tagih saat ini
  dunningAtRiskCount: 4,        // 4 toko dalam proses dunning
  churnRateMonthly: '1.2%',
};

// Dunning Stage Helper Info
export const dunningStageConfig = {
  STAGE_H: {
    label: 'Hari H (Gagal Awal)',
    color: 'warning',
    bg: 'rgba(245, 158, 11, 0.12)',
    textColor: '#d97706',
    description: 'Auto-debit gagal pada tanggal jatuh tempo. Notifikasi WA & Email telah dikirim.',
  },
  STAGE_H1: {
    label: 'Hari H+1 (Percobaan 2)',
    color: 'warning',
    bg: 'rgba(245, 158, 11, 0.12)',
    textColor: '#d97706',
    description: 'Percobaan otomatis ke-2 gagal. Pengingat intensif diterbitkan ke WhatsApp merchant.',
  },
  STAGE_H3: {
    label: 'Hari H+3 (Past Due)',
    color: 'danger',
    bg: 'rgba(239, 68, 68, 0.12)',
    textColor: '#ef4444',
    description: 'Toko masuk status PAST_DUE. Banner peringatan ditampilkan di dashboard merchant.',
  },
  STAGE_H7: {
    label: 'Hari H+7 (Frozen)',
    color: 'dark',
    bg: 'rgba(100, 116, 139, 0.15)',
    textColor: '#475569',
    description: 'Toko berstatus FROZEN. Checkout storefront publik dikunci hingga tagihan lunas.',
  },
  STAGE_RESOLVED: {
    label: 'Lunas (Resolved)',
    color: 'success',
    bg: 'rgba(34, 197, 94, 0.12)',
    textColor: '#16a34a',
    description: 'Tagihan perpanjangan sewa telah berhasil terbayar penuh.',
  },
};

// ============================================================================
// SENIOR ACCOUNTING & CASHFLOW ANALYTICS DATA (5W1H CONCEPTUAL FRAMEWORK)
// ============================================================================

// Executive Accounting & Liquidity Controls
export const accountingControls = {
  fiscalYear: '2026',
  currentPeriod: 'September 2026',
  accountingStandards: 'PSAK 72 / IFRS 15 (Pendapatan Kontrak Pelanggan)',
  bankReconciliationStatus: 'MATCHED',
  unreconciledDifference: 0,
  reconciliationAuditDate: '2026-09-09 08:00:00 WIB',
  grossInvoicedBilled: 138450000,
  cycleDiscountVolume: 4320000,
  realizedGrossCash: 126650000,
  deferredRevenueBalance: 34200000, // Pendapatan diterima di muka (belum diakui)
  accountsReceivableCurrent: 28500000,
  accountsReceivableDunning: 4990000,
  badDebtProvision: 850000, // 0.67% cadangan piutang ragu-ragu
  paymentGatewayMdrFee: 2480000, // 1.95% direct banking fee
  directCogsHostingCdn: 15250000, // Alokasi biaya cloud server & storage langsung
  netOperatingCashflow: 108920000,
  cashRunwayMonths: 16.4,
  quickRatio: 4.8,
  collectionEfficiencyRate: 94.2,
  daysSalesOutstanding: 3.6,
  ruleOf40Index: 51.2,
  netRevenueRetention: 114.8,
};

// CHART 1 DATA: [WHAT] Komposisi Arus Kas Masuk & Realisasi Pendapatan Bersih (12 Bulan)
export const monthlyCashflowTrend = {
  months: ['Okt 25', 'Nov 25', 'Des 25', 'Jan 26', 'Feb 26', 'Mar 26', 'Apr 26', 'Mei 26', 'Jun 26', 'Jul 26', 'Agu 26', 'Sep 26'],
  subscriptionInflow: [48.2, 52.0, 58.5, 62.0, 65.4, 69.1, 72.5, 75.0, 78.4, 80.2, 82.5, 84.5], // Juta IDR
  takeRateInflow: [18.4, 21.2, 26.5, 28.0, 30.2, 33.5, 35.8, 37.2, 39.0, 40.5, 41.2, 42.1],       // Juta IDR
  directDeductions: [8.5, 9.2, 10.5, 11.0, 11.4, 12.1, 12.6, 13.0, 13.5, 13.8, 14.1, 14.5],      // Juta IDR (MDR + Cloud)
  netOperatingCash: [58.1, 64.0, 74.5, 79.0, 84.2, 90.5, 95.7, 99.2, 103.9, 106.9, 109.6, 112.1], // Juta IDR
  operatingMarginPct: [87.2, 87.4, 87.6, 87.8, 88.0, 88.2, 88.3, 88.4, 88.5, 88.6, 88.6, 88.5],  // %
};

// CHART 2 DATA: [WHERE] Distribusi Kanal Pembayaran, Efisiensi Settlement & Beban MDR
export const paymentChannelAnalysis = [
  {
    channel: 'BCA OneClick Tokenized',
    provider: 'PT Bank Central Asia Tbk',
    inflowAmount: 48200000,
    sharePct: 38.1,
    mdrRate: '1.50%',
    mdrCost: 723000,
    declineRate: '1.8%',
    settlementSpeed: 'T+1 Kliring BI',
    badgeColor: 'primary',
  },
  {
    channel: 'Mandiri E-Debit Cardlink',
    provider: 'PT Bank Mandiri (Persero) Tbk',
    inflowAmount: 30400000,
    sharePct: 24.0,
    mdrRate: '1.60%',
    mdrCost: 486400,
    declineRate: '2.4%',
    settlementSpeed: 'T+1 Kliring BI',
    badgeColor: 'info',
  },
  {
    channel: 'GoPay Auto-Debit',
    provider: 'GoTo Financial / Midtrans',
    inflowAmount: 27850000,
    sharePct: 22.0,
    mdrRate: '2.00%',
    mdrCost: 557000,
    declineRate: '3.8%',
    settlementSpeed: 'T+0 Real-time',
    badgeColor: 'success',
  },
  {
    channel: 'QRIS Dinamis Otomatis',
    provider: 'Bank Indonesia & ASPI',
    inflowAmount: 13900000,
    sharePct: 11.0,
    mdrRate: '0.70%',
    mdrCost: 97300,
    declineRate: '0.9%',
    settlementSpeed: 'T+1 Kliring BI',
    badgeColor: 'warning',
  },
  {
    channel: 'Virtual Account Multi-Bank',
    provider: 'BCA, BNI, BRI, Permata',
    inflowAmount: 6300000,
    sharePct: 4.9,
    mdrRate: 'Rp 3.500 Tetap',
    mdrCost: 616000,
    declineRate: '4.5%',
    settlementSpeed: 'T+1 Kliring BI',
    badgeColor: 'secondary',
  },
];

export const tierCashflowDistribution = {
  series: [52, 34, 14],
  labels: ['Tier Enterprise (Sewa + 0% Take-rate)', 'Tier Pro (Sewa + 0.8% Take-rate)', 'Tier Starter (1.5% Take-rate)'],
  colors: ['#ff6c2f', '#3b82f6', '#64748b'],
};

// CHART 3 DATA: [WHEN] Jadwal Umur Piutang (Aging Schedule) & Proyeksi Likuiditas 30 Hari
export const agingScheduleData = [
  {
    category: 'Lancar (Current: 0-3 Hari)',
    amount: 28500000,
    sharePct: 86.4,
    merchantCount: 52,
    collectionProbability: '98.8%',
    riskLevel: 'Rendah (Normal)',
    color: '#16a34a',
  },
  {
    category: 'Dalam Masa Tenggang (4-7 Hari)',
    amount: 3200000,
    sharePct: 9.7,
    merchantCount: 7,
    collectionProbability: '89.2%',
    riskLevel: 'Perhatian Khusus',
    color: '#f59e0b',
  },
  {
    category: 'Tunggakan Past Due (8-14 Hari)',
    amount: 1150000,
    sharePct: 3.5,
    merchantCount: 3,
    collectionProbability: '64.0%',
    riskLevel: 'Sedang (Banner Aktif)',
    color: '#ef4444',
  },
  {
    category: 'Macet / Toko Dibekukan (>15 Hari)',
    amount: 640000,
    sharePct: 0.4,
    merchantCount: 1,
    collectionProbability: 'Penyisihan 100%',
    riskLevel: 'Tinggi (Checkout Kunci)',
    color: '#475569',
  },
];

export const liquidityForecastData = {
  weeks: ['M1 (1-7 Sep)', 'M2 (8-14 Sep)', 'M3 (15-21 Sep)', 'M4 (22-30 Sep)'],
  targetQuota: [32.0, 27.5, 34.0, 26.5], // Juta IDR
  projectedInflow: [34.2, 28.6, 35.8, 28.0], // Juta IDR
  scheduledRenewals: [48, 42, 56, 38], // Jumlah merchant renewal
};

// CHART 4 DATA: [WHO] Matriks Kontribusi Merchant (Pareto 80/20) & Profil Kepatuhan
export const topMerchantContributors = [
  {
    id: 1,
    rank: '#1',
    merchantName: 'Butik Azzahra Official',
    merchantCode: 'IND-M-001',
    tier: 'Enterprise',
    monthlyInflow: 14390400, // Pembayaran Tahunan diamortisasi
    gmvAmount: 480000000,
    autoDebitMethod: 'BCA OneClick Tokenized',
    reliabilityScore: 100,
    paymentStatus: 'Lancar Sempurna',
    reconciliationStatus: 'MATCHED',
    shareOfPlatformCash: '11.4%',
  },
  {
    id: 2,
    rank: '#2',
    merchantName: 'Toko Elektronik Berkah',
    merchantCode: 'IND-M-002',
    tier: 'Enterprise',
    monthlyInflow: 1499000,
    gmvAmount: 350000000,
    autoDebitMethod: 'Mandiri E-Debit Cardlink',
    reliabilityScore: 98,
    paymentStatus: 'Lancar Sempurna',
    reconciliationStatus: 'MATCHED',
    shareOfPlatformCash: '1.2%',
  },
  {
    id: 3,
    rank: '#3',
    merchantName: 'Kopi Kenangan Senja',
    merchantCode: 'IND-M-003',
    tier: 'Pro',
    monthlyInflow: 2949000, // 499k sewa + 2.450k take-rate
    gmvAmount: 180000000,
    autoDebitMethod: 'GoPay Auto-Debit',
    reliabilityScore: 96,
    paymentStatus: 'Lancar Sempurna',
    reconciliationStatus: 'MATCHED',
    shareOfPlatformCash: '2.3%',
  },
  {
    id: 4,
    rank: '#4',
    merchantName: 'Dapur Nusantara Rempah',
    merchantCode: 'IND-M-004',
    tier: 'Pro',
    monthlyInflow: 2449000, // 499k sewa + 1.950k take-rate
    gmvAmount: 145000000,
    autoDebitMethod: 'BCA OneClick Tokenized',
    reliabilityScore: 95,
    paymentStatus: 'Lancar Sempurna',
    reconciliationStatus: 'MATCHED',
    shareOfPlatformCash: '1.9%',
  },
  {
    id: 5,
    rank: '#5',
    merchantName: 'Gaya Hijab Muslimah',
    merchantCode: 'IND-M-005',
    tier: 'Pro',
    monthlyInflow: 2119000, // 499k sewa + 1.620k take-rate
    gmvAmount: 120000000,
    autoDebitMethod: 'QRIS Dinamis Otomatis',
    reliabilityScore: 94,
    paymentStatus: 'Lancar Sempurna',
    reconciliationStatus: 'MATCHED',
    shareOfPlatformCash: '1.7%',
  },
  {
    id: 6,
    rank: '#6',
    merchantName: 'Herbal Alami Sentosa',
    merchantCode: 'IND-M-006',
    tier: 'Starter',
    monthlyInflow: 1340000, // 0 sewa + 1.340k take-rate
    gmvAmount: 75000000,
    autoDebitMethod: 'Virtual Account BCA',
    reliabilityScore: 91,
    paymentStatus: 'Lancar Sempurna',
    reconciliationStatus: 'MATCHED',
    shareOfPlatformCash: '1.1%',
  },
  {
    id: 7,
    rank: '#7',
    merchantName: 'Perlengkapan Bayi Ceria',
    merchantCode: 'IND-M-007',
    tier: 'Pro',
    monthlyInflow: 1389000,
    gmvAmount: 62000000,
    autoDebitMethod: 'Mandiri E-Debit Cardlink',
    reliabilityScore: 82,
    paymentStatus: 'Peringatan Dunning (H+1)',
    reconciliationStatus: 'IN_TRANSIT',
    shareOfPlatformCash: '1.1%',
  },
];

// CHART 5 DATA: [WHY] Analisis Varians Gross-to-Net & Atribusi Kegagalan Debit
export const grossToNetWaterfall = [
  { label: 'Tagihan Bruto Terbit (Gross Invoiced)', amount: 138450000, isDeduction: false },
  { label: 'Diskon Siklus Panjang (6 Bulan & Tahunan)', amount: -4320000, isDeduction: true },
  { label: 'Beban MDR Kliring Payment Gateway', amount: -2480000, isDeduction: true },
  { label: 'Tunggakan Tertunda di Dunning (Gagal Debit)', amount: -4990000, isDeduction: true },
  { label: 'Arus Kas Masuk Bersih Terealisasi di Bank', amount: 126660000, isTotal: true },
];

export const failureAttributionData = [
  {
    reason: 'Saldo Rekening / E-Wallet Tidak Mencukupi',
    percentage: 54,
    amount: 2694600,
    cases: 14,
    color: '#ef4444',
  },
  {
    reason: 'Tokenisasi Kartu / Mandat Otomatis Kedaluwarsa',
    percentage: 26,
    amount: 1297400,
    cases: 6,
    color: '#f59e0b',
  },
  {
    reason: 'Gangguan Jaringan Interkoneksi Bank Mitra',
    percentage: 14,
    amount: 698600,
    cases: 3,
    color: '#3b82f6',
  },
  {
    reason: 'Batas Limit Pembayaran Harian Terlampaui',
    percentage: 6,
    amount: 299400,
    cases: 1,
    color: '#64748b',
  },
];

// CHART 6 DATA: [HOW] Rasio Kesehatan Finansial & Solvabilitas SaaS (Audit Standard)
export const saasFinancialRatios = [
  {
    metric: 'Quick Ratio Likuiditas Kas',
    value: '4.8x',
    benchmark: 'Ambang Batas > 1.5x',
    status: 'Sangat Solven',
    score: 96,
    color: '#16a34a',
    note: 'Kas siap pakai mencukupi beban operasional 16.4 bulan ke depan tanpa pinjaman luar.',
  },
  {
    metric: 'Tingkat Ketertagihan Pertama (First-Pass)',
    value: '94.2%',
    benchmark: 'Standar Industri > 90%',
    status: 'Sangat Efisien',
    score: 94,
    color: '#16a34a',
    note: '94.2% tagihan auto-debit berhasil dipotong tanpa intervensi manual pada Hari H.',
  },
  {
    metric: 'Net Revenue Retention (NRR)',
    value: '114.8%',
    benchmark: 'Target SaaS > 105%',
    status: 'Ekspansi Kuat',
    score: 92,
    color: '#ff6c2f',
    note: 'Pertumbuhan ekspansi GMV & upgrade tier melebihi kehilangan akibat churn pelanggan.',
  },
  {
    metric: 'Rule of 40 Index',
    value: '51.2%',
    benchmark: 'Kriteria Sehat > 40%',
    status: 'Unggul / Elite',
    score: 98,
    color: '#16a34a',
    note: 'Kombinasi pertumbuhan pendapatan tahunan 34.0% dan margin laba bersih kas 17.2%.',
  },
  {
    metric: 'Days Sales Outstanding (DSO)',
    value: '3.6 Hari',
    benchmark: 'Batas Maksimum < 15 Hari',
    status: 'Cepat & Sehat',
    score: 95,
    color: '#3b82f6',
    note: 'Waktu rata-rata konversi invoice menjadi dana efektif di rekening bank operasional.',
  },
  {
    metric: 'Penyisihan Piutang Tak Tertagih',
    value: '0.67%',
    benchmark: 'Batas Toleransi < 2.0%',
    status: 'Risiko Terkendali',
    score: 90,
    color: '#64748b',
    note: 'Penyisihan kerugian akibat toko macet yang dibekukan hanya 0.67% dari total billing.',
  },
];

// Buku Jurnal Kas & Mutasi Rekonsiliasi Real-Time (General Ledger Feed)
export const cashflowJournalEntries = [
  {
    id: 'JRN-01',
    date: '2026-09-09 07:45:12',
    journalRef: 'JRN-2026-0909-001',
    debitAccount: '1110 - Kas Bank BCA Escrow IDR',
    creditAccount: '4110 - Pendapatan Sewa SaaS Tier Pro',
    merchantName: 'Kopi Kenangan Senja',
    merchantCode: 'IND-M-003',
    amount: 499000,
    transactionType: 'INFLOW_SUBSCRIPTION',
    reconciliationStatus: 'MATCHED',
    notes: 'Perpanjangan sewa Pro bulanan via GoPay Auto-Debit',
  },
  {
    id: 'JRN-02',
    date: '2026-09-09 07:45:13',
    journalRef: 'JRN-2026-0909-002',
    debitAccount: '5110 - Beban MDR Gateway Perbankan',
    creditAccount: '1110 - Kas Bank BCA Escrow IDR',
    merchantName: 'Kopi Kenangan Senja',
    merchantCode: 'IND-M-003',
    amount: 9980,
    transactionType: 'OUTFLOW_MDR',
    reconciliationStatus: 'MATCHED',
    notes: 'Potongan MDR switching gateway 2.0% transaksi GoPay',
  },
  {
    id: 'JRN-03',
    date: '2026-09-09 07:12:40',
    journalRef: 'JRN-2026-0909-003',
    debitAccount: '1110 - Kas Bank BCA Escrow IDR',
    creditAccount: '4120 - Pendapatan Komisi Take-Rate GMV',
    merchantName: 'Toko Elektronik Berkah',
    merchantCode: 'IND-M-002',
    amount: 189000,
    transactionType: 'INFLOW_COMMISSION',
    reconciliationStatus: 'MATCHED',
    notes: 'Settlement bagi hasil transaksi order ORD-89210',
  },
  {
    id: 'JRN-04',
    date: '2026-09-09 06:40:18',
    journalRef: 'JRN-2026-0909-004',
    debitAccount: '1110 - Kas Bank BCA Escrow IDR',
    creditAccount: '2120 - Pendapatan Diterima di Muka (Enterprise 1 Thn)',
    merchantName: 'Butik Azzahra Official',
    merchantCode: 'IND-M-001',
    amount: 14390400,
    transactionType: 'INFLOW_DEFERRED',
    reconciliationStatus: 'MATCHED',
    notes: 'Pembayaran sewa software tahunan dimuka (amortisasi 12 bulan)',
  },
  {
    id: 'JRN-05',
    date: '2026-09-09 06:05:55',
    journalRef: 'JRN-2026-0909-005',
    debitAccount: '1130 - Piutang Usaha Dunning Overdue',
    creditAccount: '4110 - Pendapatan Sewa SaaS Tertunda',
    merchantName: 'Batik Keris Heritage',
    merchantCode: 'IND-M-008',
    amount: 499000,
    transactionType: 'ACCRUAL_DUNNING',
    reconciliationStatus: 'PENDING_RETRY',
    notes: 'Auto-debit gagal (Saldo Tidak Cukup) - Antrean Dunning H+1',
  },
  {
    id: 'JRN-06',
    date: '2026-09-09 05:30:10',
    journalRef: 'JRN-2026-0909-006',
    debitAccount: '1110 - Kas Bank BCA Escrow IDR',
    creditAccount: '4120 - Pendapatan Komisi Take-Rate GMV',
    merchantName: 'Kue Lapis Legit Surabaya',
    merchantCode: 'IND-M-105',
    amount: 8200,
    transactionType: 'INFLOW_COMMISSION',
    reconciliationStatus: 'MATCHED',
    notes: 'Settlement bagi hasil pesanan Starter 1.5% + Rp 1.000',
  },
];


// ============================================================================
// MODUL 7: EXECUTIVE BI & PLATFORM-WIDE ANALYTICS DATA (SAAS BI & MACRO TRENDS)
// ============================================================================

export const executiveBiSaaS = {
  mrr: 184500000,
  mrrGrowthMoM: 14.2,
  newMrr: 28500000,
  expansionMrr: 14800000,
  contractionMrr: 3200000,
  churnedMrr: 4500000,
  netNewMrr: 35600000,
  arrRunRate: 2214000000,
  arrProjectionYearEnd: 2850000000,
  arpu: 246000,
  arpuGrowthYoY: 8.5,
  arpuByTier: { starter: 199000, pro: 499000, enterprise: 1499000, custom: 4999000 },
  nrr: 118.4,
  nrrBenchmark: "> 110% (Top Quartile SaaS)",
  customerChurnRate: 1.8,
  customerChurnCount: 3,
  revenueChurnRate: -3.2, // Net negative churn
  ltv: 13660000,
  cac: 1850000,
  ltvCacRatio: 7.38,
  paybackPeriodMonths: 7.5,
  activePaidTenants: 750,
  trialTenants: 115,
};

export const mrrWaterfallTrend = {
  months: ["Okt 25", "Nov 25", "Des 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "Mei 26", "Jun 26", "Jul 26", "Agu 26", "Sep 26"],
  newMrr: [12.0, 14.5, 17.0, 18.5, 20.0, 22.0, 23.5, 24.8, 26.0, 27.0, 27.8, 28.5],
  expansionMrr: [5.0, 6.2, 7.5, 8.0, 9.2, 10.5, 11.2, 12.0, 12.8, 13.5, 14.0, 14.8],
  churnContractionMrr: [-2.5, -2.8, -3.0, -3.2, -3.5, -4.0, -4.2, -4.5, -5.0, -5.2, -5.8, -7.7],
  totalMrr: [102.5, 112.0, 124.5, 132.0, 141.5, 152.0, 160.5, 168.0, 175.5, 180.2, 182.5, 184.5],
};

export const macroCommerceTrends = {
  totalPlatformGmv: 14850000000,
  gmvGrowthMoM: 26.8,
  takeRateRevenueNet: 222750000,
  blendedTakeRatePct: 1.50,
  nationalConversionRate: 3.42,
  conversionBenchmark: 2.40,
  totalCompletedOrders: 48920,
  aovAverage: 303550,
  categoryConversion: [
    { category: "Fashion & Apparel", conversionRate: 3.85, gmvShare: 41.2, aov: 320000, color: "#ff6c2f" },
    { category: "Electronics & Gadgets", conversionRate: 2.45, gmvShare: 24.5, aov: 850000, color: "#3b82f6" },
    { category: "Food & Beverages", conversionRate: 4.90, gmvShare: 16.8, aov: 145000, color: "#16a34a" },
    { category: "Beauty & Personal Care", conversionRate: 4.10, gmvShare: 11.5, aov: 230000, color: "#eab308" },
    { category: "Sports & Outdoors", conversionRate: 2.95, gmvShare: 6.0, aov: 410000, color: "#8b5cf6" },
  ],
};

export const demographicHeatmapData = {
  summary: {
    jabodetabek: { pct: 54.2, gmv: 8048700000, orders: 28240, aov: 285000, color: "#ff6c2f" },
    nonJawaIsland: { pct: 28.6, gmv: 4247100000, orders: 14390, aov: 295100, color: "#3b82f6" },
    luarJawa: { pct: 17.2, gmv: 2554200000, orders: 6290, aov: 406000, color: "#16a34a" },
  },
  provinces: [
    { name: "DKI Jakarta", region: "Jabodetabek", gmv: 4752000000, gmvShare: 32.0, orders: 16500, aov: 288000, growth: "+28.4%" },
    { name: "Jawa Barat (Bodetabek + Bandung)", region: "Jawa Barat", gmv: 3712500000, gmvShare: 25.0, orders: 13200, aov: 281250, growth: "+24.1%" },
    { name: "Jawa Timur (Surabaya, Malang)", region: "Jawa Timur", gmv: 2079000000, gmvShare: 14.0, orders: 7400, aov: 280940, growth: "+31.5%" },
    { name: "Banten (Tangerang Raya, Serang)", region: "Banten", gmv: 1485000000, gmvShare: 10.0, orders: 5100, aov: 291170, growth: "+19.8%" },
    { name: "Jawa Tengah & D.I. Yogyakarta", region: "Jawa Tengah", gmv: 1188000000, gmvShare: 8.0, orders: 4600, aov: 258260, growth: "+22.0%" },
    { name: "Sumatera Utara (Medan & sekitarnya)", region: "Sumatera", gmv: 742500000, gmvShare: 5.0, orders: 1750, aov: 424280, growth: "+42.6%" },
    { name: "Bali & Nusa Tenggara", region: "Bali-Nusra", gmv: 445500000, gmvShare: 3.0, orders: 1050, aov: 424280, growth: "+38.2%" },
    { name: "Sulawesi Selatan (Makassar)", region: "Sulawesi", gmv: 297000000, gmvShare: 2.0, orders: 720, aov: 412500, growth: "+51.0%" },
    { name: "Kalimantan Timur (IKN & Balikpapan)", region: "Kalimantan", gmv: 148500000, gmvShare: 1.0, orders: 350, aov: 424280, growth: "+64.5%" },
  ],
};

export const peakShoppingHoursData = {
  hourlyVolume: [
    { hour: "00:00", orders: 420, gmv: 126000000, serverLoad: "12%" },
    { hour: "01:00", orders: 190, gmv: 57000000, serverLoad: "8%" },
    { hour: "02:00", orders: 110, gmv: 33000000, serverLoad: "5%" },
    { hour: "03:00", orders: 90, gmv: 27000000, serverLoad: "4%" },
    { hour: "04:00", orders: 140, gmv: 42000000, serverLoad: "6%" },
    { hour: "05:00", orders: 380, gmv: 114000000, serverLoad: "11%" },
    { hour: "06:00", orders: 850, gmv: 255000000, serverLoad: "22%" },
    { hour: "07:00", orders: 1420, gmv: 426000000, serverLoad: "34%" },
    { hour: "08:00", orders: 2150, gmv: 645000000, serverLoad: "46%" },
    { hour: "09:00", orders: 2680, gmv: 804000000, serverLoad: "54%" },
    { hour: "10:00", orders: 2950, gmv: 885000000, serverLoad: "62%" },
    { hour: "11:00", orders: 3410, gmv: 1023000000, serverLoad: "71%" },
    { hour: "12:00", orders: 4120, gmv: 1236000000, serverLoad: "84% (Lunch Surge)" },
    { hour: "13:00", orders: 3780, gmv: 1134000000, serverLoad: "78%" },
    { hour: "14:00", orders: 2840, gmv: 852000000, serverLoad: "58%" },
    { hour: "15:00", orders: 2710, gmv: 813000000, serverLoad: "55%" },
    { hour: "16:00", orders: 2990, gmv: 897000000, serverLoad: "61%" },
    { hour: "17:00", orders: 3120, gmv: 936000000, serverLoad: "66%" },
    { hour: "18:00", orders: 3450, gmv: 1035000000, serverLoad: "73%" },
    { hour: "19:00", orders: 4890, gmv: 1467000000, serverLoad: "94% (Prime Peak)" },
    { hour: "20:00", orders: 5420, gmv: 1626000000, serverLoad: "98% (Prime Peak)" },
    { hour: "21:00", orders: 4610, gmv: 1383000000, serverLoad: "91% (Prime Peak)" },
    { hour: "22:00", orders: 3120, gmv: 936000000, serverLoad: "68%" },
    { hour: "23:00", orders: 1680, gmv: 504000000, serverLoad: "42%" }
  ],
  infrastructureRecommendation: {
    status: "RECOMMENDED_AUTOSCALE",
    primaryWindow: "19:00 - 21:30 WIB (Puncak Checkout Nasional)",
    secondaryWindow: "12:00 - 13:30 WIB (Makan Siang)",
    currentBasePods: 6,
    recommendedPods: 16,
    targetLatencyP99: "< 35ms",
    actionPrompt: "Rekomendasi Autoscaling: Scale-out worker pods Golang v1.22 dari 6 menjadi 16 pods pada 18:30 WIB untuk mengantisipasi lonjakan trafik transaksi checkout malam tanpa latensi."
  }
};

export const taxAndComplianceData = {
  fiscalPeriod: "September 2026 (Masa Pajak 09-2026)",
  dppSaaSRevenue: 166216216,
  ppnOutput11Pct: 18283784,
  ppnInputCredited: 4120000,
  ppnNetPayable: 14163784,
  ntpnBillingCode: "NTPN-8921-DJP-20260909",
  eFakturStatus: "TERVALIDASI_DJP",
  sptMasaForm: "SPT Masa PPN 1111 (KLU 62019 - Aktivitas Pemrograman Komputer Lainnya)",
  taxReportingDueDate: "31 Oktober 2026",
  reconciliationLogs: [
    { id: "TAX-01", period: "Agustus 2026", dpp: 164414414, ppn11: 18085585, status: "SUDAH_DILAPOR", ntpn: "NTPN-7812-DJP-20260831", proofUrl: "#" },
    { id: "TAX-02", period: "Juli 2026", dpp: 162162162, ppn11: 17837838, status: "SUDAH_DILAPOR", ntpn: "NTPN-6743-DJP-20260731", proofUrl: "#" },
    { id: "TAX-03", period: "Juni 2026", dpp: 158108108, ppn11: 17391892, status: "SUDAH_DILAPOR", ntpn: "NTPN-5621-DJP-20260630", proofUrl: "#" },
  ]
};
