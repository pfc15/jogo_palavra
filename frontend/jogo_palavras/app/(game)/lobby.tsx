import { StyleSheet,SafeAreaView, Text, Button } from "react-native"
import MyStatusBar from "@/components/MyStatusBar"
import PlayerCard from "@/components/playerCard"
import global_network from "@/connection/globals";
import { useState } from "react"
import { Colors } from "react-native/Libraries/NewAppScreen";

type  Player= {
    nickname: string,
    image: string,
    isOnline: boolean,
    palavras: string[],
    pontos: number
}

export default function() {
    let new_player = {
        nickname: "pedro",
        image: "/home/pfc15/Documents/aleatorio/jogo_palavra/frontend/jogo_palavras/assets/images/react-logo.png",
        isOnline: true,
        palavras: ["primeiro", "segundo", "terceiro", "quarto", "quinto"],
        pontos:10
    }
    const  [players, setPlayers] = useState<Map<string, Player>>(new Map().set("oi", new_player))
    
    function getPlayers(payload:any, author:string|undefined){
        var lista_payload  = payload.splt(";")
        let new_player = {
            nickname: lista_payload[0],
            image: lista_payload[1],
            isOnline: lista_payload[2]=="online",
            palavras: lista_payload.slice(3),
            pontos:lista_payload[3]
        }
        var copy_players = players
        copy_players.set(new_player.nickname, new_player)
        setPlayers(copy_players)
    }
    global_network.network?.on("InfoPlayer", getPlayers)

    function addPlayer(){
        let new_player = {
            nickname: "pedro",
            image: "/home/pfc15/Documents/aleatorio/jogo_palavra/frontend/jogo_palavras/assets/images/react-logo.png",
            isOnline: true,
            palavras: ["primeiro", "segundo", "terceiro", "quarto", "quinto"],
            pontos:0
        }
        var copy_players = new Map(players)
        copy_players.set(new_player.nickname, new_player)
        setPlayers(copy_players)
        console.log(players)
    }


    return (
        <SafeAreaView>
            <Button title="add player"
                            onPress={addPlayer}
                            />
            {
                [...players.entries()].map(([nickname, jogador]) =>(
                    <PlayerCard nickname={nickname} points={jogador.pontos} image_path={jogador.image} 
                    palavras={jogador.palavras} isOnline={jogador.isOnline}/>
                ))
            }
            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    teste: {
        backgroundColor: 'yellow',
        margin:10
    }
})