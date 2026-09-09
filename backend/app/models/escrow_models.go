package models

import (
	"time"

	"gorm.io/gorm"
)

// Disbursement represents a payout request from a merchant in the database
type Disbursement struct {
	ID                 uint           `gorm:"primaryKey" json:"id"`
	CreatedAt          time.Time      `json:"created_at"`
	UpdatedAt          time.Time      `json:"updated_at"`
	DeletedAt          gorm.DeletedAt `gorm:"index" json:"-"`

	PayoutID           string         `gorm:"size:64;uniqueIndex;not null" json:"payout_id"`
	MerchantID         uint           `gorm:"index;not null" json:"merchant_id"`
	Merchant           Merchant       `gorm:"foreignKey:MerchantID" json:"merchant,omitempty"`
	DestinationBank    string         `gorm:"size:50;not null" json:"destination_bank"`
	DestinationAccount string         `gorm:"size:50;not null" json:"destination_account"`
	DestinationHolder  string         `gorm:"size:120;not null" json:"destination_holder"`
	RequestedAmount    float64        `gorm:"not null" json:"requested_amount"`
	BankFee            float64        `gorm:"default:2500" json:"bank_fee"`
	NetTransferAmount  float64        `gorm:"not null" json:"net_transfer_amount"`
	ApprovalType       string         `gorm:"size:40;not null" json:"approval_type"` // AUTO_DISBURSE, MANUAL_2FA_REQUIRED
	ApprovalRole       string         `gorm:"size:50;not null" json:"approval_role"` // ROLE_FINANCE_LEAD, SYSTEM_API
	Status             string         `gorm:"size:50;not null" json:"status"`        // PENDING_APPROVAL_FINANCE, AUTO_PROCESSED, APPROVED_BY_FINANCE, REJECTED_AUDIT_HOLD
	GatewayReference   string         `gorm:"size:100;default:'-'" json:"gateway_reference"`
	RequestTimestamp   string         `gorm:"size:80" json:"request_timestamp"`
	ApprovedBy         string         `gorm:"size:120" json:"approved_by,omitempty"`
	ApprovedTimestamp  string         `gorm:"size:80" json:"approved_timestamp,omitempty"`
	ApprovalNote       string         `gorm:"type:text" json:"approval_note,omitempty"`
	RejectReason       string         `gorm:"type:text" json:"reject_reason,omitempty"`
}

// PayoutGlobalConfigEntity represents persistent global payout settings in the database
type PayoutGlobalConfigEntity struct {
	ID                    uint      `gorm:"primaryKey" json:"id"`
	CreatedAt             time.Time `json:"created_at"`
	UpdatedAt             time.Time `json:"updated_at"`
	DefaultSchedule       string    `gorm:"size:50;default:'DAILY_T1'" json:"default_schedule"`
	MinWithdrawal         float64   `gorm:"default:50000" json:"min_withdrawal"`
	BankTransferFee       float64   `gorm:"default:2500" json:"bank_transfer_fee"`
	AutoDisbursementLimit float64   `gorm:"default:10000000" json:"auto_disbursement_limit"`
	ManualApprovalRole    string    `gorm:"size:50;default:'ROLE_FINANCE_LEAD'" json:"manual_approval_role"`
	CutOffTime            string    `gorm:"size:50;default:'13:00 WIB'" json:"cut_off_time"`
}

// EscrowJournal represents persistent double-entry accounting records in the database
type EscrowJournal struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	CreatedAt     time.Time `json:"created_at"`
	JournalID     string    `gorm:"size:64;uniqueIndex;not null" json:"journal_id"`
	Timestamp     string    `gorm:"size:50" json:"timestamp"`
	MerchantName  string    `gorm:"size:150" json:"merchant_name"`
	RefID         string    `gorm:"size:100" json:"ref_id"`
	AccountDebit  string    `gorm:"size:120;not null" json:"account_debit"`
	AccountCredit string    `gorm:"size:120;not null" json:"account_credit"`
	Amount        float64   `gorm:"not null" json:"amount"`
	Type          string    `gorm:"size:50;not null" json:"type"`
	Memo          string    `gorm:"type:text" json:"memo"`
}

// PaymentChannelEntity represents persistent payment gateway channel status in the database
type PaymentChannelEntity struct {
	ID               string    `gorm:"primaryKey;size:64" json:"id"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
	Category         string    `gorm:"size:64" json:"category"`
	Name             string    `gorm:"size:120" json:"name"`
	Code             string    `gorm:"size:50" json:"code"`
	Provider         string    `gorm:"size:100" json:"provider"`
	Type             string    `gorm:"size:50" json:"type"`
	Icon             string    `gorm:"size:100" json:"icon"`
	MdrRate          string    `gorm:"size:30" json:"mdr_rate"`
	SettlementCycle  string    `gorm:"size:50" json:"settlement_cycle"`
	Status           string    `gorm:"size:30;default:'ACTIVE'" json:"status"` // ACTIVE, PAUSED
	LatencyMs        int       `gorm:"default:170" json:"latency_ms"`
	FailureRate24h   float64   `gorm:"default:0.2" json:"failure_rate_24h"`
	DailyVolume      float64   `gorm:"default:0" json:"daily_volume"`
	TransactionCount int       `gorm:"default:0" json:"transaction_count"`
	BankMaintenance  string    `gorm:"size:255" json:"bank_maintenance"`
	BadgeColor       string    `gorm:"size:30;default:'success'" json:"badge_color"`
}

// GatewayCredentialEntity represents persistent API credentials in the database
type GatewayCredentialEntity struct {
	ID                 uint      `gorm:"primaryKey" json:"id"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
	MidtransMerchantID string    `gorm:"size:100" json:"midtrans_merchant_id"`
	MidtransServerKey  string    `gorm:"size:255" json:"midtrans_server_key"`
	MidtransClientKey  string    `gorm:"size:255" json:"midtrans_client_key"`
	MidtransSnapURL    string    `gorm:"size:255" json:"midtrans_snap_url"`
	MidtransWebhookURL string    `gorm:"size:255" json:"midtrans_webhook_url"`
	XenditSecretKey    string    `gorm:"size:255" json:"xendit_secret_key"`
	XenditPublicKey    string    `gorm:"size:255" json:"xendit_public_key"`
	XenditWebhookToken string    `gorm:"size:255" json:"xendit_webhook_token"`
	XenditWebhookURL   string    `gorm:"size:255" json:"xendit_webhook_url"`
	Environment        string    `gorm:"size:50;default:'production'" json:"environment"`
}
