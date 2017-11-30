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
import Modal from 'react-native-modal';
import AddNewPost from './AddNewPost';

const SCREEN_LABEL = 'Explore';
const STICKY_HEADER_HEIGHT = 40;
const window = Dimensions.get('window');
const ITEM_WIDTH = 240,
ITEM_HEIGHT = 280;

export default class ExploreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      // video: [
      //   { uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', }
      // ],
      dataSource: [],
      categories: [],
    };

    //this.itemRef = firebaseApp.database().ref('posts');
    this.database = firebaseApp.database();
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
  
  listenForEvents(database) {
    database.ref('post_categories').on('value', snap => {
      let events = [];
      snap.forEach(child => {
        events.push({
          name: child.val().name,
          _key: child.key,
          featuredImage: child.val().featuredImage,
          description: child.val().description,
        });
      });
      
      this.setState({
        categories: events,
      });
    });

    database.ref('posts').on('value', snap => {
      let events = [];
      snap.forEach(child => {
        events.push({
          title: child.val().title,
          _key: child.key,
          featuredImage: child.val().featuredImage,
          loves: child.val().loves,
          categoryId: child.val().categoryId,
          category: 'Unknown',
          userId: child.val().userId, // tam thoi dung user name thay cho id
          address: child.val().address,
          //description: child.val().description,
          //content: child.val().content,
          //uri: child.val().uri,
          //time: child.val().time,
        });
      });
      
      events.map((item, index) => {
        let categories = this.state.categories;
        categories.map((cat, i) => {
          if(item.categoryId == cat._key)
          {
            item.category = cat.name;
          }
        });
      });
        

      this.setState({
        dataSource: events,
      });
    });
    //this.onPressVideo = this.onPressVideo.bind(this);
  }

  componentDidMount() {
    this.listenForEvents(this.database);
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
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column',}}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.25)', 'rgba(0, 0, 0, 0.125)', 'rgba(0, 0, 0, 0)', ]} 
              style={{ width: ITEM_WIDTH, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10}}>
              <Text style={{fontSize: 16, color: '#fff', backgroundColor: 'transparent', fontWeight: 'bold', }}>{item.category}</Text>
            </LinearGradient>
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.125)', 'rgba(0, 0, 0, 0.25)', ]}
              style={{ width: ITEM_WIDTH, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}> 
              <Text style={{fontSize: 16, color: '#fff', backgroundColor: 'transparent', alignItems: 'center',}}><Ionicons name={'ios-heart-outline'} size={24}/> {item.loves}</Text>
              <Text style={{fontSize: 16, color: '#fff', backgroundColor: 'transparent',}}>by <Text style={{fontWeight: 'bold', }}>{item.userId}</Text></Text>
            </LinearGradient>
          </View>
        </Image>
      </View>
      <View style={{ width: ITEM_WIDTH }}>
        <Text style={{fontSize: 18, textAlign: 'left', fontWeight: 'bold'}}>{item.title}</Text>
        <Text numberOfLines={2} style={{fontSize: 14, textAlign: 'left', color: '#d2d2d2'}}>{item.address}</Text>
      </View>
      </View>
    );
  }

  _renderCategories({ item, index }) { 
    return(
      <View style={{
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        borderRadius: 10,}}>
      
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
          <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.125)', 'rgba(0, 0, 0, 0.25)', ]}
          style={{ width: ITEM_WIDTH, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', padding: 10 }}> 
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', backgroundColor: 'transparent'}}>{item.name}</Text>
            <Text style={{ backgroundColor: 'transparent', fontSize: 12, color: '#ffffff8c'}}>{item.description}</Text>
          </LinearGradient>
        </View>
      </Image>
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

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <AddNewPost onCancelPress={() => this.setState({ visibleModal: false })} />
    </View>
  );

  _renderSpecialPost = () => (
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
        justifyContent: 'center',
        alignItems: 'center',
      }}
      resizeMode="cover">
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', backgroundColor: 'transparent'}}>Special This Week</Text>
      </Image>
    </View>
  );

  render() {
    const { navigate } = this.props.navigation;
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
          <TouchableOpacity onPress={() => { navigate('Setting'); }}
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
          renderItem={({ item, index })=>{
            return(
              <TouchableOpacity onPress={() => {
                navigate('PostDetail', { postID: item._key });
              }}> 
              {this._renderPosts({ item, index })}
              </TouchableOpacity>
            )
          }}
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
        {this._renderSpecialPost()}
        
        {/*Headline*/}
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Let's Check-In</Text>
          <Text style={{ fontSize: 16, color: '#FF5252', }}>See all <Ionicons name={'ios-arrow-forward'} size={16}/></Text>
        </View>
        <Carousel
          data={this.state.dataSource.filter(story => story.categoryId === 3)}
          renderItem={({ item, index })=>{
            return(
              <TouchableOpacity onPress={() => {
                navigate('PostDetail', { postID: item._key });
              }}> 
              {this._renderPosts({ item, index })}
              </TouchableOpacity>
            )
          }}
          sliderWidth={window.width}
          itemWidth={260}
          activeSlideAlignment={'start'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />

       {/*Headline*/}
        <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Categories</Text>
          <Text style={{ fontSize: 16, color: '#FF5252', }}>See all <Ionicons name={'ios-arrow-forward'} size={16}/></Text>
        </View>
        <Carousel
          data={this.state.categories}
          renderItem={this._renderCategories}
          sliderWidth={window.width}
          itemWidth={260}
          activeSlideAlignment={'start'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1} />
      </ParallaxScrollView>

      <TouchableOpacity onPress={() => { this.setState({ visibleModal: true }) }}>
        <View style={{ backgroundColor: '#FF5252', width: 60, height: 60, borderRadius:30, position: 'absolute', bottom: 30, right: 30, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: -2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 1,}}>
            <Ionicons name={'md-add'} size={32} color={'#FFF'} />
        </View>
      </TouchableOpacity>
      <Modal isVisible={this.state.visibleModal} style={styles.bottomModal}>
        {this._renderModalContent()}
      </Modal>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: window.height - 60,
    width: window.width,
  },
  bottomModal: {
    marginTop: 40,
    margin: 0,
  },
});