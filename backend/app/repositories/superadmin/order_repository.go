package superadmin

import (
	"fmt"
	"strconv"
	"strings"

	"gorm.io/gorm"
	"indovia-backend/app/models"
)

// OrderRepository defines data access operations for Superadmin Order management
type OrderRepository interface {
	GetOrders(params models.OrderFilterParams) ([]models.Order, int64, error)
	GetOrderStats() (models.OrderSummaryStatsDTO, error)
	GetOrderByID(id uint) (*models.Order, error)
	GetOrderByIdentifier(identifier string) (*models.Order, error)
	UpdateOrderStatus(id uint, status string, trackingNumber string) error
}

type orderRepository struct {
	db *gorm.DB
}

// NewOrderRepository creates an instance of OrderRepository with dependency injection
func NewOrderRepository(db *gorm.DB) OrderRepository {
	return &orderRepository{db: db}
}

func (r *orderRepository) GetOrders(params models.OrderFilterParams) ([]models.Order, int64, error) {
	query := r.db.Model(&models.Order{}).Preload("Merchant")

	// 1. Status Filter
	if params.Status != "" && params.Status != "Semua" && params.Status != "all" {
		query = query.Where("status = ?", params.Status)
	}

	// 2. Sales Channel Filter
	if params.SalesChannel != "" && params.SalesChannel != "Semua Kanal" && params.SalesChannel != "all" {
		query = query.Where("sales_channel = ?", params.SalesChannel)
	}

	// 3. Payment Method Filter
	if params.PaymentMethod != "" && params.PaymentMethod != "Semua Metode" && params.PaymentMethod != "all" {
		query = query.Where("payment_method = ?", params.PaymentMethod)
	}

	// 4. Multi-column Search
	if search := strings.TrimSpace(params.Search); search != "" {
		searchTerm := fmt.Sprintf("%%%s%%", search)
		query = query.Where(
			"order_number ILIKE ? OR customer_name ILIKE ? OR product_name ILIKE ? OR customer_city ILIKE ? OR customer_phone ILIKE ?",
			searchTerm, searchTerm, searchTerm, searchTerm, searchTerm,
		)
	}

	// Count total items matching filter
	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Pagination
	page := params.Page
	if page <= 0 {
		page = 1
	}
	limit := params.Limit
	if limit <= 0 {
		limit = 10
	}
	offset := (page - 1) * limit

	// Sorting
	sortBy := params.SortBy
	if sortBy == "" {
		sortBy = "created_at"
	}
	sortOrder := params.SortOrder
	if sortOrder != "asc" && sortOrder != "ASC" {
		sortOrder = "desc"
	}
	orderClause := fmt.Sprintf("%s %s, id %s", sortBy, sortOrder, sortOrder)

	var orders []models.Order
	if err := query.Order(orderClause).Offset(offset).Limit(limit).Find(&orders).Error; err != nil {
		return nil, 0, err
	}

	return orders, total, nil
}

func (r *orderRepository) GetOrderStats() (models.OrderSummaryStatsDTO, error) {
	var stats models.OrderSummaryStatsDTO

	// Total Orders & Total GMV
	r.db.Model(&models.Order{}).Count(&stats.TotalOrdersCount)
	row := r.db.Model(&models.Order{}).Select("COALESCE(SUM(total_amount), 0)").Row()
	_ = row.Scan(&stats.TotalGMV)

	// Completed / Selesai
	r.db.Model(&models.Order{}).Where("status = ?", "Selesai").Count(&stats.CompletedCount)
	rowCompleted := r.db.Model(&models.Order{}).Where("status = ?", "Selesai").Select("COALESCE(SUM(total_amount), 0)").Row()
	_ = rowCompleted.Scan(&stats.CompletedAmount)

	// Processing / Diproses & Dikirim
	r.db.Model(&models.Order{}).Where("status IN ?", []string{"Diproses", "Dikirim"}).Count(&stats.ProcessingCount)
	rowProcessing := r.db.Model(&models.Order{}).Where("status IN ?", []string{"Diproses", "Dikirim"}).Select("COALESCE(SUM(total_amount), 0)").Row()
	_ = rowProcessing.Scan(&stats.ProcessingAmount)

	// Pending / Menunggu Konfirmasi
	r.db.Model(&models.Order{}).Where("status IN ?", []string{"Menunggu Konfirmasi", "pending"}).Count(&stats.PendingCount)

	// Cancelled / Dibatalkan
	r.db.Model(&models.Order{}).Where("status = ?", "Dibatalkan").Count(&stats.CancelledCount)

	return stats, nil
}

func (r *orderRepository) GetOrderByID(id uint) (*models.Order, error) {
	var order models.Order
	if err := r.db.Preload("Merchant").First(&order, id).Error; err != nil {
		return nil, err
	}
	return &order, nil
}

func (r *orderRepository) GetOrderByIdentifier(identifier string) (*models.Order, error) {
	var order models.Order
	query := r.db.Preload("Merchant")

	if identifier == "" || identifier == "latest" || identifier == "default" {
		if err := query.Order("created_at DESC, id DESC").First(&order).Error; err != nil {
			return nil, err
		}
		return &order, nil
	}

	if id, err := strconv.ParseUint(identifier, 10, 32); err == nil {
		if err := query.Where("id = ? OR order_number = ?", uint(id), identifier).First(&order).Error; err == nil {
			return &order, nil
		}
	}

	if err := query.Where("order_number = ?", identifier).First(&order).Error; err != nil {
		return nil, err
	}
	return &order, nil
}

func (r *orderRepository) UpdateOrderStatus(id uint, status string, trackingNumber string) error {
	updates := map[string]interface{}{
		"status": status,
	}
	if trackingNumber != "" {
		updates["tracking_number"] = trackingNumber
	}
	if status == "Selesai" {
		updates["payment_status"] = "Lunas"
	} else if status == "Dibatalkan" {
		updates["payment_status"] = "Dibatalkan"
	}

	return r.db.Model(&models.Order{}).Where("id = ?", id).Updates(updates).Error
}
