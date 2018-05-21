import React from 'react';
var { View, StyleSheet, Alert, TouchableOpacity,StatusBar,ActivityIndicator,Modal,FlatList, Image, ScrollView } = require('react-native');
import Ionicon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/Octicons';
import Iconx from 'react-native-vector-icons/SimpleLineIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Button,Avatar,Text} from 'react-native-elements'
import {  storage,database } from "../../../../config/firebase";
import FastImage from 'react-native-fast-image'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./styles"
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;



class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            user: '',
            img: '',
            isLoading: true,
            ModalVisibleStatus: false,
            TempImageURL : '',
         }
         
        this.onSignOut = this.onSignOut.bind(this);
    }


 componentDidMount()
 {
  storage.ref('images').child(this.props.user.uid).getDownloadURL()
  .then((url) =>  {
  this.setState({
     img: url
      });
        })    
        .catch(function(error) {
          // Handle any errors here
        });
      database.ref('posts').orderByChild('uid').equalTo(`${this.props.user.uid}`).on('value', (snap) => {
        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push({
            image: child.val().image,
            caption: child.val().caption,
            fullname: child.val().fullname,
            commentscount: child.val().commentscount,
            likescount: child.val().likescount,
            location: child.val().location,
            timestamp: child.val().timestamp,
            userimage: child.val().userimage,
            postid: child.key,

          });
        });  
        this.setState({
          isLoading: false,
          dataSource: items.reverse(),
        });
      });

      database.ref('restaurants').orderByChild('submituid').equalTo(`${this.props.user.uid}`).on('value', (snaps) => {
        // get children as an array
        var item = [];
        snaps.forEach((child) => {
          item.push({
            image: child.val().image,
            latitude: child.val().latitude,
            longitude: child.val().longitude,
            latitudeDelta: child.val().latitudeDelta,
            longitudeDelta: child.val().longitudeDelta,
            restaurantcontactno: child.val().restaurantcontactno,
            restaurantcountry: child.val().restaurantcountry,
            restaurantname: child.val().restaurantname,
            restaurantowner: child.val().restaurantowner,
            restaurantreview: child.val().restaurantreview,
            status: child.val().status,
            restaurantkey: child.key,
            submitfullname: child.val().submitfullname,
            submitimage: child.val().submitimage,



          });
        });  
        this.setState({
          isLoading: false,
          dataSources: item.reverse(),
        });
      });
 }
 ShowModalFunction(visible, imageURL) 
    {
 
      this.setState({
 
        ModalVisibleStatus: visible,
 
        TempImageURL : imageURL});
        
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

    segmentClicked = (index) => {
        this.setState({
          activeIndex: index
        })
      }
  
      renderSection = () => {
        if(this.state.activeIndex == 0) {
          return (<View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
   {this.renderSectionOne()}
            </View>
            </View>
          )
        }
        else if (this.state.activeIndex == 1) {
          return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <FlatList
    
    data={ this.state.dataSources }

    renderItem={({item}) => 
    
      <View style={{flex:1, flexDirection: 'column', margin:1 }}> 
        <TouchableOpacity onPress={() => Actions.RestaurantPost({restaurantkey: item.restaurantkey, likescount: item.likescount, image: item.image, caption: item.caption, commentscount: item.commentscount, fullname: item.fullname, likescount: item.likescount, location: item.location, timestamp: item.timestamp, userimage: item.userimage, submitfullname: item.submitfullname, submitimage: item.submitimage})} >
          <FastImage style={styles.imageThumbnail} source = {{ uri: item.image,  priority: FastImage.priority.high }} />
        </TouchableOpacity>

      </View> 
      
    
    }

    numColumns = { 3 }

    keyExtractor={(item, restaurantkey) => restaurantkey}

   />
        </View>
          )
        }
        else if (this.state.activeIndex == 2) {
          return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    <Text> This is 3rd section </Text>
            </View>
          )
        }
       
      }
  
      renderSectionOne = () => {
        if (this.state.isLoading) {
 
          return (
  
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  
              <ActivityIndicator size="large" />
  
            </View>
          
        );
        
      }
          return (
          
            <View style={styles.MainContainer}>
  
   { this.state.dataSource ?
    <FlatList
    
       data={ this.state.dataSource }

       renderItem={({item}) => 
       
         <View style={{flex:1, flexDirection: 'column', margin:1 }}> 
           <TouchableOpacity onPress={() => Actions.UserPost({postid: item.postid, likescount: item.likescount, image: item.image, caption: item.caption, commentscount: item.commentscount, fullname: item.fullname, likescount: item.likescount, location: item.location, timestamp: item.timestamp, userimage: item.userimage})} >
             <FastImage style={styles.imageThumbnail} source = {{ uri: item.image,  priority: FastImage.priority.high }} />
           </TouchableOpacity>

         </View> 
         
       
       }

       numColumns = { 3 }

       keyExtractor={(item, index) => index}

      /> : <View> 
<Text>Opss No Post Yet</Text>
      </View>

      }



 
            </View>
          )
        
      }
      
    render() {       
        let pic = {
            uri: this.state.img
        };
        return (
            <View style={styles.container}>
                     <StatusBar
     backgroundColor="transparent"
     barStyle="dark-content"
   />
           <View style={styles.profileheader}>
           <TouchableOpacity onPress={this.onSignOut}>
           <Iconx style={{marginRight:25,fontSize:18}} name="logout"  /> 
           </TouchableOpacity>
           <Avatar
  large
  rounded
  source={pic}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
<View style={styles.profile}>
<Text style={styles.profilename}>{this.props.user.fullname}</Text>
<Text style={styles.profileaddress}>{this.props.user.email}</Text>
</View>
<TouchableOpacity>
<Ionicon style={{marginLeft:25,fontSize:22}} name="ios-settings-outline"  /> 
</TouchableOpacity>
</View>
<View>
          <View style={styles.profiletab}>
          <TouchableOpacity onPress={()=>this.segmentClicked(0)} active={this.state.activeIndex == 0} style={[this.state.activeIndex == 0 ? { flex:1,justifyContent:'center'} : { flex:1,justifyContent:'center'}]} transparent>
         <Ionicon  style={[this.state.activeIndex == 0 ? {color: 'blue',fontSize: 22,alignSelf:'center'} : {color: 'blue',fontSize: 20,alignSelf:'center'}]}  name="ios-apps-outline"  /> 
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>this.segmentClicked(1)} active={this.state.activeIndex == 1} style={[this.state.activeIndex == 0 ? {flex:1,justifyContent:'center'} : { flex:1,justifyContent:'center'}]}   transparent >
         <Ionicon  style={[this.state.activeIndex == 1 ? {color: 'green',fontSize: 22,alignSelf:'center'} :  {color: 'green',fontSize: 20,alignSelf:'center'}]} name="ios-list-box-outline" /> 
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>this.segmentClicked(2)} active={this.state.activeIndex == 2} style={[this.state.activeIndex == 0 ? { flex:1,justifyContent:'center'} : { flex:1,justifyContent:'center'}]}  transparent>
         <Ionicon  style={[this.state.activeIndex == 2 ? {color: 'red',fontSize: 22,alignSelf:'center'} : {color: 'red',fontSize: 20,alignSelf:'center'}]} name="ios-heart-outline" /> 
          </TouchableOpacity>
          </View>
          <ScrollView>
          {this.renderSection()}
          </ScrollView>
</View>
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

export default connect(mapStateToProps,{ signOut })(Profile);