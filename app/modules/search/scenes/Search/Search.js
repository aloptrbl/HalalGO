import React from 'react';
var { View, StyleSheet, Alert, Image,TouchableOpacity,ListView} = require('react-native');

import {Button, SearchBar, Text, Card} from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from "./style"
import { actions as auth, theme } from "../../../auth/index"
const { signOut } = auth;

const { color } = theme;

class Search extends React.Component {
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
  
        return (
            <View style={styles.container}>
<SearchBar
lightTheme
 containerStyle={{backgroundColor: 'white',borderWidth:0}}
 inputStyle={{backgroundColor: '#cacacadb'}}
 onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
  showLoading
  round
  placeholder='Search...' />
   
<View>
<Text h4 style={styles.title}> Category </Text>
<View style={styles.product}>
<TouchableOpacity onPress={Actions.HotelList}><Image style={{width:50,height:49}}          source={require('../../../../assets/images/building.png')}/></TouchableOpacity>
<TouchableOpacity onPress={Actions.RestaurantList}><Image style={{width:55,height:55}}          source={require('../../../../assets/images/restaurant.png')}/></TouchableOpacity>
<TouchableOpacity onPress={Actions.ProductList}><Image style={{width:48,height:48}}          source={require('../../../../assets/images/product.png')}/></TouchableOpacity>


</View>


</View>
<LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient>
        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Restaurant" onPress={Actions.AddRestaurant}>
            <Icon name="ios-restaurant" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="New Hotel" onPress={Actions.AddHotel}>
            <Icons name="hotel" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="New Product" onPress={Actions.AddProduct}>
            <Icon name="ios-basket-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
        );
    }
}


export default connect(null,{ signOut })(Search);