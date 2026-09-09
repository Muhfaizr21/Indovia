package services

import (
	"errors"
	"fmt"
	"regexp"
	"strings"
	"time"

	"indovia-backend/app/models"
	"indovia-backend/app/repositories"
	"indovia-backend/app/requests"
	"indovia-backend/pkg/utils"
)

type MerchantService interface {
	ListMerchants(search, status, kycStatus, plan string, page, limit int) (map[string]interface{}, error)
	GetMerchant(id uint) (*models.Merchant, []models.AuditLog, error)
	CreateMerchant(req requests.CreateMerchantRequest, actorID uint, actorName string) (*models.Merchant, error)
	UpdateStatus(id uint, status, reason string, actorID uint, actorName string) (*models.Merchant, error)
	ReviewKYC(id uint, decision, notes string, actorID uint, actorName string) (*models.Merchant, error)
	VerifyCustomDomain(id uint, actorID uint, actorName string) (*models.Merchant, error)
	Impersonate(merchantID uint, actorID uint, actorName string) (string, *models.Merchant, error)
	UpdateThemeConfig(id uint, themeConfig string, actorID uint, actorName string) (*models.Merchant, error)
}

type merchantService struct {
	repo repositories.MerchantRepository
}

func NewMerchantService(repo repositories.MerchantRepository) MerchantService {
	return &merchantService{repo: repo}
}

func (s *merchantService) ListMerchants(search, status, kycStatus, plan string, page, limit int) (map[string]interface{}, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 12
	}

	merchants, total, err := s.repo.FindAll(search, status, kycStatus, plan, page, limit)
	if err != nil {
		return nil, err
	}

	stats, err := s.repo.GetStats()
	if err != nil {
		stats = make(map[string]int64)
	}

	return map[string]interface{}{
		"merchants": merchants,
		"meta": map[string]interface{}{
			"current_page": page,
			"per_page":     limit,
			"total":        total,
			"total_pages":  (total + int64(limit) - 1) / int64(limit),
		},
		"stats": stats,
	}, nil
}

func (s *merchantService) GetMerchant(id uint) (*models.Merchant, []models.AuditLog, error) {
	merchant, err := s.repo.FindByID(id)
	if err != nil {
		return nil, nil, errors.New("merchant tidak ditemukan")
	}

	logs, _ := s.repo.GetAuditLogs("merchants", fmt.Sprintf("%d", id))
	return merchant, logs, nil
}

func (s *merchantService) CreateMerchant(req requests.CreateMerchantRequest, actorID uint, actorName string) (*models.Merchant, error) {
	// 1. Generate clean subdomain if empty
	subdomain := req.Subdomain
	if subdomain == "" {
		subdomain = slugify(req.Name)
	} else {
		subdomain = slugify(subdomain)
	}

	// 2. Check subdomain uniqueness
	existing, _ := s.repo.FindBySubdomain(subdomain)
	if existing != nil {
		subdomain = fmt.Sprintf("%s-%d", subdomain, time.Now().Unix()%1000)
	}

	// 3. Plan & Trial defaults
	plan := req.Plan
	if plan == "" {
		plan = "Starter"
	}
	trialEnds := time.Now().Add(14 * 24 * time.Hour) // 14 Days Free Trial
	code := fmt.Sprintf("IND-M-%d", time.Now().Unix()%100000)

	merchant := &models.Merchant{
		Code:         code,
		Name:         req.Name,
		Subdomain:    subdomain,
		CustomDomain: req.CustomDomain,
		OwnerName:    req.OwnerName,
		OwnerEmail:   req.OwnerEmail,
		OwnerPhone:   req.OwnerPhone,
		City:         req.City,
		Address:      req.Address,
		Category:     req.Category,
		Status:       "trial",
		TrialEndsAt:  &trialEnds,
		Plan:         plan,
		KYCStatus:    "unverified",
		Avatar:       fmt.Sprintf("https://api.dicebear.com/7.x/identicon/svg?seed=%s", subdomain),
	}

	if err := s.repo.Create(merchant); err != nil {
		return nil, err
	}

	// Record Audit
	s.repo.CreateAuditLog(&models.AuditLog{
		ActorID:      actorID,
		ActorName:    actorName,
		ActorRole:    "superadmin",
		Action:       "MERCHANT_PROVISIONED",
		TargetEntity: "merchants",
		TargetID:     fmt.Sprintf("%d", merchant.ID),
		Details:      fmt.Sprintf("Merchant [%s] (%s.indovia.com) berhasil didaftarkan dalam paket Trial 14 hari.", merchant.Name, merchant.Subdomain),
		CreatedAt:    time.Now(),
	})

	return merchant, nil
}

