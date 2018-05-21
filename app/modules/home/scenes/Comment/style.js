import { StyleSheet,Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';
const screen = Dimensions.get('window');
var {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
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
    image: {
    width: width,
    height: height/2.5,
    marginTop: 20
    },
    header: {
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        paddingTop:10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: 'pink',
    },
    headerButton1: {
    fontSize: 40,
    },
    headerButton2: {
        fontSize: 40,
        },
        map: {
        width: width,
        height: height/2,
          },
          back: {
            marginLeft:15,
        },
});

export default styles;