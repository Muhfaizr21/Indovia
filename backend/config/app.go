package config

import (
	"os"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	Name      string
	Port      string
	Env       string
	URL       string
	JWTSecret string
}

var App AppConfig

func LoadAppConfig() {
	_ = godotenv.Load()

	App = AppConfig{
		Name:      getEnv("APP_NAME", "Indovia SaaS Engine"),
		Port:      getEnv("APP_PORT", "8080"),
		Env:       getEnv("APP_ENV", "development"),
		URL:       getEnv("APP_URL", "http://localhost:8080"),
		JWTSecret: getEnv("JWT_SECRET", "indovia-super-secret-jwt-key-2026"),
	}

	LoadDatabaseConfig()
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}
