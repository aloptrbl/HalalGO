import { StyleSheet,Platform,Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;
const screen = Dimensions.get('window');
var {width,height} = Dimensions.get('window');
const resizeMode = 'contain';

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
        alignItems:"center",
        
    },
    
    profileheader: {
        justifyContent:"center",
        alignItems:"center",
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,

    },
    profile: {
    flexDirection: 'column'
    },
    profilename: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.regular,
    fontWeight: 'bold',
    marginLeft: 12
    },
    profileaddress: {
        fontFamily: fontFamily.regular,
        fontSize: fontSize.regular - 2,
        fontWeight: '400',
        marginLeft: 12,
        color: '#c0beb3',
        paddingRight: -15,
        },
    profiletab: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#eae5e5',
        borderBottomWidth: 1,
        borderBottomColor: '#eae5e5',
        marginTop: 10,
        paddingBottom: 5,
        paddingTop: 5
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
             height: height,
             width: width,
          
            },
          
            modalView:{
          
             flex:1,
             backgroundColor: 'rgba(0,0,0,0.4)'
          
            },
          
            TouchableOpacity_Style:{
          
             width:25, 
             height: 25, 
             top:9, 
             right:9, 
             position: 'absolute'
          
         }
            
});

export default styles;