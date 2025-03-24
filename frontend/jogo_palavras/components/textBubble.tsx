import React from "react";
import { View, StyleSheet, Text} from 'react-native';

interface TextBubbleProps {
    author: string,
    mensagem: string,
    send: boolean,
    hora: Date,
  }
  
//  
const TextBubble: React.FC<TextBubbleProps> = ({ author, mensagem, send, hora}) => {
    return (
        <View style={styles.container}>
            <Text> {author}</Text>
            <Text> {mensagem}</Text>
            {send?<Text>enviou!</Text>:null}
            <Text>{hora.toISOString()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '40%',
        backgroundColor: '#70A3CC',
        margin: 5,
        borderRadius: '2%',
    },
})

export default TextBubble;