import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    Platform,
    ScrollView,
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchConditions } from '../WeatherAPI';

const ITEM_WIDTH = 280,
ITEM_HEIGHT = 360;
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

export default class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          // lat: this.props.lat,
          // lon: this.props.lon,
          name: '',
          weather: '',
          temp_c: 0,
          relative_humidity: '',
          wind_string: '',
          UV: 0,
          feelslike_c: 0,
          precip_today_metric: 0,
          visibility_km: 0,
          pressure_mb: 0,
          wind_kph: 0,
          wind_degrees: 0,
          icon: 'sunny',
        };
        fetchConditions(this.props.lat, this.props.lon).then(res => {
            this.setState({
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
            });
        });
    }
    render() {
        return (
          <View style={{ 
            borderRadius: 20, 
            width: 300, 
            marginBottom: 50,
            shadowColor: '#000',
            shadowOffset: { width: -3, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 1, }}>
            <Image source={{uri: 'https://fansplay.tsaiyitech.com/resources/378/card/26/page_bg.jpg'}}
            style={{
              width: 300,
              height: 360,
              borderRadius: 20,
              flex: 1,
            }}
            resizeMode="cover"
          >
          <View style={{padding: 20}}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20, alignItems: 'center' }}>
              <Text style={{backgroundColor: 'transparent'}}><Ionicons name="ios-pin" size={26} color="black"/></Text>
              <Text style={{fontSize: 16, backgroundColor: 'transparent'}}>  {this.state.name}</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text style={{ fontSize: 80, backgroundColor: 'transparent' }}>{this.state.temp_c}</Text>
                  <Text style={{ fontSize: 30, marginTop: -32, backgroundColor: 'transparent'}}>°C</Text>
                </View>
                <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                  <Text style={{ fontSize: 16, backgroundColor: 'transparent' }}>{this.state.weather}</Text>
                  <Text style={{ fontSize: 12, backgroundColor: 'transparent' }}>Feels like {this.state.feelslike_c}°C</Text>
                  { weather.map((w, i) => {
                    if(this.state.icon == w.icon){
                      return(
                          <Image key={i} source={w.image} style={{width: 80, height: 80}} resizeMode='cover' />
                      );
                    }
                  })}
                </View>
              </View>
              <View style={{ paddingLeft: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image source={require('../assets/icons/pressure.png')} style={{width: 28, height: 28}} resizeMode='cover' />
                    <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>{this.state.pressure_mb}mb</Text>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>Pressure</Text>
                    </View>    
                  </View>
    
                  <View style={{ flex: 1, flexDirection: 'row', padding: 5, paddingLeft: 35, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image source={require('../assets/icons/humidity.png')} style={{width: 28, height: 28}} resizeMode='cover' />
                    <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>{this.state.relative_humidity}</Text>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>Humidity</Text>
                    </View>    
                  </View>
                </View>
    
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image source={require('../assets/icons/wind.png')} style={{width: 28, height: 28, tintColor: '#000'}} resizeMode='cover' />
                    <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>{this.state.wind_degrees ? `${this.state.wind_degrees}° at ` : ''}{(this.state.wind_kph * 3.6).toFixed(1)}km/h</Text>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>Wind</Text>
                    </View>    
                  </View>
                  
                  <View style={{ flex: 1, flexDirection: 'row', padding: 5, paddingLeft: 35, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image source={require('../assets/icons/UV.png')} style={{width: 28, height: 28}} resizeMode='cover' />
                    <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>{this.state.UV}</Text>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>UV Index</Text>
                    </View>    
                  </View>
                </View>
    
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={{ flex: 1, flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image source={require('../assets/icons/precipitation.png')} style={{width: 28, height: 28, tintColor: '#000'}} resizeMode='cover' />
                    <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>{this.state.precip_today_metric > 0 ? `${this.state.precip_today_metric}` : 'Almost 0'}mm</Text>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>Precipitation</Text>
                    </View>    
                  </View>
                
                  <View style={{ flex: 1, flexDirection: 'row', padding: 5, paddingLeft: 35, justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image source={require('../assets/icons/visibility.png')} style={{width: 28, height: 28}} resizeMode='cover' />
                    <View style={{ flexDirection: 'column', paddingLeft: 5}}>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>{this.state.visibility_km}km</Text>
                      <Text style={{fontSize: 12, backgroundColor: 'transparent' }}>Visibility</Text>
                    </View>    
                  </View>
                </View>
              </View>
            </View>
        </View>
        </Image>
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
            <TouchableOpacity onPress={this.props.extension}>
                <Ionicons name={'md-add'} size={25}/>
            </TouchableOpacity>
          </View>
        </View>
          );
    }
}

const styles = StyleSheet.create({
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