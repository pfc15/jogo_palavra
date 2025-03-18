import {Event} from '@/connection/event';

class connection {

    constructor(username, sala, url) {
        this.username = username
        this.sala = sala
        this.url =url
        this.conn = this.connect()
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

    routeEvent(event) {
        if (event.type === undefined) {
            console.error("no type field");
        }

        switch(event.type) {
            case "new_message":
                break;
            case "ready":
                break;
            case "dica":
                break;
            case "veredito":
                break;
            default:
                break;
        }
    }
}

export default connection


