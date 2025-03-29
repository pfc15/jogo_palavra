import { StatusBar } from "react-native"


interface StatusBarInterface {

}


const MyStatusBar: React.FC<StatusBarInterface> =  ({}) =>{
    return (
    <StatusBar
        backgroundColor='black'
        hidden={false}
    />)
}

export default MyStatusBar