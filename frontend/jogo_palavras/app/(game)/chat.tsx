import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, StyleSheet, Button, View } from "react-native";
import { useState } from 'react';
import MyStatusBar from '@/components/MyStatusBar';
import IconButton from "@/components/iconButton"
import TextBubble from "@/components/textBubble"
import { ScrollView } from 'react-native';
import globals from '@/globals';
import global_network from "@/connection/globals";
import Event from '@/connection/event';


type Message = {
    id: string,
    author: string,
    msg: string,
    hora: string,
    send: boolean,
    received: boolean
}

export default function chatroom() {
    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState<Message[]>([])

    function receiveText(payload:any, author:string|undefined) {
        if (global_network.network) {
            setMessages([...messages, {id:author+""+messages.length, author:author?author:"desconhecido", 
                msg: payload, hora:globals.currentTime(), send:true, received:true 
            }])
        }
    }
    global_network.network?.on("new_message", receiveText)


    function sendText() {
        var hora_agr = new Date()
        setMessages([...messages, {id:"eu"+""+messages.length,author:"eu", msg:msg, hora:globals.currentTime(), send:true, received:false}])
        console.log(messages)
        global_network.network?.sendMessage("send_message", msg)
        setMsg("")
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <MyStatusBar/>
            <ScrollView style={styles.chatText}>
                {messages!=null? messages.map((element) => (
                    <TextBubble key={element.id} author={element.author} mensagem={element.msg} send={element.send} hora={element.hora} received={element.received}/>
)):null}
            </ScrollView>
            <View style={{flexDirection: "row", marginTop:5}}>
            <TextInput style={styles.input} value={msg} onChangeText={setMsg}></TextInput>
            <IconButton iconName="send" estiloIcone={styles.icon} size={0.05} onPress={sendText} text={""} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    chatText: {
        flex:1,
        margin: 5
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globals.accentColor,
        flex:1,
        margin:5,
    },
    SafeAreaView: {
        width:'100%',
        height:'100%',
        justifyContent: 'flex-end',
    },
    input: {
        width:'90%',
        borderColor: 'grey',
        backgroundColor: 'white',
        borderWidth: 1,
    }
})
