package main

import (
	// "encoding/json"
	"fmt"
	"net/http"
	// "log"

)

func main() {
	factory := factoryManager{}
	manager := factory.new_manager()
	http.Handle("/", http.FileServer(http.Dir("./front")))
    http.HandleFunc("/ws", manager.serverWS)

	fmt.Println("server is runing in on http://localhost:8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}



