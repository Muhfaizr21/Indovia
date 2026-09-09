package models

import "time"

// OrderFilterParams holds query parameters for filtering and paginating orders
type OrderFilterParams struct {
	Status        string `form:"status"`         // "Semua", "Selesai", "Diproses", "Dikirim", "Menunggu Konfirmasi", "Dibatalkan"
	SalesChannel  string `form:"sales_channel"`  // "Web Storefront", "WhatsApp Direct", "Multi-Channel"
	PaymentMethod string `form:"payment_method"` // "QRIS", "Virtual Account", "E-Wallet", "COD"
	Search        string `form:"search"`         // matches order_number, customer_name, product_name, customer_city
	Page          int    `form:"page,default=1"`
	Limit         int    `form:"limit,default=10"`
	SortBy        string `form:"sort_by,default=created_at"`
	SortOrder     string `form:"sort_order,default=desc"`
}

// OrderListItemDTO represents an order formatted for professional enterprise table display
type OrderListItemDTO struct {
	ID              uint      `json:"id"`
	OrderNumber     string    `json:"order_number"`
	Date            string    `json:"date"` // e.g. "09 Sep 2026, 17:19 WIB"
	RawCreatedAt    time.Time `json:"raw_created_at"`
	MerchantID      uint      `json:"merchant_id"`
	MerchantName    string    `json:"merchant_name"`
	CustomerName    string    `json:"customer_name"`
	CustomerPhone   string    `json:"customer_phone"`
	CustomerCity    string    `json:"customer_city"`
	ProductName     string    `json:"product_name"`
	ProductImage    string    `json:"product_image"`
	SalesChannel    string    `json:"sales_channel"`
	ChannelBadge    string    `json:"channel_badge"` // primary, success, info
	PaymentMethod   string    `json:"payment_method"`
	PaymentStatus   string    `json:"payment_status"`
	PaymentBadge    string    `json:"payment_badge"` // success, warning, danger
	TotalAmount     float64   `json:"total_amount"`
	FormattedAmount string    `json:"formatted_amount"` // e.g. "Rp 1.250.000"
	Status          string    `json:"status"`           // Selesai, Diproses, Dikirim, Menunggu Konfirmasi, Dibatalkan
	StatusBadge     string    `json:"status_badge"`     // success, warning, info, secondary, danger
	TrackingNumber  string    `json:"tracking_number"`
}

// OrderSummaryStatsDTO represents aggregate metrics for the 4 top summary cards
type OrderSummaryStatsDTO struct {
	TotalOrdersCount    int64   `json:"total_orders_count"`
	TotalGMV            float64 `json:"total_gmv"`
	FormattedTotalGMV   string  `json:"formatted_total_gmv"`
	CompletedCount      int64   `json:"completed_count"`
	CompletedAmount     float64 `json:"completed_amount"`
	FormattedCompleted  string  `json:"formatted_completed"`
	ProcessingCount     int64   `json:"processing_count"`
	ProcessingAmount    float64 `json:"processing_amount"`
	FormattedProcessing string  `json:"formatted_processing"`
	PendingCount        int64   `json:"pending_count"`
	CancelledCount      int64   `json:"cancelled_count"`
}

// PaginationMetadata represents page traversal info
type PaginationMetadata struct {
	CurrentPage int   `json:"current_page"`
	PerPage     int   `json:"per_page"`
	TotalItems  int64 `json:"total_items"`
	TotalPages  int   `json:"total_pages"`
	HasNext     bool  `json:"has_next"`
	HasPrev     bool  `json:"has_prev"`
}

// OrdersListResponse wraps orders list, pagination metadata, and summary stats
type OrdersListResponse struct {
	Orders     []OrderListItemDTO   `json:"orders"`
	Pagination PaginationMetadata   `json:"pagination"`
	Stats      OrderSummaryStatsDTO `json:"stats"`
}

// UpdateOrderStatusRequest payload for updating order lifecycle status
type UpdateOrderStatusRequest struct {
	Status         string `json:"status" binding:"required"`
	TrackingNumber string `json:"tracking_number"`
}

// OrderItemDetailDTO represents a single purchased line-item in an order
type OrderItemDetailDTO struct {
	ID             uint    `json:"id"`
	ProductName    string  `json:"product_name"`
	ProductImage   string  `json:"product_image"`
	SKU            string  `json:"sku"`
	Size           string  `json:"size"`
	Quantity       int     `json:"quantity"`
	Price          float64 `json:"price"`
	FormattedPrice string  `json:"formatted_price"`
	Total          float64 `json:"total"`
	FormattedTotal string  `json:"formatted_total"`
}

// OrderTimelineItemDTO represents an event node in the fulfillment timeline
type OrderTimelineItemDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Date        string `json:"date"`
	Status      string `json:"status"` // "done", "current", "pending"
	Icon        string `json:"icon"`
}

// OrderDetailDTO provides comprehensive order details for the Order Detail view
type OrderDetailDTO struct {
	OrderListItemDTO
	Subtotal          float64                `json:"subtotal"`
	FormattedSubtotal string                 `json:"formatted_subtotal"`
	ShippingFee       float64                `json:"shipping_fee"`
	FormattedShipping string                 `json:"formatted_shipping"`
	ServiceFee        float64                `json:"service_fee"`
	FormattedService  string                 `json:"formatted_service"`
	Discount          float64                `json:"discount"`
	FormattedDiscount string                 `json:"formatted_discount"`
	Courier           string                 `json:"courier"`
	CustomerEmail     string                 `json:"customer_email"`
	ShippingAddress   string                 `json:"shipping_address"`
	BillingAddress    string                 `json:"billing_address"`
	MerchantStoreSlug string                 `json:"merchant_store_slug"`
	Items             []OrderItemDetailDTO   `json:"items"`
	Timeline          []OrderTimelineItemDTO `json:"timeline"`
}
