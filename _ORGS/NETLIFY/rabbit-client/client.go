package lib

import (
	"crypto/tls"
	"crypto/x509"
	"errors"
	"io/ioutil"
	"log"

	"github.com/streadway/amqp"
)

// AMQPConfiguration is what it says
type AMQPConfiguration struct {
	URL       string             `json:"url"`
	Exchange  ExchangeDefinition `json:"exchange"`
	Queue     QueueDefinition    `json:"queue"`
	TLSConfig TLSConfiguration   `json:"tls_config"`
}

// TLSConfiguration contains the configuration for doing TLS
type TLSConfiguration struct {
	Cert    string   `json:"cert"`
	Key     string   `json:"key"`
	CACerts []string `json:"ca_certs"`
}

// ExchangeDefinition defines the information about an exchange
type ExchangeDefinition struct {
	Name string `json:"name"`
	Type string `json:"type"`
}

// QueueDefinition contains the information about a queue
type QueueDefinition struct {
	Name       string `json:"name"`
	BindingKey string `json:"binding_key"`
}

// IsValid checks for blanks and obvious errors
func (t TLSConfiguration) IsValid() bool {
	if t.Cert == "" {
		return false
	}

	if t.Key == "" {
		return false
	}

	if t.CACerts == nil {
		return false
	}
	return true
}

// Dial is responsible for contacting the broker with a TLS connection
func Dial(url string, config *TLSConfiguration) (*amqp.Connection, error) {
	if !config.IsValid() {
		return nil, errors.New("the TLS configuration is invalid")
	}

	cfg := new(tls.Config)

	cfg.RootCAs = x509.NewCertPool()
	for _, certPath := range config.CACerts {
		ca, err := ioutil.ReadFile(certPath)
		if err != nil {
			return nil, err
		}
		cfg.RootCAs.AppendCertsFromPEM(ca)
	}
	cert, err := tls.LoadX509KeyPair(config.Cert, config.Key)
	if err != nil {
		return nil, err
	}
	cfg.Certificates = append(cfg.Certificates, cert)

	log.Printf("Connecting to AMQ: %s\n", url)
	return amqp.DialTLS(url, cfg)
}

// Bind sets up the actual queue, and starting to consume
func Bind(conn *amqp.Connection, exchange *ExchangeDefinition, queue *QueueDefinition) (<-chan amqp.Delivery, error) {
	log.Printf("Creating exchange %s/%s\n", exchange.Name, exchange.Type)
	channel, err := conn.Channel()
	if err != nil {
		return nil, err
	}

	if err = channel.ExchangeDeclare(
		exchange.Name, // name
		exchange.Type, // kind
		true,          // durable
		true,          // auto delete
		false,         // internal
		false,         // noWait
		nil,           // amqp.Table
	); err != nil {
		return nil, err
	}

	var amqpQueue amqp.Queue
	log.Printf("Creating queue %s/%s\n", queue.Name, queue.BindingKey)

	if amqpQueue, err = channel.QueueDeclare(
		queue.Name, // name of the queue
		true,       // durable
		true,       // delete when usused
		false,      // exclusive
		false,      // noWait
		nil,        // arguments
	); err != nil {
		return nil, err
	}

	if err = channel.QueueBind(
		amqpQueue.Name,   // name of the queue
		queue.BindingKey, // bindingKey
		exchange.Name,    // sourceExchange
		false,            // noWait
		nil,              // arguments
	); err != nil {
		return nil, err
	}

	log.Printf(
		"Bound to Queue (%s) on Exchange(%s), starting Consumer\n",
		amqpQueue.Name,
		exchange.Name)

	if delivery, err := channel.Consume(
		queue.Name,     // name
		"cache-primer", // consumerTag,
		false,          // noAck
		false,          // exclusive
		false,          // noLocal
		false,          // noWait
		nil,            // arguments
	); err == nil {
		return delivery, nil
	}

	return nil, err
}
