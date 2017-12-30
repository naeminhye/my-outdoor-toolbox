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
  Button
} from 'react-native';
import Carousel, {
    Pagination,
} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myStyles from '../assets/styles/myStyles';
import { Constants } from 'expo';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { firebaseApp } from '../FirebaseConfig';
import Loading from '../components/Loading';
import WeatherCard from '../components/WeatherCard';
import WeatherDetail from '../components/WeatherDetail';

import SlidingUpPanel from 'rn-sliding-up-panel';

import { fetchConditions } from '../WeatherAPI';

const SCREEN_LABEL = 'Weather';
const STICKY_HEADER_HEIGHT = 40;
const AVATAR_SIZE = 80;

export default class WeatherScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        lat: 0,
        lon: 0,

        weather_subscribes: [],
        activeSlide: 0,
        isLoading: true,
        icon: 'chanceflurries',

        conditions: null,

        panelVisible: false,
        carousel: [],
      };
      navigator.geolocation.getCurrentPosition(
        (posData) => this.setState({
          carousel: [
            { lat: posData.coords.latitude, lon: posData.coords.longitude}, // current location
            { lat: 40.730610, lon: -73.935242 }, //New York
            { lat: 37.532600, lon: 127.024612 }, //Seoul
            { lat: 35.652832, lon: 139.839478 }, //Tokyo
            { lat: 48.864716, lon: 2.349014   }, //Paris
          ]
        }),
        (error) => alert(error),
        { timeout: 10000 } 
      );
    }

  getWeekDay(n) {
    let d = 'Sunday';

    switch (n) {
      case 1:
        d = 'Monday';
        break;
      case 2:
        d = 'Tuesday';
        break;
      case 3:
        d = 'Wednesday';
        break;
      case 4:
        d = 'Thursday';
        break;
      case 5:
        d = 'Friday';
        break;
      case 6:
        d = 'Saturday';
        break;
      default:
        break;
    }
    return d;
  }

    static navigationOptions = {
      header: null,
    }

    componentDidMount() {
      //this.getLocation();
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

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    getLocation() {
      let currentLocation = [];
      navigator.geolocation.getCurrentPosition(
        (posData) => {
          currentLocation.push({ lat: posData.coords.latitude, lon: posData.coords.longitude});
            this.setState({
              lat: posData.coords.latitude,
              lon: posData.coords.longitude,
            });
          },
        // (posData) => fetchConditions(posData.coords.latitude, posData.coords.longitude)
        //   .then(res => this.setState({
        //     lat: posData.coords.latitude,
        //     lon: posData.coords.longitude,
        //     name: res.name,
        //     weather: res.weather,
        //     temp_c: res.temp_c.toFixed(),
        //     relative_humidity: res.relative_humidity,
        //     wind_string: res.wind_string,
        //     UV: res.UV,
        //     feelslike_c: res.feelslike_c,
        //     precip_today_metric: res.precip_today_metric,
        //     visibility_km: res.visibility_km,
        //     pressure_mb: res.pressure_mb,
        //     wind_kph: res.wind_kph.toFixed(),
        //     wind_degrees: res.wind_degrees,
        //     icon: res.icon,
        //     carousel: [
        //       { id: 0, lat: posData.coords.latitude, lon: posData.coords.longitude},
        //       { id: 1, lat:40.730610, lon: -73.935242 }, //New York
        //       { id: 2, lat:37.532600, lon: 127.024612 }, //Seoul
        //       { id: 3, lat:35.652832, lon: 139.839478 }, //Tokyo
        //       { id: 4, lat:48.864716, lon: 2.349014 }, //Paris
        //     ]
        //   })),
        (error) => alert(error),
        { timeout: 10000 } 
      );

      this.setState({
        carousel: currentLocation,
        // carousel: [
        //   { lat: posData.coords.latitude, lon: posData.coords.longitude},
        //   { lat:40.730610, lon: -73.935242 }, //New York
        //   { lat:37.532600, lon: 127.024612 }, //Seoul
        //   { lat:35.652832, lon: 139.839478 }, //Tokyo
        //   { lat:48.864716, lon: 2.349014 }, //Paris
        // ]
      });
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

            <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold',}}>How's the <Text style={{color: 'red'}}>Weather</Text> today?</Text>
              <Text style={{ fontSize: 16, color: '#FF5252', }}>Edit</Text>
            </View>
            <View style={{ marginBottom: 50 }}>
              <Carousel
                  data={this.state.carousel}
                  renderItem={({ item, index }) => { 
                    return(
                      <WeatherCard lat={item.lat} lon={item.lon} extension={() => this.setState({panelVisible: true})} />
                    );
                  }}
                  sliderWidth={viewportWidth}
                  itemWidth={300}
                  activeSlideAlignment={'center'}
                  inactiveSlideScale={0.8}
                  inactiveSlideOpacity={0.5}
                  onSnapToItem={(index) => 
                    this.setState({ 
                      activeSlide: index,
                      lat: this.state.carousel[index].lat,
                      lon: this.state.carousel[index].lon,
                    })}
              /> 
            </View>


            {/*
            
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


            */}
              
        </ParallaxScrollView>
        <SlidingUpPanel
          allowDragging={false}
          ref={c => this._panel = c}
          visible={this.state.panelVisible}
          onRequestClose={() => this.setState({ panelVisible: false})}>
          <View style={{
            flex: 1,
            paddingTop: 60,
          }}>
            <View style={{
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center', 
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              }}>
              <WeatherDetail lat={this.state.lat} lon={this.state.lon}/>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                position: 'absolute',
                top: 40,
                alignSelf: 'center',
                borderRadius: 20,
                padding: 10,
                width: 40,
                height: 40,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: -2, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 1,
              }}>
              <TouchableOpacity onPress={() => {this._panel.transitionTo(0)}}>
                  <Ionicons name={'ios-arrow-down'} size={25}/>
              </TouchableOpacity>
            </View>
          </View>
        </SlidingUpPanel>
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
    todayContainer: {
      
    },
    tempContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    temp: {
      fontSize: 100,
    },
    degree: {
      fontSize: 50,
      marginTop: -30,
    },
    status: {
      fontSize: 20,
    },
    description: {
      fontSize: 14,
    },
    locationContainer: {
      
    },
    location: {
      fontSize: 20,
    },
    footer: {
      flex: 1,
    },
    daily: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 30,
      paddingRight: 30,
    },
    dailyText: {
      fontSize: 20,
    },
  });