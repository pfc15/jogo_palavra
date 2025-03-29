import { useEffect, useState } from "react";
import global_network from "@/connection/globals";
import connection from "@/connection/connection";
import MyStatusBar from "@/components/MyStatusBar";
import { useRouter } from "expo-router"; 

import { Text, ActivityIndicator, Button, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [room, setRomm] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    
    function sendInfo() {
        try {
            setLoading(false)
            global_network.network = new connection(username, room, global_network.ip)
            console.log(`username: ${username}, room: ${room},password: ${password}, `)
            router.navigate("../(game)")
        }catch (error) {
            console.error(error)
            return
        }
        
    }

    function changeLoader() {
        router.navigate("../(game)")
    }

    


    return (
        
        <SafeAreaView style={styles.tela}>
            <MyStatusBar/>
            <Text style={styles.title}>Nova página de teste</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholderTextColor='grey' placeholder="adicione aqui seu texto"></TextInput>
            <Text style={styles.label}>room</Text>
            <TextInput style={styles.input} value={room} onChangeText={setRomm} placeholderTextColor='grey' placeholder="adicione aqui seu texto"></TextInput>
            <Text style={styles.label}>password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholderTextColor='grey' placeholder="adicione aqui seu texto"></TextInput>

            {loading? (
                <ActivityIndicator size='large' color='#5555'/>
            ): (
                <Button
                    title="Connect"
                    onPress={sendInfo}
                />)
            }

            <Button title="go to game"
                onPress={changeLoader}
                />
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    tela: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        margin:20,
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        height: 40,
        width:'80%',
        color: 'white',
        margin: 10,
    },
    label: {
        color:'#ffff',
    }
  });
  