package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"indovia-backend/config"
)

var DB *gorm.DB

func ConnectDB() (*gorm.DB, error) {
	dsn := config.DB.DSN()

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Printf("❌ Failed to connect to PostgreSQL database: %v\n", err)
		return nil, err
	}

	log.Printf("✅ Successfully connected to PostgreSQL database [%s]!\n", config.DB.Database)
	DB = db
	return db, nil
}
