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

type ClientInterface interface{
	readMessage()
	writeMessage()
	pongHandler(pongMsg string) error
}

type ClientList map[*Client]bool

type Client struct {
	connection *websocket.Conn
	manager *Manager
	sala *room
	username string
	palavras []string
	ready bool
	egress chan Event
}

type room struct {
	nome string
	clientes []*Client
}

type factoryClientInterface interface {
	NewClient(conn *websocket.Conn, nickname string, sala string, manager *ManagerInterface) *Client
}
type factoryClient struct{}

func (n *factoryClient) NewClient( conn *websocket.Conn, nickname string, sala string, manager *Manager) *Client {
	new_room, exist := manager.rooms[sala]
	if (!exist){
		new_room = &room{
			nome: sala,
			clientes: make([]*Client, 0),
		}
		manager.rooms[sala] = new_room
	}
	novo_cliente := Client{
		connection: conn,
		manager: manager,
		sala: new_room,
		username: nickname,
		ready: false,
		egress: make(chan Event),
	}
	new_room.clientes = append(new_room.clientes, &novo_cliente)
	return &novo_cliente
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
				log.Printf("error reading message: %v\n", err)
			}
			break
		}

		var request Event

		if err := json.Unmarshal(payload, &request); err != nil {
			log.Printf("error marshaling event :%v\n", err)
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


