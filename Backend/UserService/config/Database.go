package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
    "github.com/joho/godotenv"
)

var DB *mongo.Database

func ConnectDB(){

	godotenv.Load()

	ctx,cancel :=context.WithTimeout(context.Background(),10*time.Second)
	defer cancel()

	mongoURI :=os.Getenv("MONGODB_URI")
	client,err := mongo.Connect(ctx,options.Client().ApplyURI(mongoURI))

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("Connected to MongoDB!")
    
    DB = client.Database(os.Getenv("DB_NAME"))

}

func GetCollection(collectionName string) *mongo.Collection {
    return DB.Collection(collectionName)
}