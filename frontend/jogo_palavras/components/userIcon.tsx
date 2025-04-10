import globals from '@/globals';
import { View, StyleSheet, Image, ImageSourcePropType, ViewStyle} from 'react-native';


interface userIconInterface {
    source:string;
    size?:number;
    estilo?: ViewStyle;
    isOnline: boolean
}

const UserIcon: React.FC<userIconInterface> = ({source, isOnline, estilo=null, size=60}) => {

    return (
        <View style={[styles.container, estilo ]}>
          {/* <Image source={source} style={[{ width: size, height: size, borderRadius: size / 2 }]} /> */}
          <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor:'white'}}>
          <Image 
        //   source={require(source)}
          source={require("/home/pfc15/Documents/aleatorio/jogo_palavra/frontend/jogo_palavras/assets/images/favicon.png")}
          style={[{ width: size, height: size, borderRadius: size / 2 }]}
          />
          </View>
            <View
                style={isOnline?styles.ponto_online:styles.ponto_desconectado}
            />
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        overflow: 'hidden',
    },
    image: {
      resizeMode: 'cover',
      backgroundColor: 'white'
    },

    ponto_online: {
        position:'absolute',
        right:0,
        bottom:0,
        width: 12,
        height:12,
        borderRadius:12,
        borderWidth:2,
        borderColor:'#4CAF50',
        backgroundColor:'#4CAF50'
    },

    ponto_desconectado: {
        position:'absolute',
        right:0,
        bottom:0,
        width: 12,
        height:12,
        borderRadius:12,
        borderWidth:2,
        borderColor:'#F44336',
        backgroundColor:'#F44336'
    }
  });

export default UserIcon