import React from 'react';
import PropTypes from 'prop-types'
import {Text, View,TouchableOpacity,Image, Dimensions,StatusBar} from 'react-native';
import {Button,Header,Input,CheckBox,FormInput} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';
import styles from "./styles"
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import MapView from 'react-native-maps';
import Modal from 'react-native-modalbox';
import FastImage from 'react-native-fast-image';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const { width, height } = Dimensions.get('window');
import moment from 'moment'
const ASPECT_RATIO = width / height;

class FormAdd extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        image: null,
        caption: null,
        location: null,
     }
     this.onSubmit = this.onSubmit.bind(this);
}

onSwipeUp(gestureState) {
  this.refs.modal4.open();
  }

  onSwipeDown(gestureState) {
    this.refs.modal4.close();
  }


  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
       
        break;
      case SWIPE_DOWN:
      
        break;
    }
  }

  onSubmit() {
    const data = this.state;
    var timestamp = new Date().getTime();
    data['timestamp'] = timestamp;
    this.props.onSubmit(data);
}


onRemove(){
  this.setState({location: null}); 
  this.refs.modal5.close()
}


   
    

    render() {
      const { uri } = this.props;
      var BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]}>X</Button>;
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };   
        return (
          <GestureRecognizer
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeUp={(state) => this.onSwipeUp(state)}
          onSwipeDown={(state) => this.onSwipeDown(state)}
          config={config}
          style={{
            flex: 1,
          }}
          >
          <View style={styles.container}>
        
<Header style={{}} innerContainerStyles={{}} outerContainerStyles={{height: 45,backgroundColor: 'transparent'}}
leftComponent={<TouchableOpacity onPress={Actions.pop}>
<Text style={{marginBottom:-12}}><Icon style={styles.headerButton1} name="ios-arrow-round-back" /></Text>
</TouchableOpacity>}
centerComponent={<Text style={{marginBottom:-3}}>Post</Text>}
rightComponent={<TouchableOpacity onPress={this.onSubmit}><Text style={{marginBottom:-12}}>
  <Icon style={styles.headerButton2} name="ios-checkmark-outline" />
  </Text></TouchableOpacity>}
/>   
<FastImage resizeMode="cover" style={styles.image} 
             source={ {uri: uri, priority: FastImage.priority.high} }
             />
<TouchableOpacity onPress={() =>   this.refs.modal4.open() } style={{position:'absolute',bottom:0,alignSelf:'center'}}><Icon name="ios-arrow-up-outline" style={{color:'white',fontSize:50}} /></TouchableOpacity>              
      <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"}>
<FormInput type="text" placeholder="Write Something.." multiline={true} numberOfLines={6} value={this.state.caption} onChangeText={ text => this.setState({ caption : text }) } />
<TouchableOpacity onPress={() =>   this.refs.modal5.open() }>
<View style={{flexDirection:'row'}}>
<Icon name={ iconName = `ios-pin${this.state.location === null ? '-outline' : ''}`} style={{color: this.state.location === null ? 'gray' : 'green',fontSize:25,marginLeft:15}} /><Text style={{fontSize: 13,fontWeight:'600',marginTop:5,marginLeft:5}}> {this.state.location}</Text></View>
</TouchableOpacity>
      </Modal>  
      <Modal style={[styles.modal, styles.modal5]} position={"top"} ref={"modal5"} backdropContent={BContent}>
      <Header style={{}} innerContainerStyles={{}} outerContainerStyles={{height: 45,backgroundColor: 'transparent'}}
leftComponent={<TouchableOpacity onPress={() => this.refs.modal5.close()}>
<Text style={{marginBottom:-12}}><Icon style={styles.headerButton1} name="ios-arrow-round-back" /></Text>
</TouchableOpacity>}
centerComponent={<Text style={{marginBottom:-3}}>Add Location</Text>}
rightComponent={ this.state.location === null ? null : <TouchableOpacity onPress={() => this.onRemove()}><Text style={{marginBottom:-12}}>
  <Icon style={styles.headerButton2} name="ios-close-outline" />
  </Text></TouchableOpacity>}
/>   
      <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      fetchDetails={true}
      value={this.state.location}
      onChangeText={ text => this.setState({ location : text }) }
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data);
        console.log(details);
        this.getLocation(data.name || details.name)
        this.refs.modal5.close()
        
        
      }}
      getDefaultValue={() => {
        return ''; // text input default value
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyCTEFD6EO_t177wklcURk-LWBK3UEYForY',
        language: 'en', // language of the results
        types: '(cities)', // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth:0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
      
      }}
      
      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'food',
      }}
      
      predefinedPlacesDescription={[this.state.location]}
      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlacesAlwaysVisible={true}
      renderLeftButton={()  => <Icon name="ios-search-outline" style={{color:'black',fontSize:30,marginLeft:10,marginTop:10}} />}
    />
  
      </Modal>                              
      </View>
      </GestureRecognizer>
        );
    }
    getLocation(details) {
      this.setState({
        location: details,
      });
    }
}

FormAdd.propTypes = {
  label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
  ]),
  multiline: PropTypes.bool,
  uri: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  number: PropTypes.number
}

export default FormAdd;