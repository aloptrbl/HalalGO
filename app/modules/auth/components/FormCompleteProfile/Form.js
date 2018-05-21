import React from 'react';
import PropTypes from 'prop-types'

import {Text, View,TouchableOpacity,Image, Dimensions,StatusBar} from 'react-native';
import {Button,Header,Input,CheckBox} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {isEmpty, validate2} from '../../utils/validate'
import {Actions} from 'react-native-router-flux';
import styles from "./styles"
import AuthTextInput from "../AuthTextInput"
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import MapView from 'react-native-maps';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
class Form extends React.Component {
    constructor(props) {
        super(props);
        //bind functions
        this.state = {
           image: '',
           fullname: '',
          }
        this.onSubmit = this.onSubmit.bind(this);
    }

    selectPhotoTapped() {
        ImagePicker.showImagePicker({}, (response) => {
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              image: response.uri
            });
        });
      }

    
  

    

    onSubmit() { 
      const data = this.state;
      data['image'] = this.state.image;
      const result = validate2(data);
      if (!result.success) this.setState({error: result.error});
      else this.props.onSubmit(data);
    }




   
    

    render() {
        
        return (
           <View style={{flex:1,backgroundColor:'white'}}>
                             <TouchableOpacity transparent onPress={this.selectPhotoTapped.bind(this)}>
             <View style={[styles.avatarContainer,styles.avatar]}>
               <Image resizeMode="cover" style={styles.avatar}
                source={[this.state.image == '' ? {uri:'http://jis.gov.jm/media/blank.png'} : { uri: this.state.image }]}
               />

              </View>
           </TouchableOpacity>
           <AuthTextInput
                                placeholder="Fullname"
                                value={this.state.fullname}
                                onChangeText={ text => this.setState({ fullname : text }) }
                                type="text"
                                />
           <Button
                        raised
                        title="Continue"
                        borderRadius={4}
                        containerViewStyle={styles.containerView}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.onSubmit}/>
           </View>
          
        );
    }
}



export default Form;