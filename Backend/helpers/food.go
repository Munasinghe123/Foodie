package helpers

import (
	"context"
	"errors"

	"myproject/config"
	"myproject/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetFoodByID(foodID string) (*models.FoodModel, error) {

	objectID, err := primitive.ObjectIDFromHex(foodID)
	if err != nil {
		return nil, errors.New("invalid food id")
	}

	collection := config.GetCollection("foods")

	var food models.FoodModel

	err = collection.FindOne(
		context.Background(),
		bson.M{"_id": objectID},
	).Decode(&food)

	if err != nil {
		return nil, err
	}

	return &food, nil
}
