import React from 'react';
var { View, StyleSheet, Alert,Text,PermissionsAndroid} = require('react-native');

import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Map from '../../components/Map';
import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;

class Navigate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: ''
         }
         
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        Actions.reset("Auth")
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

    render() {
        return (
            <View style={styles.container}>
      <Map />    
               
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.authReducer.user
        }
    }

    function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps,{ signOut })(Navigate);