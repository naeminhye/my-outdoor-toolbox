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

export default class NotiScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Notifications',
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
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{marginTop: 20}}>
          <View style={myStyles.screenHeader}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>Notification</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>No Result</Text>
          </View>
        </ScrollView>
      </View>
      );
  }
}