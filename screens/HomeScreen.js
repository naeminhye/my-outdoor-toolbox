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
import Carousel, {
    Pagination,
} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import WeatherCard from '../components/WeatherCard';
import GridView from 'react-native-super-grid';

const ITEM_WIDTH = 280,
ITEM_HEIGHT = 360;

//const scaleAnimation = new ScaleAnimation(); 
const STICKY_HEADER_HEIGHT = 40;
const SCREEN_LABEL = 'Home';
const AVATAR_SIZE = 80;
const profileItems = [
  { name: 'TURQUOISE', code: '#fff' }, { name: 'EMERALD', code: '#2ecc71' },
  { name: 'PETER RIVER', code: '#fff' }, { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#fff' }, { name: 'GREEN SEA', code: '#16a085' },
  { name: 'NEPHRITIS', code: '#fff' }, { name: 'BELIZE HOLE', code: '#2980b9' },
  { name: 'WISTERIA', code: '#fff' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
  { name: 'SUN FLOWER', code: '#fff' }, { name: 'CARROT', code: '#e67e22' },
  { name: 'ALIZARIN', code: '#fff' }, { name: 'CLOUDS', code: '#ecf0f1' },
  { name: 'CONCRETE', code: '#fff' }, { name: 'ORANGE', code: '#f39c12' },
  { name: 'PUMPKIN', code: '#fff' }, { name: 'POMEGRANATE', code: '#c0392b' },
  { name: 'SILVER', code: '#fff' }, { name: 'ASBESTOS', code: '#7f8c8d' },
];

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
          { cityId: '1566083', uri: 'https://goo.gl/hnyZWN', },
          { cityId: '5128581', uri: 'https://goo.gl/GCJTg3', },
          { cityId: '1581130', uri: 'https://goo.gl/U8rs4X', },
          { cityId: '1850147', uri: 'https://goo.gl/PX9yuq', },
          { cityId: '1835848', uri: 'https://goo.gl/nJpmDT', },
          { cityId: '2988507', uri: 'https://goo.gl/zdRc1C', },
          { cityId: '1609350', uri: 'https://goo.gl/ypDpWL', },
      ],
      activeSlide: 0,
    };
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

  _renderWeatherItem({ item, index }) { 
    return(
      <WeatherCard uri={item.uri} cityId={item.cityId} />
    );
  }

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
        <View style={[myStyles.screenHeader]}>
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
          {/*
          <GridView
          itemWidth={(viewportWidth - 30) / 2}
          items={profileItems}
          style={{flex: 1,}}
          renderItem={item => (  
            <View style={{justifyContent: 'flex-end', borderRadius: 5,
            padding: 10, height: 150,backgroundColor: item.code }}>
                
            </View>
          )}
        />
      */}
          {/*TODO: bỏ vô screen Weather */} 
          <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold',}}>How's the <Text style={{color: 'red'}}>Weather</Text> today?</Text>
            <Text style={{ fontSize: 16, color: '#FF5252', }}>Edit</Text>
          </View>
          <Carousel
            data={this.state.images}
            renderItem={this._renderWeatherItem}
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
            <Text style={{ fontSize: 16, color: '#FF5252', }}>Edit</Text>
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