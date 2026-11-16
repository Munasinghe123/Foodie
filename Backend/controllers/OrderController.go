package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"myproject/config"
	"myproject/helpers"
	"myproject/models"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v79"
	session "github.com/stripe/stripe-go/v79/checkout/session"
	"github.com/stripe/stripe-go/v79/webhook"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func PlaceOrder(c *fiber.Ctx) error {

	orderCollection := config.GetCollection("orders")

	type OrderItemRequest struct {
		FoodID   string `json:"foodId"`
		Quantity int    `json:"quantity"`
	}

	type CreateOrderRequest struct {
		Items []OrderItemRequest `json:"items"`
	}

	var req CreateOrderRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if len(req.Items) == 0 {
		return c.Status(400).JSON(fiber.Map{
			"error": "Order items are required",
		})
	}

	//  SAFE userID extraction
	rawUserID := c.Locals("userID")
	if rawUserID == nil {
		return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
	}

	userIDStr, ok := rawUserID.(string)
	if !ok {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid user session"})
	}

	userID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid user ID"})
	}

	var (
		subtotal     float64
		orderItems   []models.OrderItemModel
		restaurantID primitive.ObjectID
	)

	for _, item := range req.Items {

		if item.Quantity <= 0 {
			return c.Status(400).JSON(fiber.Map{
				"error": "Invalid quantity",
			})
		}

		food, err := helpers.GetFoodByID(item.FoodID)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{
				"error": "Food item not found",
			})
		}

		// Enforce single restaurant rule
		if restaurantID.IsZero() {
			restaurantID = food.RestaurantID
		} else if restaurantID != food.RestaurantID {
			return c.Status(400).JSON(fiber.Map{
				"error": "Multiple restaurants not allowed",
			})
		}

		subtotal += food.Price * float64(item.Quantity)

		orderItems = append(orderItems, models.OrderItemModel{
			FoodID:          food.ID,
			Quantity:        item.Quantity,
			PriceAtPurchase: food.Price,
		})
	}

	deliveryFee := float64(300)
	total := subtotal + deliveryFee

	order := models.OrderModel{
		UserID:       userID,
		RestaurantID: restaurantID,
		Items:        orderItems,
		Subtotal:     subtotal,
		DeliveryFee:  deliveryFee,
		Total:        total,
		Status:       "PENDING",
		CreatedAt:    primitive.NewDateTimeFromTime(time.Now()),
	}

	result, err := orderCollection.InsertOne(context.Background(), order)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create order",
		})
	}

	orderID := result.InsertedID.(primitive.ObjectID)

	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")

	params := &stripe.CheckoutSessionParams{
		Mode:               stripe.String("payment"),
		PaymentMethodTypes: stripe.StringSlice([]string{"card"}),

		LineItems: []*stripe.CheckoutSessionLineItemParams{
			{
				PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
					Currency: stripe.String("lkr"),
					ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
						Name: stripe.String("Food Order"),
					},
					UnitAmount: stripe.Int64(int64(total * 100)),
				},
				Quantity: stripe.Int64(1),
			},
		},

		SuccessURL: stripe.String("http://localhost:5173/order/success"),
		CancelURL:  stripe.String("http://localhost:5173/order/cancel"),

		Metadata: map[string]string{
			"orderId": orderID.Hex(),
			"userID":  userID.Hex(),
		},
	}

	sess, err := session.New(params)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Stripe checkout failed",
		})
	}

	return c.JSON(fiber.Map{
		"url": sess.URL,
	})
}

func OrderWebhook(c *fiber.Ctx) error {

	payload := c.Body()
	sigHeader := c.Get("Stripe-Signature")
	secret := os.Getenv("STRIPE_WEBHOOK_SECRET")

	event, err := webhook.ConstructEventWithOptions(
		payload,
		sigHeader,
		secret,
		webhook.ConstructEventOptions{
			IgnoreAPIVersionMismatch: true,
		},
	)

	if err != nil {
		fmt.Println(" Webhook verification failed:", err)
		return c.SendStatus(400)
	}

	// Only act on successful checkout
	if event.Type == "checkout.session.completed" {

		var session stripe.CheckoutSession
		if err := json.Unmarshal(event.Data.Raw, &session); err != nil {
			fmt.Println(" Failed to parse session:", err)
			return c.SendStatus(200) // still ACK
		}

		orderIDHex := session.Metadata["orderId"]
		if orderIDHex == "" {
			fmt.Println(" orderId missing in metadata")
			return c.SendStatus(200)
		}

		orderID, err := primitive.ObjectIDFromHex(orderIDHex)
		if err != nil {
			fmt.Println(" Invalid orderId")
			return c.SendStatus(200)
		}

		collection := config.GetCollection("orders")
		_, err = collection.UpdateOne(
			context.Background(),
			bson.M{"_id": orderID},
			bson.M{"$set": bson.M{"status": "PAID"}},
		)

		if err != nil {
			fmt.Println(" Failed to update order:", err)
		} else {
			fmt.Println("Order marked PAID:", orderID.Hex())
		}
	}

	return c.SendStatus(200)
}
