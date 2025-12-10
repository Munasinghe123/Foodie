package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type RestaurantModel struct {
	ResturantID    primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	OwnerId        primitive.ObjectID `json:"ownerId" bson:"ownerId"`
	OwnerName      string             `json:"ownerName" bson:"ownerName"`
	Phone          string             `json:"phone" bson:"phone"`
	NIC            string             `json:"nic" bson:"nic"`
	Email          string             `json:"email" bson:"email"`
	RestaurantName string             `json:"restaurantName" bson:"restaurantName"`
	Address        string             `json:"address" bson:"address"`
	City           string             `json:"city" bson:"city"`
	Category       string             `json:"category" bson:"category"`
	Logo           string             `json:"logo" bson:"logo"`
	Status         string             `json:"status" bson:"status"`
	Paid           string             `json:"paid" bson:"paid"`
}
