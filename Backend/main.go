package main


import (
    "fmt"
    "github.com/gofiber/fiber/v2"
)

func main(){

	fmt.Print("server started")

	app:= fiber.New();

	app.Listen((":4000"))
}