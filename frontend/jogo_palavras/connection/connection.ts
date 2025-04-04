import Event from '@/connection/event';

type EventHandler = (payload: any, author?: string) => void;

class connection {
    private username: string;
    private sala: string;
    private url: string;
    public conn: WebSocket | null = null;
    private eventHandlers: Record<string, EventHandler> = {};
    public connected: boolean = false;

    constructor(username:string, sala:string, url:string) {
        this.username = username
        this.sala = sala
        this.connected = false
        this.url =url
        this.connect().catch(error => {
            console.error("Initial connection failed:", error);
        });
    }

    async connect(): Promise<WebSocket> {
        return new Promise((resolve, reject) => {
            try {
            const conn = new WebSocket("ws://" + this.url + "/ws"+`?username=${this.username}&sala=${this.sala}`);
            conn.onmessage = (evt) => {
                const eventData = JSON.parse(evt.data);
                var event = new Event(eventData.type, eventData.payload , eventData.author)
                this.routeEvent(event)
            }
            conn.onopen = () => {
                console.log("✅ conectado")
                this.connected = true
                resolve(conn)
            }

            conn.onerror = (error) => {
                console.error(error)
                // console.error("❌ connection failed")
                reject(conn)
            }

            conn.onclose = () => {
                this.connected = false
                console.log("conexão fechada")
            }
            this.conn = conn
        } catch (error) {
            console.error(error)
        }
        })
        
    }

    isConnected() {
        return this.connected
    }

    on(eventType:string, handler:EventHandler) {
        this.eventHandlers[eventType] = handler;
    }

    routeEvent(event:Event) {
        if (event.type === undefined) {
            console.error("no type field");
        }

        const handler = this.eventHandlers[event.type]
        if (handler) {
            handler(event.payload, event.author)
        } else {
            console.warn(`Sem função handler para o tipo de evento: ${event.type}`)
        }
    }

    sendMessage(eventType:string ,message:string){
        var msg = new Event(
            "eu",            
            eventType,
            message
        )

        this.conn?.send(JSON.stringify(msg))
        
    }
}

export default connection


