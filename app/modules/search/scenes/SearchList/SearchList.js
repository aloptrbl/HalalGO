import React from 'react';
var { View, StyleSheet, Alert, Image,TouchableOpacity,ListView, ActivityIndicator} = require('react-native');

import {Button, SearchBar, Text} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import styles from "./style"
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;

class SearchList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: '',
            isLoading: true,
            text: '',
         }
        this.arrayholder = [] ;
        this.onSignOut = this.onSignOut.bind(this);
    }

    componentDidMount() {
      return fetch('https://reactnativecode.000webhostapp.com/FruitsList.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
 
          // In this block you can do something with new state.
          this.arrayholder = responseJson ;
 
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }

    GetListViewItem (fruit_name) {
    
      Alert.alert(fruit_name);
     
     }
     
      SearchFilterFunction(text){
        
        const newData = this.arrayholder.filter(function(item){
            const itemData = item.fruit_name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
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
    

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
        return (
            <View style={styles.container}>
 <Icon name="ios-restaurant" style={{color:'black'}} />
<SearchBar
lightTheme
clearIcon 
showLoading
platform="android"
cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
 containerStyle={{backgroundColor: 'white',borderWidth:0}}
 inputStyle={{backgroundColor: '#cacacadb'}}
 onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
  showLoading
  round
  placeholder='Search...' />
  
   <ListView
 
 dataSource={this.state.dataSource}

 renderSeparator= {this.ListViewItemSeparator}

 renderRow={(rowData) => <Text style={styles.rowViewContainer} 

 onPress={this.GetListViewItem.bind(this, rowData.fruit_name)} >{rowData.fruit_name}</Text>}

 enableEmptySections={true}

 style={{marginTop: 10}}

/>
<View>
</View>

      </View>
        );
    }

    test()
    {
      
    }
}


export default connect(null,{ signOut })(SearchList);