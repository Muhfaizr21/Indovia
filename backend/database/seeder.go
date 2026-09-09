package database

import (
	"log"
	"time"

	"gorm.io/gorm"
	"indovia-backend/app/models"
	"indovia-backend/pkg/utils"
)

func AutoMigrateAndSeed(db *gorm.DB) error {
	// 1. Auto Migrate models
	err := db.AutoMigrate(
		&models.User{},
		&models.Merchant{},
		&models.AuditLog{},
		&models.Order{},
		&models.Disbursement{},
		&models.PayoutGlobalConfigEntity{},
		&models.EscrowJournal{},
		&models.PaymentChannelEntity{},
		&models.GatewayCredentialEntity{},
	)
	if err != nil {
		log.Printf("❌ Failed to auto-migrate database: %v\n", err)
		return err
	}
	log.Println("✅ Database schema migrated successfully (User, Merchant, AuditLog, Order, Disbursement, PayoutConfig, EscrowJournal, PaymentChannel, GatewayCredential)!")

	// 2. Seed Superadmin if not exists
	var count int64
	db.Model(&models.User{}).Where("email = ?", "admin@indovia.com").Count(&count)

	if count == 0 {
		hashedPassword, err := utils.HashPassword("admin")
		if err != nil {
			return err
		}

		superadmin := models.User{
			Name:     "Super Admin Indovia",
			Email:    "admin@indovia.com",
			Password: hashedPassword,
			Role:     "superadmin",
			Avatar:   "https://api.dicebear.com/7.x/avataaars/svg?seed=IndoviaSuperAdmin",
		}

		if err := db.Create(&superadmin).Error; err != nil {
			log.Printf("❌ Failed to seed superadmin: %v\n", err)
			return err
		}

		log.Println("🌱 [SEEDER] Superadmin account created successfully!")
		log.Println("👉 Email: admin@indovia.com | Password: admin")
	} else {
		log.Println("ℹ️  [SEEDER] Superadmin account already exists.")
	}

	// 3. Seed Initial Merchants if not exists
	var merchantCount int64
	db.Model(&models.Merchant{}).Count(&merchantCount)
	if merchantCount == 0 {
		trialDate := time.Now().Add(10 * 24 * time.Hour)
		sslDate := time.Now().Add(75 * 24 * time.Hour)

		merchants := []models.Merchant{
			{
				Code:              "IND-M-101",
				Name:              "Batik Nusantara Official",
				Subdomain:         "batik-nusantara",
				CustomDomain:      "batiknusantara.co.id",
				DomainVerified:    true,
				SSLStatus:         "active",
				SSLExpiresAt:      &sslDate,
				OwnerName:         "Budi Hendrawan",
				OwnerEmail:        "budi@batiknusantara.id",
				OwnerPhone:        "0812-9876-5432",
				City:              "Solo, Jawa Tengah",
				Address:           "Jl. Slamet Riyadi No. 142, Laweyan",
				Category:          "Fashion & Batik Tradisional",
				Avatar:            "https://images.unsplash.com/photo-1544441893-675973e31985?w=150&auto=format&fit=crop",
				Banner:            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop",
				Status:            "active",
				Plan:              "Enterprise",
				MonthlyGMV:        85400000,
				TotalOrders:       482,
				ItemCount:         94,
				Rating:            4.9,
				ReviewCount:       128,
				KYCStatus:         "approved",
				KTPNumber:         "3372011204850001",
				NPWPNumber:        "08.123.456.7-526.000",
				NIBNumber:         "1209230018273",
				BankName:          "BCA",
				BankAccountNumber: "0158829910",
				BankAccountHolder: "Budi Hendrawan",
				BankVerified:      true,
				ThemeConfig:       `{"theme_id":"fashion-01","theme_name":"Demo 01 - Fashion Store","product_layout":"Product Single 1"}`,
			},
			{
				Code:              "IND-M-102",
				Name:              "Bandung Gadget Hub",
				Subdomain:         "gadget-hub",
				CustomDomain:      "gadgethub.id",
				DomainVerified:    true,
				SSLStatus:         "active",
				SSLExpiresAt:      &sslDate,
				OwnerName:         "Deni Pratama",
				OwnerEmail:        "deni@gadgethub.id",
				OwnerPhone:        "0813-8822-1199",
				City:              "Bandung, Jawa Barat",
				Address:           "BEC Mall Lantai 2 Blok A-12",
				Category:          "Elektronik & Gadget",
				Avatar:            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop",
				Banner:            "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop",
				Status:            "active",
				Plan:              "Pro",
				MonthlyGMV:        142800000,
				TotalOrders:       610,
				ItemCount:         152,
				Rating:            4.8,
				ReviewCount:       240,
				KYCStatus:         "approved",
				KTPNumber:         "3273012508890002",
				NPWPNumber:        "09.432.123.4-428.000",
				NIBNumber:         "2109230044122",
				BankName:          "Mandiri",
				BankAccountNumber: "1310098234120",
				BankAccountHolder: "Deni Pratama",
				BankVerified:      true,
				ThemeConfig:       `{"theme_id":"fashion-02","theme_name":"Demo 02 - Minimalist Boutique","product_layout":"Product Single 3"}`,
			},
			{
				Code:              "IND-M-103",
				Name:              "Kopi Gayo Mandiri",
				Subdomain:         "kopi-gayo",
				OwnerName:         "Teuku Rizal",
				OwnerEmail:        "rizal@kopigayo.com",
				OwnerPhone:        "0852-7711-4433",
				City:              "Takengon, Aceh Tengah",
				Address:           "Jl. Sengeda No. 88",
				Category:          "Makanan & Minuman (F&B)",
				Avatar:            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=150&auto=format&fit=crop",
				Banner:            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop",
				Status:            "trial",
				TrialEndsAt:       &trialDate,
				Plan:              "Starter",
				MonthlyGMV:        18600000,
				TotalOrders:       145,
				ItemCount:         28,
				Rating:            4.7,
				ReviewCount:       34,
				KYCStatus:         "pending",
				KYCNotes:          "Dokumen KTP dan NIB sudah diunggah, menunggu verifikasi nama rekening bank.",
				KTPNumber:         "1104011406920003",
				BankName:          "BSI",
				BankAccountNumber: "7128892301",
				BankAccountHolder: "Teuku Rizal",
				BankVerified:      false,
				ThemeConfig:       `{"theme_id":"fashion-03","theme_name":"Demo 03 - Luxury Artisan","product_layout":"Product Single 5"}`,
			},
			{
				Code:              "IND-M-104",
				Name:              "Hijab Syari Solo",
				Subdomain:         "hijab-syari",
				OwnerName:         "Siti Rahmawati",
				OwnerEmail:        "siti@hijabsyari.id",
				OwnerPhone:        "0857-4123-9988",
				City:              "Surakarta, Jawa Tengah",
				Address:           "Pasar Klewer Blok B No. 44",
				Category:          "Busana Muslim",
				Avatar:            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop",
				Banner:            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop",
				Status:            "active",
				Plan:              "Pro",
				MonthlyGMV:        52300000,
				TotalOrders:       380,
				ItemCount:         75,
				Rating:            4.9,
				ReviewCount:       192,
				KYCStatus:         "approved",
				KTPNumber:         "3372024508930004",
				NPWPNumber:        "07.889.332.1-526.000",
				BankName:          "BRI",
				BankAccountNumber: "009801029384501",
				BankAccountHolder: "Siti Rahmawati",
				BankVerified:      true,
				ThemeConfig:       `{"theme_id":"fashion-01","theme_name":"Demo 01 - Fashion Store","product_layout":"Product Single 2"}`,
			},
			{
				Code:              "IND-M-105",
				Name:              "Skincare Glowing ID",
				Subdomain:         "skincare-glowing",
				OwnerName:         "Anisa Wijaya",
				OwnerEmail:        "anisa@glowing.co.id",
				OwnerPhone:        "0818-0912-3344",
				City:              "Jakarta Selatan",
				Address:           "Rukan Kemang Pratama No. 8",
				Category:          "Kecantikan & Kosmetik",
				Avatar:            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop",
				Banner:            "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop",
				Status:            "past_due",
				Plan:              "Pro",
				MonthlyGMV:        38400000,
				TotalOrders:       210,
				ItemCount:         42,
				Rating:            4.6,
				ReviewCount:       65,
				KYCStatus:         "approved",
				KTPNumber:         "3174015509950005",
				BankName:          "BCA",
				BankAccountNumber: "5220918234",
				BankAccountHolder: "Anisa Wijaya",
				BankVerified:      true,
				ThemeConfig:       `{"theme_id":"fashion-02","theme_name":"Demo 02 - Minimalist Boutique","product_layout":"Product Single 4"}`,
			},
			{
				Code:              "IND-M-106",
				Name:              "Dapur Rendang Minang",
				Subdomain:         "rendang-minang",
				OwnerName:         "H. Syamsul Bahri",
				OwnerEmail:        "syamsul@rendangminang.com",
				OwnerPhone:        "0811-6622-7788",
				City:              "Padang, Sumatera Barat",
				Address:           "Jl. Khatib Sulaiman No. 12",
				Category:          "Kuliner Khas Nusantara",
				Avatar:            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop",
				Banner:            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop",
				Status:            "trial",
				TrialEndsAt:       &trialDate,
				Plan:              "Starter",
				MonthlyGMV:        9800000,
				TotalOrders:       88,
				ItemCount:         16,
				Rating:            4.9,
				ReviewCount:       42,
				KYCStatus:         "pending",
				KYCNotes:          "Pengajuan verifikasi toko baru. Menunggu dokumen NPWP usaha.",
				KTPNumber:         "1371011105780006",
				BankName:          "Nagari",
				BankAccountNumber: "2100020109823",
				BankAccountHolder: "H. Syamsul Bahri",
				BankVerified:      false,
				ThemeConfig:       `{"theme_id":"fashion-03","theme_name":"Demo 03 - Luxury Artisan","product_layout":"Product Single 1"}`,
			},
			{
				Code:              "IND-M-107",
				Name:              "Sneakers Urban Jakarta",
				Subdomain:         "sneakers-urban",
				CustomDomain:      "sneakersurban.com",
				DomainVerified:    true,
				SSLStatus:         "active",
				SSLExpiresAt:      &sslDate,
				OwnerName:         "Kevin Sanjaya",
				OwnerEmail:        "kevin@sneakersurban.com",
				OwnerPhone:        "0819-2233-4455",
				City:              "Jakarta Barat",
				Address:           "Mall Taman Anggrek Lt. 1 No. 108",
				Category:          "Sepatu & Streetwear",
				Avatar:            "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=150&auto=format&fit=crop",
				Banner:            "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&auto=format&fit=crop",
				Status:            "active",
				Plan:              "Enterprise",
				MonthlyGMV:        215000000,
				TotalOrders:       890,
				ItemCount:         230,
				Rating:            4.9,
				ReviewCount:       512,
				KYCStatus:         "approved",
				KTPNumber:         "3173011208940007",
				NPWPNumber:        "01.234.567.8-034.000",
				NIBNumber:         "3108230089123",
				BankName:          "BCA",
				BankAccountNumber: "0288812901",
				BankAccountHolder: "Kevin Sanjaya",
				BankVerified:      true,
				ThemeConfig:       `{"theme_id":"fashion-01","theme_name":"Demo 01 - Fashion Store","product_layout":"Product Single 2"}`,
			},
			{
				Code:              "IND-M-108",
				Name:              "Furniture Jati Jepara",
				Subdomain:         "jati-jepara",
				OwnerName:         "Bambang Soeprapto",
				OwnerEmail:        "bambang@jatijepara.biz",
				OwnerPhone:        "0821-3456-7890",
				City:              "Jepara, Jawa Tengah",
				Address:           "Jl. Pemuda No. 71, Tahunan",
				Category:          "Perabot & Furnitur Kayu",
				Avatar:            "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=150&auto=format&fit=crop",
				Banner:            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop",
				Status:            "suspended",
				Plan:              "Starter",
				MonthlyGMV:        4500000,
				TotalOrders:       14,
				ItemCount:         32,
				Rating:            3.8,
				ReviewCount:       8,
				KYCStatus:         "rejected",
				KYCNotes:          "Foto identitas KTP buram dan NIB tidak terdaftar di OSS Kementerian Investasi.",
				KTPNumber:         "3320011803760008",
				BankName:          "Mandiri",
				BankAccountNumber: "1350081293812",
				BankAccountHolder: "Bambang Soeprapto",
				BankVerified:      false,
			},
		}

		for _, m := range merchants {
			if err := db.Create(&m).Error; err != nil {
				log.Printf("❌ Failed to seed merchant %s: %v\n", m.Name, err)
			}
		}
		log.Println("🌱 [SEEDER] 8 Indonesian demo merchants seeded successfully!")
	} else {
		log.Println("ℹ️  [SEEDER] Merchants already seeded.")
	}

	// 4. Seed Comprehensive Orders for Superadmin Dashboard Analytics if orderCount < 20
	var orderCount int64
	db.Model(&models.Order{}).Count(&orderCount)
	if orderCount < 20 {
		baseYear := 2026

		type seedOrderDef struct {
			OrderNum string
			Merchant uint
			Name     string
			Phone    string
			City     string
			Product  string
			Img      string
			Channel  string
			Payment  string
			Amount   float64
			Status   string
			Month    time.Month
			Day      int
			Hour     int
			Min      int
		}

		rawOrders := []seedOrderDef{
			// September 2026 (Recent Orders)
			{"IND-8842", 1, "Budi Santoso", "0812-8876-1290", "Jakarta Selatan", "Kemeja Batik Tulis Modern", "/assets/images/products/product-1(1).png", "Web Storefront", "QRIS", 349000, "Selesai", time.September, 9, 20, 45},
			{"IND-8841", 7, "Siti Rahmawati", "0857-4123-9988", "Surabaya", "Sepatu Sneaker Urban Vintage", "/assets/images/products/product-1(2).png", "WhatsApp Direct", "Virtual Account", 520000, "Diproses", time.September, 9, 20, 15},
			{"IND-8840", 3, "Aditya Pratama", "0813-9002-3341", "Bandung", "Tas Kulit Ransel Premium", "/assets/images/products/product-1(3).png", "Web Storefront", "Virtual Account", 680000, "Dikirim", time.September, 9, 19, 58},
			{"IND-8839", 2, "Dewi Lestari", "0878-3321-7765", "Yogyakarta", "Paket Kopi Robusta & Arabika", "/assets/images/products/product-1(4).png", "WhatsApp Direct", "E-Wallet", 175000, "Selesai", time.September, 9, 19, 30},
			{"IND-8838", 2, "Farhan Maulana", "0821-6654-2210", "Medan", "Smart Watch Series 9 AMOLED", "/assets/images/products/product-1(5).png", "Web Storefront", "COD", 899000, "Menunggu Konfirmasi", time.September, 9, 18, 45},
			{"IND-8837", 1, "Budi Santoso", "0812-8876-1290", "Jakarta Selatan", "Kain Sutra Tenun Asli", "/assets/images/products/product-1(6).png", "Multi-Channel", "QRIS", 1250000, "Selesai", time.September, 8, 20, 10},
			{"IND-8836", 7, "Hendro Wijaya", "0852-7711-3399", "Tangerang", "Sepatu Running Boost Pro", "/assets/images/products/product-1(2).png", "Web Storefront", "Virtual Account", 745000, "Dikirim", time.September, 8, 14, 20},
			{"IND-8835", 2, "Anisa Wijaya", "0818-0912-3344", "Jakarta Selatan", "Headphone ANC Wireless", "/assets/images/products/product-1(3).png", "Web Storefront", "QRIS", 1450000, "Selesai", time.September, 7, 21, 15},
			{"IND-8834", 1, "Siti Rahmawati", "0857-4123-9988", "Surabaya", "Selendang Sutra Madura", "/assets/images/products/product-1(1).png", "WhatsApp Direct", "Virtual Account", 420000, "Selesai", time.September, 6, 19, 40},
			{"IND-8833", 3, "Budi Santoso", "0812-8876-1290", "Jakarta Selatan", "Biji Kopi Arabika Gayo 1kg", "/assets/images/products/product-1(4).png", "Web Storefront", "QRIS", 280000, "Selesai", time.September, 5, 12, 30},

			// Agustus 2026
			{"IND-8720", 7, "Farhan Maulana", "0821-6654-2210", "Medan", "Sepatu Kulit Oxford Formal", "/assets/images/products/product-1(2).png", "Web Storefront", "Virtual Account", 950000, "Selesai", time.August, 28, 20, 15},
			{"IND-8719", 1, "Rina Anggraini", "0819-2234-5511", "Semarang", "Dress Batik Gamis Elegan", "/assets/images/products/product-1(6).png", "Multi-Channel", "QRIS", 560000, "Selesai", time.August, 22, 19, 50},
			{"IND-8718", 2, "Budi Santoso", "0812-8876-1290", "Jakarta Selatan", "Powerbank Wireless 20000mAh", "/assets/images/products/product-1(5).png", "Web Storefront", "QRIS", 450000, "Selesai", time.August, 18, 14, 10},
			{"IND-8717", 1, "Hendro Wijaya", "0852-7711-3399", "Tangerang", "Cold Brew Botol Eksklusif 500ml", "/assets/images/products/product-1(4).png", "WhatsApp Direct", "E-Wallet", 95000, "Selesai", time.August, 14, 10, 25},
			{"IND-8716", 7, "Aditya Pratama", "0813-9002-3341", "Bandung", "Sneakers Canvas Putih", "/assets/images/products/product-1(2).png", "Web Storefront", "Virtual Account", 380000, "Selesai", time.August, 10, 16, 40},

			// Juli 2026
			{"IND-8610", 1, "Siti Rahmawati", "0857-4123-9988", "Surabaya", "Sarung Tenun Goyor Halus", "/assets/images/products/product-1(1).png", "WhatsApp Direct", "Virtual Account", 390000, "Selesai", time.July, 25, 20, 30},
			{"IND-8609", 2, "Kevin Sanjaya", "0819-2233-4455", "Jakarta Barat", "Keyboard Mechanical RGB", "/assets/images/products/product-1(5).png", "Web Storefront", "QRIS", 1150000, "Selesai", time.July, 20, 21, 10},
			{"IND-8608", 3, "Farhan Maulana", "0821-6654-2210", "Medan", "Dompet Pria Kulit Asli", "/assets/images/products/product-1(3).png", "Web Storefront", "COD", 250000, "Selesai", time.July, 15, 13, 20},
			{"IND-8607", 3, "Dewi Lestari", "0878-3321-7765", "Yogyakarta", "Drip Bag Coffee Box (isi 10)", "/assets/images/products/product-1(4).png", "WhatsApp Direct", "QRIS", 125000, "Selesai", time.July, 8, 7, 45},

			// Juni 2026
			{"IND-8505", 1, "Rina Anggraini", "0819-2234-5511", "Semarang", "Blouse Batik Modern", "/assets/images/products/product-1(6).png", "Multi-Channel", "Virtual Account", 310000, "Selesai", time.June, 28, 19, 20},
			{"IND-8504", 7, "Budi Santoso", "0812-8876-1290", "Jakarta Selatan", "Kaos Kaki Sneaker Breathable", "/assets/images/products/product-1(2).png", "Web Storefront", "QRIS", 85000, "Selesai", time.June, 22, 11, 15},
			{"IND-8503", 2, "Aditya Pratama", "0813-9002-3341", "Bandung", "Mouse Gaming Wireless 2.4G", "/assets/images/products/product-1(5).png", "Web Storefront", "Virtual Account", 420000, "Selesai", time.June, 14, 15, 50},

			// Mei 2026
			{"IND-8404", 1, "Dewi Lestari", "0878-3321-7765", "Yogyakarta", "Batik Outer Casual", "/assets/images/products/product-1(1).png", "WhatsApp Direct", "QRIS", 275000, "Selesai", time.May, 24, 20, 40},
			{"IND-8403", 2, "Farhan Maulana", "0821-6654-2210", "Medan", "Kopi Luwak Liar Asli 250g", "/assets/images/products/product-1(4).png", "Web Storefront", "Virtual Account", 450000, "Selesai", time.May, 16, 12, 10},
			{"IND-8402", 7, "Hendro Wijaya", "0852-7711-3399", "Tangerang", "Tali Sepatu Reflektif", "/assets/images/products/product-1(2).png", "Web Storefront", "QRIS", 45000, "Selesai", time.May, 5, 9, 30},

			// April 2026
			{"IND-8303", 2, "Budi Santoso", "0812-8876-1290", "Jakarta Selatan", "Webcam 4K Ultra HD", "/assets/images/products/product-1(5).png", "Web Storefront", "QRIS", 890000, "Selesai", time.April, 21, 21, 05},
			{"IND-8302", 3, "Siti Rahmawati", "0857-4123-9988", "Surabaya", "Tas Selempang Wanita Kulit", "/assets/images/products/product-1(3).png", "WhatsApp Direct", "Virtual Account", 540000, "Selesai", time.April, 12, 17, 30},

			// Maret 2026
			{"IND-8203", 1, "Aditya Pratama", "0813-9002-3341", "Bandung", "Kain Batik Sutra Solo", "/assets/images/products/product-1(6).png", "Multi-Channel", "Virtual Account", 780000, "Selesai", time.March, 26, 18, 45},
			{"IND-8202", 2, "Rina Anggraini", "0819-2234-5511", "Semarang", "Kopi Peaberry Lanang", "/assets/images/products/product-1(4).png", "WhatsApp Direct", "QRIS", 195000, "Selesai", time.March, 10, 14, 00},

			// Februari 2026
			{"IND-8103", 7, "Kevin Sanjaya", "0819-2233-4455", "Jakarta Barat", "Sepatu Basket High Top", "/assets/images/products/product-1(2).png", "Web Storefront", "Virtual Account", 1250000, "Selesai", time.February, 20, 20, 15},
			{"IND-8102", 2, "Hendro Wijaya", "0852-7711-3399", "Tangerang", "USB-C Multiport Adapter Hub", "/assets/images/products/product-1(5).png", "Web Storefront", "QRIS", 320000, "Selesai", time.February, 8, 11, 40},

			// Januari 2026
			{"IND-8002", 1, "Budi Santoso", "0812-8876-1290", "Jakarta Selatan", "Kemeja Batik Lengan Pendek", "/assets/images/products/product-1(1).png", "Web Storefront", "QRIS", 280000, "Selesai", time.January, 25, 19, 10},
			{"IND-8001", 3, "Siti Rahmawati", "0857-4123-9988", "Surabaya", "Espresso Blend Nusantara 500g", "/assets/images/products/product-1(4).png", "WhatsApp Direct", "E-Wallet", 165000, "Selesai", time.January, 12, 10, 05},
		}

		for _, ord := range rawOrders {
			// Check if already exists by OrderNumber
			var existing models.Order
			if err := db.Where("order_number = ?", ord.OrderNum).First(&existing).Error; err != nil {
				createdAt := time.Date(baseYear, ord.Month, ord.Day, ord.Hour, ord.Min, 0, 0, time.Local)
				newOrder := models.Order{
					OrderNumber:   ord.OrderNum,
					MerchantID:    ord.Merchant,
					CustomerName:  ord.Name,
					CustomerPhone: ord.Phone,
					CustomerCity:  ord.City,
					ProductName:   ord.Product,
					ProductImage:  ord.Img,
					SalesChannel:  ord.Channel,
					PaymentMethod: ord.Payment,
					TotalAmount:   ord.Amount,
					Status:        ord.Status,
					CreatedAt:     createdAt,
				}
				if err := db.Create(&newOrder).Error; err != nil {
					log.Printf("❌ Failed to seed order %s: %v\n", ord.OrderNum, err)
				}
			}
		}
		log.Println("🌱 [SEEDER] Comprehensive order analytics dataset seeded successfully!")
	} else {
		log.Println("ℹ️  [SEEDER] Orders already seeded.")
	}

	// 5. Seed Escrow Subsystem (Disbursements, Config, Channels, Credentials, Journals)
	if err := seedEscrowSystem(db); err != nil {
		log.Printf("⚠️ Warning: seedEscrowSystem error: %v\n", err)
	}

	return nil
}

