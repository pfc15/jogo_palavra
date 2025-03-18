package main

import (
	"encoding/json"
)

type Event struct {
	Type string `json:"type"`
	Payload json.RawMessage `json:"payload"`
	Author string `json:"author"`
}

type EventHandler func(event Event, c *Client) error

const (
	EventSendMessage = "send_message"
	EventInscrever = "increver-se"
	EventLogin = "login"
	EventPalavras = "palavras"
	EventReady = "ready"
	EventDica = "dica"
	EventChute = "chute"
)

type SendMessageEvent struct {
	Message json.RawMessage `json:"message"`
	From string `json:"from"`
}
