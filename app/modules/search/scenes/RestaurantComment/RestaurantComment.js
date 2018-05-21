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
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;
import MapView, { Marker } from 'react-native-maps'
const { color } = theme;
const { width, height } = Dimensions.get('window');
import moment from 'moment';
class RestaurantComment extends React.Component {
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
     
        return (
            <View style={styles.container}>
              <StatusBar
     backgroundColor="white"
     barStyle="dark-content"
   />
  <ScrollView>   
           <View style={styles.modalView}>
    
               <Image style={styles.mainImage}  source = {{ uri: this.props.image }} />
<Text h4 style={{marginTop:15,alignSelf:'center'}}> {this.props.restaurantname} </Text>
{this.props.restaurantstate ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:16}}> {this.props.restaurantstate},{this.props.restaurantcountry} </Text> : null}
{this.props.restaurantowner ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:12}}>Owned by: {this.props.restaurantowner} </Text> : null}
<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Rating  </Text>

<View style={{flexDirection:'row'}}>
<Rating
type="heart"
  imageSize={20}
  readonly
  startingValue={2}
  style={{paddingVertical:5,paddingHorizontal:15}}
/><Text style={{paddingVertical:5}}>Average 2 / 5 </Text>
</View>
<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Review  </Text>
{this.props.restaurantreview ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:16,marginLeft:16,fontFamily:'Roboto',marginRight:15}}>{this.props.restaurantreview} </Text>  : null}
{this.props.longitude ? <Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Location  </Text> : null}
{this.props.longitude ? <MapView style={styles.map} scrollEnabled={false} initialRegion={this.props.region}>
  <MapView.Marker coordinate={{'latitude': this.props.latitude,'longitude': this.props.longitude}}/></MapView> : null }

<Text h4 style={{marginTop:15,fontSize:20,marginLeft:15}}> Comment  </Text>
<View style={{marginLeft:15,flexDirection:'row'}}>
<FlatList
  style={{height:'100%'}}
  extraData={this.props}
  data={this.props.datas}
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
<TextInput
style={{width:'85%',paddingRight:5}}
          multiline={true} 
          onChangeText={text => this.setprops({ comment: text })}
          value={this.props.comment}
             // value={this.props.email}
              placeholderTextColor='#bdc3c7'
              underlineColorAndroid='transparent'
              placeholder='Write a comment..'
            />
 <TouchableOpacity style={{paddingTop:15}}  onPress={this.comment.bind(this, this.props.restaurantkey) }>
<Text>Post</Text>
  </TouchableOpacity>     
</View>
<Rating
  type="heart"
  ratingCount={5}
  fractions={0}
  startingValue={0}
  imageSize={30}
  showRating
  style={{ paddingVertical: 5,alignSelf:'center' }}
/>

                 <TouchableOpacity 
                   activeOpacity = { 0.5 }
                   style={styles.TouchableOpacity_Style}
                   onPress={Actions.pop } >
                     <Ionicons name="ios-arrow-round-back" size={45} style={{color: 'white'}} />
                 </TouchableOpacity>
                
             </View>
             </ScrollView>  
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


export default connect(mapStateToProps,{ signOut })(RestaurantComment);