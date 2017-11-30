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
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { firebaseApp } from '../FirebaseConfig';

const SCREEN_LABEL = 'Setting';
const STICKY_HEADER_HEIGHT = 40;
const AVATAR_SIZE = 80;

export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Đỗ Khánh Tú', 
      email: 'UNKNOWN', 
      photoUrl: '', 
      uid: '', 
      emailVerified: false
    };
  }

  componentDidMount() {
    let user = firebaseApp.auth().currentUser;
    
    if (user != null) {
      this.setState({
      //name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL, 
      emailVerified: user.emailVerified,
      uid: user.uid,  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
      });
    }
  }
    
  static navigationOptions = {
    header: null,
    }

    render() {
        return (
          <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
          <ParallaxScrollView
          ref={(scroll) => { this.scrollview = scroll; }}
          backgroundColor="#fff"
          contentBackgroundColor="#fff"
          parallaxHeaderHeight={60}
          stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
          renderForeground={() => (
            <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row'}}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
              <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FF5252', marginBottom: 10, }}>Done</Text>
              </TouchableOpacity>
            </View>
          )}
          renderStickyHeader={() => (
            <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
              <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
              onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
            </View>
          )}>
          <View style={{ flexDirection:'row' }}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 5,}}>
            <Image style={{borderRadius: AVATAR_SIZE / 2}} source={{
              uri: 'https://i.pinimg.com/736x/fd/7f/7c/fd7f7c072ed1af1af5420658f6245a49--calendar--exo-exo.jpg',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE }}
            />
          </View>
          <View style={{ flex: 2, justifyContent: 'space-around', padding: 20, alignContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.name}</Text>
          <Text style={{ fontSize: 16, color: '#ccc' }}>
            Yêu màu tím , thích màu hồng, sống nội tâm, hay khóc thầm, ghét sự giả dối.
          </Text>
        </View>
      </View>
          <View style={{ height: 30, flexDirection: 'row', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>9</Text>
              <Text style={{ fontSize: 12, textAlign: 'center'}}>posts</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>1M</Text>
              <Text style={{ fontSize: 12, textAlign: 'center'}}>followers</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>0</Text>
              <Text style={{ fontSize: 12, textAlign: 'center'}}>following</Text>
            </View>
          </View>
            </ParallaxScrollView>
          </View>
        );
      }
}