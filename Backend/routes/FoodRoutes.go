package routes

import (
	"myproject/controllers"
	"myproject/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupFoodRoutes(app *fiber.App) {

	api := app.Group("/api/food")

	api.Post("/add", middleware.AuthRequired, controllers.AddFood)
	api.Get("/restaurant/:restaurantId", controllers.GetFoodsByRestaurant)

}
