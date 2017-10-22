import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';

export default class ScreenHome extends Component {
  static navigationOptions = {
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
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{marginTop: 20}}>
          <View style={myStyles.screenHeader}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>Home</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>Nothing Here</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}