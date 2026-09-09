package models

// EscrowKpiSummaryDTO represents the cockpit financial summary metrics
type EscrowKpiSummaryDTO struct {
	TotalEscrowBalance     float64 `json:"total_escrow_balance"`
	FormattedTotalEscrow   string  `json:"formatted_total_escrow"`
	AvailableBalance       float64 `json:"available_balance"`
	FormattedAvailable     string  `json:"formatted_available"`
	PendingBalance         float64 `json:"pending_balance"`
	FormattedPending       string  `json:"formatted_pending"`
	LockedBalance          float64 `json:"locked_balance"`
	FormattedLocked        string  `json:"formatted_locked"`
	PlatformFeeAccumulated float64 `json:"platform_fee_accumulated"`
	FormattedPlatformFee   string  `json:"formatted_platform_fee"`
	TodayInflow            float64 `json:"today_inflow"`
	FormattedTodayInflow   string  `json:"formatted_today_inflow"`
	TodayDisbursed         float64 `json:"today_disbursed"`
	FormattedTodayDisbursed string `json:"formatted_today_disbursed"`
	DisbursementQueueCount int64   `json:"disbursement_queue_count"`
	PendingApprovalCount   int64   `json:"pending_approval_count"`
}

// GatewayHealthDTO represents operational status and SLA for central payment gateway
type GatewayHealthDTO struct {
	BcaStatus          string `json:"bca_status"`
	MandiriStatus      string `json:"mandiri_status"`
	AverageLatencyMs   int    `json:"average_latency_ms"`
	OverallFailureRate string `json:"overall_failure_rate"`
	PrimaryProvider    string `json:"primary_provider"`
	PayoutProvider     string `json:"payout_provider"`
}

// EscrowOverviewResponseDTO bundles KPI summary and gateway health metrics
type EscrowOverviewResponseDTO struct {
	Kpi    EscrowKpiSummaryDTO `json:"kpi"`
	Health GatewayHealthDTO    `json:"health"`
}

// EscrowFlowChartDTO represents 7-day time series for inflow/outflow/reserve charts
type EscrowFlowChartDTO struct {
	Days                 []string  `json:"days"`
	InflowFromPG         []float64 `json:"inflow_from_pg"`
	DisbursedToMerchant  []float64 `json:"disbursed_to_merchant"`
	EscrowReserveBalance []float64 `json:"escrow_reserve_balance"`
}

// SplitPaymentLogDTO represents a granular split-payment log node
type SplitPaymentLogDTO struct {
	ID                   string  `json:"id"`
	OrderID              string  `json:"order_id"`
	MerchantName         string  `json:"merchant_name"`
	CustomerName         string  `json:"customer_name"`
	Channel              string  `json:"channel"`
	GrossBuyerPayment    float64 `json:"gross_buyer_payment"`
	FormattedGross       string  `json:"formatted_gross"`
	GatewayMdrFee        float64 `json:"gateway_mdr_fee"`
	FormattedMdr         string  `json:"formatted_mdr"`
	IndoviaPlatformFee   float64 `json:"indovia_platform_fee"`
	FormattedPlatformFee string  `json:"formatted_platform_fee"`
	NetMerchantWallet    float64 `json:"net_merchant_wallet"`
	FormattedNet         string  `json:"formatted_net"`
	EscrowStatus         string  `json:"escrow_status"` // PENDING_TRANSIT, DELIVERED_CONFIRMED, LOCKED_DISPUTE
	ExpeditionInfo       string  `json:"expedition_info"`
	Timestamp            string  `json:"timestamp"`
	AutoReleaseEstimate  string  `json:"auto_release_estimate"`
}

// ReconcileResponseDTO represents the audit result of an automatic bank-ledger reconciliation
type ReconcileResponseDTO struct {
	ReconciledOrdersCount     int64   `json:"reconciled_orders_count"`
	ReconciledAmount          float64 `json:"reconciled_amount"`
	FormattedReconciledAmount string  `json:"formatted_reconciled_amount"`
	DiscrepancyCount          int     `json:"discrepancy_count"`
	Status                    string  `json:"status"`
	Message                   string  `json:"message"`
	Timestamp                 string  `json:"timestamp"`
}

// PaymentChannelDTO represents a national payment channel in the Master Gateway Hub
type PaymentChannelDTO struct {
	ID               string  `json:"id"`
	Category         string  `json:"category"` // "QRIS Instant", "Virtual Account", "Retail Outlet", "Kartu Kredit / Debit"
	Name             string  `json:"name"`
	Code             string  `json:"code"`
	Provider         string  `json:"provider"`
	Type             string  `json:"type"`
	Icon             string  `json:"icon"`
	Status           string  `json:"status"` // "ACTIVE", "PAUSED"
	MdrRate          string  `json:"mdr_rate"`
	SettlementCycle  string  `json:"settlement_cycle"`
	LatencyMs        int     `json:"latency_ms"`
	FailureRate24h   float64 `json:"failure_rate_24h"`
	DailyVolume      float64 `json:"daily_volume"`
	FormattedVolume  string  `json:"formatted_volume"`
	TransactionCount int     `json:"transaction_count"`
	BankMaintenance  string  `json:"bank_maintenance,omitempty"`
	BadgeColor       string  `json:"badge_color"`
}

