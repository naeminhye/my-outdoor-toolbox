import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  Dimensions,
  StyleSheet,
  FlatList,
  ListItem,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const SCREEN_LABEL = 'Message';
const STICKY_HEADER_HEIGHT = 40;

export default class MessageScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    };

    // let WINDOW_WIDTH = Dimensions.get('window').width,
    //     WINDOW_HEIGHT = Dimensions.get('window').height;
    // this.imgSize = (WINDOW_WIDTH - 16) / 3;
  }
  
  _keyExtractor = (item, index) => item.id;

  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-quote' : 'ios-quote-outline'}
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
          <Text style={{ fontSize: 22, color: '#FF5252', marginBottom: 10, }}>Edit</Text>
        </View>
      )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
          onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
        </View>
      )}>
      
        </ParallaxScrollView>
        <TouchableOpacity onPress={() => {}}>
        <View style={{ backgroundColor: '#FF5252', width: 60, height: 60, borderRadius:30, position: 'absolute', bottom: 30, right: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 1,}}>
            <Ionicons name={'md-add'} size={32} color={'#FFF'} />
        </View>
      </TouchableOpacity>
      </View>
    );
  }
}