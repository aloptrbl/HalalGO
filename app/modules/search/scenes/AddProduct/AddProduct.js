import React, {Component} from 'react';
var { View, StyleSheet, Alert,Text, TouchableOpacity, Image,ScrollView,ActivityIndicator } = require('react-native');
import RNFetchBlob from 'react-native-fetch-blob';
import {Button, SearchBar,Header,Input} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Form from "../../components/FormProduct"
import styles from "./style"
import { actions as auth, theme } from "../../../search/index"
const { signOut, createproduct} = auth;
const { color } = theme;


const error = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
}
  

class AddProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            error: error,
            isLoading: false,
            
         }
         this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        this.setState({isLoading: true});
        const { user } = this.props;
        data['uid'] = user.uid;
        data['submitfullname'] = user.fullname;
        data['submitimage'] = user.image;
        this.props.createproduct(data, this.onSuccess, this.onError)
    }


    onSuccess() {
        this.setState({isLoading: false});
        Actions.pop()
        alert("Please take note our staff will confirm your product information very soon.")
    }



    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }

  
    

      
    render() {
        return (
            <View style={styles.container}>
             {this.state.isLoading ? (
    <ActivityIndicator
      animating
      color="white"
      size="large"
      style={styles.activityIndicator}
    />
  ) : null}
            <ScrollView>
          <Form 
        onSubmit={this.onSubmit}
        error={this.state.error}/>
        </ScrollView>
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

export default connect(mapStateToProps,{ signOut, createproduct })(AddProduct);