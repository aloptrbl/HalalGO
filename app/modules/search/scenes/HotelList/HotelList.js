import React from 'react';
var { View, StyleSheet, Alert, Image,TouchableOpacity, Dimensions,FlatList,ListView,ActivityIndicator,Modal,StatusBar,ScrollView,TextInput} = require('react-native');

import {Button, SearchBar, Text, Card, List, Rating, Divider} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  storage,database } from "../../../../config/firebase";
import styles from "./style"
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;
import FastImage from 'react-native-fast-image'
import MapView, { Marker } from 'react-native-maps'
const { color } = theme;
const { width, height } = Dimensions.get('window');
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
class HotelList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            isLoading: true,
            ModalVisibleStatus: false,
            TempImageURL : '',
         }
         
        this.onSignOut = this.onSignOut.bind(this);
    }
  

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    componentDidMount() {
      database.ref('hotels').on('value', (snap) => {
        // get children as an array
        var items = [];
       
        var value;
        snap.forEach((child) => {

            database.ref('hotels').child(`${child.key}/likes/${this.props.user.uid}`).once("value", (snapshot) => {
                if (snapshot.exists()) {
                    value = true;
                }
                else
                value = false;
                items.push({
                    image: child.val().image,
                    latitude: child.val().latitude,
                    longitude: child.val().longitude,
                    hotelcontactno: child.val().hotelcontactno,
                    hotelcountry: child.val().hotelcountry,
                    hotelname: child.val().hotelname,
                    hotelreview: child.val().hotelreview,
                    hotelstate: child.val().hotelstate,
                    status: child.val().status,
                    hotelkey: child.key,
                    submitfullname: child.val().submitfullname,
                    submitimage: child.val().submitimage,
                     
            }) 
  
           
           items.reverse();

          });

       
        this.setState({
            data: items,
            error: items.error || null,
            isLoading: false,

          }); 
        });
        
         
    })  
    }


     ShowModalFunction(visible,hotelkey, imageURL, hotelname, hotelcontactno,hotelstate,hotelcountry,hotelreview,latitude,longitude,region) 
    {

     database.ref('comments').child(`${hotelkey}`).on('value', (snaps) => {
        var item = [];
        snaps.forEach((childs) => {
          item.push({
          fullname: childs.val().fullname,
          image: childs.val().image,
          comment: childs.val().comment,
          timestamp: childs.val().timestamp,
          commentkey: childs.key,
        })

        item.reverse();
      }) 
      
      this.setState({
        datas: item,
        error: item.error || null,
        isLoading: false,
    
        }); 
      })
      
      this.setState({
 
        ModalVisibleStatus: visible,
        hotelname: hotelname,
        hotelcontactno: hotelcontactno,
        hotelkey: hotelkey,
        latitude: latitude,
        longitude: longitude,
        hotelstate: hotelstate,
        hotelcountry: hotelcountry,
        hotelreview: hotelreview,
        TempImageURL : imageURL,
        region: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta:  0.0922,
          longitudeDelta:  0.0922,
        },
      });
        

 
    }

    ListViewItemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
          }}
        />
      );
    }
   
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator 
             animating
      color="red"
      size="large"
      style={styles.activityIndicator}
            />
          </View>
        );
      }
        return (
            <View style={styles.container}>
              <StatusBar
     backgroundColor="white"
     barStyle="dark-content"
   />
 <TouchableOpacity onPress={Actions.pop} style={styles.back}><Ionicons name="ios-arrow-round-back" size={45} style={{color: 'black'}} /></TouchableOpacity>
<Text h4 style={styles.title}> Hotel List </Text>
<View>
<FlatList
numColumns={2}
  style={{height:'100%',alignSelf:'center'}}
  extraData={this.state}
  data={this.state.data}
  renderItem={({ item }) => (
     <TouchableOpacity onPress={() => Actions.HotelDetail({hotelkey: item.hotelkey, hotelcontactno: item.hotelcontactno, hotelcountry: item.hotelcountry, hotelname: item.hotelname, hotelreview: item.hotelreview, hotelstate: item.hotelstate, image: item.image, latitude: item.latitude, longitude: item.longitude })}  >
     <View style={{marginRight:10}}>
       <Image style={{height:100,width:150}}  source={{uri: item.image}} />
       <Text style={{fontSize:10,fontWeight:'600',alignSelf:'center'}}> {item.hotelname} </Text>
       <Text style={{fontSize:10,color:'gray',alignSelf:'center'}}  > {item.hotelstate},{item.hotelcountry}</Text>
       
     </View>
     </TouchableOpacity>             
  )}
  keyExtractor={(item, index) => item.hotelkey}
  ListFooterComponent={this.renderFooter}
  onEndReachedThreshold={50}
           />
    </View>
  
</View>
        );
    }

    comment(item) {
      const userlikesRef = database.ref('comments').child(`${item}/`);
      const commentsRef = database.ref('hotels').child(`${item}/commentscount`);
      userlikesRef.once('value', snap => {
          userlikesRef.push({
              fullname: this.props.user.fullname,
              image: this.props.user.image,
              comment: this.state.comment,
              timestamp: moment().format(),
            }, error => {
              if (error){
                console.log(error);
              
            } else {
              commentsRef.transaction((val) => val + 1);
            }
          });
        }
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


export default connect(mapStateToProps,{ signOut })(HotelList);