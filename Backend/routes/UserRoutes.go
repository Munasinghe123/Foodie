package routes

import (
	"myproject/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/register", controllers.CreateUser)
	api.Post("/login", controllers.LoginUser)
}
