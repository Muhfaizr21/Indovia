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
	err := db.AutoMigrate(&models.User{}, &models.Merchant{}, &models.AuditLog{})
	if err != nil {
		log.Printf("❌ Failed to auto-migrate database: %v\n", err)
		return err
	}
	log.Println("✅ Database schema migrated successfully (User, Merchant, AuditLog)!")

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

	return nil
}
