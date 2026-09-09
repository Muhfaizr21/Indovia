# 📘 INDOVIA SAAS E-COMMERCE PLATFORM
## SYSTEM REQUIREMENTS SPECIFICATION (SRS) & ARCHITECTURAL BLUEPRINT
### MODUL: SUPERADMIN (PLATFORM OPERATOR & MULTI-TENANT CORE)

---

**Dokumen Versi:** 1.0.0-PROD  
**Klasifikasi:** Internal Confidential / Architectural Blueprint  
**Penyusun:** Principal Lead Systems & Business Analyst (15+ Years SaaS Architecture Experience)  
**Target Sistem:** Indovia SaaS E-Commerce Engine (Golang v1.22+ Backend, PostgreSQL, React 18 / Vite Frontend)

---

## 1. PENDAHULUAN & VISI ARSITEKTUR

### 1.1 Konteks Platform
Indovia adalah platform **Multi-Tenant SaaS E-Commerce Store Engine & Storefront Builder** kelas *enterprise* yang dirancang untuk memberdayakan merek independen, D2C, dan UMKM di Indonesia. 

Berbeda dengan toko e-commerce tunggal (single-store), sistem Indovia memiliki **tiga tingkatan pengguna terisolasi**:
1. **Storefront Customer (Pembeli Akhir):** Mengakses toko unik masing-masing merchant (subdomain/domain pribadi).
2. **Merchant Admin / Tenant (Pemilik Toko):** Mengelola katalog produk, stok lokal, pesanan toko, dan kustomisasi visual seksi tema (*Modular Section Engine*).
3. **SUPERADMIN (Platform Operator & Master Controller):** Pengendali ekosistem terpusat yang mengelola seluruh merchant (*multi-tenancy*), sistem monetisasi (*subscription & take-rate*), katalog master tema (*34+ Presets*), settlement keuangan (*escrow & payout*), integrasi pihak ketiga (*RajaOngkir & WhatsApp*), dan keandalan engine Golang.

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                   SUPERADMIN INDOVIA                    │
                    │        (Platform Operator / Master Controller)          │
                    └────────────────────────────┬────────────────────────────┘
                                                 │
                  ┌──────────────────────────────┴──────────────────────────────┐
                  ▼                                                             ▼
     ┌────────────────────────┐                                   ┌────────────────────────┐
     │  MERCHANT A (Tenant)   │                                   │  MERCHANT B (Tenant)   │
     │  `fashion.indovia.com` │                                   │  `gadget.indovia.com`  │
     └────────────┬───────────┘                                   └────────────┬───────────┘
                  │                                                             │
                  ▼                                                             ▼
       [ Storefront Pembeli ]                                        [ Storefront Pembeli ]
