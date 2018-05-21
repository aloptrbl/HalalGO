import { StyleSheet,PixelRatio,Dimensions } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize } = theme;

const screen = Dimensions.get('window');
var {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        marginBottom: 10
    },

    inputContainer:{
        width: windowWidth - 40,
        height: normalize(65),
        fontSize: fontSize.regular + 2,
        fontFamily: fontFamily.bold,
        borderBottomColor: "#A5A7A9"
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      avatar: {
        width: width,
        height: 250
      },
      container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
});

export default styles;