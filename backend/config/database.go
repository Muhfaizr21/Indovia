package config

import (
	"fmt"
)

type DatabaseConfig struct {
	Connection string
	Host       string
	Port       string
	Database   string
	Username   string
	Password   string
	SSLMode    string
	TimeZone   string
}

var DB DatabaseConfig

func LoadDatabaseConfig() {
	DB = DatabaseConfig{
		Connection: getEnv("DB_CONNECTION", "postgres"),
		Host:       getEnv("DB_HOST", "127.0.0.1"),
		Port:       getEnv("DB_PORT", "5432"),
		Database:   getEnv("DB_DATABASE", "indovia"),
		Username:   getEnv("DB_USERNAME", "muhfaiizr"),
		Password:   getEnv("DB_PASSWORD", "admin"),
		SSLMode:    getEnv("DB_SSLMODE", "disable"),
		TimeZone:   getEnv("DB_TIMEZONE", "Asia/Jakarta"),
	}
}

func (d DatabaseConfig) DSN() string {
	return fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		d.Host, d.Username, d.Password, d.Database, d.Port, d.SSLMode, d.TimeZone,
	)
}
