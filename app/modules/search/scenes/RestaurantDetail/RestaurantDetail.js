import React from 'react';
var { View, StyleSheet, Alert, Image,TouchableOpacity, Dimensions,FlatList,ListView,ActivityIndicator,Modal,StatusBar,ScrollView,TextInput} = require('react-native');

import {Button, SearchBar, Text, Card, List, Rating} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {  storage,database } from "../../../../config/firebase";
import styles from "./styles"
import FastImage from 'react-native-fast-image'
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;
import MapView, { Marker } from 'react-native-maps'
const { color } = theme;
const { width, height } = Dimensions.get('window');
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
class RestaurantDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            rating: 0,
            isLoading: true,
            ModalVisibleStatus: false,
            region: {
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              latitudeDelta:  0.0922,
              longitudeDelta:  0.0922,
            }
         }
         
        this.onSignOut = this.onSignOut.bind(this);
    }
  

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    ratingCompleted(rating) {
      const userlikesRef = database.ref('rating').child(`${this.props.restaurantkey}/${this.props.user.uid}/`);
      const commentsRef = database.ref('rating').child(`${this.props.restaurantkey}/ratingscount`);
      userlikesRef.once('value', snap => {
          userlikesRef.update({
            rating: rating,
          }, error => {
            if (error){
              console.log(error);
            }
          });
        
      });
     
    }

    rating()
    {
      
    }


  

    componentDidMount() {
      database.ref('rating').child(`${this.props.restaurantkey}/${this.props.user.uid}/`).on('value', (snap) =>{
        snap.forEach((child) => {
          this.setState({
        rating: child.val(),
          })
      }) 

      })

      database.ref('rating').child(`${this.props.restaurantkey}`).on('value', (snap) =>{
        let total = 0;
        let user = 0;
        let rating = 0;
          snap.forEach((child) => {
            total += child.val().rating; 
            user += child.numChildren();
            rating = total % user;
            this.setState({
              data: rating,
              datax: user,
              });     
        },
      ) 
  
    
  
        })

      database.ref('comments').child(`${this.props.restaurantkey}`).on('value', (snaps) => {
        var item = [];
        var commentkey = [];
        snaps.forEach((childs) => {
          item.push({
          fullname: childs.val().fullname,
          image: childs.val().image,
          comment: childs.val().comment,
          timestamp: childs.val().timestamp,
          
        })

        commentkey.push({
          commentkey: childs.key,
        })


      }) 
      
      this.setState({
        commentkey: commentkey,
        datas: item,
        error: item.error || null,
        isLoading: false,
    
        }); 
      })

      
      
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
     backgroundColor="transparent"
     barStyle="light-content"
     translucent
   />
  <ScrollView>   
  <View style={styles.modalView}>
  
    <Image style={styles.mainImage}  source = {{ uri: this.props.image }} />
<Text h4 style={{marginTop:15,alignSelf:'center'}}> {this.props.restaurantname} </Text>
{this.props.restaurantstate ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:16}}> {this.props.restaurantstate},{this.props.restaurantcountry} </Text> : null}
{this.props.restaurantowner ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:12}}>Owned by: {this.props.restaurantowner} </Text> : null}
<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Rating  </Text>

<View style={{flexDirection:'row'}}>
<View style={{flexDirection:'column',paddingLeft:18}}>
<Text>Average</Text>
<Text h4 style={{alignSelf:'center'}}> {this.state.data} / 5 </Text>
</View>
<View style={{flexDirection:'column',paddingLeft:50}}>
<Rating
onFinishRating={this.ratingCompleted.bind(this)}
  type="heart"
  fractions={0}
  startingValue={this.state.rating}
  imageSize={35}
  style={{ alignSelf:'center' }}
/>
</View>
</View>
<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Review  </Text>
{this.props.restaurantreview ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:16,marginLeft:16,fontFamily:'Roboto',marginRight:15}}>{this.props.restaurantreview} </Text>  : null}
{this.props.longitude ? <Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Location  </Text> : null}
{this.props.longitude ? <MapView style={styles.map} scrollEnabled={false} initialRegion={this.state.region}>
<MapView.Marker coordinate={{'latitude': this.props.latitude,'longitude': this.props.longitude}}/></MapView> : null }

<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Comment  </Text>
<FlatList
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
keyExtractor={(item, index) => item.comment}
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
   <TouchableOpacity style={{paddingTop:15,marginRight:10}} onPress={this.comment.bind(this, this.props.restaurantkey) }>
<Text>Post</Text>
  </TouchableOpacity>        
 </View>


 <TouchableOpacity 
        activeOpacity = { 0.5 }
        style={styles.TouchableOpacity_Style}
        onPress={Actions.pop } >
          <Ionicons name="ios-arrow-round-back" size={45} style={{color: 'white'}} />
      </TouchableOpacity>     
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
              this.setState({ comment: '' })
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


export default connect(mapStateToProps,{ signOut })(RestaurantDetail);