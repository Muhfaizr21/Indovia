// src/app/(admin)/logistics/data.js

export const formatRupiah = (number) => {
  if (number === undefined || number === null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

// 1. LOGISTICS AGGREGATOR KPI SUMMARY
export const logisticsKpiSummary = {
  totalDistrictsCovered: 7230,       // 7.230 Kecamatan di 514 Kota/Kabupaten Indonesia
  activeCouriersCount: 6,           // 6 Mitra Kurir Nasional Utama
  activeServicesCount: 18,          // 18 Layanan Pengiriman Aktif
  platformMarkupPerPackage: 500,    // +Rp 500 flat per paket (Asuransi & Kas Platform Indovia)
  monthlyShipments: 48920,          // 48.920 Resi Pengiriman Bulan Ini
  slaOnTimeRate: '98.6%',           // 98.6% Tepat Waktu Sesuai Estimasi Hari
  activeKillSwitchCount: 1,         // 1 Kurir sedang mengalami Overload/Maintenance
};

// 2. MANAJEMEN KURIR NASIONAL (6 MITRA UTAMA & 18 LAYANAN)
export const nationalCouriers = [
  {
    id: 'courier_jne',
    name: 'JNE Express',
    code: 'JNE',
    logoText: 'JNE',
    category: 'Nasional & Express',
    icon: 'solar:box-minimalistic-bold-duotone',
    status: 'ACTIVE',
    trackingLatencyMs: 120,
    monthlyVolume: 16400,
    slaRate: '98.8%',
    integrationType: 'Direct Carrier API & RajaOngkir Pro',
    services: [
      { code: 'JNE_REG', name: 'JNE Regular', etd: '2 - 3 Hari', baseRateJktSby: 19000, active: true },
      { code: 'JNE_YES', name: 'JNE YES (Yakin Esok Sampai)', etd: '1 Hari', baseRateJktSby: 36000, active: true },
      { code: 'JNE_OKE', name: 'JNE OKE (Ekonomis)', etd: '3 - 5 Hari', baseRateJktSby: 15000, active: true },
    ],
    incidentAlert: null,
  },
  {
    id: 'courier_jnt',
    name: 'J&T Express',
    code: 'JNT',
    logoText: 'J&T',
    category: 'Nasional & Cargo',
    icon: 'solar:delivery-bold-duotone',
    status: 'MAINTENANCE_OVERLOAD',
    trackingLatencyMs: 290,
    monthlyVolume: 14200,
    slaRate: '94.2%',
    integrationType: 'J&T Direct Open API',
    services: [
      { code: 'JNT_EZ', name: 'J&T EZ (Reguler)', etd: '2 - 3 Hari', baseRateJktSby: 18000, active: false },
      { code: 'JNT_SUPER', name: 'J&T Super (Next Day)', etd: '1 Hari', baseRateJktSby: 34000, active: false },
      { code: 'JNT_CARGO', name: 'J&T Cargo (Minimal 10kg)', etd: '3 - 6 Hari', baseRateJktSby: 65000, active: false },
    ],
    incidentAlert: {
      title: 'Overload Hub Sortir Marunda (Jabodetabek)',
      description: 'Volume sortir mencapai 135% akibat lonjakan pesanan belanja nasional. Kurir dinonaktifkan sementara via Kill-Switch untuk mencegah keterlambatan SLA.',
      severity: 'WARNING',
      since: '2026-09-09 06:00 WIB',
    },
  },
  {
    id: 'courier_sicepat',
    name: 'SiCepat Ekspres',
    code: 'SICEPAT',
    logoText: 'SiCepat',
    category: 'Nasional & Cargo',
    icon: 'solar:box-bold-duotone',
    status: 'ACTIVE',
    trackingLatencyMs: 130,
    monthlyVolume: 11800,
    slaRate: '99.1%',
    integrationType: 'SiCepat Cloud API',
    services: [
      { code: 'SICEPAT_SIUNTUNG', name: 'SIUNTUNG (Reguler)', etd: '2 - 3 Hari', baseRateJktSby: 18500, active: true },
      { code: 'SICEPAT_BEST', name: 'BEST (Besok Sampai Tujuan)', etd: '1 Hari', baseRateJktSby: 35000, active: true },
      { code: 'SICEPAT_GOKIL', name: 'GOKIL (Kargo Minimal 10kg)', etd: '3 - 5 Hari', baseRateJktSby: 55000, active: true },
    ],
    incidentAlert: null,
  },
  {
    id: 'courier_anteraja',
    name: 'Anteraja',
    code: 'ANTERAJA',
    logoText: 'Anteraja',
    category: 'Nasional & Same Day',
    icon: 'solar:scooter-bold-duotone',
    status: 'ACTIVE',
    trackingLatencyMs: 160,
    monthlyVolume: 3200,
    slaRate: '97.5%',
    integrationType: 'Anteraja Webhook & API',
    services: [
      { code: 'ANTERAJA_REG', name: 'Anteraja Regular', etd: '2 - 3 Hari', baseRateJktSby: 17500, active: true },
      { code: 'ANTERAJA_ND', name: 'Anteraja Next Day', etd: '1 Hari', baseRateJktSby: 32000, active: true },
      { code: 'ANTERAJA_ECO', name: 'Anteraja Economy', etd: '3 - 5 Hari', baseRateJktSby: 14000, active: true },
    ],
    incidentAlert: null,
  },
  {
    id: 'courier_pos',
    name: 'Pos Indonesia',
    code: 'POS',
    logoText: 'POS ID',
    category: 'Jangkauan Pelosok 3T',
    icon: 'solar:mailbox-bold-duotone',
    status: 'ACTIVE',
    trackingLatencyMs: 210,
    monthlyVolume: 1920,
    slaRate: '96.2%',
    integrationType: 'Pos Indonesia API',
    services: [
      { code: 'POS_KILAT', name: 'Pos Kilat Khusus', etd: '2 - 4 Hari', baseRateJktSby: 16000, active: true },
      { code: 'POS_NEXTDAY', name: 'Pos Next Day', etd: '1 Hari', baseRateJktSby: 31000, active: true },
      { code: 'POS_REGULER', name: 'Pos Reguler', etd: '3 - 7 Hari', baseRateJktSby: 12000, active: true },
    ],
    incidentAlert: null,
  },
  {
    id: 'courier_instant',
    name: 'GoSend & GrabExpress',
    code: 'INSTANT',
    logoText: 'Instant',
    category: 'Instant & Same Day (Kota Besar)',
    icon: 'solar:map-point-wave-bold-duotone',
    status: 'ACTIVE',
    trackingLatencyMs: 95,
    monthlyVolume: 1400,
    slaRate: '99.7%',
    integrationType: 'Gojek Fleet & GrabExpress Direct API',
    services: [
      { code: 'GOSEND_INSTANT', name: 'GoSend Instant (1 - 2 Jam)', etd: '1 - 2 Jam', baseRateJktSby: 28000, active: true },
      { code: 'GOSEND_SAMEDAY', name: 'GoSend Same Day (6 - 8 Jam)', etd: '6 - 8 Jam', baseRateJktSby: 19000, active: true },
      { code: 'GRAB_INSTANT', name: 'GrabExpress Instant', etd: '1 - 2 Jam', baseRateJktSby: 27000, active: true },
    ],
    incidentAlert: null,
  },
];

// 3. GLOBAL LOGISTICS CONFIGURATION
export const logisticsGlobalConfig = {
  rajaOngkirApiKey: 'ro_pro_9918294829104829Xz810••••••••',
  rajaOngkirAccountType: 'Pro Tier (Sub-district Level: 7.230 Kecamatan)',
  platformMarginType: 'FLAT', // 'FLAT' | 'PERCENTAGE'
  platformMarginAmount: 500,  // +Rp 500 per paket
  insuranceFundAllocation: 'Dana Proteksi Seller & Asuransi Kehilangan Logistik Indovia',
  defaultOriginDistrict: 'Kec. Gambir, Kota Jakarta Pusat, DKI Jakarta',
  autoResiSyncEnabled: true,
  trackingRefreshIntervalMinutes: 30,
};

// 4. CENTRALIZED WHATSAPP BUSINESS GATEWAY KPI SUMMARY
export const whatsappKpiSummary = {
  totalOutboundMonthly: 142850,     // 142.850 Pesan Keluar Bulan Ini
  receiptTrackingSent: 98420,       // 98.420 Notifikasi Resi Otomatis ke Pembeli
  otpAuthSent: 38210,               // 38.210 OTP Login / Reset Password
  deliverySuccessRate: '99.4%',     // 99.4% Pesan Sukses Diterima
  averageDeliverySeconds: 1.8,      // 1.8 Detik Rata-rata Kecepatan Kirim
  activeProvider: 'Fonnte High-Speed Gateway',
  backupProvider: 'Meta Cloud API (Official WABA Tier-2)',
  totalQuotaAllocated: 240000,      // Total Kuota Disediakan Platform
  totalQuotaConsumed: 142850,       // Kuota Terpakai
};

// 5. WHATSAPP GATEWAY CONFIGURATION & TEMPLATES
export const whatsappGatewayConfig = {
  activeEngine: 'FONNTE', // 'FONNTE' | 'WABA_META' | 'TWILIO'
  fonnteApiKey: 'fnt_live_8819283746201948••••••••',
  fonnteDeviceStatus: 'CONNECTED (+62 812-9900-8811 Indovia Notification Bot)',
  wabaPhoneNumberId: '109283746192847',
  wabaAccessToken: 'EAAOx82910Zmm829••••••••',
  twilioAccountSid: 'AC99182736450192••••••••',
  
  // Triggers & Templates
  autoTrackingReceiptEnabled: true,
  autoOtpLoginEnabled: true,
  autoOrderConfirmationEnabled: true,

  templateResi: 'Halo *{{customer_name}}*, pesanan Anda *#{{order_id}}* dari toko *{{store_name}}* telah dikirim melalui *{{courier}}* dengan No. Resi: *{{waybill_no}}*. Lacak status pengiriman langsung di: {{tracking_url}}. Terima kasih telah berbelanja di Indovia!',
  templateOtp: '*{{otp_code}}* adalah kode verifikasi resmi masuk ke akun merchant Indovia Anda. Berlaku selama 5 menit. JANGAN bagikan kode rahasia ini kepada siapa pun termasuk tim Indovia.',
  templateOrderPaid: 'Terima kasih *{{customer_name}}*! Pembayaran sebesar *{{amount}}* untuk pesanan *#{{order_id}}* telah berhasil diverifikasi oleh Escrow Indovia. Merchant sedang menyiapkan pesanan Anda.',
};

// 6. MERCHANT WHATSAPP QUOTA DIRECTORY (BERDASARKAN TIER PAKET)
export const merchantWaQuotas = [
  {
    merchantId: 'MCH-001',
    storeName: 'Batik Nusantara Heritage',
    ownerName: 'Raden Mas Arya',
    ownerPhone: '+62 812-3456-7890',
    tier: 'Enterprise',
    monthlyQuota: 10000,
    usedQuota: 3420,
    remainingQuota: 6580,
    status: 'NORMAL',
    lastSent: '2026-09-09 11:42 WIB',
  },
  {
    merchantId: 'MCH-002',
    storeName: 'TechnoGadget Official Store',
    ownerName: 'Michael Tanuwidjaja',
    ownerPhone: '+62 811-9988-7766',
    tier: 'Enterprise',
    monthlyQuota: 10000,
    usedQuota: 8950,
    remainingQuota: 1050,
    status: 'WARNING_LOW', // > 80%
    lastSent: '2026-09-09 12:05 WIB',
  },
  {
    merchantId: 'MCH-003',
    storeName: 'Java Coffee Roastery',
    ownerName: 'Bambang Sudibyo',
    ownerPhone: '+62 813-2233-4455',
    tier: 'Pro Tier',
    monthlyQuota: 1000,
    usedQuota: 620,
    remainingQuota: 380,
    status: 'NORMAL',
    lastSent: '2026-09-09 10:15 WIB',
  },
  {
    merchantId: 'MCH-004',
    storeName: 'Hijab Elegance ID',
    ownerName: 'Siti Nurhaliza Putri',
    ownerPhone: '+62 819-4455-6677',
    tier: 'Pro Tier',
    monthlyQuota: 1000,
    usedQuota: 980,
    remainingQuota: 20,
    status: 'CRITICAL_LOW', // > 95%
    lastSent: '2026-09-09 11:58 WIB',
  },
  {
    merchantId: 'MCH-005',
    storeName: 'Furnitur Jepara Asli',
    ownerName: 'Haji Ahmad Soleh',
    ownerPhone: '+62 812-7788-9900',
    tier: 'Enterprise',
    monthlyQuota: 10000,
    usedQuota: 1890,
    remainingQuota: 8110,
    status: 'NORMAL',
    lastSent: '2026-09-09 09:30 WIB',
  },
  {
    merchantId: 'MCH-006',
    storeName: 'Sneakers Holic',
    ownerName: 'Kevin Sanjaya',
    ownerPhone: '+62 817-1234-5678',
    tier: 'Pro Tier',
    monthlyQuota: 1000,
    usedQuota: 1050,
    remainingQuota: 0,
    status: 'EXCEEDED', // Over quota
    lastSent: '2026-09-09 11:10 WIB',
  },
  {
    merchantId: 'MCH-007',
    storeName: 'Dapur Mama Rasa',
    ownerName: 'Dewi Sartika',
    ownerPhone: '+62 813-8899-0011',
    tier: 'Starter',
    monthlyQuota: 100,
    usedQuota: 85,
    remainingQuota: 15,
    status: 'WARNING_LOW',
    lastSent: '2026-09-09 08:45 WIB',
  },
  {
    merchantId: 'MCH-008',
    storeName: 'Herbal Alam Sejahtera',
    ownerName: 'Dr. Faisal Rahman',
    ownerPhone: '+62 812-5566-7788',
    tier: 'Starter',
    monthlyQuota: 100,
    usedQuota: 96,
    remainingQuota: 4,
    status: 'CRITICAL_LOW',
    lastSent: '2026-09-09 09:20 WIB',
  },
];

// 7. REAL-TIME OUTBOUND WHATSAPP MESSAGE LOG
export const outboundWaLogs = [
  {
    msgId: 'MSG-WA-901821',
    recipientNumber: '+62 812-9847-1920',
    recipientName: 'Ahmad Fauzi (Pembeli)',
    messageType: 'RESI_AUTOMATION',
    storeName: 'Batik Nusantara Heritage',
    contentSnippet: 'Halo Ahmad Fauzi, pesanan Anda #ORD-INV-20260909-041 telah dikirim via JNE REG Resi: JNE882910482...',
    provider: 'Fonnte Gateway',
    timestamp: '2026-09-09 11:45:22 WIB',
    status: 'READ',
    latencySeconds: 1.2,
  },
  {
    msgId: 'MSG-WA-901822',
    recipientNumber: '+62 811-9988-7766',
    recipientName: 'Michael Tanuwidjaja (Merchant)',
    messageType: 'OTP_LOGIN',
    storeName: 'TechnoGadget Official',
    contentSnippet: '849201 adalah kode verifikasi resmi masuk ke akun merchant Indovia Anda. Berlaku 5 menit...',
    provider: 'Meta WABA Cloud',
    timestamp: '2026-09-09 11:44:05 WIB',
    status: 'DELIVERED',
    latencySeconds: 0.9,
  },
  {
    msgId: 'MSG-WA-901823',
    recipientNumber: '+62 813-8822-1928',
    recipientName: 'Cindy Wijaya (Pembeli)',
    messageType: 'RESI_AUTOMATION',
    storeName: 'TechnoGadget Official',
    contentSnippet: 'Halo Cindy Wijaya, pesanan Anda #ORD-INV-20260909-042 telah dikirim via SiCepat Resi: 00294819283...',
    provider: 'Fonnte Gateway',
    timestamp: '2026-09-09 11:22:15 WIB',
    status: 'READ',
    latencySeconds: 1.4,
  },
  {
    msgId: 'MSG-WA-901824',
    recipientNumber: '+62 819-2837-4650',
    recipientName: 'Eko Prasetyo (Pembeli)',
    messageType: 'PAYMENT_CONFIRM',
    storeName: 'Java Coffee Roastery',
    contentSnippet: 'Terima kasih Eko Prasetyo! Pembayaran Rp 175.000 untuk pesanan #ORD-INV-20260909-043 telah terverifikasi...',
    provider: 'Fonnte Gateway',
    timestamp: '2026-09-09 10:55:08 WIB',
    status: 'READ',
    latencySeconds: 1.5,
  },
  {
    msgId: 'MSG-WA-901825',
    recipientNumber: '+62 817-0099-2211',
    recipientName: 'Siti Nurhaliza (Merchant)',
    messageType: 'OTP_RESET_PASS',
    storeName: 'Hijab Elegance ID',
    contentSnippet: '319482 adalah kode pemulihan kata sandi dashboard toko Indovia Anda...',
    provider: 'Fonnte Gateway',
    timestamp: '2026-09-09 09:12:40 WIB',
    status: 'DELIVERED',
    latencySeconds: 1.1,
  },
  {
    msgId: 'MSG-WA-901826',
    recipientNumber: '+62 818-7766-5544',
    recipientName: 'Hendra Gunawan (Pembeli)',
    messageType: 'RESI_AUTOMATION',
    storeName: 'Sneakers Holic',
    contentSnippet: 'Halo Hendra, pesanan sepatu telah dikirim via JNE YES Resi: JNE9918273645...',
    provider: 'Fonnte Gateway',
    timestamp: '2026-09-09 08:30:10 WIB',
    status: 'FAILED',
    latencySeconds: 5.8,
    failReason: 'Nomor WhatsApp tidak aktif / format nomor keliru',
  },
];

// 8. SAMPLE SHIPPING RATE MATRIX (LIVE RATE CHECK SIMULATOR)
// Asal: Jakarta Pusat -> Tujuan: Surabaya (Berat: 1.000 gr)
export const sampleShippingRates = [
  {
    courierName: 'JNE Express',
    serviceName: 'JNE Regular (REG)',
    etd: '2 - 3 Hari',
    officialRate: 19000,
    platformMargin: 500,
    totalCustomerFee: 19500,
    status: 'ACTIVE',
  },
  {
    courierName: 'JNE Express',
    serviceName: 'JNE YES (Next Day)',
    etd: '1 Hari',
    officialRate: 36000,
    platformMargin: 500,
    totalCustomerFee: 36500,
    status: 'ACTIVE',
  },
  {
    courierName: 'SiCepat Ekspres',
    serviceName: 'SIUNTUNG (Reguler)',
    etd: '2 - 3 Hari',
    officialRate: 18500,
    platformMargin: 500,
    totalCustomerFee: 19000,
    status: 'ACTIVE',
  },
  {
    courierName: 'SiCepat Ekspres',
    serviceName: 'BEST (Next Day)',
    etd: '1 Hari',
    officialRate: 35000,
    platformMargin: 500,
    totalCustomerFee: 35500,
    status: 'ACTIVE',
  },
  {
    courierName: 'Anteraja',
    serviceName: 'Anteraja Regular',
    etd: '2 - 3 Hari',
    officialRate: 17500,
    platformMargin: 500,
    totalCustomerFee: 18000,
    status: 'ACTIVE',
  },
  {
    courierName: 'Pos Indonesia',
    serviceName: 'Pos Kilat Khusus',
    etd: '2 - 4 Hari',
    officialRate: 16000,
    platformMargin: 500,
    totalCustomerFee: 16500,
    status: 'ACTIVE',
  },
  {
    courierName: 'J&T Express',
    serviceName: 'J&T EZ (Reguler)',
    etd: '2 - 3 Hari',
    officialRate: 18000,
    platformMargin: 500,
    totalCustomerFee: 18500,
    status: 'DISABLED_KILL_SWITCH', // Nonaktif karena overload
  },
];