// GatewayHubOverviewDTO represents the complete response for the Gateway Hub dashboard
type GatewayHubOverviewDTO struct {
	Channels         []PaymentChannelDTO `json:"channels"`
	AverageLatencyMs int                 `json:"average_latency_ms"`
	SystemUptime     string              `json:"system_uptime"`
	FailureRate24h   string              `json:"failure_rate_24h"`
	Total24hVolume   float64             `json:"total_24h_volume"`
	FormattedVolume  string              `json:"formatted_volume"`
	Total24hOrders   int64               `json:"total_24h_orders"`
	ActiveChannels   int                 `json:"active_channels"`
	TotalChannels    int                 `json:"total_channels"`
}

// PingResultDTO represents the synthetic heartbeat ping response
type PingResultDTO struct {
	ChannelID string `json:"channel_id"`
	Status    string `json:"status"`
	LatencyMs int    `json:"latency_ms"`
	Timestamp string `json:"timestamp"`
	Message   string `json:"message"`
}

// GatewayCredentialsDTO represents the credentials vault for Midtrans and Xendit
type GatewayCredentialsDTO struct {
	MidtransMerchantID   string `json:"midtrans_merchant_id"`
	MidtransServerKey    string `json:"midtrans_server_key"`
	MidtransClientKey    string `json:"midtrans_client_key"`
	MidtransSnapURL      string `json:"midtrans_snap_url"`
	MidtransWebhookURL   string `json:"midtrans_webhook_url"`
	MidtransEnvironment  string `json:"midtrans_environment"`
	XenditSecretKey      string `json:"xendit_secret_key"`
	XenditPublicKey      string `json:"xendit_public_key"`
	XenditWebhookToken   string `json:"xendit_webhook_token"`
	XenditWebhookURL     string `json:"xendit_webhook_url"`
	Environment          string `json:"environment"`
	PrimaryGateway       string `json:"primary_gateway"`
	AutoFallbackToBackup bool   `json:"auto_fallback_to_backup"`
}

// MerchantLedgerBankAccountDTO represents the bank account details of a merchant
type MerchantLedgerBankAccountDTO struct {
	BankName      string `json:"bank_name"`
	AccountNumber string `json:"account_number"`
	AccountHolder string `json:"account_holder"`
	IsVerified    bool   `json:"is_verified"`
}

// MerchantLedgerDTO represents a merchant's triple-balance wallet & settlement status
type MerchantLedgerDTO struct {
	MerchantID         uint                         `json:"merchant_id"`
	MerchantCode       string                       `json:"merchant_code"`
	StoreName          string                       `json:"store_name"`
	OwnerName          string                       `json:"owner_name"`
	OwnerPhone         string                       `json:"owner_phone"`
	OwnerEmail         string                       `json:"owner_email"`
	Tier               string                       `json:"tier"`
	Status             string                       `json:"status"` // "HEALTHY", "ACTIVE_DISPUTE"
	AvailableBalance   float64                      `json:"available_balance"`
	FormattedAvailable string                       `json:"formatted_available"`
	PendingBalance     float64                      `json:"pending_balance"`
	FormattedPending   string                       `json:"formatted_pending"`
	LockedBalance      float64                      `json:"locked_balance"`
	FormattedLocked    string                       `json:"formatted_locked"`
	TotalBalance       float64                      `json:"total_balance"`
	FormattedTotal     string                       `json:"formatted_total"`
	PayoutSchedule     string                       `json:"payout_schedule"` // "DAILY_T1", "WEEKLY", "ON_DEMAND"
	DisputeCount       int                          `json:"dispute_count"`
	TotalOrdersCount   int64                        `json:"total_orders_count"`
	BankAccount        MerchantLedgerBankAccountDTO `json:"bank_account"`
}

// MerchantLedgerOverviewDTO represents the aggregate response for Modul 4.2
type MerchantLedgerOverviewDTO struct {
	Merchants           []MerchantLedgerDTO `json:"merchants"`
	TotalAvailablePool  float64             `json:"total_available_pool"`
	FormattedAvailable  string              `json:"formatted_available"`
	TotalPendingPool    float64             `json:"total_pending_pool"`
	FormattedPending    string              `json:"formatted_pending"`
	TotalLockedPool     float64             `json:"total_locked_pool"`
	FormattedLocked     string              `json:"formatted_locked"`
	TotalMerchantsCount int                 `json:"total_merchants_count"`
	ActiveDisputeCount  int                 `json:"active_dispute_count"`
}

// DisputeActionRequestDTO represents a dispute lock or release request
type DisputeActionRequestDTO struct {
	ActionType     string  `json:"action_type"` // "LOCK", "RELEASE"
	Amount         float64 `json:"amount"`
	TicketID       string  `json:"ticket_id"`
	ReasonCategory string  `json:"reason_category"`
	Notes          string  `json:"notes"`
}

