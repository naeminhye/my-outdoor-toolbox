import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';

export default class ScreenOne extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Explore',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-compass' : 'ios-compass-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }
  render() {
    return (
      <View style={myStyles.tabScreenContainer}>
        <View style={{ paddingTop: 60, paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>Explore</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>Nothing Hear</Text>
        </View>
      </View>
    );
  }
}