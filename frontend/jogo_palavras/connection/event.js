class Event {
    constructor(type, payload, username){
        this.author = username;
        this.type = type;
        this.payload = payload;
    }
}