package main

import (
	"fmt"
	"myproject/config"
	"myproject/routes"
	"os"

	"github.com/gofiber/fiber/v2"
)

func main(){

	fmt.Println("server started bro");

	config.ConnectDB()

	app:= fiber.New();

	routes.SetupRoutes(app)

	port := os.Getenv("PORT")

	app.Listen(":" + port)
}


