package superadmin

import (
	"indovia-backend/app/models"

	"gorm.io/gorm"
)

// MonthRevenueResult holds aggregated revenue per month
type MonthRevenueResult struct {
	Month int     `json:"month"`
	Total float64 `json:"total"`
	Count int64   `json:"count"`
}

// ChannelResult holds sales metrics grouped by sales channel
type ChannelResult struct {
	SalesChannel string  `json:"sales_channel"`
	Count        int64   `json:"count"`
	Total        float64 `json:"total"`
}

// PaymentResult holds metrics grouped by payment method
type PaymentResult struct {
	PaymentMethod string  `json:"payment_method"`
	Count         int64   `json:"count"`
	Total         float64 `json:"total"`
}

// RegionResult holds metrics grouped by customer city / region
type RegionResult struct {
	CustomerCity string  `json:"customer_city"`
	Count        int64   `json:"count"`
	Total        float64 `json:"total"`
}

// HourlyResult holds transaction counts grouped by hour of the day
type HourlyResult struct {
	Hour  int   `json:"hour"`
	Count int64 `json:"count"`
}

// LoyaltyResult holds customer retention and repeat order metrics
type LoyaltyResult struct {
	TotalCustomers  int64   `json:"total_customers"`
	RepeatCustomers int64   `json:"repeat_customers"`
	RepeatRate      float64 `json:"repeat_rate"`
}

// DashboardRepository defines data access contracts for Superadmin dashboard analytics
type DashboardRepository interface {
	GetMerchantStats() (activeCount int64, totalGMV float64, err error)
	GetOrderStats() (totalOrders int64, totalOrderAmount float64, err error)
	GetRecentOrders(limit int) ([]models.Order, error)
	GetMonthlyRevenue() ([]MonthRevenueResult, error)
	GetHourlyDistribution() ([]HourlyResult, error)
	GetPaymentMethodsBreakdown() ([]PaymentResult, error)
	GetSalesChannelsBreakdown() ([]ChannelResult, error)
	GetRegionalBreakdown() ([]RegionResult, error)
	GetCustomerLoyaltyStats() (LoyaltyResult, error)
}

type dashboardRepository struct {
	db *gorm.DB
}

// NewDashboardRepository creates an instance of DashboardRepository with dependency injection
func NewDashboardRepository(db *gorm.DB) DashboardRepository {
	return &dashboardRepository{db: db}
}

func (r *dashboardRepository) GetMerchantStats() (int64, float64, error) {
	var activeCount int64
	if err := r.db.Model(&models.Merchant{}).Where("status = ?", "active").Count(&activeCount).Error; err != nil {
		return 0, 0, err
	}

	var totalGMV float64
	row := r.db.Model(&models.Merchant{}).Select("COALESCE(SUM(monthly_gmv), 0)").Row()
	if err := row.Scan(&totalGMV); err != nil {
		totalGMV = 0
	}

	return activeCount, totalGMV, nil
}

func (r *dashboardRepository) GetOrderStats() (int64, float64, error) {
	var totalOrders int64
	if err := r.db.Model(&models.Order{}).Count(&totalOrders).Error; err != nil {
		return 0, 0, err
	}

	var totalAmount float64
	row := r.db.Model(&models.Order{}).Select("COALESCE(SUM(total_amount), 0)").Row()
	if err := row.Scan(&totalAmount); err != nil {
		totalAmount = 0
	}

	return totalOrders, totalAmount, nil
}

func (r *dashboardRepository) GetRecentOrders(limit int) ([]models.Order, error) {
	if limit <= 0 {
		limit = 10
	}
	var orders []models.Order
	err := r.db.Order("created_at DESC, id DESC").Limit(limit).Find(&orders).Error
	return orders, err
}

func (r *dashboardRepository) GetMonthlyRevenue() ([]MonthRevenueResult, error) {
	var results []MonthRevenueResult
	// PostgreSQL: EXTRACT(MONTH FROM created_at)
	err := r.db.Model(&models.Order{}).
		Select("CAST(EXTRACT(MONTH FROM created_at) AS INTEGER) as month, COALESCE(SUM(total_amount), 0) as total, COUNT(*) as count").
		Group("EXTRACT(MONTH FROM created_at)").
		Order("month ASC").
		Scan(&results).Error
	return results, err
}

func (r *dashboardRepository) GetHourlyDistribution() ([]HourlyResult, error) {
	var results []HourlyResult
	err := r.db.Model(&models.Order{}).
		Select("CAST(EXTRACT(HOUR FROM created_at) AS INTEGER) as hour, COUNT(*) as count").
		Group("EXTRACT(HOUR FROM created_at)").
		Order("hour ASC").
		Scan(&results).Error
	return results, err
}

func (r *dashboardRepository) GetPaymentMethodsBreakdown() ([]PaymentResult, error) {
	var results []PaymentResult
	err := r.db.Model(&models.Order{}).
		Select("payment_method, COUNT(*) as count, COALESCE(SUM(total_amount), 0) as total").
		Group("payment_method").
		Order("total DESC").
		Scan(&results).Error
	return results, err
}

func (r *dashboardRepository) GetSalesChannelsBreakdown() ([]ChannelResult, error) {
	var results []ChannelResult
	err := r.db.Model(&models.Order{}).
		Select("sales_channel, COUNT(*) as count, COALESCE(SUM(total_amount), 0) as total").
		Group("sales_channel").
		Order("total DESC").
		Scan(&results).Error
	return results, err
}

func (r *dashboardRepository) GetRegionalBreakdown() ([]RegionResult, error) {
	var results []RegionResult
	err := r.db.Model(&models.Order{}).
		Select("customer_city, COUNT(*) as count, COALESCE(SUM(total_amount), 0) as total").
		Group("customer_city").
		Order("count DESC").
		Scan(&results).Error
	return results, err
}

func (r *dashboardRepository) GetCustomerLoyaltyStats() (LoyaltyResult, error) {
	var totalCustomers int64
	r.db.Model(&models.Order{}).Distinct("customer_phone").Count(&totalCustomers)

	// Count customers who have more than 1 order
	var repeatCount int64
	subQuery := r.db.Model(&models.Order{}).
		Select("customer_phone").
		Group("customer_phone").
		Having("COUNT(*) > 1")
	r.db.Table("(?) as repeats", subQuery).Count(&repeatCount)

	rate := float64(0)
	if totalCustomers > 0 {
		rate = mathRound((float64(repeatCount)/float64(totalCustomers))*100, 1)
	}

	return LoyaltyResult{
		TotalCustomers:  totalCustomers,
		RepeatCustomers: repeatCount,
		RepeatRate:      rate,
	}, nil
}

func mathRound(val float64, precision int) float64 {
	p := 1.0
	for i := 0; i < precision; i++ {
		p *= 10
	}
	return float64(int(val*p+0.5)) / p
}
