package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type OrderItemModel struct {
	FoodID          primitive.ObjectID `json:"foodId" bson:"foodId"`
	Quantity        int                `json:"quantity" bson:"quantity"`
	PriceAtPurchase float64            `json:"priceAtPurchase" bson:"priceAtPurchase"`
}

type OrderModel struct {
	ID           primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserID       primitive.ObjectID `json:"userId" bson:"userId"`
	RestaurantID primitive.ObjectID `json:"restaurantId" bson:"restaurantId"`
	Items        []OrderItemModel   `json:"items" bson:"items"`
	Subtotal     float64            `json:"subtotal" bson:"subtotal"`
	DeliveryFee  float64            `json:"deliveryFee" bson:"deliveryFee"`
	Total        float64            `json:"total" bson:"total"`
	Status       string             `json:"status" bson:"status"`
	CreatedAt    primitive.DateTime `json:"createdAt" bson:"createdAt"`
}
