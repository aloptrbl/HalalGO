import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 10
    },

    inputContainer:{
        width: windowWidth - 40,
        fontSize: fontSize.small + 2,
        fontFamily: fontFamily.bold,
        borderBottomColor: "#A5A7A9",
        borderBottomWidth: 0,
        marginTop: 8
    }
});

export default styles;