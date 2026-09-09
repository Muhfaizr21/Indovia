package models

import (
	"time"

	"gorm.io/gorm"
)

// Order represents an e-commerce order transaction within the Indovia SaaS platform
type Order struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	// Order Identification
	OrderNumber string   `gorm:"size:64;uniqueIndex;not null" json:"order_number"` // e.g. "IND-8842"
	MerchantID  uint     `gorm:"index;not null" json:"merchant_id"`
	Merchant    Merchant `gorm:"foreignKey:MerchantID" json:"merchant,omitempty"`

	// Customer Info
	CustomerName  string `gorm:"size:120;not null" json:"customer_name"`
	CustomerPhone string `gorm:"size:30" json:"customer_phone"`
	CustomerCity  string `gorm:"size:100;default:'Jakarta'" json:"customer_city"`

	// Product & Transaction Details
	ProductName   string  `gorm:"size:200;not null" json:"product_name"`
	ProductImage  string  `gorm:"size:255" json:"product_image"`
	SalesChannel  string  `gorm:"size:50;default:'Web Storefront'" json:"sales_channel"` // Web Storefront, WhatsApp Direct, Multi-Channel
	PaymentMethod string  `gorm:"size:50;default:'QRIS'" json:"payment_method"`           // QRIS, Virtual Account, E-Wallet, COD
	PaymentStatus string  `gorm:"size:50;default:'Lunas'" json:"payment_status"`          // Lunas, Menunggu Pembayaran, Pengembalian
	TotalAmount   float64 `gorm:"not null" json:"total_amount"`                          // in Rupiah

	// Fulfillment & Lifecycle Status
	Status         string `gorm:"size:40;default:'Diproses'" json:"status"`           // Selesai, Diproses, Dikirim, Menunggu Konfirmasi, Dibatalkan
	TrackingNumber string `gorm:"size:100;default:'-'" json:"tracking_number"`       // Resi Pengiriman e.g. "JNE-881290"
}
