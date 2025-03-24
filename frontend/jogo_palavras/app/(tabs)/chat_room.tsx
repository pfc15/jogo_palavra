import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, StyleSheet, Button, View } from "react-native";
import IconButton from "@/components/iconButton"
import TextBubble from "@/components/textBubble"

export default function chatroom() {
    var hora = new Date
    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.chatText}>
                <TextBubble author="aquele cara" mensagem="olá mundo!"  send={true}  hora={hora}/>
            </View>
            <View style={{flexDirection: "row", marginTop:5}}>
            <TextInput style={styles.input}></TextInput>
            <IconButton title={null} iconName="send" estiloIcone={styles.icon} size={0.025} onPress={() => console.log("Image Button Pressed!")} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    chatText: {
        flex:1,
        backgroundColor: "#f0f0f0",
        margin: 5
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        flex:1,
        margin:5,
    },
    SafeAreaView: {
        width:'100%',
        height:'100%',
        justifyContent: 'flex-end',
    },
    input: {
        flex:25,
        borderColor: 'grey',
        backgroundColor: 'white',
        borderWidth: 1,
    }
})
