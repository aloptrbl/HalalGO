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
            restaurantreview: '',
            restaurantname: '',
            restaurantowner: '',
           restaurantstate: '',
           restaurantcountry: '',
           restaurantcontactno: '',
           image: '',
           status: false,
           latitude: null,
           longitude: null,
           error: null,
           checked: false,
           timestamp: moment().format()

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
          if (response.didCancel) {
            // handle error
            resolve('CANCEL');
        } else if (response.error) {
            // handle error
            resolve('ERROR');
        } else if (response.customButton) {
            resolve(true);
        } else {
            // const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
           
            this.setState({
              image:  response.uri
            });
                
        }
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            
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

    addlocation = () => {
        if(this.state.checked == false)
        {
          this.setState({checked: true})
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5,
                error: null,
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true},
          );
        }
        else
        {
          this.setState({checked: false})
          this.setState({
            latitude: null,
            longitude: null,
            error: null,
          });
          
        }
    }


   
    

    render() {
        
        return (
            <View style={styles.container}>
            <StatusBar
     backgroundColor="#9b59b6"
     barStyle="light-content"
   />
             <Header style={{}} innerContainerStyles={{}} outerContainerStyles={{height: 45,backgroundColor: '#9b59b6',borderBottomColor:'transparent'}}
  leftComponent={<TouchableOpacity onPress={Actions.pop}>
  <Text style={{marginBottom:-12,color:'white'}}><Icon style={styles.headerButton1} name="ios-arrow-round-back" /></Text>
  </TouchableOpacity>}
  centerComponent={<Text style={{marginBottom:-3,color:'white'}}>Add New Restaurant</Text>}
  rightComponent={<TouchableOpacity onPress={this.onSubmit}><Text style={{marginBottom:-12,color:'white'}}>
    <Icon style={styles.headerButton2} name="ios-checkmark-outline" />
    </Text></TouchableOpacity>}
/>   
                <View style={styles.wrapper}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
             <View style={[styles.avatar, styles.avatarContainer]}>
             { 
               <Image resizeMode="contain" style={styles.avatar}
               source={[this.state.image == '' ? {uri:'http://jis.gov.jm/media/blank.png'} : { uri: this.state.image }]}
               />
             }
             </View>
           </TouchableOpacity>

                      
                      <AuthTextInput
                      multiline={true}
                                placeholder="Review"
                                value={this.state.restaurantreview}
                                onChangeText={ text => this.setState({ restaurantreview : text }) }
                                type="text"
                                numberOfLines={5}
                                />
    
                                <AuthTextInput
                                placeholder="Restaurant Name"
                                value={this.state.restaurantname}
                                type="text"
                                onChangeText={ text => this.setState({ restaurantname : text }) }
                                />
                                     <AuthTextInput 
                                placeholder="Restaurant Owner"
                                value={this.state.restaurantowner}
                                type="text"
                                onChangeText={ text => this.setState({ restaurantowner : text }) }
                                />

                                 <AuthTextInput 
                                placeholder="Restaurant State"
                                value={this.state.restaurantstate}
                                type="text"
                                onChangeText={ text => this.setState({ restaurantstate : text }) }
                                />

                                 <AuthTextInput 
                                placeholder="Restaurant Country"
                                value={this.state.restaurantcountry}
                                type="text"
                                onChangeText={ text => this.setState({ restaurantcountry : text }) }
                                />
                         
                                  <AuthTextInput 
                                placeholder="Restaurant Contact No"
                                value={this.state.restaurantcontactno}
                                keyboardType = 'numeric'
                                maxLength={11}
                                onChangeText={ text => this.setState({ restaurantcontactno : text }) }
                                />

<CheckBox
  title='Add Location'
  onPress={this.addlocation}
  checked={this.state.checked}
  containerStyle={{backgroundColor:'white',borderWidth:0,alignSelf:'flex-start'}}
/>
{  this.state.checked ? <MapView style={styles.map} initialRegion={{
          "latitude": this.state.latitude,
          "longitude":this.state.longitude,
          "latitudeDelta": 1,
          "longitudeDelta": 1
         }}>
     
         {!!this.state.latitude && !!this.state.longitude && <MapView.Marker draggable  region={this.state.region}
         onRegionChange={this.onRegionChange}
            coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
            title={"Your Location"}
          />}
   
        </MapView> : null }               



                </View>
            </View>
        );
    }
}


export default Form;