package models

import (
	"time"

	"gorm.io/gorm"
)

// Merchant represents an e-commerce tenant / store in Indovia SaaS Platform
type Merchant struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	// Tenant Identification
	Code         string `gorm:"size:32;uniqueIndex;not null" json:"code"`               // e.g. "IND-M-101"
	Name         string `gorm:"size:150;not null" json:"name"`                          // e.g. "Batik Nusantara Official"
	Subdomain    string `gorm:"size:63;uniqueIndex;not null" json:"subdomain"`          // e.g. "batik-nusantara" -> batik-nusantara.indovia.com
	CustomDomain string `gorm:"size:255;index" json:"custom_domain"`              // e.g. "batiknusantara.co.id"
	DomainVerified bool `gorm:"default:false" json:"domain_verified"`
	SSLStatus    string `gorm:"size:30;default:'unconfigured'" json:"ssl_status"`       // active, pending, expiring_soon, unconfigured
	SSLExpiresAt *time.Time `json:"ssl_expires_at"`

	// Owner & Store Profile
	OwnerName  string `gorm:"size:120;not null" json:"owner_name"`
	OwnerEmail string `gorm:"size:150;uniqueIndex;not null" json:"owner_email"`
	OwnerPhone string `gorm:"size:30;not null" json:"owner_phone"`
	City       string `gorm:"size:100;default:'Jakarta'" json:"city"`
	Address    string `gorm:"type:text" json:"address"`
	Category   string `gorm:"size:80;default:'Fashion'" json:"category"`
	Avatar     string `gorm:"size:255" json:"avatar"`
	Banner     string `gorm:"size:255" json:"banner"`

	// Lifecycle & SaaS Subscription
	Status      string     `gorm:"size:30;default:'trial'" json:"status"`               // trial, active, past_due, suspended, archived
	TrialEndsAt *time.Time `json:"trial_ends_at"`
	Plan        string     `gorm:"size:50;default:'Starter'" json:"plan"`               // Starter, Pro, Enterprise
	MonthlyGMV  float64    `gorm:"default:0" json:"monthly_gmv"`                        // GMV in Rupiah
	TotalOrders int        `gorm:"default:0" json:"total_orders"`
	ItemCount   int        `gorm:"default:0" json:"item_count"`
	Rating      float64    `gorm:"default:5.0" json:"rating"`
	ReviewCount int        `gorm:"default:0" json:"review_count"`

	// KYC (Know Your Customer) & Legal Compliance
	KYCStatus         string `gorm:"size:30;default:'unverified'" json:"kyc_status"`    // unverified, pending, approved, rejected
	KYCNotes          string `gorm:"type:text" json:"kyc_notes"`
	KTPNumber         string `gorm:"size:30" json:"ktp_number"`
	KTPImage          string `gorm:"size:255" json:"ktp_image"`
	NPWPNumber        string `gorm:"size:40" json:"npwp_number"`
	NIBNumber         string `gorm:"size:40" json:"nib_number"`
	BankName          string `gorm:"size:50" json:"bank_name"`                          // BCA, Mandiri, BRI, BNI
	BankAccountNumber string `gorm:"size:50" json:"bank_account_number"`
	BankAccountHolder string `gorm:"size:120" json:"bank_account_holder"`
	BankVerified      bool   `gorm:"default:false" json:"bank_verified"`

	// Theme & Layout Configuration (JSONB / text)
	ThemeConfig string `gorm:"type:text" json:"theme_config"`
}

// AuditLog records security & operational actions by Superadmin (WORM pattern)
type AuditLog struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	CreatedAt       time.Time `json:"created_at"`
	ActorID         uint      `json:"actor_id"`
	ActorName       string    `gorm:"size:100" json:"actor_name"`
	ActorRole       string    `gorm:"size:50" json:"actor_role"`
	Action          string    `gorm:"size:100;not null" json:"action"`                  // e.g. "STATUS_CHANGE", "KYC_APPROVE", "IMPERSONATION"
	TargetEntity    string    `gorm:"size:50;not null" json:"target_entity"`            // "merchants"
	TargetID        string    `gorm:"size:50;not null" json:"target_id"`
	Details         string    `gorm:"type:text" json:"details"`
	IPAddress       string    `gorm:"size:50" json:"ip_address"`
	IsImpersonation bool      `gorm:"default:false" json:"is_impersonation"`
}
