import React from 'react';
var { View, StyleSheet, Alert,Text,TouchableOpacity,StatusBar,Image,ActivityIndicator } = require('react-native');
import Icon from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'react-native-fetch-blob';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Button,Header,FormLabel, FormInput} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { RNCamera } from 'react-native-camera';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import styles from "./styles"
import Modal from 'react-native-modalbox';
import { actions as auth, theme } from "../../../add/index"
import FormAdd from "../../components/FormAdd"
const { signOut, createpost } = auth;
import {  storage,database } from "../../../../config/firebase";
import ImageResizer from 'react-native-image-resizer';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const { color } = theme;
import FastImage from 'react-native-fast-image'
import moment from 'moment';
const error = {
  general: "",
}

class Edit extends React.Component {
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
  storage.ref('images').child(user.uid).getDownloadURL()
  .then((url) =>  {
  data['userimage'] = url;
        })    
        .catch(function(error) {
          // Handle any errors here
        });
  data['uid'] = user.uid;
  data['image'] = this.props.data;
  data['fullname'] = user.fullname;
  data['likescount'] = 0;
  data['commentscount'] = 0;
  data['timestamp'] = moment().format();
  this.props.createpost(data, this.onSuccess, this.onError)
}


onSuccess() {
  this.setState({isLoading: false});
  Actions.popAndPush('Home');
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
 <FormAdd 
 uri={this.props.data}
 onSubmit={this.onSubmit}
 error={this.state.error}
 />
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

export default connect(mapStateToProps,{ signOut,createpost })(Edit);