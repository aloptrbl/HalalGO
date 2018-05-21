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
class RestaurantList extends React.Component {
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
      database.ref('restaurants').on('value', (snap) => {
        // get children as an array
        var items = [];
       
        var value;
        snap.forEach((child) => {

            database.ref('restaurants').child(`${child.key}/likes/${this.props.user.uid}`).once("value", (snapshot) => {
                if (snapshot.exists()) {
                    value = true;
                }
                else
                value = false;
                items.push({
                    image: child.val().image,
                    latitude: child.val().latitude,
                    longitude: child.val().longitude,
                    restaurantcontactno: child.val().restaurantcontactno,
                    restaurantcountry: child.val().restaurantcountry,
                    restaurantname: child.val().restaurantname,
                    restaurantowner: child.val().restaurantowner,
                    restaurantreview: child.val().restaurantreview,
                    restaurantstate: child.val().restaurantstate,
                    status: child.val().status,
                    restaurantkey: child.key,
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


     ShowModalFunction(visible,restaurantkey, imageURL, restaurantname, restaurantcontactno,restaurantowner, restaurantstate,restaurantcountry,restaurantreview,latitude,longitude,region) 
    {

     database.ref('comments').child(`${restaurantkey}`).on('value', (snaps) => {
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
        restaurantname: restaurantname,
        restaurantcontactno: restaurantcontactno,
        restaurantowner: restaurantowner,
        restaurantkey: restaurantkey,
        latitude: latitude,
        longitude: longitude,
        restaurantstate: restaurantstate,
        restaurantcountry: restaurantcountry,
        restaurantreview: restaurantreview,
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
<Text h4 style={styles.title}> Restaurant List </Text>
<View>
<FlatList
numColumns={2}
  style={{height:'100%',alignSelf:'center'}}
  extraData={this.state}
  data={this.state.data}
  renderItem={({ item }) => (
     <TouchableOpacity onPress={() => Actions.RestaurantDetail({restaurantkey: item.restaurantkey, restaurantcontactno: item.restaurantcontactno, restaurantcountry: item.restaurantcountry, restaurantname: item.restaurantname, restaurantowner: item.restaurantowner, restaurantreview: item.restaurantreview, restaurantstate: item.restaurantstate, image: item.image, latitude: item.latitude, longitude: item.longitude })}  >
     <View style={{marginRight:10}}>
       <Image style={{height:100,width:150}}  source={{uri: item.image}} />
       <Text style={{fontSize:10,fontWeight:'600',alignSelf:'center'}}> {item.restaurantname} </Text>
       <Text style={{fontSize:10,color:'gray',alignSelf:'center'}}  > {item.restaurantstate},{item.restaurantcountry}</Text>
       
     </View>
     </TouchableOpacity>             
  )}
  keyExtractor={(item, index) => item.restaurantkey}
  ListFooterComponent={this.renderFooter}
  onEndReachedThreshold={50}
           />
    </View>
    {
        this.state.ModalVisibleStatus 
        
        ?

         (
<View>  
<StatusBar
     backgroundColor="white"
     barStyle="dark-content"
   />     
           <Modal
        height="100%"
         transparent={false}
         animationType={"fade"}
         visible={this.state.ModalVisibleStatus}

         onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
         
         
          
          <ScrollView>   
           <View style={styles.modalView}>
    
               <Image style={styles.mainImage}  source = {{ uri: this.state.TempImageURL }} />
<Text h4 style={{marginTop:15,alignSelf:'center'}}> {this.state.restaurantname} </Text>
{this.state.restaurantstate ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:16}}> {this.state.restaurantstate},{this.state.restaurantcountry} </Text> : null}
{this.state.restaurantowner ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:12}}>Owned by: {this.state.restaurantowner} </Text> : null}
<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Rating  </Text>

<View style={{flexDirection:'row'}}>
<Rating
type="heart"
  imageSize={20}
  readonly
  startingValue={2}
  style={{paddingVertical:5,paddingHorizontal:15}}
/>
<Rating
  type="heart"
  ratingCount={5}
  fractions={0}
  startingValue={0}
  imageSize={20}
  showRating
  style={{ paddingVertical: 5,alignSelf:'center' }}
/>
</View>
<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Review  </Text>
{this.state.restaurantreview ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:16,marginLeft:16,fontFamily:'Roboto',marginRight:15}}>{this.state.restaurantreview} </Text>  : null}
{this.state.longitude ? <Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Location  </Text> : null}
{this.state.longitude ? <MapView style={styles.map} scrollEnabled={false} initialRegion={this.state.region}>
  <MapView.Marker coordinate={{'latitude': this.state.latitude,'longitude': this.state.longitude}}/></MapView> : null }

<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Comment  </Text>

                 <TouchableOpacity 
                   activeOpacity = { 0.5 }
                   style={styles.TouchableOpacity_Style}
                   onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
                     <Ionicons name="ios-arrow-round-back" size={45} style={{color: 'white'}} />
                 </TouchableOpacity>
       <FlatList
  style={{height:'100%'}}
  extraData={this.state}
  data={this.state.datas}
  renderItem={({ item }) => (
    <View style={{flexDirection:'row',alignContent:'center'}}>
    <FastImage style={{height:50,width:50,borderRadius:50,marginTop:10,marginLeft:10}} source = {{ uri: item.image,  priority: FastImage.priority.high }}/>  
    <View style={{marginTop:12,marginLeft:5}}>
<Text style={{fontSize:15,color:'black',fontWeight:'600'}}>{item.fullname} </Text>
<Text style={{color:'black'}}>{item.comment}</Text>  
<TimeAgo style={{color:'gray',fontWeight:'200'}} time={item.timestamp} interval={20000} />
</View>
</View>
  )}
  keyExtractor={(item, index) => item.commentkey}
  ListFooterComponent={this.renderFooter}
  onEndReachedThreshold={50}
           />
           <View style={{backgroundColor:"white",height:100,width:'100%'}} />


         
             </View>
             </ScrollView>  
             <View style={{flexDirection:'row', borderTopColor: '#ecf0f1',
            borderTopWidth: 1,position: 'absolute', bottom: 0,backgroundColor:'white'}}>
             <FastImage style={{height:40,width:40,borderRadius:50,marginTop:4,marginLeft:4,backgroundColor:'white'}} source = {{ uri: this.props.user.image,  priority: FastImage.priority.high }}/>           
          <TextInput
          multiline={true}
              style={styles.input}
              onChangeText={text => this.setState({ comment: text })}
             // value={this.state.email}
             value={this.state.comment}
              placeholderTextColor='#bdc3c7'
              underlineColorAndroid='transparent'
              placeholder='Write a comment..'
            />
   <TouchableOpacity style={{paddingTop:15,marginRight:10}} onPress={this.comment.bind(this, this.state.postid) }>
<Text>Post</Text>
  </TouchableOpacity>        
                   </View>
         </Modal>
         </View>
         ) 

         :

         null

      }

</View>
        );
    }

    comment(item) {
      const userlikesRef = database.ref('comments').child(`${item}/`);
      const commentsRef = database.ref('restaurants').child(`${item}/commentscount`);
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


export default connect(mapStateToProps,{ signOut })(RestaurantList);