```

---

## 2. ROLE-BASED ACCESS CONTROL (RBAC) SUPERADMIN

Platform Superadmin tidak dioperasikan oleh satu akun serbaguna, melainkan mengadopsi prinsip *Least Privilege* dengan 5 peran internal:

| Kode Role | Nama Peran | Tanggung Jawab Utama | Akses Sensitif |
| :--- | :--- | :--- | :--- |
| `ROLE_SUPER_ROOT` | **Platform Master / Owner** | Akses tanpa batas seluruh sistem, konfigurasi server, penetapan role internal. | Penuh (Read/Write/Delete) |
| `ROLE_FINANCE_LEAD` | **VP of Finance / Ops** | Manajemen subscription, persetujuan payout, audit escrow & bagi hasil transaksi. | Payout Approval, Ledger, PPN |
| `ROLE_COMPLIANCE_OPS` | **Trust & Safety Officer** | Verifikasi KYC merchant, audit katalog produk, *takedown* produk/toko bermasalah. | Store Freeze, KYC Approval |
| `ROLE_SUPPORT_AGENT` | **Senior Customer Support** | Investigasi kendala merchant, *Impersonate ("Login as Merchant")*, read log error. | Impersonation (Time-bound) |
| `ROLE_TECH_DEVOPS` | **DevOps & System Engineer** | Telemetri Golang engine, manajemen API keys pihak ketiga, maintenance toggle. | API Credentials, System Health |

---

## 3. SPESIFIKASI 8 MODUL FUNGSIONAL UTAMA

---

### MODUL 1: MULTI-TENANT & MERCHANT LIFECYCLE MANAGEMENT

Modul ini bertanggung jawab atas seluruh siklus hidup merchant sejak registrasi hingga skala enterprise.

#### 1.1 Merchant Provisioning & Subdomain Routing
* **Otomasi Subdomain:** Saat merchant mendaftar, sistem otomatis mengalokasikan subdomain unik (e.g. `[slug].indovia.com`).
* **Tenant Isolation:** Middleware backend Golang mengekstrak `Host` header dan menginjeksi `tenant_id` ke dalam context request untuk memastikan isolasi data 100% pada tingkat database.
* **Status Lifecycle:**
  * `TRIAL`: Masa percobaan aktif (14 hari default).
  * `ACTIVE`: Berlangganan aktif berbayar.
  * `PAST_DUE`: Tagihan gagal dibayar, masa tenggang (grace period 3 hari) dengan banner peringatan di admin merchant.
  * `FROZEN / SUSPENDED`: Toko dinonaktifkan sementara dari storefront publik karena pelanggaran hukum atau tagihan kadaluarsa > 7 hari.
  * `ARCHIVED`: Toko ditutup, data disimpan selama 90 hari sebelum penghapusan permanen sesuai regulasi PDP.

#### 1.2 Verifikasi Merchant & KYC (Know Your Customer)
* Form peninjauan dokumen resmi: KTP Pemilik, NPWP Usaha, NIB (Nomor Induk Berusaha), dan Rekening Bank Penerima.
* Validasi rekening bank otomatis via API switcher perbankan (memastikan nama pemilik rekening identik dengan nama KTP/PT).
* Tombol aksi: `Approve KYC`, `Reject with Notes`, `Request Document Re-upload`.

#### 1.3 Custom Domain & Zero-Touch SSL Engine
* Manajemen pemetaan domain pribadi merchant (e.g. `www.brandkeren.id` $\to$ CNAME `cname.indovia.com`).
* Otomasi verifikasi DNS (A-Record & CNAME validation via DNS over HTTPS query).
* Pemantauan status sertifikat SSL (*Let's Encrypt automated challenge*) dan notifikasi peringatan jika masa berlaku tersisa < 15 hari.

#### 1.4 Cryptographic Impersonation ("Login as Merchant")
* Fitur krusial bagi Customer Support untuk menyelesaikan masalah toko merchant tanpa meminta password mereka.
* **Mekanisme Keamanan:**
  1. Superadmin menekan tombol *"Masuk Sebagai Toko Ini"*.
  2. Golang auth service menerbitkan JWT sementara dengan klaim: `{ sub: merchant_id, impersonator_id: admin_id, exp: now + 30m, scope: "impersonate" }`.
  3. Header UI admin merchant menampilkan banner peringatan merah: *"Sesi Bantuan: Anda sedang mengakses toko sebagai Superadmin (Audited)"*.
  4. Seluruh aksi yang dilakukan saat impersonasi dicatat dalam `audit_logs` dengan flag `is_impersonation: true`.

---

### MODUL 2: SAAS MONETIZATION, SUBSCRIPTION & BILLING ENGINE

Modul inti yang menghasilkan arus kas (cashflow) platform Indovia sebagai penyedia SaaS.

#### 2.1 Manajemen Tier Paket Berlangganan (Pricing Plans)
Superadmin dapat membuat, menyunting, dan menonaktifkan paket berlangganan dengan konfigurasi granular:
* **Fitur & Kuota Terikat:**
  * Kuota Maksimal Produk (misal: Starter = 50 produk, Pro = 500 produk, Enterprise = Unlimited).
  * Kuota Akun Staf Toko (Starter = 1, Pro = 5, Enterprise = Unlimited).
  * Kuota Penyimpanan Media / CDN (Starter = 2 GB, Pro = 20 GB, Enterprise = 100 GB).
  * Akses Custom Domain: (Starter = Hanya subdomain, Pro/Enterprise = Domain kustom sendiri).
  * Akses Kode Tema Kustom & API Webhook.
* **Siklus Pembayaran:** Bulanan, 6 Bulan (diskon 10%), Tahunan (diskon 20%).

#### 2.2 Dunning Management & Recurring Billing
* Integrasi *card tokenization* & e-wallet auto-debit untuk perpanjangan sewa software tanpa intervensi manual.
* **Logika Percobaan Ulang (Retry Engine):**
  * Hari H (Jatuh Tempo): Transaksi dijalankan $\to$ Jika gagal, kirim notifikasi email & WhatsApp transaksional.
  * Hari H+1: Percobaan otomatis ke-2.
  * Hari H+3: Percobaan otomatis ke-3 $\to$ Jika gagal, ubah status toko ke `PAST_DUE`.
  * Hari H+7: Kunci akses checkout toko publik $\to$ ubah status toko ke `FROZEN`.

#### 2.3 Platform Take-Rate & Komisi Transaksi Toko
* Superadmin dapat menetapkan skema bagi hasil per checkout pada toko merchant:
  * **Persentase Transaksi:** e.g. 1.0% dari Gross Merchandise Value (GMV).
  * **Biaya Tetap per Transaksi:** e.g. Rp 1.000 / pesanan berhasil.
* Skema fleksibel per paket: Paket *Starter* dikenakan 1.5% GMV, sementara *Enterprise* 0% (hanya bayar sewa tahunan).
* Dashboard analitik real-time yang menghitung laba bersih komisi Indovia terpisah dari omset merchant.

---

### MODUL 3: CENTRAL THEME, SECTION & LAYOUT MARKETPLACE

Modul untuk mengelola aset storefront utama sesuai dokumen README (*34+ Industry Theme Presets & 24+ Layouts*).

#### 3.1 Theme Repository & Version Control
* Katalog tema terpusat: *Fashion, Electronics, Furniture, F&B, Luxury Minimalist, Cosmetics, Sports, Automotive, dll.*
* Metadata tema: Nama, Kategori Industri, Versi Semantik (v1.2.0), Thumbnail Desktop/Mobile, Bundle Component Key.
* Status Tema:
  * `PUBLIC_FREE`: Tersedia gratis untuk semua merchant.
  * `PREMIUM`: Merchant harus membayar biaya aktivasi satu kali (one-time fee) atau upgrade ke paket Pro.
  * `BETA / STAGING`: Hanya dapat diuji oleh merchant tertentu (*early-access*).
  * `DEPRECATED`: Tema usang yang tidak dapat dipilih oleh toko baru tetapi tetap berjalan pada toko lama.

#### 3.2 Modular Section Registry (Engine ON/OFF Toggles)
* Registri master modul seksi halaman depan:
  1. `TOP_ANNOUNCEMENT_BAR` (Pita Pengumuman Promo)
  2. `HERO_SLIDER_BANNER` (Banner Slider Utama)
  3. `FLASH_SALE_COUNTDOWN` (Penawaran Kilat & Timer Mundur)
  4. `DYNAMIC_CATEGORY_CAROUSEL` (Kategori Produk Interaktif)
  5. `BEST_SELLER_GRID` (Koleksi Produk Terlaris)
  6. `TESTIMONIAL_VERIFIED_REVIEW` (Ulasan Terverifikasi)
  7. `INSTAGRAM_SOCIAL_FEED` (Galeri Feed Instagram)
  8. `NEWSLETTER_SUBSCRIPTION_HUB` (Form Langganan Email)
  9. `BLOG_COMMERCE_INTEGRATED` (Artikel & Edukasi Produk)
* Superadmin mengatur JSON Schema default untuk setiap seksi agar builder merchant memiliki batasan konfigurasi yang seragam.

---

### MODUL 4: CENTRAL ESCROW, PAYMENT GATEWAY & PAYOUT ENGINE

Modul finansial kritis jika Indovia bertindak sebagai *Master Merchant of Record* (seperti sistem Tokopedia/Shopify Payments).

```
[ Pembeli Bayar Rp 200.000 ] ──► [ Central PG: Midtrans/Xendit ]
                                              │
                                              ▼
                             [ Rekening Escrow Indovia ]
                                    (Penampungan)
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    ▼                                                   ▼
       [ Merchant Wallet: Rp 197.000 ]                     [ Indovia Fee: Rp 3.000 ]
         (Bisa Dicairkan setelah Pesanan Selesai)            (Pendapatan Komisi SaaS)
