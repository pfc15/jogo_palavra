import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import UserIcon from "./userIcon";
import globals from "@/globals";

interface playerCardInterface {
    nickname: string,
    points: number,
    image_path: string,
    palavras: string[],
    isOnline: boolean
}

const PlayerCard: React.FC<playerCardInterface> = ({nickname, points, image_path, palavras, isOnline}) => {
    const [isMenuVisible, setisMenuVisible] = useState(false)

    const toggleMenu = () =>{
        console.log("clicou", isMenuVisible)
        setisMenuVisible(!isMenuVisible)
    }
    
    return (
        <View style={{ marginBottom: isMenuVisible ? 0 : 8 }}>
        <TouchableOpacity style={styles.container} onPress={toggleMenu}>
            <UserIcon isOnline={isOnline} source={image_path} estilo={styles.image}/>
            <Text style={styles.nickname}>{nickname}</Text>
            <View style={styles.points}>
                <Icon name="trophy" color='black'style={{margin:5, fontSize:30}}/>
                <Text >{points}</Text>
            </View>
            
        </TouchableOpacity>
        {isMenuVisible&&(
            <View style={styles.dropdown}>
                <Text style={styles.palavras_dropdown}>1: {palavras[0]}</Text>
                <Text style={styles.palavras_dropdown}>2: {palavras[1]}</Text>
                <Text style={styles.palavras_dropdown}>3: {palavras[2]}</Text>
            </View>
        )}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: globals.accentColor,
        borderRadius: 15,
        margin:5
    },

    dropdown: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: -8, // Overlaps slightly with card for connected look
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    palavras_dropdown: {
        fontSize: 18,
        marginLeft:20,
        margin: 3,
    },

    image: {
        margin:10,
    },

    nickname: {
        flex:1,
        margin:10,
        fontSize:23
    },

    points: {
        width:'20%',
        height:'100%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
})

export default PlayerCard