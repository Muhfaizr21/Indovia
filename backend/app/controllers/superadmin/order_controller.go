package superadmin

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"indovia-backend/app/models"
	"indovia-backend/app/services/superadmin"
)

// OrderController handles incoming HTTP requests for Superadmin Order management
type OrderController struct {
	orderService superadmin.OrderService
}

// NewOrderController creates an instance of OrderController with dependency injection
func NewOrderController(orderService superadmin.OrderService) *OrderController {
	return &OrderController{orderService: orderService}
}

// GetOrders retrieves filtered and paginated orders
// GET /api/v1/admin/superadmin/orders
func (ctrl *OrderController) GetOrders(c *gin.Context) {
	var params models.OrderFilterParams
	if err := c.ShouldBindQuery(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Parameter filter tidak valid",
			"error":   err.Error(),
		})
		return
	}

	response, err := ctrl.orderService.GetOrders(params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat daftar pesanan",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Daftar pesanan berhasil dimuat",
		"data":    response,
	})
}

// GetOrderStats retrieves summary statistics for the 4 top cards
// GET /api/v1/admin/superadmin/orders/stats
func (ctrl *OrderController) GetOrderStats(c *gin.Context) {
	stats, err := ctrl.orderService.GetOrderStats()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Gagal memuat statistik pesanan",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Statistik pesanan berhasil dimuat",
		"data":    stats,
	})
}

// GetOrderDetail retrieves single order detail by ID, order number, or "latest"
// GET /api/v1/admin/superadmin/orders/:id
func (ctrl *OrderController) GetOrderDetail(c *gin.Context) {
	idParam := c.Param("id")
	if idParam == "" {
		idParam = "latest"
	}

	order, err := ctrl.orderService.GetOrderByIdentifier(idParam)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"status":  "error",
			"message": "Pesanan tidak ditemukan",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Detail pesanan berhasil dimuat",
		"data":    order,
	})
}

// UpdateOrderStatus updates order status and tracking number
// PUT /api/v1/admin/superadmin/orders/:id/status
func (ctrl *OrderController) UpdateOrderStatus(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "ID pesanan tidak valid",
		})
		return
	}

	var req models.UpdateOrderStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Format data status tidak valid",
			"error":   err.Error(),
		})
		return
	}

	if err := ctrl.orderService.UpdateOrderStatus(uint(id), req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Status pesanan berhasil diperbarui",
	})
}
