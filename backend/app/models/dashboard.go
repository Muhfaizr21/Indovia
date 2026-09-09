package models

import "time"

// KpiItem represents an executive KPI summary card
type KpiItem struct {
	Icon    string `json:"icon"`
	Name    string `json:"name"`
	Amount  string `json:"amount"`
	Variant string `json:"variant"` // "success" or "danger"
	Change  string `json:"change"`  // e.g. "14.8"
	Period  string `json:"period"`  // e.g. "vs bln lalu"
}

// RevenueChartData represents monthly trend metrics for GMV & Net Revenue
type RevenueChartData struct {
	Months     []string  `json:"months"`
	GMV        []float64 `json:"gmv"`
	NetRevenue []float64 `json:"net_revenue"`
	Target     []float64 `json:"target"`
}

// HourlyActivityData represents peak transaction hours & traffic distribution
type HourlyActivityData struct {
	Hours    []string `json:"hours"`
	Orders   []int    `json:"orders"`
	Visitors []int    `json:"visitors"`
}

// RegionalDistributionItem represents sales distribution by Indonesian region
type RegionalDistributionItem struct {
	Region     string  `json:"region"`
	Percentage float64 `json:"percentage"`
	Orders     string  `json:"orders"`
	Color      string  `json:"color"`
}

// SalesChannelItem represents sales breakdown across direct storefront, WhatsApp, & multi-channel
type SalesChannelItem struct {
	Name       string  `json:"name"`
	Percentage float64 `json:"percentage"`
	GMV        string  `json:"gmv"`
	Icon       string  `json:"icon"`
	Color      string  `json:"color"`
}

// CustomerLoyaltyData represents customer retention and repeat order metrics
type CustomerLoyaltyData struct {
	RepeatOrderRate    float64 `json:"repeat_order_rate"`
	TotalCustomers     int     `json:"total_customers"`
	NewCustomers       int     `json:"new_customers"`
	ReturningCustomers int     `json:"returning_customers"`
}

// ConversionFunnelItem represents a stage in the e-commerce purchase funnel
type ConversionFunnelItem struct {
	Stage string  `json:"stage"`
	Count int     `json:"count"`
	Label string  `json:"label"`
	Rate  float64 `json:"rate"`
}

// PaymentMethodItem represents distribution of transactions across payment rails
type PaymentMethodItem struct {
	Name   string  `json:"name"`
	Share  float64 `json:"share"`
	Amount string  `json:"amount"`
	Badge  string  `json:"badge"`
}

// RecentOrderItem represents formatted order for table rendering
type RecentOrderItem struct {
	ID           string  `json:"id"`
	Date         string  `json:"date"`
	Product      string  `json:"product"`
	Image        string  `json:"image"`
	Customer     string  `json:"customer"`
	Phone        string  `json:"phone"`
	City         string  `json:"city"`
	Channel      string  `json:"channel"`
	ChannelColor string  `json:"channelColor"`
	Amount       string  `json:"amount"`
	RawAmount    float64 `json:"raw_amount"`
	Payment      string  `json:"payment"`
	Status       string  `json:"status"`
	StatusColor  string  `json:"statusColor"`
}

// DashboardOverviewResponse encapsulates all superadmin dashboard metrics
type DashboardOverviewResponse struct {
	GeneratedAt          time.Time                  `json:"generated_at"`
	ActiveMerchantCount  int64                      `json:"active_merchant_count"`
	TotalGMV             float64                    `json:"total_gmv"`
	TotalOrdersCount     int64                      `json:"total_orders_count"`
	AverageOrderValue    float64                    `json:"average_order_value"`
	Kpis                 []KpiItem                  `json:"kpis"`
	RevenueChart         RevenueChartData           `json:"revenue_chart"`
	HourlyActivity       HourlyActivityData         `json:"hourly_activity"`
	RegionalDistribution []RegionalDistributionItem `json:"regional_distribution"`
	SalesChannels        []SalesChannelItem         `json:"sales_channels"`
	CustomerLoyalty      CustomerLoyaltyData        `json:"customer_loyalty"`
	ConversionFunnel     []ConversionFunnelItem     `json:"conversion_funnel"`
	PaymentMethods       []PaymentMethodItem        `json:"payment_methods"`
	RecentOrders         []RecentOrderItem          `json:"recent_orders"`
}
