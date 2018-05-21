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
            hotelreview: '',
            hotelname: '',
            hotelstate: '',
            hotelcountry: '',
           hotelcontactno: '',
           timestamp: moment().format(),
           image: null,
           status: false,
           latitude: null,
           longitude: null,
           error: null,
           checked: false,
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

    addlocation = () => {
        if(this.state.checked == false)
        {
          this.setState({checked: true})
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
              });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false},
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
     backgroundColor="#3498db"
     barStyle="light-content"
   />
             <Header style={{}} innerContainerStyles={{}} outerContainerStyles={{height: 45,backgroundColor: '#3498db',borderBottomColor:'transparent'}}
  leftComponent={<TouchableOpacity onPress={Actions.pop}>
  <Text style={{marginBottom:-12,color:'white'}}><Icon style={styles.headerButton1} name="ios-arrow-round-back" /></Text>
  </TouchableOpacity>}
  centerComponent={<Text style={{marginBottom:-3,color:'white'}}>Add New Hotel</Text>}
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
                                value={this.state.hotelreview}
                                onChangeText={ text => this.setState({ hotelreview : text }) }
                                type="text"
                                numberOfLines={5}
                                />
    
                                <AuthTextInput
                                placeholder="Hotel Name"
                                value={this.state.hotelname}
                                type="text"
                                onChangeText={ text => this.setState({ hotelname : text }) }        
                                />
                                 <AuthTextInput 
                                placeholder="Hotel State"
                                value={this.state.hotelstate}
                                type="text"
                                onChangeText={ text => this.setState({ hotelstate : text }) }
                                />

                                 <AuthTextInput 
                                placeholder="Hotel Country"
                                value={this.state.hotelcountry}
                                type="text"
                                onChangeText={ text => this.setState({ hotelcountry : text }) }
                                />
                         
                                  <AuthTextInput 
                                placeholder="Hotel Contact No"
                                value={this.state.hotelcontactno}
                                keyboardType = 'numeric'
                                maxLength={11}
                                onChangeText={ text => this.setState({ hotelcontactno : text }) }
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