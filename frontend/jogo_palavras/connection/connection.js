import {Event} from '@/connection/event';

class connection {

    constructor(username, sala, url) {
        this.username = username
        this.sala = sala
        this.url =url
        this.conn = this.connect()
        this.eventHandler = {}
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
            var conn = new WebSocket("ws://" + this.url + "/ws"+`?username=${this.username}&sala=${this.sala}`);
            conn.onmessage = function(evt) {
                const eventData = JSON.parse(evt.data);
                last_evnt = eventData
                var event = new Event(eventData.type, eventData.payload , eventData.author)
                this.routeEvent(event)
            }
            conn.onopen = () => {
                console.log("✅ conectado")
                resolve(conn)
            }

            conn.onerror = (error) => {
                console.error(error)
                // console.error("❌ connection failed")
                reject(conn)
            }

            conn.onclose = () => {
                console.log("conexão fechada")
            }
        } catch (error) {
            console.error(error)
        }
        })
        
    }

    on(eventType, handler) {
        this.eventHandler[eventType] = handler;
    }

    routeEvent(event) {
        if (event.type === undefined) {
            console.error("no type field");
        }

        const handler = this.eventHandler[event.type]
        if (handler) {
            handler(event.payload, event.author)
        } else {
            console.warn(`Sem função handler para o tipo de evento: ${event.type}`)
        }
    }
}

export default connection


