import { SafeAreaView, Text } from "react-native"
import MyStatusBar from "@/components/MyStatusBar"

export default function() {
    return (
        <SafeAreaView>
            <MyStatusBar/>
            <Text>olá mundo</Text>
        </SafeAreaView>
    )
}