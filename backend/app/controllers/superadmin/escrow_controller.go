package superadmin

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"indovia-backend/app/models"
	"indovia-backend/app/services/superadmin"
)

// EscrowController handles HTTP requests for Central Escrow operations
type EscrowController struct {
	escrowService superadmin.EscrowService
}

// NewEscrowController creates an instance of EscrowController with dependency injection
func NewEscrowController(escrowService superadmin.EscrowService) *EscrowController {
	return &EscrowController{escrowService: escrowService}
}

// GetOverview returns summary metrics and gateway SLA health
// GET /api/v1/admin/superadmin/escrow/overview
func (ctrl *EscrowController) GetOverview(c *gin.Context) {
	overview, err := ctrl.escrowService.GetEscrowOverview()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat ringkasan escrow",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Data ringkasan escrow berhasil dimuat",
		"data":    overview,
	})
}

// GetFlowChart returns 7-day time series data for the inflow/outflow/reserve chart
// GET /api/v1/admin/superadmin/escrow/flow-chart
func (ctrl *EscrowController) GetFlowChart(c *gin.Context) {
	chart, err := ctrl.escrowService.GetEscrowFlowChart()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat data grafik arus kas",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Data grafik arus kas escrow berhasil dimuat",
		"data":    chart,
	})
}

// GetSplitPayments returns granular split payment logs
// GET /api/v1/admin/superadmin/escrow/split-payments
func (ctrl *EscrowController) GetSplitPayments(c *gin.Context) {
	search := c.Query("search")
	status := c.Query("status")

	logs, err := ctrl.escrowService.GetSplitPaymentLogs(search, status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat daftar split-payment",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Log split-payment berhasil dimuat",
		"data":    logs,
	})
}

// ReconcileBankLedger triggers automated reconciliation of bank statements with Indovia ledger
// POST /api/v1/admin/superadmin/escrow/reconcile
func (ctrl *EscrowController) ReconcileBankLedger(c *gin.Context) {
	result, err := ctrl.escrowService.TriggerReconciliation()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Proses rekonsiliasi gagal dijalankan",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Rekonsiliasi bank berhasil diselesaikan",
		"data":    result,
	})
}

// GetGateways returns gateway hub channels and SLA metrics
// GET /api/v1/admin/superadmin/escrow/gateways
func (ctrl *EscrowController) GetGateways(c *gin.Context) {
	overview, err := ctrl.escrowService.GetGatewayHubOverview()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat data payment gateway hub",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Data payment gateway hub berhasil dimuat",
		"data":    overview,
	})
}

// ToggleChannel switches the Kill Switch for a given channel
// POST /api/v1/admin/superadmin/escrow/gateways/:id/toggle
func (ctrl *EscrowController) ToggleChannel(c *gin.Context) {
	channelID := c.Param("id")
	if channelID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "ID kanal pembayaran tidak valid",
		})
		return
	}

	newStatus, err := ctrl.escrowService.ToggleChannel(channelID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal mengubah status kanal pembayaran",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Status kanal pembayaran berhasil diperbarui",
		"data": gin.H{
			"channel_id": channelID,
			"new_status": newStatus,
		},
	})
}

// PingChannel tests latency for a specific channel
// POST /api/v1/admin/superadmin/escrow/gateways/:id/ping
func (ctrl *EscrowController) PingChannel(c *gin.Context) {
	channelID := c.Param("id")
	if channelID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "ID kanal pembayaran tidak valid",
		})
		return
	}

	result, err := ctrl.escrowService.PingChannel(channelID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal melakukan ping kanal pembayaran",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Uji latensi kanal pembayaran berhasil",
		"data":    result,
	})
}

// PingAllChannels tests latency for all 14 channels
// POST /api/v1/admin/superadmin/escrow/gateways/ping-all
func (ctrl *EscrowController) PingAllChannels(c *gin.Context) {
	results, err := ctrl.escrowService.PingAllChannels()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal melakukan ping seluruh kanal pembayaran",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Uji latensi seluruh kanal pembayaran berhasil",
		"data":    results,
	})
}

// GetCredentials retrieves gateway API credentials
// GET /api/v1/admin/superadmin/escrow/gateways/credentials
func (ctrl *EscrowController) GetCredentials(c *gin.Context) {
	creds, err := ctrl.escrowService.GetCredentials()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat kredensial gateway",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Kredensial gateway berhasil dimuat",
		"data":    creds,
	})
}

