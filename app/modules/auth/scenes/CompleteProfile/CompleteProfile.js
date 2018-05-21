import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View,TouchableOpacity,Text,StyleSheet,PixelRatio,Platform,Dimensions,Image,ActivityIndicator } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';
import { actions as auth } from "../../index"
import {  storage } from "../../../../config/firebase";
const { createUser } = auth;
const screen = Dimensions.get('window');
var {width,height} = Dimensions.get('window');
import Form from "../../components/FormCompleteProfile"
console.disableYellowBox = true

const error = {
    general: "",
    fullname: ""
}


class CompleteProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error,
            value: '',
            imageSource: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        this.setState({isLoading: true});
        //attach user id
        const { user } = this.props;
        data['uid'] = user.uid;
        data['email'] = user.email;
        this.props.createUser(data, this.onSuccess, this.onError)
        
        
    }

    onSuccess(user) {
        this.setState({isLoading: false});
     alert('Success');
    Actions.Main();
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({error: errObj});
    }
    state = {
        imageSource: '',
        user: '', 
        
      };
      
      
      updateUser = (user) => {
         this.setState({ user: user })
      }


    render() {
        return (
           <View style={{flex:1,flexDirection:'column'}}>
          {this.state.isLoading ? (
    <ActivityIndicator
      animating
      color="white"
      size="large"
      style={styles.activityIndicator}
    />
  ) : null}
           <View style={{flex:1,backgroundColor:'white'}}>
                <Form
                      onSubmit={this.onSubmit}
                      buttonTitle={"CONTINUE"}
                      error={this.state.error}/>
            </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container:{
        marginBottom: 10
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


export default connect(null, { createUser})(CompleteProfile);