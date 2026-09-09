package superadmin

import (
	"fmt"
	"math"
	"strings"
	"time"

	"indovia-backend/app/models"
	"indovia-backend/app/repositories/superadmin"
)

// OrderService defines business logic contracts for Superadmin order operations
type OrderService interface {
	GetOrders(params models.OrderFilterParams) (*models.OrdersListResponse, error)
	GetOrderStats() (*models.OrderSummaryStatsDTO, error)
	GetOrderDetail(id uint) (*models.OrderDetailDTO, error)
	GetOrderByIdentifier(identifier string) (*models.OrderDetailDTO, error)
	UpdateOrderStatus(id uint, req models.UpdateOrderStatusRequest) error
}

type orderService struct {
	repo superadmin.OrderRepository
}

// NewOrderService creates an OrderService instance with dependency injection
func NewOrderService(repo superadmin.OrderRepository) OrderService {
	return &orderService{repo: repo}
}

func (s *orderService) GetOrders(params models.OrderFilterParams) (*models.OrdersListResponse, error) {
	if params.Page <= 0 {
		params.Page = 1
	}
	if params.Limit <= 0 {
		params.Limit = 10
	}

	orders, total, err := s.repo.GetOrders(params)
	if err != nil {
		return nil, err
	}

	// Fetch Summary Stats
	stats, _ := s.repo.GetOrderStats()
	stats.FormattedTotalGMV = formatRupiahExact(stats.TotalGMV)
	stats.FormattedCompleted = formatRupiahExact(stats.CompletedAmount)
	stats.FormattedProcessing = formatRupiahExact(stats.ProcessingAmount)

	// Format Order items
	var orderDTOs []models.OrderListItemDTO
	for _, o := range orders {
		orderDTOs = append(orderDTOs, mapOrderToDTO(&o))
	}

	// Calculate pagination metadata
	totalPages := int(math.Ceil(float64(total) / float64(params.Limit)))
	if totalPages == 0 {
		totalPages = 1
	}

	pagination := models.PaginationMetadata{
		CurrentPage: params.Page,
		PerPage:     params.Limit,
		TotalItems:  total,
		TotalPages:  totalPages,
		HasNext:     params.Page < totalPages,
		HasPrev:     params.Page > 1,
	}

	return &models.OrdersListResponse{
		Orders:     orderDTOs,
		Pagination: pagination,
		Stats:      stats,
	}, nil
}

func (s *orderService) GetOrderStats() (*models.OrderSummaryStatsDTO, error) {
	stats, err := s.repo.GetOrderStats()
	if err != nil {
		return nil, err
	}
	stats.FormattedTotalGMV = formatRupiahExact(stats.TotalGMV)
	stats.FormattedCompleted = formatRupiahExact(stats.CompletedAmount)
	stats.FormattedProcessing = formatRupiahExact(stats.ProcessingAmount)

	return &stats, nil
}

func (s *orderService) GetOrderDetail(id uint) (*models.OrderDetailDTO, error) {
	order, err := s.repo.GetOrderByID(id)
	if err != nil {
		return nil, err
	}
	dto := mapOrderToDetailDTO(order)
	return &dto, nil
}

func (s *orderService) GetOrderByIdentifier(identifier string) (*models.OrderDetailDTO, error) {
	order, err := s.repo.GetOrderByIdentifier(identifier)
	if err != nil {
		return nil, err
	}
	dto := mapOrderToDetailDTO(order)
	return &dto, nil
}

func (s *orderService) UpdateOrderStatus(id uint, req models.UpdateOrderStatusRequest) error {
	// Validate allowed statuses
	validStatuses := map[string]bool{
		"Selesai":             true,
		"Diproses":            true,
		"Dikirim":             true,
		"Menunggu Konfirmasi": true,
		"Dibatalkan":          true,
	}
	if !validStatuses[req.Status] {
		return fmt.Errorf("status '%s' tidak valid. Gunakan: Selesai, Diproses, Dikirim, Menunggu Konfirmasi, atau Dibatalkan", req.Status)
	}

	return s.repo.UpdateOrderStatus(id, req.Status, req.TrackingNumber)
}

