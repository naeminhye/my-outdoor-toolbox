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
import Carousel, {
    Pagination,
} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import WeatherCard from '../components/WeatherCard';

const SCREEN_LABEL = 'Weather';
const STICKY_HEADER_HEIGHT = 40;
const AVATAR_SIZE = 80;
const ITEM_WIDTH = 280,
ITEM_HEIGHT = 360;

export default class WeatherScreen extends Component {
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
  });