package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"indovia-backend/app/requests"
	"indovia-backend/app/services"
	"indovia-backend/pkg/response"
)

type MerchantController struct {
	service services.MerchantService
}

func NewMerchantController(service services.MerchantService) *MerchantController {
	return &MerchantController{service: service}
}

// List returns all merchants with pagination and statistics
func (ctrl *MerchantController) List(c *gin.Context) {
	search := c.Query("search")
	status := c.Query("status")
	kycStatus := c.Query("kyc_status")
	plan := c.Query("plan")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "12"))

	result, err := ctrl.service.ListMerchants(search, status, kycStatus, plan, page, limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Gagal memuat daftar merchant: "+err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, "Daftar merchant berhasil dimuat", result)
}

// Detail returns full merchant details and audit logs
func (ctrl *MerchantController) Detail(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "ID merchant tidak valid", nil)
		return
	}

	merchant, logs, err := ctrl.service.GetMerchant(uint(id))
	if err != nil {
		response.Error(c, http.StatusNotFound, err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, "Detail merchant berhasil dimuat", gin.H{
		"merchant":   merchant,
		"audit_logs": logs,
	})
}

// Create provisions a new merchant store
func (ctrl *MerchantController) Create(c *gin.Context) {
	var req requests.CreateMerchantRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Data tidak valid: "+err.Error(), nil)
		return
	}

	actorID := getActorID(c)
	actorName := getActorName(c)

	merchant, err := ctrl.service.CreateMerchant(req, actorID, actorName)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Gagal mendaftarkan merchant: "+err.Error(), nil)
		return
	}

	response.Success(c, http.StatusCreated, "Toko merchant berhasil didaftarkan dengan paket Trial 14 hari", merchant)
}

// UpdateStatus changes store lifecycle status (active, suspended, past_due, archived)
func (ctrl *MerchantController) UpdateStatus(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "ID merchant tidak valid", nil)
		return
	}

	var req requests.UpdateMerchantStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Data status tidak valid: "+err.Error(), nil)
		return
	}

	actorID := getActorID(c)
	actorName := getActorName(c)

	merchant, err := ctrl.service.UpdateStatus(uint(id), req.Status, req.Reason, actorID, actorName)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, "Status toko merchant berhasil diperbarui", merchant)
}

// ReviewKYC handles KYC approval, rejection, or reupload requests
func (ctrl *MerchantController) ReviewKYC(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "ID merchant tidak valid", nil)
		return
	}

	var req requests.ReviewKYCRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Data peninjauan KYC tidak valid: "+err.Error(), nil)
		return
	}

	decision := req.Decision
	if decision == "" {
		decision = req.Status
	}
	if decision == "" {
		decision = "approved"
	}

	actorID := getActorID(c)
	actorName := getActorName(c)

	merchant, err := ctrl.service.ReviewKYC(uint(id), decision, req.Notes, actorID, actorName)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, "Keputusan KYC berhasil disimpan", merchant)
}

// VerifyDomain verifies CNAME DNS record and provisions SSL
func (ctrl *MerchantController) VerifyDomain(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "ID merchant tidak valid", nil)
		return
	}

	actorID := getActorID(c)
	actorName := getActorName(c)

	merchant, err := ctrl.service.VerifyCustomDomain(uint(id), actorID, actorName)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, "Domain kustom & Sertifikat SSL Let's Encrypt berhasil diverifikasi aktif", merchant)
}

// Impersonate issues short-lived JWT token to access store as merchant
func (ctrl *MerchantController) Impersonate(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "ID merchant tidak valid", nil)
		return
	}

	actorID := getActorID(c)
	actorName := getActorName(c)

	token, merchant, err := ctrl.service.Impersonate(uint(id), actorID, actorName)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, fmt.Sprintf("Token impersonasi untuk toko [%s] berhasil diterbitkan", merchant.Name), gin.H{
		"token":           token,
		"expires_in":      "30 menit",
		"merchant_id":     merchant.ID,
		"merchant_name":   merchant.Name,
		"subdomain":       merchant.Subdomain,
		"store_url":       fmt.Sprintf("http://%s.indovia.com", merchant.Subdomain),
		"is_impersonated": true,
	})
}

// UpdateThemeConfig updates merchant storefront theme and layout configuration
func (ctrl *MerchantController) UpdateThemeConfig(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "ID merchant tidak valid", nil)
		return
	}

	var req struct {
		ThemeConfig string `json:"theme_config"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		response.Error(c, http.StatusBadRequest, "Data konfigurasi tema tidak valid: "+err.Error(), nil)
		return
	}

	actorID := getActorID(c)
	actorName := getActorName(c)

	merchant, err := ctrl.service.UpdateThemeConfig(uint(id), req.ThemeConfig, actorID, actorName)
	if err != nil {
		response.Error(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, "Konfigurasi tampilan dan tata letak toko berhasil disimpan", merchant)
}

func getActorID(c *gin.Context) uint {
	if val, exists := c.Get("user_id"); exists {
		if id, ok := val.(uint); ok {
			return id
		}
	}
	return 1 // Default to superadmin ID 1
}

func getActorName(c *gin.Context) string {
	if val, exists := c.Get("user_email"); exists {
		if email, ok := val.(string); ok {
			return email
		}
	}
	return "Super Admin Indovia"
}
