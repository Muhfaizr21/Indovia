// Data and utilities for Seller Details (Profil & Audit Toko Multi-Tenant Indovia)

export const merchantDetailsMetadata = {
  1: {
    story: "Batik Nusantara didirikan dengan misi melestarikan warisan adiluhung seni membatik tradisional Solo dan Yogyakarta ke panggung e-commerce modern. Berawal dari sentra pengrajin Laweyan pada tahun 2018, kami memberdayakan lebih dari 120 pembatik lokal dengan kurasi motif klasik hingga kontemporer.",
    mission: "Menghadirkan busana batik tulis dan cap premium dengan kenyamanan modern, menjaga keaslian pewarna alami, serta memastikan ekosistem rantai pasok yang adil dan berkelanjutan bagi perajin daerah.",
    followers: "48.2k",
    happyClients: "14.8k",
    categories: [
      { title: "Kemeja Batik Pria Slimfit", amount: "Rp 38.5 Jt", progress: 75, variant: "primary" },
      { title: "Dress & Tunik Batik Wanita", amount: "Rp 26.2 Jt", progress: 60, variant: "success" },
      { title: "Kain Jarik Tulis Eksklusif", amount: "Rp 14.8 Jt", progress: 45, variant: "warning" },
      { title: "Aksesoris & Selendang Sutra", amount: "Rp 5.9 Jt", progress: 30, variant: "info" }
    ],
    products: [
      {
        id: "PRD-BTK-01",
        name: "Kemeja Batik Sutra Prabuseno Solo",
        category: "Batik Pria",
        price: 485000,
        stock: 38,
        variants: "M, L, XL, XXL",
        status: "Published",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-BTK-02",
        name: "Tunik Parang Kusumo Indigo",
        category: "Batik Wanita",
        price: 365000,
        stock: 24,
        variants: "All Size",
        status: "Published",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-BTK-03",
        name: "Kain Jarik Primissima Cap Garutan",
        category: "Kain Tradisional",
        price: 220000,
        stock: 45,
        variants: "2 x 1.15m",
        status: "Published",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-BTK-04",
        name: "Outer Blazer Batik Katun Mega Mendung",
        category: "Batik Wanita",
        price: 295000,
        stock: 12,
        variants: "S, M, L",
        status: "Draft",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&auto=format&fit=crop"
      }
    ],
    accounting: {
      totalGmv: "Rp 85.400.000",
      platformFee: "Rp 2.135.000",
      takeRate: "2.5%",
      readySettlement: "Rp 83.265.000",
      totalCustomers: "1.480"
    }
  },
  2: {
    story: "Bandung Gadget Hub didirikan di pusat elektronik BEC Bandung pada 2020. Kami berfokus pada penyediaan aksesoris gadget premium, perangkat audio Hi-Fi, dan peripheral workstation original bergaransi resmi.",
    mission: "Menjadi rujukan terpercaya bagi para tech enthusiast dan profesional kreatif untuk mendapatkan gear teknologi terbaik dengan layanan purnajual prima dan pengiriman kilat terpercaya.",
    followers: "64.5k",
    happyClients: "21.3k",
    categories: [
      { title: "Mechanical Keyboard & Keycaps", amount: "Rp 58.4 Jt", progress: 85, variant: "primary" },
      { title: "TWS Audio & Headphone Hi-Fi", amount: "Rp 42.1 Jt", progress: 68, variant: "success" },
      { title: "Fast Charger & GaN Adapter", amount: "Rp 28.3 Jt", progress: 52, variant: "warning" },
      { title: "Deskmat & Ergonomic Stands", amount: "Rp 14.0 Jt", progress: 35, variant: "info" }
    ],
    products: [
      {
        id: "PRD-GDG-01",
        name: "Keychron K2 Pro Wireless Mechanical",
        category: "Keyboard",
        price: 1850000,
        stock: 42,
        variants: "Red, Brown, Blue Switch",
        status: "Published",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-GDG-02",
        name: "Sony WH-1000XM5 Noise Cancelling",
        category: "Audio",
        price: 4999000,
        stock: 15,
        variants: "Black, Silver",
        status: "Published",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-GDG-03",
        name: "Baseus 65W GaN5 Pro Fast Charger",
        category: "Charger & Power",
        price: 345000,
        stock: 88,
        variants: "2C + 1A",
        status: "Published",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=100&auto=format&fit=crop"
      }
    ],
    accounting: {
      totalGmv: "Rp 142.800.000",
      platformFee: "Rp 3.570.000",
      takeRate: "2.5%",
      readySettlement: "Rp 139.230.000",
      totalCustomers: "2.130"
    }
  },
  3: {
    story: "Kopi Gayo Mandiri lahir langsung dari kebun dataran tinggi Gayo, Takengon di ketinggian 1.400 mdpl. Kami mengolah biji arabika single origin specialty dengan metode wet-hulled dan natural anaerobik dari tangan petani lokal.",
    mission: "Memperpendek rantai pasok kopi dari perkebunan langsung ke cangkir konsumen (Farm to Cup) dengan memastikan transparansi harga beli gabah yang tinggi kepada petani Gayo.",
    followers: "12.8k",
    happyClients: "3.9k",
    categories: [
      { title: "Specialty Roasted Beans (250g/1kg)", amount: "Rp 9.8 Jt", progress: 70, variant: "primary" },
      { title: "Drip Bag Coffee Sachet", amount: "Rp 4.5 Jt", progress: 48, variant: "success" },
      { title: "Cold Brew Concentrate (1 Liter)", amount: "Rp 2.9 Jt", progress: 32, variant: "warning" },
      { title: "Alat Seduh V60 & Grinder Manual", amount: "Rp 1.4 Jt", progress: 20, variant: "info" }
    ],
    products: [
      {
        id: "PRD-KOP-01",
        name: "Arabika Gayo Wine Process 250gr",
        category: "Roasted Beans",
        price: 135000,
        stock: 50,
        variants: "Biji, Giling Halus, Giling Sedang",
        status: "Published",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-KOP-02",
        name: "Arabika Gayo Natural Anaerob 500gr",
        category: "Roasted Beans",
        price: 210000,
        stock: 35,
        variants: "Biji, Giling",
        status: "Published",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&auto=format&fit=crop"
      }
    ],
    accounting: {
      totalGmv: "Rp 18.600.000",
      platformFee: "Rp 465.000",
      takeRate: "2.5%",
      readySettlement: "Rp 18.135.000",
      totalCustomers: "412"
    }
  },
  7: {
    story: "Sneakers Urban Jakarta berawal dari kecintaan terhadap kultur streetwear dan komunitas sneakerhead di Jakarta Barat. Menjadi kurator terdepan untuk sepatu sneaker otentik 100% original, apparel limited edition, dan kolaborasi internasional.",
    mission: "Menghadirkan pengalaman belanja sneakers paling aman dan terpercaya dengan sertifikat garansi keaslian ganda, pengiriman aman terlindungi asuransi, dan layanan pembersihan sepatu premium.",
    followers: "89.4k",
    happyClients: "32.1k",
    categories: [
      { title: "Sepatu Sneaker Pria High/Low", amount: "Rp 98.6 Jt", progress: 85, variant: "primary" },
      { title: "Sneaker Kasual Wanita & Unisex", amount: "Rp 56.4 Jt", progress: 65, variant: "success" },
      { title: "Streetwear Apparel & Hoodie", amount: "Rp 38.2 Jt", progress: 50, variant: "warning" },
      { title: "Sneaker Care Kit & Proteksi", amount: "Rp 21.8 Jt", progress: 35, variant: "info" }
    ],
    products: [
      {
        id: "PRD-SNK-01",
        name: "Air Jordan 1 Retro High OG Chicago",
        category: "Sepatu Pria",
        price: 3450000,
        stock: 12,
        variants: "US 8, 8.5, 9, 10",
        status: "Published",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-SNK-02",
        name: "New Balance 990v6 Made in USA Grey",
        category: "Unisex",
        price: 3999000,
        stock: 8,
        variants: "US 7.5, 8.5, 9.5",
        status: "Published",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-SNK-03",
        name: "Compass Gazelle Low Black White",
        category: "Sneakers Lokal",
        price: 528000,
        stock: 65,
        variants: "38, 39, 40, 41, 42, 43",
        status: "Published",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=100&auto=format&fit=crop"
      },
      {
        id: "PRD-SNK-04",
        name: "Crep Protect Ultimate Shoe Care Kit",
        category: "Care & Cleaning",
        price: 295000,
        stock: 110,
        variants: "Standard Pack",
        status: "Published",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&auto=format&fit=crop"
      }
    ],
    accounting: {
      totalGmv: "Rp 215.000.000",
      platformFee: "Rp 5.375.000",
      takeRate: "2.5%",
      readySettlement: "Rp 209.625.000",
      totalCustomers: "3.240"
    }
  }
};

export const companyReviewsData = [
  { star: 5, progress: 85 },
  { star: 4, progress: 10 },
  { star: 3, progress: 3 },
  { star: 2, progress: 1 },
  { star: 1, progress: 1 }
];