// DoubleEntryJournalDTO represents an accounting journal entry in the audit trail
type DoubleEntryJournalDTO struct {
	JournalID       string  `json:"journal_id"`
	Timestamp       string  `json:"timestamp"`
	MerchantName    string  `json:"merchant_name"`
	RefID           string  `json:"ref_id"`
	AccountDebit    string  `json:"account_debit"`
	AccountCredit   string  `json:"account_credit"`
	Amount          float64 `json:"amount"`
	FormattedAmount string  `json:"formatted_amount"`
	Type            string  `json:"type"` // "ESCROW_INFLOW", "PLATFORM_REVENUE", "DISBURSEMENT_PAYOUT", "DISPUTE_HOLD", "DISPUTE_RELEASE"
	Memo            string  `json:"memo"`
}

// Modul 4.3 Automated Disbursement Engine & 2FA Payout DTOs

// PayoutDisbursementDTO represents a disbursement transaction in the payout queue
type PayoutDisbursementDTO struct {
	PayoutID           string  `json:"payout_id"`
	MerchantID         uint    `json:"merchant_id"`
	MerchantCode       string  `json:"merchant_code"`
	StoreName          string  `json:"store_name"`
	DestinationBank    string  `json:"destination_bank"`
	DestinationAccount string  `json:"destination_account"`
	DestinationHolder  string  `json:"destination_holder"`
	RequestedAmount    float64 `json:"requested_amount"`
	FormattedRequested string  `json:"formatted_requested"`
	BankFee            float64 `json:"bank_fee"`
	FormattedBankFee   string  `json:"formatted_bank_fee"`
	NetTransferAmount  float64 `json:"net_transfer_amount"`
	FormattedNet       string  `json:"formatted_net"`
	ApprovalType       string  `json:"approval_type"` // "AUTO_DISBURSE", "MANUAL_2FA_REQUIRED"
	ApprovalRole       string  `json:"approval_role"` // "ROLE_FINANCE_LEAD", "SYSTEM_API"
	Status             string  `json:"status"`        // "PENDING_APPROVAL_FINANCE", "AUTO_PROCESSED", "APPROVED_BY_FINANCE", "REJECTED_AUDIT_HOLD"
	GatewayReference   string  `json:"gateway_reference"`
	RequestTimestamp   string  `json:"request_timestamp"`
	ApprovedBy         string  `json:"approved_by,omitempty"`
	ApprovedTimestamp  string  `json:"approved_timestamp,omitempty"`
	ApprovalNote       string  `json:"approval_note,omitempty"`
	RejectReason       string  `json:"reject_reason,omitempty"`
}

// PayoutGlobalConfigDTO represents global settings for the disbursement engine
type PayoutGlobalConfigDTO struct {
	DefaultSchedule        string  `json:"default_schedule"`
	MinWithdrawal          float64 `json:"min_withdrawal"`
	FormattedMinWithdrawal string  `json:"formatted_min_withdrawal"`
	BankTransferFee        float64 `json:"bank_transfer_fee"`
	FormattedBankFee       string  `json:"formatted_bank_fee"`
	AutoDisbursementLimit  float64 `json:"auto_disbursement_limit"`
	FormattedAutoLimit     string  `json:"formatted_auto_limit"`
	ManualApprovalRole     string  `json:"manual_approval_role"`
	CutOffTime             string  `json:"cut_off_time"`
}

// DisbursementOverviewDTO represents the complete response for Modul 4.3
type DisbursementOverviewDTO struct {
	Queue                          []PayoutDisbursementDTO `json:"queue"`
	Config                         PayoutGlobalConfigDTO   `json:"config"`
	TotalPendingApprovalCount      int                     `json:"total_pending_approval_count"`
	TotalPendingApprovalAmount     float64                 `json:"total_pending_approval_amount"`
	FormattedPendingApprovalAmount string                  `json:"formatted_pending_approval_amount"`
	TotalDisbursedToday            float64                 `json:"total_disbursed_today"`
	FormattedDisbursedToday        string                  `json:"formatted_disbursed_today"`
	TotalDisbursedCount            int                     `json:"total_disbursed_count"`
}

// PayoutApprovalRequestDTO represents a 2FA approval or rejection payload
type PayoutApprovalRequestDTO struct {
	Action       string `json:"action"` // "APPROVE", "REJECT"
	TotpPin      string `json:"totp_pin"`
	Notes        string `json:"notes"`
	RejectReason string `json:"reject_reason"`
}

// BatchPayoutResultDTO represents the result of triggering a scheduled batch payout
type BatchPayoutResultDTO struct {
	ProcessedCount     int     `json:"processed_count"`
	TotalAmount        float64 `json:"total_amount"`
	FormattedTotalAmount string `json:"formatted_total_amount"`
	Timestamp          string  `json:"timestamp"`
	Message            string  `json:"message"`
}

