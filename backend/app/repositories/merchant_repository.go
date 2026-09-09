package repositories

import (
	"strings"
	"time"

	"gorm.io/gorm"
	"indovia-backend/app/models"
)

type MerchantRepository interface {
	FindAll(search, status, kycStatus, plan string, page, limit int) ([]models.Merchant, int64, error)
	FindByID(id uint) (*models.Merchant, error)
	FindBySubdomain(subdomain string) (*models.Merchant, error)
	Create(merchant *models.Merchant) error
	Update(merchant *models.Merchant) error
	UpdateStatus(id uint, status string) error
	UpdateKYC(id uint, status string, notes string, bankVerified bool) error
	VerifyDomain(id uint, verified bool, sslStatus string, sslExpiresAt *time.Time) error
	UpdateThemeConfig(id uint, themeConfig string) error
	GetStats() (map[string]int64, error)
	CreateAuditLog(log *models.AuditLog) error
	GetAuditLogs(targetEntity, targetID string) ([]models.AuditLog, error)
}

type merchantRepository struct {
	db *gorm.DB
}

func NewMerchantRepository(db *gorm.DB) MerchantRepository {
	return &merchantRepository{db: db}
}

func (r *merchantRepository) FindAll(search, status, kycStatus, plan string, page, limit int) ([]models.Merchant, int64, error) {
	var merchants []models.Merchant
	var total int64

	query := r.db.Model(&models.Merchant{})

	if search != "" {
		s := "%" + strings.ToLower(search) + "%"
		query = query.Where("LOWER(name) LIKE ? OR LOWER(subdomain) LIKE ? OR LOWER(owner_name) LIKE ? OR LOWER(owner_email) LIKE ? OR LOWER(code) LIKE ?", s, s, s, s, s)
	}
	if status != "" && status != "all" {
		query = query.Where("status = ?", status)
	}
	if kycStatus != "" && kycStatus != "all" {
		query = query.Where("kyc_status = ?", kycStatus)
	}
	if plan != "" && plan != "all" {
		query = query.Where("plan = ?", plan)
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit
	if err := query.Order("id DESC").Offset(offset).Limit(limit).Find(&merchants).Error; err != nil {
		return nil, 0, err
	}

	return merchants, total, nil
}

func (r *merchantRepository) FindByID(id uint) (*models.Merchant, error) {
	var merchant models.Merchant
	if err := r.db.First(&merchant, id).Error; err != nil {
		return nil, err
	}
	return &merchant, nil
}

func (r *merchantRepository) FindBySubdomain(subdomain string) (*models.Merchant, error) {
	var merchant models.Merchant
	if err := r.db.Where("LOWER(subdomain) = ?", strings.ToLower(subdomain)).First(&merchant).Error; err != nil {
		return nil, err
	}
	return &merchant, nil
}

func (r *merchantRepository) Create(merchant *models.Merchant) error {
	return r.db.Create(merchant).Error
}

func (r *merchantRepository) Update(merchant *models.Merchant) error {
	return r.db.Save(merchant).Error
}

func (r *merchantRepository) UpdateStatus(id uint, status string) error {
	return r.db.Model(&models.Merchant{}).Where("id = ?", id).Update("status", status).Error
}

func (r *merchantRepository) UpdateKYC(id uint, status string, notes string, bankVerified bool) error {
	return r.db.Model(&models.Merchant{}).Where("id = ?", id).Updates(map[string]interface{}{
		"kyc_status":    status,
		"kyc_notes":     notes,
		"bank_verified": bankVerified,
	}).Error
}

func (r *merchantRepository) VerifyDomain(id uint, verified bool, sslStatus string, sslExpiresAt *time.Time) error {
	return r.db.Model(&models.Merchant{}).Where("id = ?", id).Updates(map[string]interface{}{
		"domain_verified": verified,
		"ssl_status":      sslStatus,
		"ssl_expires_at":  sslExpiresAt,
	}).Error
}

func (r *merchantRepository) UpdateThemeConfig(id uint, themeConfig string) error {
	return r.db.Model(&models.Merchant{}).Where("id = ?", id).Update("theme_config", themeConfig).Error
}

func (r *merchantRepository) GetStats() (map[string]int64, error) {
	stats := make(map[string]int64)

	var total, active, trial, pastDue, suspended, kycPending int64
	r.db.Model(&models.Merchant{}).Count(&total)
	r.db.Model(&models.Merchant{}).Where("status = ?", "active").Count(&active)
	r.db.Model(&models.Merchant{}).Where("status = ?", "trial").Count(&trial)
	r.db.Model(&models.Merchant{}).Where("status = ?", "past_due").Count(&pastDue)
	r.db.Model(&models.Merchant{}).Where("status = ?", "suspended").Count(&suspended)
	r.db.Model(&models.Merchant{}).Where("kyc_status = ?", "pending").Count(&kycPending)

	stats["total"] = total
	stats["active"] = active
	stats["trial"] = trial
	stats["past_due"] = pastDue
	stats["suspended"] = suspended
	stats["kyc_pending"] = kycPending

	return stats, nil
}

func (r *merchantRepository) CreateAuditLog(log *models.AuditLog) error {
	return r.db.Create(log).Error
}

func (r *merchantRepository) GetAuditLogs(targetEntity, targetID string) ([]models.AuditLog, error) {
	var logs []models.AuditLog
	err := r.db.Where("target_entity = ? AND target_id = ?", targetEntity, targetID).Order("id DESC").Limit(20).Find(&logs).Error
	return logs, err
}
