import { StyleSheet,PixelRatio,Dimensions } from 'react-native';

import { theme } from "../../index"
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const screen = Dimensions.get('window');
var {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
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
    wrapper:{
        justifyContent:"center",
        alignItems:"center"
    },

    errorText:{
        color: color.red,
        width: (windowWidth - 45),
        marginTop: 20,
    },

    containerView:{
        marginVertical: padding * 3,
        width: windowWidth - 40
    },

    socialButton:{
        height: normalize(55),
        borderRadius:4,
        marginTop:0,
        marginBottom:0
    },

    button:{
        backgroundColor: "#FF553F",
        height: normalize(55)
    },

    buttonText:{
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.medium
    },

    forgotText:{
        textAlign:"center",
        color:color.black,
        marginBottom: padding,
        fontSize: fontSize.regular,
        fontFamily: fontFamily.medium,
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
          avatarContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            
          },
          avatar: {
            width: width/2,
            marginTop:15,
            height: 180,
            borderRadius: width/2,
            alignSelf:'center',
            marginBottom:15
          }
});


export default styles;