package mocks

import (
	"encoding/json"
)

type Event struct {
	Type string `json:"type"`
	Payload json.RawMessage `json:"payload"`
	Author string `json:"author"`
}


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
