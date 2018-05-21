import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { auth, database, provider, storage } from "../../config/firebase";
import RNFetchBlob from 'react-native-fetch-blob';
import { View, TouchableOpacity,Text,Image } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { isEmpty } from '../../utils/validate'
import styles from "./styles"

class AuthImagePicker extends Component {
    state = {
        image: '',
        user: '', 
        
      };

      selectPhotoTapped() {
        const options = {
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
            this.setState({ image: '' });

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
            const sessionId = new Date().getTime();
            JSON.stringify(user);
            let image = JSON.stringify(user.image);
            let rnfbURI = RNFetchBlob.wrap(image);
            const imageRef =  storage
            .ref('images')
            .child(user.uid);
               // create Blob from file path
          Blob.build(rnfbURI, { type : 'image/jpeg;'})
         .then((blob) => {
                   // upload image using Firebase SDK
             return imageRef
             .put(blob, { contentType : 'image/jpeg' })
          }) 
          .then((blob) => {
             imageRef.getDownloadURL().then(function(url) {
              this.setState({ image: url })
              })
            
            
          }) 
           
          }
        });
      }
    

      
      
      updateUser = (user) => {
         this.setState({ user: user })
      }

      constructor(props) {
        super(props)
        this.state = {
         image: '',
        }
      }
    
    
    render() {
        const { showLabel, placeholder, autoFocus, onChangeText, secureTextEntry,disabled} = this.props;

        return (
            <View style={styles.container}>
                {
                    (showLabel) &&
                    <FormLabel>{this.props.label}</FormLabel>
                }
                 <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
             <View style={[styles.avatar, styles.avatarContainer]}>
             { 
               <Image resizeMode="contain" style={styles.avatar}
               source={[this.state.image == '' ? {uri:'http://jis.gov.jm/media/blank.png'} : this.state.image]}
               />
             }
              </View>
           </TouchableOpacity>
                {
                    (!isEmpty(this.props.error)) &&
                    <FormValidationMessage>
                        {this.props.error}
                    </FormValidationMessage>
                }
            </View>
        );
    }
}

AuthImagePicker.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    onChangeText: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
}

AuthImagePicker.defaultProps = {
    disabled: true,
    autoFocus: false,
    secureTextEntry: false
}

export default AuthImagePicker;