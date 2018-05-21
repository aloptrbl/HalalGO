import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white
    },
  
    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },

    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
    title: {
    fontSize: 20,
    marginTop:15,
    marginLeft:15
    },
    product: {
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:15
    }
});

export default styles;