import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image
} from 'react-native';
import myStyles from '../assets/styles/myStyles';

export default class ScreenThree extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/images/search-icon.png')}
        style={[myStyles.icon, { tintColor: tintColor }]}
      />
    )
  }
  render() {
    return (
      <View style={myStyles.tabScreenContainer}>
      <View style={{ paddingTop: 60, paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>Profile</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>Your Profile</Text>
      </View>
  </View>
    );
  }
}