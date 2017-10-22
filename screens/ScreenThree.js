import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';

export default class ScreenThree extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-person' : 'ios-person-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{marginTop: 20}}>
          <View style={[myStyles.screenHeader]}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>Profile</Text>
              <Text style={{ fontSize: 22, color: 'blue', marginBottom: 10, }}>Edit</Text>
          </View>
          <View style={{ justifyContent: 'flex-start' }}>
            <View>
              <Avatar
                xlarge
                rounded
                containerStyle={{alignSelf: 'center'}}
                avatarStyle={{ borderColor: '#000', borderWidth: 2 }}
                source={{uri: "https://i.pinimg.com/736x/fd/7f/7c/fd7f7c072ed1af1af5420658f6245a49--calendar--exo-exo.jpg"}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <View style={{ justifyContent: 'space-around', padding: 20, alignContent: 'center', height: 100 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đỗ Khánh Tú</Text>
                <Text style={{ fontSize: 18, color: '#ccc' }}>
                  Yêu màu tím , thích màu hồng, sống nội tâm, hay khóc thầm, ghét sự giả dối.
                </Text>
              </View>
              <View style={{ height: 100, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ flex: 1, backgroundColor: 'powderblue', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold'}}>100</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'skyblue' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold'}}>100</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'steelblue' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold'}}>100</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'pink' }} />
          </View>
        </ScrollView> 
      </View>
    );
  }
}