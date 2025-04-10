import { SafeAreaView, Text } from "react-native"
import MyStatusBar from "@/components/MyStatusBar"
import PlayerCard from "@/components/playerCard"

export default function() {
    return (
        <SafeAreaView>
            <PlayerCard nickname="testador" 
                image_path={"/home/pfc15/Documents/aleatorio/jogo_palavra/frontend/jogo_palavras/assets/images/favicon.png"}
                points={0}
                palavras={["", "", ""]}
            />
            <PlayerCard nickname="testador" 
                image_path={"/home/pfc15/Documents/aleatorio/jogo_palavra/frontend/jogo_palavras/assets/images/favicon.png"}
                points={0}
                palavras={["", "", ""]}
            /><PlayerCard nickname="testador" 
                image_path={"/home/pfc15/Documents/aleatorio/jogo_palavra/frontend/jogo_palavras/assets/images/favicon.png"}
                points={0}
                palavras={["", "", ""]}
            />
            <PlayerCard nickname="testador" 
                image_path={"/home/pfc15/Documents/aleatorio/jogo_palavra/frontend/jogo_palavras/assets/images/favicon.png"}
                points={0}
                palavras={["", "", ""]}
            />
        </SafeAreaView>
    )
}