package routes

import (
	"myproject/controllers"
	"myproject/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupResturantRoutes(app *fiber.App) {

	api := app.Group("/api/restaurant")

	api.Post("/register", middleware.AuthRequired,controllers.RegisterRestaurant);
	api.Post("/pay", middleware.AuthRequired,controllers.StripeCheckoutSession);
}