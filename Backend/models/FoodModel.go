package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FoodModel struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Name         string             `bson:"name" json:"name"`
	Price        float64            `bson:"price" json:"price"`
	ImageUrl     string             `bson:"imageurl" json:"imageurl"`
	Description  string             `bson:description json:"description"`
	RestaurantID primitive.ObjectID `bson:"restaurantId" json:"restaurantId"`
	CreatedAt    time.Time          `bson:"createdAt" json:"createdAt"`
}
