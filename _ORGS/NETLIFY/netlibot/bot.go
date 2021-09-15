package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	irc "github.com/fluffle/goirc/client"
)

var config *Config

// Config holds all the configuration data
type Config struct {
	IRCHost      string `json:"ircHost"`
	IRCChannel   string `json:"ircChannel"`
	IRCName      string `json:"ircName"`
	IRCPassword  string `json:"ircPassword"`
	SlackWebhook string `json:"slackWebhook"`
	SlackChannel string `json:"slackChannel"`
}

// SlackMsg represents a message sent to Slack over a webhook
type SlackMsg struct {
	User    string  `json:"username"`
	Text    string  `json:"text"`
	Channel *string `json:"channel"`
}

func init() {
	config = &Config{}
	data, err := ioutil.ReadFile("config.json")
	if err != nil {
		log.Fatalf("Error reading configuration: %v", err)
	}
	err = json.Unmarshal(data, config)
	if err != nil {
		log.Fatalf("Error parsing configuration: %v", err)
	}
}

func onConnect(conn *irc.Conn, line *irc.Line) {
	conn.Join("#netlify")
	if config.IRCPassword != "" {
		conn.Privmsg("NickServ", "identify "+config.IRCPassword)
	}
}

func main() {
	c := irc.SimpleClient("netlibot", "netlibot")
	c.EnableStateTracking()
	c.HandleFunc("connected", onConnect)

	quit := make(chan bool)
	c.HandleFunc("disconnected",
		func(conn *irc.Conn, line *irc.Line) { quit <- true })

	c.HandleFunc("PRIVMSG",
		func(conn *irc.Conn, line *irc.Line) {

			msg := &SlackMsg{
				User:    line.Nick,
				Text:    line.Text(),
				Channel: &config.SlackChannel,
			}
			b, err := json.Marshal(msg)
			if err != nil {
				log.Printf("Error encoding json for message: %v %v\n", line, err)
			} else {
				buf := bytes.NewReader(b)
				http.Post(config.SlackWebhook, "application/json", buf)
			}

			fmt.Printf("Got public msg: %v\n", line)
		})

	for {
		// connect to server
		if err := c.ConnectTo("irc.freenode.net"); err != nil {
			fmt.Printf("Connection error: %s\n", err)
			return
		}

		// wait on quit channel
		<-quit
	}
}
