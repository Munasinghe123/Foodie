package main

import (
	"fmt"
	"myproject/config"
	"myproject/controllers"
	"myproject/routes"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {

	godotenv.Load()

	fmt.Println("server started bro")

	config.ConnectDB()

	app := fiber.New()

	//webhook route
	app.Post("/webhook", controllers.StripeWebhook)

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT,PATCH, DELETE, OPTIONS",
	}))

	routes.SetupRoutes(app)
	routes.SetupResturantRoutes(app)

	port := os.Getenv("PORT")

	app.Listen(":" + port)
}
