export const stateData = [{
  icon: 'solar:wallet-money-bold-duotone',
  name: 'Total Omset (GMV)',
  amount: 'Rp 1,48 M',
  variant: 'success',
  change: '14.8',
  period: 'vs bln lalu'
}, {
  icon: 'solar:cart-check-bold-duotone',
  name: 'Pesanan Berhasil',
  amount: '18.420',
  variant: 'success',
  change: '8.5',
  period: 'vs bln lalu'
}, {
  icon: 'solar:shop-bold-duotone',
  name: 'Merchant / Toko Aktif',
  amount: '348 Toko',
  variant: 'success',
  change: '12.3',
  period: 'vs bln lalu'
}, {
  icon: 'solar:tag-price-bold-duotone',
  name: 'Rata-rata Order (AOV)',
  amount: 'Rp 185.000',
  variant: 'success',
  change: '4.2',
  period: 'vs bln lalu'
}];

// Data Tren Waktu & Jam Puncak Transaksi
export const hourlyActivityData = {
  hours: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
  orders: [140, 65, 42, 195, 620, 980, 1420, 1150, 890, 1380, 1850, 920],
  visitors: [420, 190, 120, 580, 1840, 2900, 4200, 3450, 2680, 4100, 5600, 2750]
};

// Data Sebaran Wilayah & Kanal Penjualan
export const regionalDistribution = [
  { region: 'Jabodetabek', percentage: 42, orders: '7.736', color: '#ff6c2f' },
  { region: 'Jawa Barat & Banten', percentage: 24, orders: '4.420', color: '#22c55e' },
  { region: 'Jawa Tengah & Jatim', percentage: 18, orders: '3.315', color: '#3b82f6' },
  { region: 'Sumatera', percentage: 9, orders: '1.658', color: '#f59e0b' },
  { region: 'Bali, NTB & Luar Jawa', percentage: 7, orders: '1.291', color: '#8b5cf6' }
];

export const salesChannels = [
  { name: 'Web Storefront (Direct)', percentage: 48, gmv: 'Rp 710,4 Jt', icon: 'solar:laptop-minimalistic-bold-duotone', color: '#ff6c2f' },
  { name: 'WhatsApp Direct Checkout', percentage: 34, gmv: 'Rp 503,2 Jt', icon: 'solar:chat-round-dots-bold-duotone', color: '#22c55e' },
  { name: 'Integrasi Multi-Channel', percentage: 18, gmv: 'Rp 266,4 Jt', icon: 'solar:share-circle-bold-duotone', color: '#3b82f6' }
];

// Data Corong Konversi & Saluran Pembayaran
export const conversionFunnel = [
  { stage: 'Pengunjung Toko', count: 124500, label: '124,5k', rate: 100 },
  { stage: 'Lihat Produk Detail', count: 78200, label: '78,2k', rate: 62.8 },
  { stage: 'Tambah ke Keranjang', count: 34100, label: '34,1k', rate: 27.4 },
  { stage: 'Tahap Checkout', count: 21400, label: '21,4k', rate: 17.2 },
  { stage: 'Pembayaran Lunas', count: 16850, label: '16,8k', rate: 13.5 }
];

export const paymentMethods = [
  { name: 'QRIS (GoPay, OVO, DANA)', share: 44, amount: 'Rp 651,2 Jt', badge: 'Terpopuler' },
  { name: 'Virtual Account (BCA, Mandiri, BRI)', share: 36, amount: 'Rp 532,8 Jt', badge: 'Instan' },
  { name: 'E-Wallet Direct API', share: 12, amount: 'Rp 177,6 Jt', badge: 'Otomatis' },
  { name: 'COD (Bayar di Tempat)', share: 8, amount: 'Rp 118,4 Jt', badge: 'Kurir' }
];

export const recentIndoviaOrders = [
  {
    id: 'IND-8842',
    date: 'Hari ini, 20:45 WIB',
    product: 'Kemeja Batik Tulis Modern',
    image: '/assets/images/products/product-1(1).png',
    customer: 'Budi Santoso',
    phone: '0812-8876-1290',
    city: 'Jakarta Selatan',
    channel: 'Storefront Web',
    channelColor: 'primary',
    amount: 'Rp 349.000',
    payment: 'QRIS',
    status: 'Selesai',
    statusColor: 'success'
  },
  {
    id: 'IND-8841',
    date: 'Hari ini, 20:32 WIB',
    product: 'Sepatu Sneaker Urban Vintage',
    image: '/assets/images/products/product-1(2).png',
    customer: 'Siti Rahmawati',
    phone: '0857-4123-9988',
    city: 'Surabaya',
    channel: 'WhatsApp Direct',
    channelColor: 'success',
    amount: 'Rp 520.000',
    payment: 'BCA Virtual Account',
    status: 'Diproses',
    statusColor: 'warning'
  },
  {
    id: 'IND-8840',
    date: 'Hari ini, 19:58 WIB',
    product: 'Tas Kulit Ransel Premium',
    image: '/assets/images/products/product-1(3).png',
    customer: 'Aditya Pratama',
    phone: '0813-9002-3341',
    city: 'Bandung',
    channel: 'Storefront Web',
    channelColor: 'primary',
    amount: 'Rp 680.000',
    payment: 'Mandiri VA',
    status: 'Dikirim',
    statusColor: 'info'
  },
  {
    id: 'IND-8839',
    date: 'Hari ini, 19:40 WIB',
    product: 'Paket Kopi Robusta & Arabika',
    image: '/assets/images/products/product-1(4).png',
    customer: 'Dewi Lestari',
    phone: '0878-3321-7765',
    city: 'Yogyakarta',
    channel: 'WhatsApp Direct',
    channelColor: 'success',
    amount: 'Rp 175.000',
    payment: 'GoPay / QRIS',
    status: 'Selesai',
    statusColor: 'success'
  },
  {
    id: 'IND-8838',
    date: 'Hari ini, 19:15 WIB',
    product: 'Smart Watch Series 9 AMOLED',
    image: '/assets/images/products/product-1(5).png',
    customer: 'Farhan Maulana',
    phone: '0821-6654-2210',
    city: 'Medan',
    channel: 'Storefront Web',
    channelColor: 'primary',
    amount: 'Rp 899.000',
    payment: 'COD J&T',
    status: 'Menunggu Konfirmasi',
    statusColor: 'secondary'
  }
];