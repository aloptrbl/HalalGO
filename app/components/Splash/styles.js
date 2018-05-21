import { StyleSheet } from 'react-native';

import { color, fontFamily, padding, fontSize, fontHeader } from "../../styles/theme"

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FF553F",
    },

    wrapper:{
        paddingHorizontal:15,
        paddingBottom: padding * 2,
        justifyContent:"center",
        alignItems:"center",
        
    },

    image:{
        height: 100,
        width: 100,
        marginBottom: padding,
        resizeMode
    },

    title:{
        fontSize: fontSize.large + 20,
        lineHeight: fontSize.large + 24,
        fontFamily: fontHeader.regular,
        color:color.white,
        letterSpacing: 1
    },

    subText:{
        color: "#414141",
        fontSize: fontSize.large,
        lineHeight: fontSize.large + 10,
        marginVertical:padding * 2
    },

    activityIndicatorContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 16,
        height: 50
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});


export default styles;