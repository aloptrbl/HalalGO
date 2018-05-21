import { StyleSheet,PixelRatio,Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';
const screen = Dimensions.get('window');
var {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.white,
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
    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
      avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
      },
      avatar: {
        width: width,
        height: 250
      },
      activityIndicator: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: '50%',
position:'absolute',
zIndex: 1,
backgroundColor: 'rgba(0, 0, 0, 0.52)'
      }
});

export default styles;