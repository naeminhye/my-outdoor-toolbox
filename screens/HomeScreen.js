import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Constants, LinearGradient } from 'expo';
import Carousel, {
    Pagination,
} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GridView from 'react-native-super-grid';

const ITEM_WIDTH = 280,
ITEM_HEIGHT = 360;

//const scaleAnimation = new ScaleAnimation(); 
const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Home';
const AVATAR_SIZE = 80;
const profileItems = [
  { name: 'Weather', icon: 'ios-partly-sunny-outline', code: '#888888', navigate: 'Weather' }, 
  { name: 'Map', icon: 'ios-navigate-outline', code: '#888888', navigate: 'Weather'  },
  { name: 'Schedule', icon: 'ios-calendar-outline', code: '#888888', navigate: 'Schedule'  }, 
  { name: 'Health', icon: 'ios-nutrition-outline', code: '#888888', navigate: 'Weather'  },
];

export default class HomeScreen extends Component {

  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
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
        <View style={[myStyles.screenHeader]}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Setting'); }}
          style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 50 / 2, borderColor: '#FF5252'}}>
            <Image style={{borderRadius: 40 / 2}} source={{
              uri: 'https://i.pinimg.com/736x/fd/7f/7c/fd7f7c072ed1af1af5420658f6245a49--calendar--exo-exo.jpg',
              width: 40,
              height: 40 }}
            />
          </TouchableOpacity>
        </View>
        
      )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
          onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
        </View>
      )}>
          
        <View style={{flex: 1,}}>
        <GridView
          itemWidth={(viewportWidth - 60) / 2}
          items={profileItems}
          style={{flex: 1, }}
          renderItem={item => (  
            <TouchableOpacity onPress={() => { this.props.navigation.navigate(item.navigate); }}>
            <View style={{ borderRadius: 20, margin: 10, padding: 10, height: 150, borderWidth: 1, borderColor: item.code }}>
            <LinearGradient colors={['#ddd6f3', '#faaca8']} style={{}}>
              
                  <Ionicons name={item.icon} color={item.code} size={56} />
                  <Text style={{ fontSize : 16, fontWeight: 'bold', color: item.code}}>{item.name}</Text>
              </LinearGradient>
              </View>
            </TouchableOpacity>
          )}/>
        </View>
        </ParallaxScrollView>
      </View>
    );
  }
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

const entryBorderRadius = 8;

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};