// SaveCredentials updates gateway API credentials
// POST /api/v1/admin/superadmin/escrow/gateways/credentials
func (ctrl *EscrowController) SaveCredentials(c *gin.Context) {
	var req struct {
		MidtransServerKey    string `json:"midtrans_server_key"`
		MidtransClientKey    string `json:"midtrans_client_key"`
		MidtransMerchantID   string `json:"midtrans_merchant_id"`
		MidtransEnvironment  string `json:"midtrans_environment"`
		XenditSecretKey      string `json:"xendit_secret_key"`
		XenditPublicKey      string `json:"xendit_public_key"`
		XenditWebhookToken   string `json:"xendit_webhook_token"`
		PrimaryGateway       string `json:"primary_gateway"`
		AutoFallbackToBackup bool   `json:"auto_fallback_to_backup"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Format data kredensial tidak valid",
			"error":   err.Error(),
		})
		return
	}

	creds, _ := ctrl.escrowService.GetCredentials()
	if req.MidtransServerKey != "" {
		creds.MidtransServerKey = req.MidtransServerKey
	}
	if req.MidtransClientKey != "" {
		creds.MidtransClientKey = req.MidtransClientKey
	}
	if req.MidtransMerchantID != "" {
		creds.MidtransMerchantID = req.MidtransMerchantID
	}
	if req.MidtransEnvironment != "" {
		creds.MidtransEnvironment = req.MidtransEnvironment
	}
	if req.XenditSecretKey != "" {
		creds.XenditSecretKey = req.XenditSecretKey
	}
	if req.XenditPublicKey != "" {
		creds.XenditPublicKey = req.XenditPublicKey
	}
	if req.XenditWebhookToken != "" {
		creds.XenditWebhookToken = req.XenditWebhookToken
	}
	if req.PrimaryGateway != "" {
		creds.PrimaryGateway = req.PrimaryGateway
	}
	creds.AutoFallbackToBackup = req.AutoFallbackToBackup

	if err := ctrl.escrowService.SaveCredentials(creds); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal menyimpan kredensial gateway",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Kredensial payment gateway berhasil disimpan",
		"data":    creds,
	})
}

// GetLedger returns merchant escrow wallet overview with triple balance
// GET /api/v1/admin/superadmin/escrow/ledger
func (ctrl *EscrowController) GetLedger(c *gin.Context) {
	search := c.Query("search")
	status := c.Query("status")

	overview, err := ctrl.escrowService.GetMerchantLedgerOverview(search, status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat data buku besar escrow merchant",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Data buku besar escrow merchant berhasil dimuat",
		"data":    overview,
	})
}

// ApplyDispute freezes or releases funds due to dispute
// POST /api/v1/admin/superadmin/escrow/ledger/:id/dispute
func (ctrl *EscrowController) ApplyDispute(c *gin.Context) {
	merchantID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "ID Merchant tidak valid",
		})
		return
	}

	var req models.DisputeActionRequestDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Format data sengketa tidak valid",
			"error":   err.Error(),
		})
		return
	}

	if req.Amount <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Nominal penyesuaian sengketa harus lebih dari Rp 0",
		})
		return
	}

	if err := ctrl.escrowService.ApplyDispute(uint(merchantID), req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memproses aksi sengketa",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": fmt.Sprintf("Aksi sengketa %s sebesar Rp %.0f berhasil diproses", req.ActionType, req.Amount),
	})
}

// GetJournals returns double-entry audit trail journals
// GET /api/v1/admin/superadmin/escrow/ledger/:id/journals or /api/v1/admin/superadmin/escrow/ledger/journals
func (ctrl *EscrowController) GetJournals(c *gin.Context) {
	merchantName := c.Query("merchant_name")

	journals, err := ctrl.escrowService.GetMerchantJournals(merchantName)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat jurnal audit trail",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Jurnal audit trail double-entry berhasil dimuat",
		"data":    journals,
	})
}

// ExportLedgerCSV exports merchant ledger data to CSV format
// GET /api/v1/admin/superadmin/escrow/ledger/export
func (ctrl *EscrowController) ExportLedgerCSV(c *gin.Context) {
	csvData, filename, err := ctrl.escrowService.ExportLedgerCSV()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal mengekspor buku besar ke CSV",
			"error":   err.Error(),
		})
		return
	}

	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filename))
	c.Header("Content-Type", "text/csv; charset=utf-8")
	c.String(http.StatusOK, csvData)
}

// GetDisbursements returns the disbursement queue and configuration
// GET /api/v1/admin/superadmin/escrow/disbursements
func (ctrl *EscrowController) GetDisbursements(c *gin.Context) {
	search := c.Query("search")
	filterType := c.Query("filter")
	if filterType == "" {
		filterType = c.Query("filter_type")
	}

	overview, err := ctrl.escrowService.GetDisbursementOverview(search, filterType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat antrean pencairan dana",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Data antrean pencairan dana berhasil dimuat",
		"data":    overview,
	})
}

// ApproveOrRejectPayout handles 2FA approval or audit rejection of a payout
// POST /api/v1/admin/superadmin/escrow/disbursements/:id/action
func (ctrl *EscrowController) ApproveOrRejectPayout(c *gin.Context) {
	payoutID := c.Param("id")

	var req models.PayoutApprovalRequestDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Format data otorisasi tidak valid",
			"error":   err.Error(),
		})
		return
	}

	updated, err := ctrl.escrowService.ApproveOrRejectPayout(payoutID, req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": fmt.Sprintf("Pencairan dana %s berhasil diproses", updated.PayoutID),
		"data":    updated,
	})
}

// GetPayoutConfig returns current global payout parameters
// GET /api/v1/admin/superadmin/escrow/disbursements/config
func (ctrl *EscrowController) GetPayoutConfig(c *gin.Context) {
	cfg, err := ctrl.escrowService.GetPayoutConfig()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat konfigurasi payout",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Konfigurasi payout berhasil dimuat",
		"data":    cfg,
	})
}

// SavePayoutConfig updates global payout parameters
// POST /api/v1/admin/superadmin/escrow/disbursements/config
func (ctrl *EscrowController) SavePayoutConfig(c *gin.Context) {
	var cfg models.PayoutGlobalConfigDTO
	if err := c.ShouldBindJSON(&cfg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Format konfigurasi payout tidak valid",
			"error":   err.Error(),
		})
		return
	}

	if err := ctrl.escrowService.SavePayoutConfig(cfg); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal menyimpan konfigurasi payout",
			"error":   err.Error(),
		})
		return
	}

	updatedCfg, _ := ctrl.escrowService.GetPayoutConfig()
	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Parameter payout global berhasil diperbarui",
		"data":    updatedCfg,
	})
}

// ExecuteBatchPayout triggers scheduled batch payout
// POST /api/v1/admin/superadmin/escrow/disbursements/batch
func (ctrl *EscrowController) ExecuteBatchPayout(c *gin.Context) {
	result, err := ctrl.escrowService.ExecuteBatchPayout()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal mengeksekusi batch payout",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": result.Message,
		"data":    result,
	})
}


