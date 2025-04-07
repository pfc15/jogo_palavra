package main

import (
	// "database/sql"
	"errors"
	"log"
	"net/http"

	// "os"
	"sync"

	"github.com/gorilla/websocket"
)

type ManagerInterface interface{
	setUpHandlers()
	routeEvent(event Event, c *Client) error
	serverWS(w http.ResponseWriter, r *http.Request)
	addClient(client *Client)
	removeClient(client *Client)
}

type Manager struct {
	// db *sql.DB
	sync.RWMutex
	clients ClientList
	handlers map[string]EventHandler
	rooms map[string]*room
}

var (
	websocketUpgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
)

type factoryManagerInterface interface{
	new_manager() *Manager
}

type factoryManager struct {}

func (f *factoryManager)new_manager() *Manager {
	// db, err := sql.Open("sqlite3", "mydb.db")
	// if err!=nil {
	// 	log.Println("erro na leitura do banco de dados")
	// 	return nil
	// }
	m := &Manager{
		clients: make(ClientList),
		handlers: make(map[string]EventHandler),
		rooms: make(map[string]*room, 0),
	}
	// m.setupDB()
	m.setUpHandlers()
	return m
}

func (m *Manager) setUpHandlers() {
	eventManager := EventHandlerManager{}
	m.handlers[EventSendMessage] = eventManager.SendMessage
	m.handlers[EventPalavras] = eventManager.ReceberPalavras
	m.handlers[EventReady] = eventManager.ready
	m.handlers[EventDica] = eventManager.EnviarPartePalavra
	m.handlers[EventChute] = eventManager.conferirPalavra
}


// func (m *Manager) setupDB() {
// 	content, err := os.ReadFile("setup.sql")
// 	if err!=nil {
// 		log.Println("erro lendo arquivo de sql: ", err)
// 		return
// 	}

// 	sql := strings.Split(string(content), ";")
// 	for _, promt := range sql {
// 		m.db.Exec(promt+";")
// 	}
// }


func (m *Manager) routeEvent(event Event, c *Client) error {
	log.Println(event)
	if handler, ok := m.handlers[event.Type]; ok {
		if err:= handler(event, c); err!= nil {
			return err
		}
		return nil
	} else {
		return errors.New("there is no such event Type")
	}
}

func (m *Manager) serverWS(w http.ResponseWriter, r *http.Request) {
	log.Println("new connection")

	conn, err := websocketUpgrader.Upgrade(w, r, nil)
	if err!= nil {
		log.Println("upgrade connection error: ", err)
		return
	}
	username := string(r.URL.Query().Get("username"))
	sala := string(r.URL.Query().Get("sala"))

	factory := factoryClient{}
	client := factory.NewClient(conn, username, sala, m)

	m.addClient(client)

	go client.readMessage()
	go client.writeMessage()
}

func (m *Manager) addClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	m.clients[client] = true
}

func (m *Manager) removeClient(client *Client) {
	m.Lock()
	defer m.Unlock()

	if _, ok := m.clients[client]; ok {
		client.connection.Close()
		delete(m.clients, client)
		for index, c :=range(client.sala.clientes) {
			if c==client {
				client.sala.clientes = append(client.sala.clientes[:index], client.sala.clientes[index+1:]...)
			}
		}
	}
}