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
import { SearchBar } from 'react-native-elements';
import myStyles from '../assets/styles/myStyles';

export default class ScreenTwo extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Search',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/images/chat-icon.png')}
        style={[myStyles.icon, { tintColor: tintColor }]}
      />
    )
  }
  render() {
    return (
      <View style={myStyles.tabScreenContainer}>
      <View style={{ paddingTop: 60, paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>Search</Text>
          <SearchBar
              lightTheme
              ref={search => (this.search = search)}
              placeholder="Places..."
              returnKeyType="search"
              containerStyle={myStyles.searchContainer}
              inputStyle={myStyles.searchInput} />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>No Result</Text>
      </View>
  </View>
      );
  }
}