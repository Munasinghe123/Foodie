package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func AuthRequired(c *fiber.Ctx) error {
	tokenStr := c.Cookies("token")

	if tokenStr == "" {
		return c.Status(401).JSON(fiber.Map{"error": "Unauthorized - no token"})
	}

	token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token payload"})
	}

	userID, ok := claims["userID"].(string)
	if !ok || userID == "" {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid userID in token"})
	}

	c.Locals("userID", userID)

	return c.Next()
}
