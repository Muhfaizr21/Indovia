package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"indovia-backend/app/requests"
	"indovia-backend/app/services"
	"indovia-backend/pkg/response"
)

type AuthController struct {
	authService services.AuthService
}

func NewAuthController(authService services.AuthService) *AuthController {
	return &AuthController{authService: authService}
}

func (ctrl *AuthController) Login(c *gin.Context) {
	var req requests.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		response.BadRequest(c, "Invalid input data", err.Error())
		return
	}

	token, user, err := ctrl.authService.Login(req)
	if err != nil {
		response.Unauthorized(c, err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Login successful", gin.H{
		"token": token,
		"user": gin.H{
			"id":     user.ID,
			"name":   user.Name,
			"email":  user.Email,
			"role":   user.Role,
			"avatar": user.Avatar,
		},
	})
}

func (ctrl *AuthController) Me(c *gin.Context) {
	userIDVal, exists := c.Get("userID")
	if !exists {
		response.Unauthorized(c, "Unauthenticated")
		return
	}

	userID, ok := userIDVal.(uint)
	if !ok {
		response.Unauthorized(c, "Invalid user session")
		return
	}

	user, err := ctrl.authService.GetProfile(userID)
	if err != nil {
		response.Unauthorized(c, "User not found")
		return
	}

	response.Success(c, http.StatusOK, "Profile retrieved successfully", gin.H{
		"user": gin.H{
			"id":     user.ID,
			"name":   user.Name,
			"email":  user.Email,
			"role":   user.Role,
			"avatar": user.Avatar,
		},
	})
}
