import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, Dimensions } from "react-native";
import globals from "@/globals"

interface IconButtonProps {
    iconName: string;
    size: number;
    estiloIcone: ViewStyle;
    text: string|null;
    onPress: () => void;
  }
  
//  
const IconButton: React.FC<IconButtonProps> = ({ iconName, size, estiloIcone, onPress, text=null}) => {
    const buttonSize = Dimensions.get('window').width * size;
    return (
        <TouchableOpacity style={[estiloIcone, {overflow:'hidden'}]} onPress={onPress}>
            <View style={{alignItems:'center'}}>{text===""?null:
                <Text style={styles.buttonText}>{text}</Text>
            }
            <Icon name={iconName} color='black' style={styles.icon} />
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: {
        margin:5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        margin: 7,
        marginBottom: 3,
    },

});

export default IconButton