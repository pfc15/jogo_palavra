import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, Dimensions } from "react-native";


interface IconButtonProps {
    title: string|null;
    iconName: string;
    size: number;
    estiloIcone: ViewStyle;
    onPress: () => void;
  }
  
//  
const IconButton: React.FC<IconButtonProps> = ({ title, iconName, size, estiloIcone, onPress}) => {
    const buttonSize = Dimensions.get('window').width * size;
    return (
        <TouchableOpacity style={[estiloIcone]} onPress={onPress}>
            
            
            <Icon name={iconName} color="#fff" style={styles.icon} />
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: {
        margin:5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },

});

export default IconButton