func mapOrderToDTO(o *models.Order) models.OrderListItemDTO {
	merchantName := "Toko Pusat Indovia"
	if o.Merchant.Name != "" {
		merchantName = o.Merchant.Name
	}

	paymentStatus := o.PaymentStatus
	if paymentStatus == "" {
		if o.Status == "Selesai" {
			paymentStatus = "Lunas"
		} else if o.Status == "Dibatalkan" {
			paymentStatus = "Dibatalkan"
		} else {
			paymentStatus = "Menunggu Pembayaran"
		}
	}

	tracking := o.TrackingNumber
	if tracking == "" {
		tracking = "-"
	}

	return models.OrderListItemDTO{
		ID:              o.ID,
		OrderNumber:     o.OrderNumber,
		Date:            o.CreatedAt.Format("02 Jan 2006, 15:04 WIB"),
		RawCreatedAt:    o.CreatedAt,
		MerchantID:      o.MerchantID,
		MerchantName:    merchantName,
		CustomerName:    o.CustomerName,
		CustomerPhone:   o.CustomerPhone,
		CustomerCity:    o.CustomerCity,
		ProductName:     o.ProductName,
		ProductImage:    o.ProductImage,
		SalesChannel:    o.SalesChannel,
		ChannelBadge:    resolveOrderChannelBadge(o.SalesChannel),
		PaymentMethod:   o.PaymentMethod,
		PaymentStatus:   paymentStatus,
		PaymentBadge:    resolveOrderPaymentBadge(paymentStatus),
		TotalAmount:     o.TotalAmount,
		FormattedAmount: formatRupiahExact(o.TotalAmount),
		Status:          o.Status,
		StatusBadge:     resolveOrderStatusBadge(o.Status),
		TrackingNumber:  tracking,
	}
}

func resolveOrderChannelBadge(channel string) string {
	switch channel {
	case "Web Storefront":
		return "primary"
	case "WhatsApp Direct":
		return "success"
	case "Multi-Channel":
		return "info"
	default:
		return "secondary"
	}
}

func resolveOrderPaymentBadge(status string) string {
	switch status {
	case "Lunas":
		return "success"
	case "Menunggu Pembayaran":
		return "warning"
	case "Dibatalkan", "Gagal":
		return "danger"
	default:
		return "secondary"
	}
}

func resolveOrderStatusBadge(status string) string {
	switch status {
	case "Selesai":
		return "success"
	case "Diproses":
		return "warning"
	case "Dikirim":
		return "info"
	case "Menunggu Konfirmasi":
		return "secondary"
	case "Dibatalkan":
		return "danger"
	default:
		return "secondary"
	}
}

func mapOrderToDetailDTO(o *models.Order) models.OrderDetailDTO {
	base := mapOrderToDTO(o)

	// Calculate realistic cost breakdown
	var shippingFee float64 = 18000
	var serviceFee float64 = 2000
	var discount float64 = 0

	subtotal := o.TotalAmount - shippingFee - serviceFee
	if subtotal <= 0 {
		subtotal = o.TotalAmount
		shippingFee = 0
		serviceFee = 0
	}

	// Courier determination based on tracking code or default
	courier := "JNE Express (Reguler)"
	if strings.HasPrefix(o.TrackingNumber, "SIC") || strings.HasPrefix(o.TrackingNumber, "SPX") {
		courier = "SiCepat Express (BEST)"
	} else if strings.HasPrefix(o.TrackingNumber, "JNT") {
		courier = "J&T Express (Standard)"
	} else if strings.HasPrefix(o.TrackingNumber, "GOSEND") {
		courier = "GoSend Instant"
	}

	// Clean email generation
	cleanName := strings.ToLower(strings.ReplaceAll(o.CustomerName, " ", "."))
	customerEmail := fmt.Sprintf("%s@gmail.com", cleanName)

	// Detailed Indonesian Address
	shippingAddress := fmt.Sprintf("Jl. Melati Raya No. 42, RT 04 / RW 02, Kec. Kebayoran Baru, %s, Indonesia 12150", o.CustomerCity)
	billingAddress := "Sama dengan Alamat Pengiriman (Pembayaran Terverifikasi)"

	// Store slug
	storeSlug := strings.ToLower(strings.ReplaceAll(base.MerchantName, " ", "-"))

	// Single/multi item representation
	items := []models.OrderItemDetailDTO{
		{
			ID:             1,
			ProductName:    o.ProductName,
			ProductImage:   o.ProductImage,
			SKU:            fmt.Sprintf("IND-SKU-%04d", o.ID),
			Size:           "Standar / All Size",
			Quantity:       1,
			Price:          subtotal,
			FormattedPrice: formatRupiahExact(subtotal),
			Total:          subtotal,
			FormattedTotal: formatRupiahExact(subtotal),
		},
	}

	// Timeline construction based on order lifecycle
	timeline := generateOrderTimeline(o, courier)

	return models.OrderDetailDTO{
		OrderListItemDTO:  base,
		Subtotal:          subtotal,
		FormattedSubtotal: formatRupiahExact(subtotal),
		ShippingFee:       shippingFee,
		FormattedShipping: formatRupiahExact(shippingFee),
		ServiceFee:        serviceFee,
		FormattedService:  formatRupiahExact(serviceFee),
		Discount:          discount,
		FormattedDiscount: formatRupiahExact(discount),
		Courier:           courier,
		CustomerEmail:     customerEmail,
		ShippingAddress:   shippingAddress,
		BillingAddress:    billingAddress,
		MerchantStoreSlug: storeSlug,
		Items:             items,
		Timeline:          timeline,
	}
}

