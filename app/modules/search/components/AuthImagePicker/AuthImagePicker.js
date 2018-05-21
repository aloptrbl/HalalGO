import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { View,TouchableOpacity,Image,Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../../utils/validate'
import styles from "./styles"

class AuthImagePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageSource: null,
         }
    }  
   
    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              imageSource: source,
              data: response.data
            });
          }
        });
      }
    render() {
        const { imageSource } = this.props;

        return (
            <View style={styles.container}>
 <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
             <View style={[styles.avatar, styles.avatarContainer]}>
             { 
               <Image resizeMode="contain" style={styles.avatar}
               source={[imageSource == null ? {uri:'http://jis.gov.jm/media/blank.png'} : imageSource]}
               />
             }
             </View>
           </TouchableOpacity>
            </View>
        );
    }
}

AuthImagePicker.propTypes = {
    imageSource: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    shake: PropTypes.bool,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
}

AuthImagePicker.defaultProps = {
    autoFocus: false,
    secureTextEntry: false,
    shake: false,
}

export default AuthImagePicker;