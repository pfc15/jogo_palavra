import { useEffect, useState } from "react"
import {Text, StyleSheet, TextInput, View, StatusBar, StatusBarStyle, Button, ScrollView} from "react-native"
import IconButton from "@/components/iconButton"
import globals from "@/globals"
import global_network from "@/connection/globals"
import Event from "@/connection/event"
import { SafeAreaView } from "react-native-safe-area-context"


export default function() {
    const [palavras, setPalavras] = useState<string[]>(Array(5).fill(""))
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    var index_palavra = 0
    var index_letra = 0
    var chute_palavra = ""



    function receivePalavra(payload: string, author: string|undefined) {
        var respostas = payload.split(";")
        if (index_palavra!== Number(respostas[0])) {
            var aux = [...palavras]
            aux[index_palavra+1] = respostas[2]
            setPalavras(aux)
            chute_palavra = respostas[2]
        } 
    }

    function teste(){
        console.log(isPlaying)
    }

    function setIndexPalavra(text:string, index:number) {
        if ((!isPlaying) || (index ===index_palavra && text.slice(0,index_letra) == chute_palavra)){
            var aux = [...palavras]
            aux[index] = text
            setPalavras(aux)
        }
        
    }

    function sendPalavra() {
        var payload = palavras.join(";")
        global_network.network?.sendMessage("palavras", payload)
        setPalavras(["","","","",""])
        setIsPlaying(true)
    }


    return (
        <ScrollView contentContainerStyle={styles.view}>
            <StatusBar
                backgroundColor='black'
                hidden={false}
            />
        <Text style={styles.title}>Coloque as suas 5 palavras e comece a jogar!</Text>

        {
            [...Array(5).keys()].map(i =>(
                <View style={styles.input_view}>
                    <Text style={styles.label}> palavra {i}</Text>
                    <TextInput 
                        key={i}
                        value={palavras[i]}
                        onChangeText={(newText) => setIndexPalavra(newText, i)}
                        style={styles.input}
                    />
                </View>
            ))
        }
        <IconButton
            iconName="send"
            size={0.05}
            estiloIcone={styles.button}
            onPress={sendPalavra}
            text={"enviar Palavras"}
        />
        <Button onPress={teste} title="teste"/>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    view: {
        flexGrow:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    button: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 10,
        right: 0,
        backgroundColor: globals.accentColor,
        margin: 10,
        borderRadius: 10,
    },
    input_view: {
        alignItems: 'center',
        width:'85%'
    },
    input: {
        borderColor: globals.accentColor,
        borderWidth: 1,
        padding: 2,
        backgroundColor: 'white',
        margin: 10,
        height: 40,
        width:'70%',
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 25,
        padding: 7,
        backgroundColor: globals.accentColor,
        borderRadius: 10
    },
    text: {
        color: 'white'
    },
    label: {
        backgroundColor: globals.accentColor,
        padding:7,
        borderRadius: 10,
    }
})