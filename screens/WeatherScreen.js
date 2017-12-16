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

import { fetchWeather, fetchConditions, fetchHourly } from '../WeatherAPI';

const loIcon = <Ionicons name="ios-pin-outline" size={26} color="black" />; 

// const iconNames = {
//   Clear: 'md-sunny',
//   Rain: 'md-rainy',
//   Thunderstorm: 'md-thunderstorm',
//   Clouds: 'md-cloudy',
//   Snow: 'md-snow',
//   Drizzle: 'md-umbrella'
// }

const iconNames = {
  '01d': '../assets/icons/weather/01d.png',
  '01n': '../assets/icons/weather/01n.png',
  '02d': '../assets/icons/weather/02d.png',
  '02n': '../assets/icons/weather/02n.png',
  '03d': '../assets/icons/weather/03d.png',
  '03n': '../assets/icons/weather/03n.png',
  '04d': '../assets/icons/weather/08d.png',
  '04n': '../assets/icons/weather/08n.png',
  '09d': '../assets/icons/weather/09d.png',
  '09n': '../assets/icons/weather/09n.png',
  '10d': '../assets/icons/weather/10d.png',
  '10n': '../assets/icons/weather/10n.png',
  '11d': '../assets/icons/weather/11d.png',
  '11n': '../assets/icons/weather/11n.png',
  '13d': '../assets/icons/weather/13d.png',
  '13n': '../assets/icons/weather/13n.png',
  '50d': '../assets/icons/weather/50d.png',
  '50n': '../assets/icons/weather/50n.png',
}

const SCREEN_LABEL = 'Weather';
const STICKY_HEADER_HEIGHT = 40;
const AVATAR_SIZE = 80;
const ITEM_WIDTH = 280,
ITEM_HEIGHT = 360;

export default class WeatherScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {        
        name: 'Nowhere',
        weather: 'No data',
        temp_c: 0,
        relative_humidity: '0%',
        wind_string: 'No data',
        wind_kph: 0,
        wind_degrees: 0,
        UV: 0,
        feelslike_c: 0,
        precip_today_metric: 0,
        visibility_km: 0,
        pressure_mb: 0,
        lat: 0,
        lon: 0,

        weather_subscribes: [],
        activeSlide: 0,
        isLoading: true,
        icon: '01d',

        conditions: null,
      };
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
      this.getLocation();
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
      navigator.geolocation.getCurrentPosition(
        (posData) => fetchConditions(posData.coords.latitude, posData.coords.longitude)
          .then(res => this.setState({
            lat: posData.coords.latitude,
            lon: posData.coords.longitude,
            name: res.name,
            weather: res.weather,
            temp_c: res.temp_c,
            relative_humidity: res.relative_humidity,
            wind_string: res.wind_string,
            UV: res.UV,
            feelslike_c: res.feelslike_c,
            precip_today_metric: res.precip_today_metric,
            visibility_km: res.visibility_km,
            pressure_mb: res.pressure_mb,
            wind_kph: res.wind_kph,
            wind_degrees: res.wind_degrees,
          })),
        (error) => alert(error),
        { timeout: 10000 } 
      );
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
              <View style={styles.todayContainer}>
                <View style={styles.upperContainer}>
                  <View style={styles.locationContainer}>
                    <Text style={styles.location}>{loIcon} {this.state.name}</Text>
                  </View>
                  <View style={styles.centerContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                      <View style={styles.tempContainer}>
                        <Text style={styles.temp}>{this.state.temp_c}</Text>
                        <Text style={styles.degree}>°C</Text>
                      </View>
                      <View style={{flexDirection: 'column', flex: 1,}}>
                        <Text style={styles.status}>{this.state.weather}</Text>
                        <Text style={styles.description}>Feels like {this.state.feelslike_c}°C</Text>
                        <Image source={require('../assets/icons/weather/50n.png')} style={{width: 100, height: 100}} resizeMode='cover' />
                      </View>
                    </View>
                    <View style={{ paddingLeft: 20}}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                          <Image source={require('../assets/icons/pressure.png')} style={{width: 32, height: 32}} resizeMode='cover' />
                          <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                            <Text style={{fontSize: 16 }}>{this.state.pressure_mb}mb</Text>
                            <Text style={{fontSize: 16 }}>Pressure</Text>
                          </View>    
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                          <Image source={require('../assets/icons/humidity.png')} style={{width: 32, height: 32}} resizeMode='cover' />
                          <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                            <Text style={{fontSize: 16 }}>{this.state.relative_humidity}</Text>
                            <Text style={{fontSize: 16 }}>Humidity</Text>
                          </View>    
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                          <Image source={require('../assets/icons/wind.png')} style={{width: 32, height: 32, tintColor: '#000'}} resizeMode='cover' />
                          <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                            <Text style={{fontSize: 16 }}>{this.state.wind_degrees ? `${this.state.wind_degrees}° at ` : ''}{this.state.wind_kph * 3.6}km/h</Text>
                            <Text style={{fontSize: 16 }}>Wind</Text>
                          </View>    
                        </View>
                        
                        <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                          <Image source={require('../assets/icons/UV.png')} style={{width: 32, height: 32}} resizeMode='cover' />
                          <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                            <Text style={{fontSize: 16 }}>{this.state.UV}</Text>
                            <Text style={{fontSize: 16 }}>UV Index</Text>
                          </View>    
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                      <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image source={require('../assets/icons/precipitation.png')} style={{width: 32, height: 32, tintColor: '#000'}} resizeMode='cover' />
                        <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                          <Text style={{fontSize: 16 }}>{this.state.precip_today_metric > 0 ? `${this.state.precip_today_metric}` : 'Almost 0'}mm</Text>
                          <Text style={{fontSize: 16 }}>Precipitation</Text>
                        </View>    
                      </View>
                      
                      <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image source={require('../assets/icons/visibility.png')} style={{width: 32, height: 32}} resizeMode='cover' />
                        <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                          <Text style={{fontSize: 16 }}>{this.state.visibility_km}km</Text>
                          <Text style={{fontSize: 16 }}>Visibility</Text>
                        </View>    
                      </View>
                    </View>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, justifyContent: 'space-between', alignSelf: 'stretch', flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold',}}>My subcribes</Text>
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
    todayContainer: {
      padding: 20,
    },
    upperContainer: {
    },
    centerContainer: {
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
      alignItems: 'flex-start',
      paddingBottom: 20,
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