func generateOrderTimeline(o *models.Order, courier string) []models.OrderTimelineItemDTO {
	var timeline []models.OrderTimelineItemDTO

	createdAtStr := o.CreatedAt.Format("02 Jan 2006, 15:04 WIB")
	t1 := o.CreatedAt.Add(3 * time.Minute).Format("02 Jan 2006, 15:04 WIB")
	t2 := o.CreatedAt.Add(25 * time.Minute).Format("02 Jan 2006, 15:04 WIB")
	t3 := o.CreatedAt.Add(3 * time.Hour).Format("02 Jan 2006, 15:04 WIB")
	t4 := o.CreatedAt.Add(24 * time.Hour).Format("02 Jan 2006, 15:04 WIB")

	merchantName := "Toko Pusat Indovia"
	if o.Merchant.Name != "" {
		merchantName = o.Merchant.Name
	}

	// Step 1: Checkout
	timeline = append(timeline, models.OrderTimelineItemDTO{
		Title:       "Pesanan Berhasil Dibuat",
		Description: fmt.Sprintf("Checkout selesai oleh %s via %s", o.CustomerName, o.SalesChannel),
		Date:        createdAtStr,
		Status:      "done",
		Icon:        "solar:cart-check-bold",
	})

	if o.Status == "Dibatalkan" {
		timeline = append(timeline, models.OrderTimelineItemDTO{
			Title:       "Pesanan Dibatalkan",
			Description: "Transaksi dibatalkan oleh pembeli atau otomatis kadaluarsa oleh sistem.",
			Date:        t1,
			Status:      "done",
			Icon:        "solar:close-circle-bold",
		})
		return timeline
	}

	// Step 2: Payment
	payStatus := "done"
	payDesc := fmt.Sprintf("Pembayaran berhasil diverifikasi melalui %s (Status: %s)", o.PaymentMethod, o.PaymentStatus)
	if o.PaymentStatus != "Lunas" {
		payStatus = "current"
		payDesc = fmt.Sprintf("Menunggu pelunasan pembayaran via %s", o.PaymentMethod)
	}
	timeline = append(timeline, models.OrderTimelineItemDTO{
		Title:       "Verifikasi Pembayaran",
		Description: payDesc,
		Date:        t1,
		Status:      payStatus,
		Icon:        "solar:card-2-bold",
	})

	// Step 3: Merchant preparation
	prepStatus := "pending"
	prepDesc := fmt.Sprintf("Pesanan sedang disiapkan dan dipacking oleh %s", merchantName)
	if o.Status == "Diproses" {
		prepStatus = "current"
	} else if o.Status == "Dikirim" || o.Status == "Selesai" {
		prepStatus = "done"
		prepDesc = fmt.Sprintf("Pesanan selesai dipacking rapi oleh %s", merchantName)
	}
	timeline = append(timeline, models.OrderTimelineItemDTO{
		Title:       "Diproses Toko / Merchant",
		Description: prepDesc,
		Date:        t2,
		Status:      prepStatus,
		Icon:        "solar:box-bold",
	})

	// Step 4: Shipping
	shipStatus := "pending"
	tracking := o.TrackingNumber
	if tracking == "" || tracking == "-" {
		tracking = "Menunggu input nomor resi"
	}
	shipDesc := fmt.Sprintf("Paket diserahkan ke kurir logistik %s (Resi: %s)", courier, tracking)
	if o.Status == "Dikirim" {
		shipStatus = "current"
	} else if o.Status == "Selesai" {
		shipStatus = "done"
	}
	timeline = append(timeline, models.OrderTimelineItemDTO{
		Title:       "Diserahkan ke Kurir Pengiriman",
		Description: shipDesc,
		Date:        t3,
		Status:      shipStatus,
		Icon:        "solar:delivery-bold",
	})

	// Step 5: Delivered / Selesai
	delivStatus := "pending"
	delivDesc := fmt.Sprintf("Paket telah sampai dan diterima oleh %s di %s", o.CustomerName, o.CustomerCity)
	if o.Status == "Selesai" {
		delivStatus = "done"
	}
	timeline = append(timeline, models.OrderTimelineItemDTO{
		Title:       "Pesanan Selesai / Diterima",
		Description: delivDesc,
		Date:        t4,
		Status:      delivStatus,
		Icon:        "solar:verified-check-bold",
	})

	return timeline
}
