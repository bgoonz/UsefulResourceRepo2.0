package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/codegangsta/cli"
	"github.com/streadway/amqp"

	rc "github.com/netlify/rabbit-client"
)

func main() {
	app := cli.NewApp()
	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:  "url, u",
			Value: "amqps://rabbit.lo:5671",
			Usage: "which server to connect to",
		},
		cli.StringFlag{
			Name:  "cert, c",
			Value: "/usr/local/etc/certs/test.pem",
			Usage: "What public cert file to use",
		},
		cli.StringFlag{
			Name:  "key, k",
			Value: "/usr/local/etc/certs/test-key.pem",
			Usage: "What private cert file to use",
		},
		cli.StringFlag{
			Name:  "cacert, ca",
			Value: "/usr/local/etc/certs/ca.pem",
			Usage: "What ca public file to use",
		},
	}

	publishCmd := cli.Command{
		Name:   "publish",
		Usage:  "publish <exchange>",
		Action: publish,
	}
	publishCmd.Flags = []cli.Flag{
		cli.StringFlag{
			Name:  "type, t",
			Value: "fanout",
			Usage: "What type of exchange to use",
		},
		cli.BoolFlag{
			Name:  "persistent, p",
			Usage: "if a persistent delivery mode should be used",
		},
	}

	app.Commands = []cli.Command{
		publishCmd,
		{
			Name:   "connect",
			Usage:  "connect",
			Action: func(c *cli.Context) { connectToBroker(c) },
		},
		{
			Name:   "listen",
			Usage:  "listen <exchange> [queue]",
			Action: listenAndDump,
		},
	}
	app.Run(os.Args)
}

func connectToBroker(c *cli.Context) (*amqp.Connection, error) {
	url := c.GlobalString("url")
	tlsConf := rc.TLSConfiguration{
		Cert:    c.GlobalString("cert"),
		Key:     c.GlobalString("key"),
		CACerts: []string{c.GlobalString("cacert")},
	}

	fmt.Printf("connecting to %s: %+v\n", url, tlsConf)

	conn, err := rc.Dial(url, &tlsConf)
	if err != nil {
		panic(err)
	}
	log.Println("Connection to broker successful")
	return conn, err
}

func listenAndDump(c *cli.Context) {
	panic("yeah we should do this")
}

func publish(c *cli.Context) {
	if c.NArg() != 1 {
		panic("must provide an exchange")
	}
	exName := c.Args().First()
	exType := c.String("type")
	mode := amqp.Transient
	if c.Bool("persistent") {
		mode = amqp.Persistent
	}

	conn, err := connectToBroker(c)
	if err != nil {
		panic(err)
	}

	log.Printf("Connecting to exchange %s\n", exName)
	channel, err := conn.Channel()
	if err != nil {
		panic(err)
	}

	if err := channel.ExchangeDeclare(
		exName, // name
		exType, // type
		true,   // durable
		false,  // auto-deleted
		false,  // internal
		false,  // noWait
		nil,    // arguments
	); err != nil {
		panic(err)
	}
	log.Println("Connected to exchange")

	ask := true
	var rk string
	var body string
	var contentType = "application/json"
	var catcher []byte
	bio := bufio.NewReader(os.Stdout)
	for {
		if ask {
			fmt.Print("Routing Key: ")
			if catcher, _, err = bio.ReadLine(); err != nil {
				panic(err)
			}

			rk = string(catcher)

			fmt.Print("Payload: ")
			if catcher, _, err = bio.ReadLine(); err != nil {
				panic(err)
			}
			body = string(catcher)

			fmt.Printf("Content Type [%s]: ", contentType)
			if catcher, _, err = bio.ReadLine(); err != nil {
				panic(err)
			}
			res := strings.Trim(strings.ToLower(string(catcher)), " ")
			if res != "" {
				contentType = res
			}

			ask = false
		}

		var ok string
		fmt.Printf("Sending [%s: %s]\n", rk, body)
		fmt.Print("ok [Y/n]? ")

		if catcher, _, err = bio.ReadLine(); err != nil {
			panic(err)
		}

		ok = strings.Trim(strings.ToLower(string(catcher)), " ")
		if ok == "n" || ok == "no" {
			os.Exit(0)
		}

		if err = channel.Publish(
			exName, // exchange
			rk,     // routing key
			true,   // mandatory
			false,  // immediate
			amqp.Publishing{
				Headers:      amqp.Table{},
				ContentType:  contentType,
				Body:         []byte(body),
				DeliveryMode: mode,
				Priority:     0,
			},
		); err != nil {
			panic(err)
		}
		fmt.Println("sent")

		var repeat string
		fmt.Print("Change configuration [y/N]?")
		if catcher, _, err = bio.ReadLine(); err != nil {
			panic(err)
		}

		repeat = strings.Trim(strings.ToLower(string(catcher)), " ")
		if repeat == "y" || repeat == "yes" {
			ask = true
		}
	}
}
