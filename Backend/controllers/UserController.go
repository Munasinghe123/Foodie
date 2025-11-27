package controllers

import (
	"context"
	"fmt"
	"myproject/config"
	"myproject/helpers"
	"myproject/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
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
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to hash password",
		})
	}

	user.Password = hashedPassword

	user.Role = "user"

	fmt.Println("hashed password", user.Password)

	if user.Name == "" || user.Email == "" || user.Password == "" || user.UserName == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "Name and email are required",
		})
	}

	// email duplicate check
	var emailCheck models.UserModel
	err = collection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&emailCheck)
	if err == nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Email already exists",
		})
	}

	// name duplicate check
	var nameCheck models.UserModel
	err = collection.FindOne(ctx, bson.M{"name": user.Name}).Decode(&nameCheck)
	if err == nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Name already exists",
		})
	}

	// user name duplicate check
	var userNameCheck models.UserModel
	err = collection.FindOne(ctx, bson.M{"username": user.UserName}).Decode(&userNameCheck)
	if err == nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "UserName already exists",
		})
	}

	result, err := collection.InsertOne(ctx, user)
	if err != nil {

		println("error = ", err.Error())
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

func LoginUser(c *fiber.Ctx) error {
	collection := config.GetCollection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	var user models.UserModel
	err := collection.FindOne(ctx, bson.M{"email": req.Email}).Decode(&user)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid email or password"})
	}

	if !helpers.CheckPasswordHash(req.Password, user.Password) {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid email or password"})
	}

	token, err := helpers.GenerateJWT(user.Email, user.Role)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to generate token"})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour),
		HTTPOnly: true,
		Secure:   false, // change to true in production (HTTPS)
		SameSite: "Lax",
	})

	return c.JSON(fiber.Map{
		"message": "Login successful",
		// "token":   token,
		"user": fiber.Map{
			"name":     user.Name,
			"username": user.UserName,
			"email":    user.Email,
		},
	})

}
