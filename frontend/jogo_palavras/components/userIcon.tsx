import { View, StyleSheet, Image, ImageSourcePropType, ViewStyle} from 'react-native';


interface userIconInterface {
    source:string;
    size?:number;
    estilo?: ViewStyle;
}

const UserIcon: React.FC<userIconInterface> = ({source, estilo=null, size=60}) => {

    return (
        <View style={[styles.container, estilo, { width: size, height: size, borderRadius: size / 2 }, ]}>
          {/* <Image source={source} style={[{ width: size, height: size, borderRadius: size / 2 }]} /> */}
          <Image 
        //   source={require(source)}
          source={require("/home/pfc15/Documents/aleatorio/jogo_palavra/frontend/jogo_palavras/assets/images/favicon.png")}
          style={[{ width: size, height: size, borderRadius: size / 2 }]}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        overflow: 'hidden',
    },
    image: {
      resizeMode: 'cover',
    },
  });

export default UserIcon