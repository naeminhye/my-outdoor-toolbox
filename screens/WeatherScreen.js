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
import { firebaseApp } from '../FirebaseConfig';
import Loading from '../components/Loading';

const SCREEN_LABEL = 'Weather';
const STICKY_HEADER_HEIGHT = 40;
const AVATAR_SIZE = 80;
const ITEM_WIDTH = 280,
ITEM_HEIGHT = 360;

export default class WeatherScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // weather_subscribes: [
        //     { cityId: '1566083', uri: 'https://goo.gl/hnyZWN', },
        //     { cityId: '5128581', uri: 'https://goo.gl/GCJTg3', },
        //     { cityId: '1581130', uri: 'https://goo.gl/U8rs4X', },
        //     { cityId: '1850147', uri: 'https://goo.gl/PX9yuq', },
        //     { cityId: '1835848', uri: 'https://goo.gl/nJpmDT', },
        //     { cityId: '2988507', uri: 'https://goo.gl/zdRc1C', },
        //     { cityId: '1609350', uri: 'https://goo.gl/ypDpWL', },
        // ],
        weather_subscribes: [],
        activeSlide: 0,
        isLoading: true,
      };
    }

    static navigationOptions = {
      header: null,
    }

    componentDidMount() {
      firebaseApp.auth().onAuthStateChanged((user) => {
        if (user != null) {
          firebaseApp.database().ref('users/' + user.uid + '/weather_subscribes').on('value', snap => {
            let events = [];
            snap.forEach(child => {
              events.push({
                cityId: child.val().cityId,
                subcribeId: child.key,
                image: child.val().image,
              });
      
              this.setState({
                weather_subscribes: events,
                isLoading: false
              });
            });
          });
      }});

      
    }

  get pagination () {
    const { weather_subscribes, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={weather_subscribes.length}
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

  _renderPlaceHolder() {
    return(
      <View style={{
        margin: 20,
        borderWidth: 2,
        borderColor: 'grey',
        borderStyle: 'dashed',
        borderRadius: 10,
        width: window.width - 40,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      }}>
        <Ionicons name={'md-add'} color={'black'} size={30} />
        <Text style={{fontSize: 18}}>Add new city</Text>
      </View>
    );
  }
  
    _renderWeatherItem({ item, index }) { 
      return(
        <View>
          <WeatherCard uri={item.image} cityId={item.cityId} />
          <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 10,
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
          <TouchableOpacity onPress={() => {
            console.log('Shared');
          }}>
              <Ionicons name={'ios-share-outline'} size={25}/>
          </TouchableOpacity>
          <Text style={{ fontSize: 16 }}>Share</Text>
        </View>
      </View>
      );
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
                    <Text style={{fontSize: 20, fontWeight: 'bold',}}> Back</Text>
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
              <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold',}}>How's the <Text style={{color: 'red'}}>Weather</Text> today?</Text>
                <Text style={{ fontSize: 16, color: '#FF5252', }}>Edit</Text>
              </View>
              { this.state.weather_subscribes.length > 0 ? 
                <View>
                  { !this.state.isLoading ? 
                    <View>
                    <Carousel
                        data={this.state.weather_subscribes}
                        renderItem={this._renderWeatherItem}
                        sliderWidth={viewportWidth}
                        itemWidth={280}
                        activeSlideAlignment={'center'}
                        inactiveSlideScale={0.8}
                        inactiveSlideOpacity={0.5}
                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    /> 
                      { this.pagination } 
                    </View> :  <Loading /> }
                  </View> : this._renderPlaceHolder() }
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