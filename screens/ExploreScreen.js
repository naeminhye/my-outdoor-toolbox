import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
  ListView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { firebaseApp } from '../FirebaseConfig';
import { Constants, Video, LinearGradient } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const SCREEN_LABEL = 'Explore';
const STICKY_HEADER_HEIGHT = 40;
const window = Dimensions.get('window');
const ITEM_WIDTH = 240,
ITEM_HEIGHT = 280;


export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // video: [
      //   { uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', }
      // ],
      dataSource: []
    };

    this.itemRef = firebaseApp.database().ref('posts');
  }
  
  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-compass' : 'ios-compass-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }
  
  listenForEvents(itemRef) {
    itemRef.on('value', snap => {
      let events = [];
      snap.forEach(child => {
        events.push({
          title: child.val().title,
          _key: child.key,
          featuredImage: child.val().featuredImage,
          loves: child.val().loves,
          category: child.val().category,
          userId: child.val().userId, // tam thoi dung user name thay cho id
          //description: child.val().description,
          //content: child.val().content,
          //uri: child.val().uri,
          //time: child.val().time,
        });
      });

      this.setState({
        dataSource: events,
      });
    });
    
    //this.onPressVideo = this.onPressVideo.bind(this);
  }

  componentDidMount() {
    this.listenForEvents(this.itemRef);
  }

  _renderPosts({ item, index }) { 
    return(
      <View style={{
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,}}>
      <View
      style={{
        borderRadius: 10,
        marginBottom: 5,
      }}>
      <Image
        source={{ uri: item.featuredImage }}
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          borderRadius: 10,
          flex: 1,
        }}
        resizeMode="cover">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end',}}>
          {/*<View style={{ width: ITEM_WIDTH, backgroundColor: 'rgba(0,0,0,.3)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10}}>*/}
          <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.125)', 'rgba(0, 0, 0, 0.25)', ]}
            style={{ width: ITEM_WIDTH, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}> 
            <Text style={{fontSize: 16, color: '#fff', backgroundColor: 'transparent', alignItems: 'center',}}><Ionicons name={'ios-heart-outline'} size={24}/> {item.loves}</Text>
            <Text style={{fontSize: 16, color: '#fff', backgroundColor: 'transparent',}}>{item.userId}</Text>
          </LinearGradient>
          {/*</View>*/}
        </View>
      </Image>
    </View>
    <Text style={{fontSize: 18, textAlign: 'left', fontWeight: 'bold'}}>{item.title}</Text>
    <Text style={{fontSize: 16, textAlign: 'left', color: '#d2d2d2'}}>{item.category}</Text>
    </View>
    );
  }

  // onPressVideo() {
  //   this.vid.presentIOSFullscreenPlayer();
  //   this.vid.seek(5);
  // }

  // _renderVideos({item}) {
  //   return(
  //     <View style={{ padding: 20, borderRadius: 10, width: (window.width - 40), height: (window.width - 40)}}>
  //     <TouchableOpacity onPress={this.onPressVideo}>
  //       <Video
  //         ref={r => {
  //           this.vid = r;
  //         }}
  //         source={item}
  //         rate={1.0}
  //         volume={1.0}
  //         muted={false}
  //         resizeMode="cover"
  //         style={{ width: (window.width - 40), height: (window.width - 40) }}
  //       />
  //     </TouchableOpacity>
  //   </View>
  //   );
  // }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight, }}>
      <ParallaxScrollView
      ref={(scroll) => { this.scrollview = scroll; }}
      backgroundColor="#fff"
      contentBackgroundColor="#fff"
      parallaxHeaderHeight={100}
      stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
      renderForeground={() => (
        <View style={myStyles.screenHeader}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10, }}>{SCREEN_LABEL}</Text>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Setting'); }}
          style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 50 / 2, borderColor: '#FF5252'}}>
            <Image style={{borderRadius: 40 / 2}} source={{
              uri: 'https://i.pinimg.com/736x/fd/7f/7c/fd7f7c072ed1af1af5420658f6245a49--calendar--exo-exo.jpg',
              width: 40,
              height: 40 }}
            />
          </TouchableOpacity>
        </View>
      )}
      renderStickyHeader={() => (
        <View key="sticky-header" style={{height: STICKY_HEADER_HEIGHT, alignItems:'center',justifyContent: 'flex-end',paddingTop: Constants.statusBarHeight,}}>
          <Text style={{fontSize: 18, fontWeight: 'bold',margin: 10}}
          onPress={() => this.scrollview.scrollTo({ x: 0, y: 0 })}>{SCREEN_LABEL}</Text>
        </View>
      )}>
       {/*Headline*/}
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Latest Stories</Text>
          <Text style={{ fontSize: 16, color: '#FF5252', }}>See more <Ionicons name={'ios-arrow-forward'} size={16}/></Text>
        </View>
        <Carousel
          data={this.state.dataSource}
          renderItem={this._renderPosts}
          sliderWidth={window.width}
          itemWidth={260}
          activeSlideAlignment={'start'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />

        {/*Headline*/}
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Take your backpack and go</Text>
          <Text style={{ fontSize: 16, color: '#FF5252', }}>See all <Ionicons name={'ios-arrow-forward'} size={16}/></Text>
        </View>
        {/*
        <Carousel
          data={this.state.video}
          renderItem={this._renderVideos}
          sliderWidth={window.width}
          itemWidth={window.width}
          activeSlideAlignment={'start'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />
        */}
        {/* Tao function render rieng */}
        <View style={{
          margin: 20,
          borderRadius: 10,
          }}>
          <Image
          source={{ uri: 'http://kenh14cdn.com/thumb_w/660/2017/lang-phap-kt-1510804667959.jpg' }}
          style={{
            width: window.width - 40,
            height: 260,
            borderRadius: 10,
            flex: 1,
          }}
          resizeMode="cover"/>
        </View>
        
        {/*Headline*/}
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Let's Check-In</Text>
          <Text style={{ fontSize: 16, color: '#FF5252', }}>See all <Ionicons name={'ios-arrow-forward'} size={16}/></Text>
        </View>

       {/*Headline*/}
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Categories</Text>
          <Text style={{ fontSize: 16, color: '#FF5252', }}>See all <Ionicons name={'ios-arrow-forward'} size={16}/></Text>
        </View>
        <Carousel
          data={this.state.dataSource}
          renderItem={this._renderPosts}
          sliderWidth={window.width}
          itemWidth={260}
          activeSlideAlignment={'start'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1} />
      </ParallaxScrollView>

      <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddPost'); }}>
        <View style={{ backgroundColor: '#FF5252', width: 60, height: 60, borderRadius:30, position: 'absolute', bottom: 30, right: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 1,}}>
            <Ionicons name={'md-add'} size={32} color={'#FFF'} />
        </View>
      </TouchableOpacity>
    </View>
    );
  }
}