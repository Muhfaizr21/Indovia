package superadmin

import (
	"net/http"
	"strconv"

	"indovia-backend/app/services/superadmin"
	"indovia-backend/pkg/response"

	"github.com/gin-gonic/gin"
)

// DashboardController handles HTTP requests for Superadmin Executive Dashboard
type DashboardController struct {
	service superadmin.DashboardService
}

// NewDashboardController constructs DashboardController with Dependency Injection
func NewDashboardController(service superadmin.DashboardService) *DashboardController {
	return &DashboardController{service: service}
}

// GetOverview handles GET /api/v1/admin/superadmin/dashboard/overview
func (ctrl *DashboardController) GetOverview(c *gin.Context) {
	rangeParam := c.DefaultQuery("range", "1T")

	overview, err := ctrl.service.GetOverview(rangeParam)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Gagal memuat ringkasan dashboard: "+err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, "Ringkasan data dashboard superadmin berhasil dimuat", overview)
}

// GetRecentOrders handles GET /api/v1/admin/superadmin/dashboard/orders
func (ctrl *DashboardController) GetRecentOrders(c *gin.Context) {
	limitStr := c.DefaultQuery("limit", "10")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 {
		limit = 10
	}

	orders, err := ctrl.service.GetRecentOrders(limit)
	if err != nil {
		response.Error(c, http.StatusInternalServerError, "Gagal memuat pesanan terkini: "+err.Error(), nil)
		return
	}

	response.Success(c, http.StatusOK, "Daftar pesanan terbaru berhasil dimuat", orders)
}
