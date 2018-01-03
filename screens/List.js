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
  ListView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import WeatherScreen from './WeatherScreen';
import ScheduleScreen from './ScheduleScreen';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import AgendaScreen from './AgendaScreen';
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
const SCREEN_LABEL = 'Posts';
const AVATAR_SIZE = 80;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_picture: 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png',
      customStyleIndex: 0,
      latestPosts: ds.cloneWithRows([]),
      users: [],
    };

    this.renderItem = this._renderItem.bind(this);
  }

  static navigationOptions = {
    header: null,
  }

  _keyExtractor(post, index) {
    return post._key;
  }

  handleCustomIndexSelect = (index) => {
      this.setState({
          ...this.state,
          customStyleIndex: index,
      });
  }

  componentDidMount() {
    firebaseApp.database().ref('users').on('value', snap => {
        let events = [];
        snap.forEach(child => {
          events.push({
            username: child.val().username,
            userId: child.key,
            profile_picture: child.val().profile_picture,
          });
  
          this.setState({
            users: events,
          });
        });
    });

    firebaseApp.database().ref('posts').on('value', snap => {
        let events = [];
        snap.forEach(child => {
            events.push({
                title: child.val().title,
                _key: child.key,
                featuredImage: child.val().featuredImage,
                categoryId: child.val().categoryId,
                category: 'Unknown',
                userId: child.val().userId, 
                username: '',
                profile_picture: '',
                address: child.val().address,
                description: child.val().description,
                time: child.val().time,
            });
        });

        events.map((item, index) => {
            let users = this.state.users;
            users.map((user, i) => {
              if (item.userId == user.userId) {
                item.username = user.username;
                item.profile_picture = user.profile_picture;
              }
            });
        });

        this.setState({
            latestPosts: ds.cloneWithRows(events.reverse()),
        });

        console.log(this.state.latestPosts);
    });

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
    const { navigate, goBack } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
      <ParallaxScrollView
      ref={(scroll) => { this.scrollview = scroll; }}
      backgroundColor="#fff"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={100}
      stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
      renderForeground={() => (
        <View  style={{ flexDirection: 'column', paddingTop: 25 }}>
            <TouchableOpacity 
              onPress={() => goBack()}>
              <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20 }}>
                  <Ionicons name={'ios-arrow-back'} size={28}/> 
                  <Text style={{fontSize: 20,}}> Back</Text>
              </View>
            </TouchableOpacity>
            <View style={{ paddingTop: 5, paddingLeft: 20, paddingRight: 20, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row'}}>
              <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
              <TouchableOpacity onPress={()=>{ console.log('Edit'); }}>
                <Text style={{ fontSize: 20, color: '#FF5252', marginBottom: 10, }}>Edit</Text>
              </TouchableOpacity>
            </View>
        </View>        
      )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
          onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
        </View>
      )}>
        <View style={{ flex: 1, padding: 20, paddingBottom: 60 }}>
            <SegmentedControlTab
                values={['Recent', 'Nearby', 'Most Liked']}
                selectedIndex={this.state.customStyleIndex}
                onTabPress={this.handleCustomIndexSelect}
                borderRadius={0}
                tabsContainerStyle={{ height: 60, backgroundColor: '#fff', marginBottom: 20 }}
                tabStyle={{ backgroundColor: '#fff', borderWidth: 1, borderColor: 'transparent', }}
                activeTabStyle={{ backgroundColor: '#fff', borderWidth: 1, borderColor: 'transparent', borderBottomColor: '#FF5252' }}
                tabTextStyle={{ color: '#999', fontWeight: 'bold', fontSize: 18 }}
                activeTabTextStyle={{ color: '#FF5252', fontWeight: 'bold', fontSize: 18 }} />
                {this.state.customStyleIndex === 0 &&
                    <View style={{flex: 1}}>
                    <ListView 
                        dataSource={this.state.latestPosts}
                        renderRow={this.renderItem}
                        //keyExtractor={this._keyExtractor}
                        style={{ flex: 1, backgroundColor: '#c0d6df'}}/>
                    </View>}
                
                {this.state.customStyleIndex === 1 &&
                    <View>
                    <View style={{flex: 1,}}>
        
                    </View>
                    </View> }
        </View>
        </ParallaxScrollView>
      </View>
    );
  }

  _renderItem(item) {
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => console.log('Click post')}>
        <View style={{
            shadowColor: '#000',
            shadowOffset: { width: -2, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 1,
            flexDirection: 'column',
            backgroundColor: '#d8bfd8'
        }}>
          <View style={{ backgroundColor: '#b4eeb4'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.title}</Text>
          </View>
          <Image style={{width: 400, height: 200 }} source={{uri: item.featuredImage}}/>
          <View style={{backgroundColor: '#f4d2a1', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Image style={{borderRadius: 20, width: 40, height: 40 }} 
                source={{uri: item.profile_picture != '' ? item.profile_picture : 'http://www.theatricalrights.com/wp-content/themes/trw/assets/images/default-user.png'}}/>
            </View>
            <View style={{ backgroundColor: '#d8e3c4', flex: 2, justifyContent: 'space-around', alignItems: 'flex-start', padding: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.username}</Text>
            </View>
            <Text>23 minutes ago</Text>
          </View>
          <View style={{ backgroundColor: '#ff9699'}}>
            <View>
              <Text style={{ fontSize: 16 }} numberOfLines={2}>{item.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}