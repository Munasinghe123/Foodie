package controllers

import (
	"context"
	"time"
	"myproject/config"
	"myproject/models"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateUser(c *fiber.Ctx) error {
	collection := config.GetCollection("users")
	ctx,cancel := context.WithTimeout(context.Background(),10*time.Second)
	defer cancel()

	user:= new(models.UserModel)
	if err := c.BodyParser(user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":"Invalid request body",
		})
	}

	if user.Name == "" || user.Email == ""{
		return c.Status(400).JSON(fiber.Map{
			"error":"Name and email are required",
		})
	}

	user.ID = primitive.NewObjectID()

	result,err := collection.InsertOne(ctx, user)
	if err !=nil {
		return c.Status(500).JSON(fiber.Map{
			"error":"Failed to create user",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"message":"User created successfully",
		"id": result.InsertedID,
		"user":user,
	})
}