func (s *merchantService) UpdateStatus(id uint, status, reason string, actorID uint, actorName string) (*models.Merchant, error) {
	merchant, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("merchant tidak ditemukan")
	}

	oldStatus := merchant.Status
	merchant.Status = status
	if err := s.repo.Update(merchant); err != nil {
		return nil, err
	}

	// Record Audit Log
	s.repo.CreateAuditLog(&models.AuditLog{
		ActorID:      actorID,
		ActorName:    actorName,
		ActorRole:    "superadmin",
		Action:       "STATUS_CHANGED",
		TargetEntity: "merchants",
		TargetID:     fmt.Sprintf("%d", merchant.ID),
		Details:      fmt.Sprintf("Status merchant diubah dari [%s] ke [%s]. Alasan: %s", oldStatus, status, reason),
		CreatedAt:    time.Now(),
	})

	return merchant, nil
}

func (s *merchantService) ReviewKYC(id uint, decision, notes string, actorID uint, actorName string) (*models.Merchant, error) {
	merchant, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("merchant tidak ditemukan")
	}

	bankVerified := false
	if decision == "approved" {
		bankVerified = true
	}

	if err := s.repo.UpdateKYC(id, decision, notes, bankVerified); err != nil {
		return nil, err
	}

	s.repo.CreateAuditLog(&models.AuditLog{
		ActorID:      actorID,
		ActorName:    actorName,
		ActorRole:    "compliance_ops",
		Action:       "KYC_REVIEWED",
		TargetEntity: "merchants",
		TargetID:     fmt.Sprintf("%d", merchant.ID),
		Details:      fmt.Sprintf("Keputusan verifikasi KYC: [%s]. Catatan: %s", decision, notes),
		CreatedAt:    time.Now(),
	})

	return s.repo.FindByID(id)
}

func (s *merchantService) VerifyCustomDomain(id uint, actorID uint, actorName string) (*models.Merchant, error) {
	merchant, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("merchant tidak ditemukan")
	}

	if merchant.CustomDomain == "" {
		return nil, errors.New("merchant belum memasukkan domain kustom")
	}

	// Simulate DNS check & Let's Encrypt 90-day SSL issuance
	sslExpires := time.Now().Add(90 * 24 * time.Hour)
	if err := s.repo.VerifyDomain(id, true, "active", &sslExpires); err != nil {
		return nil, err
	}

	s.repo.CreateAuditLog(&models.AuditLog{
		ActorID:      actorID,
		ActorName:    actorName,
		ActorRole:    "devops",
		Action:       "DOMAIN_SSL_VERIFIED",
		TargetEntity: "merchants",
		TargetID:     fmt.Sprintf("%d", merchant.ID),
		Details:      fmt.Sprintf("Domain kustom [%s] berhasil diverifikasi DNS CNAME. Sertifikat SSL Let's Encrypt aktif hingga %s.", merchant.CustomDomain, sslExpires.Format("02 Jan 2006")),
		CreatedAt:    time.Now(),
	})

	return s.repo.FindByID(id)
}

func (s *merchantService) Impersonate(merchantID uint, actorID uint, actorName string) (string, *models.Merchant, error) {
	merchant, err := s.repo.FindByID(merchantID)
	if err != nil {
		return "", nil, errors.New("merchant tidak ditemukan")
	}

	token, err := utils.GenerateImpersonationToken(merchant.ID, actorID)
	if err != nil {
		return "", nil, err
	}

	// Record High-Priority Audit Log
	s.repo.CreateAuditLog(&models.AuditLog{
		ActorID:         actorID,
		ActorName:       actorName,
		ActorRole:       "superadmin",
		Action:          "IMPERSONATION_STARTED",
		TargetEntity:    "merchants",
		TargetID:        fmt.Sprintf("%d", merchant.ID),
		Details:         fmt.Sprintf("Superadmin [%s] memulai sesi bantuan Login as Merchant ke toko [%s] (Subdomain: %s).", actorName, merchant.Name, merchant.Subdomain),
		IsImpersonation: true,
		CreatedAt:       time.Now(),
	})

	return token, merchant, nil
}

func (s *merchantService) UpdateThemeConfig(id uint, themeConfig string, actorID uint, actorName string) (*models.Merchant, error) {
	merchant, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("merchant tidak ditemukan")
	}

	if err := s.repo.UpdateThemeConfig(id, themeConfig); err != nil {
		return nil, err
	}

	s.repo.CreateAuditLog(&models.AuditLog{
		ActorID:      actorID,
		ActorName:    actorName,
		ActorRole:    "superadmin",
		Action:       "MERCHANT_THEME_UPDATED",
		TargetEntity: "merchants",
		TargetID:     fmt.Sprintf("%d", merchant.ID),
		Details:      fmt.Sprintf("Superadmin memperbarui konfigurasi tema & tata letak toko [%s] (Subdomain: %s).", merchant.Name, merchant.Subdomain),
		CreatedAt:    time.Now(),
	})

	return s.repo.FindByID(id)
}

func slugify(text string) string {
	text = strings.ToLower(strings.TrimSpace(text))
	reg, _ := regexp.Compile("[^a-z0-9]+")
	slug := reg.ReplaceAllString(text, "-")
	return strings.Trim(slug, "-")
}
