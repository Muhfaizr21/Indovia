package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"indovia-backend/app/controllers"
	"indovia-backend/app/middlewares"
	"indovia-backend/app/repositories"
	"indovia-backend/app/services"
)

func SetupRouter(db *gorm.DB) *gin.Engine {
	r := gin.Default()

	// Global Middlewares
	r.Use(middlewares.CORSMiddleware())

	// Dependency Injection (SOLID DIP)
	userRepo := repositories.NewUserRepository(db)
	authService := services.NewAuthService(userRepo)
	authCtrl := controllers.NewAuthController(authService)

	merchantRepo := repositories.NewMerchantRepository(db)
	merchantService := services.NewMerchantService(merchantRepo)
	merchantCtrl := controllers.NewMerchantController(merchantService)

	// Global Tenant Subdomain Isolation Middleware
	r.Use(middlewares.TenantMiddleware(merchantRepo))

	// API Group
	api := r.Group("/api/v1")
	{
		// Health check
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"status":  "healthy",
				"service": "Indovia SaaS Engine",
			})
		})

		// Auth endpoints
		auth := api.Group("/auth")
		{
			auth.POST("/login", authCtrl.Login)

			// Protected auth endpoints
			protected := auth.Group("")
			protected.Use(middlewares.AuthMiddleware())
			{
				protected.GET("/me", authCtrl.Me)
			}
		}

		// Modul 1: Multi-Tenant & Merchant Lifecycle Management Endpoints
		admin := api.Group("/admin")
		{
			merchants := admin.Group("/merchants")
			{
				merchants.GET("", merchantCtrl.List)
				merchants.POST("", merchantCtrl.Create)
				merchants.GET("/:id", merchantCtrl.Detail)
				merchants.PATCH("/:id/status", merchantCtrl.UpdateStatus)
				merchants.PUT("/:id/status", merchantCtrl.UpdateStatus)
				merchants.POST("/:id/status", merchantCtrl.UpdateStatus)
				merchants.PATCH("/:id/kyc", merchantCtrl.ReviewKYC)
				merchants.POST("/:id/kyc", merchantCtrl.ReviewKYC)
				merchants.POST("/:id/verify-domain", merchantCtrl.VerifyDomain)
				merchants.POST("/:id/impersonate", merchantCtrl.Impersonate)
			}
		}
	}

	return r
}
