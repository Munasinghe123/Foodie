package helpers

import (
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(email string, role string, UserID primitive.ObjectID) (string, error) {
	claims := jwt.MapClaims{
		"email": email,
		"role":role,
		"userID":    UserID.Hex(),
		"exp":   time.Now().Add(24 * time.Hour).Unix(), // 1 day
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
