import React from 'react';
var { View, StyleSheet, Alert,Text,StatusBar,KeyboardAvoidingView,Text,ActivityIndicator,FlatList,Modal,TouchableOpacity,Image,ScrollView,TextInput} = require('react-native');
import {Button, Card,List,ListItem,SearchBar, Header,Divider} from 'react-native-elements'
import {  storage,database } from "../../../../config/firebase";
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/EvilIcons';
import FastImage from 'react-native-fast-image'
import styles from "./styles"
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;
console.disableYellowBox = true
const { color } = theme;
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            data: [],
            error: null,
            like: false,
            ModalVisibleStatus: false,
      
         }
    
         this.onClick = this.onClick.bind(this);
         this.onClick2 = this.onClick2.bind(this);
         this.comment = this.comment.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
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

    

    ShowModalFunction(visible, postid, userimage, fullname, caption, timestamp, comments) 
    {
      database.ref('comments').child(`${postid}`).on('value', (snaps) => {
        var item = [];
        snaps.forEach((childs) => {
          item.push({
          fullname: childs.val().fullname,
          image: childs.val().image,
          comment: childs.val().comment,
          timestamp: childs.val().timestamp,
          commentsid: childs.key,
        })
      }) 
      this.setState({
        datas: item,
        }); 
      })
 
      this.setState({
        ModalVisibleStatus: visible,
       postid: postid,
       userimage: userimage,
       caption: caption,
       timestamp: timestamp,
       fullname: fullname,
       comments: comments,
      });
        
    }
    
    componentDidMount() {
        
        database.ref('posts').on('value', (snap) => {
            // get children as an array
            var items = [];
           
            var value;
           var x;
            snap.forEach((child) => {

                database.ref('posts').child(`${child.key}/likes/${this.props.user.uid}`).once("value", (snapshot) => {
                    if (snapshot.exists()) {
                        value = true;
                    }
                    else
                    value = false;
                    items.push({
                        location: child.val().location,
                        image: child.val().image,
                        fullname: child.val().fullname,
                        userimage: child.val().userimage,
                        timestamp: child.val().timestamp,
                        uid: child.val().uid,
                        caption: child.val().caption,
                        postid: child.key,
                        comments: child.val().comments,
                        likescount: child.val().likescount,
                        commentscount: child.val().commentscount,
                        likes: value, 
                         
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

    
    
      renderHeader = () => {
        return <Header style={{}} innerContainerStyles={{}} outerContainerStyles={{height: 45,borderBottomColor:'#e7e7e7d1',backgroundColor:'transparent'}}
        centerComponent={<Text style={{marginBottom:-3,color:'black',fontFamily:'Montserrat',fontSize:18}}>HalalGO</Text>}
        rightComponent={<TouchableOpacity><Icons name="bell" style={{color:'black',fontSize:22}} /></TouchableOpacity>}
      />   ;
      };
    
      
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
           <FlatList
           extraData={this.state}
          data={this.state.data}
          renderItem={({ item }) => (
           <TouchableOpacity>
            <View>

             <FastImage style={styles.image} source = {{ uri: item.image,  priority: FastImage.priority.high }}>
             <View style={{flexDirection:'row',alignContent:'center'}}>
             <FastImage style={{height:50,width:50,borderRadius:50,marginTop:10,marginLeft:10}} source = {{ uri: item.userimage,  priority: FastImage.priority.high }}/>
            <View style={{marginTop:12,marginLeft:5}}>
            <Text style={{fontSize:15,color:'white',fontWeight:'600'}}>{item.fullname} </Text>
            <TimeAgo style={{marginTop:-5,textShadowColor: 'white',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5}} time={item.timestamp} interval={20000} />
            {item.location !== null ? <Text style={{fontSize:12,color:'white'}}>{item.location}</Text> : null }
           
            </View>
             </View>
             <Text style={{position:'absolute',bottom:30,marginBottom:15,marginLeft:15,color:'white'}}>{item.caption}</Text>  
             <View style={{flexDirection:'row',justifyContent:'space-around',position:'absolute',bottom:0,marginBottom:15}}>
         
<TouchableOpacity onPress={item.likes ?  this.onClick2.bind(this, item.postid) : this.onClick.bind(this, item.postid) }  style={{flex:1,justifyContent:'center',flexDirection:'row',marginLeft:10}}><Icon name={item.likes  ? 'ios-heart' : 'ios-heart-outline'} style={{color: item.likes ? 'red' : 'white',fontSize:23}}/><Text style={{color:'white',fontSize:15, alignItems: 'center',alignSelf:'center'}}> {item.likescount} Likes</Text></TouchableOpacity>
<TouchableOpacity onPress={this.ShowModalFunction.bind(this, true, item.postid, item.userimage, item.fullname, item.caption, item.timestamp, item.comments  )} style={{flex:1,justifyContent:'center',flexDirection:'row',marginLeft:10}}><Icons name="comment" style={{color:'white',fontSize:23}} /><Text style={{color:'white',fontSize:15, alignItems: 'center',alignSelf:'center'}}> {item.commentscount} Comment</Text></TouchableOpacity>
            </View>
             </FastImage>
            </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => item.postid}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
          onEndReachedThreshold={50}
        />
         {
        this.state.ModalVisibleStatus 
        
        ?

         (
          
           <Modal
         transparent={false}
         
         animationType={"slide"}
         style={{height:'100%'}}
         visible={this.state.ModalVisibleStatus}

         onRequestClose={ () => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
         
          <ScrollView> 
          
           <View style={styles.modalView}>
           <TouchableOpacity 
           style={{marginLeft:15}}
                   activeOpacity = { 0.5 }
                   onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus)} } >
                     <Icon name="ios-arrow-round-back" size={45} style={{color: 'black'}} />
                 </TouchableOpacity>
                 <View style={{flexDirection:'row',alignContent:'center'}}>
                 <FastImage style={{height:50,width:50,borderRadius:50,marginTop:10,marginLeft:10}} source = {{ uri: this.state.userimage,  priority: FastImage.priority.high }}/>  
                 <View style={{marginTop:12,marginLeft:5}}>
            <Text style={{fontSize:15,color:'black',fontWeight:'600'}}>{this.state.fullname} </Text>
            <Text style={{color:'black'}}>{this.state.caption}</Text>  
            <TimeAgo style={{color:'gray',fontWeight:'200'}} time={this.state.timestamp} interval={20000} />
           
            </View>
           
                 </View>
                 <Divider style={{ backgroundColor: '#ecf0f1', height:1,marginTop:10 }} />   
                 <FlatList
  style={{height:'100%'}}
  extraData={this.state}
  data={this.state.datas}
  renderItem={({ item }) => (
   
   <TouchableOpacity onLongPress={() => this.delete(item.commentsid,this.state.postid)} style={{flexDirection:'row',alignContent:'center'}}>
    <FastImage style={{height:50,width:50,borderRadius:50,marginTop:10,marginLeft:10}} source = {{ uri: item.image,  priority: FastImage.priority.high }}/>  
    <View style={{marginTop:12,marginLeft:5}}>
<Text style={{fontSize:15,color:'black',fontWeight:'600'}}>{item.fullname} </Text>
<Text style={{color:'black'}}>{item.comment}</Text>  
<TimeAgo style={{color:'gray',fontWeight:'200'}} time={item.timestamp} interval={20000} />
</View>

</TouchableOpacity>
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
   <TouchableOpacity style={{paddingTop:15,marginRight:10}} onPress={this.comment.bind(this, this.state.postid) }>
<Text>Post</Text>
  </TouchableOpacity>        
                   </View>

         </Modal>
         ) 

         :

         null

      }
            </View>
        );
    }


      onClick(item) {
        const userlikesRef = database.ref('posts').child(`${item}/likes/${this.props.user.uid}/`);
        const commentsRef = database.ref('posts').child(`${item}/likescount`);
        userlikesRef.once('value', snap => {
          if (!snap.exists()){
            userlikesRef.update({
              status: true,
            }, error => {
              if (error){
                console.log(error);
              } else {
                commentsRef.transaction((val) => val + 1);
              }
            });
          }
        });
       
      }

      delete(item,items) {
        Alert.alert(
          'Confirm Deletion',
          'Delete this comment?',
          [
            {text: "Don't Delete", onPress: () => console.log('OK Pressed'), style: 'cancel'},
            {text: 'Delete', onPress: () => this.uncomment(item,items) },
          ],
          { cancelable: false }
        )
      }

      onClick2(item) {
        const userlikesRef = database.ref('posts').child(`${item}/likes/${this.props.user.uid}/`);
        const commentsRef = database.ref('posts').child(`${item}/likescount`);
        userlikesRef.once('value', snap => {
          if (snap.exists()){
            userlikesRef.remove(error => {
                if (error){
                  console.log(error);
              } else {
                commentsRef.transaction((val) => val - 1);
              }
            });
          }
        });
       
      }

      uncomment(item,items) {
        const userlikesRef = database.ref(`comments/${items}`).child(`${item}/`);
        const commentsRef = database.ref('posts').child(`${items}/commentscount`);
        userlikesRef.remove();
        commentsRef.transaction((val) => val - 1);
      }

      comment(item) {
        const userlikesRef = database.ref('comments').child(`${item}`);
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

export default connect(mapStateToProps,{ signOut })(Home);