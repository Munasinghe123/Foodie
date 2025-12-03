package models

type UserModel struct {
	Name     string `json:"name" bson:"name"`
	UserName string `json:"username" bson:"username"`
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
	Role     string `json:"role" bson:"role,omitempty"`
	Photo    string `json:"photo,omitempty" bson:"photo,omitempty"`
}
