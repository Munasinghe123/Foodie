package controllers

import (
	"context"
	"encoding/json"
	"myproject/config"
	"myproject/models"
	"os"
	"time"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v79"
	session "github.com/stripe/stripe-go/v79/checkout/session"
	"github.com/stripe/stripe-go/v79/webhook"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func RegisterRestaurant(c *fiber.Ctx) error {

	collection := config.GetCollection("restaurants")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	userID := c.Locals("userID").(string)

	restaurant := new(models.RestaurantModel)

	var err error

	err = c.BodyParser(restaurant)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	ownerObjID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	restaurant.OwnerId = ownerObjID
	restaurant.Status = "pending"
	restaurant.Paid = "unpaid"

	result, err := collection.InsertOne(ctx, restaurant)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to register restaurant"})
	}

	return c.JSON(fiber.Map{
		"message": "Restaurant submitted for approval",
		"id":      result.InsertedID,
	})

}

func StripeCheckoutSession(c *fiber.Ctx) error {

	type Body struct {
		RestaurantId string `json:"restaurantId"`
	}

	var req Body

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request",
		})
	}

	if req.RestaurantId == "" {
		return c.Status(400).JSON(fiber.Map{
			"error": "Restaurant ID is required",
		})
	}

	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

	params := &stripe.CheckoutSessionParams{
		PaymentMethodTypes: stripe.StringSlice([]string{"card"}),
		Mode:               stripe.String("payment"),

		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("lkr"),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String("Restaurant Registration Fee"),
					},

					UnitAmount: stripe.Int64(500 * 100),
				},
				Quantity: stripe.Int64(1),
			},
		},

		SuccessURL: stripe.String("http://localhost:5173/payment/success?restaurantId=" + req.RestaurantId),
		CancelURL:  stripe.String("http://localhost:5173/payment-cancel"),

		Metadata: map[string]string{
			"restaurantId": req.RestaurantId,
		},
	}

	sess, err := session.New(params)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Stripe checkout session failed",
		})
	}

	return c.JSON(fiber.Map{
		"url": sess.URL,
	})

}

func StripeWebhook(c *fiber.Ctx) error {
	// Get the raw body - read it only once
	payload := c.BodyRaw()

	// Get the Stripe signature from headers
	sigHeader := c.Get("Stripe-Signature")

	// Get webhook secret from environment
	endpointSecret := os.Getenv("STRIPE_WEBHOOK_SECRET")
	if endpointSecret == "" {
		fmt.Println("ERROR: Missing STRIPE_WEBHOOK_SECRET environment variable")
		return c.Status(500).SendString("Missing webhook secret")
	}

	// Verify the webhook signature with API version mismatch ignored
	event, err := webhook.ConstructEventWithOptions(
		payload,
		sigHeader,
		endpointSecret,
		webhook.ConstructEventOptions{
			IgnoreAPIVersionMismatch: true,
		},
	)
	if err != nil {
		fmt.Printf("⚠️  Webhook signature verification failed: %v\n", err)
		return c.Status(400).SendString(fmt.Sprintf("Webhook signature verification failed: %v", err))
	}

	fmt.Printf("✅ Webhook verified! Event type: %s\n", event.Type)

	// Handle the checkout.session.completed event
	if event.Type == "checkout.session.completed" {
		// Marshal and unmarshal to get the session data
		dataBytes, err := json.Marshal(event.Data.Object)
		if err != nil {
			fmt.Printf("ERROR: Failed to marshal event data: %v\n", err)
			return c.Status(400).SendString("Failed to process event data")
		}

		var session stripe.CheckoutSession
		if err := json.Unmarshal(dataBytes, &session); err != nil {
			fmt.Printf("ERROR: Failed to decode Stripe session: %v\n", err)
			return c.Status(400).SendString("Failed to decode Stripe session")
		}

		// Get restaurant ID from metadata
		restaurantId := session.Metadata["restaurantId"]
		if restaurantId == "" {
			fmt.Println("ERROR: Missing restaurant ID in session metadata")
			return c.Status(400).SendString("Missing restaurant ID")
		}

		fmt.Printf("Processing payment for restaurant ID: %s\n", restaurantId)

		// Convert to MongoDB ObjectID
		objID, err := primitive.ObjectIDFromHex(restaurantId)
		if err != nil {
			fmt.Printf("ERROR: Invalid restaurant ID format: %v\n", err)
			return c.Status(400).SendString("Invalid restaurant ID format")
		}

		// Update the restaurant in database
		collection := config.GetCollection("restaurants")
		result, err := collection.UpdateOne(
			context.Background(),
			bson.M{"_id": objID},
			bson.M{"$set": bson.M{"paid": "paid"}},
		)

		if err != nil {
			fmt.Printf("ERROR: Database update failed: %v\n", err)
			return c.Status(500).SendString("Database update failed")
		}

		if result.MatchedCount == 0 {
			fmt.Printf("WARNING: No restaurant found with ID: %s\n", restaurantId)
			return c.Status(404).SendString("Restaurant not found")
		}

		fmt.Printf("✅ Successfully updated restaurant %s to paid status\n", restaurantId)
	}

	// Return 200 to acknowledge receipt of the event
	return c.SendStatus(200)
}