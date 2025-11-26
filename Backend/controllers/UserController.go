package controllers

import (
	"context"
	"fmt"
	"myproject/config"
	"myproject/models"
	"time"
	"myproject/helpers"

	"github.com/gofiber/fiber/v2"
)

func CreateUser(c *fiber.Ctx) error {
	collection := config.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	user := new(models.UserModel)
	if err := c.BodyParser(user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	fmt.Println("user details"+user.Name, user.UserName, user.Email, user.Password)

	hashedPassword, err := helpers.Hashpassword(user.Password)
	if(err !=nil){
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to hash password",
		})
	}

	user.Password=hashedPassword

	fmt.Println("hashed password", user.Password)

	if user.Name == "" || user.Email == "" || user.Password == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "Name and email are required",
		})
	}

	result, err := collection.InsertOne(ctx, user)
	if err != nil {

		println("error = " , err.Error())
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create user",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message": "User created successfully",
		"id":      result.InsertedID,
		"user":    user,
	})
}
