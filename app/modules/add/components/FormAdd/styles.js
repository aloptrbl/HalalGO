import { StyleSheet,PixelRatio,Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;
const screen = Dimensions.get('window');
var {width,height} = Dimensions.get('window');
const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
      },
      capture: {
        flex: 0,
        backgroundColor: 'transparent',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
      },
      facingbutton: {
          color: 'white',
          fontSize: 50
      },
      flashbutton: {
        color: 'white',
        fontSize: 40
    },
    capturebutton: {
        color: 'white',
        fontSize: 60
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
    image: {
        width: width,
        height: height,
    },
    button: {
		padding: 10,
		position: 'absolute',
		top: 20,
		right: 10,
		backgroundColor: '#fff',
    },
    modal: {
        justifyContent: 'flex-start',
      },
      modal4: {
        height: width/2
      },  
      modal5: {
        height: '100%'
      },  

});

export default styles;