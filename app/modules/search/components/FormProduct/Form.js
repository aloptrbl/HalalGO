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
import moment from 'moment';
const ASPECT_RATIO = width / height;
class Form extends React.Component {
    constructor(props) {
        super(props);
        //bind functions
        this.state = {
            productreview: '',
            productname: '',
            productsupplier: '',
           productprice: '',
           productcategory: '',
           productcountry: '',
           productstate: '',
           timestamp: moment().format(),
           image: null,
           status: false,
           error: null,

          }
        this.onSubmit = this.onSubmit.bind(this);
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
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              image: response.uri
            });
        });
      }

    
      onRegionChange(region) {
        this.setState({ region });
      }

    

    onSubmit() {
        const data = this.state;
        const result = validate2(data);
        if (!result.success) this.setState({error: result.error});
        else this.props.onSubmit(data);
    }

   


   
    

    render() {
        
        return (
            <View style={styles.container}>
            <StatusBar
     backgroundColor="#1abc9c"
     barStyle="light-content"
   />
             <Header style={{}} innerContainerStyles={{}} outerContainerStyles={{height: 45,backgroundColor: '#1abc9c',borderBottomColor:'transparent'}}
  leftComponent={<TouchableOpacity onPress={Actions.pop}>
  <Text style={{marginBottom:-12,color:'white'}}><Icon style={styles.headerButton1} name="ios-arrow-round-back" /></Text>
  </TouchableOpacity>}
  centerComponent={<Text style={{marginBottom:-3,color:'white'}}>Add New product</Text>}
  rightComponent={<TouchableOpacity onPress={this.onSubmit}><Text style={{marginBottom:-12,color:'white'}}>
    <Icon style={styles.headerButton2} name="ios-checkmark-outline" />
    </Text></TouchableOpacity>}
/>   
                <View style={styles.wrapper}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
             <View style={[styles.avatar, styles.avatarContainer]}>
             { 
               <Image resizeMode="contain" style={styles.avatar}
               source={[this.state.image == null ? {uri:'http://jis.gov.jm/media/blank.png'} : { uri: this.state.image }]}
               />
             }
             </View>
           </TouchableOpacity>

                      
                      <AuthTextInput
                      multiline={true}
                                placeholder="Review"
                                value={this.state.productreview}
                                onChangeText={ text => this.setState({ productreview : text }) }
                                type="text"
                                numberOfLines={5}
                                />
    
                                <AuthTextInput
                                placeholder="Product Name"
                                value={this.state.productname}
                                type="text"
                                onChangeText={ text => this.setState({ productname : text }) }
                                />
                                  <AuthTextInput 
                                placeholder="Product Supplier"
                                value={this.state.productsupplier}
                                type="text"
                                onChangeText={ text => this.setState({ productsupplier : text }) }
                                />
                                     <AuthTextInput 
                                placeholder="Product Category"
                                value={this.state.productcategory}
                                type="text"
                                onChangeText={ text => this.setState({ productcategory : text }) }
                                />
                                <AuthTextInput 
                                placeholder="Product State"
                                value={this.state.productstate}
                                type="text"
                                onChangeText={ text => this.setState({ productstate : text }) }
                                />
                                <AuthTextInput 
                                placeholder="Product Country"
                                value={this.state.productcountry}
                                type="text"
                                onChangeText={ text => this.setState({ productcountry : text }) }
                                />
                         
                                  <AuthTextInput 
                                placeholder="Product Price"
                                value={this.state.productprice}
                                keyboardType = 'numeric'
                                maxLength={11}
                                onChangeText={ text => this.setState({ productprice : text }) }
                                />

            


                </View>
            </View>
        );
    }
}



export default Form;