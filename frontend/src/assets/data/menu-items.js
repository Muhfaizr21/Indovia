export const MENU_ITEMS = [{
  key: 'general',
  label: 'MENU UTAMA',
  isTitle: true
}, {
  key: 'dashboard',
  label: 'Dashboard',
  icon: 'solar:widget-5-bold-duotone',
  url: '/dashboard'
}, {
  key: 'orders',
  label: 'Transaksi & Pesanan',
  icon: 'solar:bag-smile-bold-duotone',
  children: [{
    key: 'orders-list',
    label: 'Daftar Pesanan Toko',
    url: '/orders/orders-list',
    parentKey: 'orders'
  }, {
    key: 'order-detail',
    label: 'Detail Pesanan & Bayar',
    url: '/orders/order-detail',
    parentKey: 'orders'
  }]
}, {
  key: 'escrow',
  label: 'Escrow & Payout Engine',
  icon: 'solar:shield-check-bold-duotone',
  children: [{
    key: 'escrow-dashboard',
    label: 'Dashboard & Arus Escrow',
    url: '/escrow',
    parentKey: 'escrow'
  }, {
    key: 'escrow-gateway-hub',
    label: 'Master Gateway Hub',
    url: '/escrow/gateway-hub',
    parentKey: 'escrow'
  }, {
    key: 'escrow-ledger',
    label: 'Buku Besar Saldo Merchant',
    url: '/escrow/ledger',
    parentKey: 'escrow'
  }, {
    key: 'escrow-disbursements',
    label: 'Pencairan Saldo & 2FA',
    url: '/escrow/disbursements',
    parentKey: 'escrow'
  }]
}, {
  key: 'seller',
  label: 'Manajemen Merchant',
  icon: 'solar:shop-bold-duotone',
  children: [{
    key: 'seller-list',
    label: 'Direktori Toko & Tenant',
    url: '/seller/seller-list',
    parentKey: 'seller'
  }, {
    key: 'seller-details',
    label: 'Profil & Audit Toko',
    url: '/seller/seller-details',
    parentKey: 'seller'
  }, {
    key: 'seller-add',
    label: 'Provisioning Toko Baru',
    url: '/seller/seller-add',
    parentKey: 'seller'
  }]
}, {
  key: 'billing',
  label: 'Monetisasi & Billing SaaS',
  icon: 'solar:card-2-bold-duotone',
  children: [{
    key: 'billing-bi',
    label: 'Executive BI & Analytics',
    url: '/billing',
    parentKey: 'billing'
  }, {
    key: 'billing-cashflow',
    label: 'Arus Kas & Rekonsiliasi Bank',
    url: '/billing/cashflow',
    parentKey: 'billing'
  }, {
    key: 'billing-plans',
    label: 'Tier Paket & Kuota',
    url: '/billing/plans',
    parentKey: 'billing'
  }, {
    key: 'billing-dunning',
    label: 'Dunning & Penagihan',
    url: '/billing/dunning',
    parentKey: 'billing'
  }, {
    key: 'billing-take-rate',
    label: 'Platform Take-Rate & GMV',
    url: '/billing/take-rate',
    parentKey: 'billing'
  }]
}, {
  key: 'logistics',
  label: 'Logistik & WhatsApp Hub',
  icon: 'solar:delivery-bold-duotone',
  children: [{
    key: 'logistics-hub',
    label: 'Logistics Aggregator Hub',
    url: '/logistics/hub',
    parentKey: 'logistics'
  }, {
    key: 'logistics-whatsapp',
    label: 'WhatsApp Gateway Hub',
    url: '/logistics/whatsapp',
    parentKey: 'logistics'
  }]
}, {
  key: 'moderation',
  label: 'Moderasi & Kepatuhan',
  icon: 'solar:shield-warning-bold-duotone',
  children: [{
    key: 'moderation-catalog',
    label: 'Audit Katalog Nasional',
    url: '/moderation/catalog',
    parentKey: 'moderation'
  }, {
    key: 'moderation-penalties',
    label: 'Sistem Sanksi & Strike',
    url: '/moderation/penalties',
    parentKey: 'moderation'
  }]
}, {
  key: 'system',
  label: 'Sistem & Keamanan',
  icon: 'solar:server-square-bold-duotone',
  children: [{
    key: 'system-telemetry',
    label: 'Telemetri Runtime',
    url: '/system/telemetry',
    parentKey: 'system'
  }, {
    key: 'system-audit-logs',
    label: 'Audit Trail WORM',
    url: '/system/audit-logs',
    parentKey: 'system'
  }]
}, {
  key: 'themes',
  label: 'Tema & Tata Letak',
  icon: 'solar:pallete-2-bold-duotone',
  children: [{
    key: 'themes-repository',
    label: 'Katalog Tema & Versi',
    url: '/themes/repository',
    parentKey: 'themes'
  }, {
    key: 'themes-sections',
    label: 'Registri Seksi & Fitur',
    url: '/themes/sections',
    parentKey: 'themes'
  }, {
    key: 'themes-product-layouts',
    label: 'Tata Letak Produk (24 Layouts)',
    url: '/themes/product-layouts',
    parentKey: 'themes'
  }, {
    key: 'themes-pages-layouts',
    label: 'Tata Letak Halaman Toko',
    url: '/themes/pages-layouts',
    parentKey: 'themes'
  }]
}, {
  key: 'users',
  label: 'PENGGUNA & TIM',
  isTitle: true
}, {
  key: 'role',
  label: 'Peran & Hak Akses',
  icon: 'solar:user-speak-rounded-bold-duotone',
  children: [{
    key: 'role-list',
    label: 'Daftar Peran',
    url: '/role/role-list',
    parentKey: 'role'
  }, {
    key: 'role-edit',
    label: 'Edit Peran',
    url: '/role/role-edit',
    parentKey: 'role'
  }, {
    key: 'role-add',
    label: 'Tambah Peran',
    url: '/role/role-add',
    parentKey: 'role'
  }]
}, {
  key: 'permissions',
  label: 'Izin Akses',
  icon: 'solar:checklist-minimalistic-bold-duotone',
  url: '/permissions'
}, {
  key: 'profile',
  label: 'Profil Pengguna',
  icon: 'solar:chat-square-like-bold-duotone',
  url: '/profile'
}, {
  key: 'OTHER',
  label: 'PROMOSI & LAINNYA',
  isTitle: true
}, {
  key: 'coupons',
  label: 'Kupon Diskon',
  icon: 'solar:leaf-bold-duotone',
  children: [{
    key: 'coupons-list',
    label: 'Daftar Kupon',
    url: '/coupons/coupons-list',
    parentKey: 'coupons'
  }, {
    key: 'coupons-add',
    label: 'Tambah Kupon',
    url: '/coupons/coupons-add',
    parentKey: 'coupons'
  }]
}, {
  key: 'review',
  label: 'Ulasan & Rating',
  icon: 'solar:chat-square-like-bold-duotone',
  url: '/review'
}, {
  key: 'Other-apps',
  label: 'APLIKASI PENDUKUNG',
  isTitle: true
}, {
  key: 'apps-chat',
  label: 'Chat',
  icon: 'solar:chat-round-bold-duotone',
  url: '/apps/chat'
}, {
  key: 'email',
  label: 'Email',
  icon: 'solar:mailbox-bold-duotone',
  url: '/apps/email'
}, {
  key: 'calendar',
  label: 'Calendar',
  icon: 'solar:calendar-bold-duotone',
  url: '/apps/calendar'
}, {
  key: 'todo',
  label: 'Todo',
  icon: 'solar:checklist-bold-duotone',
  url: '/apps/todo'
}, {
  key: 'support',
  label: 'SUPPORT',
  isTitle: true
}, {
  key: 'faqs',
  label: 'FAQs',
  icon: 'solar:question-circle-bold-duotone',
  url: '/support/faqs'
}, {
  key: 'privacy-policy',
  label: 'Privacy Policy',
  icon: 'solar:document-text-bold-duotone',
  url: '/support/privacy-policy'
}];