package main

import (
	"log"

	"indovia-backend/config"
	"indovia-backend/database"
)

func main() {
	// 1. Load Configurations from .env
	config.LoadAppConfig()
	log.Printf("🚀 Starting %s (%s mode)...\n", config.App.Name, config.App.Env)

	// 2. Connect to PostgreSQL
	_, err := database.ConnectDB()
	if err != nil {
		log.Fatalf("Fatal: could not connect to PostgreSQL: %v\n", err)
	}

	log.Println("✨ Database connection verified and ready!")
}
