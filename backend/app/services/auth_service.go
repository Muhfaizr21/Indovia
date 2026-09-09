package services

import (
	"errors"

	"indovia-backend/app/models"
	"indovia-backend/app/repositories"
	"indovia-backend/app/requests"
	"indovia-backend/pkg/utils"
)

type AuthService interface {
	Login(req requests.LoginRequest) (string, *models.User, error)
	GetProfile(userID uint) (*models.User, error)
}

type authService struct {
	userRepo repositories.UserRepository
}

func NewAuthService(userRepo repositories.UserRepository) AuthService {
	return &authService{userRepo: userRepo}
}

func (s *authService) Login(req requests.LoginRequest) (string, *models.User, error) {
	user, err := s.userRepo.FindByEmail(req.Email)
	if err != nil {
		return "", nil, errors.New("invalid email or password")
	}

	if !utils.CheckPasswordHash(req.Password, user.Password) {
		return "", nil, errors.New("invalid email or password")
	}

	token, err := utils.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		return "", nil, errors.New("failed to generate authentication token")
	}

	return token, user, nil
}

func (s *authService) GetProfile(userID uint) (*models.User, error) {
	return s.userRepo.FindByID(userID)
}
