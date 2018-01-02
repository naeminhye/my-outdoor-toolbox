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
import { StackNavigator } from 'react-navigation';
import WeatherScreen from './WeatherScreen';
import ScheduleScreen from './ScheduleScreen';
import AgendaScreen from './AgendaScreen';
import List from './List';
import { Constants, LinearGradient } from 'expo';
import Carousel, {
  Pagination,
} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GridView from 'react-native-super-grid';
import { firebaseApp } from '../FirebaseConfig';

const ITEM_WIDTH = 280,
  ITEM_HEIGHT = 360;

//const scaleAnimation = new ScaleAnimation(); 
const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Home';
const AVATAR_SIZE = 80;
const profileItems = [
  { name: 'Weather', icon: 'ios-partly-sunny-outline', colors: ['#1d2b64', '#f8cdda'], navigate: 'Weather', image: require('../assets/icons/homeicon/weather.png') },
  { name: 'Guide Me', icon: 'ios-navigate-outline', colors: ['#1a2980', '#26d0ce'], navigate: 'Map', image: require('../assets/icons/homeicon/guide-me.png') },
  { name: 'Schedule', icon: 'ios-calendar-outline', colors: ['#403b4a', '#e7e9bb'], navigate: 'Agenda', image: require('../assets/icons/homeicon/schedule.png') },
  { name: 'Events', icon: 'ios-calendar-outline', colors: ['#e55d87', '#5fc3e4'], navigate: 'List', image: require('../assets/icons/homeicon/events.png') },
  { name: 'Stories', icon: 'ios-calendar-outline', colors: ['#cc95c0', '#dbd4b4', '#7aa1d2'], navigate: 'List', image: require('../assets/icons/homeicon/posts.png') },
];

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
    };
  }

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user != null) {
        var userRef = firebaseApp.database().ref('users/' + user.uid);
        userRef.on('value', snap => {
          this.setState({
            profile_picture: snap.val().profile_picture,
          });
        });
      } else {
        console.log('user bị null');
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
        <ParallaxScrollView
          ref={(scroll) => { this.scrollview = scroll; }}
          backgroundColor="#fff"
          contentBackgroundColor="#fff"
          parallaxHeaderHeight={100}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          renderForeground={() => (
            <View style={[myStyles.screenHeader]}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Profile'); }}
                style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 50 / 2, borderColor: '#FF5252' }}>
                <Image style={{ borderRadius: 40 / 2, width: 40, height: 40 }}
                  source={{ uri: this.state.profile_picture }}
                />
              </TouchableOpacity>
            </View>

          )}
          renderStickyHeader={() => (
            <View key="sticky-header" style={{ height: STICKY_HEADER_HEIGHT, alignItems: 'center', justifyContent: 'flex-end', paddingTop: Constants.statusBarHeight, }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10 }}
                onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
            </View>
          )}>

          <View style={{ flex: 1, padding: 10 }}>
            <GridView
              itemWidth={(viewportWidth - 60) / 2}
              items={profileItems}
              style={{ flex: 1 }}
              renderItem={item => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => { this.props.navigation.navigate(item.navigate); }}>
                  <View
                    style={{
                      flex: 1,
                      borderRadius: 20,
                      height: 200,
                    }}>
                    <LinearGradient colors={item.colors} style={{ padding: 20, height: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                      <Image source={item.image} style={{ width: 80, height: 80 }} resizeMode='cover' />
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2a2d2c', backgroundColor: 'transparent' }}>{item.name}</Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              )} />
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

const entryBorderRadius = 8;

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

const RouteConfig = {
  Home: { screen: HomeScreen },
  Weather: { screen: WeatherScreen },
  Schedule: { screen: ScheduleScreen },
  Agenda: { screen: AgendaScreen },
  List: { screen: List },
}

export default StackNavigator(RouteConfig);