```

#### 4.1 Master Payment Gateway Hub
* Konfigurasi API Credentials terpusat untuk kanal pembayaran nasional:
  * **QRIS Instant:** GoPay, OVO, DANA, ShopeePay, LinkAja.
  * **Virtual Account:** BCA, Mandiri, BRI, BNI, Permata, BSI.
  * **Retail Outlet:** Alfamart, Indomaret.
  * **Kartu Kredit / Debit:** Visa, Mastercard, JCB (3DS 2.0).
* Monitoring kesehatan gateway (Latency check, persentase kegagalan transaksi per kanal, peringatan pemeliharaan bank).

#### 4.2 Merchant Escrow Wallet & Settlement Ledger
* Setiap merchant memiliki buku besar (ledger) saldo digital di backend:
  * `pending_balance`: Dana dari transaksi pembeli yang masih dalam perjalanan ekspedisi.
  * `available_balance`: Dana pesanan yang telah berstatus *Delivered & Confirmed* oleh pembeli atau otomatis selesai dalam 2x24 jam.
  * `locked_balance`: Dana yang dibekukan karena ada sengketa (dispute) dari pembeli.

#### 4.3 Payout Disbursement Management (Pencairan Saldo Toko)
* Pengaturan parameter payout:
  * Jadwal pencairan: Otomatis harian (T+1), mingguan, atau berdasarkan permintaan (*on-demand*).
  * Batas minimal penarikan: e.g. Rp 50.000.
  * Biaya transfer antar-bank (e.g. flat Rp 2.500 / pencairan).
* **Alur Persetujuan (Approval Flow):**
  * Penarikan < Rp 10.000.000: *Auto-disbursement* via API Xendit XenPlatform / Midtrans Iris.
  * Penarikan $\ge$ Rp 10.000.000: Wajib *Manual 2-Factor Approval* oleh `ROLE_FINANCE_LEAD`.

---

### MODUL 5: GLOBAL LOGISTICS & WHATSAPP OMNICHANNEL HUB

#### 5.1 Logistics Aggregator Hub (RajaOngkir Pro & Direct Carrier API)
* Master API Key pengiriman terpusat untuk kalkulasi tarif ongkir real-time ke 7.000+ kecamatan di Indonesia.
* **Manajemen Kurir Nasional:**
  * JNE (REG, YES, OKE), J&T Express, SiCepat, Anteraja, Pos Indonesia, GoSend/GrabExpress (Instant/Same Day).
* **Kill Switch Kurir:** Superadmin dapat mematikan salah satu opsi kurir secara global jika terjadi gangguan logistik (misal: salah satu ekspedisi overload saat Hari Belanja Nasional).
* **Fitur Penyesuaian Margin:** Opsi penambahan markup ongkir (e.g. Rp 500 per paket untuk asuransi platform).

#### 5.2 Centralized WhatsApp Business Gateway Hub
* Mengontrol integrasi pesan transaksional keluar (Fonnte / WABA / Twilio):
  * Pengiriman nomor resi pengiriman otomatis ke nomor WA pembeli saat merchant menginput resi.
  * OTP login merchant / reset password via WhatsApp.
  * Kuota pesan WA per toko sesuai paket langganan.

---

### MODUL 6: GLOBAL PRODUCT MODERATION, COMPLIANCE & CATALOG AUDIT

Menjaga reputasi ekosistem Indovia dan mematuhi hukum perlindungan konsumen & UU ITE di Indonesia.

#### 6.1 Mesin Audit Katalog Nasional
* Pencarian global lintas ratusan toko berdasarkan: kata kunci produk, SKU, kategori, nama merchant, atau rentang harga.
* **Automated Blacklist Word Filter:** Sistem otomatis menandai (*flagging*) produk yang mengandung kata kunci barang terlarang (narkotika, senjata api, obat keras tanpa resep dokter, barang palsu bermerek, konten pornografi).
* Status Moderasi Produk: `APPROVED`, `FLAGGED_FOR_REVIEW`, `TAKEDOWN_BY_ADMIN`.

#### 6.2 Mekanisme Takedown Sepihak & Penalty System
* Superadmin berhak mencabut produk pelanggar dari toko publik merchant secara instan disertai alasan resmi yang terkirim ke email pemilik toko.
* Sistem Poin Pelanggaran (*Strike System*):
  * 1x Pelanggaran: Peringatan tertulis + Takedown produk.
  * 2x Pelanggaran: Pembatasan upload produk baru selama 7 hari.
  * 3x Pelanggaran: *Permanent Store Ban / Freeze*.

---

### MODUL 7: EXECUTIVE BI & PLATFORM-WIDE ANALYTICS

Dasar pengambilan keputusan strategis bisnis bagi Founder, C-Level, dan Investor Indovia.

#### 7.1 Metrik Finansial SaaS (SaaS Business Intelligence)
* **MRR (Monthly Recurring Revenue):** Pendapatan bulanan berulang dari paket sewa software.
* **ARR (Annual Recurring Revenue):** Proyeksi pendapatan tahunan dari kontrak langganan aktif.
* **ARPU (Average Revenue Per User):** Rata-rata kontribusi pendapatan per merchant per bulan.
* **Net Revenue Retention (NRR):** Persentase pertumbuhan nilai langganan dari merchant lama (upsell paket).
* **Churn Rate:**
  * *Customer Churn:* Persentase toko yang berhenti berlangganan per bulan.
  * *Revenue Churn:* Nilai MRR yang hilang akibat downgrade / pembatalan toko.

#### 7.2 Metrik Perdagangan Platform (Macro E-Commerce Trends)
* **Total Platform GMV:** Akumulasi seluruh omset penjualan barang di ratusan toko Indovia.
* **Take-Rate Revenue:** Keuntungan murni platform dari pemotongan komisi GMV.
* **Tingkat Konversi Nasional:** Rata-rata perbandingan pengunjung storefront terhadap transaksi lunas.
* **Heatmap Demografi:** Peta konsentrasi penjualan antar-provinsi di Indonesia (Jabodetabek vs Non-Jawa).
* **Pola Waktu Belanja:** Analisis jam sibuk checkout nasional (e.g. puncak 19:00 - 21:00 WIB) untuk rekomendasi infrastruktur.

#### 7.3 Pelaporan & Rekonsiliasi Pajak
* Ekspor laporan keuangan standar akuntansi Indonesia (CSV / Excel / PDF).
* Perhitungan otomatis PPN SaaS 11% atas biaya sewa software untuk pelaporan SPT Pajak Indovia.

---

### MODUL 8: INFRASTRUKTUR, KEAMANAN & AUDIT TRAIL ENGINE GOLANG

Memastikan stabilitas backend Golang v1.22 dan database PostgreSQL yang menangani jutaan request per hari.

#### 8.1 Telemetri Runtime Golang & Health Monitoring
* Pemantauan kesehatan API secara langsung (*real-time internal metrics*):
  * Jumlah active Goroutine (mendeteksi potensi goroutine memory leak).
  * Alokasi Memory Heap & Garbage Collection (GC) Pause Duration.
  * P95 & P99 API Response Latency (target < 50ms).
  * Database Connection Pool Stats: MaxOpen, OpenConnections, InUse, Idle.

#### 8.2 Immutable Audit Trail (WORM - Write Once Read Many)
* Setiap perubahan data penting dicatat ke dalam tabel `audit_logs` yang tidak dapat dihapus (*append-only*):
  * Siapa pelakunya (Admin ID & Role).
  * Apa yang diubah (Tabel, Record ID, Data Sebelum $\to$ Data Sesudah dalam bentuk JSON Diff).
  * Kapan dan dari mana (Timestamp mikrodetik, Alamat IP publik, User-Agent browser).

#### 8.3 Kontrol Darurat & Keamanan Platform
* **Global Maintenance Mode:** Tombol darurat untuk mengunci toko sementara dengan halaman kustom (*"Indovia sedang melakukan peningkatan sistem"*) saat migrasi skema database besar.
* **API Rate-Limiting Configuration:** Konfigurasi batas request (misal: 60 req/menit per IP) untuk menangkal serangan DDoS / scraping bot liar.
* **Session Revocation:** Kemampuan mencabut seluruh token JWT merchant / admin seketika jika terdeteksi kebocoran kredensial.

---

## 4. RELATIONAL DATABASE SCHEMA (POSTGRESQL / GORM)

Struktur tabel inti yang dibutuhkan pada backend Golang (`backend/app/models/`):

```sql
-- 1. TABEL TENANT / MERCHANT
CREATE TABLE merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(32) UNIQUE NOT NULL, -- e.g. "IND-M-8891"
    name VARCHAR(150) NOT NULL,
    subdomain VARCHAR(63) UNIQUE NOT NULL, -- e.g. "butik-azzahra"
    custom_domain VARCHAR(255) UNIQUE NULL, -- e.g. "butikazzahra.com"
    owner_name VARCHAR(120) NOT NULL,
    owner_email VARCHAR(150) UNIQUE NOT NULL,
    owner_phone VARCHAR(25) NOT NULL,
    status VARCHAR(20) DEFAULT 'trial', -- trial, active, past_due, frozen, archived
    kyc_status VARCHAR(20) DEFAULT 'unverified', -- unverified, pending, approved, rejected
    plan_id UUID REFERENCES subscription_plans(id),
    plan_expires_at TIMESTAMP WITH TIME ZONE NULL,
    escrow_balance NUMERIC(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

-- 2. TABEL MASTER PAKET LANGGANAN
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL, -- starter, growth, enterprise
    name VARCHAR(100) NOT NULL,
    price_monthly NUMERIC(12, 2) NOT NULL,
    price_yearly NUMERIC(12, 2) NOT NULL,
    max_products INT NOT NULL DEFAULT 50,
    max_staff_accounts INT NOT NULL DEFAULT 1,
    max_storage_mb INT NOT NULL DEFAULT 2048,
    take_rate_percentage NUMERIC(4, 2) DEFAULT 1.50, -- 1.5%
    take_rate_fixed NUMERIC(10, 2) DEFAULT 0.00,
    custom_domain_allowed BOOLEAN DEFAULT FALSE,
    features_json JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABEL INVOICE TAGIHAN SAAS
CREATE TABLE subscription_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL, -- e.g. "INV/2026/09/SAAS-881"
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    billing_cycle VARCHAR(20) NOT NULL, -- monthly, yearly
    amount NUMERIC(12, 2) NOT NULL,
    tax_amount NUMERIC(12, 2) NOT NULL, -- PPN 11%
    total_amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'unpaid', -- unpaid, paid, expired, failed
    payment_method VARCHAR(50) NULL,
    paid_at TIMESTAMP WITH TIME ZONE NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABEL PENCAIRAN SALDO ESCROW (PAYOUT REQUEST)
CREATE TABLE payout_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payout_code VARCHAR(50) UNIQUE NOT NULL, -- e.g. "WD-20260908-001"
    merchant_id UUID NOT NULL REFERENCES merchants(id),
    amount NUMERIC(15, 2) NOT NULL,
    bank_fee NUMERIC(10, 2) DEFAULT 2500.00,
    net_amount NUMERIC(15, 2) NOT NULL,
    bank_code VARCHAR(20) NOT NULL, -- BCA, MANDIRI, BNI, BRI
    account_number VARCHAR(50) NOT NULL,
    account_holder VARCHAR(120) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, rejected
    rejection_reason TEXT NULL,
    processed_by UUID REFERENCES users(id),
    disbursed_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABEL AUDIT TRAIL OPERASIONAL
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_id UUID NOT NULL REFERENCES users(id),
    actor_name VARCHAR(100) NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL, -- e.g. "MERCHANT_SUSPEND", "PAYOUT_APPROVE"
    target_entity VARCHAR(50) NOT NULL, -- "merchants", "payouts", "products"
    target_id VARCHAR(100) NOT NULL,
    old_values JSONB NULL,
    new_values JSONB NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT NOT NULL,
    is_impersonation BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 5. SPESIFIKASI ENDPOINT API BACKEND (GOLANG)

Daftar endpoint RESTful standar yang harus disediakan oleh Gin Web Framework (`backend/routes/api.go`):

```text
POST   /api/v1/admin/auth/login                  -> Autentikasi tim internal superadmin
GET    /api/v1/admin/dashboard/summary           -> Ringkasan eksekutif (MRR, GMV, Tenant Count)
GET    /api/v1/admin/dashboard/analytics         -> Dataset tren grafik (5 dimensi analitik)

-- MANAJEMEN MERCHANT
GET    /api/v1/admin/merchants                   -> List seluruh merchant dengan paginasi & filter
GET    /api/v1/admin/merchants/:id               -> Detail lengkap toko merchant
PATCH  /api/v1/admin/merchants/:id/status        -> Ubah status toko (active, suspend, frozen)
POST   /api/v1/admin/merchants/:id/impersonate   -> Terbitkan token impersonasi "Login as Merchant"
PATCH  /api/v1/admin/merchants/:id/kyc           -> Setujui / tolak verifikasi KYC toko

-- SAAS BILLING & MONETISASI
GET    /api/v1/admin/plans                       -> Master list paket harga langganan
POST   /api/v1/admin/plans                       -> Tambah paket baru
PUT    /api/v1/admin/plans/:id                   -> Update konfigurasi paket & batasan kuota
GET    /api/v1/admin/invoices                    -> Rekap seluruh invoice tagihan platform
PATCH  /api/v1/admin/invoices/:id/mark-paid      -> Tandai pembayaran manual invoice

-- ESCROW & PENCAIRAN SALDO TOKO
GET    /api/v1/admin/payouts                     -> Antrean permintaan pencairan dana toko
POST   /api/v1/admin/payouts/:id/approve         -> Persetujuan pencairan dana (trigger disbursement)
POST   /api/v1/admin/payouts/:id/reject          -> Tolak permintaan pencairan dana

-- KATALOG TEMA & MODUL
GET    /api/v1/admin/themes                      -> Master katalog 34+ tema
POST   /api/v1/admin/themes                      -> Rilis tema baru
PATCH  /api/v1/admin/themes/:id/status           -> Ubah status tema (free, premium, deprecated)

-- AUDIT & KEAMANAN
GET    /api/v1/admin/audit-logs                  -> Telusuri jejak rekam audit log sistem
GET    /api/v1/admin/system/health               -> Metrik runtime Golang (Goroutine, Memory, GC)
POST   /api/v1/admin/system/maintenance          -> Toggle status mode pemeliharaan global
```

---

## 6. PEMETAAN NAVIGASI MENU SUPERADMIN (FRONTEND REACT)

Pada struktur menu template Larkon (`frontend/src/assets/data/menu-items.js`), hierarki menu untuk Superadmin diatur menjadi:

```
├── RINGKASAN EKSEKUTIF
│   └── 📊 Dashboard Global (MRR, GMV, Realtime Activity)
│
├── EKOSISTEM TENANT / MERCHANT
│   ├── 🏬 Direktori Toko (List, Filter Paket, Suspend Toko)
│   ├── 🪪 Verifikasi KYC Merchant (Dokumen Legalitas & Bank)
│   ├── 🌐 Manajemen Domain Kustom & SSL (Mapping DNS & CNAME)
│   └── 👥 Akun Merchant & Impersonasi ("Login as Merchant")
│
├── MONETISASI & BILLING SAAS
│   ├── 💎 Master Paket Berlangganan (Starter, Pro, Enterprise)
│   ├── 🧾 Invoice Langganan Platform (Status Pembayaran Merchant)
│   └── 📈 Pengaturan Komisi Transaksi (Take-Rate Engine)
│
├── KEUANGAN & ESCROW SETTLEMENT
│   ├── 🏦 Antrean Pencairan Dana (Payout Approval / Disbursement)
│   ├── 💼 Buku Besar Escrow Terpusat (Saldo Mengendap & Sengketa)
│   └── 💳 Integrasi Payment Gateway (Midtrans, Xendit, QRIS)
│
├── STOREFRONT ENGINE & THEMES
│   ├── 🎨 Master Katalog Tema (34+ Industry Presets)
│   ├── 🧩 Modular Section Registry (ON/OFF Toggles Schema)
│   └── 📱 Manajemen Layout Produk (24+ Detail Layouts)
│
├── LOGISTIK & SALURAN OMNICHANNEL
│   ├── 🚚 Aggregator Ekspedisi (RajaOngkir, J&T, JNE, SiCepat)
│   └── 💬 WhatsApp Notification Gateway (Master API & Template)
│
├── KEPATUHAN & MODERASI KONTEN
│   ├── 🔍 Audit Katalog Produk Nasional (Pencarian Global)
│   ├── 🚫 Penanganan Produk Terlarang (Takedown Sepihak)
│   └── ⭐ Moderasi Ulasan & Anti-Spam
│
└── KEAMANAN & SISTEM ENGINE
    ├── 🛡️ Manajemen Tim Superadmin (RBAC 5 Level)
    ├── 📜 Immutable Audit Logs (Rekaman Aktivitas Sensitif)
    └── ⚙️ Telemetri Golang & Status Sistem (Health Check, Maintenance)
```

---

## 7. KESIMPULAN & STANDAR KELAYAKAN ENTERPRISE

Dokumentasi spesifikasi ini memastikan bahwa pengembangan platform Indovia memiliki fondasi arsitektur yang:
1. **Scalable:** Engine Golang terisolasi per tenant ID sehingga mampu melayani puluhan ribu transaksi konkuren tanpa bottleneck.
2. **Auditable:** Semua perputaran uang (escrow, take-rate, payout) dan aksi impersonasi memiliki rekam jejak yang dapat diverifikasi akuntan publik.
3. **Secure:** Menggunakan sistem JWT bertingkat, bcrypt hashing, dan enkripsi field rekening bank sesuai kepatuhan UU Perlindungan Data Pribadi (PDP).
