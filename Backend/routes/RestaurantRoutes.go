package routes

import (
	"myproject/controllers"
	
	"github.com/gofiber/fiber/v2"
)

func SetupResturantRoutes(app *fiber.App) {

	api := app.Group("/api/restaurant")

	api.Post("/register", controllers.RegisterRestaurant);
	api.Post("/pay", controllers.StripeCheckoutSession);
	api.Get("/allRestaurants", controllers.GetAllResautrants);
}