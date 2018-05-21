import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';
import {Text, View, TouchableOpacity, Image, StatusBar} from 'react-native';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';
import Comment from '../modules/home/scenes/Comment';
import Add from '../modules/add/scenes/Add';
import Edit from '../modules/add/scenes/Edit';
import Navigate from '../modules/navigate/scenes/Navigate';
import Profile from '../modules/profile/scenes/Profile';
import UserPost from '../modules/profile/scenes/UserPost';
import RestaurantPost from '../modules/profile/scenes/RestaurantPost';
import HotelPost from '../modules/profile/scenes/HotelPost';
import ProductPost from '../modules/profile/scenes/ProductPost';
import Search from '../modules/search/scenes/Search';
import SearchList from '../modules/search/scenes/SearchList';
import HotelList from '../modules/search/scenes/HotelList';
import HotelDetail from '../modules/search/scenes/HotelDetail';
import RestaurantList from '../modules/search/scenes/RestaurantList';
import RestaurantDetail from '../modules/search/scenes/RestaurantDetail';
import ProductList from '../modules/search/scenes/ProductList';
import ProductDetail from '../modules/search/scenes/ProductDetail';
import AddRestaurant from '../modules/search/scenes/AddRestaurant';
import AddHotel from '../modules/search/scenes/AddHotel';
import AddProduct from '../modules/search/scenes/AddProduct';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";

import { color, navTitleStyle } from "../styles/theme";

// Simple component to render something in place of icon
const TabIcon = ({ focused, tintColor, title }) => {
 if (title === 'Profile')
 {
    iconName = `ios-person${focused ? '' : '-outline'}`;
     return <Ionicons name={iconName} size={25} style={{color: focused ? 'red' :'black'}} />;
 }else if (title === 'Home')
 {
    iconName = `ios-home${focused ? '' : '-outline'}`;
    return <Ionicons name={iconName} size={25} style={{color: focused ? 'red' :'black'}} />;
 }else if (title === 'Search')
 {
    iconName = `ios-search${focused ? '' : '-outline'}`;
    return <Ionicons name={iconName} size={25} style={{color: focused ? 'red' :'black'}} />;
 }else if (title === 'Add')
 {
    iconName = `ios-add${focused ? '' : ''}`;
    return <Ionicons name={iconName} size={25} style={{color: focused ? 'red' :'black'}} />;
 }
 
 else if (title === 'Navigate') {
    iconName = `md-navigate`;
    return <Ionicons name={iconName} size={25} style={{color: focused ? 'red' :'black'}} />;
 }
  }

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }


    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Scene key="root" hideNavBar
                       navigationBarStyle={{backgroundColor: "#FF553F"}}
                       titleStyle={navTitleStyle}
                       backButtonTintColor={color.white}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                        <Scene key="Register" component={Register} title="Register" back/>
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Update Profile" back={false}/>
                        <Scene key="Login" component={Login} title="Login" back />
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                    </Stack>
                    


                           <Scene key="Main" hideNavBar initial={this.state.isLoggedIn}>
        {/* Tab Container */}
        <Scene hideNavBar
        tabBarPosition ="bottom"
          key="tabbar"
          showLabel={false}
          animationEnabled ={false}
          tabs={true}
          tabBarStyle={{ backgroundColor: 'white'  }}
        >
          {/* Tab and it's scenes */}
          <Scene key="Home" title="Home"  icon={TabIcon}>
          <Stack key="root">
            <Scene key="Home" hideNavBar
              component={Home}
              title="Home"
            />
             <Scene key="Comment" hideNavBar
              component={Comment}
              title="Comment"
            />
            </Stack>
          </Scene>

          {/* Tab and it's scenes */}
          <Scene key="Search" title="Search" icon={TabIcon}>
          <Stack key="root">
            <Scene
              key="Search" hideNavBar
              component={Search}
              title="Search"
            />
            <Scene
              key="SearchList" hideNavBar
              component={SearchList}
              title="SearchList"
            />
            <Scene
              key="AddRestaurant" hideNavBar
              component={AddRestaurant}
              title="AddRestaurant"
            />
            <Scene
              key="AddHotel" hideNavBar
              component={AddHotel}
              title="AddHotel"
            />
            <Scene
              key="AddProduct" hideNavBar
              component={AddProduct}
              title="AddProduct"
            />
            <Scene
              key="HotelList" hideNavBar
              component={HotelList}
              title="HotelList"
            />
             <Scene
              key="HotelDetail" hideNavBar
              component={HotelDetail}
              title="HotelDetail"
            />
            <Scene
              key="ProductList" hideNavBar
              component={ProductList}
              title="ProductList"
            />
             <Scene
              key="ProductDetail" hideNavBar
              component={ProductDetail}
              title="ProductDetail"
            />
            <Scene
              key="RestaurantList" hideNavBar
              component={RestaurantList}
              title="RestaurantList"
            />
             <Scene
              key="RestaurantDetail" hideNavBar
              component={RestaurantDetail}
              title="RestaurantDetail"
            />
             
            </Stack>
          </Scene>

  
           {/* Tab and it's scenes */}
           <Scene key="Add" title="Add" icon={TabIcon}>
            <Scene
              key="Add" hideNavBar
              component={Add}
              title="Add"
            />
            <Scene
              key="Edit" hideNavBar
              component={Edit}
              title="Edit"
            />
          </Scene>

           {/* Tab and it's scenes */}
           <Scene key="Navigate" title="Navigate" icon={TabIcon}>
            <Scene
              key="Navigate" hideNavBar
              component={Navigate}
              title="Navigate"
            />
          </Scene>

           {/* Tab and it's scenes */}
           <Scene key="Profile" title="Profile" icon={TabIcon}>
           <Stack key="root">
            <Scene
              key="Profile" hideNavBar
              component={Profile}
              title="Profile"
            />
              <Scene
              key="UserPost" hideNavBar
              hideTabBar
              component={UserPost}
              title="UserPost"
            />
             <Scene
              key="RestaurantPost" hideNavBar
              hideTabBar
              component={RestaurantPost}
              title="RestaurantPost"
            />
             <Scene
              key="HotelPost" hideNavBar
              hideTabBar
              component={HotelPost}
              title="HotelPost"
            />
             <Scene
              key="ProductPost" hideNavBar
              hideTabBar
              component={ProductPost}
              title="ProductPost"
            />
              </Stack>
          </Scene>
        
        </Scene>
        
      </Scene>                       
                     </Scene>

   
            </Router>
        )
    }
}