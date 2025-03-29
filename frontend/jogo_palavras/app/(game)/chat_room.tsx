import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, StyleSheet, Button, View } from "react-native";
import { useState } from 'react';
import MyStatusBar from '@/components/MyStatusBar';
import IconButton from "@/components/iconButton"
import TextBubble from "@/components/textBubble"
import { ScrollView } from 'react-native';
import globals from '@/globals';
// import global_network from "@/connection/globals"


type Message = {
    id: string,
    author: string,
    msg: string,
    hora: Date
}

export default function chatroom() {
    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState<Message[]>([])


    function sendText() {
        var hora_agr = new Date()
        setMessages([...messages, {id:"eu"+ hora_agr.toISOString(),author:"eu", msg:msg, hora:hora_agr}])
        console.log(messages)
        setMsg("")
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <MyStatusBar/>
            <ScrollView style={styles.chatText}>
                {messages!=null? messages.map((element) => (
                    <TextBubble key={element.id} author={element.author} mensagem={element.msg} send={true} hora={element.hora} received={false}/>
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
