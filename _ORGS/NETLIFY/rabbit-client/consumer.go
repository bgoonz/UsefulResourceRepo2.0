package lib

import (
	"log"

	"github.com/streadway/amqp"
)

// NewConsumer returns a connected consumer that you can immediately start
// taking off of the IncomingMessages channel
func NewConsumer(amqpConfig *AMQPConfiguration) (<-chan amqp.Delivery, error) {

	// first get a TLS connection to the broker
	conn, err := Dial(amqpConfig.URL, &amqpConfig.TLSConfig)
	if err != nil {
		return nil, err
	}
	log.Println("Connected to broker")
	// then connect to the exchange
	deliveries, err := Bind(conn, &amqpConfig.Exchange, &amqpConfig.Queue)
	if err != nil {
		return nil, err
	}

	log.Println("Consumer connected and starting to consume")

	return deliveries, nil
}
