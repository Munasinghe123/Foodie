package routes

import (
	"myproject/controllers"
	"myproject/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupOrderRoutes(app *fiber.App) {

	api := app.Group("/api/order")

	api.Post("/create", middleware.AuthRequired, controllers.PlaceOrder)

}
