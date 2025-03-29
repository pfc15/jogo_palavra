import { useState } from "react"
import {Text, StyleSheet, TextInput, View, StatusBar, StatusBarStyle} from "react-native"
import IconButton from "@/components/iconButton"
import globals from "@/globals"
import { SafeAreaView } from "react-native-safe-area-context"

const STYLES = ['default', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const


export default function() {
    const [sentPalavra, setSentPalavra] = useState<boolean>(true)
    const [palavras, setPalavras] = useState<string[]>(Array(5).fill(""))


    function setIndexPalavra(text:string, index:number) {
        var aux = [...palavras]
        aux[index] = text
        setPalavras(aux)
    }

    function sendPalavra() {
        console.log('oi', palavras)
        setSentPalavra(!sentPalavra)
    }

    function volta(){
        setSentPalavra(!sentPalavra)
    }
    return (
        <>{ sentPalavra ? 
        (
        <SafeAreaView style={styles.view}>
            <StatusBar
                backgroundColor='black'
                hidden={false}
            />
        <Text style={styles.label}>palavra 1</Text>
        <TextInput value={palavras[0]} 
        onChangeText={(newText) =>setIndexPalavra(newText, 0)}
        style={styles.input}
        />
        <Text style={styles.label}>palavra 2</Text>
        <TextInput value={palavras[1]} 
        onChangeText={(newText) =>setIndexPalavra(newText, 1)}
        style={styles.input}
        />
        <Text style={styles.label}>palavra 3</Text>
        <TextInput value={palavras[2]} 
        onChangeText={(newText) =>setIndexPalavra(newText, 2)}
        style={styles.input}
        />
        <Text style={styles.label}>palavra 4</Text>
        <TextInput value={palavras[3]}
        onChangeText={(newText) =>setIndexPalavra(newText, 3)}
        style={styles.input}
        />
        <Text style={styles.label}>palavra 5</Text>
        <TextInput value={palavras[4]} 
        onChangeText={(newText) =>setIndexPalavra(newText, 4)}
        style={styles.input}
        />
        <IconButton
            iconName="send"
            size={0.05}
            estiloIcone={styles.button}
            onPress={sendPalavra}
            text={"enviar Palavras"}
        />
        </SafeAreaView>)
        :(<View style={styles.view}>
            <Text style={styles.text}>adeus mundo</Text>
        <IconButton
            iconName="send"
            size={0.05}
            estiloIcone={styles.button}
            onPress={volta}
            text={"enviar Palavras"}
        /></View>)
        }</>
    )
}


const styles = StyleSheet.create({
    view: {
        flex:1,
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
    input: {
        borderColor: globals.accentColor,
        borderWidth: 1,
        padding: 2,
        backgroundColor: 'white',
        margin: 10,
        height: 40,
        width:'70%',
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