func seedEscrowSystem(db *gorm.DB) error {
	// A. Seed Payout Config
	var configCount int64
	db.Model(&models.PayoutGlobalConfigEntity{}).Count(&configCount)
	if configCount == 0 {
		defaultCfg := models.PayoutGlobalConfigEntity{
			DefaultSchedule:       "DAILY_T1",
			MinWithdrawal:         50000,
			BankTransferFee:       2500,
			AutoDisbursementLimit: 10000000,
			ManualApprovalRole:    "ROLE_FINANCE_LEAD",
			CutOffTime:            "13:00 WIB",
		}
		db.Create(&defaultCfg)
		log.Println("🌱 [SEEDER] Escrow payout global config seeded.")
	}

	// B. Seed Payment Channels
	var channelCount int64
	db.Model(&models.PaymentChannelEntity{}).Count(&channelCount)
	if channelCount == 0 {
		channels := []models.PaymentChannelEntity{
			{ID: "qris_gopay", Category: "QRIS Instant", Name: "GoPay QRIS", Code: "GOPAY", Provider: "Midtrans Snap & Core API", Type: "E-Wallet", Icon: "solar:qr-code-bold-duotone", MdrRate: "0.70%", SettlementCycle: "T+0 (Instant)", Status: "ACTIVE", LatencyMs: 165, FailureRate24h: 0.18, DailyVolume: 64200000, TransactionCount: 428, BadgeColor: "success"},
			{ID: "qris_ovo", Category: "QRIS Instant", Name: "OVO QRIS", Code: "OVO", Provider: "Xendit XenPlatform", Type: "E-Wallet", Icon: "solar:qr-code-bold-duotone", MdrRate: "0.70%", SettlementCycle: "T+0 (Instant)", Status: "ACTIVE", LatencyMs: 182, FailureRate24h: 0.24, DailyVolume: 41800000, TransactionCount: 312, BadgeColor: "success"},
			{ID: "qris_dana", Category: "QRIS Instant", Name: "DANA QRIS", Code: "DANA", Provider: "Midtrans Snap", Type: "E-Wallet", Icon: "solar:qr-code-bold-duotone", MdrRate: "0.70%", SettlementCycle: "T+0 (Instant)", Status: "ACTIVE", LatencyMs: 174, FailureRate24h: 0.21, DailyVolume: 38500000, TransactionCount: 285, BadgeColor: "success"},
			{ID: "qris_shopeepay", Category: "QRIS Instant", Name: "ShopeePay QRIS", Code: "SHOPEEPAY", Provider: "Midtrans Snap", Type: "E-Wallet", Icon: "solar:qr-code-bold-duotone", MdrRate: "0.70%", SettlementCycle: "T+0 (Instant)", Status: "ACTIVE", LatencyMs: 190, FailureRate24h: 0.29, DailyVolume: 51200000, TransactionCount: 390, BadgeColor: "success"},
			{ID: "bca_va", Category: "Virtual Account", Name: "BCA Virtual Account", Code: "BCA_VA", Provider: "Midtrans Core API", Type: "Bank Transfer", Icon: "solar:card-bold-duotone", MdrRate: "Rp 3.500", SettlementCycle: "T+1", Status: "ACTIVE", LatencyMs: 142, FailureRate24h: 0.11, DailyVolume: 182400000, TransactionCount: 840, BadgeColor: "primary"},
			{ID: "mandiri_va", Category: "Virtual Account", Name: "Mandiri Livin VA", Code: "MANDIRI_VA", Provider: "Midtrans Core API", Type: "Bank Transfer", Icon: "solar:card-bold-duotone", MdrRate: "Rp 3.500", SettlementCycle: "T+1", Status: "ACTIVE", LatencyMs: 155, FailureRate24h: 0.15, DailyVolume: 145000000, TransactionCount: 620, BankMaintenance: "12 Sep 2026 pukul 01:00 - 04:30 WIB (Core Banking)", BadgeColor: "primary"},
			{ID: "bri_va", Category: "Virtual Account", Name: "BRI BRIVA", Code: "BRI_VA", Provider: "Xendit XenPlatform", Type: "Bank Transfer", Icon: "solar:card-bold-duotone", MdrRate: "Rp 3.000", SettlementCycle: "T+1", Status: "ACTIVE", LatencyMs: 168, FailureRate24h: 0.22, DailyVolume: 120500000, TransactionCount: 510, BadgeColor: "primary"},
			{ID: "bni_va", Category: "Virtual Account", Name: "BNI Virtual Account", Code: "BNI_VA", Provider: "Midtrans Snap", Type: "Bank Transfer", Icon: "solar:card-bold-duotone", MdrRate: "Rp 3.500", SettlementCycle: "T+1", Status: "ACTIVE", LatencyMs: 160, FailureRate24h: 0.19, DailyVolume: 98400000, TransactionCount: 440, BadgeColor: "primary"},
			{ID: "permata_va", Category: "Virtual Account", Name: "Permata VA", Code: "PERMATA_VA", Provider: "Xendit XenPlatform", Type: "Bank Transfer", Icon: "solar:card-bold-duotone", MdrRate: "Rp 3.000", SettlementCycle: "T+1", Status: "ACTIVE", LatencyMs: 175, FailureRate24h: 0.31, DailyVolume: 32100000, TransactionCount: 140, BadgeColor: "primary"},
			{ID: "bsi_va", Category: "Virtual Account", Name: "BSI Hasanah VA", Code: "BSI_VA", Provider: "Xendit XenPlatform", Type: "Bank Transfer", Icon: "solar:card-bold-duotone", MdrRate: "Rp 3.000", SettlementCycle: "T+1", Status: "ACTIVE", LatencyMs: 188, FailureRate24h: 0.28, DailyVolume: 44500000, TransactionCount: 195, BadgeColor: "primary"},
			{ID: "alfamart", Category: "Retail Outlet (OTC)", Name: "Alfamart Gerai OTC", Code: "ALFAMART", Provider: "Midtrans Snap", Type: "Over-the-Counter", Icon: "solar:shop-2-bold-duotone", MdrRate: "Rp 5.000", SettlementCycle: "T+2", Status: "ACTIVE", LatencyMs: 245, FailureRate24h: 0.45, DailyVolume: 28900000, TransactionCount: 95, BadgeColor: "warning"},
			{ID: "indomaret", Category: "Retail Outlet (OTC)", Name: "Indomaret Gerai OTC", Code: "INDOMARET", Provider: "Midtrans Snap", Type: "Over-the-Counter", Icon: "solar:shop-2-bold-duotone", MdrRate: "Rp 5.000", SettlementCycle: "T+2", Status: "ACTIVE", LatencyMs: 260, FailureRate24h: 0.52, DailyVolume: 31400000, TransactionCount: 110, BadgeColor: "warning"},
			{ID: "cc_visa", Category: "Kartu Kredit / Debit", Name: "Visa 3D-Secure", Code: "VISA", Provider: "Midtrans Core API", Type: "Credit Card", Icon: "solar:card-2-bold-duotone", MdrRate: "2.80% + Rp 2.000", SettlementCycle: "T+3", Status: "ACTIVE", LatencyMs: 310, FailureRate24h: 0.62, DailyVolume: 115000000, TransactionCount: 180, BadgeColor: "info"},
			{ID: "cc_mastercard", Category: "Kartu Kredit / Debit", Name: "Mastercard Identity Check", Code: "MASTERCARD", Provider: "Midtrans Core API", Type: "Credit Card", Icon: "solar:card-2-bold-duotone", MdrRate: "2.80% + Rp 2.000", SettlementCycle: "T+3", Status: "ACTIVE", LatencyMs: 325, FailureRate24h: 0.58, DailyVolume: 98000000, TransactionCount: 155, BadgeColor: "info"},
		}
		for _, ch := range channels {
			db.Create(&ch)
		}
		log.Println("🌱 [SEEDER] 14 National Payment Channels seeded in PostgreSQL.")
	}

	// C. Seed Gateway Credentials
	var credCount int64
	db.Model(&models.GatewayCredentialEntity{}).Count(&credCount)
	if credCount == 0 {
		defaultCreds := models.GatewayCredentialEntity{
			MidtransMerchantID: "M-IND-778891",
			MidtransServerKey:  "Mid-server-PRD-8829104829184729",
			MidtransClientKey:  "Mid-client-PRD-0019284728",
			MidtransSnapURL:    "https://app.midtrans.com/snap/snap.js",
			MidtransWebhookURL: "https://api.indovia.id/api/v1/payment/webhook/midtrans",
			XenditSecretKey:    "xnd_production_89102837492819482910",
			XenditPublicKey:    "xnd_public_881920384729",
			XenditWebhookToken: "xnd_wh_tok_9918273645",
			XenditWebhookURL:   "https://api.indovia.id/api/v1/payment/webhook/xendit",
			Environment:        "production",
		}
		db.Create(&defaultCreds)
		log.Println("🌱 [SEEDER] Gateway API credentials seeded in PostgreSQL.")
	}

	// D. Seed Disbursements
	var disbCount int64
	db.Model(&models.Disbursement{}).Count(&disbCount)
	if disbCount == 0 {
		nowStr := time.Now().Format("02 Jan 2006, 15:04 WIB")
		yesterdayStr := time.Now().Add(-24 * time.Hour).Format("02 Jan 2006, 16:30 WIB")

		disbursements := []models.Disbursement{
			{
				PayoutID:           "PO-20260909-001",
				MerchantID:         1,
				DestinationBank:    "BCA",
				DestinationAccount: "0158829910",
				DestinationHolder:  "Budi Hendrawan",
				RequestedAmount:    12500000,
				BankFee:            2500,
				NetTransferAmount:  12497500,
				ApprovalType:       "MANUAL_2FA_REQUIRED",
				ApprovalRole:       "ROLE_FINANCE_LEAD",
				Status:             "PENDING_APPROVAL_FINANCE",
				GatewayReference:   "-",
				RequestTimestamp:   nowStr,
			},
			{
				PayoutID:           "PO-20260909-002",
				MerchantID:         2,
				DestinationBank:    "Mandiri",
				DestinationAccount: "1310098234120",
				DestinationHolder:  "Deni Pratama",
				RequestedAmount:    3430000,
				BankFee:            2500,
				NetTransferAmount:  3427500,
				ApprovalType:       "AUTO_DISBURSE",
				ApprovalRole:       "SYSTEM_API",
				Status:             "AUTO_PROCESSED",
				GatewayReference:   "DISB-XND-9921048",
				RequestTimestamp:   nowStr,
			},
			{
				PayoutID:           "PO-20260909-003",
				MerchantID:         7,
				DestinationBank:    "BCA",
				DestinationAccount: "0288812901",
				DestinationHolder:  "Kevin Sanjaya",
				RequestedAmount:    2710000,
				BankFee:            2500,
				NetTransferAmount:  2707500,
				ApprovalType:       "AUTO_DISBURSE",
				ApprovalRole:       "SYSTEM_API",
				Status:             "AUTO_PROCESSED",
				GatewayReference:   "DISB-MTR-8812044",
				RequestTimestamp:   nowStr,
			},
			{
				PayoutID:           "PO-20260909-004",
				MerchantID:         3,
				DestinationBank:    "BSI",
				DestinationAccount: "7128892301",
				DestinationHolder:  "Teuku Rizal",
				RequestedAmount:    15800000,
				BankFee:            2500,
				NetTransferAmount:  15797500,
				ApprovalType:       "MANUAL_2FA_REQUIRED",
				ApprovalRole:       "ROLE_FINANCE_LEAD",
				Status:             "PENDING_APPROVAL_FINANCE",
				GatewayReference:   "-",
				RequestTimestamp:   nowStr,
			},
			{
				PayoutID:           "PO-20260909-005",
				MerchantID:         10,
				DestinationBank:    "BCA",
				DestinationAccount: "5410112207",
				DestinationHolder:  "Ahmad Fauzi",
				RequestedAmount:    18250000,
				BankFee:            2500,
				NetTransferAmount:  18247500,
				ApprovalType:       "MANUAL_2FA_REQUIRED",
				ApprovalRole:       "ROLE_FINANCE_LEAD",
				Status:             "APPROVED_BY_FINANCE",
				GatewayReference:   "DISB-XND-7718291",
				RequestTimestamp:   yesterdayStr,
				ApprovedBy:         "Budi Prakoso (ROLE_FINANCE_LEAD)",
				ApprovedTimestamp:  nowStr,
				ApprovalNote:       "Otorisasi 2FA diverifikasi via Google Authenticator TOTP.",
			},
		}

		for _, d := range disbursements {
			db.Create(&d)
		}
		log.Println("🌱 [SEEDER] Initial Payout Disbursements seeded in PostgreSQL.")
	}

	// E. Seed Escrow Journals
	var jrnCount int64
	db.Model(&models.EscrowJournal{}).Count(&jrnCount)
	if jrnCount == 0 {
		now := time.Now().Format("2006-01-02 15:04:05")
		journals := []models.EscrowJournal{
			{
				JournalID:     "JRN-20260909-001",
				Timestamp:     now,
				MerchantName:  "Batik Nusantara Official",
				RefID:         "INV-20260909-0012",
				AccountDebit:  "1010 - Kas Rekening Escrow BCA (Pool)",
				AccountCredit: "2100 - Kewajiban Escrow Merchant (Ditangguhkan)",
				Amount:        2450000,
				Type:          "ESCROW_INFLOW",
				Memo:          "Penerimaan dana pesanan pembeli via BCA Virtual Account",
			},
			{
				JournalID:     "JRN-20260909-002",
				Timestamp:     now,
				MerchantName:  "Batik Nusantara Official",
				RefID:         "FEE-20260909-0012",
				AccountDebit:  "2100 - Kewajiban Escrow Merchant",
				AccountCredit: "4010 - Pendapatan Layanan Platform Indovia",
				Amount:        73500,
				Type:          "PLATFORM_REVENUE",
				Memo:          "Pemotongan take-rate platform 3% atas transaksi selesai",
			},
			{
				JournalID:     "JRN-20260909-003",
				Timestamp:     now,
				MerchantName:  "Bandung Gadget Hub",
				RefID:         "DSP-TK-9021",
				AccountDebit:  "2100 - Kewajiban Escrow Merchant (Tersedia)",
				AccountCredit: "2150 - Dana Tertahan Sengketa (Dispute Hold)",
				Amount:        1250000,
				Type:          "DISPUTE_HOLD",
				Memo:          "Pembekuan saldo akibat klaim barang rusak oleh pembeli tiket #DSP-TK-9021",
			},
			{
				JournalID:     "JRN-20260909-004",
				Timestamp:     now,
				MerchantName:  "Batik Nusantara Official",
				RefID:         "PAY-20260909-8831",
				AccountDebit:  "2100 - Kewajiban Escrow Merchant",
				AccountCredit: "1010 - Kas Rekening Escrow BCA (Pool)",
				Amount:        5120000,
				Type:          "DISBURSEMENT_PAYOUT",
				Memo:          "Disbursement batch harian T+1 otomatis via BCA API Transfer",
			},
			{
				JournalID:     "JRN-20260909-005",
				Timestamp:     now,
				MerchantName:  "Sneakers Urban Jakarta",
				RefID:         "INV-20260909-0044",
				AccountDebit:  "1020 - Kas Rekening Escrow Mandiri (Pool)",
				AccountCredit: "2100 - Kewajiban Escrow Merchant (Ditangguhkan)",
				Amount:        1899000,
				Type:          "ESCROW_INFLOW",
				Memo:          "Penerimaan dana pesanan pembeli via Mandiri Livin VA",
			},
		}
		for _, j := range journals {
			db.Create(&j)
		}
		log.Println("🌱 [SEEDER] Escrow Double-Entry Accounting Journals seeded in PostgreSQL.")
	}

	return nil
}
