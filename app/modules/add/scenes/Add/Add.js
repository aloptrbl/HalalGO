import React from 'react';
var { View, StyleSheet, Alert,Text,TouchableOpacity,StatusBar } = require('react-native');
import Icons from 'react-native-vector-icons/Feather';
import Iconx from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import { RNCamera } from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';
import styles from "./styles"

import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;
const flashModeOrder = {
    off: 'on',
  on: 'off',
  };

class Add extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            type: 'back',
            flash: 'off',
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

         <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            type={this.state.type}
            AutoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={this.state.flash}
            ratio={'1:1'}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',position:'absolute',bottom:0,alignSelf:'center'}}>
        <TouchableOpacity
            onPress={this.toggleFlash.bind(this)}
            style = {styles.capture}
        >
        
<Icon name={this.state.flash === 'off' ? 'flash-off' : 'flash'} style = {styles.flashbutton} />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
<Icons name="circle" style = {styles.capturebutton} />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={this.toggleFacing.bind(this)}
            style = {styles.capture}
        >
<Iconx name={this.state.type === 'back' ? 'ios-reverse-camera-outline' : 'ios-reverse-camera'} style = {styles.facingbutton} />
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }


  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 1.0, base64: true, skipProcessing: true,   };
      const data = await this.camera.takePictureAsync(options)
        ImageResizer.createResizedImage(data.uri, 800, 600, 'JPEG', 80)
        .then(({uri}) => {
            Actions.Edit({data: uri}); 
        })   

    }
  };


    }




function mapStateToProps(state) {
    return {
        user: state.authReducer.user
        }
    }

    function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps,{ signOut })(Add);