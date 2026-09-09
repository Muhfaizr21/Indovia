package main

import (
	"fmt"
	"log"

	"indovia-backend/config"
	"indovia-backend/database"
	"indovia-backend/routes"
)

func main() {
	// 1. Load Configuration
	config.LoadAppConfig()
	log.Printf("🚀 Starting %s (%s mode) on port :%s...\n", config.App.Name, config.App.Env, config.App.Port)

	// 2. Connect to PostgreSQL
	db, err := database.ConnectDB()
	if err != nil {
		log.Fatalf("Fatal: could not connect to PostgreSQL: %v\n", err)
	}

	// 3. Auto Migrate & Seed Superadmin
	if err := database.AutoMigrateAndSeed(db); err != nil {
		log.Fatalf("Fatal: database migration & seeding failed: %v\n", err)
	}

	// 4. Setup Routes & Dependency Injection
	router := routes.SetupRouter(db)

	// 5. Start Server
	addr := fmt.Sprintf(":%s", config.App.Port)
	log.Printf("✨ Indovia API server is running at http://localhost%s\n", addr)
	if err := router.Run(addr); err != nil {
		log.Fatalf("Fatal: server failed to start: %v\n", err)
	}
}
