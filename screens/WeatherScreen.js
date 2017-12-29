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
import WeatherCard from '../components/WeatherCard';
import { firebaseApp } from '../FirebaseConfig';
import Loading from '../components/Loading';
import WeatherDetail from '../components/WeatherDetail';

import SlidingUpPanel from 'rn-sliding-up-panel';

import { fetchWeather, fetchConditions } from '../WeatherAPI';

const loIcon = <Ionicons name="ios-pin-outline" size={26} color="black" />; 

// const iconNames = {
//   Clear: 'md-sunny',
//   Rain: 'md-rainy',
//   Thunderstorm: 'md-thunderstorm',
//   Clouds: 'md-cloudy',
//   Snow: 'md-snow',
//   Drizzle: 'md-umbrella'
// }

const weather = [
	{ icon: 'chanceflurries', image: require('../assets/icons/weather/chanceflurries.png') },
	{ icon: 'chancerain', image: require('../assets/icons/weather/chancerain.png') },
	{ icon: 'chancesleet', image: require('../assets/icons/weather/chancesleet.png') },
	{ icon: 'chancesnow', image: require('../assets/icons/weather/chancesnow.png') },
	{ icon: 'chancetstorms', image: require('../assets/icons/weather/chancetstorms.png') },
	{ icon: 'clear', image: require('../assets/icons/weather/clear.png') },
	{ icon: 'cloudy', image: require('../assets/icons/weather/cloudy.png') },
	{ icon: 'flurries', image: require('../assets/icons/weather/flurries.png') },
	{ icon: 'fog', image: require('../assets/icons/weather/fog.png') },
	{ icon: 'hazy', image: require('../assets/icons/weather/hazy.png') },
	{ icon: 'mostlycloudy', image: require('../assets/icons/weather/mostlycloudy.png') },
	{ icon: 'mostlysunny', image: require('../assets/icons/weather/mostlysunny.png') },
	{ icon: 'nt_chanceflurries', image: require('../assets/icons/weather/nt_chanceflurries.png') },
	{ icon: 'nt_chancerain', image: require('../assets/icons/weather/nt_chancerain.png') },
	{ icon: 'nt_chancesleet', image: require('../assets/icons/weather/nt_chancesleet.png') },
	{ icon: 'nt_chancesnow', image: require('../assets/icons/weather/nt_chancesnow.png') },
	{ icon: 'nt_chancetstorms', image: require('../assets/icons/weather/nt_chancetstorms.png') },
	{ icon: 'nt_clear', image: require('../assets/icons/weather/nt_clear.png') },
	{ icon: 'nt_cloudy', image: require('../assets/icons/weather/nt_cloudy.png') },
	{ icon: 'nt_flurries', image: require('../assets/icons/weather/nt_flurries.png') },
	{ icon: 'nt_fog', image: require('../assets/icons/weather/nt_fog.png') },
	{ icon: 'nt_hazy', image: require('../assets/icons/weather/nt_hazy.png') },
	{ icon: 'nt_mostlycloudy', image: require('../assets/icons/weather/nt_mostlycloudy.png') },
	{ icon: 'nt_mostlysunny', image: require('../assets/icons/weather/nt_mostlysunny.png') },
	{ icon: 'nt_partlycloudy', image: require('../assets/icons/weather/nt_partlycloudy.png') },
	{ icon: 'nt_partlysunny', image: require('../assets/icons/weather/nt_partlysunny.png') },
	{ icon: 'nt_rain', image: require('../assets/icons/weather/nt_rain.png') },
	{ icon: 'nt_sleet', image: require('../assets/icons/weather/nt_sleet.png') },
	{ icon: 'nt_snow', image: require('../assets/icons/weather/nt_snow.png') },
	{ icon: 'nt_sunny', image: require('../assets/icons/weather/nt_sunny.png') },
	{ icon: 'nt_tstorms', image: require('../assets/icons/weather/nt_tstorms.png') },
	{ icon: 'nt_unknown', image: require('../assets/icons/weather/nt_unknown.png') },
	{ icon: 'partlycloudy', image: require('../assets/icons/weather/partlycloudy.png') },
	{ icon: 'partlysunny', image: require('../assets/icons/weather/partlysunny.png') },
	{ icon: 'rain', image: require('../assets/icons/weather/rain.png') },
	{ icon: 'sleet', image: require('../assets/icons/weather/sleet.png') },
	{ icon: 'snow', image: require('../assets/icons/weather/snow.png') },
	{ icon: 'sunny', image: require('../assets/icons/weather/sunny.png') },
	{ icon: 'tstorms', image: require('../assets/icons/weather/tstorms.png') },
	{ icon: 'unknown', image: require('../assets/icons/weather/unknown.png') },
];

const carousel = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
]

