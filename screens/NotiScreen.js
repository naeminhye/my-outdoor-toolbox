import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Button,
    Text,
    ScrollView,
    ListView,
    Image,
} from 'react-native';
import myStyles from '../assets/styles/myStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Notifications';

export default class NotiScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-notifications' : 'ios-notifications-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
      <ParallaxScrollView
      ref={(scroll) => { this.scrollview = scroll; }}
      backgroundColor="#fff"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={100}
      stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
      renderForeground={() => (
        <View style={myStyles.screenHeader}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
      </View>
      )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
          onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
        </View>
      )}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>No Result</Text>
          </View>
        </ParallaxScrollView>
      </View>
      );
  }
}