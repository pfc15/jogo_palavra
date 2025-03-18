package main

import (
	"encoding/json"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

var (
	pongWait = 10*time.Second
	pingInterval = (pongWait*9)/10
)

type ClientList map[*Client]bool

type Client struct {
	connection *websocket.Conn
	manager *Manager
	sala string
	username string
	palavras []string
	ready bool
	egress chan Event
}

func NewClient( conn *websocket.Conn, nickname string, sala string, manager *Manager) *Client {
	return &Client{
		connection: conn,
		manager: manager,
		sala: sala,
		username: nickname,
		ready: false,
		egress: make(chan Event),
	}
}

func (c *Client) readMessage() {
	defer func() {
		c.manager.removeClient(c)
	}()

	if err:= c.connection.SetReadDeadline(time.Now().Add(pongWait)); err != nil {
		log.Println(err)
		return
	}

	c.connection.SetReadLimit(512)

	c.connection.SetPongHandler(c.pongHandler)

	for {
		_, payload, err := c.connection.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("error reading message: %v", err)
			}
			break
		}

		var request Event

		if err := json.Unmarshal(payload, &request); err != nil {
			log.Println("error marshaling event :%v", err)
		}

		if err := c.manager.routeEvent(request, c); err != nil {
			log.Println("error handling message: ", err)
		}
	}
}

func (c *Client) writeMessage() {
	defer func() {
		c.manager.removeClient(c)
	}()

	ticker := time.NewTicker(pingInterval)

	for {
		select {
		case message, ok := <- c.egress:
			if !ok {
				if err := c.connection.WriteMessage(websocket.CloseMessage, nil); err != nil {
					log.Println("connection close: ", err)
				}
				return
			}
			log.Println(message)

			data, err := json.Marshal(message)
			if err!= nil {
				log.Println("cliente 95| erro no marshall:", err, string(message.Payload))
				return
			}

			if err := c.connection.WriteMessage(websocket.TextMessage, data); err!= nil {
				log.Println("failed to send message: ", err)
			}

			log.Println("message sent")

		case <- ticker.C:

			if err := c.connection.WriteMessage(websocket.PingMessage, []byte(``)); err != nil {
				log.Println("write message: ", err)
				return
			}

		}
	}
}

func (c *Client) pongHandler(pongMsg string) error {
	return c.connection.SetReadDeadline(time.Now().Add(pongWait))
}


