package controllers

import (
	"context"
	"myproject/config"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddFood(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	userID := c.Locals("userID").(string)
	userObjectID, _ := primitive.ObjectIDFromHex(userID)

	var body struct {
		Name         string  `json:"name"`
		Price        float64 `json:"price"`
		RestaurantID string  `json:"restaurantId"`
	}

	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid body"})
	}

	restaurantObjectID, _ := primitive.ObjectIDFromHex(body.RestaurantID)

	//  OWNERSHIP CHECK
	restaurantCollection := config.GetCollection("restaurants")
	count, _ := restaurantCollection.CountDocuments(ctx, bson.M{
		"_id":     restaurantObjectID,
		"ownerId": userObjectID,
	})

	if count == 0 {
		return c.Status(403).JSON(fiber.Map{"error": "Not your restaurant"})
	}

	food := bson.M{
		"name":         body.Name,
		"price":        body.Price,
		"restaurantId": restaurantObjectID,
		"createdAt":    time.Now(),
	}

	foodCollection := config.GetCollection("foods")
	_, err := foodCollection.InsertOne(ctx, food)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to add food"})
	}

	return c.JSON(fiber.Map{"message": "Food added"})
}

func GetFoodsByRestaurant(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	restaurantId := c.Params("restaurantId")

	restaurantObjectID, err := primitive.ObjectIDFromHex(restaurantId)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid restaurant ID",
		})
	}

	collection := config.GetCollection("foods")

	cursor, err := collection.Find(ctx, bson.M{
		"restaurantId": restaurantObjectID,
	})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to fetch foods",
		})
	}
	defer cursor.Close(ctx)

	var foods []bson.M

	if err := cursor.All(ctx, &foods); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to decode foods",
		})
	}

	if foods == nil {
		foods = []bson.M{}
	}

	return c.JSON(fiber.Map{
		"foods": foods,
	})
}
