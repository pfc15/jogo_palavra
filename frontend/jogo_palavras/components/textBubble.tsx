import globals from "@/globals";
import React from "react";
import { View, StyleSheet, Text} from 'react-native';

interface TextBubbleProps {
    author: string,
    mensagem: string,
    send: boolean,
    hora: string,
    received: boolean
  }
  
//  
const TextBubble: React.FC<TextBubbleProps> = ({ author, mensagem, send, hora, received}) => {
    const styles = received? styles_received: styles_send
    return (
        <View style={styles.container}>
            <Text style={styles.author}> {author}</Text>
            <Text style={styles.mensagem}> {mensagem}</Text>
            <Text style={styles.data}>{hora}{send?"  enviou!":null}</Text>
        </View>
    )
}

const styles_received = StyleSheet.create({
    container: {
        width: '45%',
        // backgroundColor: '#70A3CC',
        backgroundColor: globals.accentColor,
        margin: 10,
        borderRadius: 2,
    },
    author: {
        fontWeight: 'bold',
        alignSelf: 'auto'
    },
    mensagem: {
        marginLeft: 10,
    },
    data: {
        color: 'grey',
        alignSelf: 'flex-end'
    }
})
const styles_send = StyleSheet.create({
    container: {
        width: '45%',
        // backgroundColor: '#90EE90',
        backgroundColor: globals.accentColor,
        margin: 10,
        borderRadius: 2,
        alignSelf: 'flex-end'
    },
    author: {
        fontWeight: 'bold',
        alignSelf: 'auto'
    },
    mensagem: {
        marginLeft: 10,
    },
    data: {
        color: 'grey',
        alignSelf: 'flex-end'
    }
})

export default TextBubble;