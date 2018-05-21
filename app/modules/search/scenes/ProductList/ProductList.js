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
class ProductList extends React.Component {
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
      database.ref('products').on('value', (snap) => {
        // get children as an array
        var items = [];
       
        var value;
        snap.forEach((child) => {

            database.ref('products').child(`${child.key}/likes/${this.props.user.uid}`).once("value", (snapshot) => {
                if (snapshot.exists()) {
                    value = true;
                }
                else
                value = false;
                items.push({
                    image: child.val().image,
                    productcountry: child.val().productcountry,
                    productname: child.val().productname,
                    productsupplier: child.val().productsupplier,
                    productreview: child.val().productreview,
                    productstate: child.val().productstate,
                    productcategory: child.val().productcategory,
                    productprice: child.val().productprice,
                    status: child.val().status,
                    productkey: child.key,
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
<Text h4 style={styles.title}> Product List </Text>
<View>
<FlatList
numColumns={2}
  style={{height:'100%',alignSelf:'center'}}
  extraData={this.state}
  data={this.state.data}
  renderItem={({ item }) => (
     <TouchableOpacity onPress={() => Actions.ProductDetail({productkey: item.productkey, productcontactno: item.productcontactno, productstate: item.productstate, productcountry: item.productcountry, productname: item.productname, productreview: item.productreview,  image: item.image, productprice: item.productprice, productcategory: item.productcategory, productsupplier: item.productsupplier })}  >
     <View style={{marginRight:10}}>
       <Image style={{height:100,width:150}}  source={{uri: item.image}} />
       <Text style={{fontSize:10,fontWeight:'600',alignSelf:'center'}}> {item.productname} </Text>
       <Text style={{fontSize:10,color:'gray',alignSelf:'center'}}  > {item.productstate},{item.productcountry}</Text>
       
     </View>
     </TouchableOpacity>             
  )}
  keyExtractor={(item, index) => item.productkey}
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
<Text h4 style={{marginTop:15,alignSelf:'center'}}> {this.state.productname} </Text>
{this.state.productstate ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:16}}> {this.state.productstate},{this.state.productcountry} </Text> : null}
{this.state.productowner ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:12}}>Owned by: {this.state.productowner} </Text> : null}
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
{this.state.productreview ? <Text  style={{marginTop:2,alignSelf:'center',fontSize:16,marginLeft:16,fontFamily:'Roboto',marginRight:15}}>{this.state.productreview} </Text>  : null}

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
      const commentsRef = database.ref('products').child(`${item}/commentscount`);
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


export default connect(mapStateToProps,{ signOut })(ProductList);