import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Image, 
  ScrollView
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';

export default class MessageScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Messages',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
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
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>Messages</Text>
          </View>
          <View style={{ height: 40, alignItems:'stretch', paddingLeft: 20, paddingRight: 20 }}>
            <SearchBar
                      lightTheme
                      ref={search => (this.search = search)}
                      placeholder="Search message..."
                      returnKeyType="search"
                      containerStyle={myStyles.searchContainer}
                      inputStyle={myStyles.searchInput} />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{ fontSize: 24, fontWeight: '600', color: '#CCCCCC' }}>No Messages</Text>
          </View>
        </ScrollView>
        <TouchableHighlight
            style={myStyles.addButton}
            underlayColor="#ff7043"
            onPress={() => {
              console.log('Add new message');
            }}>
            <Ionicons name="ios-create-outline" size={30} color="#fff" />
          </TouchableHighlight>
      </View>
    );
  }
}