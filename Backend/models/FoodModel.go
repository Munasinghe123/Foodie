package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FoodModel struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Name         string             `bson:"name" json:"name"`
	Price        float64            `bson:"price" json:"price"`
	RestaurantID primitive.ObjectID `bson:"restaurantId" json:"restaurantId"`
	CreatedAt    time.Time          `bson:"createdAt" json:"createdAt"`
}
