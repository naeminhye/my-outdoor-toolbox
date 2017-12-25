import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import NotiScreen from './NotiScreen';
import MessageScreen from './MessageScreen';
import SearchScreen from './SearchScreen';
import PostDetail from './PostDetail';
import SettingScreen from './SettingScreen';
import MapScreen from './MapScreen';
import AddNewPost from './AddNewPost';
import WeatherScreen from './WeatherScreen';
import ScheduleScreen from './ScheduleScreen';
import AgendaScreen from './AgendaScreen';
import MessageDetail from './MessageDetail';

const TabInStack = TabNavigator({
    Home: { 
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      }
    },
    Message: { 
      screen: MessageScreen 
    },
    Explore: { 
      screen: ExploreScreen 
    },
    Noti: { screen: NotiScreen }, 
    Search: { screen: SearchScreen },
  }, {
    tabBarOptions: { 
      activeTintColor: '#FF5252',
      labelStyle: {
        fontSize: 12,
      }
    },
});

const TabScreen = StackNavigator({
  TabInStack: { screen: TabInStack },
  PostDetail: { screen: PostDetail },
  Setting: { screen: SettingScreen },
  Map: { screen: MapScreen },
  MessageDetail: { screen: MessageDetail },
  //AddPost: { screen: AddNewPost },
  // Weather: { screen: WeatherScreen },
  // Schedule: { screen: ScheduleScreen },
  // Agenda: { screen: AgendaScreen },
});
export default TabScreen;