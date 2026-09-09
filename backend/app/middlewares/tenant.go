package middlewares

import (
	"strings"

	"github.com/gin-gonic/gin"
	"indovia-backend/app/repositories"
)

// TenantMiddleware inspects the Host header and isolates requests per merchant tenant
func TenantMiddleware(merchantRepo repositories.MerchantRepository) gin.HandlerFunc {
	return func(c *gin.Context) {
		host := c.Request.Host

		// Check custom test header first
		subdomain := c.GetHeader("X-Tenant-Subdomain")

		if subdomain == "" {
			// Strip port if present (e.g. "toko.localhost:5173" -> "toko.localhost")
			hostWithoutPort := host
			if colonIdx := strings.Index(host, ":"); colonIdx != -1 {
				hostWithoutPort = host[:colonIdx]
			}

			parts := strings.Split(hostWithoutPort, ".")
			// E.g. [toko, indovia, com] -> parts[0] == "toko"
			// E.g. [toko, localhost] -> parts[0] == "toko"
			if len(parts) >= 2 && parts[0] != "www" && parts[0] != "api" && parts[0] != "admin" && parts[0] != "localhost" {
				subdomain = parts[0]
			}
		}

		if subdomain != "" {
			merchant, err := merchantRepo.FindBySubdomain(subdomain)
			if err == nil && merchant != nil {
				c.Set("tenant", merchant)
				c.Set("tenant_id", merchant.ID)
				c.Set("tenant_subdomain", merchant.Subdomain)
			}
		}

		c.Next()
	}
}