const SCREEN_LABEL = 'Weather';
const STICKY_HEADER_HEIGHT = 40;
const AVATAR_SIZE = 80;

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
        icon: 'chanceflurries',

        conditions: null,

        panelVisible: false,
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
            temp_c: res.temp_c.toFixed(),
            relative_humidity: res.relative_humidity,
            wind_string: res.wind_string,
            UV: res.UV,
            feelslike_c: res.feelslike_c,
            precip_today_metric: res.precip_today_metric,
            visibility_km: res.visibility_km,
            pressure_mb: res.pressure_mb,
            wind_kph: res.wind_kph.toFixed(),
            wind_degrees: res.wind_degrees,
            icon: res.icon,
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
                  data={carousel}
                  renderItem={({ item, index }) => { 
                    return(
                      <View style={{ borderWidth: 2, borderRadius: 20, borderColor: 'red', width: 300, paddingBottom: 20, marginBottom: 50,
                        shadowColor: '#000',
                        shadowOffset: { width: -3, height: 3 },
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 1, }}>
                      <View style={styles.todayContainer}>
                        <View style={styles.locationContainer}>
                          <Text style={{fontSize: 16}}>{loIcon} {this.state.name}</Text>
                        </View>
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                              <Text style={{ fontSize: 80 }}>{this.state.temp_c}</Text>
                              <Text style={{ fontSize: 30, marginTop: -50,}}>°C</Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                              <Text style={{ fontSize: 16 }}>{this.state.weather}</Text>
                              <Text style={{ fontSize: 12 }}>Feels like {this.state.feelslike_c}°C</Text>
                              { weather.map((w, i) => {
                                if(this.state.icon == w.icon){
                                  return(
                                      <Image key={i} source={w.image} style={{width: 80, height: 80}} resizeMode='cover' />
                                  );
                                }
                              })}
                            </View>
                          </View>
                          <View style={{ paddingLeft: 15}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                              <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Image source={require('../assets/icons/pressure.png')} style={{width: 28, height: 28}} resizeMode='cover' />
                                <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                                  <Text style={{fontSize: 12 }}>{this.state.pressure_mb}mb</Text>
                                  <Text style={{fontSize: 12 }}>Pressure</Text>
                                </View>    
                              </View>
                
                              <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Image source={require('../assets/icons/humidity.png')} style={{width: 28, height: 28}} resizeMode='cover' />
                                <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                                  <Text style={{fontSize: 12 }}>{this.state.relative_humidity}</Text>
                                  <Text style={{fontSize: 12 }}>Humidity</Text>
                                </View>    
                              </View>
                            </View>
                
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                              <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Image source={require('../assets/icons/wind.png')} style={{width: 28, height: 28, tintColor: '#000'}} resizeMode='cover' />
                                <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                                  <Text style={{fontSize: 12 }}>{this.state.wind_degrees ? `${this.state.wind_degrees}° at ` : ''}{this.state.wind_kph * 3.6}km/h</Text>
                                  <Text style={{fontSize: 12 }}>Wind</Text>
                                </View>    
                              </View>
                              
                              <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Image source={require('../assets/icons/UV.png')} style={{width: 28, height: 28}} resizeMode='cover' />
                                <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                                  <Text style={{fontSize: 12 }}>{this.state.UV}</Text>
                                  <Text style={{fontSize: 12 }}>UV Index</Text>
                                </View>    
                              </View>
                            </View>
                
                            <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                              <Image source={require('../assets/icons/precipitation.png')} style={{width: 28, height: 28, tintColor: '#000'}} resizeMode='cover' />
                              <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                                <Text style={{fontSize: 12 }}>{this.state.precip_today_metric > 0 ? `${this.state.precip_today_metric}` : 'Almost 0'}mm</Text>
                                <Text style={{fontSize: 12 }}>Precipitation</Text>
                              </View>    
                            </View>
                            
                            <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                              <Image source={require('../assets/icons/visibility.png')} style={{width: 28, height: 28}} resizeMode='cover' />
                              <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                                <Text style={{fontSize: 12 }}>{this.state.visibility_km}km</Text>
                                <Text style={{fontSize: 12 }}>Visibility</Text>
                              </View>    
                            </View>
                          </View>
                          </View>
                        </View>
                    </View>
                        <View
                        style={{
                          backgroundColor: '#fff',
                          position: 'absolute',
                          bottom: -25,
                          alignSelf: 'center',
                          borderRadius: 50,
                          padding: 10,
                          width: 50,
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
                        <TouchableOpacity onPress={() => this.setState({panelVisible: true})}>
                            <Ionicons name={'md-add'} size={25}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                    );
                  }}
                  sliderWidth={viewportWidth}
                  itemWidth={300}
                  activeSlideAlignment={'center'}
                  inactiveSlideScale={0.8}
                  inactiveSlideOpacity={0.5}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
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
      padding: 20,
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