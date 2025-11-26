package main

import (
	"fmt"
	"myproject/config"
	"myproject/routes"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main(){

	godotenv.Load()

	fmt.Println("server started bro");

	config.ConnectDB()

	app:= fiber.New();

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")

	app.Listen(":" + port)
}


