import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import NotiScreen from './NotiScreen';
import MessageScreen from './MessageScreen';
import PostDetail from './PostDetail';
import EventDetail from './EventDetail';
import PlaceDetail from './PlaceDetail';
import ProfileScreen from './ProfileScreen';
import MapScreen from './MapScreen';
import WeatherScreen from './WeatherScreen';
import ScheduleScreen from './ScheduleScreen';
import AgendaScreen from './AgendaScreen';
import MessageDetail from './MessageDetail';
import OtherProfile from './OtherProfile';

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
  EventDetail: { screen: EventDetail },
  PlaceDetail: { screen: PlaceDetail },
  Profile: { screen: ProfileScreen },
  OtherProfile: { screen: OtherProfile },
  Map: { screen: MapScreen },
  MessageDetail: { screen: MessageDetail },
});
export default TabScreen;