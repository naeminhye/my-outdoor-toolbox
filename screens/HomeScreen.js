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
import { Constants } from 'expo';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog'; // sửa
import Carousel, {
    ParallaxImage,
    Pagination,
} from 'react-native-snap-carousel';
import WeatherView from '../components/WeatherView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const ITEM_WIDTH = 280,
ITEM_HEIGHT = 360;

//const scaleAnimation = new ScaleAnimation(); 
const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Home';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //dialogShow: false,

      images: [
          { id: '0', uri: 'https://goo.gl/hnyZWN', numOfCmts: 2, numOfLoves: 56 },
          { id: '1', uri: 'https://goo.gl/GCJTg3', numOfCmts: 2, numOfLoves: 14 },
          { id: '2', uri: 'https://goo.gl/U8rs4X', numOfCmts: 2, numOfLoves: 0 },
          { id: '3', uri: 'https://goo.gl/PX9yuq', numOfCmts: 2, numOfLoves: 5 },
          { id: '4', uri: 'https://goo.gl/nJpmDT', numOfCmts: 2, numOfLoves: 91 },
          { id: '5', uri: 'https://goo.gl/zdRc1C', numOfCmts: 2, numOfLoves: 73 },
          { id: '6', uri: 'https://goo.gl/ypDpWL', numOfCmts: 2, numOfLoves: 100 },
      ],

      youLoved: [
          { photoYouLoved: '0' },
          { photoYouLoved: '5' },
          { photoYouLoved: '6' },
      ],

      activeSlide: 0,
    };

    //this.showScaleAnimationDialog = this.showScaleAnimationDialog.bind(this);
  }

  static navigationOptions = {
    header: null,
    tabBarLabel: SCREEN_LABEL,
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  }

  get pagination () {
    const { images, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.92)'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          //dotColor={'black'}

        />
    );
  }

  _renderWeatherItem({ item, index }) { //TODO: sửa lại Weather View
    return (
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: -2, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 1,
        }}>
        <Image
          source={{ uri: item.uri }}
          style={{
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            borderRadius: 20,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
          }}
          resizeMode="cover"
        >
          <Text style={styles._place}>Ho Chi Minh City</Text>
          <Text style={styles._date}>Saturday, November 18, 2017</Text>
          <Text style={styles._temperature}>30°C</Text>
          <Ionicons name={'ios-partly-sunny-outline'} size={ITEM_WIDTH/4} color='white' style={{backgroundColor: 'transparent',}}/>
        </Image>
        <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: -15,
            alignSelf: 'center',
            borderRadius: 50,
            padding: 10,
            width: 100,
            height: 50,
            justifyContent: 'space-around',
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: -2, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 1,
          }}>
          <TouchableOpacity onPress={() => {}}>
          <Ionicons name={'ios-share-outline'} size={25}/>
          </TouchableOpacity>
          <Text style={{ fontSize: 16 }}>Share</Text>
        </View>
      </View>
    );
  }

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
            <Text style={{ fontSize: 18, fontWeight: 'bold',}}>How's the <Text style={{color: 'red'}}>Weather</Text> today?</Text>
            <Text style={{ fontSize: 16, color: 'blue', }}>Edit</Text>
          </View>
          <Carousel
            data={this.state.images}
            renderItem={this._renderWeatherItem}
            // renderItem={()=>{
            //   return(
            //     <WeatherView />
            //   )
            // }}
            sliderWidth={viewportWidth}
            itemWidth={280}
            activeSlideAlignment={'center'}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={0.5}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          />
          { this.pagination }
          <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold',}}>Where are we now?</Text>
            <Text style={{ fontSize: 16, color: 'blue', }}>Edit</Text>
          </View>
          </ParallaxScrollView>
      </View>
    );
  }
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function wp(percentage) {
  const value = percentage * viewportWidth / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

const styles = StyleSheet.create({
  item: {
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  _container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffeecc',
  },
  _place: {
    margin: 10,
    fontSize: ITEM_WIDTH / 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  _date: {
    fontSize: ITEM_WIDTH / 26,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  _temperature: {
    margin: 5,
    fontSize: ITEM_WIDTH / 4,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
  },
});