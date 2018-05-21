import React from 'react';
var { View, StyleSheet, Alert,Text,StatusBar,Text,ActivityIndicator,FlatList,TouchableOpacity,Image} = require('react-native');

import {Button, Card,List,ListItem,SearchBar, Header} from 'react-native-elements'
import {  storage,database } from "../../../../config/firebase";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/EvilIcons';
import FastImage from 'react-native-fast-image'
import styles from "./style"
import TimeAgo from 'react-native-timeago';
import moment from 'moment';
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            error: null,
            like: false,
      
         }
    
        
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

    componentDidMount() {
        
   
       
         
      }

    
    
      renderHeader = () => {
        return <Header style={{}} innerContainerStyles={{}} outerContainerStyles={{height: 45,borderBottomColor:'#e7e7e7d1',backgroundColor:'transparent'}}
        centerComponent={<Text style={{marginBottom:-3,color:'black',fontFamily:'Montserrat',fontSize:18}}>HalalGO</Text>}
      />   ;
      };
    
      
    render() {

          
        return (
            <View style={styles.container}>
             <StatusBar
     backgroundColor="white"
     barStyle="dark-content"
   />
   <TouchableOpacity onPress={Actions.pop} style={styles.back}><Ionicons name="ios-arrow-round-back" size={45} style={{color: 'black'}} /></TouchableOpacity>
   <Text>{this.props.postid}</Text>       
          
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

export default connect(mapStateToProps,{ signOut })(Comment);