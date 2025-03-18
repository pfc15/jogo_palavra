package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

func SendMessage(event Event, c *Client) error {
	fmt.Println(event)
	fmt.Println(string(event.Payload))
	event.Type = "new_message"
	for _, client := range c.sala.clientes {
		client.egress <- event
	}
	return nil

}

func ReceberPalavras(event Event, c *Client) error {
	c.palavras = strings.Split(string(event.Payload[1:len(event.Payload)-1]), ";")
	log.Println(c.palavras)
	for _, p :=range c.palavras {
		log.Println(p)
	}
	return nil
}

func ready(event Event, c *Client) error {
	c.ready = true
	all_clear := true
	for _,client := range c.sala.clientes {
		if !client.ready{
			all_clear = client.ready
		}
	}
	if all_clear{
		for _, client := range c.sala.clientes {
			evento_resposta := Event{
				Type: "ready",
				Payload: []byte(`"0;0"`),
				Author: "server",
			}
			EnviarPartePalavra(evento_resposta, client)
		}
	}
	
	return nil
}

func EnviarPartePalavra(event Event, c *Client) error {
	log.Println(string(event.Payload)[1:len(string(event.Payload))-1])
	resposta := strings.Split(string(event.Payload)[1:len(string(event.Payload))-1], ";")
	index_palavra, _ :=  strconv.Atoi(resposta[0])
	index_letra, _ := strconv.Atoi(resposta[1])
	for _, client := range c.sala.clientes {
		if client!=c {
			resposta := `"` +resposta[0]+";"+resposta[1]+";"+string(c.palavras[index_palavra][index_letra])+`"`
			evento_resposta := Event{
				Type: "dica",
				Payload:[]byte(resposta),
				Author: c.username,
			}
			client.egress <- evento_resposta
		}
	}
	return nil
}

func conferirPalavra(event Event, c *Client) error {
	log.Println(string(event.Payload))
	resposta := strings.Split(string(event.Payload)[1:len(string(event.Payload))-1], ";")
	index_palavra, _ :=  strconv.Atoi(resposta[0])
	index_letra, _ := strconv.Atoi(resposta[1])
	chute := resposta[2]
	log.Println(index_palavra, index_letra, chute)
	var evento_resposta Event
	var adversario *Client
	for _, client := range c.sala.clientes {
		if client!=c {
			adversario = client
		}
	}

	if chute == adversario.palavras[index_palavra] {
		log.Println("acertou!")
		if index_palavra+1<5 {
			envio := `"`+ strconv.Itoa(index_palavra+1)+";0"+`"`
			event.Payload = []byte(envio)
			log.Println(string(event.Payload))
			EnviarPartePalavra(event, adversario)
			return nil
		} else {
			evento_resposta = Event {
				Type:"veredito",
				Payload:[]byte(`"acertou;ACABOU!;`+adversario.palavras[4]+`"`),
				Author:"server",
			}
		}
	} else {
		log.Println("errou!", adversario.palavras[index_palavra], chute)
		if index_letra+1>= len(adversario.palavras[index_palavra]) {
			if (index_palavra+1)>= len(adversario.palavras){
				envio := `"`+strconv.Itoa(index_palavra+1)+";0"+`"`
				event.Payload = []byte(envio)
				EnviarPartePalavra(event, adversario)
				return nil
			} else {
				evento_resposta = Event {
					Type:"veredito",
					Payload:[]byte(`"errou;ACABOU!;`+adversario.palavras[4]+`"`),
					Author:"server",
				}
			}
			
		} else {
			envio := `"`+ strconv.Itoa(index_palavra)+";"+strconv.Itoa(index_letra+1)+`"`
			event.Payload = []byte(envio)
			log.Println(envio)
			EnviarPartePalavra(event, adversario)
			return nil
		}
	}

	for _ , client :=range c.sala.clientes {
		client.ready = false
		client.palavras = make([]string, 0)
		client.egress <- evento_resposta
	}
	return nil
}

