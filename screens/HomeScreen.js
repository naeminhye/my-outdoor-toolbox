import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Constants } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import GridView from 'react-native-super-grid';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Home';

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

  renderImage() {
    return (
      <View style={{ flex: 1 }}>
        <Image 
          style={{ flex: 1 }}
          source={{ uri: 'https://goo.gl/SPk4hX'}}
          resizeMode='cover'/>
      </View>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    const items = [
      { name: 'Weather', code: '#e74c3c', navigator: 'Weather', render: this.renderImage() },
      { name: 'Map', code: '#e74c3c', navigator: 'Map', render: this.renderImage() },
      { name: 'Calendar', code: '#e74c3c', navigator: 'Calendar', render: this.renderImage() },
      { name: 'Gallery', code: '#e74c3c', navigator: 'Gallery', render: this.renderImage() },
    ];

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
          
          <GridView
            itemWidth={200}
            items={items}
            style={myStyles.gridView}
            renderItem={item => (
            <TouchableOpacity 
              style={[myStyles.gridItemContainer, { backgroundColor: 'transparent', borderColor: item.code }]}
              onPress = { () => {
                navigate(item.navigator);
              }}>
              {item.render}
              <Text style={[myStyles.gridItemName, {position: 'absolute', alignSelf: 'flex-end', right: 20, bottom: 40}]}>{item.name}</Text>
              <Text style={[myStyles.gridItemCode, {position: 'absolute', alignSelf: 'flex-end', right: 20, bottom: 20}]}>{item.code}</Text>
            </TouchableOpacity>
            )}
          />
          </ParallaxScrollView>
      </View>
    );
  }
}