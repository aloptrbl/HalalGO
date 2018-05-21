import React from 'react';
var { View, StyleSheet, Alert, TouchableOpacity,StatusBar,ActivityIndicator,Modal,FlatList, Image, ScrollView, TextInput } = require('react-native');
import Ionicon from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/Octicons';
import Iconx from 'react-native-vector-icons/SimpleLineIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Button,Avatar,Text,Divider} from 'react-native-elements'
import {  storage,database } from "../../../../config/firebase";
import FastImage from 'react-native-fast-image'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./style"
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;



class UserPost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            isLoading: true,
        
         }
         
        this.onSignOut = this.onSignOut.bind(this);
    }


    componentDidMount() {
      database.ref('comments').child(`${this.props.postid}`).on('value', (snaps) => {
        var item = [];
        snaps.forEach((childs) => {
          item.push({
          fullname: childs.val().fullname,
          image: childs.val().image,
          comment: childs.val().comment,
          timestamp: childs.val().timestamp,
          commentkey: childs.key,
        })


      }) 
      
      this.setState({
        datas: item,
        error: item.error || null,
        isLoading: false,
    
        }); 
      })
      
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
                  <ScrollView>
                     <StatusBar
     backgroundColor="transparent"
     barStyle="dark-content"
   />
           <Image style={styles.mainImage}  source = {{ uri: this.props.image }} />
           <View style={{flexDirection:'row',alignContent:'center'}}>
                 <FastImage style={{height:50,width:50,borderRadius:50,marginTop:10,marginLeft:10}} source = {{ uri: this.props.userimage,  priority: FastImage.priority.high }}/>  
                 <View style={{flexDirection:'row',justifyContent:'space-around',position:'absolute',bottom:45,marginBottom:35}}>
         <TouchableOpacity  style={{flex:1,justifyContent:'center',flexDirection:'row',marginLeft:10}}><Ionicon name={this.props.postid  ? 'ios-heart' : 'ios-heart-outline'} style={{color: this.props.postid ? 'red' : 'white',fontSize:23}}/><Text style={{color:'white',fontSize:15, alignItems: 'center',alignSelf:'center'}}> {this.props.likescount} Likes</Text></TouchableOpacity>
         <TouchableOpacity onPress={()=> this.delete(this.props.postid)}  style={{flex:1,justifyContent:'center',flexDirection:'row',marginLeft:10}}><Ionicon name={'ios-trash-outline'} style={{color: 'white',fontSize:23}}/></TouchableOpacity>            
                     </View>
                 <View style={{marginTop:12,marginLeft:5}}>
            <Text style={{fontSize:15,color:'black',fontWeight:'600'}}>{this.props.fullname} </Text>
            <Text style={{color:'black'}}>{this.props.caption}</Text>  
            <TimeAgo style={{color:'gray',fontWeight:'200'}} time={this.props.timestamp} interval={20000} />
           
            </View>
           
                 </View>
                 <Divider style={{ backgroundColor: '#ecf0f1', height:1,marginTop:10 }} />   
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
  keyExtractor={(item, index) => item.comment}
  ListFooterComponent={this.renderFooter}
  onEndReachedThreshold={50}
           />
           <Text>{this.props.key}</Text>
           <View style={{backgroundColor:"white",height:100,width:'100%'}} />
           <TouchableOpacity 
        activeOpacity = { 0.5 }
        style={styles.TouchableOpacity_Style}
        onPress={Actions.pop } >
          <Ionicons name="ios-arrow-round-back" size={45} style={{color: 'white'}} />
      </TouchableOpacity>     
      </ScrollView>
      <View style={{flexDirection:'row', borderTopColor: '#ecf0f1',
            borderTopWidth: 1,position: 'absolute', bottom: 0,backgroundColor:'white',width:'100%'}}>
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
   <TouchableOpacity style={{paddingTop:15,marginRight:10}} onPress={this.comment.bind(this, this.props.postid) }>
<Text>Post</Text>
  </TouchableOpacity>        
 </View>
            </View>
        );
    }

    delete(item)
    {
      Alert.alert(
        'Confirm Deletion',
        'Delete this post?',
        [
          {text: "Don't Delete", onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Delete', onPress: () => this.delete2(item)},
        ],
        { cancelable: false }
      )
    }

    delete2(item)
    {
      const commentsRef = database.ref('posts').child(`${item}`);
      const commentsRef2 = database.ref('comments').child(`${item}`);
      commentsRef.remove();
      commentsRef2.remove();
      Actions.pop();
    }

    comment(item) {
      const userlikesRef = database.ref('comments').child(`${item}/`);
      const commentsRef = database.ref('posts').child(`${item}/commentscount`);
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

export default connect(mapStateToProps,{ signOut })(UserPost);