import { StyleSheet,Platform,Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;


const resizeMode = 'contain';
const screen = Dimensions.get('window');
var {width,height} = Dimensions.get('window');
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
   
    marginLeft:15
    },
    product: {
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:15
    },
    back: {
        marginLeft:15,
    },
    MainContainer :{
    
        justifyContent: 'center',
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0
         
        },
         
        imageThumbnail: {
         
          justifyContent: 'center',
          alignItems: 'center',
          height: height/6
         
        },
      
        mainImage:{
         height: 200,
         width: width,
      
        },
      
        modalView:{
         flex:1,
         backgroundColor: 'white'
      
        },
      
        TouchableOpacity_Style:{
         top:10, 
         left:15, 
         position: 'absolute'
      
     },
     map: {
        width: width,
        height: 200,
        marginTop:15
      },
      activityIndicator: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: '50%',
position:'absolute',
zIndex: 1,
backgroundColor: 'white'
      }
});

export default styles;